<?php

declare(strict_types=1);

namespace App\Domain\Post\Category;

final class CategoryName
{
    private const MAX_CATEGORY_NAME_LENGTH = 64;

    private string $name;

    private function __construct(string $name)
    {
        if ('' === trim($name)) {
            throw new CategoryException('Category name could not be empty');
        }

        if (64 < strlen(trim($name))) {
            throw new CategoryException(sprintf('Category name too long. Max value %d', self::MAX_CATEGORY_NAME_LENGTH));
        }

        $this->name = $name;
    }

    /**
     * @throws CategoryException
     */
    public static function fromString(string $name): CategoryName
    {
        return new self($name);
    }

    public function asString(): string
    {
        return $this->name;
    }
}