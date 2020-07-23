<?php

namespace App\Domain\User;

class BlogUser
{
    private UserIdentity $user;

    public function __construct(UserIdentity $user)
    {
        $this->user = $user;
    }

    public function getUser(): UserIdentity
    {
        return $this->user;
    }
}
