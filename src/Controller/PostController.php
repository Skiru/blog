<?php

declare(strict_types=1);

namespace App\Controller;

use App\Application\Category\Query\CategoryQueryInterface;
use App\Application\Post\Query\PostQueryInterface;
use App\Application\Tag\Query\TagQueryInterface;
use App\Domain\Post\Slug\Slug;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class PostController extends AbstractController
{
    private PostQueryInterface $postQuery;
    private TagQueryInterface $tagQuery;
    private CategoryQueryInterface $categoryQuery;

    public function __construct(PostQueryInterface $postQuery, TagQueryInterface $tagQuery, CategoryQueryInterface $categoryQuery)
    {
        $this->postQuery = $postQuery;
        $this->tagQuery = $tagQuery;
        $this->categoryQuery = $categoryQuery;
    }

    public function findBySlug(string $slug): Response
    {
        try {
            $post = $this->postQuery->getOneBySlug(Slug::fromString($slug));
        } catch (Exception $e) {
            //TODO: 404 page, but for now go to dashboard
            return new RedirectResponse('dashboard');
        }

        return $this->render('homepage/single_post.html.twig', [
            'post' => $post,
            'tags' => $this->tagQuery->findAll(),
            'categories' => $this->categoryQuery->findAll()
        ]);
    }
}
