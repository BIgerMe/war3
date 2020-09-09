<?php
spl_autoload_register('autoload1');

$test = Factory::createDatabase();
$test->test();
$test->run();
function autoload1($class){
    $dir  = __DIR__;
    $requireFile = $dir.DIRECTORY_SEPARATOR.$class.".php";

    require $requireFile;
}