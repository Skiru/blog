<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;
use MongoDB\Model\BSONDocument;

class PostQueryRepository extends MongoDbClient implements PostQueryInterface
{
    private const POST_TABLE = 'posts';

    public function findAll(): array
    {
        $cursor = $this->database->selectCollection(self::POST_TABLE)->find([]);
        //TODO check if cursor is not dead

        return array_map(fn (BSONDocument $entry) => new PostView(
            $entry['uuid'],
            $entry['title'],
            $entry['author'],
            $entry['content'],
            $entry['category'],
            array_map(fn (BSONDocument $tag) => $tag->getArrayCopy(), $entry['tags']->getArrayCopy()),
            $entry['published'],
            $entry['header_image'],
            $entry['created_at'],
            $entry['updated_at'],
            $entry['deleted_at'],
        ), $cursor->toArray());
    }
}
