<?php
use Qiniu\Auth;
use Application\web\Model\AttachmentModel;
/**
 * @property UserModel userMod
 */
class qiniuController extends baseController
{
    protected static $qn_ak = 'ijSwZU-Sh5EieYloh01ElyDUop1A9aKQUcHXd4QB';
    protected static $qn_sk = 'suo-HidUyWS-42Hc-rICOQY0DL0FztMU1GbuAi50';
    protected static $qn_bk = 'xiaoming';
    public $attachmentModel;
    public function __construct(){
        parent::__construct();
        $this->attachmentModel = new AttachmentModel();
        $checkToken = userController::checkToken();
        if(!$checkToken){
            Json(-1,[],'请登录后操作');
        }
    }

    public function qiniuToken(){
        // 初始化签权对象
        $auth = new Auth(self::$qn_ak, self::$qn_sk);
        $token = $auth->uploadToken(self::$qn_bk);
        Json(0,['token'=>$token],'msg');
    }


    /*图片新增*/
    public function addAttachment(){

        $path = $this->_post['path'];
        $exist = $this->attachmentModel->where(['path'=>$path])->select();

        if(!$path)
            Json(-1,[],'图片不存在');
        if($exist)
            Json(-1,[],'图片已存在');

        $image_content = file_get_contents($path);
        $image = imagecreatefromstring($image_content);
        $width = imagesx($image);
        $height = imagesy($image);
        $size = $width * $height;
        if(!$size){
            Json(-1,[],'图片不存在');
        }
        //比例 0是偏正方形 1是偏0.5625横矩  2偏竖距
        $prop  = ($height / $width < 0.7 ) ? 1 : (($height/$width)>1.1 ? 2 : 0) ;

        $data = [
            'path'=>$path,
            'size'=>$size,
            'true_size'=>isset($this->_post['size']) ? $this->_post['size'] : 0,
            'proportion'=>$prop,
            'user_id'=>$this->getUserId()
        ];
        $rst = $this->attachmentModel->add($data);
        if($rst)
            Json(0,[],'录入成功');
        else
            Json(-1,[],'录入失败');
    }
}