<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\Shared\Uuid;

final class UserIdentity
{
    private Uuid $uuid;

    public function __construct(Uuid $uuid)
    {
        $this->uuid = $uuid;
    }

    public function asString(): string
    {
        return $this->uuid->asString();
    }

    public function equals(UserIdentity $identity): bool
    {
        return $this->asString() === $identity->asString();
    }
}
