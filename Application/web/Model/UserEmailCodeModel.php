<?php
namespace Application\web\Model;

class UserEmailCodeModel extends BaseModel
{
    public $table = 'user_email_code';
    public function __construct()
    {
        parent::__construct();
    }

}