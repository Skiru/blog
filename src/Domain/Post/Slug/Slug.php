<?php

declare(strict_types=1);

namespace App\Domain\Post\Slug;

class Slug
{
    public const SLUG_SEPARATOR = '-';

    private string $slug;

    private function __construct(string $slug)
    {
        $this->slug = $slug;
    }

    public static function fromString(string $slug): Slug
    {
        return new self($slug);
    }

    public function asString(): string
    {
        return $this->slug;
    }
}