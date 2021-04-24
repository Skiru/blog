<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Domain\Post\Category\Category;
use App\Domain\Post\Category\CategoryRepositoryInterface;

class CategoryRepository extends MongoDbClient implements CategoryRepositoryInterface
{
    public function insert(Category $category): void
    {
        $this->database
            ->selectCollection(self::CATEGORY_TABLE)
            ->insertOne($category->toArray());
    }
}