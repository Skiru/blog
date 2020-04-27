<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;

class PostQueryRepository extends MongoDbClient implements PostQueryInterface
{
    public function findAll(): array
    {
        $cursor = $this->postCollection->find([], [
            'projection' => [
                'title' => 1,
                'author' => 1
            ]
        ]);
        //TODO check if cursor is not dead
        //TODO start from here!
        dump($cursor->toArray());die;

        return array_map(fn (array $post) => new PostView(), $cursor->toArray());
    }
}
