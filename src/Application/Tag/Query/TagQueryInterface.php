<?php

declare(strict_types=1);

namespace App\Application\Tag\Query;

use App\Domain\Post\Tag\TagName;

interface TagQueryInterface
{
    /**
     * @return TagView[]
     */
    public function findAll(): array;
    
    public function findOneByName(TagName $name): ?TagView;
}