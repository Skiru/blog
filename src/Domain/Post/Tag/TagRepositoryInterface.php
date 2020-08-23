<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

interface TagRepositoryInterface
{
    public function insert(Tag $tag): void;
}