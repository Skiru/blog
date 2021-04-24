<?php

declare(strict_types=1);

namespace App\Application\Category\Command;

use App\Domain\Post\Category\Category;

final class CategoryCreateCommand
{
    private Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }
}