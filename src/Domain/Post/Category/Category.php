<?php

declare(strict_types=1);

namespace App\Domain\Post\Category;

use App\Domain\Shared\Uuid;

class Category
{
    private Uuid $uuid;
    private CategoryName $categoryName;

    private function __construct(CategoryName $categoryName)
    {
        $this->categoryName = $categoryName;
    }

    public static function fromCategoryName(CategoryName $categoryName): self
    {
        return new self($categoryName);
    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    public function getCategoryName(): CategoryName
    {
        return $this->categoryName;
    }
}
