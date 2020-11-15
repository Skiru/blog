<?php

declare(strict_types=1);

namespace App\Infrastructure\ECorp;

use App\Infrastructure\Security\User;
use Firebase\JWT\JWT;
use GuzzleHttp\Client;
use GuzzleHttp\ClientInterface;

final class Connector implements IdpInterface
{
    private const ECORP_DOCKER_TOKEN_ENDPOINT = 'ecorp_ecorp_purple_clouds_nginx_1:8000/oauth/v2/token';
    private const ECORP_USERS_ENDPOINT = 'ecorp_ecorp_purple_clouds_nginx_1:8000/api/users';

    private string $clientId;
    private string $clientSecret;
    private string $authorizeEndpoint;
    private string $tokenEndpoint;
    private string $redirectUri;
    private ClientInterface $client;

    public function __construct(
        string $clientId,
        string $clientSecret,
        string $authorizeEndpoint,
        string $tokenEndpoint,
        string $redirectUri
    ) {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->authorizeEndpoint = $authorizeEndpoint;
        $this->tokenEndpoint = $tokenEndpoint;
        $this->redirectUri = $redirectUri;
        $this->client = new Client();
    }

    public function buildAuthorizeUri(): string
    {
        return sprintf(
            '%s?client_id=%s&redirect_uri=%s&response_type=code&scope=profile',
            $this->authorizeEndpoint,
            $this->clientId,
            $this->redirectUri,
        );
    }

    public function getToken(string $code): string
    {
        $response = $this->client->request('POST',  self::ECORP_DOCKER_TOKEN_ENDPOINT, [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'code' => $code,
                'redirect_uri' => $this->redirectUri
            ]
        ]);

        $responseArray = json_decode($response->getBody()->getContents(), true);

        return $responseArray['access_token'];
    }

    public function getUserByToken(string $token): User
    {
        $key = file_get_contents('jwt.pem', true);
        $decodedJwt = JWT::decode($token, $key, ['HS256']);
        $userResponse = $this->client->request('GET', $this->getUserDataEndpointUrl($decodedJwt->user));
        $userArrayResponse = json_decode($userResponse->getBody()->getContents(), true);

        return User::fromParameters(
            $userArrayResponse['username'],
            $userArrayResponse['email'],
            $userArrayResponse['age'],
            $token,
            $decodedJwt->user
        );
    }

    private function getUserDataEndpointUrl(string $userUuid): string
    {
        return sprintf(
            '%s/%s',
            self::ECORP_USERS_ENDPOINT,
            $userUuid
        );
    }
}