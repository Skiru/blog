<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Application\Post\Query\PostQueryInterface;
use App\Domain\Post\PostRepositoryInterface;
use Exception;

class PostCreateCommandHandler
{
    private PostRepositoryInterface $postRepository;
    private PostQueryInterface $postQuery;

    public function __construct(PostRepositoryInterface $postRepository, PostQueryInterface $postQuery)
    {
        $this->postRepository = $postRepository;
        $this->postQuery = $postQuery;
    }

    /**
     * @throws Exception
     */
    public function handle(PostCreateCommand $createCommand): void
    {
        try {
            $this->postQuery->getOneBySlug($createCommand->getPost()->getSlug());

            $this->postRepository->insert($createCommand->getPost());
        } catch (Exception $exception) {
            throw $exception;
        }
    }
}
