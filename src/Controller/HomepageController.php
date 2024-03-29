<?php

declare(strict_types=1);

namespace App\Controller;

use App\Application\Post\Query\PostQueryInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomepageController extends AbstractController
{
    private PostQueryInterface $postQuery;

    public function __construct(PostQueryInterface $postQuery)
    {
        $this->postQuery = $postQuery;
    }

    public function index(): Response
    {
        //TODO Change this to call API
        return $this->render('homepage/index.html.twig', [
            'posts' => $this->postQuery->findAllPublished()
        ]);
    }
}
