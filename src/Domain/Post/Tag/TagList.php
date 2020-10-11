<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

final class TagList
{
    /**
     * @var Tag[]
     */
    private array $tags;

    /**
     * @param Tag[] $tags
     */
    public function __construct(array $tags)
    {
        $this->tags = $tags;
    }

    /**
     * @return Tag[]
     */
    public function getTags(): array
    {
        return $this->tags;
    }

    public function toArray(): array
    {
        return array_map(fn (Tag $tag) => $tag->getName()->asString(), $this->getTags());
    }
}
