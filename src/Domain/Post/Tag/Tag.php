<?php

declare(strict_types=1);

namespace App\Domain\Post\Tag;

use App\Domain\Shared\Uuid;

final class Tag
{
    private Uuid $uuid;
    private TagName $name;

    private function __construct(TagName $name)
    {
        $this->name = $name;
    }

    public static function fromTagName(TagName $tagName): self
    {
        return new self($tagName);
    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    public function getName(): TagName
    {
        return $this->name;
    }

    public function toArray(): array
    {
        return [
            'uuid' => $this->uuid->asString(),
            'name' => $this->name->asString()
        ];
    }
}
