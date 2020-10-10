<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

final class Tag
{
    public const EMPTY_TAG = '---';

    private TagName $name;

    public function __construct(TagName $name)
    {
        $this->name = $name;
    }

    public static function fromParameters(TagName $tagName): self
    {
        return new self($tagName);
    }

    public function getName(): TagName
    {
        return $this->name;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name->asString()
        ];
    }
}
