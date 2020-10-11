<?php

declare(strict_types=1);

namespace App\Domain\Post\Category;

interface CategoryRepositoryInterface
{
    public function insert(Category $category): void;
}
