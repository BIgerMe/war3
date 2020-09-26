/*
 *
 * @file        uploadImg.js
 * @license     MIT License
 * @author      rumenz.com 入门小站
 * {@link       https://github.com/mifunc/editor.md.uploadImg}
 * @updateTime  2019-10-23
 */

function initPasteDragImg(Editor){
    var doc = document.getElementById(Editor.id)
    doc.addEventListener('paste', function (event) {
        var items = (event.clipboardData || window.clipboardData).items;
        var file = null;
        if (items && items.length) {
            // 搜索剪切板items
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    file = items[i].getAsFile();
                    break;
                }
            }
        } else {
            console.log("当前浏览器不支持");
            return;
        }
        if (!file) {
            console.log("粘贴内容非图片");
            return;
        }
    
        uploadImg(file,Editor);
    });

    var dashboard = document.getElementById(Editor.id)
    dashboard.addEventListener("dragover", function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    dashboard.addEventListener("dragenter", function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    dashboard.addEventListener("drop", function (e) {
        e.preventDefault()
        e.stopPropagation()
     var files = this.files || e.dataTransfer.files;
     uploadImg(files[0],Editor);
     })
}
function uploadImg(file,Editor){
    let token = '';
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/web/img/qiniuToken",
        data: {},
        beforeSend: function(request) {
            request.setRequestHeader("Token", getToken());
        },
        async: false,
        success: function (result) {
            token = result.data.token;
        }
    });

    var formdata = new FormData()
    formdata.append('file', file)
    formdata.append('token', token)
    $.ajax({
        type: 'POST',
        url: 'http://up.qiniu.com/',
        data: formdata,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (rst) {
            let img = "http://head.xxroom.xyz/" + rst.key;
            Editor.insertValue("![]("+img+")");
            xTips('上传成功',2000)
            return
        },
        error: function () {
            xTips('上传失败',2000)
            return true;
        }
    })
}

