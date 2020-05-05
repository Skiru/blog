<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;
use MongoDB\Model\BSONDocument;

class PostQueryRepository extends MongoDbClient implements PostQueryInterface
{
    public function findAll(): array
    {
        $cursor = $this->postCollection->find([], [
            'projection' => [
                'uuid' => 1,
                'title' => 1,
                'author' => 1,
                'content' => 1,
                'tags' => 1,
                'category' => 1,
                'created_at' => 1,
                'updated_at' => 1,
                'deleted_at' => 1,
                'published' => 1,
                'header_image' => 1
            ]
        ]);
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
