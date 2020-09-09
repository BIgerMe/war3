<?php
namespace Core;
use PDO;
use PDOException;

class Db
{
    static private $instance;     //  数据库连接实例
    public $linkId;
    protected $config;
    protected $options = array(
        PDO::ATTR_CASE              =>  PDO::CASE_LOWER,
        PDO::ATTR_ERRMODE           =>  PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_ORACLE_NULLS      =>  PDO::NULL_NATURAL,
        PDO::ATTR_STRINGIFY_FETCHES =>  false,
    );
    public function __construct()
    {
        $this->config = War3::instance(1)->config['db'];
        $this->config['dsn'] = $this->parseDsn();
        $this->connect();
    }
    public static function instance(){
        if(!self::$instance instanceof self){
            self::$instance = new self();
        }
        return self::$instance;
    }
    /*dsn解析*/
    public function parseDsn($config = ''){
        if(empty($config)) $config = $this->config;
        $dsn = 'mysql:host='.$config['host'].';dbname='.$config['dbname'];
        return $dsn;
    }
    /*pdo连接*/
    public function connect($config=''){
        if(empty($config)) $config = $this->config;
        try{
            
            $this->linkId = new PDO($config['dsn'],$config['username'],$config['password']);

        }catch(PDOException $e){
            $e->getMessage();
        }
    }
}