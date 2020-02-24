<?php

namespace App\Controller;

use App\Domain\Factory\PostFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomepageController extends AbstractController
{
    private PostFactory $postFactory;

    /**
     * @param PostFactory $postFactory
     */
    public function __construct(PostFactory $postFactory)
    {
        $this->postFactory = $postFactory;
    }

    /**
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('homepage/index.html.twig');
    }

    public function weddingCountDown(): Response
    {
        return $this->render('wedding/wedding.html.twig', []);
    }
}