<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomepageController extends AbstractController
{
    private int $number;

    /**
     * @param int $number
     */
    public function __construct()
    {
        $this->number = rand(0,200);
    }

    /**
     * @return Response
     */
    public function index(): Response
    {
        return new Response(
            '<html><body><h1>Your Lucky number is ' . $this->number . '</h1></body></html>'
        );
    }

}