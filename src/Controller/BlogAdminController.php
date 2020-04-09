<?php

declare(strict_types=1);

namespace App\Controller;

use App\Infrastructure\ECorp\IdpInterface;
use App\Infrastructure\Security\TokenAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

class BlogAdminController extends AbstractController
{
    private TokenStorageInterface $tokenStorage;

    private SessionInterface $session;

    private EventDispatcherInterface $eventDispatcher;

    private AuthenticationManagerInterface $authentication;

    private IdpInterface $idp;

    public function __construct(
        TokenStorageInterface $tokenStorage,
        SessionInterface $session,
        EventDispatcherInterface $eventDispatcher,
        AuthenticationManagerInterface $authentication,
        IdpInterface $idp
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->session = $session;
        $this->eventDispatcher = $eventDispatcher;
        $this->authentication = $authentication;
        $this->idp = $idp;
    }

    public function login(): Response
    {
        return $this->render('security/login.html.twig', [
            'idp_auth_link' => $this->idp->buildAuthorizeUri()
        ]);
    }

    public function logout()
    {
        //Should never be called
    }

    public function handleCode(TokenAuthenticator $authenticator, GuardAuthenticatorHandler $guardHandler, Request $request): RedirectResponse
    {
        return $this->redirectToRoute('dashboard');
    }

    /**
     * @return Response
     */
    public function dashboard(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }
}
