var baseUrl = "http://10.9.47.24";
var Config = {
    entranceId: "2015102400000000002",
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var temp = ['qrCode', 'wxOpenId', 'auth', 'code', 'refresh_token', 'entranceId'];
temp.forEach(function (item) {
    Config[item] = getParameterByName(item);
});
window.wxParam = {
    appid:'',
    timestamp:'',
    noncestr:'',
    signature:'',
    link:window.location.href,
    title:'分享标题啊。。',
    desc:'分享的描述哦。。',
    imgUrl:'http://img11.360buyimg.com/cms/jfs/t1390/32/402540112/7690/8a8b277b/558015bfN5a154c71.png',
}
//_D方法依赖common.js
/*
_D().ready(function(){
    //wxsdk 依赖wxsdk插件
    wxsdk({
        debug:false,
        type:'jsonp',//可选
        jsonp:{//jsonp 可配置数据
            name:'callbackFn',
            isEncode:true,
            server:'https://m.jdpay.com/open/ticketSignature',
            fn:function(data){//默认this指向当前对象 ，后面也是
                var r = data.resultData;
                this.params.appid = r.appId;
                this.params.noncestr = r.nonceStr;
                this.params.signature = r.signature;
                this.params.timestamp = r.timestamp;
            }
        },
        //微信初始化后 回调 , 可选 ,如选用直接分享可以不使用此回调。
        callback:function(){},
        //直接调用分享 可选
        shareData:{
            title: wxParam.title,
            desc: wxParam.desc,
            link: wxParam.link,
            imgUrl: wxParam.imgUrl,
            //channel:'wx|qq|wb',设置渠道  默认是全部渠道
            success : function(){
                //alert('已分享 yyy');
            },
            cancel : function(){
                //alert('取消了 yyy');
            }
        }
    });
        
});
*/

//===================本地测试调试=========================

// 在微信公众测试帐号用自己的帐号登进去

//服务端地址用pux的服务器：
//http://pux.wangyin.com/weixin/api.php 
//appid和appsecret用当前帐号的。
wxsdk({
    debug: false,
    type:'jsonp',//可选
    jsonp:{//jsonp 可配置数据
        name:'callbackFn',
        isEncode:true,
        server: 'http://pux.wangyin.com/wechat/users', 
        param: '&appId=wx019d442781829a25&appSecret=d4624c36b6795d1d99dcf0547af5443d',
        fn:function(data){//默认this指向当前对象 ，后面也是
            var r = data.resultData;
            console.log(data)
            //pux
            this.params.appid = r.appId;
            this.params.noncestr = r.nonceStr;
            this.params.signature = r.signature;
            this.params.timestamp = r.timestamp;
        }
    },
    shareData:{
        title: wxParam.title,
        desc: wxParam.desc,
        link: wxParam.link,
        imgUrl: wxParam.imgUrl,
        //channel:'wx|qq|wb',设置渠道  默认是全部渠道
        success: function () {
            $.ajax({
                type: "get",
                dataType: "json",
                url: baseUrl + "/marketing/lottery/get?t=" + Math.random() + "&wxOpenId=" + Config.wxOpenId + "&entranceId=" + Config.entranceId,
                //data: { entranceId: CONFIG.entranceId},
                success: function (data) {
                    if (data.code == "A00000") {
                        if (data.data.mobile) {
                            //绑定手机
                            phonePage.show();
                        } else {
                            //抽奖页
                            indexPage.show();
                        }
                    } else {
                        openAlert("",data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data));
                }
            });
            //alert('已分享 yyy');
        },
        cancel : function(){
            //alert('取消了 yyy');
        }
    }
});
//------------------------------------------------------------------------------------------------
    //alert(0);
    //window.setTimeout(function () { alert(5);},2000);
//alert(JSON.stringify(Config));
//$("#J_openBtn").click(function () {
//    var iframe = document.createElement("iframe");
//    iframe.setAttribute("src", "wangyin://wallet/start?module=ACTIVITY");
//    document.body.appendChild(iframe);
//    window.setTimeout(function () { document.body.removeChild(iframe); }, 5000);
//});
$.fn.phoneValidate = function (btu, option) {
        var _self = this;
        var getTime = function () {
            var time = _option.requestTime;
            btu.attr("disabled", true);
            btu.html(_option.requestText.replace("requestText", time));
            var timer = window.setInterval(function () {
                if (time == 1) {
                    btu.attr("disabled", false);
                    window.clearInterval(timer);
                    btu.html(_option.readyText);
                    return false;
                }
                btu.html(_option.requestText.replace("requestText", --time));
            }, 1000);
        }
        var _option = $.extend({
            readyText: "获取验证码",
            requestTime: 60,
            requestText: "requestText后重获",
            ajaxfn: undefined,
            ajaxUrl: "",
            callBack: function (data) { },
            error: function (data) { }
        }, option || {})
        btu.click(function () {
            if (_self.val() == "") return false;
            getTime();
            if (_option.ajaxfn) {
                _option.ajaxfn.call(_self);
                return false;
            }
            if (_option.ajaxUrl == "") return false;
            $.ajax({
                type: "get",
                url: _option.ajaxUrl,
                dataType:"json",
                data: { entranceId: Config.entranceId, mobile: $(_self).val() },
                success: function (data) {
                    _option.callBack.call(_self, data);
                },
                error: function (data) {
                    _option.error.call(_self, data);
                }
            });
        });
    }
var openAlert = function (title, text, buttonEvent) {
    $("#alertWrap").show().find("h1").html(title);
    $("#alertWrap").find("span").html(text);
    window.setTimeout(function () { $(".alert").addClass("alertActive"); }, 10);
    var buHtml = "";
    if (buttonEvent) {
        buttonEvent.forEach(function (i) { buHtml += "<button " + (buttonEvent.length == 1 ? 'class=\"singleBtu\"' : '') + ">" + i.name + "</button>"; });
    } else {
        buHtml = "<button class=\"singleBtu\">OK</button>"; 
    }
    $("#alertWrap").find(".buttonWrap").empty().append(buHtml);
    var self = this;
        
    self.close = function () {
        $(".alert").removeClass("alertActive");
        window.setTimeout(function () { $("#alertWrap").fadeOut("fast") }, 50);
    }
    $("#alertWrap button").each(function (i, item) {
        $(this).unbind("click").click(function () {
            if (!buttonEvent) { self.close(); return false; }
            if (buttonEvent[i].fn) {
                buttonEvent[i].fn.call(self);
            } else {
                self.close();
            }
        });
    });
}
$(".weakLayer").click(function () { $(this).hide(); });
function Page(domId, fn) {
    this.domId = domId;
    this.showBack = function () { }
    this.show = function () {
        $(".mainWrap").hide();
        $("#" + this.domId).show();
        this.showBack();
    }
    if (fn) { fn.call(this); }
}
var indexPage = new Page("indexPage", function () {
    $("#goApp").click(function () {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "wangyin://wallet/start?module=ACTIVITY&browserUrl=http://10.9.45.161/Sweepstake/index.html?role=game");
        document.body.appendChild(iframe);
        window.setTimeout(function () { document.removeChild(iframe); }, 5000);
    });
});
var descPage = new Page("descPage", function () {
    $("#" + this.domId).find(".butStyle").click(function () {
        //立即分享
        $(".weakLayer").show();
        //openAlert("提示", "请轻击右上角菜单按钮进行分享", [{name:"我知道了"}]);
        //location.reload();
        //phonePage.show();
    });
});
var phonePage = new Page("phonePage", function () {
    $("#txt_PhoneNumber").phoneValidate($("#btu_getsms"), {
        ajaxUrl: baseUrl + "/marketing/sms/sendWithName",//获取code的url，默认post
        callBack: function (data) {
            if (data.code != "A00000") {
                openAlert("出错了", data.msg);
            } else {
                openAlert("发送成功", "短信验证码已经成功发送，请注意查收");
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
    $("#btu_postVali").click(function () {
        var _url = baseUrl + "/marketing/lottery/get?entranceId=" + Config.entranceId + "&wxOpenId=" + Config.wxOpenId + "&mobile=" + $("#txt_PhoneNumber").val() + "&verifyCode=" + $("#text_verifyCode").val();
        alert(_url);
        $.ajax({
            type: "get",
            dataType: "json",
            url: _url,
            //data: { entranceId: CONFIG.entranceId, wxOpenId: CONFIG.wxOpenId, mobile: $("#txt_PhoneNumber").val(), verifyCode: $("#text_verifyCode").val() },
            success: function (data) {
                if (data.code != "A00000") {
                    openAlert("出错了", data.msg);
                } else {
                    openAlert("验证成功", "验证已经成功", [
                        {
                            name: "OK", fn: function () {
                                indexPage.show();
                                this.close();
                            }
                        }
                    ]);
                }
            },
            error: function (data) {
                alert("error:" + JSON.stringify(data));
            }
        });
    });
});
/*2015102400000000007 100积分
            2015102400000000011 手机充值优惠券
            2015102400000000012 现金红包
            2015102400000000013 谢谢参与
            2015102400000000014 东券
            2015102400000000030 体验金*/
var gamePage = new Page("gamePage", function () {
    var priceData = [
        { index: 0, id: "", msg: "mes0" },
        { index: 1, id: "", msg: "mes1" },
        { index: 2, id: "2015102400000000007", msg: "mes2" },
        { index: 3, id: "2015102400000000011", msg: "mes3" },
        { index: 4, id: "2015102400000000012", msg: "mes4" },
        { index: 5, id: "2015102400000000013", msg: "mes5" },
        { index: 6, id: "2015102400000000014", msg: "mes6" },
        { index: 7, id: "2015102400000000030", msg: "mes7" }
    ];
    openAlert("", "抱歉，您的抽奖机会已经用完");
        
    mApp().getInfo(function (data) {
        var validTimes = 3;
        Config["entranceId"] = "2015102400000000002";
        var _url = baseUrl + "/marketing/lottery/show?entranceId=" + Config.entranceId + "&auth=" + eval("(" + data + ")").auth;
        $.ajax({
            typr:"get",
            url: _url,
            dataType: "json",
            success: function (data) {
                if (data.code != "A00000") {
                    openAlert("",data.msg);
                } else {
                    validTimes = data.data.voucherInfo.validTimes;
                    if (validTimes == 0) {
                        openAlert("", "抱歉，您的抽奖机会已经用完");
                    }
                    $("#gamePage strong").html(validTimes);
                    var isRound = false;
                    $(".pointer").click(function () {
                        if (isRound) { return false; }
                        alert(openAlert);
                        if (validTimes == 0) {
                            //alert(openAlert);
                            //openAlert("","ss");
                            openAlert("", "抱歉，您的抽奖机会已经用完");
                        } else {
                            //zhuanpanGo("2015102400000000012");
                            $.ajax({
                                typr: "get",
                                url: baseUrl + "/marketing/lottery/take?voucherId=" + Config.entranceId + "&sign=" + eval("(" + data + ")").auth,
                                dataType: "json",
                                success: function (data) {
                                    $("#gamePage strong").html(--validTimes);
                                    zhuanpanGo(data.prizeInfo);
                                }
                            });
                        }
                    });
                }
            }
        });
    });
    var goPrice = function () { }
    $("#gamePage button").click(function () {
        goPrice();
    });
    var zhuanpanGo = function (prizeInfo) {
        priceId = prizeInfo.prizeType;
        isRound = true;
        var _index = -1;
        priceData.forEach(function (item) {
            if (item.id == priceId) { _index = item.index; }
        });
        if (_index == -1) { alert("error"); return false; }
        $(".zhuanpan").css("-webkit-transform", "rotate(" + ((360 / 8) * _index + (360 * 4) + 22) + "deg)");
        window.setTimeout(function () {
            openAlert("", item.msg);
            isRound = false;
            $("#gamePage img").src("href", prizeInfo.prizeImg);
            $("#gamePage h2").html(prizeInfo.prizeName);
            $("#gamePage span").html("领取时间：" + prizeInfo.createdDate);
            goPrice = function () {




            }
        }, 4000);
    }
});
phonePage.showBack = function () {
    var self = this;
    window.setTimeout(function () {
        $("#" + self.domId).find(".dialogWrap>div").addClass("show");
    }, 10);
}
var errorPage = new Page("errorPage");
if (getParameterByName("role") == "game") {
    gamePage.show();
} else {
    descPage.show();
}
