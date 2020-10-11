<?php

declare(strict_types=1);

namespace App\Application\Category\Query;

interface CategoryQueryInterface
{
    /**
     * @return CategoryView[]
     */
    public function findAll(): array;
}