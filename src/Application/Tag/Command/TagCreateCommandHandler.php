<?php

declare(strict_types=1);

namespace App\Application\Tag\Command;

use App\Domain\Post\Tag\TagRepositoryInterface;

final class TagCreateCommandHandler
{
    private TagRepositoryInterface $tagRepository;

    public function __construct(TagRepositoryInterface $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    public function handle(TagCreateCommand $command): void
    {
        $this->tagRepository->insert($command->getTag());
    }
}
