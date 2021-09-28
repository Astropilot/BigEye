<?php

use BigEye\Web\Router\Router;
use BigEye\Web\Router\Response;

$router = Router::getInstance();


$router->get('/', function($request) {
    if (!isset($_SESSION['username'])) {
        header('Location: /login');
        exit();
    }
    return Response::fromView('dashboard.html');
});

$router->get('/login', function($request) {
    return Response::fromView('login.html');
});

$router->get('/about', function($request) {
    return Response::fromView('about.html');
});

$router->get('/register', function($request) {
    return Response::fromView('register.html');
});

// $router->get('/register/confirm/<token:str>/<email:str>', function($request, $token, $email) {
//     $context = array('token' => $token, 'email' => $email);

//     return Response::fromView('inscription.html', $context);
// });

$router->get('/admin', function($request) {
    if ($_SESSION['role'] < 1) {
        header('Location: /');
        exit();
    }
    return Response::fromView('admin.html');
});

$router->get('/404', function($request) {
    return Response::fromView('404.html', null, null, 404);
});
