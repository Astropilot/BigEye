<?php

namespace BigEye\Model;

class Database {

    private $PDOInstance = null;
    private $PDOException = null;

    private static $instance = null;

    private function __construct() {
        $DEFAULT_SQL_USER = getenv('DB_USER');
        $DEFAULT_SQL_HOST = getenv('DB_HOST');
        $DEFAULT_SQL_PASS = getenv('DB_PASSWORD');
        $DEFAULT_SQL_DTB = getenv('DB_NAME');

        try {
            $this->PDOInstance = new \PDO(
                'pgsql:dbname='.$DEFAULT_SQL_DTB.';host='.$DEFAULT_SQL_HOST,
                $DEFAULT_SQL_USER,
                $DEFAULT_SQL_PASS
            );
            $this->PDOInstance->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
            $this->PDOInstance->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->PDOInstance->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        } catch(\PDOException $e) {
            $this->PDOInstance = null;
            $this->PDOException = $e;
        }
    }

    public static function getInstance() : Database {
        if(is_null(self::$instance)) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getPDO() {
        if (!$this->PDOInstance && $this->PDOException) {
            throw $this->PDOException;
        }
        return $this->PDOInstance;
    }

    public static function throwIfDeveloppment(\PDOException $exception, $environnement) {
        if ($environnement === 'dev') {
            throw $exception;
        }
    }
}
