<?php

namespace BigEye;

class ChallengeManager {

    private const BAN_EXP_KEY = 'giveup_expiration';
    private const STEP_KEY = 'step';

    private const STEPS_COUNT = 1;

    private static $instance = null;

    public static function getInstance() : ChallengeManager {
        if(is_null(self::$instance)) {
            self::$instance = new ChallengeManager();
        }
        return self::$instance;
    }

    public function banGuard(): void {
        if ($this->getBanExpirationDate() !== null) {
            header('Location: /index.php');
            exit();
        }
    }

    public function getBanExpirationDate() : ?\DateTime {
        if (isset($_SESSION[self::BAN_EXP_KEY]) && $_SESSION[self::BAN_EXP_KEY] instanceof \DateTime) {
            $now = new \DateTime();
            if ($now < $_SESSION[self::BAN_EXP_KEY]) {
                return $_SESSION[self::BAN_EXP_KEY];
            }
        }
        return null;
    }

    public function banUser() : \DateTime {
        $_SESSION[self::BAN_EXP_KEY] = new \DateTime();
        $_SESSION[self::BAN_EXP_KEY]->modify('+2 minutes');
        return $_SESSION[self::BAN_EXP_KEY];
    }

    public function getCurrentStep() : int {
        if(!isset($_SESSION[self::STEP_KEY]) || $_SESSION[self::STEP_KEY] < 1 || $_SESSION[self::STEP_KEY] > self::STEPS_COUNT) {
            $_SESSION[self::STEP_KEY] = 1;
        }
        return $_SESSION[self::STEP_KEY];
    }

    public function nextStep() : void {
        $step = $this->getCurrentStep();

        $_SESSION[self::STEP_KEY] = $step + 1;
    }

    public function loadCurrentChallenge() : void {
        $step = $this->getCurrentStep();

        require_once("challenges/step{$step}/index.php");
    }
}
