<?php

declare(strict_types=1);

namespace App\Application\Post\Query;

use App\Domain\Shared\Uuid;

interface PostQueryInterface
{
    /**
     * @return PostView[]
     */
    public function findAll(): array;

    public function getByUuid(Uuid $uuid): PostView;
}
