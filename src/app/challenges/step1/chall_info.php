<?php

require_once '../app/autoload.php';

use BigEye\Challenge\Challenge;
use BigEye\Challenge\ChallengeDifficulty;
use BigEye\Challenge\ChallengeType;

$GLOBALS['challenge'] = new Challenge(
    'My little challenge',
    ChallengeType::WEB,
    ChallengeDifficulty::VERYEASY,
    '1337-2001-9999-1054'
);

$GLOBALS['challenge']->hint = 'This is an hint lol!';
