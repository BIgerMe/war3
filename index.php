<?php

//跨域
header('Access-Control-Allow-Origin: *');
//content-type:application/json
header('Access-Control-Allow-Headers:content-type');

//定义
define("APP_PATH","Application");
define("WEB_PATH","Application/web");
define('TIMESTAMP',time());
const SEG = DIRECTORY_SEPARATOR;  //分隔符
const DS = DIRECTORY_SEPARATOR;
require_once(WEB_PATH . DS . "init.php");







