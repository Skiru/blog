<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Application\Post\Dto\PostUpdateDto;
use App\Application\Post\Query\PostView;

final class PostUpdateCommand
{
    private PostView $postView;
    private PostUpdateDto $dto;

    public function __construct(PostView $post, PostUpdateDto $dto)
    {
        $this->postView = $post;
        $this->dto = $dto;
    }

    public function getPostView(): PostView
    {
        return $this->postView;
    }

    public function getDto(): PostUpdateDto
    {
        return $this->dto;
    }
}