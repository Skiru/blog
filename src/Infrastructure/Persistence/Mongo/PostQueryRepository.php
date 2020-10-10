<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;
use App\Domain\Post\Slug\Slug;
use App\Domain\Shared\Uuid;
use Exception;
use MongoDB\Model\BSONDocument;

class PostQueryRepository extends MongoDbClient implements PostQueryInterface
{
    private const POST_TABLE = 'posts';

    public function findAll(): array
    {
        $cursor = $this->database->selectCollection(self::POST_TABLE)->find([]);
        //TODO check if cursor is not dead

        return array_map(fn (BSONDocument $entry) => new PostView(
            $entry['uuid'],
            $entry['title'],
            $entry['slug'],
            $entry['author'],
            $entry['content'],
            $entry['category'],
            $entry['read_time'],
            array_map(fn (BSONDocument $tag) => $tag->getArrayCopy(), $entry['tags']->getArrayCopy()),
            $entry['published'],
            $entry['header_image'],
            $entry['created_at'],
            $entry['updated_at'],
            $entry['deleted_at'],
        ), $cursor->toArray());
    }

    /**
     * @inheritDoc
     */
    public function getByUuid(Uuid $uuid): PostView
    {
        /**
         * @var BSONDocument|null $document
         */
        $document = $this->database->selectCollection(self::POST_TABLE)->findOne(['uuid' => $uuid->asString()]);
        //TODO check if cursor is not dead

        if (null === $document) {
            //TODO Make infrastructure exception
            throw new Exception('Post not found');
        }

        $entry = $document->getArrayCopy();

        return new PostView(
            $entry['uuid'],
            $entry['title'],
            $entry['slug'],
            $entry['author'],
            base64_decode($entry['content']),
            $entry['category'],
            $entry['read_time'],
            array_map(fn (BSONDocument $tag) => $tag->getArrayCopy(), $entry['tags']->getArrayCopy()),
            $entry['published'],
            $entry['header_image'],
            $entry['created_at'],
            $entry['updated_at'],
            $entry['deleted_at'],
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
                'slug' => $slug->asString()
            ], ['typeMap' => ['array' => 'array']]);

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
}
