<?php

declare(strict_types=1);

namespace App\Infrastructure\Security;

use Symfony\Component\Security\Core\User\UserInterface;

interface BlogUserInterface extends UserInterface
{
    public const DEFAULT_ROLE = 'ROLE_USER';

    public function getEmail(): string;
    public function getUsername(): string;
    public function getAge(): int;
}
