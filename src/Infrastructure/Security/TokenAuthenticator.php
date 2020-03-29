<?php

declare(strict_types=1);

namespace App\Infrastructure\Security;

use Firebase\JWT\JWT;
use GuzzleHttp\Client;
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
    private Client $client;

    private TokenStorageInterface $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
        $this->client = new Client();
    }

    /**
     * @param Request $request
     * @param AuthenticationException|null $authException
     *
     * @return RedirectResponse|Response
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        dump('auth not used?');
        die;
    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    public function supports(Request $request)
    {
        return 'handle_code' === $request->attributes->get('_route') && $request->isMethod('GET');
    }

    public function getCredentials(Request $request)
    {
        $code = $request->get('code');
        $response = $this->client->request('POST', 'ecorp_ecorp_purple_clouds_nginx_1:8000/oauth/v2/token', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => '1_4f6ilbknfuo000sw000c0osk0gkgwc0wwkwowog0c404wo4s4k',
                'client_secret' => '3o6at2qlcke8co0w0s0sk40c4o4wwkswg0s4ow4kcc88woo4cg',
                'code' => $code,
                'redirect_uri' => 'http://localhost:8001/oauth/v2/code'
            ]
        ]);

        $responseArray = json_decode($response->getBody()->getContents(), true);

        return $responseArray['access_token'];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $key = file_get_contents('jwt.pem', true);
        $decodedJwt = JWT::decode($credentials, $key, ['HS256']);

        $userMeUrl = sprintf(
            '%s/%s',
            'ecorp_ecorp_purple_clouds_nginx_1:8000/api/users',
            $decodedJwt->user
        ); //add authorization

        $userResponse = $this->client->request('GET', $userMeUrl);
        $userArrayResponse = json_decode($userResponse->getBody()->getContents(), true);

        $user = User::fromParameters(
            $userArrayResponse['username'],
            $userArrayResponse['email'],
            $userArrayResponse['age'],
            $credentials
        );

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return $user instanceof BlogUserInterface;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        die('authentication failed');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        return new RedirectResponse('/dashboard');
//        return null;
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
