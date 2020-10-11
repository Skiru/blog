<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Application\Post\Command\PostCreateCommand;
use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;
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
use App\Infrastructure\Form\PostModel;
use App\Infrastructure\Form\PostType;
use App\Infrastructure\ImageUploader;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class PostController extends AbstractController
{
    private PostQueryInterface $postQuery;
    private CommandBusInterface $commandBus;
    private SerializerInterface $serializer;

    public function __construct(PostQueryInterface $postQuery, CommandBusInterface $commandBus, SerializerInterface $serializer)
    {
        $this->postQuery = $postQuery;
        $this->commandBus = $commandBus;
        $this->serializer = $serializer;
    }

    public function findAll(): JsonResponse
    {
        $posts['data'] = array_map(fn(PostView $view): array => $this->serializer->normalize($view, 'array'), $this->postQuery->findAll());

        return new JsonResponse(
            $posts,
            Response::HTTP_OK
        );
    }

    public function create(Request $request, ImageUploader $imageUploader, SluggerInterface $slugger): JsonResponse
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
                        $this->createTagListFromModel($userFormModel),
                        Category::fromCategoryName(CategoryName::fromString($request->get('category'))),
                        ReadTime::fromParameter((int)$request->get('readTime')),
                        HeaderImage::createFromString($userFormModel->headerImage)
                    )
                );

                $this->commandBus->handle($command);

                return new JsonResponse([
                    'success' => true,
                    'data' => $post->toArray()
                ], Response::HTTP_CREATED
                );
            } catch (DomainException $exception) {
                return new JsonResponse([
                    'success' => false,
                    'message' => $exception->getMessage()
                ], Response::HTTP_BAD_REQUEST
                );
            }
        }

        return new JsonResponse([
                'success' => false,
                'message' => 'Could not create post, check with the administrator'
            ], Response::HTTP_BAD_REQUEST
        );
    }

    public function upload(Request $request, ImageUploader $imageUploader): JsonResponse
    {
        $uploadedFile = $request->files->get('file');
        try {
            $filePath = $imageUploader->upload($uploadedFile);
        } catch (DomainException $exception) {
            return new JsonResponse([
                'error' => 'Could not upload image'
            ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return new JsonResponse([
            'location' => $filePath
        ]);
    }

    private function createTagListFromModel(PostModel $model): TagList
    {
        return new TagList(array_map(fn(string $tag): Tag => Tag::fromParameters(TagName::fromString($tag)), $model->tags));
    }
}