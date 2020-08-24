<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagRepositoryInterface;

class TagRepository extends MongoDbClient implements TagRepositoryInterface
{
    private const TAG_TABLE = 'tags';

    public function insert(Tag $tag): void
    {
        $this
            ->database
            ->selectCollection(self::TAG_TABLE)
            ->insertOne($tag->toArray());
    }
}
