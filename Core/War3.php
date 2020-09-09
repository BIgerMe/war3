<?php
namespace Core;

class War3
{
    static private $instance;
    public $config;

    private function __construct($config){
        $this->config = $config;
    }

    //私有属性的克隆方法 防止被克隆
    private function __clone()
    {
        // TODO: Implement __clone() method.
    }

    static public function instance($config){
        if(!self::$instance instanceof self){
            self::$instance = new self($config);
        }
        return self::$instance;
    }
}