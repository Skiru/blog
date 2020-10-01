<?php

declare(strict_types=1);

namespace App\Domain\Post;

use App\Domain\DateTime\DateTimeTrait;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\ReadTime\ReadTime;
use App\Domain\Post\Slug\Slug;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagList;
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

    private TagList $tags;

    private Category $category;

    private ReadTime $readTime;

    private bool $published;

    private HeaderImage $image;

    private Slug $slug;

    private function __construct(
        Uuid $uuid,
        Title $title,
        Slug $slug,
        BlogUser $author,
        Content $content,
        TagList $tags,
        Category $category,
        ReadTime $readTime,
        bool $published,
        HeaderImage $image,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt,
        ?DateTimeImmutable $deletedAt
    ) {
        $this->uuid = $uuid;
        $this->title = $title;
        $this->slug = $slug;
        $this->author = $author;
        $this->content = $content;
        $this->tags = $tags;
        $this->category = $category;
        $this->readTime = $readTime;
        $this->published = $published;
        $this->image = $image;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
    }

    public static function createFromParameters(
        Uuid $uuid,
        Title $title,
        Slug $slug,
        BlogUser $author,
        Content $content,
        TagList $tags,
        Category $category,
        ReadTime $readTime,
        HeaderImage $image
    ): Post {
        return new self(
            $uuid,
            $title,
            $slug,
            $author,
            $content,
            $tags,
            $category,
            $readTime,
            false,
            $image,
            new DateTimeImmutable(),
            new DateTimeImmutable(),
            null
        );
    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    public function getTitle(): Title
    {
        return $this->title;
    }

    public function getAuthor(): BlogUser
    {
        return $this->author;
    }

    public function getContent(): Content
    {
        return $this->content;
    }

    public function getTags(): TagList
    {
        return $this->tags;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function getReadTime(): ReadTime
    {
        return $this->readTime;
    }

    public function isPublished(): bool
    {
        return $this->published;
    }

    public function getImage(): HeaderImage
    {
        return $this->image;
    }

    public function getSlug(): Slug
    {
        return $this->slug;
    }

    public function toArray(): array
    {
        return [
            'uuid' => $this->getUuid()->asString(),
            'title' => $this->getTitle()->asString(),
            'slug' => $this->getSlug()->asString(),
            'author' => $this->getAuthor()->getUser()->asString(),
            'content' => $this->getContent()->asString(),
            'tags' => array_map(fn (Tag $tag) => [
                'tag' => [
                    'name' => $tag->getName(),
                ]
            ],
                $this->getTags()->getTags()
            ),
            'category' => $this->getCategory()->getCategoryName()->asString(),
            'read_time' => $this->getReadTime()->asInt(),
            'created_at' => $this->getCreatedAt()->format(DateTimeImmutable::ATOM),
            'updated_at' => $this->getUpdatedAt()->format(DateTimeImmutable::ATOM),
            'deleted_at' => null === $this->getDeletedAt()
                ? null
                : $this->getDeletedAt()->format(DateTimeImmutable::ATOM),
            'published' => $this->isPublished(),
            'header_image' => $this->getImage()->getUrl()
        ];
    }
}
