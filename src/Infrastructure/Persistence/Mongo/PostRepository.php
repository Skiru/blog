<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Domain\Post\Post;
use App\Domain\Post\PostRepositoryInterface;

class PostRepository extends MongoDbClient implements PostRepositoryInterface
{
    public function insert(Post $post): void
    {
        $this->postCollection->insertOne($post->toArray());
    }
}
