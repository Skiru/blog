<?php

declare(strict_types=1);

namespace App\Application\Tag\Command;

use App\Domain\Post\Tag\TagRepositoryInterface;

final class TagDeleteCommandHandler
{
    private TagRepositoryInterface $tagRepository;

    public function __construct(TagRepositoryInterface $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @throws TagCommandException
     */
    public function handle(TagDeleteCommand $command): void
    {
        $tag = $command->getTag();
        if ($this->tagRepository->isUsed($tag)) {
            throw new TagCommandException(
                sprintf('Tag "%s" could not be deleted because it is used!', $tag->getName()->asString())
            );
        }

        $this->tagRepository->delete($tag);
    }
}