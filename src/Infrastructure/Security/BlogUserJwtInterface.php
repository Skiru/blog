<?php
declare(strict_types=1);

namespace App\Infrastructure\Security;

use Symfony\Component\Security\Core\User\UserInterface;

interface BlogUserJwtInterface extends UserInterface
{
    /**
     * @return string
     */
    public function getRawToken(): string;
}
