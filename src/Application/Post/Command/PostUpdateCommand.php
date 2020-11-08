<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Domain\Post\Post;

final class PostUpdateCommand
{
    private Post $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function getPost(): Post
    {
        return $this->post;
    }
}