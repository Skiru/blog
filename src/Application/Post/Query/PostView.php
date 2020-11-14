<?php

declare(strict_types=1);

namespace App\Application\Post\Query;

use DateTimeImmutable;

final class PostView
{
    private string $uuid;
    private string $title;
    private string $slug;
    private string $author;
    private string $content;
    private string $category;
    private int $readTime;
    private array $tags;
    private bool $published;
    private string $headerImage;
    private string $createdAt;
    private string $updatedAt;
    private ?string $deletedAt;

    public function __construct(
        string $uuid,
        string $title,
        string $slug,
        string $author,
        string $content,
        string $category,
        int $readTime,
        array $tags,
        bool $published,
        string $headerImage,
        string $createdAt,
        string $updatedAt,
        ?string $deletedAt
    ) {
        $this->uuid = $uuid;
        $this->title = $title;
        $this->slug = $slug;
        $this->author = $author;
        $this->content = $content;
        $this->category = $category;
        $this->readTime = $readTime;
        $this->tags = $tags;
        $this->published = $published;
        $this->headerImage = $headerImage;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->deletedAt = $deletedAt;
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function getTags(): array
    {
        return $this->tags;
    }

    public function isPublished(): bool
    {
        return $this->published;
    }

    public function getCreatedAt(): string
    {
        return (new DateTimeImmutable($this->createdAt))->format('Y-m-d');
    }

    public function getUpdatedAt(): string
    {
        return (new DateTimeImmutable($this->updatedAt))->format('Y-m-d');
    }

    public function getDeletedAt(): ?string
    {
        if (null === $this->deletedAt) {
            return null;
        }

        return (new DateTimeImmutable($this->deletedAt))->format('Y-m-d');
    }

    public function getHeaderImage(): string
    {
        return $this->headerImage;
    }

    public function getReadTime(): int
    {
        return $this->readTime;
    }

    public function toArray(): array
    {
        return [
            'uuid' => $this->getUuid(),
            'title' => $this->getTitle(),
            'slug' => $this->getSlug(),
            'author' => $this->getAuthor(),
            'content' => $this->getContent(),
            'tags' => $this->getTags(),
            'category' => $this->getCategory(),
            'read_time' => $this->getReadTime(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
            'deleted_at' => $this->getDeletedAt(),
            'published' => $this->isPublished(),
            'header_image' => $this->getHeaderImage()
        ];
    }
}
