<?php

declare(strict_types=1);

namespace App\Controller;

use App\Infrastructure\Authentication\BlogUserToken;
use App\Infrastructure\Security\TokenAuthenticator;
use App\Infrastructure\Security\User;
use Firebase\JWT\JWT;
use GuzzleHttp\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class BlogAdminController extends AbstractController
{
    private TokenStorageInterface $tokenStorage;

    private SessionInterface $session;

    private EventDispatcherInterface $eventDispatcher;

    private AuthenticationManagerInterface $authentication;


    public function __construct(TokenStorageInterface $tokenStorage, SessionInterface $session, EventDispatcherInterface $eventDispatcher, AuthenticationManagerInterface $authentication)
    {
        $this->tokenStorage = $tokenStorage;
        $this->session = $session;
        $this->eventDispatcher = $eventDispatcher;
        $this->authentication = $authentication;
    }

    public function login(): Response
    {
        $idpAuthLink = sprintf(
            'http://%s/oauth/v2/auth?client_id=%s&redirect_uri=%s&response_type=code&scope=profile',
            'localhost:8000',
            '1_4f6ilbknfuo000sw000c0osk0gkgwc0wwkwowog0c404wo4s4k',
            'http://localhost:8001/oauth/v2/code', //Auth code handle on blog side
        );

        return $this->render('security/login.html.twig', ['idp_auth_link' => $idpAuthLink]);
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
