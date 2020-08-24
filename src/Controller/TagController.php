<?php

declare(strict_types=1);

namespace App\Controller;

use App\Application\Tag\Command\TagCreateCommand;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagName;
use App\Infrastructure\CommandBus\CommandBusInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Throwable;

class TagController extends AbstractController
{
    private CommandBusInterface $bus;

    public function __construct(CommandBusInterface $bus)
    {
        $this->bus = $bus;
    }

    public function insert(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            $command = new TagCreateCommand(
                Tag::fromParameters(
                    TagName::fromString($data['name'] ?? '')
                )
            );

            $this->bus->handle($command);

            return new JsonResponse(['success' => true], 201);
        } catch (Throwable $exception) {

            return new JsonResponse(['error' => $exception->getMessage()], 403);
        }
    }

    public function delete(): JsonResponse
    {
        return new JsonResponse(['success' => true]);
    }

    public function fetchAll(): JsonResponse
    {
        return new JsonResponse(['success' => true]);
    }

    public function fetchOne(Request $request): JsonResponse
    {
        return new JsonResponse(['success' => true]);
    }

    public function update(Request $request): JsonResponse
    {
        return new JsonResponse(['success' => true]);
    }
}
