<?php

declare(strict_types=1);

namespace App\Application\Category\Query;

use App\Domain\Post\Category\CategoryName;

interface CategoryQueryInterface
{
    /**
     * @return CategoryView[]
     */
    public function findAll(): array;

    public function findOneByName(CategoryName $name): ?CategoryView;
}