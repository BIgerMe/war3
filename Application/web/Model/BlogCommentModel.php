<?php
namespace Application\web\Model;

class BlogCommentModel extends BaseModel
{
    public $table = 'blog_comment';
    public function __construct()
    {
        parent::__construct();
    }

}