<?php

declare(strict_types=1);

namespace App\Domain\Post\Category;

class Category
{
    private CategoryName $categoryName;

    private function __construct(CategoryName $categoryName)
    {
        $this->categoryName = $categoryName;
    }

    public static function fromCategoryName(CategoryName $categoryName): Category
    {
        return new self($categoryName);
    }

    public function getCategoryName(): CategoryName
    {
        return $this->categoryName;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->categoryName->asString()
        ];
    }
}
