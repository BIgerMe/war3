<?php
if(!function_exists('Json')){
   function Json($error=0,$data=[],$msg=''){
       $output = [
           'error'=>$error,
           'data'=>$data,
           'msg'=>$msg
       ];
       echo json_encode($output);
       die;
   }
}
