<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Post\Query\PostQueryInterface;
use App\Application\Tag\Query\TagQueryInterface;
use App\Infrastructure\ECorp\IdpInterface;
use App\Infrastructure\Form\PostModel;
use App\Infrastructure\Form\PostType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class BlogAdminController extends AbstractController
{
    private const TAGS_CREATE_API_ROUTE_NAME = 'blog_tags_create';
    private const TAGS_FIND_ALL_API_ROUTE_NAME = 'blog_tags_find_all';
    private const CATEGORIES_CREATE_API_ROUTE_NAME = 'blog_categories_create';
    private const POSTS_CREATE_API_ROUTE_NAME = 'blog_posts_create';
    private const POSTS_FIND_ALL_API_ROUTE_NAME = 'blogs_posts_find_all';
    private const CATEGORIES_FIND_ALL_API_ROUTE_NAME = 'blog_categories_find_all';

    private IdpInterface $idp;
    private TagQueryInterface $tagQuery;
    private PostQueryInterface $postQuery;
    private CategoryQueryInterface $categoryQuery;

    public function __construct(IdpInterface $idp, TagQueryInterface $tagQuery, PostQueryInterface $postQuery, CategoryQueryInterface $categoryQuery)
    {
        $this->idp = $idp;
        $this->tagQuery = $tagQuery;
        $this->postQuery = $postQuery;
        $this->categoryQuery = $categoryQuery;
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
        $posts = $this->postQuery->findAll();

        return $this->render('admin/posts.html.twig', [
            'posts' => $posts,
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

    private function getAbsolutePathForRoute(string $routeName, string $scheme = 'https'): string
    {
        $url = $this->generateUrl($routeName, [], UrlGeneratorInterface::ABSOLUTE_URL);
        if ('https' === $scheme) {
            return str_replace('http', 'http', $url);
        }

        return $url;
    }
}
