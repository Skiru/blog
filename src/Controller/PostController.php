<?php

declare(strict_types=1);

namespace App\Controller;

use App\Application\Post\Command\PostCreateCommand;
use App\Application\Post\Query\PostQueryInterface;
use App\Domain\DomainException;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\Post;
use App\Domain\Post\ReadTime\ReadTime;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\Tags;
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
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PostController extends AbstractController
{
    private CommandBusInterface $commandBus;
    private PostQueryInterface $postQuery;

    public function __construct(CommandBusInterface $commandBus, PostQueryInterface $postQuery)
    {
        $this->commandBus = $commandBus;
        $this->postQuery = $postQuery;
    }

    public function upload(Request $request, ImageUploader $imageUploader): JsonResponse
    {
        $uploadedFile = $request->files->get('file');
        try {
            $filePath = $imageUploader->upload($uploadedFile);
        } catch (DomainException $exception) {
            return new JsonResponse(
                [
                'error' => 'Could not upload image'
                ],
                500
            );
        }

        return new JsonResponse([
            'location' => $filePath
        ]);
    }

    public function insert(Request $request, ImageUploader $imageUploader): RedirectResponse
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
                    Post::createFromParameters(
                        $domainUuid,
                        Title::fromString($userFormModel->title),
                        new BlogUser(new UserIdentity($domainUuid)),
                        Content::createEncodedFromString($userFormModel->content),
                        new Tags([
                            Tag::fromString('first-tag')
                        ]),
                        Category::fromString('my-category'),
                        ReadTime::fromParameter((int)$request->get('readTime')),
                        HeaderImage::createFromString($userFormModel->headerImage)
                    )
                );

                $this->commandBus->handle($command);

                $this->addFlash(
                    'success',
                    'Successfully saved post'
                );

                return $this->redirectToRoute('dashboard');
            } catch (DomainException $exception) {
                //TODO when validation will be added then catch exceptions here
                $this->addFlash(
                    'danger',
                    'Coudln\'t save a post' . $exception->getMessage()
                );

                return $this->redirectToRoute('dashboard');
            }
        }

        $this->addFlash(
            'danger',
            sprintf('Couldn\'t save a post')
        );

        return $this->redirectToRoute('dashboard');
    }

    public function showPost(string $uuid): Response
    {
        //TODO Use markdown
        return $this->render('homepage/single_post.html.twig', [
            'post' => $this->postQuery->getByUuid(new DomainUuid(Uuid::fromString($uuid)->toString()))
        ]);
    }
}