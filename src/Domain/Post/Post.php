<?php

declare(strict_types=1);

namespace App\Domain\Post;

use App\Domain\DateTime\DateTimeTrait;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\Tags;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid;
use App\Domain\User\BlogUser;
use DateTimeImmutable;

final class Post
{
    use DateTimeTrait;

    private Uuid $uuid;

    private Title $title;

    private BlogUser $author;

    private Content $content;

    private Tags $tags;

    private Category $category;

    private bool $published;

    private function __construct(
        Uuid $uuid,
        Title $title,
        BlogUser $author,
        Content $content,
        Tags $tags,
        Category $category,
        bool $published,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt,
        ?DateTimeImmutable $deletedAt
    ) {
        $this->uuid = $uuid;
        $this->title = $title;
        $this->author = $author;
        $this->content = $content;
        $this->tags = $tags;
        $this->category = $category;
        $this->published = $published;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
    }

    public static function createFromParameters(
        Uuid $uuid,
        Title $title,
        BlogUser $author,
        Content $content,
        Tags $tags,
        Category $category
    ): Post {
        return new self(
            $uuid,
            $title,
            $author,
            $content,
            $tags,
            $category,
            false,
            new DateTimeImmutable(),
            new DateTimeImmutable(),
            null
        );
    }

    /**
     * @return Uuid
     */
    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    /**
     * @return Title
     */
    public function getTitle(): Title
    {
        return $this->title;
    }

    /**
     * @return BlogUser
     */
    public function getAuthor(): BlogUser
    {
        return $this->author;
    }

    /**
     * @return Content
     */
    public function getContent(): Content
    {
        return $this->content;
    }

    /**
     * @return Tags
     */
    public function getTags(): Tags
    {
        return $this->tags;
    }

    /**
     * @return Category
     */
    public function getCategory(): Category
    {
        return $this->category;
    }

    /**
     * @return bool
     */
    public function isPublished(): bool
    {
        return $this->published;
    }

    public function toArray(): array
    {
        return [
            'uuid' => $this->getUuid()->asString(),
            'title' => $this->getTitle()->asString(),
            'author' => $this->getAuthor()->getUser()->asString(),
            'content' => $this->getContent()->asString(),
            'tags' => array_map(fn (Tag $tag) => ['tag' => $tag->asString()], $this->getTags()->getTags()),
            'category' => $this->getCategory()->asString(),
            'created_at' => $this->getCreatedAt()->format(DateTimeImmutable::ATOM),
            'updated_at' => $this->getUpdatedAt()->format(DateTimeImmutable::ATOM),
            'deleted_at' => null === $this->getDeletedAt()
                ? null
                : $this->getDeletedAt()->format(DateTimeImmutable::ATOM),
            'published' => $this->isPublished()
        ];
    }
}
