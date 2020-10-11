<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Application\Category\Command\CategoryCreateCommand;
use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Category\Query\CategoryView;
use App\Application\Tag\Query\TagView;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Category\CategoryName;
use App\Domain\Post\Category\CategoryRepositoryInterface;
use App\Infrastructure\CommandBus\CommandBusInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Throwable;

class CategoryController extends AbstractController
{
    private CommandBusInterface $commandBus;
    private CategoryQueryInterface $categoryQuery;
    private CategoryRepositoryInterface $categoryRepository;
    private SerializerInterface $serializer;

    public function __construct(CommandBusInterface $commandBus, CategoryQueryInterface $categoryQuery, CategoryRepositoryInterface $categoryRepository, SerializerInterface $serializer)
    {
        $this->commandBus = $commandBus;
        $this->categoryQuery = $categoryQuery;
        $this->categoryRepository = $categoryRepository;
        $this->serializer = $serializer;
    }

    public function findAll(): JsonResponse
    {
        $categories['data'] = array_map(
            fn(CategoryView $view) : array => $this->serializer->normalize($view, 'array'),
            $this->categoryQuery->findAll()
        );

        return new JsonResponse(
            $categories,
            Response::HTTP_OK
        );
    }

    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        try {
            $command = new CategoryCreateCommand(
                Category::fromCategoryName(
                    CategoryName::fromString($data['name'] ?? '')
                )
            );

            $this->commandBus->handle($command);

            return new JsonResponse(['success' => true], 201);
        } catch (Throwable $exception) {

            return new JsonResponse(['error' => $exception->getMessage()], 403);
        }
    }
}