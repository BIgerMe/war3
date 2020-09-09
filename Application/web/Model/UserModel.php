<?php
namespace Application\web\Model;

class UserModel extends BaseModel
{
    public $table = 'users';
    public function __construct()
    {
        parent::__construct();
    }

    public function UserList(){
        $sql = "select * from users";
        return $this->query($sql);
    }
}