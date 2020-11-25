<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;
use App\Domain\Post\Slug\Slug;
use App\Domain\Post\Tag\Tag;
use App\Domain\Shared\Uuid;
use Exception;
use MongoDB\Driver\Cursor;
use MongoDB\Model\BSONDocument;
use stdClass;

class PostQueryRepository extends MongoDbClient implements PostQueryInterface
{
    private const POST_TABLE = 'posts';

    public function findAll(): array
    {
        $document = $this->database
            ->selectCollection(self::POST_TABLE)
            ->find([
                'deleted_at' => null
            ], [
                'typeMap' => ['document' => 'array']
            ]);

        return array_map(fn(stdClass $document) => new PostView(
            $document->uuid,
            $document->title,
            $document->slug,
            $document->author,
            base64_decode($document->content),
            $document->category,
            $document->read_time,
            $document->tags,
            $document->published,
            $document->header_image,
            $document->created_at,
            $document->updated_at,
            $document->deleted_at,
        ), $document->toArray());
    }

    /**
     * @inheritDoc
     */
    public function getByUuid(Uuid $uuid): PostView
    {
        /**
         * @var BSONDocument|null $document
         */
        $document = $this->database
            ->selectCollection(self::POST_TABLE)
            ->findOne([
                'uuid' => $uuid->asString(),
                'deleted_at' => null
            ], ['typeMap' => ['document' => 'array']]);

        if (null === $document) {
            //TODO Make infrastructure exception
            throw new Exception('Post not found');
        }

        return new PostView(
            $document->uuid,
            $document->title,
            $document->slug,
            $document->author,
            base64_decode($document->content),
            $document->category,
            $document->read_time,
            $document->tags,
            $document->published,
            $document->header_image,
            $document->created_at,
            $document->updated_at,
            $document->deleted_at,
        );
    }

    /**
     * @inheritDoc
     */
    public function getOneBySlug(Slug $slug): PostView
    {
        /**
         * @var BSONDocument|null $document
         */
        $document = $this->database
            ->selectCollection(self::POST_TABLE)
            ->findOne([
                'slug' => $slug->asString(),
                'deleted_at' => null
            ], ['typeMap' => ['document' => 'array']]);

        if (null === $document) {
            //TODO Make infrastructure exception
            throw new Exception('Post not found');
        }

        return new PostView(
            $document->uuid,
            $document->title,
            $document->slug,
            $document->author,
            base64_decode($document->content),
            $document->category,
            $document->read_time,
            $document->tags,
            $document->published,
            $document->header_image,
            $document->created_at,
            $document->updated_at,
            $document->deleted_at,
        );
    }

    public function findAllPublished(): array
    {
        $document = $this->database
            ->selectCollection(self::POST_TABLE)
            ->find([
                'published' => true,
                'deleted_at' => null
            ], [
                'typeMap' => [
                    'document' => 'array'
                ],
                'sort' => [
                    'created_at' => -1
                ]
            ]);

        return array_map(fn(stdClass $document) => new PostView(
            $document->uuid,
            $document->title,
            $document->slug,
            $document->author,
            base64_decode($document->content),
            $document->category,
            $document->read_time,
            $document->tags,
            $document->published,
            $document->header_image,
            $document->created_at,
            $document->updated_at,
            $document->deleted_at,
        ), $document->toArray());
    }

    /**
     * @inheritDoc
     */
    public function findAllByTag(Tag $tag): array
    {
        /**
         * @var Cursor $documents
         */
        $documents = $this
            ->database
            ->selectCollection(self::POST_TABLE)
            ->find([
                'deleted_at' => null,
                'tags' => [
                    '$all' => [
                        $tag->getName()->asString()
                    ]
                ]
            ],[
                'typeMap' => ['document' => 'array']
            ]);

        return array_map(fn(stdClass $document) => new PostView(
            $document->uuid,
            $document->title,
            $document->slug,
            $document->author,
            base64_decode($document->content),
            $document->category,
            $document->read_time,
            $document->tags,
            $document->published,
            $document->header_image,
            $document->created_at,
            $document->updated_at,
            $document->deleted_at,
        ), $documents->toArray());
    }
}
