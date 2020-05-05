<?php

declare(strict_types=1);

namespace App\Domain\Post\Image;

class HeaderImage
{
    private string $url;

    private function __construct(string $url)
    {
        $this->url = $url;
    }

    public static function createFromString(string $url): HeaderImage
    {
        return new self($url);
    }

    public function getUrl(): string
    {
        return $this->url;
    }
}