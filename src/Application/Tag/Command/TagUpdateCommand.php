<?php

declare(strict_types=1);

namespace App\Application\Tag\Command;

use App\Application\Tag\Dto\TagUpdateDto;
use App\Application\Tag\Query\TagView;

final class TagUpdateCommand
{
    private TagView $tag;

    private TagUpdateDto $dto;

    public function __construct(TagView $tag, TagUpdateDto $dto)
    {
        $this->tag = $tag;
        $this->dto = $dto;
    }

    public function getTag(): TagView
    {
        return $this->tag;
    }

    public function getDto(): TagUpdateDto
    {
        return $this->dto;
    }
}