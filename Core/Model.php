<?php
namespace Core;
use PDO;
use PDOStatement;
class Model
{
    public $db;
    public $where = [];
    public $queryField = [];
    public $bind = [];
    public $limit = '';
    protected $alias = '';
    protected $join = '';
    protected $order = '';
    protected static $exp = [
        '>','=','<','!=','like','in'
    ];
    protected static $exp3 = [
        'between'
    ];
    public function __construct()
    {
        $this->db();
    }
    public function db(){
        $this->db = Db::instance()->linkId;

        return $this;
    }
    /*别名*/
    public function alias($alias){
        $this->alias = $alias;
        return $this;
    }
    public function join($join){
        $this->join .= " ".$join." ";
        return $this;
    }
    /*条件*/
    public function where($where=[]){
        $this->where = array_merge($this->where,$where);
        return $this;
    }
    /*分页*/
    public function limit($string){
        $this->limit = " limit ".$string;
        return $this;
    }
    /*排序*/
    public function order($string){
        $this->order = " order by ".$string;
        return $this;
    }
    /*查*/
    public function select($queryField=[]){
        $this->field($queryField);
        $queryField = !empty($this->queryField) ? implode(',',$this->queryField) : '*';
        $where = $this->parseWhere();
        $this->where = [];
        $sql = " SELECT ".$queryField." FROM `".$this->table."` ".$this->alias.$this->join.$where.$this->order.$this->limit;

        $pdo = $this->db->prepare($sql);
        $pdo->execute($this->bind);
        return $pdo->fetchall(PDO::FETCH_ASSOC);
    }
    /*单条数据*/
    public function info($queryField=[]){
        $this->field($queryField);
        $queryField = !empty($this->queryField) ? implode(',',$this->queryField) : '*';
        $where = $this->parseWhere();
        $this->where = [];
        $sql = " SELECT ".$queryField." FROM `".$this->table."` ".$this->alias.$this->join.$where.$this->order;
        $pdo = $this->db->prepare($sql);
        $pdo->execute($this->bind);
        return $pdo->fetch(PDO::FETCH_ASSOC);
    }
    /*总数*/
    public function count(){
        $where = $this->parseWhere();
        $this->where = [];
        $sql = " SELECT count('*') as c FROM `".$this->table."` ".$where;
        $pdo = $this->db->prepare($sql);
        $pdo->execute($this->bind);
        return (int)$pdo->fetch(PDO::FETCH_ASSOC)['c'];
    }
    /*增*/
    public function add($field=[]){
        $fields = $values = $this->bind = [];
        if(empty($field)){
            return false;
        }else{
            foreach ($field as $k=>$v){
                $fields[] = $k;
                $name = ':'.$k;
                $values[] = $name;
                $this->bind[$name] = $v;
            }
        }
        $sql = "INSERT INTO `".$this->table."` (".implode(',',$fields).") VALUES (".implode(',',$values).")";

        $pdo = $this->db->prepare($sql);
        return $pdo->execute($this->bind);
    }
    /*批量增*/
    public function addBatch($field=[]){
        $fields =  $this->bind = [];
        $valueStr = "";
        if(empty($field)){
            return false;
        }else{
            foreach($field[0] as $key=>$value){
                $fields[] = $key;
            }
            $i = 1;
            foreach($field as $item){
                $values = [];
                foreach ($item as $k=>$v){
                    $name = ':key'.$i;
                    $values[] = $name;
                    $this->bind[$name] = $v;
                    $i++;
                }
                $valueStr .= '('.implode(',',$values).'),';
            }
            $valueStr = rtrim($valueStr,',');
        }
        $sql = "INSERT INTO `".$this->table."` (".implode(',',$fields).") VALUES ".$valueStr;

        $pdo = $this->db->prepare($sql);

        return $pdo->execute($this->bind);
    }
    /*改*/
    public function update($field=[]){
        $where = $this->parseWhere();
        $this->where = [];
        $fields = $values = [];
        if(empty($field)){
            return false;
        }else{
            $set = '';
            foreach ($field as $k=>$v){
                if(is_numeric($k)){
                    $set .= empty($set) ? ' SET '.$v : ','.$v;
                }else{
                    $fields[] = $k;
                    $name = ':'.$k;
                    $values[] = $name;
                    $this->bind[$name] = $v;
                    $set .= empty($set) ? ' SET '.$k.' = '.$name : ','.$k.' = '.$name;
                }
            }
        }
        $bind = $this->bind;
        $this->bind = [];
        $sql = "UPDATE `".$this->table."`".$set.$where;
        $pdo = $this->db->prepare($sql);
        $pdo->execute($bind);
        return $pdo->rowCount();
    }
    /*删*/
    public function delete(){
        $where = $this->parseWhere();
        $this->where = [];
        $sql = "DELETE FROM `".$this->table."`".$where;
        $pdo = $this->db->prepare($sql);
        return $pdo->execute($this->bind);
    }
    public function field($queryField=[]){
        $this->queryField = array_unique($queryField);
        return $this;
    }
    /*查询*/
    public function query($sql=''){
        if($sql){
            $pdo = $this->db->prepare($sql);
            $pdo->execute();
            return $pdo->fetchall(PDO::FETCH_ASSOC);
        }
    }

    /*where参数解析*/
    protected function parseWhere(){
        $where = " WHERE 1 ";
        if(empty($this->where)){
            return $where;
        }else{
            $this->bind = [];
            $i = 1;
            foreach ($this->where as $k=>$v){
                if(is_array($v) && count($v) == 2){
                    if(in_array($v[0],self::$exp)){
                        $name = ':key'.$i;
                        switch($v[0]){
                            case 'like':
                                $this->bind[$name] = '%'.$v[1].'%';
                                break;
                            case 'in':
                                $inStr = implode(',',array_filter($v[1]));
                                $name = '('.$inStr.')';
                                break;
                            default:
                                $this->bind[$name] = $v[1];
                                break;
                        }
                        $where .= " AND ".$k." ".$v[0]." ".$name;
                        $i++;
                    }else{
                        return false;
                    }
                }else if(is_array($v) && count($v) == 3){
                    if(in_array($v[0],self::$exp3)){
                        $name1 = ':key'.$i."_1";
                        $name2 = ':key'.$i."_2";
                        switch($v[0]){
                            case 'between':
                                $this->bind[$name1] = $v[1];
                                $this->bind[$name2] = $v[2];
                                $where .= " AND ".$k." ".$v[0]." ".$name1." and ".$name2;
                                break;
                            default:
                                $this->bind[$name1] = $v[1];
                                $this->bind[$name2] = $v[2];
                                break;
                        }
                        $i++;
                    }else{
                        return false;
                    }
                } elseif(is_scalar($v)){
                    $name = ':key'.$i;
                    $this->bind[$name] = $v;
                    $where .= " AND ".$k." = ".$name;
                    $i++;
                }else{
                    return false;
                }
            }
            return $where;
        }
    }

}