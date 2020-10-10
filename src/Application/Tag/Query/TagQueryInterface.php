<?php

declare(strict_types=1);

namespace App\Application\Tag\Query;

interface TagQueryInterface
{
    /**
     * @return TagView[]
     */
    public function findAll(): array;
}