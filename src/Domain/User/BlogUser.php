<?php

namespace App\Domain\User;

class BlogUser
{
    private UserIdentity $user;

    /**
     * BlogUser constructor.
     * @param UserIdentity $user
     */
    public function __construct(UserIdentity $user)
    {
        $this->user = $user;
    }

    /**
     * @return UserIdentity
     */
    public function getUser(): UserIdentity
    {
        return $this->user;
    }
}