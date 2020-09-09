<?php
namespace Application\web\Core;
use Core\War3;

class Config
{
    private $config ;
    static public $configPath = WEB_PATH.DS."Conf".DS;

    public function __construct(){
        $config = include(self::$configPath  . "config.php");
        $this->config['config'] = $config;
        if($config['config_files']){
            $configFiles = explode(',',$config['config_files']);
            array_walk($configFiles,function($v){
                is_file(self::$configPath.$v.".php") && $this->config[$v] = include(self::$configPath.$v.".php");
            });
        }
        War3::instance($this->config);
    }
}