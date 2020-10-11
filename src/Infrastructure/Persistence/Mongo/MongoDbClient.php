<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Mongo;

use MongoDB\Client;
use MongoDB\Database;

abstract class MongoDbClient
{
    private const DATABASE_NAME = 'purpleclouds_blog';
    protected const CATEGORY_TABLE = 'categories';

    protected Database $database;

    public function __construct(Client $mongo)
    {
        $this->database = $mongo->selectDatabase(self::DATABASE_NAME);
    }
}
