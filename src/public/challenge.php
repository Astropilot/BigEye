<?php

require_once '../app/autoload.php';

use BigEye\ChallengeManager;

session_start();

ChallengeManager::getInstance()->banGuard();

?>
