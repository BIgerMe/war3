var config = {
    // requestUrl : "http://localhost:8080"
};
/**获取TOKEN*/
function getToken(){return window.localStorage.getItem('token');}
/**删除TOKEN*/
function removeToken(){window.localStorage.removeItem('token');return;}
/**设置page_index（首页停留页面）*/
function setIndexPage(page){sessionStorage.setItem('index_page',page);}
/**获取page_index*/
function getIndexPage(){return sessionStorage.getItem('index_page');}
/**登录验证*/
function checkLogin(){if(getToken()){return true;}else{$('#loginPage').modal('show');return;}}

/**获取URL参数 如 url?id=9  GetRequest()['id'] 即可获取id的值9*/
function GetRequest() {
    var url = location.search; //获取当前页面url
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
/**展开缩进*/
function shrink(e){
    let _this = $(e);
    if(_this.hasClass('left')){
        _this.children("img").attr('src','/assets/images/icons/list-ul.svg');
    }else{
        _this.children("img").attr('src','/assets/images/icons/arrows-fullscreen.svg');
    }
    _this.toggleClass('left right');
    $(".cateItem").toggleClass('d-lg-block');
    $(".listItem").toggle();
    $(".detailItem").toggleClass('col-lg-10 col-lg-8 offset-lg-1 offset-lg-3')
}

/**获取URL参数*/
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function xTips(msg,time=6000){
    let avatar = [
        'http://head.xxroom.xyz/Fiqtk5JV1KIisyHIEDDwQ6QQpiLd',
        'http://head.xxroom.xyz/FnzE9VdzCBsPB6Zuwy2sKOHt95xr',
        'http://head.xxroom.xyz/FsS8-HDpK7Nxk5xRU011Rzm_BEMf',
        'http://head.xxroom.xyz/FtQalkDqgYfZ8r8lioRq50CzW9rw',
        'http://head.xxroom.xyz/FtOZRJ-tgtzQwzifbWi0ZqgenXz6',
        'http://head.xxroom.xyz/Fv9P5v-T-OERy6nRiKYg0y2WYpyA'
    ];
    let img = avatar[Math.floor(Math.random()*avatar.length)];
    let tip = " <div class='toast' role='alert' aria-live='assertive' aria-atomic='true' data-delay='"+time+"'>\n" +
        "                <div class='toast-header'>\n" +
        "                    <img style='height: 40px' src='"+img+"' class='rounded mr-2' alt='...'>\n" +
        "                    <strong class='mr-auto'>站长消息</strong>\n" +
        "                    <button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>\n" +
        "                        <span aria-hidden='true'>&times;</span>\n" +
        "                    </button>\n" +
        "                </div>\n" +
        "                <div class='toast-body'>\n" +
        "                    "+msg+"\n" +
        "                </div>\n" +
        "            </div>"
    $("#xTip").append(tip);
    $(".toast").toast('show');
    removeToast()
}
//自动删除toast
function removeToast(){
    $('.toast').on('hidden.bs.toast', function () {
        $(this).remove();
    })
}

/**平台页面跳转*/
function gohomepage(){
    setIndexPage('homepage.html')
    if($(".mainContent").length > 0){
        $(".mainContent").load('homepage.html');
    }else{
        window.location.href = '/view/index.html'
    }
}
function goaddblogpage(){
    if (checkLogin()){
        setIndexPage('addblogpage.html')
        if($(".mainContent").length > 0) {
            $(".mainContent").load("addblogpage.html");
        }else{
            window.location.href = '/view/index.html'
        }
    }
}
/**个人后台*/
function gopersonalblogpage(){
    if(checkLogin()){
        setIndexPage('personalblogpage.html')
        if($(".mainContent").length > 0) {
            $(".mainContent").load("personalblogpage.html");
        }else{
            window.location.href = '/view/index.html'
        }
    }
}
function gopic(){
    if(checkLogin()){
        setIndexPage('personalpic.html')
        if($(".mainContent").length > 0) {
            $(".mainContent").load("personalpic.html");
        }else{
            window.location.href = '/view/index.html'
        }
    }
}
function godescpage(){
    $(".mainContent").load("descpage.html");
}
function gonavpage(){
    window.location.href = 'navpage.html';
}
function goblogpage(){
    window.location.href = "/view/blogpage.html";
}
