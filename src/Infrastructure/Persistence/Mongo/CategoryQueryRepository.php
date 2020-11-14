<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Category\Query\CategoryView;
use App\Application\Tag\Query\TagView;
use App\Domain\Post\Category\CategoryName;
use MongoDB\Model\BSONDocument;

class CategoryQueryRepository extends MongoDbClient implements CategoryQueryInterface
{
    public function findAll(): array
    {
        $cursor = $this->database->selectCollection(self::CATEGORY_TABLE)->find([]);

        return array_map(fn (BSONDocument $entry) => new CategoryView(
            $entry['name']
        ), $cursor->toArray());
    }

    public function findOneByName(CategoryName $name): ?CategoryView
    {
        $cursor = $this->database
            ->selectCollection(self::CATEGORY_TABLE)
            ->findOne(['name' => $name->asString()], ['typeMap' => ['document' => 'array']]);

        if (null === $cursor) {
            return null;
        }

        return new CategoryView($cursor->{'name'});
    }
}