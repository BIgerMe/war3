<?php

use Application\web\Model\BlogModel;
use Application\web\Model\BlogCategoryModel;
use Application\web\Model\BlogCommentModel;
use Application\web\Model\userModel;

/**
 * @property UserModel userMod
 */
class blogController extends baseController
{
    public $blogMod;
    public $blogCategoryMod;
    public $blogCommentMod;
    public function __construct(){
        parent::__construct();

        $this->blogMod = new blogModel();
        $this->blogCategoryMod = new blogCategoryModel();
        $this->blogCommentMod = new blogCommentModel();
    }

    public function category(){
        $lists = $this->blogCategoryMod->where(['tag'=>0])->select(['id','title']);
        Json(0,$lists);
    }

    public function userCategory(){
        $this->blogMod = new blogModel();
        $lists = $this->blogMod->where(['user_id'=>$this->getUserId()])->select(['Distinct category']);
        $category = [];
        foreach($lists as $v){
            $categorys = explode(',',rtrim($v['category'],','));
            if(count($categorys) == 1){
                !in_array($categorys[0],$category) && $category[] = $categorys[0];
            }else{
                !in_array($categorys[0],$category) && $category[] = $categorys[0];
                !in_array($categorys[1],$category) && $category[] = $categorys[1];
            }
        }
        sort($category);
        Json(0,$category);
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
        $start = ($page-1) * $limit;
        $key = $this->_get['key'] ?? '';
        $categoryId = isset($this->_get['categoryId']) ? $this->_get['categoryId'] : 0;
        $category = $this->blogCategoryMod->where(['id'=>$categoryId])->info(['title']);
        $categoryTitle = $category['title'];
        $total = $this->blogMod->where(['private'=>1,'title'=>['like',$key],'tag'=>0,'status'=>1,'category'=>['like',$categoryTitle]])->count();
        $lists = $this->blogMod
            ->alias('b')
            ->join(" LEFT JOIN users u on b.user_id = u.id ")
            ->where(['b.private'=>1,'b.tag'=>0,'b.status'=>1,'b.title'=>['like',$key],'b.category'=>['like',$categoryTitle]])
            ->limit($start.','.$limit)
            ->order('update_at desc')
            ->select(['b.id','b.title','b.view','b.category','b.update_at','u.nickname']);

        /*所有博客分类*/
        $blogCategory = $this->blogCategoryMod->where(['tag'=>0])->select(['id','title']);
        $blogArr = array_column($blogCategory,null,'title');
        foreach($lists as &$v){
            $v['update_at'] = date("Y-m-d",strtotime($v['update_at']));
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

    public function personalLists(){

        $userId = $this->getUserId();
        $page = isset($this->_get['page']) ? $this->_get['page'] : 1;
        $limit = isset($this->_get['limit']) ? $this->_get['limit'] : 10;
        $key = $this->_get['key'] ?? '';
        $private = $this->_get['private'];
        $start = ($page-1) * $limit;

        $categoryTitle = $this->_get['categoryTitle'];
        if($private == ''){ //所有
            $total = $this->blogMod->where(['user_id'=>$userId,'title'=>['like',$key],'status'=>1,'category'=>['like',$categoryTitle]])->count();
            $lists = $this->blogMod->alias('b')->join(" LEFT JOIN users u on b.user_id = u.id ")->where(['b.user_id'=>$userId,'b.title'=>['like',$key],'b.status'=>1,'b.category'=>['like',$categoryTitle]])->limit($start.','.$limit)->order('b.update_at desc')->select(['b.id','b.title','b.category','b.private','b.tag','b.update_at','u.nickname']);
        }else{   //分公开、私有
            $total = $this->blogMod->where(['user_id'=>$userId,'title'=>['like',$key],'private'=>$private,'status'=>1,'category'=>['like',$categoryTitle]])->count();
            $lists = $this->blogMod->alias('b')->join(" LEFT JOIN users u on b.user_id = u.id ")->where(['b.user_id'=>$userId,'b.title'=>['like',$key],'b.private'=>$private,'b.status'=>1,'b.category'=>['like',$categoryTitle]])->limit($start.','.$limit)->order('b.update_at desc')->select(['b.id','b.title','b.category','b.private','b.tag','b.update_at','u.nickname']);
        }
        foreach($lists as &$item){
            $item['category'] = explode(',',rtrim($item['category'],','));
        }
        unset($item);
        $data = [
            'data'=>$lists,
            'total'=>$total,
            'page'=>$page,
            'limit'=>$limit
        ];
        Json(0,$data);
    }
    /*公开详情*/
    public function publicDetail(){

        $id = isset($this->_get['id']) ? $this->_get['id'] : 0;

        $detail = $this->blogMod->where(['id'=>$id,'status'=>1,'private'=>1])->info();

        if(empty($detail))
            Json(-1,[],'无数据');

        $this->blogMod->where(['id'=>$id])->update(['view = view + 1 ']);
        $comment =  $this->blogCommentMod->alias("bc1")
            ->join(" left join blog b on bc1.blog_id = b.id ")
            ->join(" left join users u1 on bc1.user_id = u1.id ")
            ->join(" left join blog_comment bc2 on bc1.reply_id = bc2.id ")
            ->join(" left join users u2 on bc2.user_id = u2.id ")
            ->where(["bc1.blog_id"=>$id])
            ->order(" bc1.created_at ")
            ->select(['bc1.*','u1.nickname','u1.avatar','u1.sex','u2.nickname as r_nickname']);

        Json(0,['data'=>$detail,'comment'=>$comment]);
    }
    /*包括私有和公有*/
    public function allDetail(){
        $checkToken = userController::checkToken();
        if(!$checkToken){
            Json(-1,[],'请登录后操作');
        }
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
    /**
     * 新增博客
    */
    public function addBlog(){

        $userId = $this->getUserId();
        $title = $this->_post['title'];
        $category = $this->_post['category'];
//        $content = $this->_post['content'];
        $original_content = $this->_post['original_content'];
        $private = $this->_post['private'];
        $tag = $this->_post['tag'];

        if(!$title || !$original_content)
            Json(-1,[],'信息不全');
        $categoryList = explode(',',$category);
        $categoryList = array_diff($categoryList,['']);
        if(count($categoryList) > 2 || count($categoryList) <=0)
            Json(-1,[],'标签数不能大于2或小于等于0');

        $data = [
            'title'=>$title,
            'original_content'=>$original_content,
//            'content'=>$content,
            'user_id'=>$userId,
            'status'=>1,
            'private'=>$private,
            'tag'=>$tag,
            'category'=>strtolower($category),
            'created_at'=>date("Y-m-d H:i:s",TIMESTAMP),
            'update_at'=>date("Y-m-d H:i:s",TIMESTAMP)
        ];
        #公开的时候分类写进数据库
        if($private == 1){
            $commit_c = [];
            foreach ($categoryList as $c){
                $c = strtolower($c);
                $strLen_max = strlen($c);
                $strLen_min = mb_strlen($c,"UTF8");
                $strLen = ($strLen_max + $strLen_min)/2;
                if($strLen > 12)
                    Json(-1,[],'标签过长');
                $exist = $this->blogCategoryMod->where(["title"=>$c,'tag'=>$tag])->info();
                if(!$exist && $c)
                    $commit_c[] = ['title'=>$c,'tag'=>$tag];
            }
            if($commit_c)
                $this->blogCategoryMod->addBatch($commit_c);
        }
        $rst = $this->blogMod->add($data);

        $rst && Json(0,[],'新增成功');
        Json(-1,[],'新增失败');
    }
    /*编辑博客*/
    public function editBlog(){
        $checkToken  = userController::checkToken();
        if(!$checkToken){
            Json(-1,[],'请登录后操作');
        }
        $id = $this->_post['id'];
        $title = $this->_post['title'];
        $category = $this->_post['category'];
        $tag = $this->_post['tag'];
//        $content = $this->_post['content'];
        $original_content = $this->_post['original_content'];
        $private = $this->_post['private'] ?? 0;
        $user = new userController();

        if(!$title || !$original_content)
            Json(-1,[],'信息不全');
        $categoryList = explode(',',$category);
        $categoryList = array_diff($categoryList,['']);
        if(count($categoryList) > 2 || count($categoryList) <=0)
            Json(-1,[],'标签数不能大于2或小于等于0');

        $data = [
            'title'=>$title,
            'tag'=>$tag,
            'category'=>strtolower($category),
            'original_content'=>$original_content,
//            'content'=>$content,
            'private'=>$private,
            'update_at'=>date("Y-m-d H:i:s",TIMESTAMP)
        ];
        #公开的时候分类写进数据库
        if($private == 1){
            $commit_c = [];
            foreach ($categoryList as $c){
                $c = strtolower($c);
                $strLen_max = strlen($c);
                $strLen_min = mb_strlen($c,"UTF8");
                $strLen = ($strLen_max + $strLen_min)/2;
                if($strLen > 12)
                    Json(-1,[],'标签过长');
                $exist = $this->blogCategoryMod->where(["title"=>$c,'tag'=>$tag])->info();
                if(!$exist && $c)
                    $commit_c[] = ['title'=>$c,'tag'=>$tag];
            }
            if($commit_c)
                $this->blogCategoryMod->addBatch($commit_c);
        }
        $rst = $this->blogMod->where(['id'=>$id,'user_id'=>$user->getUserId()])->update($data);

        $rst && Json(0,[],'编辑成功');
        Json(-1,[],'编辑失败');
    }
    /*编辑的博客信息*/
    public function editBlogInfo(){
        $id = $this->_get['id'];
        $checkToken  = userController::checkToken();
        if(!$checkToken){
            Json(-1,[],'请登录后操作');
        }
        $user = new userController();
        $user_id = $user->getUserId();
        $data = $this->blogMod->where(["id"=>$id,'user_id'=>$user_id])->info();
        Json(0,$data,'');
    }
    /*删除*/
    function delete(){
        $id = $this->_get['id'] ?? 0;
        $user_id = $this->getUserId();
        if($user_id && $id){
            $this->blogMod->where(['user_id'=>$user_id,'id'=>$id])->delete();
            Json(0,[],'删除成功');
        }
        Json(-1,[],'删除失败');
    }
}