<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

final class Tags
{
    /**
     * @var Tag[]
     */
    private array $tag;

    /**
     * @param Tag[]|array $tag
     */
    public function __construct(array $tag)
    {
        $this->tag = $tag;
    }

    /**
     * @return Tag[]
     */
    public function getTags(): array
    {
        return $this->tag;
    }
}
