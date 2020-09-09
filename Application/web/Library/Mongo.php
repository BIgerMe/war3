<?php

namespace Application\web\Library;
use MongoDB;
class Mongo
{
    private static $mg;

    private function __construct()
    {
        $this->mongo = new MongoDb\Driver\Manager("mongodb://localhost:27017");
        $this->bulk = new MongoDB\Driver\BulkWrite;
    }

    /**
     * 增
     * @param $col 集合 如 xxroom.blog
     * @param $document 文档 如 ['_id' => new MongoDB\BSON\ObjectID, 'name' => '菜鸟教程'];
     * @return Object
     */
    public function insert($col,$document){
        $_id = $this->bulk->insert($document);
        $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $result = $this->mongo->executeBulkWrite($col, $this->bulk, $writeConcern);
        return $result;
    }
    /**
     * 删
     * @param $col 集合
     * @param $filter  ['x' => 2]
     * @param $options ['limit' => 0] limit 0 删除第一条 1删除所有匹配
     * @return object
     */
    public function delete($col,$filter,$options){
        $this->bulk->delete($filter,$options);
        $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $result = $this->mongo->executeBulkWrite($col, $this->bulk, $writeConcern);
        return $result;
    }
    /**
     * 改
     * @param $col 集合
     * @param $filter  ['x' => 2]
     * @param $action ['$set' => ['name' => '菜鸟工具', 'url' => 'tool.runoob.com']]
     * @param $options ['multi' => false, 'upsert' => false]
     * @return object
     */
    public function update($col,$filter,$action,$options){
        $this->bulk->update($filter,$action,$options);
        $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $result = $this->mongo->executeBulkWrite($col, $this->bulk, $writeConcern);
        return $result;
    }
    /**
     * 查
     * @param $col 集合
     * @param $filter 条件 ['x' => ['$gt' => 1]]
     * @param $options 选项 ['projection' => ['_id' => 0],'sort' => ['x' => -1]]
     * @return object
     */
    public function select($col,$filter,$options){
        $query = new MongoDB\Driver\Query($filter, $options);
        $cursor = $this->mongo->executeQuery($col, $query);
        return $cursor;
    }
    public static function mg(){
        if(!self::$mg instanceof self){
            self::$mg = new self();
        }
        return self::$mg;
    }
}