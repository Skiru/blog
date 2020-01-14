<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomepageController extends AbstractController
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $number = rand(0, 200);

        return new Response(
            '<html><body><h1>' . sprintf("Your lucky number is %s", (string)$number) . '</h1></body></html>'
        );
    }

}