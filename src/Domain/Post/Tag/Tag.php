<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

final class Tag
{
    private string $tag;

    private function __construct(string $tag)
    {
        //TODO add tag validation
        $this->tag = $tag;
    }

    public static function fromString(string $tag): self
    {
        return new self($tag);
    }

    public function asString(): string
    {
        return $this->tag;
    }
}
