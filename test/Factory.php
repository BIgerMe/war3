<?php
class Factory{
    /*
     * 如果某个类在很多的文件中都new ClassName()，那么万一这个类的名字
     * 发生变更或者参数发生变化，如果不使用工厂模式，就需要修改每一个PHP
     * 代码，使用了工厂模式之后，只需要修改工厂类或者方法就可以了。
     */
    static function createDatabase(){
        $test = new Test1();
        return $test;
    }
}
