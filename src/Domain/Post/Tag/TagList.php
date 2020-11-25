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

    /**
     * @throws TagException
     */
    public function removeTag(Tag $tag): void
    {
        foreach ($this->tags as $tagKey => $tagValue) {
            if ($tagValue->getName()->equals($tag->getName())) {
                unset($this->tags[$tagKey]);

                return;
            }
        }

        throw new TagException('Tag couldnt be deleted as it doesnt exist in the list');
    }

    public function add(Tag $tag): void
    {
        $this->tags[] = $tag;
    }

    public function hasTag(Tag $tag): bool
    {
        foreach ($this->tags as $existingTag) {
            if ($existingTag->getName()->equals($tag->getName())) {
                return true;
            }
        }

        return false;
    }

    public function toArray(): array
    {
        return array_values(
            array_map(fn (Tag $tag) => $tag->getName()->asString(), $this->getTags())
        );
    }
}
