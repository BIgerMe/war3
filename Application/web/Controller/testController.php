<?php

use Application\web\Model\CookModel;
use Application\web\Library\Mongo;
/**
 * @property CookModel cookMod
 */
class testController extends baseController
{
    private $a = '123';
    private $b = '14';
    public function __construct(){
        parent::__construct();
        $this->cookMod = new CookModel();
    }
    public function __set($n,$v){}
//    public function __get($n){}
    public function test(){

        echo $this->a;
        hello_war3();


//        $a = array('a'=>'123','b'=>'4124');
//        $a[] = &$a;
//
//        xdebug_debug_zval( 'a' );
//        unset($a);
//        xdebug_debug_zval( 'a' );
//
//        $b = false;  // false | '' | 0 ;
//        var_dump(isset($a));
//        var_dump(empty($a));
//        var_dump(empty($b));
//        $res = Mongo::mg()->update('test.blog',['x'=>1],['x'=>2,'name'=>'mongodb教程'],['multi'=>false]);
//        $res = Mongo::mg()->delete('test.blog',['x'=>2],['limit'=>1]);
//        var_dump($res);
    }
    /**厨师列表*/
    public function Lists(){
        $name = $this->_post['name'] ?: '';
        $pageIndex = $this->_post['pageIndex'] ?: 1;
        $pageSize = $this->_post['pageSize'] ?: 10;
        $pageStart = ( $pageIndex - 1 ) * $pageSize;

        $where = ['is_deleted'=>0];
        !empty($name) && $where['name'] = ['like',$name];

        $count = $this->cookMod->where($where)->count();
        $cookList = $this->cookMod->where($where)->limit($pageStart.",".$pageSize)->select();
        foreach ($cookList as &$item){
            $item['created_at'] = date('Y-m-d',strtotime($item['created_at']));
            $item['statusStr'] = $item['status'] == 1 ? '显示': '不显示';
        }
        Json(0,['list'=>$cookList,'count'=>$count]);
    }
    /**删除厨师*/
    public function del(){
        $id = $this->_post['id'];
        $rst = 0;
        if(is_array($id)){
            $rst = $this->cookMod->where(['id'=>['in',$id]])->update(['is_deleted'=>1]);
        }else{
            if(!empty($id)){
                $rst = $this->cookMod->where(['id'=>intval($id)])->update(['is_deleted'=>1]);
            }
        }
        $error = $rst ? 0 : -1;
        Json($error);
    }
    /**厨师信息*/
    public function info(){
        $id = $this->_get['id'] ? $this->_get['id'] : 0;
        $data = $this->cookMod->where(['id'=>$id])->info();
        Json(0,$data);
    }

    /**新增更新保存*/
    public function save(){
        $id = $this->_post['id'] ? $this->_post['id'] : "";
        if($id){
            //修改
            $ret = $this->cookMod->update($this->_post);
            if($ret>0){
                Json(0,[],'修改成功');
            }
        }else{
            //新增
            $ret = $this->cookMod->add($this->_post);
            if($ret){
                Json(0,[],'保存成功');
            }
        }
        Json(-1,[],'保存失败');
    }
}