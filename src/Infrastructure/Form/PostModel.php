<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

class PostModel
{
    public string $title = '';
    public string $content = '';
    public string $headerImage = '';
    public int $readTime = 0;
    public string $category = '';
    public array $tags = [];
}