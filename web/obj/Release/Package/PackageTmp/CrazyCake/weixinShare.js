var wxCallbacks = {};
WeixinApi.ready(function (Api) {
    weixinApiData = Api;
    // 微信分享的数据(只是演示)
    var wxData = {
        "appId": "", // 服务号可以填写appId
        "imgUrl": 'http://teamotto.net/Content/img/Jewels/jewels_1.png',
        "link": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxff004edac4e058e9&redirect_uri=http%3A%2F%2Fwww.teamotto.net%2FGameView%2FGoGameFromShare&response_type=code&scope=snsapi_base&state=signCode#wechat_redirect",
        "desc": "Hi，我正在玩《钻石大咖》，并送给您一颗钻石，请速来领取哦",
        "title": "戴美钻石-钻石大咖"
    };

    // 分享的回调
    wxCallbacks = {
        // 分享操作开始之前
        ready: function () {
            // 你可以在这里对分享的数据进行重组
            //alert("准备分享");
        },
        // 分享被用户自动取消
        cancel: function (resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
            //alert("分享被取消");
        },
        // 分享失败了
        fail: function (resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
            //alert("分享失败");
        },
        // 分享成功
        confirm: function (resp) {
            // 分享成功了，我们是不是可以做一些分享统计呢？
            //window.location.href='http://192.168.1.128:8080/wwyj/test.html';
            //alert("分享成功");
        },
        // 整个分享过程结束
        all: function (resp) {
            // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
            //alert("分享结束");
        }
    };

    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    //Api.shareToFriend(wxData, wxCallbacks);

    // 点击分享到朋友圈，会执行下面这个代码
    //Api.shareToTimeline(wxData, wxCallbacks);

    // 点击分享到腾讯微博，会执行下面这个代码
    //Api.shareToWeibo(wxData, wxCallbacks);
});
function ShareTofriends(img_url, link, title, desc) {
    //在HTML页面内嵌入这一段JS代码
    if (window.WeixinJSBridge) {
        if (typeof (img_url) == 'undefined' || img_url == "") {
            var img_url = "http://www.sample.com/test.jpg";
        }
        if (typeof (link) == 'undefined' || link == "") {
            var img_url = window.location.href;
        }
        if (typeof (title) == 'undefined' || title == "") {
            var title = '点开看一下吧!';
        }
        if (typeof (desc) == 'undefined' || desc == "") {
            var desc = "wendoscoo";
        }
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": img_url,
            //"img_width": "640",
            //"img_height": "640",
            "link": link,
            "desc": desc,
            "title": title
        }, function (res) {
            // 返回res.err_msg,取值
            // share_timeline:cancel 用户取消
            // share_timeline:fail　发送失败
            // share_timeline:ok 发送成功
            WeixinJSBridge.log(res.err_msg);
        });
        return false;
    }
    else {
        alert("WeixinJSBridge对象不存在!!");
    }
};
//发送给微信好友
function weixinSendAppMessage(title, desc, link, imgUrl) {
    WeixinJSBridge.invoke('sendAppMessage', {
        //"appid":appId, 
        "img_url": imgUrl,
        //"img_width":"640", 
        //"img_height":"640", 
        "link": link,
        "desc": desc,
        "title": title
    });
}