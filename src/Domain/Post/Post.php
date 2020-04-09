<?php

namespace App\Domain\Post;

use App\Domain\Category\Category;
use App\Domain\DateTime\DateTimeTrait;
use App\Domain\Tag;
use App\Domain\User\BlogUser;

class Post
{
    use DateTimeTrait;

    private string $title;

    private BlogUser $author;

    private string $content;

    private Tag $tags;

    private Category $category;

    private bool $published;
}
