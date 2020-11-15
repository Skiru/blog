<?php

declare(strict_types=1);

namespace App\Domain\Post;

interface PostRepositoryInterface
{
    public function insert(Post $post): void;
    public function update(Post $post): void;
    public function delete(Post $post): void;
}
