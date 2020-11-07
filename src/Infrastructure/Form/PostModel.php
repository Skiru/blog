<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

use Symfony\Component\Validator\Constraints as Assert;

class PostModel
{
    public string $title = '';
    public string $content = '';
    public string $headerImage = '';
    public int $readTime = 0;
    public string $category = '';
    public array $tags = [];
}