<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

interface TagRepositoryInterface
{
    public function insert(Tag $tag): void;
    public function delete(Tag $tag): void;
    public function isUsed(Tag $tag): bool;
    public function update(Tag $tag, Tag $updatedTag): void;
}