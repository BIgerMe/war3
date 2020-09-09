<?php

use Application\web\Model\UserModel;
use Application\web\Model\BlogModel;
use Application\web\Model\BlogCategoryModel;
use Application\web\Model\BlogCommentModel;

/**
 * @property
 */
class qaController extends baseController
{
    public $userMod;
    public $blogMod;
    public $blogCategoryMod;
    public $blogCommentMod;
    public function __construct(){
        parent::__construct();
        $this->userMod = new userModel();
        $this->blogMod = new blogModel();
        $this->blogCategoryMod = new blogCategoryModel();
        $this->blogCommentMod = new blogCommentModel();
    }

    public function category(){
        $lists = $this->blogCategoryMod->where(['tag'=>1])->select(['id','title']);
        Json(0,$lists);
    }

    /**
     * 博客列表
     * @param page 当前页
     * @param limit 单页数量
     * @param categoryId 分类Id 等于0时获取全部分类
     * return json
    */
    public function lists(){
        $page = isset($this->_get['page']) ? $this->_get['page'] : 1;
        $limit = isset($this->_get['limit']) ? $this->_get['limit'] : 10;
        $key =  $this->_get['key'] ?? '';
        $start = ($page-1) * $limit;
        $categoryId = isset($this->_get['categoryId']) ? $this->_get['categoryId'] : 0;
        $category = $this->blogCategoryMod->where(['id'=>$categoryId])->info(['title']);
        $categoryTitle = $category['title'];
        $total = $this->blogMod->where(['private'=>1,'tag'=>1,'status'=>1,'title'=>['like',$key],'category'=>['like',$categoryTitle]])->count();
        $lists = $this->blogMod->alias('b')->join(" LEFT JOIN users u on b.user_id = u.id ")->where(['b.private'=>1,'b.tag'=>1,'b.status'=>1,'b.title'=>['like',$key],'b.category'=>['like',$categoryTitle]])->limit($start.','.$limit)->order('created_at desc')->select(['b.id','b.title','b.category','b.created_at','u.nickname']);

        /*所有博客分类*/
        $blogCategory = $this->blogCategoryMod->where(['tag'=>1])->select(['id','title']);
        $blogArr = array_column($blogCategory,null,'title');
        foreach($lists as &$v){
            $v['created_at'] = date("Y-m-d",strtotime($v['created_at']));
            $categoryNameArr = explode(',',$v['category']);
            $categoryArr = [];
            foreach($categoryNameArr as $cn){
                if(key_exists($cn,$blogArr)){
                    $categoryArr[] = [
                        'id' => $blogArr[$cn]['id'],
                        'title' => $cn
                    ];
                }
            }
            $v['category'] = $categoryArr;
        }
        unset($v);
        $data = [
            'data'=>$lists,
            'total'=>$total,
            'page'=>$page,
            'limit'=>$limit
        ];
        Json(0,$data);
    }

    public function detail(){
        $id = isset($this->_get['id']) ? $this->_get['id'] : 0;

        $detail = $this->blogMod->where(['id'=>$id,'status'=>1])->info();
        $comment = $this->blogCommentMod->alias("bc1")
            ->join(" left join blog b on bc1.blog_id = b.id ")
            ->join(" left join users u1 on bc1.user_id = u1.id ")
            ->join(" left join blog_comment bc2 on bc1.reply_id = bc2.id ")
            ->join(" left join users u2 on bc2.user_id = u2.id ")
            ->where(["bc1.blog_id"=>$id])
            ->order(" bc1.created_at ")
            ->select(['bc1.*','u1.nickname','u1.avatar','u1.sex','u2.nickname as r_nickname']);

        Json(0,['data'=>$detail,'comment'=>$comment]);
    }

    /*新增回复*/
    function addComment(){
        $checkToken = userController::checkToken();
        if(!$checkToken){
            Json(-1,[],'请先登录后操作');
        }
        $blog_id = $this->_post['blog_id'] ?? '';
        $content = $this->_post['content'] ?? '';
        $reply_id = $this->_post['id'] ?? 0;
        $user = new userController();
        if($blog_id && $content){
            $data = [
                'blog_id'=>$blog_id,
                'content'=>htmlspecialchars($content),
                'user_id'=>$user->getUserId(),
                'reply_id'=>$reply_id,
                'base_id'=>0,
                'created_at'=>date('Y-m-d H:i:s',time())
            ];
            $rst = $this->blogCommentMod->add($data);
            $rst && Json(0,[],'评论成功');
        }else{
            Json(-1,[],'评论失败');
        }
    }
}