<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Application\Tag\Command\TagCreateCommand;
use App\Application\Tag\Query\TagQueryInterface;
use App\Application\Tag\Query\TagView;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagName;
use App\Infrastructure\CommandBus\CommandBusInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Throwable;

final class TagController extends AbstractController
{
    private TagQueryInterface $tagQuery;
    private CommandBusInterface $bus;
    private SerializerInterface $serializer;

    public function __construct(TagQueryInterface $tagQuery, CommandBusInterface $bus, SerializerInterface $serializer)
    {
        $this->tagQuery = $tagQuery;
        $this->bus = $bus;
        $this->serializer = $serializer;
    }

    public function findAll(): JsonResponse
    {
        $tags['data'] = array_map(fn(TagView $view) : array => $this->serializer->normalize($view, 'array'), $this->tagQuery->findAll());

        return new JsonResponse(
            $tags,
            Response::HTTP_OK
        );
    }

    public function create(Request $request): JsonResponse
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
}