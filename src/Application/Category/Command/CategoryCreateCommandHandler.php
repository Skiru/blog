<?php

declare(strict_types=1);

namespace App\Application\Category\Command;

use App\Domain\Post\Category\CategoryRepositoryInterface;

final class CategoryCreateCommandHandler
{
    private CategoryRepositoryInterface $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function handle(CategoryCreateCommand $command): void
    {
        $this->categoryRepository->insert($command->getCategory());
    }
}