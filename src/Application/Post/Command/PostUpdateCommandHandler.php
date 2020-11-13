<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Post\Query\PostQueryInterface;
use App\Application\Tag\Query\TagQueryInterface;
use App\Domain\DomainException;
use App\Domain\Post\Category\Category;
use App\Domain\Post\Category\CategoryName;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\Post;
use App\Domain\Post\PostRepositoryInterface;
use App\Domain\Post\ReadTime\ReadTime;
use App\Domain\Post\Slug\Slug;
use App\Domain\Post\Tag\TagName;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid;
use App\Domain\User\BlogUser;
use App\Domain\User\UserIdentity;
use App\Infrastructure\Form\PostModel;
use DateTimeImmutable;
use Exception;
use Symfony\Component\String\Slugger\SluggerInterface;

final class PostUpdateCommandHandler
{
    private SluggerInterface $slugger;
    private PostRepositoryInterface $postRepository;
    private TagQueryInterface $tagQuery;
    private PostQueryInterface $postQuery;
    private CategoryQueryInterface $categoryQuery;

    public function __construct(
        SluggerInterface $slugger,
        PostRepositoryInterface $postRepository,
        TagQueryInterface $tagQuery,
        PostQueryInterface $postQuery,
        CategoryQueryInterface $categoryQuery
    ) {
        $this->slugger = $slugger;
        $this->postRepository = $postRepository;
        $this->tagQuery = $tagQuery;
        $this->postQuery = $postQuery;
        $this->categoryQuery = $categoryQuery;
    }

    public function handle(PostUpdateCommand $command): void
    {
        $title = $command->getDto()->title ?? $command->getPostView()->getTitle();
        $tags = $command->getDto()->tags ?? $command->getPostView()->getTags();
        $slug = Slug::fromString($this->slugger->slug($title)->toString());

        foreach ($tags as $tag) {
            if (null === $this->tagQuery->findOneByName(TagName::fromString($tag))) {
                throw new DomainException(sprintf('Could not find tag %s', $tag));
            }
        }

        $dtoCategory = $command->getDto()->category;
        if (null !== $dtoCategory) {
            if (null === $this->categoryQuery->findOneByName(CategoryName::fromString($dtoCategory))) {
                throw new DomainException(sprintf('Could not find category %s', $dtoCategory));
            }
        }

        try {
            $this->postQuery->getOneBySlug($slug);
        } catch (Exception $e) {
            //Awesome slug is available!
        }

        $post = Post::updateFromParameters(
            new Uuid($command->getPostView()->getUuid()),
            Title::fromString($title),
            $slug,
            new BlogUser(new UserIdentity(new Uuid($command->getPostView()->getAuthor()))),
            Content::createEncodedFromString($command->getDto()->content ?? $command->getPostView()->getContent()),
            PostModel::createTagList($tags),
            Category::fromCategoryName(CategoryName::fromString(
                $dtoCategory ?? $command->getPostView()->getCategory()
            )),
            ReadTime::fromParameter(
                $command->getDto()->readTime ?? $command->getPostView()->getReadTime()
            ),
            HeaderImage::createFromString(
                $command->getDto()->headerImage ?? $command->getPostView()->getHeaderImage()
            ),
            $command->getDto()->published ?? $command->getPostView()->isPublished(),
            new DateTimeImmutable($command->getPostView()->getCreatedAt())
        );

        $this->postRepository->update($post);
    }
}