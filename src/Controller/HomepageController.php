<?php

namespace App\Controller;

use App\Application\Post\Command\PostCreateCommand;
use App\Application\Post\Query\PostQueryInterface;
use App\Domain\DomainException;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Post;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\Tags;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid as DomainUuid;
use App\Domain\User\BlogUser;
use App\Domain\User\UserIdentity;
use App\Infrastructure\CommandBus\CommandBusInterface;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HomepageController extends AbstractController
{
    private PostQueryInterface $postQuery;
    private CommandBusInterface $commandBus;

    public function __construct(PostQueryInterface $postQuery, CommandBusInterface $commandBus)
    {
        $this->postQuery = $postQuery;
        $this->commandBus = $commandBus;
    }

    public function index(): Response
    {
        $items = $this->postQuery->findAll();
        dump($items);die;

        return $this->render('homepage/index.html.twig');
    }

    public function insert(Request $request): RedirectResponse
    {
        try {
            $domainUuid = new DomainUuid(Uuid::uuid4()->toString());
            $command = new PostCreateCommand(
                Post::createFromParameters(
                    $domainUuid,
                    Title::fromString($request->get('title')),
                    new BlogUser(new UserIdentity($domainUuid)),
                    Content::fromString($request->get('content')),
                    new Tags([
                        Tag::fromString('first-tag')
                    ]),
                    Category::fromString('my-category')
                )
            );

            $this->commandBus->handle($command);

        } catch (DomainException $exception) {
            //TODO when validation will be added then catch exceptions here
        }

        return $this->redirectToRoute('dashboard');
    }
}
