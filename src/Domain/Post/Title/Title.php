<?php

declare(strict_types=1);

namespace App\Domain\Post\Title;

final class Title
{
    private string $title;

    private function __construct(string $title)
    {
        //TODO add validation
        $this->title = $title;
    }

    public static function fromString(string $title): self
    {
        return new self($title);
    }

    public function asString(): string
    {
        return $this->title;
    }

}
