v_models =
[{
    "model": {
        "template": "<div id='phoneView' class='phoneView'></div>",
        "optionsList": ["o13"],
        "jsCode": "$(function () {\n            var txt_number = models[\"p3_v8_m4_08718139\"].find(\"input\");\n            var txt_verifyCode = models[\"p3_v8_m4_46059248\"].find(\"input\");\n            var btu_verifyCode = models[\"p3_v8_m2_05461351\"].find(\"button\");\n            var btu_submit = models[\"p3_v8_m2_9404173\"].find(\"button\");\n            phoneValidate(txt_number, txt_verifyCode, btu_verifyCode, btu_submit, {\n                ajaxUrl: Config.serverUrl + \"/marketing/sms/sendWithName\", //获取code的url，默认post\n                validateUrl: Config.serverUrl + \"/marketing/lottery/get\", //验证验证码的地址\n                getCodeCallBack: function (data) {\n                    if (data.code != \"A00000\") {\n                        Trip(\"抱歉，发送短信验证码操作失败：\" + data.msg);\n                    } else {\n                        Trip(\"短信验证码已经成功发送，请注意查收！\");\n                    }\n                },\n                submitCallBack: function (data) {\n                    if (data.code == \"A00004\") {\n                        page_v9.show(function () {\n                            models[\"p3_v9_m3_9723732\"].find(\"span\").html(\"您今天已经领取过抽奖机会啦，明天再来吧~\");\n                        });\n                    } else if (data.code == \"A00000\") {\n                        openAlert(\"验证成功\", \"验证已经成功，点确OK开始抽奖！\", [\n                            {\n                                name: \"OK\", fn: function () {\n                                    page_v4.show();\n                                    this.closeAlert();\n                                }\n                            }\n                        ]);\n                    } else {\n                        openAlert(\"出错了\", data.msg);\n                    }\n                },\n                error: function (data) {\n                    alert(JSON.stringify(data));\n                }\n            });\n        });",
        "needfulOptions": ["o13"],
        "javaScriptFrame": "",
        "name": "主屏",
        "index": "m0",
        "guid": "mainScreen",
        "dom": "",
        "valueForBackToJs": {},
        "container": null,
        "isForCode": true,
        "classList": [],
        "isContainer": true,
        "disable": false,
        "display": true
    },
    "guid": "mainScreen",
    "optionsList": [{
        "name": "主屏配置",
        "inputType": "mainBg",
        "description": "配置最底层主屏，为满铺状态，主要针对背景图片或者背景色进行配置",
        "index": "o13",
        "isNeedful": true,
        "dom": "",
        "defalutValue": ["", "full", "#fc4151"],
        "data": [],
        "serviceSet": {
            "disable": true,
            "url": "",
            "type": "get"
        },
        "guid": "",
        "disable": false,
        "display": true
    }]
}, {
    "model": {
        "template": "<div class='bgArea center' dragSet='none' zoomSet='x,y'><span zoom='true'></span></div>",
        "optionsList": ["o1", "o2", "o3", "o11"],
        "isForCode": false,
        "needfulOptions": ["o1", "o11"],
        "name": "背景域",
        "index": "m1",
        "container": "#phoneView",
        "guid": "p3_v8_m1_17415730",
        "dom": "",
        "classList": ["bgArea", "center"],
        "jsCode": "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);"
    },
    "guid": "p3_v8_m1_17415730",
    "optionsList": [{
        "name": "背景配置",
        "inputType": "textAndCheckboxForBg",
        "description": "若勾选“容器适应图片比例”，容器将会在原始宽度的基础上按照背景图比例自动调整自身高度",
        "index": "o1",
        "isNeedful": true,
        "dom": "",
        "defalutValue": [
        "http://img10.360buyimg.com/cms/jfs/t2749/318/198164499/101927/872f5c1f/5706ba3dN7252d347.png",
        false, "sy", "full", ""]
    }, {
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["", "%", false]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "isNeedful": true,
        "dom": "",
        "defalutValue": ["", "%", true]
    }]
}, {
    "model": {
        "template": "<div class=\"textInputWrap\" dragSet='x,y'><span zoom='true'></span><input type='text' placeholder='请在此输入' /></div>",
        "optionsList": ["o2", "o3", "o4", "o11", "o5", "o14"],
        "isForCode": false,
        "isContainer": false,
        "needfulOptions": ["o5", "o14"],
        "name": "输入域",
        "index": "m4",
        "container": "div[guid='p3_v8_m1_17415730']",
        "guid": "p3_v8_m4_08718139",
        "dom": "",
        "classList": ["textInputWrap"],
        "jsCode": ""
    },
    "guid": "p3_v8_m4_08718139",
    "optionsList": [{
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["77", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["6.4", "%", false]
    }, {
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["46.9", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "dom": "",
        "defalutValue": ["11.9", "%", false]
    }, {
        "name": "组件皮肤选择",
        "inputType": "select",
        "description": "对组件的可视皮肤进行选择配置",
        "index": "o5",
        "data": [{
            "value": "",
            "name": "默认样式"
        }, {
            "value": "textInput_1",
            "name": "圆角内投影"
        }, {
            "value": "textInput_2",
            "name": "圆角外投影"
        }, {
            "value": "textInput_3",
            "name": "亮框透明发光"
        }],
        "isNeedful": true,
        "dom": "",
        "defalutValue": ""
    }, {
        "name": "输入框配置",
        "inputType": "setForTextInput",
        "defalutValue": ["transparent", "transparent", "", "1", "请在此输入手机号", "30", "0"],
        "description": "若进行配置可能会影响到所选择的相应皮肤样式",
        "index": "o14",
        "isNeedful": true,
        "dom": ""
    }]
}, {
    "model": {
        "template": "<div class=\"textInputWrap\" dragSet='x,y'><span zoom='true'></span><input type='text' placeholder='请在此输入' /></div>",
        "optionsList": ["o2", "o3", "o4", "o11", "o5", "o14"],
        "isForCode": false,
        "isContainer": false,
        "needfulOptions": ["o5", "o14"],
        "name": "输入域",
        "index": "m4",
        "container": "div[guid='p3_v8_m1_17415730']",
        "guid": "p3_v8_m4_46059248",
        "dom": "",
        "classList": ["textInputWrap"],
        "jsCode": ""
    },
    "guid": "p3_v8_m4_46059248",
    "optionsList": [{
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["39.3", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["6.6", "%", false]
    }, {
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["55.9", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "dom": "",
        "defalutValue": ["11.6", "%", false]
    }, {
        "name": "组件皮肤选择",
        "inputType": "select",
        "description": "对组件的可视皮肤进行选择配置",
        "index": "o5",
        "data": [{
            "value": "",
            "name": "默认样式"
        }, {
            "value": "textInput_1",
            "name": "圆角内投影"
        }, {
            "value": "textInput_2",
            "name": "圆角外投影"
        }, {
            "value": "textInput_3",
            "name": "亮框透明发光"
        }],
        "isNeedful": true,
        "dom": "",
        "defalutValue": ""
    }, {
        "name": "输入框配置",
        "inputType": "setForTextInput",
        "defalutValue": ["transparent", "transparent", "", "1", "请输入验证码", "30", "0"],
        "description": "若进行配置可能会影响到所选择的相应皮肤样式",
        "index": "o14",
        "isNeedful": true,
        "dom": ""
    }]
}, {
    "model": {
        "template": "<div class='buttonWrap' dragSet='x,y'><button class='bgSize-full'>button</button><span zoom='true'></span></div>",
        "optionsList": ["o2", "o3", "o4", "o11", "o5", "o6"],
        "isForCode": false,
        "isContainer": false,
        "needfulOptions": ["o6", "o5", "o11"],
        "name": "按钮",
        "index": "m2",
        "container": "div[guid='p3_v8_m1_17415730']",
        "guid": "p3_v8_m2_05461351",
        "dom": "",
        "classList": ["buttonWrap"],
        "jsCode": ""
    },
    "guid": "p3_v8_m2_05461351",
    "optionsList": [{
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["34.0", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["7.4", "%", false]
    }, {
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["55.5", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "isNeedful": true,
        "dom": "",
        "defalutValue": ["57.9", "%", false]
    }, {
        "name": "组件皮肤选择",
        "inputType": "select",
        "description": "对组件的可视皮肤进行选择配置",
        "index": "o5",
        "data": [{
            "value": "",
            "name": "默认样式"
        }, {
            "value": "buttonSkin_1",
            "name": "圆角纯色"
        }, {
            "value": "buttonSkin_2",
            "name": "圆角外框"
        }, {
            "value": "buttonSkin_3",
            "name": "圆角外投影"
        }, {
            "value": "buttonSkin_4",
            "name": "质感"
        }],
        "isNeedful": true,
        "dom": "",
        "defalutValue": ""
    }, {
        "name": "按钮表现",
        "inputType": "setForButton",
        "defalutValue": [false,
        "http://img12.360buyimg.com/cms/jfs/t2302/56/2411172793/10731/25f59a25/5706b9a6N24006924.png",
        "transparent", "", "获取验证码", "0.9", "#fa5722", "none", ""],
        "description": "按钮控件表现配置",
        "index": "o6",
        "data": [{
            "value": "v8",
            "name": "抽奖-手机号验证"
        }, {
            "value": "v4",
            "name": "抽奖页"
        }, {
            "value": "v9",
            "name": "信息(异常)提示"
        }],
        "isNeedful": true,
        "dom": ""
    }]
}, {
    "model": {
        "template": "<div class='buttonWrap' dragSet='x,y'><button class='bgSize-full'>button</button><span zoom='true'></span></div>",
        "optionsList": ["o2", "o3", "o4", "o11", "o5", "o6"],
        "isForCode": false,
        "isContainer": false,
        "needfulOptions": ["o6", "o5", "o11"],
        "name": "按钮",
        "index": "m2",
        "container": "div[guid='p3_v8_m1_17415730']",
        "guid": "p3_v8_m2_9404173",
        "dom": "",
        "classList": ["buttonWrap"],
        "jsCode": ""
    },
    "guid": "p3_v8_m2_9404173",
    "optionsList": [{
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["84.6", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["8.0", "%", false]
    }, {
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["65.1", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "isNeedful": true,
        "dom": "",
        "defalutValue": ["8.2", "%", false]
    }, {
        "name": "组件皮肤选择",
        "inputType": "select",
        "description": "对组件的可视皮肤进行选择配置",
        "index": "o5",
        "data": [{
            "value": "",
            "name": "默认样式"
        }, {
            "value": "buttonSkin_1",
            "name": "圆角纯色"
        }, {
            "value": "buttonSkin_2",
            "name": "圆角外框"
        }, {
            "value": "buttonSkin_3",
            "name": "圆角外投影"
        }, {
            "value": "buttonSkin_4",
            "name": "质感"
        }],
        "isNeedful": true,
        "dom": "",
        "defalutValue": ""
    }, {
        "name": "按钮表现",
        "inputType": "setForButton",
        "defalutValue": [false,
        "http://img10.360buyimg.com/cms/jfs/t2899/81/172596452/19897/a5c6326c/5706bae6N28faf8d3.png",
        "transparent", "", "开始抽奖", "0.9", "#fa5722", "none", ""],
        "description": "按钮控件表现配置",
        "index": "o6",
        "data": [{
            "value": "v8",
            "name": "抽奖-手机号验证"
        }, {
            "value": "v4",
            "name": "抽奖页"
        }, {
            "value": "v9",
            "name": "信息(异常)提示"
        }],
        "isNeedful": true,
        "dom": ""
    }]
}, {
    "model": {
        "template": "<div id=\"activityRole\" class=\"activityRole\" dragSet='x,y'><span zoom='true'></span><a href=\"javascript:;\">活动细则</a></div>",
        "optionsList": ["o12", "o2", "o3", "o4", "o11", "o1", "o10"],
        "isForCode": false,
        "jsCode": "$(\"div[guid=\"+guid+\"]\").click(function(){ mk_m.openActivityRole(); });",
        "isContainer": false,
        "needfulOptions": ["o10", "o12"],
        "name": "活动细则",
        "index": "m5",
        "container": "div[guid='p3_v8_m1_17415730']",
        "guid": "p3_v8_m5_27982735",
        "dom": "",
        "classList": ["activityRole"]
    },
    "guid": "p3_v8_m5_27982735",
    "optionsList": [{
        "name": "活动规则文案",
        "inputType": "textEdit",
        "description": "配置活动规则的文案，若一个项目中已经有视图配置了活动细则文案，其他的控件将共用，无须再另行配置",
        "index": "o12",
        "isNeedful": true,
        "dom": "",
        "defalutValue": "<div>活动规则</div><div><br></div><div>活动时间：</div><div>2016年3月15日-2016年3月24日</div><div>活动平台：</div><div>微信</div><div>活动内容：</div><div>活动期间，用户扫码关注京东钱包微信公众号，即可参加抽奖。</div><div>奖品设置：</div><div>5元现金红包、1元/3元/5元/10元手机充值优惠券、一万元小金库体验金（5日收益）、1000元运动基金。</div><div><br></div><div>一、活动规则：</div><div>1、用户通过扫描线下物料或线上网页上的微信二维码，关注京东钱包微信公众号，通过微信公众号进入大抽奖页面即可获得1次抽奖机会，分享抽奖活动页面到微信，可再获1次抽奖机会。同一用户活动期间最多可获得2次抽奖机会。</div><div><br></div><div>2、同一用户累计中奖金额不能超过5000元。</div><div><br></div><div>3、同一京东钱包账户、京东钱包绑定手机号、身份证号、京东账户、微信账户、银行卡号、终端设备，满足任一条件均视为同一用户。</div><div><br></div><div>4、在本活动期间，如存在违规行为（包括但不限于恶意套取资金、机器作弊、虚假交易等违反诚实信用原则行为），主办方将取消您的中奖资格，并有权撤销相关违规交易和奖励，必要时追究法律责任。</div><div><br></div><div>5、如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），京东钱包有权暂停或取消本次活动，并可依相关法律法规的规定主张免责。</div><div><br></div><div>6、本活动规则及其未尽事宜同时受《京东钱包服务协议》及相关公告、规则约束。</div><div><br></div><div>7、在法律允许的范围内，本公司对本活动有解释权。</div><div><br></div><div>8、本次活动与Apple Inc.无关。</div><div><br></div><div>二、奖品查询和使用规则：</div><div>(一) 千元运动基金：</div><div>1、工作人员将在本活动结束后5个工作日内根据用户提交的联系方式，联系中奖用户，确定奖品发放事宜。</div><div><br></div><div>2、同一用户仅有一次领取运动基金奖的机会，相应款项将发放到中奖用户完成实名认证的京东钱包余额。</div><div><br></div><div>3、开奖期间请保持手机畅通，可拨打400-098-8511咨询。活动结束后超过7天无法联系则视为放弃中奖。</div><div><br></div><div>(二) 手机充值优惠券：</div><div>1、手机充值优惠券分为4种：1元手机充值优惠券、3元手机充值优惠券、5元手机充值优惠券、10元手机充值优惠券；</div><div><br></div><div>2、查询：用户可在京东钱包“我的-优惠券中查询获赠的手机充值优惠券；</div><div><br></div><div>3、发放时间：手机充值优惠券将在获奖之日发放到京东钱包中</div><div><br></div><div>4、已完成京东钱包实名认证的用户可在优惠券有效期内使用；未完成京东钱包实名认证的用户须在优惠券有效期内进行实名认证，否则视为放弃该张优惠券；</div><div><br></div><div>5、优惠券有效期为3个自然日，自到账之日起算，券过期作废；</div><div><br></div><div>6、手机充值优惠券仅限在京东钱包客户端使用银行卡充值手机话费时使用，1元和3元话费优惠券单笔话费充值实付金额大于或等于45元时方可使用；5元和10元话费优惠券单笔话费充值实付金额大于或等于95元时方可使用；</div><div><br></div><div>7、手机话费充值时输入充值手机号及金额，点击“立即充值”后，即可选择可使用的券；</div><div><br></div><div>8、同一订单只能使用一张券，且不能与其他优惠活动同时享受。手机充值优惠券不可拆分使用、不可转赠、不可找零、不可兑现。手机充值优惠券与其他优惠券券不能叠加使用；</div><div><br></div><div>9、当用券订单发生退款时，在券有效期内的，则券退回至用户的账户，券退回后有效期不变；如已过有效期则券不再退还，仅退用户实付金额。</div><div><br></div><div>(三) 5元现金红包：</div><div>1、5元红包将在获奖之日发放到京东钱包“我的-卡包-红包”中；</div><div><br></div><div>2、现金红包将发放至用户参与活动使用的或在活动页面输入的手机号码所绑定的京东钱包账户；</div><div><br></div><div>3、已完成实名认证的用户可自动兑现至京东钱包账户余额； 未完成实名认证的用户须在获奖后3个工作日内完成京东钱包实名认证，方可兑现到京东钱包账户余额。未能在获奖日起算第3个工作日23：59：59完成实名认证的，视为放弃领奖；</div><div><br></div><div>(四) 万元小金库体验金：</div><div>1、体验金为京东小金库对应的货币基金虚拟份额，小金库体验金不能用于提现、支付、转账，仅可在京东钱包“理财－京东小金库”中查询和使用；</div><div><br></div><div>2、体验金生效日（D日）：已开通京东小金库的用户，体验金自中奖之日起生效；未开通京东小金库的用户，须在体验金领取之日起算第3个自然日23：59：59前，按照流程开通小金库帐户，体验金自开通小金库之日起生效。未能在体验金领取之日起算第3个自然日23：59：59前，按照流程开通小金库帐户的，视为放弃领奖，小金库体验金不生效；</div><div><br></div><div>3、本次活动体验期：本次活动的体验期为自体验金生效之日当天。体验期结束后，体验金本金收回；</div><div><br></div><div>4、体验金收益计算方法：体验金收益=体验金数额*D日万份收益/10000；</div><div><br></div><div>5、体验金收益发放：小金库体验金收益在D+1日可在京东钱包小金库中看到，在D+2日将以货币基金份额的形式发放至用户的小金库账户中；</div><div><br></div><div>6、同一用户仅能领取一次体验金。</div>"
    }, {
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["", "%", false]
    }, {
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["80.2", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "dom": "",
        "defalutValue": ["34.3", "%", false]
    }, {
        "name": "背景配置",
        "inputType": "textAndCheckboxForBg",
        "description": "若勾选“容器适应图片比例”，容器将会在原始宽度的基础上按照背景图比例自动调整自身高度",
        "index": "o1",
        "dom": "",
        "defalutValue": ["", false, "ls", "full", ""]
    }, {
        "name": "文本配置",
        "inputType": "setForFont",
        "defalutValue": ["活动细则", "1", "#FFFFFF", "tc", "2.5", false, false, false],
        "description": "配置文本域",
        "index": "o10",
        "isNeedful": true,
        "dom": ""
    }]
}]