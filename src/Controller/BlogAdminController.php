<?php

declare(strict_types=1);

namespace App\Controller;

use App\Infrastructure\ECorp\IdpInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class BlogAdminController extends AbstractController
{
    private IdpInterface $idp;

    public function __construct(IdpInterface $idp)
    {
        $this->idp = $idp;
    }

    public function login(): Response
    {
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
        return $this->render('admin/dashboard.html.twig');
    }
}
