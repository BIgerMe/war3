<?php
//错误机制
//先定义一个函数，也可以定义在其他的文件中，再用require()调用
function myErrorHandler($errno, $errStr, $errFile, $errLine)
{
    //为了安全起见，不暴露出真实物理路径，下面两行过滤实际路径
    $errFile = str_replace(getcwd(),"",$errFile);
    $errStr = str_replace(getcwd(),"",$errStr);

    switch ($errno) {
        case E_USER_ERROR:
            echo "<b>My ERROR</b> [$errno] $errStr<br />\n";
            echo "  Fatal error on line $errLine in file $errFile";
            echo ", PHP " . PHP_VERSION . " (" . PHP_OS . ")<br />\n";
            echo "Aborting...<br />\n";
            exit(1);
            break;
        case E_USER_WARNING:
            echo "<b>My WARNING</b> [$errno] $errStr<br />\n";
            break;
        case E_USER_NOTICE:
            echo "<b>My NOTICE</b> [$errno] $errStr<br />\n";
            break;
        default:
            echo "Unknown error type: [$errno] $errStr $errLine<br />\n";
            break;
    }

    /* Don't execute PHP internal error handler */
    return true;
}
function _exception_handler($exception){
    $Msg = $exception->getMessage();
    $Msg .= " at line ".$exception->getLine()." File: ".$exception->getFile();
    echo "<b>Exception:</b> ".$Msg;
}
function _shutdown_handler(){
}