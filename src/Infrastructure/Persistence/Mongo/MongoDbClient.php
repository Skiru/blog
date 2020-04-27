<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use MongoDB\Client;
use MongoDB\Collection;

abstract class MongoDbClient
{
    private const DATABASE_NAME = 'purpleclods_blog';
    private const POST_TABLE = 'posts';

    private Client $mongo;
    protected Collection $postCollection;

    public function __construct(Client $mongo)
    {
        $this->mongo = $mongo;
        $this->postCollection = $this->mongo->selectCollection(self::DATABASE_NAME, self::POST_TABLE);
    }
}
