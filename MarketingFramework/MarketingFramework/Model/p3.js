
var Sweepstake = function (parm) {
    requestAjax(Config.serverUrl + "/marketing/lottery/get?timer=" + Math.random(), {}, {
        'wxOpenId': Config.wxOpenId,
        'entranceId': Config.entranceId
    }, function (data) {
        if (data.code == "A00000") {
            if (data.data.mobile) {
                //绑定手机
                page_v8.show(function () {
                    var txt_number = parm.txt_number;
                    var txt_verifyCode = parm.txt_verifyCode;
                    var btu_verifyCode = parm.btu_verifyCode;
                    var btu_submit = parm.btu_submit;
                    //var txt_number = models["p3_v8_m4_08718139"].find("input");
                    //var txt_verifyCode = models["p3_v8_m4_46059248"].find("input");
                    //var btu_verifyCode = models["p3_v8_m2_05461351"].find("button");
                    //var btu_submit = models["p3_v8_m2_9404173"].find("button");
                    phoneValidate(txt_number, txt_verifyCode, btu_verifyCode, btu_submit, {
                        ajaxUrl: Config.serverUrl + "/marketing/sms/sendWithName", //获取code的url，默认post
                        validateUrl: Config.serverUrl + "/marketing/lottery/get", //验证验证码的地址
                        getCodeCallBack: function (data) {
                            if (data.code != "A00000") {
                                Trip("抱歉，发送短信验证码操作失败：" + data.msg);
                            } else {
                                Trip("短信验证码已经成功发送，请注意查收！");
                            }
                        },
                        submitCallBack: function (data) {
                            if (data.code == "A00004") {
                                page_v9.show(function () {
                                    models["p3_v9_m3_9723732"].find("span").html("您今天已经领取过抽奖机会啦，明天再来吧~");
                                });
                            } else if (data.code == "A00000") {
                                openAlert("验证成功", "验证已经成功，点确OK开始抽奖！", [
                                {
                                    name: "OK", fn: function () {
                                        page_v4.show();
                                        this.closeAlert();
                                    }
                                }
                                ]);
                            } else {
                                openAlert("出错了", data.msg);
                            }
                        },
                        error: function (data) {
                            alert(JSON.stringify(data));
                        }
                    });
                });
            } else {
                //抽奖页
                page_v4.show();
            }
        } else if (data.code == "A00004") {
            errorPage.content = "您今天已经领取过抽奖机会啦，明天再来吧~";
            errorPage.show();
        } else {
            openAlert("", data.msg);
        }
    });
}

function Sweepstake(param) {
    this.txt_number = parm.txt_number;
    this.txt_verifyCode = parm.txt_verifyCode;
    this.btu_verifyCode = parm.btu_verifyCode;
    this.btu_submit = parm.btu_submit;
    this.init();
}
Sweepstake.prototype.init = function () {
    var _self = this;
    requestAjax(Config.serverUrl + "/marketing/lottery/get?timer=" + Math.random(), {}, {
        'wxOpenId': Config.wxOpenId,
        'entranceId': Config.entranceId
    }, function (data) {
        if (data.code == "A00000") {
            if (data.data.mobile) {
                //绑定手机
                page_v8.show(function () {
                    phoneValidate(_self.txt_number, _self.txt_verifyCode, _self.btu_verifyCode, _self.btu_submit, {
                        ajaxUrl: Config.serverUrl + "/marketing/sms/sendWithName", //获取code的url，默认post
                        validateUrl: Config.serverUrl + "/marketing/lottery/get", //验证验证码的地址
                        getCodeCallBack: function (data) {
                            if (data.code != "A00000") {
                                Trip("抱歉，发送短信验证码操作失败：" + data.msg);
                            } else {
                                Trip("短信验证码已经成功发送，请注意查收！");
                            }
                        },
                        submitCallBack: function (data) {
                            if (data.code == "A00004") {
                                page_v9.show(function () {
                                    models["p3_v9_m3_9723732"].find("span").html("您今天已经领取过抽奖机会啦，明天再来吧~");
                                });
                            } else if (data.code == "A00000") {
                                openAlert("验证成功", "验证已经成功，点确OK开始抽奖！", [
                                {
                                    name: "OK", fn: function () {
                                        page_v4.show();
                                        this.closeAlert();
                                    }
                                }
                                ]);
                            } else {
                                openAlert("出错了", data.msg);
                            }
                        },
                        error: function (data) {
                            alert(JSON.stringify(data));
                        }
                    });
                });
            } else {
                //抽奖页
                page_v4.show();
            }
        } else if (data.code == "A00004") {
            errorPage.content = "您今天已经领取过抽奖机会啦，明天再来吧~";
            errorPage.show();
        } else {
            openAlert("", data.msg);
        }
    });
} 