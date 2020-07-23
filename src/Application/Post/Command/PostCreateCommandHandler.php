<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Domain\Post\PostRepositoryInterface;

class PostCreateCommandHandler
{
    private PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function handle(PostCreateCommand $createCommand): void
    {
        $this->postRepository->insert($createCommand->getPost());
    }
}
