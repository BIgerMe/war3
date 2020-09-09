<?php

abstract class baseController
{
    public $_post;
    public $_get;
    public function __construct(){
        $this->_post = $_POST;
        $this->_get = $_GET;
    }

    public function getUserId(){
        $checkToken  = userController::checkToken();
        if(!$checkToken){
            Json(-1,[],'请登录后操作');
        }
        $user = new userController();
        $user_id = $user->getUserId();
        return $user_id;
    }

}