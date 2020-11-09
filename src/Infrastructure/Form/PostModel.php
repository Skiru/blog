<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagList;
use App\Domain\Post\Tag\TagName;

class PostModel
{
    public string $title = '';
    public string $content = '';
    public string $headerImage = '';
    public int $readTime = 0;
    public string $category = '';
    public array $tags = [];

    public static function createTagList(array $tags): TagList
    {
        return new TagList(array_map(fn(string $tag): Tag => Tag::fromParameters(TagName::fromString($tag)), $tags));
    }
}