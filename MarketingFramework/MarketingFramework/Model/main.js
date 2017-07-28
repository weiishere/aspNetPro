
define(['global', 'initialize'], function (g, init) {
    init.webData.moduleList = {};
    var projectsList = init.webData.moduleList["projects"] = {};
    var viewsList = init.webData.moduleList["views"] = {};
    var models = init.webData.moduleList["models"] = {};
    var options = init.webData.moduleList["options"] = {};
    var runatModes = init.webData.moduleList["runatModes"] = {};

    var result = { projects: projectsList, views: viewsList, models: models, options: options, runatModes: runatModes }

    var factory = function () { }


    /*----------------------------------------------------------------聪明的分割线--------------------------------------------------------------*/

    projectsList["p1"] = new Project({ name: "单页模型", index: "p1", viewsList: ["v1", "v13"], viewsObjList: [], isMultiPage: false });
    projectsList["p2"] = new Project({ name: "返奖模型", index: "p2", viewsList: ["p2_v1", "p2_v2", "p2_v4", "p2_v3"], viewsObjList: [], resource: { markets: ["getPrize"], marketMod: ["getPrize"] } });
    projectsList["p3"] = new Project({ name: "抽奖模型", index: "p3", viewsList: ["v8", "v4", "v9"], viewsObjList: [], disable: false });
    projectsList["p5"] = new Project({ name: "抢红包模型", index: "p5", viewsList: ["v10", "v11", "v12"], viewsObjList: [] });
    projectsList["p4"] = new Project({ name: "自定义", index: "p4", viewsList: ["v1"], viewsObjList: [], disable: false });

    /*----------------------------------------------------------------聪明的分割线--------------------------------------------------------------*/

    viewsList["v1"] = new View({ name: "空白页", index: "v1" });

    viewsList["p2_v1"] = new View({ name: "返奖-活动介绍页", index: "p2_v1", isNew: false });
    viewsList["p2_v2"] = new View({ name: "返奖-手机号验证", index: "p2_v2", isNew: false });
    viewsList["p2_v3"] = new View({ name: "返奖-信息提示页", index: "p2_v3", isNew: false });
    viewsList["p2_v4"] = new View({ name: "返奖-领奖页", index: "p2_v4", isNew: false });

    viewsList["v4"] = new View({ name: "抽奖页", index: "v4", isNew: false, disable: false });
    viewsList["v5"] = new View({ name: "领券提示页", index: "v5", isNew: false, disable: true });
    viewsList["v6"] = new View({ name: "单页图文页", index: "v6", isNew: false });

    viewsList["v8"] = new View({ name: "抽奖-手机号验证", index: "v8", isNew: false });
    viewsList["v9"] = new View({ name: "信息(异常)提示", index: "v9", isNew: false });
    viewsList["v10"] = new View({ name: "红包发布页", index: "v10", isNew: false });
    viewsList["v11"] = new View({ name: "红包领取页", index: "v11", isNew: false });
    viewsList["v12"] = new View({ name: "手机验证页", index: "v12", isNew: false });
    viewsList["v13"] = new View({ name: "基金文章模板", index: "v13", isNew: false });

    /*----------------------------------------------------------------聪明的分割线--------------------------------------------------------------*/

    var modelMain = {
        doneOption: function (activeOptions, index, defalutValue) {
            for (var i = 0; i < activeOptions.length; i++) {
                if (activeOptions[i].index == index) {
                    activeOptions[i].defalutValue = defalutValue;
                    activeOptions[i].fillValue();
                    return activeOptions[i];
                }
            }
        },
        setDataToOption: function (guid, index, data) {
            var _activeOptions;
            for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            if (index) {
                for (var i = 0; i < _activeOptions.length; i++) {
                    if (_activeOptions[i].index == index) {
                        if (data) {
                            _activeOptions[i].data = data;
                        } else {
                            return _activeOptions[i];
                        }
                    }
                }
            }
            return _activeOptions;
        },
        setStyle: function (dom, css) {
            css.split(";").forEach(function (item) {
                dom.css(item.split(":")[0], item.split(":")[1]);
            });
        }
    }

    models["m0"] = new Model({
        name: "主屏", index: "m0", template: "<div id='phoneView' class='phoneView'></div>", dragCallBack: function () { }, optionsList: ["o13", "o19"], needfulOptions: ["o13", "o19"], setDone: function (o13, o19) {
            var _self = this;
            this.dom.removeClass("bgSize-full").addClass("bgSize-" + o13[1]);
            this.dom.css({ "background-image": (o13[0] == "" ? "none" : "url(" + o13[0] + ")"), "background-color": o13[2] || "" });
            this.dom.attr("style", this.dom.attr("style") + o19[0]);
        },
        jsCode: "",
        //jsCode: "$(\"div[guid=\"+guid+\"]\").attr('ratio', document.body.clientHeight + ',' + document.body.clientWidth);mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0], ratio);",
        javaScriptFrame: ""
    });
    //背景域
    models["m1"] = new Model({
        name: "背景域", index: "m1", isForCode: false, template: "<div class='bgArea center' dragSet='none' zoomSet='x,y'><span zoom='true'></span></div>", dragCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            //modelMain.doneOption(_activeOptions, "o19", [this.dom.attr("style")]);
            //for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == _self.guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            this.dom.enableDrag(function () { }, function (dragType) {
                if (dragType == "move") {
                    var left = parseInt($(this).css("left").split("px")[0]);
                    //console.log(_self.dom.attr("dragSet"));
                    modelMain.doneOption(_activeOptions, "o11", [g.String.ForDight((left / $(_self.container).width()) * 100, 1), "%", (_self.dom.attr("dragSet") == "none") ? true : false]);
                } else {
                    var width = parseInt($(this).css("width").split("px")[0]) + 2;
                    var height = (parseInt($(this).css("height").split("px")[0]) + 2) / 16;
                    modelMain.doneOption(_activeOptions, "o2", [g.String.ForDight((width / $(_self.container).width()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o3", [height, "rem", false]);
                }
                //var height = (parseInt($(this).css("height").split("px")[0]) + 2)/16;
                ////modelMain.doneOption(_activeOptions, "o3", [g.String.ForDight((height / $(_self.container).height()) * 100, 1), "%"]);
                //modelMain.doneOption(_activeOptions, "o3", [height, "rem", false]);
            });

        }, optionsList: ["o1", "o2", "o3", "o11", "o19"], needfulOptions: ["o1", "o11"], setDone: function (o1, o2, o3, o11, o19, callback) {
            var _self = this;
            if (!o1[1]) { _self.dom.addClass("brn"); }
            this.dom.css({ "background-image": (o1[0] == "" ? "none" : "url(" + o1[0] + ")"), "background-color": o1[4] || "", "height": o3[0] || "auto", "width": o2 });
            if (!o11[2]) {
                this.dom.removeClass("center").attr("dragSet", "x").css({ "left": o11[0] + o11[1] });
            } else {
                this.dom.addClass("center").attr("dragSet", "none");
            }
            if (o1[2] == "ls") {
                _self.dom.find("span[zoom]").show();
                _self.dom.addClass("bgSize-" + o1[3]);
                _self.jsCode = "";
            } else if (o1[2] == "sy") {
                //_self.dom.find("span[zoom]").hide();
                _self.dom.addClass("bgSize-full");
                //if (!o1[0]) {
                //    $.dailog({
                //        height: "auto", width: 300, title: "提示",
                //        callback: function () {
                //            this.wrap.empty().append("<div class='tc m-10'>请先添加背景图片地址~<span>")
                //        }
                //    });
                //    return;
                //}

                g.tool.loadImage(o1[0], function (img) {
                    var _ratio = img.width / img.height;
                    _self.dom.css("height", (img.height / img.width) * _self.dom.width());
                    _self.dom.attr("ratio", img.height + "," + img.width);
                    callback();
                });
                _self.jsCode = "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);";
            } else {
                _self.dom.find("span[zoom]").show();
                _self.dom.removeClass("bgSize-*");
            }
            //alert(_self.jsCode);
            if (o1[2] != "sy") {
                if (o3[1]) {
                    _self.dom.attr("ratio", _self.dom.height() + "," + _self.dom.width());
                    _self.jsCode = "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);";
                } else {
                    _self.dom.removeAttr("ratio");
                    _self.jsCode = "";
                }
            }
            modelMain.setStyle(this.dom, o19[0]);
        }
    });
    //可拖动域
    models["m9"] = new Model({
        name: "浮动域", index: "m9", template: "<div class='dragArea center' dragSet='y'><span zoom='true'></span></div>", optionsList: ["o2", "o3", "o4", "o11", "o1", "o19"], needfulOptions: ["o1", "o11"],
        dragCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            //modelMain.doneOption(_activeOptions, "o19", [this.dom.attr("style")]);
            //for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == _self.guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            this.dom.enableDrag(function () { }, function (dragType) {
                if (dragType == "move") {
                    var left = parseInt($(this).css("left").split("px")[0]);
                    var top = parseInt($(this).css("top").split("px")[0]);
                    modelMain.doneOption(_activeOptions, "o4", [g.String.ForDight((top / $(_self.container).height()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o11", [g.String.ForDight((left / $(_self.container).width()) * 100, 1), "%", (_self.dom.attr("dragSet") == "x,y") ? false : true]);
                } else {
                    var width = parseInt($(this).css("width").split("px")[0]) + 2;
                    var height = parseInt($(this).css("height").split("px")[0]) + 2;
                    modelMain.doneOption(_activeOptions, "o2", [g.String.ForDight((width / $(_self.container).width()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o3", [g.String.ForDight((height / $(_self.container).height()) * 100, 1), "%", false]);
                }
            });
        },
        setDone: function (o2, o3, o4, o11, o1, o19, callback) {
            var _self = this;
            if (!o1[1]) { _self.dom.addClass("brn"); }
            this.dom.css({ "background-image": (o1[0] == "" ? "none" : "url(" + o1[0] + ")"), "background-color": o1[4] || "", "height": o3[0] || "auto", "width": o2, "top": o4 });
            if (o1[2] == "ls") {
                _self.dom.addClass("bgSize-" + o1[3]);
                _self.jsCode = "";
            } else if (o1[2] == "sy") {
                _self.dom.addClass("bgSize-full");
                g.tool.loadImage(o1[0], function (img) {
                    //if (img.width < Global_data.screenWidth) { _self.dom.css({ "height": img.height, "width": img.width }); } else { _self.dom.css("height", img.height * (Global_data.screenWidth / img.width)); }
                    //_self.dom.attr("ratio", img.height + "," + img.width);
                    var _ratio = img.width / img.height;
                    _self.dom.css("height", (img.height / img.width) * _self.dom.width());
                    _self.dom.attr("ratio", img.height + "," + img.width);
                    callback();
                });
                _self.jsCode = "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);";
            } else {
                _self.dom.find("span[zoom]").show();
                _self.dom.removeClass("bgSize-*");
            }
            if (o1[2] != "sy") {
                if (o3[1]) {
                    _self.dom.attr("ratio", _self.dom.height() + "," + _self.dom.width());
                    _self.jsCode = "mk_m.initHeight($(\"div[guid=\"+guid+\"]\")[0]);";
                } else {
                    _self.dom.removeAttr("ratio");
                    //$("#ModelCodeEdit textarea").val("");
                    _self.jsCode = "";
                }
            }
            if (o11[2]) {
                this.dom.addClass("center").attr("dragSet", "y");
            } else {
                this.dom.removeClass("center").attr("dragSet", "x,y").css({ "left": o11[0] + o11[1] });
            }
            modelMain.setStyle(this.dom, o19[0]);
        }
    });
    //按钮
    models["m2"] = new Model({
        name: "按钮", index: "m2", isForCode: false, isContainer: false, template: "<div class='buttonWrap' dragSet='x,y'><button class='bgSize-full'>button</button><span zoom='true'></span></div>",
        dragCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            //modelMain.doneOption(_activeOptions, "o19", [_self.dom.find("button").attr("style")||""]);
            //for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == _self.guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            this.dom.enableDrag(function () { }, function (dragType) {
                if (dragType == "move") {
                    var left = parseInt($(this).css("left").split("px")[0]);
                    var top = parseInt($(this).css("top").split("px")[0]);
                    modelMain.doneOption(_activeOptions, "o4", [g.String.ForDight((top / $(_self.container).height()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o11", [g.String.ForDight((left / $(_self.container).width()) * 100, 1), "%", (_self.dom.attr("dragSet") == "x,y") ? false : true]);
                } else {
                    var width = parseInt($(this).css("width").split("px")[0]) + 2;
                    var height = parseInt($(this).css("height").split("px")[0]) + 2;
                    modelMain.doneOption(_activeOptions, "o2", [g.String.ForDight((width / $(_self.container).width()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o3", [g.String.ForDight((height / $(_self.container).height()) * 100, 1), "%", false]);
                }
            });

            modelMain.setDataToOption(_self.guid, "o5", [{ value: "", name: "默认样式" },
                { value: "buttonSkin_1", name: "圆角纯色" },
                { value: "buttonSkin_2", name: "圆角外框" },
                { value: "buttonSkin_3", name: "圆角外投影" },
                { value: "buttonSkin_4", name: "质感" }]);
            var appUrl = "https://m.jdpay.com";
            var dropListData = {};
            dropListData.viewData = [];
            _self.listForValue = "";
            dropListData.listData = _self.listData = [{ value: "app_1", name: "App首页", action: function () { return "function () { _mApp.start('HOME');}" } },
                { value: "app_2", name: "手机充值", action: function () { return "function () {_mApp.start('PHONE_RECHARGE');}" } },
                { value: "app_3", name: "优惠券", action: function () { return "function () {_mApp.start('ACTIVITY', '" + appUrl + "/user/myCouponHome');}" } },
                { value: "app_4", name: "现金红包", action: function () { return "function () {_mApp.start('ACTIVITY', '" + appUrl + "/user/myPackHome');}" } },
                { value: "app_5", name: "实名页", action: function () { return "function () {_mApp.start('REALNAME');}" } },
                { value: "app_6", name: "小金库", action: function () { return "function () {_mApp.start('JRB');}" } },
                { value: "app_7", name: "拍立返", action: function () { return "function () {if (mAppConfig.inAndroid) { _mApp.start('PAILIFAN'); } else { _mApp.start('NJRS'); }}" } },
                { value: "app_8", name: "抢吧", action: function () { return "function () {_mApp.start('ACTIVITY', 'http://qiang.wangyin.com/');}" } },
                { value: "app_9", name: "支付码", action: function () { return "function () {_mApp.start('PAYCODE');}" } },
                { value: "app_10", name: "股神首页", action: function () { return "function () {_mApp.start('STOCK');}" } },
                { value: "app_32", name: "股神-开户页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"STOCK\", params: { \"param\": \"{subName:'stock_openaccount'}\"}}); } else { _mApp.start({name: \"STOCK\", params: {subName:'stock_openaccount'}}); }}" } },
                { value: "app_11", name: "旺财", action: function () { return "function () {_mApp.start('WANGCAI');}" } },
                { value: "app_12", name: "白条", action: function () { return "function () {_mApp.start('BAITIAO');}" } },
                { value: "app_13", name: "信用卡还款", action: function () { return "function () {_mApp.start('CCR');}" } },
                { value: "app_14", name: "扫一扫", action: function () { return "function () {_mApp.start('SCAN');}" } },
                { value: "app_15", name: "注册", action: function () { return "function () {_mApp.start('LOGIN');}" } },
                { value: "app_16", name: "基金(需填写code)", action: function () { return "function () {_mApp.start({name: 'FUND',params:{code:'" + _self.listForValue + "'} ,callback:function(){}});}" } },
                { value: "app_17", name: "彩票", action: function () { return "function () {_mApp.start('LOTTERY');}" } },
                { value: "app_18", name: "众筹", action: function () { return "function () {_mApp.start('ACTIVITY', 'https://m.wangyin.com/user/beforeZC');}" } },
                { value: "app_19", name: "加油卡", action: function () { return "function () {_mApp.start('FUELCARD_FINANCE');}" } },
                { value: "app_20", name: "夺宝吧", action: function () { return "function () {_mApp.start('ACTIVITY','https://static.jdpay.com/m-duobao/');}" } },
                { value: "app_21", name: "京东到家", action: function () { return "function () {var _url = encodeURIComponent('http://pdj.jd.com/html/activity/jdpay/index.html?needPin=yes&code=560e01592aed45909d92986dd297cc06&hideapp'); _mApp.start('ACTIVITY', _url);}" } },
                { value: "app_22", name: "钱包活动链接", action: function () { return "function () {var _url = encodeURIComponent('" + _self.listForValue + "'); _mApp.start('ACTIVITY', _url);}" } },
                { value: "app_23", name: "智能记账", action: function () { return "function () {_mApp.start('TALLY');}" } },
                { value: "app_24", name: "今天首页", action: function () { return "function () {_mApp.start('HOME');}" } },
                 { value: "app_25", name: "积分首页", action: function () { return "function () {_mApp.start('MP');}" } },
                { value: "app_26", name: "积分-赚积分页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"MP\", params: { \"param\": \"{subName:'EARN'}\"}}); } else { _mApp.start({name: \"MP\", params: {subName:'EARN'}}); }}" } },
                { value: "app_27", name: "积分-积分签到页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"MP\", params: { \"param\": \"{subName:'SIGN'}\"}}); } else { _mApp.start({name: \"MP\", params: {subName:'SIGN'}}); }}" } },
                { value: "app_28", name: "积分-钱力值页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"MP\", params: { \"param\": \"{subName:'TALENT'}\"}}); } else { _mApp.start({name: \"MP\", params: {subName:'TALENT'}}); }}" } },
                { value: "app_29", name: "积分-积分兑换页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"MP\", params: { \"param\": \"{subName:'EXCHANGE'}\"}}); } else { _mApp.start({name: \"MP\", params: {subName:'EXCHANGE'}}); }}" } },
                { value: "app_30", name: "积分-我的勋章页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"MP\", params: { \"param\": \"{subName:'LEVEL'}\"}}); } else { _mApp.start({name: \"MP\", params: {subName:'LEVEL'}}); }}" } },
                { value: "app_31", name: "积分-摇奖机活动页", action: function () { return "function () {if (mAppConfig.inAndroid && mAppConfig.inWx) { _mApp.start({name: \"MP\", params: { \"param\": \"{subName:'LOTTERY'}\"}}); } else { _mApp.start({name: \"MP\", params: {subName:'LOTTERY'}}); }}" } }];

            if (pageData["activeProject"].isMultiPage) {
                pageData["activeProject"].viewsList.forEach(function (item) {
                    dropListData.viewData.push({ value: item, name: viewsList[item].name });
                });
            }
            modelMain.setDataToOption(_self.guid, "o6", dropListData);

        },
        refreshCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            modelMain.doneOption(_activeOptions, "o18", "").dom.find("input"); 
            modelMain.doneOption(_activeOptions, "o11", ["0", "%", _self.dom.attr("dragSet") == "x,y" ? false : true]);
            if (!pageData["activeProject"].isMultiPage) {
                $("#selectViewList").remove();
            }
        },
        optionsList: ["o2", "o3", "o4", "o11", "o5", "o6", "o18", "o19"], needfulOptions: ["o6", "o5", "o11", "o18"], setDone: function (o2, o3, o4, o11, o5, o6, o18, o19) {
            //this.dom.find("button").css({ "width": o2 || "auto", "height": o4 || "auto" });
            //for (var i = 0; i < parseInt(o5 || 1) ; i++) {}
            var _self = this;
            this.dom.css({ "top": o4 || "0", }).css({ "height": o3[0] || "auto" }).css({ "width": o2 || "auto" });
            if (o6[0]) {
                //透明transparent
                this.dom.find("button").css({ "background-image": "none", "background-color": "transparent" }).html("").addClass("transparent");
                this.dom.find("button").attr("class", "bgSize-full");
            } else {
                //不透明
                if (o6[1]) this.dom.find("button").css({ "background-image": o6[1] == "" ? "none" : "url(" + o6[1] + ")" });
                this.dom.find("button").css({ "background-color": o6[2], "font-size": o6[5] + "rem", "color": o6[6], "border-radius": o6[3] + "rem" }).html(o6[4]);
                this.dom.find("button").attr("class", "bgSize-full").addClass(o5);
            }
            if (o11[2]) {
                this.dom.addClass("center").attr("dragSet", "y");
            } else {
                this.dom.removeClass("center").attr("dragSet", "x,y").css({ "left": o11[0] + o11[1] });
            }

            var code;
            //处理事件
            o6[8] = g.String.Trim(o6[8]);
            switch (o6[7]) {
                case "url":
                    code = "function () { location.href = '" + o6[8] + "'; }";
                    break;
                case "query":
                    code = "function () {" + o6[8] + " }";
                    break;
                case "none":
                    code = "function () {}";
                    break;
                case "back"://返回
                    code = "function () { history.back(); }";
                    break;
                default:
                    if (o6[7].indexOf("app") != -1) {
                        _self.listData.forEach(function (item) {
                            if (item.value == o6[7]) {
                                _self.listForValue = o6[8]
                                code = item.action();
                            }
                        });
                    } else {
                        code = "function () { page_" + o6[7] + ".show(); }";
                    }
                    break;
            }
            if (o6[7] == "none") {
                this.jsCode = "";
            } else {
                this.jsCode = "$(\"div[guid=\"+guid+\"]\").find('button').click(" + code + ");";
            }
            if (o18) {
                if (window.hasOwnProperty("value_mdt1")) {
                    this.dom.find("button").attr("clstag", "jr|keycount|" + value_mdt1 + "|" + o18);
                } else {
                    $.dailog({
                        height: "auto", width: 300, title: "提示",
                        callback: function () {
                            this.wrap.empty().append("<div class='tc m-10'>请先拖入“埋点支持组件”，若已拖入请应用“埋点支持组件”的配置~<span>");
                        }
                    });
                }
            } else {
                this.dom.find("button").removeAttr("clstag");
            }
            modelMain.setStyle(this.dom.find("button"), o19[0]);
        }
    });
    //文本域
    models["m3"] = new Model({
        name: "文本域", index: "m3", isContainer: false, optionsList: ["o4", "o10", "o19"], needfulOptions: ["o10"], template: "<div class='textAreaWrap' dragSet='y'><span role='text'>示例文字</span></div>", setDone: function (o4, o10, o19) {
            this.dom.css({ "top": o4 || "0", }).removeClass("tl").removeClass("tc").removeClass("tr").addClass(o10[3]);
            var _text = this.dom.find("span[role='text']");
            _text.css({ "font-size": ((o10[1] || 1) + "rem"), "color": o10[2], "line-height": ((o10[4] || 1) + "rem") }).html(o10[0]).removeClass("fsi").removeClass("fwb").removeClass("tdu");
            if (o10[5]) _text.addClass("fwb");
            if (o10[6]) _text.addClass("fsi");
            if (o10[7]) _text.addClass("tdu");
            //if (o10[8]) _text.addClass("tdo");
            modelMain.setStyle(this.dom, o19[0]);
        }, dragCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            //for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == _self.guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            this.dom.enableDrag(function () { }, function () {
                var top = parseInt($(this).css("top").split("px")[0]);
                modelMain.doneOption(_activeOptions, "o4", [g.String.ForDight((top / $(_self.container).height()) * 100, 1), "%"]);
                //modelMain.doneOption(_activeOptions, "o19", [this.dom.attr("style")]);
            });
        }
    });
    //输入域
    models["m4"] = new Model({
        name: "输入域", isForCode: false, isContainer: false, template: "<div class=\"textInputWrap\" dragSet='x,y'><span zoom='true'></span><input type='text' placeholder='请在此输入' /></div>", index: "m4",
        optionsList: ["o2", "o3", "o4", "o11", "o5", "o14", "o19"], needfulOptions: ["o5", "o14"],
        dragCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            //modelMain.doneOption(_activeOptions, "o19", [this.dom.find("input").attr("style")]);
            //for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == _self.guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            this.dom.enableDrag(function () { }, function (dragType) {
                if (dragType == "move") {
                    var left = parseInt($(this).css("left").split("px")[0]);
                    var top = parseInt($(this).css("top").split("px")[0]);
                    modelMain.doneOption(_activeOptions, "o4", [g.String.ForDight((top / $(_self.container).height()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o11", [g.String.ForDight((left / $(_self.container).width()) * 100, 1), "%", (_self.dom.attr("dragSet") == "x,y") ? false : true]);
                } else {
                    var width = parseInt($(this).css("width").split("px")[0]) + 2;
                    var height = parseInt($(this).css("height").split("px")[0]) + 2;
                    modelMain.doneOption(_activeOptions, "o2", [g.String.ForDight((width / $(_self.container).width()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o3", [g.String.ForDight((height / $(_self.container).height()) * 100, 1), "%", false]);
                }
            });
            modelMain.setDataToOption(_self.guid, "o5", [{ value: "", name: "默认样式" }, { value: "textInput_1", name: "圆角内投影" }, { value: "textInput_2", name: "圆角外投影" }, { value: "textInput_3", name: "亮框透明发光" }]);
        },
        refreshCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            modelMain.doneOption(_activeOptions, "o11", ["0", "%", false]);
        },
        setDone: function (o2, o3, o4, o11, o5, o14, o19) {
            this.dom.css({ "width": o2, "height": o3[0], "top": o4 });
            this.dom.attr("class", "").addClass("textInputWrap").addClass(o5);
            if (o11[2]) {
                this.dom.addClass("center").attr("dragSet", "y");
            } else {
                this.dom.removeClass("center").attr("dragSet", "x,y").css({ "left": o11[0] + o11[1] });
            }
            var _input = this.dom.find("input");
            if (o14[0]) _input.css("border-color", o14[0]);
            if (o14[1]) _input.css("background-color", o14[1]);
            if (o14[2]) _input.css("border-radius", o14[2] + "rem");
            if (o14[3]) _input.css("font-size", o14[3] + "rem");
            if (o14[4]) _input.attr("placeholder", o14[4]);
            if (o14[5]) _input.attr("maxlength", o14[5]);
            var validateStr, weakStr = "";
            switch (o14[6]) {
                case "0": validateStr = ""; weakStr = ""; break;
                case "1": validateStr = /\S/; weakStr = "字段不能为空"; break;
                case "2": validateStr = /^[1][3,5,7,8][0-9]{9}$/; weakStr = "请输入正确的手机号码"; break;
                case "3": validateStr = /^[0-9]+.?[0-9]*$/; weakStr = "请输入正确的验证码"; break;
                case "4": validateStr = /[1-9]\d*.\d*|0.\d*[1-9]\d*/; weakStr = "请输入正确的金额数字"; break;
                case "5": validateStr = /\d{17}[\d|x]|\d{15}/; weakStr = "请输入正确的身份证号"; break;
                case "6": validateStr = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/; weakStr = "请输入正确的Email地址"; break;
            }
            if (o14[6] != "0") {
                this.jsCode = "mk_m.addValidate($(\"div[guid=\"+guid+\"]\").find('input'), guid, " + validateStr + ", \"" + weakStr + "\");";
            } else {
                this.jsCode = "";
            }
            modelMain.setStyle(this.dom.find("input"), o19[0]);
        }
    });
    //活动细则
    models["m5"] = new Model({
        //name: "活动细则", isContainer: false, isForCode: false, template: { templateName: 'activityRole', data: function () { return { text: "细则" }; } }, index: "m5",
        name: "活动细则", isContainer: false, isForCode: false, template: "<div class=\"activityRole\" dragSet='x,y'><span zoom='true'></span><a href=\"javascript:;\">活动细则</a></div>", index: "m5",
        optionsList: ["o12", "o2", "o3", "o4", "o11", "o1", "o10"], needfulOptions: ["o10", "o12"], dragCallBack: function () {
            if ($("#hd_roleText").size() == 0) {
                $("#phoneView").append("<div class='hide' id='hd_roleText'></div>");
            }
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            //for (var i = 0; i < pageData["acrtiveMods"].length; i++) { if (pageData["acrtiveMods"][i].model.guid == _self.guid) _activeOptions = pageData["acrtiveMods"][i].optionsList; }
            this.dom.enableDrag(function () { }, function (dragType) {
                if (dragType == "move") {
                    var left = parseInt($(this).css("left").split("px")[0]);
                    var top = parseInt($(this).css("top").split("px")[0]);
                    modelMain.doneOption(_activeOptions, "o4", [g.String.ForDight((top / $(_self.container).height()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o11", [g.String.ForDight((left / $(_self.container).width()) * 100, 1), "%", (_self.dom.attr("dragSet") == "x,y") ? false : true]);
                } else {
                    var width = parseInt($(this).css("width").split("px")[0]) + 2;
                    var height = parseInt($(this).css("height").split("px")[0]) + 2;
                    modelMain.doneOption(_activeOptions, "o2", [g.String.ForDight((width / $(_self.container).width()) * 100, 1), "%"]);
                    modelMain.doneOption(_activeOptions, "o3", [g.String.ForDight((height / $(_self.container).height()) * 100, 1), "%", false]);
                }
            });

        },
        refreshCallBack: function () {
            var _self = this;
            var _activeOptions = modelMain.setDataToOption(_self.guid);
            modelMain.setDataToOption(_self.guid, "o5", [{ value: "footer-banner", name: "默认样式" }, { value: "footer-banner2", name: "样式2" }]);
            modelMain.doneOption(_activeOptions, "o11", ["0", "%", _self.dom.attr("dragSet") == "x,y" ? false : true]);
            modelMain.doneOption(_activeOptions, "o10", ['活动细则', '1', '', '', '2.5', false, false, false, false]);
        }
        , setDone(o12, o2, o3, o4, o11, o1, o10) {
            var _self = this;
            if (!o1[1]) { _self.dom.addClass("brn"); }
            if (o1[2] == "ls") {
                _self.dom.addClass("bgSize-" + o1[3]);
            } else if (o1[2] == "sy") {
                _self.dom.addClass("bgSize-full");
                g.tool.loadImage(o1[0], function (img) {
                    //if (img.width < Global_data.screenWidth) { _self.dom.css({ "height": img.height, "width": img.width }); } else { _self.dom.css("height", img.height * (Global_data.screenWidth / img.width)); }
                    var _ratio = img.width / img.height;
                    _self.dom.css("height", (img.height / img.width) * _self.dom.width());
                    _self.dom.attr("ratio", img.height + "," + img.width);
                })
            } else {
                _self.dom.find("span[zoom]").show();
                _self.dom.removeClass("bgSize-*");
            }
            this.dom.css({ "background-image": (o1[0] == "" ? "none" : "url(" + o1[0] + ")"), "background-color": o1[4] || "", "height": o3[0] || "auto" });
            if (o1[0] == "") { this.dom.find("a").show(); } else { this.dom.find("a").hide(); }
            this.dom.css({ "width": o2, "height": o3[0], "top": o4 });
            if (o11[2]) {
                this.dom.addClass("center").attr("dragSet", "y");
            } else {
                this.dom.removeClass("center").attr("dragSet", "x,y").css({ "left": o11[0] + o11[1] });
            }

            this.dom.css({ "line-height": ((o10[4] || 1) + "rem") });
            var _text = this.dom.find("a");
            _text.css({ "font-size": ((o10[1] || 1) + "rem"), "color": o10[2] }).html(o10[0]).removeClass("fsi").removeClass("fwb").removeClass("tdu");
            if (o10[5]) _text.addClass("fwb");
            if (o10[6]) _text.addClass("fsi");
            if (o10[7]) _text.addClass("tdu");
            //_self.jsCode = "$(\"div[guid='" + this.dom.attr("guid") + "']\").click(function(){ mk_m.openActivityRole(); });";
            if (o12[1]) {
                if ($("#hd_roleText" + _self.guid).size() == 0) {
                    $("#phoneView").append("<div class='hide' id='hd_roleText" + _self.guid + "'></div>");
                }
                $("#hd_roleText" + _self.guid).html(o12[0]);
            } else {
                if ($("#hd_roleText" + _self.guid).size() != 0) { $("#hd_roleText" + _self.guid).remove() }
                if (!(o12[0] == undefined || o12[0] == "<br>")) $("#hd_roleText").html(o12[0]);
            }
        }, jsCode: "$(\"div[guid=\"+guid+\"]\").click(function(){ mk_m.openActivityRole(guid); });"
    });
    //footer baaner 
    models["m6"] = new Model({
        name: "底部banner", index: "m6", optionsList: ["o18", "o22"], needfulOptions: ["o18", "o22"], template: "",
        dragCallBack: function () { },
        refreshCallBack: function () {
            var _activeOptions = modelMain.setDataToOption(this.guid);
            modelMain.doneOption(_activeOptions, "o18", "").dom.find("input");
        },
        setDone: function (o18, o22) {
            this.jsCode = "";
            if (o22[0]) {
                this.javaScriptFrame = "<script>var _mApp = mApp({config:{url:'https://qianbao.jd.com/p/page/download.htm?reffer=" + o22 + "&channel=reffer'}});</script>";
            } else {
                this.javaScriptFrame = "";
            }
            if (o18) {
                var isHasMaidian = false;
                //pageData["acrtiveMods"].forEach(function (item) { if (item.model.index == "m10") isHasMaidian = true; });
                if (window.hasOwnProperty("value_mdt1")) {
                    var value_md = "$('#J_confirm').attr('clstag', 'jr|keycount|" + value_mdt1 + "|" + o18 + "');";
                    this.jsCode = "_mApp.jdWalletReady(function (clientInfo) {if (!clientInfo.isInApp) { _mApp.config().bottomBar({ touchFunc: true, style: 'style2' });$('.phoneView').css('padding-bottom', 92); " + value_md + " }});";
                } else {
                    $.dailog({
                        height: "auto", width: 300, title: "提示",
                        callback: function () {
                            this.wrap.empty().append("<div class='tc m-10'>请先拖入“埋点支持组件”，若已拖入请应用“埋点支持组件”的配置~<span>");
                        }
                    });
                }
            } else {
                this.jsCode = "_mApp.jdWalletReady(function (clientInfo) {if (!clientInfo.isInApp) { _mApp.config().bottomBar({ touchFunc: true, style: 'style2' });$('.phoneView').css('padding-bottom', 92);}});";
            }

        }
        //goCode: function () {
        //    this.dom.css("bottom", "0");
        //}
    });

    //自定义区域
    models["m7"] = new Model({
        name: "自定义区域", index: "m7", optionsList: ["o15"], needfulOptions: ["o15"], template: "<div class='customeAreaDemo'></div>", setDone: function (o15) {
            this.dom.html($(o15[0]).html());
            this.dom.attr("style", $(o15[0]).attr("style"));
            this.dom[0].innerHTML = this.dom[0].innerHTML.replace(/&nbsp;/g, '');

            //var _dom = document.createElement("div");
            //_dom.innerHTML = g.String.zyEnChart(o15[0]);
            //var style = $(_dom).children().eq(0).attr("style");
            //delete _dom;
            //var con = $(g.String.zyEnChart(o15[0]));
            //this.dom[0].className = con[0].hasOwnProperty("className") || "";
            //this.dom.attr("style", style);
            //var _t = con.html().replace(/&nbsp;/g, '');
            //this.dom.html(_t);
        }
    });
    //钱包/分享支持
    models["m8"] = new Model({
        name: "钱包/分享支持", index: "m8", optionsList: ["o7", "o8", "o9", "o16", "o21"], needfulOptions: ["o7", "o8", "o9", "o16", "o21"], setDone: function (o7, o8, o9, o16, o21) {
            var _self = this;
            _self.valueForBackToJs = { title: o7[0], content: o8[0], url: o9[0] || "self", appTitle: o16[0], shareImg: o21[0] };//valueForBackToJs可以将
            //var mainUrl = g.tool.getRootPath() + init.webData.RootPath;
            //$.fn.getContent("", mainUrl + "Common/share.js", {}, function (code) {
            //    _self.jsCode = code + "shareInit(data.title,data.content,data.url,data.appTitle);";
            //});
            //_self.jsCode = "\r\n if(data.url=='self'){data.url=location.href;};\r\n shareInit(data.title,data.content,data.url,data.appTitle,data.shareImg);";
            _self.jsCode = "\r\n shareInit('" + o7[0] + "','" + o8[0] + "'," + (o9[0] == "" ? "location.href" : "'" + o9[0] + "'") + ",'" + o16[0] + "','" + o21[0] + "');";
        },
        //jsCode: "shareInit(data.title,data.content,data.url,data.appTitle);",//data为valueForBackToJs带给自定义脚本的数据
        //javaScriptFrame: "<script src='http://static.jdpay.com/activity/item/MarketingFramework/share.js' ></script>",
        goCode: function (cssCode, jsCode, htmlCode) {

        }, isForCode: false
    });
    //埋点
    models["m10"] = new Model({
        name: "埋点支持", index: "m10", optionsList: ["o17", "o18"], needfulOptions: ["o17", "o18"],
        dragCallBack: function () {
            modelMain.setDataToOption(this.guid, "o17", [
                { value: "1", name: "营销cms系统" },
                { value: "0", name: "jshop" }
            ]);
        }
        , setDone: function (o17, o18) {
            var _self = this;
            window.value_mdt1 = o18;
            //_self.jsCode = "$(function () {window.setTimeout(function () {$('a,button').each(function (i, item) {if (!($(item).attr('clstag') == '' || $(item).attr('clstag')==undefined)) {$(item).attr('clstag', '" + o18 + "'); }});}, 500);});";
            var jshopCode = 'var jaq=jaq||[];jaq.push(["account","UA-J2011-12"]);jaq.push(["domain","jr.jd.com"]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src="https://jrclick.jd.com/wl.dev.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();';
            if (o17 == "0") {
                _self.javaScriptFrame = '<script type="text/javascript">' + jshopCode + '</script>';
            } else {
                _self.javaScriptFrame = '<script type="text/javascript">jQuery = $;' + jshopCode + '</script><script type="text/javascript">var jaq=jaq||[];jaq.push(["account","UA-J2011-12"]);jaq.push(["domain","jr.jd.com"]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src="https://cscssl.jd.com/joya.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();</script>';
            }
        },
        remove: function () {
            delete value_mdt1;
        }
    });
    //server请求
    models["m11"] = new Model({
        name: "server请求", index: "m11", optionsList: ["o20"], needfulOptions: ["o20"], isForCode: false,
        dragCallBack: function () { }, refreshCallBack: function () {
            var _activeOptions = modelMain.setDataToOption(this.guid);
            modelMain.doneOption(_activeOptions, "o20", ["", "{}", "data", "Model", ""]);
        },
        setDone: function (o20) {
            var _self = this;
            var url = o20[0];
            if ($("#templ_" + _self.guid).size() != 0) {
                $("#templ_" + _self.guid).html(o20[4]);
            } else {
                $("#phoneView").append("<script class='hide' id='templ_" + _self.guid + "' type='text/template'>" + o20[4] + "</script>");
            }
            //_self.jsCode = "Requester['" + _self.guid + "'] = RequestFactory({ url: '" + o20[0] + "', param: " + o20[1] + ", dataStruct: '" + o20[2] + "', modelName: '" + o20[3] + "', htmlTemp: $('#templ_" + _self.guid + "').html() });requester_" + _self.guid + ".request();";
            _self.jsCode = "Requester['" + _self.guid + "'] = RequestFactory({ url: '" + o20[0] + "', param: " + o20[1] + ", dataStruct: '" + o20[2] + "', modelName: '" + o20[3] + "', htmlTemp: $('#templ_" + _self.guid + "').html() });";
        },
        remove: function () {
            delete $("#templ_" + this.guid).remove();
        }
    });

    /*----------------------------------------------------------------聪明的分割线--------------------------------------------------------------*/

    //背景配置
    options["o1"] = new Option({
        name: "背景配置", index: "o1", inputType: "textAndCheckboxForBg", description: "若勾选“容器适应图片比例”，容器将会在原始宽度的基础上按照背景图比例自动调整自身高度", getValue: function () {
            //this.defalutValue = [this.dom.find("input[role='bgImg']").val(), this.dom.find("input[type='checkbox']")[0].checked, this.dom.find("input[role='color']").val()]

            this.defalutValue = [this.dom.find("input[role='bgImg']").val(), this.dom.find("input[type='checkbox']")[0].checked, this.dom.find("input[name='repeatType']:checked").val(), this.dom.find("select").val(), this.dom.find("input[role='color']").val()]
            return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input[role='bgImg']").val(_self.defalutValue[0]);
            this.dom.find("input[type='checkbox']")[0].checked = (_self.defalutValue[1] == undefined ? false : _self.defalutValue[1]);
            this.dom.find("input[type='radio'][name='repeatType'][value='" + _self.defalutValue[2] + "']").attr("checked", "checked");
            this.dom.find("select").val(_self.defalutValue[3]);
            this.dom.find("input[role='color']").val(_self.defalutValue[4]);
            if (_self.defalutValue[2] == "sy") { _self.dom.find("select").parent().parent().hide(); }
            this.dom.delegate("input[name='repeatType']", "click", function () {
                if (this.value == "ls") {
                    _self.dom.find("select").parent().parent().show();
                } else {
                    _self.dom.find("select").parent().parent().hide();
                }
            });
        }
    });
    //控件宽度
    options["o2"] = new Option({
        name: "控件宽度", index: "o2", inputType: "textAndSelect", description: "控件宽度(单位'%/rem/px')，不配置请留空", getValue: function () {
            this.defalutValue = [this.dom.find("input[type='text']").val(), this.dom.find("select").val()];
            return this.dom.find("input[type='text']").val() + this.dom.find("select").val();
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input[type='text']").val(_self.defalutValue[0]);
            this.dom.find("select").val(_self.defalutValue[1]);
        }
    });
    //控件高度
    options["o3"] = new Option({
        name: "控件高度", index: "o3", inputType: "setForHeight", description: "控件高度(单位'%/rem/px')，不配置请留空", getValue: function () {
            this.defalutValue = [this.dom.find("input[type='text']").val(), this.dom.find("select").val(), this.dom.find("input[type='checkbox']")[0].checked];

            return [this.dom.find("input[type='text']").val() + this.dom.find("select").val(), this.dom.find("input[type='checkbox']")[0].checked];
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input[type='text']").val(_self.defalutValue[0]);
            this.dom.find("select").val(_self.defalutValue[1]);
            this.dom.find("input[type='checkbox']")[0].checked = (_self.defalutValue[2] == undefined ? false : _self.defalutValue[2]);
        }
    });
    //相对纵坐标
    options["o4"] = new Option({
        name: "相对纵坐标", index: "o4", inputType: "textAndSelect", description: "相对所在容器的纵坐标/高度(单位'%/rem/px')，不配置即为默认值0", getValue: function () {
            this.defalutValue = [this.dom.find("input[type='text']").val(), this.dom.find("select").val()];
            return this.dom.find("input[type='text']").val() + this.dom.find("select").val();
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input[type='text']").val(_self.defalutValue[0]);
            this.dom.find("select").val(_self.defalutValue[1]);
        }
    });
    //组件皮肤
    options["o5"] = new Option({
        name: "组件皮肤选择", index: "o5", inputType: "select", description: "对组件的可视皮肤进行选择配置", getValue: function () {
            this.defalutValue = this.dom.find("select").val();
            return this.defalutValue;
        },
        fillValue: function () {
            this.dom.find("select").val(this.defalutValue);
        }
    });
    //按钮表现
    options["o6"] = new Option({
        name: "按钮表现", index: "o6", inputType: "setForButton", description: "按钮控件表现配置", getValue: function () {
            //alert(this.dom.find("input[role='fontColor']").attr("value"));
            this.defalutValue = [this.dom.find("input[type='checkbox']")[0].checked,
                this.dom.find("input[role='bgImg']").val(),
                this.dom.find("input[role='color']").val(),
                this.dom.find("input[role='radius']").val(),
                this.dom.find("input[role='text']").val(),
                this.dom.find("input[role='fontSize']").val(),
                this.dom.find("input[role='fontColor']").val(),
                this.dom.find("select").val(),
                this.dom.find("textarea").val()];
            return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            this.dom.delegate("input[type='checkbox']", "click", function () { _self.dom.find("input[type='text']").attr("disabled", this.checked); });
            this.dom.find("input[type='checkbox']").trigger("click");
            this.dom.find("input[type='checkbox']")[0].checked = (_self.defalutValue[0] == undefined ? false : _self.defalutValue[0]);
            this.dom.find("input[role='bgImg']").val(_self.defalutValue[1]);
            this.dom.find("input[role='color']").val(_self.defalutValue[2]);
            this.dom.find("input[role='radius']").val(_self.defalutValue[3]);
            this.dom.find("input[role='text']").val(_self.defalutValue[4]);
            this.dom.find("input[role='fontSize']").val(_self.defalutValue[5]);
            this.dom.find("input[role='fontColor']").val(_self.defalutValue[6]);
            this.dom.find("select").val(_self.defalutValue[7]);
            this.dom.find("textarea").html(_self.defalutValue[8]);
        }, defalutValue: ['', '', '', '', 'button', '1.5', '', '', '']
    });
    //分享标题
    options["o7"] = new Option({
        name: "分享标题", index: "o7", inputType: "text", description: "设置分享到“朋友圈/好友”的标题", getValue: function () { this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue; },
        fillValue: function () { var _self = this; this.dom.find("input").val(_self.defalutValue[0]); }
    });
    //分享内容
    options["o8"] = new Option({
        name: "分享内容", index: "o8", inputType: "text", description: "设置分享到“好友”的内容。注：分享到微信朋友圈不支持内容呈现", getValue: function () { this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue; },
        fillValue: function () { var _self = this; this.dom.find("input").val(_self.defalutValue[0]); }
    });
    //分享链接
    options["o9"] = new Option({
        name: "分享链接", index: "o9", inputType: "text", description: "Jshop的发布链接，示例：http://sale.jd.com/app/act/TznNujCt2KFDx.html", getValue: function () { this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue; },
        fillValue: function () { var _self = this; this.dom.find("input").val(_self.defalutValue[0]).attr("placeholder", "留空将配置为分享本页链接"); }
    });
    //文案配置
    options["o10"] = new Option({
        name: "文本配置", index: "o10", inputType: "setForFont", description: "配置文本域", getValue: function () {
            this.defalutValue = [this.dom.find("textarea").val(),
                this.dom.find("input[role='fontSize']").val(),
                this.dom.find("input[role='fontColor']").val(),
                this.dom.find("select").val(),
                this.dom.find("input[role='lineHeight']").val(),
                this.dom.find("input[type='checkbox']").eq(0)[0].checked,
                this.dom.find("input[type='checkbox']").eq(1)[0].checked,
                this.dom.find("input[type='checkbox']").eq(2)[0].checked];
            return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("textarea").val(_self.defalutValue[0]);
            this.dom.find("input[role='fontSize']").val(_self.defalutValue[1]);
            this.dom.find("input[role='fontColor']").val(_self.defalutValue[2]);
            this.dom.find("select").val(_self.defalutValue[3]);
            this.dom.find("input[role='lineHeight']").val(_self.defalutValue[4]);
            this.dom.find("input[type='checkbox']").eq(0)[0].checked = (_self.defalutValue[5] == undefined ? true : _self.defalutValue[5]);
            this.dom.find("input[type='checkbox']").eq(1)[0].checked = (_self.defalutValue[6] == undefined ? true : _self.defalutValue[6]);
            this.dom.find("input[type='checkbox']").eq(2)[0].checked = (_self.defalutValue[7] == undefined ? true : _self.defalutValue[7]);
            //this.dom.find("input[type='checkbox']").eq(3)[0].checked = (_self.defalutValue[8] == undefined ? true : _self.defalutValue[8]);
            //g.tool.loadFile.loadJsAndRun(init.webData.RootPath + "Frame/nicEdit-latest.js?v=" + init.webData.versionCode, function () {
            //    new nicEditor({ iconsPath: 'Style/images/nicEditIcons.gif' }).panelInstance('txtContent');
            //    this.dom.find("textarea").html(_self.defalutValue[0]);
            //});
        }, defalutValue: ['示例文字', '1', '', '', '1', false, false, false, false]
    });
    //相对横坐标
    options["o11"] = new Option({
        name: "相对横坐标", index: "o11", inputType: "textAndSelectAndCheckbox", description: "相对所在容器的横坐标(单位'%/rem/px')，不配置即为默认值0", getValue: function () {
            this.defalutValue = [this.dom.find("input[type='text']").val(), this.dom.find("select").val(), this.dom.find("input[type='checkbox']")[0].checked];
            return [this.dom.find("input[type='text']").val(), this.dom.find("select").val(), this.dom.find("input[type='checkbox']")[0].checked];
        },
        fillValue: function () {
            var _self = this;
            this.dom.delegate("input[type='checkbox']", "click", function () { _self.dom.find("input[type='text'],select").attr("disabled", this.checked); });
            //this.dom.find("input[type='checkbox']").trigger();
            //var oldBool = this.dom.find("input[type='checkbox']")[0].checked;
            this.dom.find("input[type='checkbox']")[0].checked = (_self.defalutValue[2] == undefined ? true : _self.defalutValue[2]);
            this.dom.find("input[type='text']").val(_self.defalutValue[0]).attr("disabled", _self.defalutValue[2]);
            this.dom.find("select").val(_self.defalutValue[1]).attr("disabled", _self.defalutValue[2]);
        }
    });
    //活动规则文案
    options["o12"] = new Option({
        name: "活动规则文案", index: "o12", inputType: "textEdit", description: "配置活动规则的文案，若一个项目中已经有视图配置了活动细则文案，其他的控件将共用，无须再另行配置", getValue: function () {
            //window.roleTextHtml = ($(".nicEdit-main").html());
            this.defalutValue = [$(".nicEdit-main").html(), this.dom.find("input[type='checkbox']")[0].checked];
            //this.defalutValue = $(".nicEdit-main").html();
            return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            var _html = _self.defalutValue[0];
            this.dom.find("input[type='checkbox']")[0].checked = (_self.defalutValue[1] == undefined ? true : _self.defalutValue[1]);
            g.tool.loadFile.loadJsAndRun(mainUrl + "Frame/nicEdit-latest.js?v=" + init.webData.versionCode, function () {
                new nicEditor({ iconsPath: mainUrl + 'Style/images/nicEditIcons.gif' }).panelInstance('roleTxtContent');
                _self.defalutValue[0] = _html;
                $(".nicEdit-main").html(_html);
            });
        }
    });
    //底屏
    options["o13"] = new Option({
        name: "主屏配置", index: "o13", inputType: "mainBg", description: "配置最底层主屏，为满铺状态，主要针对背景图片或者背景色进行配置", getValue: function () {
            //window.roleTextHtml = ($(".nicEdit-main").html());
            this.defalutValue = [this.dom.find("input[role='bgImg']").val(), this.dom.find("select").val(), this.dom.find("input[role='color']").val()];
            return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input[role='bgImg']").val(_self.defalutValue[0]);
            this.dom.find("select").val(_self.defalutValue[1]);
            this.dom.find("input[role='color']").val(_self.defalutValue[2]);
        }
    });
    //输入域
    options["o14"] = new Option({
        name: "输入框配置", index: "o14", inputType: "setForTextInput", description: "若进行配置可能会影响到所选择的相应皮肤样式", getValue: function () {
            //window.roleTextHtml = ($(".nicEdit-main").html());
            this.defalutValue = [this.dom.find("input[role='bdColor']").val(), this.dom.find("input[role='bgColor']").val(), this.dom.find("input[role='radius']").val(), this.dom.find("input[role='fontSize']").val(),
                this.dom.find("input[role='placeholder']").val(), this.dom.find("input[role='maxLength']").val(), this.dom.find("select").val()];
            return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input[role='bdColor']").val(_self.defalutValue[0]);
            this.dom.find("input[role='bgColor']").val(_self.defalutValue[1]);
            this.dom.find("input[role='radius']").val(_self.defalutValue[2]);
            this.dom.find("input[role='fontSize']").val(_self.defalutValue[3]);
            this.dom.find("input[role='placeholder']").val(_self.defalutValue[4]);
            this.dom.find("input[role='maxLength']").val(_self.defalutValue[5])
            this.dom.find("select").val(_self.defalutValue[6])
        },
        defalutValue: ["", "", "", 1, "请在此输入", "30", 0]
    });
    //自定义内容
    options["o15"] = new Option({
        name: "html源码", index: "o15", inputType: "htmlText", description: "自定义的html源码，将会直接作用于控件的源码，请务必保留一个根块级DIV标签", getValue: function () {
            //this.defalutValue = [this.dom.find("textarea").val()];
            this.defalutValue = [this.dom.find(".editHtmlArea")[0].innerText];
            return this.defalutValue;
        },
        defalutValue: [""],
        fillValue: function () {
            try {
                if (g.String.Trim(this.defalutValue[0]) == "") {
                    this.dom.find(".editHtmlArea").html(g.String.zyDeChart("<div class='customeAreaDemo'></div>"));
                } else {
                    this.dom.find(".editHtmlArea").html(g.String.zyDeChart(this.defalutValue[0]));
                }
            } catch (e) {

                alert(4);
            }

            //var _self = this;
            //if (_self.defalutValue == "") {
            //    this.dom.find("textarea").val("<div class='customeAreaDemo'></div>");
            //} else {
            //    this.dom.find("textarea").val(_self.defalutValue);
            //}
        }
    });
    //分享链接
    options["o16"] = new Option({
        name: "钱包标题", index: "o16", inputType: "text", description: "在钱包中运行时的标题", getValue: function () { this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue; },
        fillValue: function () {
            var _self = this; this.dom.find("input").val(_self.defalutValue[0]);
        }
    });
    //是否支持jshop
    options["o17"] = new Option({
        name: "埋点环境", index: "o17", inputType: "select", description: "埋点环境选择：若生成的代码将用于jshop，请选择jshop，反之则选其他", getValue: function () {
            this.defalutValue = this.dom.find("select").val();
            return this.defalutValue;
        },
        fillValue: function () {
            this.dom.find("select").val(this.defalutValue);
        }
    });
    //埋点值
    options["o18"] = new Option({
        name: "埋点值", index: "o18", inputType: "text", description: "插入埋点值，请修改T1和T2的值", getValue: function () {
            this.defalutValue = this.dom.find("input").val();
            return this.defalutValue;
        },
        fillValue: function () {
            var m = pageData["activeModel"];
            var _self = this; this.dom.find("input").val(_self.defalutValue).attr("placeholder", "请输入埋点" + (m.index == "m10" ? "活动名称" : "按钮触发值"));
        }
    });
    //自定义样式
    options["o19"] = new Option({
        name: "自定义样式", index: "o19", inputType: "text", description: "直接输入css代码，无需加style标签", getValue: function () {
            this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue;
        },
        fillValue: function () {
            var _self = this; this.dom.find("input").val(_self.defalutValue[0]);
        }
    });
    //server请求
    options["o20"] = new Option({
        name: "服务器配置和数据模型", index: "o20", inputType: "serverModel", description: "配置server参数", getValue: function () {
            this.defalutValue = [this.dom.find("input").eq(0).val(), this.dom.find("textarea").eq(0).val(), this.dom.find("input").eq(1).val(), this.dom.find("input").eq(2).val(), this.dom.find("textarea").eq(1).val()]; return this.defalutValue;
        },
        fillValue: function () {
            var _self = this;
            this.dom.find("input").eq(0).val(_self.defalutValue[0]);
            this.dom.find("textarea").eq(0).val(_self.defalutValue[1]);
            this.dom.find("input").eq(1).val(_self.defalutValue[2]);
            this.dom.find("input").eq(2).val(_self.defalutValue[3]);
            this.dom.find("textarea").eq(1).val(_self.defalutValue[4]);
        }
    });
    //分享的图标
    options["o21"] = new Option({
        name: "分享图标", index: "o21", inputType: "text", description: "分享到钱包/微信的图标", getValue: function () { this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue; },
        fillValue: function () {
            var _self = this; this.dom.find("input").val(_self.defalutValue[0]);
        }
    });
    //自定义样式
    options["o22"] = new Option({
        name: "渠道包reffer", index: "o22", inputType: "text", description: "输入reffer值，赋值前请确认下载页中有预制对应的reffer值", getValue: function () {
            this.defalutValue = [this.dom.find("input").val()]; return this.defalutValue;
        },
        fillValue: function () {
            var _self = this; this.dom.find("input").val(_self.defalutValue[0]).attr("placeholder", "下载页中预制对应的reffer值");
        }
    });
    //图文编辑器
    /*----------------------------------------------------------------聪明的分割线--------------------------------------------------------------*/
    runatModes["rm1"] = new FrameworkRunatMode({
        name: "高级模式", index: "multifunction", optionsTemplate: "template_options", projectHides: [], modelHides: [], action: function () { }
    });
    runatModes["rm2"] = new FrameworkRunatMode({
        name: "单页模板模式", index: "singlePage", optionsTemplate: "template_options2", projectHides: ["p2", "p3", "p4", "p5"], modelHides: ["m1", "m2", "m3", "m4", "m5", "m7", "m9", "m11"], action: function () {
            //$(".leftBar,#viewListWrap").hide();
            //models["m1"].needfulOptions = ["o1"];
            //models["m1"].dragCallBack = function () { }
            //models["m1"].template = "<div class='bgArea center' dragSet='none' zoomSet='none'></div>";
            //models["m2"].needfulOptions = ["o6"];
            options["o11"].defalutValue = ["0", "0", false];
            //options["o6"].defalutValue = [true, '', '', '', 'button', '1.5', '', '', ''];
            //var mainUrl = g.tool.getRootPath() + init.webData.RootPath;
            g.tool.loadFile.loadCss(mainUrl + "/Style/single.css?v=" + init.webData.versionCode, "single");
        }, callback: function () {
            //window.setTimeout(function () {  }, 2000);
            $("#v13").trigger("click");
        }
    });
    //runatModes["rm2"] = new FrameworkRunatMode({
    //    name: "单页模板模式", index: "singlePage", optionsTemplate: "template_options2", projectHides: ["p2", "p3", "p4", "p5"], modelHides: ["m1", "m2", "m3", "m4", "m5", "m7", "m9", "m11"], action: function () {
    //        //$(".leftBar,#viewListWrap").hide();

    //        g.tool.loadFile.loadCss(mainUrl + "/Style/easy.css?v=" + init.webData.versionCode, "easy");
    //    }
    //});
    runatModes["rm3"] = new FrameworkRunatMode({
        name: "超易模式", index: "easyPage", optionsTemplate: "template_options2", projectHides: ["p2", "p3", "p4"], modelHides: ["m3", "m4", "m9", "m11"], action: function () {
            //$(".leftBar,#viewListWrap").hide();
            models["m1"].needfulOptions = ["o1"];
            models["m1"].dragCallBack = function () { }
            models["m1"].template = "<div class='bgArea center' dragSet='none' zoomSet='none'></div>";

            models["m2"].needfulOptions = ["o6", "o18"];
            //models["m9"].needfulOptions = ["o1"];
            //models["m9"].template = "<div class='dragArea' dragSet='x,y'><span zoom='true'></span></div>";
            options["o11"].defalutValue = ["0", "0", false];
            options["o6"].defalutValue = [true, '', '', '', 'button', '1.5', '', '', ''];
            //var mainUrl = g.tool.getRootPath() + init.webData.RootPath;
            g.tool.loadFile.loadCss(mainUrl + "/Style/easy.css?v=" + init.webData.versionCode, "easy");
        }
    });
    return result;
});

