<?php

namespace BigEye\Challenge;

abstract class ChallengeDifficulty {
    const VERYEASY = 'Very Easy';
    const EASY = 'Easy';
    const MEDIUM = 'Medium';
    const HARD = 'Hard';
}

abstract class ChallengeType {
    const WEB = 'Web';
    const CRYPTO = 'Cryptography';
    const STEG = 'Steganopgraphy';
    const PROG = 'Programmation';
}

class Challenge {
    public $title;
    public $type;
    public $difficulty;
    public $flag;
    public $hint;

    function __construct(string $chall_title, string $chall_type, string $chall_difficulty, string $chall_flag) {
        $this->title = $chall_title;
        $this->type = $chall_type;
        $this->difficulty = $chall_difficulty;
        $this->flag = $chall_flag;
    }
}
