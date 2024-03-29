<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Domain\Post\Post;
use App\Domain\Post\PostRepositoryInterface;
use DateTimeImmutable;

class PostRepository extends MongoDbClient implements PostRepositoryInterface
{
    public const POST_TABLE = 'posts';

    public function insert(Post $post): void
    {
        $this->database
            ->selectCollection(self::POST_TABLE)
            ->insertOne($post->toArray());
    }

    public function update(Post $post): void
    {
        $this->database
            ->selectCollection(self::POST_TABLE)
            ->updateOne(
                ['uuid' => $post->getUuid()->asString()],
                ['$set' => $post->toArray()],
                ['typeMap' => ['document' => 'array']]
            );
    }

    public function delete(Post $post): void
    {
        $this->database
            ->selectCollection(self::POST_TABLE)
            ->updateOne([
                'uuid' => $post->getUuid()->asString()
            ],[
                '$set' => ['deleted_at' => $post->getDeletedAt()->format(DateTimeImmutable::ATOM)]
            ],[
                'typeMap' => ['document' => 'array']
            ]);
    }
}
