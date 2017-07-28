var v_models =
[{
    "model": {
        "template": "<div id='phoneView' class='phoneView'></div>",
        "optionsList": ["o13"],
        "jsCode": "",
        "needfulOptions": ["o13"],
        "javaScriptFrame": "",
        "name": "主屏",
        "index": "m0",
        "guid": "mainScreen",
        "dom": ""
    },
    "guid": "mainScreen",
    "optionsList": [{
        "name": "主屏配置",
        "inputType": "mainBg",
        "description": "配置最底层主屏，为满铺状态，主要针对背景图片或者背景色进行配置",
        "index": "o13",
        "isNeedful": true,
        "dom": "",
        "defalutValue": ["", "full", ""]
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
        "guid": "p1_v6_m1_07697651",
        "dom": "",
        "classList": ["bgArea", "center"],
        "jsCode": "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);"
    },
    "guid": "p1_v6_m1_07697651",
    "optionsList": [{
        "name": "背景配置",
        "inputType": "textAndCheckboxForBg",
        "description": "若勾选“容器适应图片比例”，容器将会在原始宽度的基础上按照背景图比例自动调整自身高度",
        "index": "o1",
        "isNeedful": true,
        "dom": "",
        "defalutValue": [
        "http://img10.360buyimg.com/cms/jfs/t2221/46/2434997371/176376/a580128a/56d7edf9N083222fc.jpg",
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
        "template": "<div class='bgArea center' dragSet='none' zoomSet='x,y'><span zoom='true'></span></div>",
        "optionsList": ["o1", "o2", "o3", "o11"],
        "isForCode": false,
        "needfulOptions": ["o1", "o11"],
        "name": "背景域",
        "index": "m1",
        "container": "#phoneView",
        "guid": "p1_v6_m1_93313677",
        "dom": "",
        "classList": ["bgArea", "center"],
        "jsCode": "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);"
    },
    "guid": "p1_v6_m1_93313677",
    "optionsList": [{
        "name": "背景配置",
        "inputType": "textAndCheckboxForBg",
        "description": "若勾选“容器适应图片比例”，容器将会在原始宽度的基础上按照背景图比例自动调整自身高度",
        "index": "o1",
        "isNeedful": true,
        "dom": "",
        "defalutValue": [
        "http://img11.360buyimg.com/cms/jfs/t2296/200/1772786026/146633/40d698b1/56d8f876N3ea69222.jpg",
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
        "template": "<div class='buttonWrap' dragSet='x,y'><button class='bgSize-full'>button</button><span zoom='true'></span></div>",
        "optionsList": ["o2", "o3", "o4", "o11", "o5", "o6"],
        "isForCode": false,
        "isContainer": false,
        "needfulOptions": ["o6", "o5", "o11"],
        "name": "按钮",
        "index": "m2",
        "container": "div[guid='p1_v6_m1_07697651']",
        "guid": "p1_v6_m2_5211873",
        "dom": "",
        "classList": ["buttonWrap"],
        "jsCode": ""
    },
    "guid": "p1_v6_m2_5211873",
    "optionsList": [{
        "name": "控件宽度",
        "inputType": "textAndSelect",
        "description": "控件宽度(单位'%/rem/px')，不配置请留空",
        "index": "o2",
        "dom": "",
        "defalutValue": ["50.6", "%"]
    }, {
        "name": "控件高度",
        "inputType": "setForHeight",
        "description": "控件高度(单位'%/rem/px')，不配置请留空",
        "index": "o3",
        "dom": "",
        "defalutValue": ["16.9", "%", false]
    }, {
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["70.8", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "isNeedful": true,
        "dom": "",
        "defalutValue": ["26.1", "%", false]
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
        "defalutValue": [true, "", "", "", "button", "1.5", "", "none", ""],
        "description": "按钮控件表现配置",
        "index": "o6",
        "isNeedful": true,
        "dom": ""
    }]
}, {
    "model": {
        "template": "<div class='textAreaWrap' dragSet='y'><span role='text'>示例文字</span></div>",
        "optionsList": ["o4", "o10"],
        "isContainer": false,
        "needfulOptions": ["o10"],
        "name": "文本域",
        "index": "m3",
        "container": "div[guid='p1_v6_m1_07697651']",
        "guid": "p1_v6_m3_8388524",
        "dom": "",
        "classList": ["textAreaWrap"]
    },
    "guid": "p1_v6_m3_8388524",
    "optionsList": [{
        "name": "相对纵坐标",
        "inputType": "textAndSelect",
        "description": "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0",
        "index": "o4",
        "dom": "",
        "defalutValue": ["88.8", "%"]
    }, {
        "name": "文本配置",
        "inputType": "setForFont",
        "defalutValue": ["这是文案组件，可以自由调整", "0.8", "", "tc", "1", false, false, false],
        "description": "配置文本域",
        "index": "o10",
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
        "container": "div[guid='p1_v6_m1_93313677']",
        "guid": "p1_v6_m5_24579849",
        "dom": "",
        "classList": ["activityRole"]
    },
    "guid": "p1_v6_m5_24579849",
    "optionsList": [{
        "name": "活动规则文案",
        "inputType": "textEdit",
        "description": "配置活动规则的文案，若一个项目中已经有视图配置了活动细则文案，其他的控件将共用，无须再另行配置",
        "index": "o12",
        "isNeedful": true,
        "dom": "",
        "defalutValue": "<div>活动时间：2015年12月3日00:00 -2015年12月31日23:59</div><div>活动平台：京东钱包APP客户端</div><div>活动内容：活动期间，京东钱包用户登陆京东钱包APP-今天页面，即可参加抽奖。</div><div>一、活动规则<br></div><div>1、本次大抽奖的奖品为：京东钱包账户积分、手机充值优惠券神秘礼包、万元小金库体验金（1日收益）、1元话费优惠券、1元红包、特定实物奖品。<br></div><div>2、同一用户每天1次抽奖机会，分享抽奖活动页面到微信朋友圈或登录朋友圈内指定活动页面，当天可再获1次抽奖机会。同一用户每天最多可获得2次抽奖机会。<br></div><div>3、本次活动的所有奖品，均由主办方为您代扣代缴个人所得税，您无需为此另行缴纳个税。<br></div><div>4、在本次活动中，同一用户累计中奖金额不能超过5000元。<br></div><div>5、同一京东钱包账户、同一京东钱包绑定手机号、同一身份证号、同一京东账户、同一微信账户、同一股票资金帐号、同一银行卡号等与用户身份相关的信息，满足任一条件均视为同一用户。<br></div><div>6、在本活动期间，如存在违规行为（包括但不限于恶意套取资金、机器作弊、虚假交易等违反诚实信用原则行为），主办方将取消您的中奖资格，并有权撤销相关违规交易和奖励，必要时追究法律责任。<br></div><div>7、如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），京东钱包有权暂停或取消本次活动，并可依相关法律法规的规定主张免责。<br></div><div>8、本活动规则及其未尽事宜同时受《京东钱包服务协议》及相关公告、规则约束。<br></div><div>9、在法律允许的范围内，本公司对本活动有解释权。<br></div><div>10、本次活动与Apple Inc.无关。</div>"
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
        "defalutValue": ["89.5", "%"]
    }, {
        "name": "相对横坐标",
        "inputType": "textAndSelectAndCheckbox",
        "description": "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0",
        "index": "o11",
        "dom": "",
        "defalutValue": ["34.6", "%", true]
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
        "defalutValue": ["活动细则", "1", "", "tl", "2.5", false, false, false],
        "description": "配置文本域",
        "index": "o10",
        "isNeedful": true,
        "dom": ""
    }]
}]