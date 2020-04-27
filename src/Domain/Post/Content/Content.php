<?php

declare(strict_types=1);

namespace App\Domain\Post\Content;

final class Content
{
    private string $content;

    private function __construct(string $content)
    {
        //TODO add content validation
        $this->content = $content;
    }

    public static function fromString(string $content): self
    {
        return new self($content);
    }

    public function asString(): string
    {
        return $this->content;
    }
}
