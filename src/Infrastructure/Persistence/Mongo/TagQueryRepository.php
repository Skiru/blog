<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Tag\Query\TagQueryInterface;
use App\Application\Tag\Query\TagView;
use MongoDB\Model\BSONDocument;

class TagQueryRepository extends MongoDbClient implements TagQueryInterface
{
    private const TAG_TABLE = 'tags';

    public function getAll(): array
    {
        $cursor = $this->database->selectCollection(self::TAG_TABLE)->find([]);

        return array_map(fn (BSONDocument $entry) => new TagView(
            $entry['name']
        ), $cursor->toArray());
    }
}