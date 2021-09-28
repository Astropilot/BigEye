<?php

error_reporting(-1);

require_once '../app/autoload.php';

use BigEye\Web\Router\Request;
use BigEye\Web\Router\Router;
use BigEye\Model\Database;
use BigEye\Web\Component\I18n;

session_start();

Database::getInstance();

I18n::getInstance('langs/', 'en');
Router::getInstance(new Request);

require_once '../app/views/Views.php';
// require_once '../app/controllers/Contact.php';
// require_once '../app/controllers/User.php';
// require_once '../app/controllers/Faq.php';
// require_once '../app/controllers/Message.php';
// require_once '../app/controllers/Forum.php';
// require_once '../app/controllers/Ticket.php';
// require_once '../app/controllers/Admin.php';
