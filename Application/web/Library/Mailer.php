<?php

namespace Application\web\Library;
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/9/2 0002
 * Time: 下午 5:36
 */
class Mailer
{
    public static function sendMail($to,$subject,$content)
    {
        include_once("PHPMailer.php");        // 引入php邮件类
        include_once("SMTP.php");        // 引入php邮件类
        $mail = new PHPMailer();
        $mail->CharSet = "utf-8";                // 编码格式
        $mail->IsSMTP();
        $mail->SMTPAuth = true;                   // 必填，SMTP服务器是否需要验证，true为需要，false为不需要

//        QQ邮箱服务
        $mail->Host = "smtp.qq.com";         // 必填，设置SMTP服务器
        $mail->Port = 465;                     // 设置端口465
        $mail->Username   = "2260891938@qq.com";  		    // 必填，开通SMTP服务的邮箱；任意一个163邮箱均可
        $mail->Password   = "vjqokeiozqfedica";
        $mail->From = "2260891938@qq.com";          // 必填，发件人Email
        $mail->SMTPSecure = 'ssl';                 //传输协议
        $mail->FromName = "Xroom";             // 必填，发件人昵称或姓名

//        新浪邮箱服务
//        $mail->Host = "smtp.sina.com";         // 必填，设置SMTP服务器
//        $mail->Port = 465;
//        $mail->Username = "xiao3017@sina.com";            // 必填，开通SMTP服务的邮箱；任意一个163邮箱均可
//        $mail->Password = "yueling521";         // 必填， 以上邮箱对应的密码
//        $mail->From = "xiao3017@sina.com";          // 必填，发件人Email
//        $mail->SMTPSecure = 'ssl';                 //传输协议
//        $mail->FromName = "Xroom";             // 必填，发件人昵称或姓名

        $mail->Subject = $subject;        // 必填，邮件标题（主题）
        $mail->MsgHTML($content);
        $mail->AddReplyTo($to);            // 收件人回复的邮箱地址
        $mail->AddAddress($to);        // 收件人邮箱
        $mail->IsHTML(true);                // 是否以HTML形式发送，如果不是，请删除此行

        if (!$mail->Send()) {
            return ['status'=>0,'msg'=>"Mailer Error: " . $mail->ErrorInfo];
        } else {
            return ['status'=>1,'msg'=>'has been sent'];
        }
    }
}