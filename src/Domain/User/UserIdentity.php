<?php

namespace App\Domain\User;

final class UserIdentity
{
    private string $uuid;

    /**
     * UserIdentity constructor.
     * @param string $uuid
     */
    public function __construct(string $uuid)
    {
        $this->uuid = $uuid;
    }

    /**
     * @return string
     */
    public function asString(): string
    {
        return $this->uuid;
    }

    /**
     * @param UserIdentity $identity
     *
     * @return bool
     */
    public function equal(UserIdentity $identity): bool
    {
        return $this->asString() === $identity->asString();
    }
}