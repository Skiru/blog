<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Domain\Post\Post;
use App\Domain\Post\PostRepositoryInterface;
use DateTimeImmutable;

class PostRepository extends MongoDbClient implements PostRepositoryInterface
{
    public function insert(Post $post): void
    {
        $this->postCollection->insertOne([
            'uuid' => $post->getUuid()->asString(),
            'title' => $post->getTitle()->asString(),
            'author' => $post->getAuthor()->getUser()->asString(),
            'content' => $post->getContent()->asString(),
            'tags' => $post->getTags()->getTags(),
            'category' => $post->getCategory()->asString(),
            'created_at' => $post->getCreatedAt()->format(DateTimeImmutable::ATOM),
            'updated_at' => $post->getUpdatedAt()->format(DateTimeImmutable::ATOM),
            'deleted_at' => null === $post->getDeletedAt()
                ? null
                : $post->getDeletedAt()->format(DateTimeImmutable::ATOM),
            'published' => $post->isPublished()
        ]);
    }
}
