<?php

declare(strict_types=1);

namespace App\Application\Post\Query;

use DateTime;
use Monolog\DateTimeImmutable;

final class PostView
{
    private string $uuid;
    private string $title;
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
        return (new DateTime($this->createdAt))->format('Y-m-d');
    }

    public function getUpdatedAt(): string
    {
        return $this->updatedAt;
    }

    public function getDeletedAt(): ?string
    {
        return $this->deletedAt;
    }

    public function getHeaderImage(): string
    {
        return $this->headerImage;
    }

    public function getReadTime(): int
    {
        return $this->readTime;
    }
}
