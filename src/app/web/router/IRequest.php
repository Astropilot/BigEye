<?php

namespace BigEye\Web\Router;

use BigEye\Web\Router\RequestData;

interface IRequest {

    public function getData(): RequestData;
}
