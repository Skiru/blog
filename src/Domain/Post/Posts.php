<?php

declare(strict_types=1);

namespace App\Domain\Post;

//TODO this should be a collection
class Posts
{
    /**
     * @var Post[]
     */
    private array $posts;

    /**
     * @param Post[] $posts
     */
    public function __construct($posts)
    {
        $this->posts = $posts;
    }


    public function add(Post $post): void
    {
        $this->posts[] = $post;
    }

    /**
     * @return Post[]
     */
    public function getPosts(): array
    {
        return $this->posts;
    }
}
