<?php

declare(strict_types=1);

namespace App\Application\Tag\Command;

use App\Domain\Post\Tag\Tag;

final class TagCreateCommand
{
    private Tag $tag;

    public function __construct(Tag $tag)
    {
        $this->tag = $tag;
    }

    public function getTag(): Tag
    {
        return $this->tag;
    }
}