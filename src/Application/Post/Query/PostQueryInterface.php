<?php

declare(strict_types=1);

namespace App\Application\Post\Query;

use App\Domain\Post\Slug\Slug;
use App\Domain\Shared\Uuid;
use Exception;

interface PostQueryInterface
{
    /**
     * @return PostView[]
     */
    public function findAll(): array;

    /**
     * @throws Exception
     */
    public function getByUuid(Uuid $uuid): PostView;

    /**
     * @throws Exception
     */
    public function getOneBySlug(Slug $slug): PostView;
}
