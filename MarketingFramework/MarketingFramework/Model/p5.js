/// <reference path="static.jdpay.com/basic/dist/js/m-public/??zepto.min.js,mobilebone.js,mApp.js,fastclick.js,m.js,share.js" 

//history.back = function () { alert("back");}
var p4 = (function (exp) {
    Config.serverUrl = "http://172.24.5.210:8088";
    //Config.entranceId = "2016041300000000002";
    var result = {};
    var doHeader = function (data, fn, error) {
        try {
            if (data.code == "A00000") {
                //p4.queryRelation(true);
                //openAlert("", data.msg);
                fn(data);
            } else {

                if (error) error(data);
            }
        } catch (e) {
            Trip(e.message);
        }
    }
    result.initShareInfo = function () {
        requestAjax(Config.serverUrl + "/marketing/relationShare/queryPrize?timer=" + parseInt(Math.random() * 10000), {},
            {
                entranceId: Config.entranceId,
                key: getParameterByName("key"),
                voucherId: getParameterByName("voucherId")
            }, function (data) {
                doHeader(data, function () {
                    //$("div[guid='p5_v10_m3_56057556'] span").html(data.entranceCopy);
                    $("div[guid='p5_v10_m3_51033748'] span").html(data.shareDesc);
                    _mApp.setTitle(data.title);
                    result.signature = data.signature;
                    result.shareData = { shareTitle: data.title, shareDesc: data.shareDesc, shareUrl: data.shareUrl };

                });
            });
    }
    result.takePrizePostData = {
        entranceId: Config.entranceId,
        signature: getParameterByName("signature"),
        refresh_token: getParameterByName("refresh_token")
    };
    result.takePrizeResultData = null;
    result.takePrize = function () {
        //var _data = eval('[{"beginDate":"2016-05-10 18:36:30","createdDate":"2016-05-10 18:36:30","endDate":"2016-05-15 23:59:59","prizeAmount":"150.00","prizeId":"2016041300000000010","prizeName":"手机充值优惠券","prizeType":"09"},{"beginDate":"2016-05-10 18:36:30","createdDate":"2016-05-10 18:36:31","endDate":"2016-05-15 23:59:59","prizeAmount":"150.00","prizeId":"2016041300000000011","prizeName":"手机充值优惠券","prizeType":"09"}]');
        //var pageMod = new PageMod($("div[guid='p5_v11_m7_37165606']>div").html(), _data, function () {
        //    $("div[guid='p5_v11_m7_37165606']").html(this.resultHtml);
        //});
        //return false;
        var _fn = function (data) {
            doHeader(data, function () {
                models.p1_v1_m3_51407992.find("span[role='text']").html("账户：<b>" + (data.telphone || "未授权") + "</b>");
                if (data.data.mobile) {
                    page_v12.show({ isCache: false });
                } else {
                    //绑定红包列表
                    models.p1_v1_m3_51407992.find("span[role='text']").html(data.remind);
                    var pageMod = new PageMod($("div[guid='p5_v11_m7_37165606']>div").html(), data.getPrizes, function () {
                        models.p5_v11_m7_37165606.html(this.resultHtml);
                    });
                    p4.queryRelation(true, "p5_v11_m7_3096885", "herosData");
                    p4.queryExtension();
                }
            }, function () {
                if (data.code == "A000011") {
                    openAlert("", data.msg, [{ name: "重试", fn: function () { this.closeAlert(); p4.takePrize(); } }, { name: "关闭", fn: function () { this.closeAlert(); } }]);
                } else {
                    models.p1_v1_m1_45471306.removeClass("hide").find("span[role='text']").html(data.msg);
                }
                p4.queryRelation(true, "p5_v11_m7_3096885", "herosData");
                p4.queryExtension();
            });
        }
        //takePrizeResultData用于避免多次请求接口takePrize

        if (result.takePrizeResultData == null) {
            requestAjax(Config.serverUrl + "/marketing/relationShare/takePrize?timer=" + parseInt(Math.random() * 10000), {}, result.takePrizePostData, function (data) {
                _fn(data);
            });
        } else {
            _fn(result.takePrizeResultData);
        }
    }
    result.herosData = null;
    result.queryRelation = function (isLoad, guid, modelName) {
        var _bind = function () {
            //绑定英雄榜列表
            //alert(JSON.stringify(result.herosData.giveOutPrizes));
            var pageMod = new PageMod($("div[guid='" + guid + "']>script").html(), result.herosData.giveOutPrizes, function () {
                $("div[guid='" + guid + "']").html(this.resultHtml);
            }, { modelName: modelName });
        }
        if (result.herosData == null || isLoad == true) {
            requestAjax(Config.serverUrl + "/marketing/relationShare/queryRelation?timer=" + parseInt(Math.random() * 10000), {}, {
                entranceId: Config.entranceId,
                signature: getParameterByName("signature"),
                wxOpenId: getParameterByName("wxOpenId")
            }, function (data) {
                if (data.code == "A00000") {
                    //执行绑定herosData
                    result.herosData = data;
                    _bind();
                }
            });
        } else {
            _bind();
        }
    }
    result.doAmount = function (num) {
        var str = num + "";
        if (str.indexOf(".") != -1) {
            //小数
            if (str.split(".")[1] == "00") {
                return "<span style='font-size:2rem'>" + str.split(".")[0] + "</span>";
            } else {
                return "<span style='font-size:3rem'>" + num.split(".")[0] + ".</span>" + num.split(".")[1];
            }
        } else {
            return "<span style='font-size:2rem'>" + num + "</span>";
        }
    }
    var clone = function (obj) {
        var copy = (obj instanceof Array) ? [] : new obj.constructor();
        for (attr in obj) {
            if (!obj.hasOwnProperty(attr)) continue;
            copy[attr] = (typeof obj[attr] == "object") ? that.clone(obj[attr]) : obj[attr];
        }
        return copy;
    }
    result.goRedLink = "";
    result.queryExtension = function () {
        //var data = eval("(" + '{"0_url":"http://www.baidu.com","1_pic":"http://wx.qlogo.cn/mmopen/ZwP1gZJ0DxDZv4JKibobTEX4Og2475SvU2TupVaArJkzEoyUR5gj0Jg5JficricC7Q70hQDKEgw7eVR7fO2ibvhhjg/0","1_url":"http://www.baidu.com","2_pic":"http://wx.qlogo.cn/mmopen/ZwP1gZJ0DxDZv4JKibobTEX4Og2475SvU2TupVaArJkzEoyUR5gj0Jg5JficricC7Q70hQDKEgw7eVR7fO2ibvhhjg/0","2_url":"http://www.baidu.com","3_pic":"http://wx.qlogo.cn/mmopen/ZwP1gZJ0DxDZv4JKibobTEX4Og2475SvU2TupVaArJkzEoyUR5gj0Jg5JficricC7Q70hQDKEgw7eVR7fO2ibvhhjg/0","3_url":"http://www.baidu.com"}' + ")");

        requestAjax(Config.serverUrl + "/marketing/relationShare/queryExtension?timer=" + parseInt(Math.random() * 10000), {}, {
            entranceId: Config.entranceId
        }, function (data) {
            if (data.hasOwnProperty("advertiSement")) {
                var arr = [];
                var obj = {};
                var index = 1;
                for (var i in data.advertiSement) {
                    if (i != "0_url") {
                        obj[i.split("_")[1]] = data.advertiSement[i];
                        if (index % 2 == 0) { arr.push(clone(obj)); obj = {} }
                        index++;
                    } else {
                        result.goRedLink = data.advertiSement[i];
                    }
                }
                var pageMod = new PageMod($("#temp_Extension").html(), arr, function () {
                    $("div[guid='p5_v11_m1_61753844']").find("script").remove();
                    $("div[guid='p5_v11_m1_61753844']").append(this.resultHtml);
                }, { modelName: "Extension" });
            }
        });
    }
    exp.JdWalletShareCallback_2 = function () {
        //alert("request shareService API...");
        requestAjax(Config.serverUrl + "/marketing/relationShare/shareService?timer=" + parseInt(Math.random() * 10000), {}, { entranceId: Config.entranceId, signature: result.signature, auth: getParameterByName("auth") }, function (data) {
            //alert(JSON.stringify(data));
        });
    }

    var pd = 4;
    var width = getParameterByName("screenWidth");
    if (width != "") {
        if (parseInt(width) <= 480) { pd = 1.5 }
        if (parseInt(width) <= 720) { pd = 2 }
        if (parseInt(width) <= 1080) { pd = 3 }
        //if (parseInt(width) <= 1440) { pd = 4 }
        $(".page").css("width", parseFloat(width) / pd);
    }
    if (getParameterByName("screenHeight") != "") {
        $(".page").css("height", parseFloat(getParameterByName("screenHeight")) / pd);
    }

    return result;
})(window);