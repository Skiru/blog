<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Application\Post\Query\PostView;

class PostDeleteCommand
{
    public PostView $post;

    public function __construct(PostView $post)
    {
        $this->post = $post;
    }

    public function getPostView(): PostView
    {
        return $this->post;
    }
}