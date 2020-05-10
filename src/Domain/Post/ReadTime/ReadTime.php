<?php

declare(strict_types=1);

namespace App\Domain\Post\ReadTime;

final class ReadTime
{
    private int $readTime;

    private function __construct(int $readTime)
    {
        $this->readTime = $readTime;
    }

    public static function fromParameter(int $readTimeInMin): self
    {
        return new self($readTimeInMin);
    }

    public function getReadTime(): int
    {
        return $this->readTime;
    }
}