<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Domain\Post\PostRepositoryInterface;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagRepositoryInterface;

class TagRepository extends MongoDbClient implements TagRepositoryInterface
{
    public const TAG_TABLE = 'tags';

    public function insert(Tag $tag): void
    {
        $this
            ->database
            ->selectCollection(self::TAG_TABLE)
            ->insertOne($tag->toArray());
    }

    public function delete(Tag $tag): void
    {
        $this->database
            ->selectCollection(self::TAG_TABLE)
            ->deleteOne(
                [
                    'name' => $tag->getName()->asString()
                ], [
                    'typeMap' => [
                        'document' => 'array'
                    ]
                ]
            );
    }

    public function isUsed(Tag $tag): bool
    {
        $result = $this
            ->database
            ->selectCollection(PostRepository::POST_TABLE)
            ->find([
                'tags' => [
                    '$all' => [
                        $tag->getName()->asString()
                    ]
                ]
            ],[
                'typeMap' => ['document' => 'array']
            ]);

        return !empty($result->toArray());
    }
}
