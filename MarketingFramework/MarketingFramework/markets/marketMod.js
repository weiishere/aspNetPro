/*
 *  营销活动模块 
 *  
 */

define(function () {
    //定义命名空间函数
    var marketMod = {};

    //时间戳
    var timestamp = function(){
      return new Date().getTime()+parseInt(Math.random()*100);
    };


    marketMod = {

        //验证码发送
        sms:function(opt){
            var _param = opt.param || 
                {
                    entranceId: Config.entranceId,
                    mobile:Config.mobile
                },
                _data = opt.data || {}
            ;
            requestAjax(
                Config.serverUrl + "/marketing/sms/sendWithName?timer="+timestamp(),
                _data,
                _param,
                function (data) {
                //返回数据
                opt.callback && opt.callback.call(this,data);
            });
        },

        //领券／领奖
        getPrize:{
            //初始化数据
            index:function(opt){
                var _param = opt.param || 
                    {
                        entranceId: Config.entranceId,
                        wxOpenId:Config.wxOpenId,
                        auth:Config.auth
                    },
                    _data = opt.data || {}
                ;

                requestAjax(
                    Config.serverUrl + "/marketing/gameprize/index?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            }
        },

        //二维码反奖
        qrcode:{
            index:function(opt){
                var _param = opt.param || 
                    {
                        qrCode: Config.qrCode,
                        wxOpenId:Config.wxOpenId,
                        auth:Config.auth
                    },
                    _data = opt.data || {}
                ;

                requestAjax(
                    Config.serverUrl + "/marketing/qrcode/index?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            }
        },

        //抽奖
        lottery:{
            //抽奖次数查询及抽奖活动信息查询请求：
            show:function(opt){
                var _param = opt.param || 
                    {   
                        auth:Config.auth,
                        wxOpenId:Config.wxOpenId,
                        entranceId: Config.entranceId,
                        refresh_token:Config.refresh_token
                    },
                    _data = opt.data || {}
                ;
                requestAjax(
                    Config.serverUrl + "/marketing/lottery/show?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            },
            //钱包或微信内获得抽奖机会请求：
            get:function(opt){
                var _param = opt.param || 
                    {   
                        auth:Config.auth,
                        wxOpenId:Config.wxOpenId,
                        entranceId: Config.entranceId,
                        refresh_token:Config.refresh_token
                    },
                    _data = opt.data || {}
                ;

                requestAjax(
                    Config.serverUrl + "/marketing/lottery/get?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            },
            //钱包或微信内抽奖：
            take:function(opt){
                var _param = opt.param || 
                    {   
                        sign:Config.sign,
                        voucherId: Config.voucherId
                    },
                    _data = opt.data || {}
                ;
                requestAjax(
                    Config.serverUrl + "/marketing/lottery/take?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            },
            //钱包内分享获得抽奖机会请求：
            share:function(opt){
                var _param = opt.param || 
                    {   
                        auth:Config.auth,
                        entranceId: Config.entranceId
                    },
                    _data = opt.data || {}
                ;
                requestAjax(
                    Config.serverUrl + "/marketing/lottery/share?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            },
            //抽奖活动幸运儿列表请求：
            lucky:function(opt){
                var _param = opt.param || 
                    {   
                        entranceId: Config.entranceId
                    },
                    _data = opt.data || {}
                ;
                requestAjax(
                    Config.serverUrl + "/marketing/lottery/lucky?timer="+timestamp(),
                    _data,
                    _param,
                    function (data) {
                    //返回数据
                    opt.callback && opt.callback.call(this,data);
                });
            }
        }

    } 

    return marketMod;
});