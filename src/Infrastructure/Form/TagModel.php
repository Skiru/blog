<?php

declare(strict_types=1);

namespace App\Infrastructure\Form;

class TagModel
{
    public string $name = '';

    public static function createFromArray(array $tag): self
    {
        $tagModel = new self();
        if (isset($tag['name'])) {
            $tagModel->name = $tag['name'];
        }

        return $tagModel;
    }
}