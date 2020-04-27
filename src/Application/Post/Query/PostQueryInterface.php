<?php

declare(strict_types=1);

namespace App\Application\Post\Query;

interface PostQueryInterface
{
    /**
     * @return PostView[]
     */
    public function findAll(): array;
}
