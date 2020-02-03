<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class BlogAdminController extends AbstractController
{
    /**
     * @return Response
     */
    public function login(): Response
    {
        return $this->render('security/login.html.twig');
    }

    /**
     * @return Response
     */
    public function dashboard(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }
}