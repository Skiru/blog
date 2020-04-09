<?php

declare(strict_types=1);

namespace App\Infrastructure\ECorp;

use App\Infrastructure\Security\User;

interface IdpInterface
{
    public function buildAuthorizeUri(): string;

    public function getToken(string $code): string;

    public function getUserByToken(string $token): User;
}