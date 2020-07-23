<?php

declare(strict_types=1);

namespace App\Controller;

use App\Application\Tag\Query\TagQueryInterface;
use App\Infrastructure\ECorp\IdpInterface;
use App\Infrastructure\Form\PostModel;
use App\Infrastructure\Form\PostType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class BlogAdminController extends AbstractController
{
    private IdpInterface $idp;
    private TagQueryInterface $tagQuery;

    public function __construct(IdpInterface $idp, TagQueryInterface $tagQuery)
    {
        $this->idp = $idp;
        $this->tagQuery = $tagQuery;
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

    public function tags(): Response
    {
        $tags = $this->tagQuery->getAll();
        
        return $this->render('admin/tags.html.twig', [
            'tags' => $tags
        ]);
    }
}
