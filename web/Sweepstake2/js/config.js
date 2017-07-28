var CONSTS = {
    NEED_TEL: 'A00099',
    GET_CASH: 'A00016',
    GET_LUCKY_DRAW_CHANCE: 'A00015',
    PRIZE_STATUS: {
        EXPIRED: '09',
        GIVE_OUT: '02',
        COUPONS_USED: '11',
        NOT_GIVE_OUT: '01',
        IS_THINGS: '06'
    }
};

var BASE_URL = 'http://m.jdpay.com/marketing',
    isInWeChat = /MicroMessenger/.test(window.navigator.userAgent);

var CONFIG = {

    isInWeChat: isInWeChat,
    weChatLibUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js',

    //当前活动配置
    entranceId: '2015102400000000002',
    sendCodeUrl: BASE_URL + '/sms/send',
    requestUrl: BASE_URL + '/qrcode/index',
    submitMobileUrl: BASE_URL + 'marketing/lottery/modify.action',

    openAppBaseUrl: 'http://sale.jd.com/app/act/KBuoE641DZmxgYf.html?url=',
    couponUrl: 'http://m.jdpay.com/user/myCoupon',

    prizeInitUrl: function(){
        var url = isInWeChat ? '/lottery/wxshow' : '/lottery/qbshow';
        // return 'http://10.9.45.111/mobile-web/activity/kunlun/test/wxshow.json';
        return BASE_URL + url;
    }(),

    luckDrawUrl: function(){        
        var url = '/lottery/wxtake';
        // return 'http://10.9.45.111/mobile-web/activity/kunlun/test/wxtake.json';
        return BASE_URL + url;
    }(),

    //实物中奖输入手机号
    submitTelUrl: BASE_URL + '/lottery/modify.action',

    //中奖名单数据
    getListUrl: BASE_URL + '/lottery/lucky',

    //获取更多活动入口
    getMoreBannerUrl: BASE_URL + '/lottery/getads',


    //分享配置
    share: {
        title: document.title,
        desc: '天天抽奖，天天抽奖的描述！',
        link: location.href,
        imgUrl: 'http://img13.360buyimg.com/cms/jfs/t790/61/1403238732/5911/2dcd4cf2/559f6b56Na06dce77.png',
        success: function () {
            $.ajax({
                type: "get",
                dataType:"json",
                url: baseUrl + "/marketing/lottery/get?t=" + Math.random() + "&wxOpenId=" + Config.wxOpenId + "&entranceId=" + CONFIG.entranceId,
                //data: { entranceId: CONFIG.entranceId},
                success: function (data) {
                    if (data.data.mobile) {
                        //绑定手机
                        phonePage.show();
                    } else {
                        //抽奖页
                        indexPage.show();
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data));
                }
            });
        },
        cancel: function () {
            alert("cancle");
        }
    },

    //获取URL上面的参数，返回参数集合
    urlArgs: function(){
        var temp = ['qrCode', 'wxOpenId', 'auth', 'code', 'refresh_token', 'entranceId'],
            result = {}; 

        temp.forEach(function(item){
            result[item] = getParameterByName(item);
        });
        
        return result;
    }()
};

/**
 *  获取URL上的query参数
 *
 *  @param {String} name
 *  @return {String} result
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
