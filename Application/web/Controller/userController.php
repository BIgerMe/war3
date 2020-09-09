<?php

use Application\web\Model\UserModel;
use Application\web\Model\UserEmailCodeModel as UEC;
use Application\web\Library\Jwt;
use Application\web\Library\Mailer;

/**
 * @property UserModel userMod
 */
class userController extends baseController
{
    public $userMod;
    public function __construct(){
        parent::__construct();
        $this->userMod = new UserModel();
    }

    public function login(){
//        $a = $this->userMod->add(['username'=>'xxx','password'=>md5('xxx')]);
//        $b = $this->userMod->where(['username'=>333])->delete();
//        $c = $this->userMod->select(['id','username']);
//        $c = $this->userMod->where(['password'=>md5('xxx')])->update(['truename'=>1243]);
        $username = $this->_post['username'];
        $password = $this->_post['password'];
        $password = md5($password);

        $info = $this->userMod->where(['username'=>$username,'password'=>$password])->info();

        if($info){
            $jEArray = ['username'=>$username,'password'=>$password,'iat'=>TIMESTAMP,'exp'=>TIMESTAMP+259200];
            $token = Jwt::getToken($jEArray);
            Json(0,['token'=>$token]);
        }
        Json(-1,[],'账号或密码错误');
    }

    public function info(){
        $checkToken = self::checkToken();
        if($checkToken){
            $info = $this->userMod->where(['username'=>$checkToken['username'],'password'=>$checkToken['password']])->info(['username','nickname','avatar']);
            if($info)
                Json(0,$info);
            else
                Json(-1,[],'个人信息查询失败');
        }
        Json(-1,[],'token失效');
    }

    /**注册
     * @var $sign_username 用户名
     * @var $sign_psd 密码
     * return json
     */
    public function sign_up()
    {
        $username = $this->_post['username'];
        $nickname = $this->_post['nickname'];
        $password = $this->_post['password'];
        $code = $this->_post['code'];
        $password = md5($password);
        //邮箱验证码
        $uec = new UEC();
        $codeCheck = $uec->where(['email'=>$username,'code'=>$code])->info();
        if(!$codeCheck)
            Json(-1,[],'邮箱验证码错误');

        //用户名是否存在
        if ($rst = $this->userMod->where(["username"=>$username])->info())
            Json(-1,[], '用户名已存在');

        $avatar = "/assets/images/avatar/kof/".rand(1,48).'.png';
        $addData = [
            'username' => $username,
            'nickname'=>$nickname,
            'password' => $password,
            'avatar'=>$avatar
        ];
        if ($this->userMod->add($addData)) {
            //登录设置session
            $jEArray = ['username'=>$username,'password'=>$password,'iat'=>TIMESTAMP,'exp'=>TIMESTAMP+259200];
            $token = Jwt::getToken($jEArray);
            Json(0,['token'=>$token],'注册成功');
        }else{
            Json(-1,[],'注册失败');
        }
    }

    /*邮箱验证*/
    function send_email_code()
    {
        $email = $this->_get['email'];
        if(!preg_match("/^\w+(\.\w+)*@\w+(\.\w+){1,2}$/",$email))
            Json(-1,[],'邮箱格式不正确');
        $code = rand('100000','999999');
        $rst = Mailer::sendMail($email,'注册邮箱验证码',"https://www.xxroom.xyz 注册邮箱验证码:".$code);
        if($rst['status'] == 1){
            $uec = new UEC();
            $rst = $uec->where(['email'=>$email])->info();
            if($rst)
                $uec->where(['email'=>$email])->update(['code'=>$code]);
            else
                $uec->add(['email'=>$email,'code'=>$code]);
            Json(0,[],'已发送');
        }else{
            Json(-1,[],$rst['msg']);
        }
    }

    static function checkToken(){
        $token = $_SERVER['HTTP_TOKEN'];
        $checkToken = Jwt::verifyToken($token);
        return $checkToken;
    }

    public function getUserId(){
        $checkToken = self::checkToken();
        $user = $this->userMod->where(['username'=>$checkToken['username']])->info(['id']);
        return $user['id'];
    }
}