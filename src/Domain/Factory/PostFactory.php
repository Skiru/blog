<?php

namespace App\Domain\Factory;

use App\Domain\Post\Post;

class PostFactory
{
    public function createNewPost(): Post
    {
       return new Post();
    }
}