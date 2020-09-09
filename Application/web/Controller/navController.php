<?php

use Application\web\Model\NavModel;
use Application\web\Model\NavCategoryModel;

/**
 * @property UserModel userMod
 */
class navController extends baseController
{
    public $navMod;
    public $navCategoryMod;
    public function __construct(){
        parent::__construct();
        $this->navMod = new NavModel();
        $this->navCategoryMod = new NavCategoryModel();
    }

    public function lists(){

        $lists = $this->navMod->select(['title','logo','content','href']);
        Json(0,$lists);
    }

    /*分类展示导航列表*/
    public function listsByCate(){
        $key = $this->_get['key'] ?? "";
        $lists = $this->navMod->alias('n')
            ->join('left join navigation_category nc on n.category_id = nc.id ')
            ->where(['n.title'=>['like',$key]])
            ->select(['n.*','nc.title as c_title']);
        $cat = $this->navCategoryMod->order(' id asc')->select(['title']);
        $cat = array_column($cat,'title');
        $d = $l = [''];
        foreach($lists as $v){
            $l[$v['c_title']][] = $v;
        }
        foreach($cat as $v){
            $d[$v] = isset($l[$v]) ? $l[$v] : [];
        }
        Json(0,array_filter($d));
    }

    /*新增导航*/
    public function navSave(){
        $img = $this->_post['img'] ?? "";
        $title = $this->_post['title'] ?? "";
        $category = $this->_post['category'] ?? "";
        $href = $this->_post['href'] ?? "";
        $data = [
            'href'=>$href,
            'logo'=>$img,
            'title'=>$title,
            'category_id'=>$category,
            'user_id'=>$this->getUserId()
        ];
        $rst = $this->navMod->add($data);
        if($rst)
            Json(0,[],'保存成功');
        else
            Json(-1,[],'保存失败');
    }

    public function view(){
        $id = $this->_post['id'] ?? "";
        if(!empty($id)){
            $this->navMod->where(['id'=>$id])->update(['view = view + 1']);
            Json(0);
        }
        Json(-1);
    }
}