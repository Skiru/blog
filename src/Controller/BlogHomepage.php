<?php

namespace Blog\Controller;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class BlogHomepage
{
    /**
     * @return Response
     * @throws Exception
     */
    public function index()
    {
        $number = random_int(0, $max);

        return new Response(
            '<html><body>Lucky number: '.$number.'</body></html>'
        );
    }
}