<?php

declare(strict_types=1);

namespace App\Domain\Post\Category;

class Category
{
    private string $category;

    private function __construct(string $category)
    {
        //TODO add $category validation
        $this->category = $category;
    }

    public static function fromString(string $category): self
    {
        return new self($category);
    }

    public function asString(): string
    {
        return $this->category;
    }
}
