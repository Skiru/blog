<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomepageController extends AbstractController
{
    public function index(): Response
    {
        $number = rand(0, 200);

        return new Response(
            '<html><body><h1>' . sprintf("1-1 number is %s", (string)$number) . '</h1></body></html>'
        );
    }

    public function weddingCountDown(): Response
    {
        return $this->render('wedding/wedding.html.twig', []);
    }

}