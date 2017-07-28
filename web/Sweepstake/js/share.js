//var HybridBridge = require('../widget/hybrid'),
    //CONFIG = require('./kunlun-config').CONFIG;

function onBridgeReady(shareConfig) {
    if(!shareConfig){
        return;
    }

    shareConfig.callback = shareConfig.callback || function(){};
    
    WeixinJSBridge.on('menu:share:appmessage',
        function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": shareConfig.appId,
                "img_url": shareConfig.imgUrl,
                "img_width": "120",
                "img_height": "120",
                "link": shareConfig.link,
                "desc": shareConfig.desc,
                "title": shareConfig.title
            },
            function(res) { 
                (shareConfig.callback)();
            });
        }
    );
    WeixinJSBridge.on('menu:share:timeline',
        function(argv) { (shareConfig.callback)();
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": shareConfig.imgUrl,
                "img_width": "120",
                "img_height": "120",
                "link": shareConfig.link,
                "desc": shareConfig.desc,
                "title": shareConfig.title
            },
            function(res) {});
        }
    );
    WeixinJSBridge.on('menu:share:weibo',
        function(argv) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content": shareConfig.title,
                "url": shareConfig.link
            },
            function(res) { (shareConfig.callback)();
            });
        }
    );
    WeixinJSBridge.on('menu:share:facebook',
        function(argv) { (shareConfig.callback)();
            WeixinJSBridge.invoke('shareFB', {
                "img_url": shareConfig.imgUrl,
                "img_width": "120",
                "img_height": "120",
                "link": shareConfig.link,
                "desc": shareConfig.desc,
                "title": shareConfig.title
            },
            function(res) {});
        }
    );
};


function sharePage() {
    
    var config = CONFIG.share;

    //微信分享
    
    if (CONFIG.isInWeChat) {
        if (document.domain.indexOf('jd.com') < 0) {
            var script = document.createElement('script');
            script.src = CONFIG.weChatLibUrl;
            document.body.appendChild(script);
            
            script.onload = function () {
                initWeChatShare(config);
            };
        } else {
            //京东域名 微信分享
            document.addEventListener('WeixinJSBridgeReady', function () {
                onBridgeReady(config);
            }, false);
        }
    } else {
        //APP内分享
        var menuObjArr = [{
            menuTitle: '分享',
            menuDesc: '',
            menuAction: HybridBridge.renderFn(function () {
                this.share(config.link, config.title, config.desc);
            }, 'remain')
        }];

        HybridBridge.ready(function (data) {
            this.setTitleName(document.title);
            this.setTitleMenu(menuObjArr);
        });
    }
}

function initWeChatShare(config) {
    $.ajax({
        url: 'http://pux.wangyin.com/wechat/users',
        //url: 'https://m.jdpay.com/open/ticketSignature',
        data: {
            url: window.location.href,
            appId: "wx019d442781829a25",
            appSecret: "d4624c36b6795d1d99dcf0547af5443d"
        },
        dataType: 'jsonp',
        success: function (data) {
            wxConfig(data.resultData, config);
        },
        error: function () {
            alert("eror");
        }
    });
}

function wxConfig(data, config) {
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareTimeline(config);
        wx.onMenuShareAppMessage(config);
    });
}
sharePage();