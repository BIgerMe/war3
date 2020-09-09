<?php
/*初始化加载所有Function*/
if($func = glob(WEB_PATH.DS."Function".DS."*.php")){
    array_walk($func,function($v){
        is_file($v) && include $v;
    });
}
set_error_handler('myErrorHandler');
set_exception_handler('_exception_handler');
register_shutdown_function('_shutdown_handler');
//自动加载
spl_autoload_register(function ($class) {
    
    /*命名空间*/
    if(strpos($class,'\\')){
        $filePath = str_replace('\\','/',$class.".php");
        is_file($filePath) && include $filePath;
    }else{
        $fileList = [
            WEB_PATH.DS.'Controller'.DS.$class.'.php',
            WEB_PATH.DS.'Model'.DS.$class.'.php'
        ];

        foreach ($fileList as $v){
            is_file($v) && include $v;
        }
    }
});

new Application\web\Core\Config();

/**
 * 路由
 * 通过PATH_INFO参数来识别
 */
if(isset($_SERVER['PATH_INFO'])){
    $pArr = explode('/',trim($_SERVER['PATH_INFO'],'/'));
    $pathCount = count($pArr);
    $class = $pathCount > 1 ? $pArr[1]."Controller" : '';
    $action = $pathCount > 2 ? $pArr[2] : '';
    if($class){
        $instance = new $class();
        if($action){
            $instance->$action();
        }else{
            $instance->index();
        }
    }
}else{
    header('Location:/view/index.html');
}
