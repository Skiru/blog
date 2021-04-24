<?php

declare(strict_types=1);

namespace App\Application\Tag\Command;

use App\Application\Post\Query\PostQueryInterface;
use App\Application\Post\Query\PostView;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Category\CategoryName;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\Post;
use App\Domain\Post\PostRepositoryInterface;
use App\Domain\Post\ReadTime\ReadTime;
use App\Domain\Post\Slug\Slug;
use App\Domain\Post\Tag\Tag;
use App\Domain\Post\Tag\TagName;
use App\Domain\Post\Tag\TagRepositoryInterface;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid;
use App\Domain\User\BlogUser;
use App\Domain\User\UserIdentity;
use App\Infrastructure\Form\PostModel;
use DateTimeImmutable;
use Psr\Log\LoggerInterface;
use Throwable;

final class TagUpdateCommandHandler
{
    private TagRepositoryInterface $tagRepository;
    private PostRepositoryInterface $postRepository;
    private PostQueryInterface $postQuery;
    private LoggerInterface $logger;

    public function __construct(
        TagRepositoryInterface $tagRepository,
        PostRepositoryInterface $postRepository,
        PostQueryInterface $postQuery,
        LoggerInterface $logger
    ) {
        $this->tagRepository = $tagRepository;
        $this->postRepository = $postRepository;
        $this->postQuery = $postQuery;
        $this->logger = $logger;
    }

    public function handle(TagUpdateCommand $command): void
    {
        if (null === $command->getDto()->name) {
            return;
        }

        $oldTagName = TagName::fromString($command->getTag()->getName());
        $newTagName = TagName::fromString($command->getDto()->name);

        if ($oldTagName->equals($newTagName)) {
            return;
        }
        $oldTag = Tag::fromParameters($oldTagName);
        $newTag = Tag::fromParameters($newTagName);
        $this->tagRepository->update($oldTag, $newTag);
        $this->updatePosts($oldTag, $newTag);
    }

    private function updatePosts(Tag $oldTag, Tag $newTag): void
    {
        $posts = $this->createPostFromViews(
            $this->postQuery->findAllByTag($oldTag)
        );

        foreach ($posts as $post) {
            try {
                $post->updateTag($oldTag, $newTag);
            } catch (Throwable $exception) {
                $this->logger->error(sprintf(
                    'Error during tag update: %s',
                    $exception->getMessage()
                ));

                continue;
            }

            $this->postRepository->update($post);
        }
    }

    /**
     * @param PostView[] $postViews
     * @return Post[]
     */
    private function createPostFromViews(array $postViews): array
    {
        $posts = [];
        foreach ($postViews as $postView) {
            $posts[] = Post::updateFromParameters(
                new Uuid($postView->getUuid()),
                Title::fromString($postView->getTitle()),
                Slug::fromString($postView->getSlug()),
                new BlogUser(new UserIdentity(new Uuid($postView->getAuthor()))),
                Content::createEncodedFromString($postView->getContent()),
                PostModel::createTagList($postView->getTags()),
                Category::fromCategoryName(CategoryName::fromString(
                    $postView->getCategory()
                )),
                ReadTime::fromParameter(
                    $postView->getReadTime()
                ),
                HeaderImage::createFromString(
                    $postView->getHeaderImage()
                ),
                $postView->isPublished(),
                new DateTimeImmutable($postView->getCreatedAt())
            );
        }

        return $posts;
    }
}