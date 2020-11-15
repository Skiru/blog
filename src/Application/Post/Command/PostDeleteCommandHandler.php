<?php

declare(strict_types=1);

namespace App\Application\Post\Command;

use App\Domain\Post\Category\Category;
use App\Domain\Post\Category\CategoryName;
use App\Domain\Post\Content\Content;
use App\Domain\Post\Image\HeaderImage;
use App\Domain\Post\Post;
use App\Domain\Post\PostRepositoryInterface;
use App\Domain\Post\ReadTime\ReadTime;
use App\Domain\Post\Slug\Slug;
use App\Domain\Post\Title\Title;
use App\Domain\Shared\Uuid;
use App\Domain\User\BlogUser;
use App\Domain\User\UserIdentity;
use App\Infrastructure\Form\PostModel;
use Symfony\Component\String\Slugger\SluggerInterface;

class PostDeleteCommandHandler
{
    private SluggerInterface $slugger;
    private PostRepositoryInterface $postRepository;

    public function __construct(SluggerInterface $slugger, PostRepositoryInterface $postRepository)
    {
        $this->slugger = $slugger;
        $this->postRepository = $postRepository;
    }

    public function handle(PostDeleteCommand $command): void
    {
        $postView = $command->getPostView();
        $post = Post::createFromParameters(
            new Uuid($postView->getUuid()),
            Title::fromString($postView->getTitle()),
            Slug::fromString($this->slugger->slug($postView->getTitle())->toString()),
            new BlogUser(new UserIdentity(new Uuid($postView->getAuthor()))),
            Content::createEncodedFromString($postView->getContent()),
            PostModel::createTagList($postView->getTags()),
            Category::fromCategoryName(CategoryName::fromString($postView->getCategory())),
            ReadTime::fromParameter($postView->getReadTime()),
            HeaderImage::createFromString($postView->getHeaderImage())
        );

        $post->delete();

        $this->postRepository->delete($post);
    }
}