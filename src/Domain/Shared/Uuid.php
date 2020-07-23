<?php

declare(strict_types=1);

namespace App\Domain\Shared;

final class Uuid
{
    private string $uuid;

    public function __construct(string $uuid)
    {
        $this->uuid = $uuid;
    }

    public function asString(): string
    {
        return $this->uuid;
    }
}
