<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

final class TagName
{
    private const MAX_TAG_NAME_LENGTH = 64;

    private string $name;

    private function __construct(string $name)
    {
        if ('' === trim($name)) {
            throw new TagException('Tag name could not be empty');
        }

        if (64 < strlen(trim($name))) {
            throw new TagException(sprintf('Tag name too long. Max value %d', self::MAX_TAG_NAME_LENGTH));
        }

        $this->name = $name;
    }

    /**
     * @throws TagException
     */
    public static function fromString(string $name): self
    {
        return new self($name);
    }

    public function asString(): string
    {
        return $this->name;
    }

    public function equals(TagName $name): bool
    {
        return $this->name === $name->asString();
    }
}