<?php

declare(strict_types=1);

namespace App\Infrastructure\Security;

use App\Infrastructure\ECorp\IdpInterface;
use Exception;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class TokenAuthenticator extends AbstractGuardAuthenticator
{
    private IdpInterface $idp;

    private TokenStorageInterface $tokenStorage;

    public function __construct(IdpInterface $idp, TokenStorageInterface $tokenStorage)
    {
        $this->idp = $idp;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param Request $request
     * @param AuthenticationException|null $authException
     *
     * @return RedirectResponse|Response
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new RedirectResponse('/');
    }

    public function supports(Request $request): bool
    {
        return 'handle_code' === $request->attributes->get('_route') && $request->isMethod('GET');
    }

    public function getCredentials(Request $request)
    {
        return $this->idp->getToken($request->get('code'));
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $this->idp->getUserByToken($credentials);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return $user instanceof BlogUserInterface;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        throw new Exception('Authentication failed');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return new RedirectResponse('/dashboard');
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
