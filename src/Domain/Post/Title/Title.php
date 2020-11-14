<?php

declare(strict_types=1);

namespace App\Domain\Post\Title;

use App\Domain\DomainException;

final class Title
{
    private string $title;

    private function __construct(string $title)
    {
        if ('' === trim($title)) {
            throw new DomainException('Title could not be empty!');
        }
        $this->title = $title;
    }

    /**
     * @throws DomainException
     */
    public static function fromString(string $title): self
    {
        return new self($title);
    }

    public function asString(): string
    {
        return $this->title;
    }

}
