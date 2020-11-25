<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Application\Post\Command\PostUpdateCommand;
use App\Application\Post\Dto\PostUpdateDto;
use App\Application\Tag\Command\TagCreateCommand;
use App\Application\Tag\Command\TagDeleteCommand;
use App\Application\Tag\Command\TagUpdateCommand;
use App\Application\Tag\Dto\TagUpdateDto;
use App\Application\Tag\Query\TagQueryInterface;
use App\Application\Tag\Query\TagView;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagName;
use App\Domain\Shared\Uuid as DomainUuid;
use App\Infrastructure\CommandBus\CommandBusInterface;
use App\Infrastructure\Form\PostModel;
use App\Infrastructure\Form\PostType;
use App\Infrastructure\Form\TagModel;
use App\Infrastructure\Form\TagType;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
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

            return new JsonResponse([
                'success' => false,
                'error' => $exception->getMessage()
            ], 403);
        }
    }

    public function delete(string $name): JsonResponse
    {
        try {
            $tagDeleteCommand = new TagDeleteCommand(Tag::fromParameters(TagName::fromString($name)));

            $this->bus->handle($tagDeleteCommand);

            return new JsonResponse(['success' => true], 200);
        } catch (Throwable $exception) {

            return new JsonResponse([
                'success' => false,
                'error' => $exception->getMessage()
            ], 403);
        }
    }

    public function update(string $name, Request $request): JsonResponse
    {
        try {
            $tag = $this->tagQuery->findOneByName(TagName::fromString($name));

            if (null === $tag) {
                return new JsonResponse([
                    'success' => false,
                    'error' => sprintf('Tag with name %s not found', $name)
                ], Response::HTTP_NOT_FOUND);
            }

            /**
             * @var TagUpdateDto $tagUpdateDto
             */
            $tagUpdateDto = $this->serializer->deserialize(
                $request->getContent(),
                TagUpdateDto::class,
                'json'
            );

            $this->bus->handle(new TagUpdateCommand($tag, $tagUpdateDto));

            return new JsonResponse([
                'success' => true
            ]);
        } catch (Throwable $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    //TODO Move this method to shared class
    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = [];
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }

        return $errors;
    }
}