<?php

declare(strict_types=1);

namespace App\Controller;

use App\Application\Post\Command\PostCreateCommand;
use App\Domain\DomainException;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\Post;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\Tags;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid as DomainUuid;
use App\Domain\User\BlogUser;
use App\Domain\User\UserIdentity;
use App\Infrastructure\CommandBus\CommandBusInterface;
use App\Infrastructure\ECorp\IdpInterface;
use App\Infrastructure\Form\PostModel;
use App\Infrastructure\Form\PostType;
use App\Infrastructure\ImageUploader;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class BlogAdminController extends AbstractController
{
    private IdpInterface $idp;
    private CommandBusInterface $commandBus;

    public function __construct(IdpInterface $idp, CommandBusInterface $commandBus)
    {
        $this->idp = $idp;
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
                        Content::fromString($userFormModel->content),
                        new Tags([
                            Tag::fromString('first-tag')
                        ]),
                        Category::fromString('my-category'),
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
}
