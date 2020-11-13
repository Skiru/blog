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
    public bool $published = false;

    public static function createTagList(array $tags): TagList
    {
        return new TagList(array_map(fn(string $tag): Tag => Tag::fromParameters(TagName::fromString($tag)), $tags));
    }

    public static function createFromArray(array $data): self
    {
        $postModel = new self();
        if (isset($data['title'])) {
            $postModel->title = $data['title'];
        }
        if (isset($data['content'])) {
            $postModel->content = $data['content'];
        }
        if (isset($data['headerImage'])) {
            $postModel->headerImage = $data['headerImage'];
        }
        if (isset($data['readTime'])) {
            $postModel->readTime = $data['readTime'];
        }
        if (isset($data['category'])) {
            $postModel->category = $data['category'];
        }
        if (isset($data['tags'])) {
            $postModel->tags = $data['tags'];
        }
        if (isset($data['published'])) {
            $postModel->published = $data['published'];
        }

        return $postModel;
    }
}