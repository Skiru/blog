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

        $number = rand(0, 200);

        return new Response(
            '<html><body><h1>' . sprintf("1-1 number is %s", (string)$number) . '</h1></body></html>'
        );
    }
}