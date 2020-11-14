<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Post\Command\PostCreateCommand;
use App\Application\Post\Query\PostQueryInterface;
use App\Application\Tag\Query\TagQueryInterface;
use App\Domain\DomainException;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Category\CategoryName;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\Post;
use App\Domain\Post\ReadTime\ReadTime;
use App\Domain\Post\Slug\Slug;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagList;
use App\Domain\Post\Tag\TagName;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid as DomainUuid;
use App\Domain\User\BlogUser;
use App\Domain\User\UserIdentity;
use App\Infrastructure\CommandBus\CommandBusInterface;
use App\Infrastructure\ECorp\IdpInterface;
use App\Infrastructure\Form\PostModel;
use App\Infrastructure\Form\PostType;
use App\Infrastructure\ImageUploader;
use Exception;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class BlogAdminController extends AbstractController
{
    private const TAGS_CREATE_API_ROUTE_NAME = 'blog_tags_create';
    private const TAGS_FIND_ALL_API_ROUTE_NAME = 'blog_tags_find_all';
    private const CATEGORIES_CREATE_API_ROUTE_NAME = 'blog_categories_create';
    private const POSTS_CREATE_API_ROUTE_NAME = 'blog_posts_create';
    private const POSTS_UPDATE_API_ROUTE_NAME = 'blog_posts_update';
    private const POSTS_FIND_ALL_API_ROUTE_NAME = 'blogs_posts_find_all';
    private const CATEGORIES_FIND_ALL_API_ROUTE_NAME = 'blog_categories_find_all';

    private IdpInterface $idp;
    private TagQueryInterface $tagQuery;
    private PostQueryInterface $postQuery;
    private CategoryQueryInterface $categoryQuery;
    private CommandBusInterface $commandBus;

    public function __construct(
        IdpInterface $idp,
        TagQueryInterface $tagQuery,
        PostQueryInterface $postQuery,
        CategoryQueryInterface $categoryQuery,
        CommandBusInterface $commandBus
    ) {
        $this->idp = $idp;
        $this->tagQuery = $tagQuery;
        $this->postQuery = $postQuery;
        $this->categoryQuery = $categoryQuery;
        $this->commandBus = $commandBus;
    }

    public function login(AuthorizationCheckerInterface $authorizationChecker): Response
    {
        if ($authorizationChecker->isGranted('ROLE_USER')) {
            $this->redirectToRoute('dashboard');
        }

        return $this->render('security/login.html.twig', [
            'idp_auth_link' => $this->idp->buildAuthorizeUri()
        ]);
    }

    public function logout(): void
    {
        //Should never be called
    }

    public function handleCode(): RedirectResponse
    {
        return $this->redirectToRoute('dashboard');
    }

    public function dashboard(): Response
    {
        $postModel = new PostModel();
        $form = $this->createForm(PostType::class, $postModel);

        return $this->render('admin/dashboard.html.twig', [
            'form' => $form->createView()
        ]);
    }

    public function posts(): Response
    {
        //TODO Change later to call api
        return $this->render('admin/posts.html.twig', [
            'posts_api_url' => $this->getAbsolutePathForRoute(self::POSTS_FIND_ALL_API_ROUTE_NAME)
        ]);
    }

    public function postsCreate(): Response
    {
        $postModel = new PostModel();
        $form = $this->createForm(PostType::class, $postModel);

        return $this->render('admin/posts_create.html.twig', [
            'form' => $form->createView(),
            'posts_api_url' => $this->getAbsolutePathForRoute(self::POSTS_CREATE_API_ROUTE_NAME)
        ]);
    }

    public function handlePostUpdate(string $uuid): Response
    {
        try {
            $post = $this->postQuery->getByUuid(
                new DomainUuid(Uuid::fromString($uuid)->toString())
            );

            //TODO PACK THIS INTO POSTFACADE
            $postModel = new PostModel();
            $postModel->content = $post->getContent();
            $postModel->readTime = $post->getReadTime();
            $postModel->tags = $post->getTags();
            $postModel->category = $post->getCategory();
            $postModel->headerImage = $post->getHeaderImage();
            $postModel->title = $post->getTitle();
            $postModel->published = $post->isPublished();
            $form = $this->createForm(PostType::class, $postModel);

            return $this->render('admin/posts_update.html.twig', [
                'form' => $form->createView(),
                'post_update_api_url' => $this->getAbsolutePathForRoute(
                    self::POSTS_UPDATE_API_ROUTE_NAME,
                    [
                        'uuid' => $post->getUuid()
                    ]
                )
            ]);
        } catch (Exception $e) {
            $this->addFlash('danger', 'This post does not exist!');

            return new RedirectResponse('posts');
        }
    }

    public function handlePostCreate(Request $request, ImageUploader $imageUploader, SluggerInterface $slugger): Response
    {
        $userFormModel = new PostModel();
        $form = $this->createForm(PostType::class, $userFormModel);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $domainUuid = new DomainUuid(Uuid::uuid4()->toString());

                $headerImage = $form['headerImage']->getData();
                if ($headerImage) {
                    $headerImageName = $imageUploader->upload($headerImage);
                    $userFormModel->headerImage = $headerImageName;
                }

                $command = new PostCreateCommand(
                    $post = Post::createFromParameters(
                        $domainUuid,
                        Title::fromString($userFormModel->title),
                        Slug::fromString($slugger->slug($userFormModel->title)->toString()),
                        new BlogUser(new UserIdentity($domainUuid)),
                        Content::createEncodedFromString($userFormModel->content),
                        PostModel::createTagList($userFormModel->tags),
                        Category::fromCategoryName(CategoryName::fromString($userFormModel->category)),
                        ReadTime::fromParameter((int)$userFormModel->readTime),
                        HeaderImage::createFromString($userFormModel->headerImage)
                    )
                );

                $this->commandBus->handle($command);

                return $this->render('admin/posts.html.twig', [
                    'posts_api_url' => $this->getAbsolutePathForRoute(self::POSTS_FIND_ALL_API_ROUTE_NAME)
                ]);
            } catch (DomainException $exception) {
                return $this->render('admin/posts_create.html.twig', [
                    'form' => $form->createView(),
                    'posts_api_url' => $this->getAbsolutePathForRoute(self::POSTS_CREATE_API_ROUTE_NAME)
                ]);
            }
        }

        return $this->render('admin/posts_create.html.twig', [
            'form' => $form->createView(),
            'posts_api_url' => $this->getAbsolutePathForRoute(self::POSTS_CREATE_API_ROUTE_NAME)
        ]);
    }

    public function tags(): Response
    {
        $tags = $this->tagQuery->findAll();

        return $this->render('admin/tags.html.twig', [
            'tags' => $tags,
            'tags_create_api_url' => $this->getAbsolutePathForRoute(self::TAGS_CREATE_API_ROUTE_NAME),
            'tags_find_all_api_url' => $this->getAbsolutePathForRoute(self::TAGS_FIND_ALL_API_ROUTE_NAME)
        ]);
    }

    public function categories(): Response
    {
        $categories = $this->categoryQuery->findAll();

        return $this->render('admin/categories.html.twig', [
            'categories' => $categories,
            'categories_create_api_url' => $this->getAbsolutePathForRoute(self::CATEGORIES_CREATE_API_ROUTE_NAME),
            'categories_find_all_api_url' => $this->getAbsolutePathForRoute(self::CATEGORIES_FIND_ALL_API_ROUTE_NAME)
        ]);
    }

    //Todo THIS NEEDS TO BE CHANGED: Find out how to force https in router
    private function getAbsolutePathForRoute(string $routeName, array $params = [], string $scheme = 'https'): string
    {
        $url = $this->generateUrl($routeName, $params, UrlGeneratorInterface::ABSOLUTE_URL);
        if ('https' === $scheme) {
            return str_replace('http', 'https', $url);
        }

        return $url;
    }
}
