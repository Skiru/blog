<?php

declare(strict_types=1);

namespace App\Application\Post\Dto;

final class PostUpdateDto
{
    public ?string $title = null;
    public ?string $content = null;
    public ?string $category = null;
    public ?int $readTime = null;
    public ?array $tags = null;
    public ?bool $published = null;
    public ?string $headerImage = null;
}