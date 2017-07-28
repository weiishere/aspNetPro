
var _mApp = mApp({ eventId: 269070, config: { url: "https://qianbao.jd.com/p/page/download.htm" } });
var mAppConfig = _mApp.config();


(function (exp) {
    //messagesBox
    //$(function () { FastClick.attach(document.body); });
    Date.prototype.Format = function (fmt) { //author: meizz   
        var o = {
            "M+": this.getMonth() + 1,                 //月份   
            "d+": this.getDate(),                    //日   
            "h+": this.getHours(),                   //小时   
            "m+": this.getMinutes(),                 //分   
            "s+": this.getSeconds(),                 //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    exp.openAlert = function (title, text, buttonEvent, option) {
        if (!title && !text) { return false; }
        var self = this;
        var _option = $.extend({
            isCloseBtu: true
        }, option || {});
        $("body").append("<div class=\"alertWrap\" id=\"alertWrap\"><div class=\"alert\"><h1>消息标题</h1><span></span><div class=\"buttonWrap\"></div></div></div>");
        if (_option.isCloseBtu) { $("#alertWrap i").show().click(function () { self.closeAlert() }); }
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
        self.closeAlert = function (fn) {
            $(".alert").removeClass("alertActive");
            window.setTimeout(function () {
                if (fn) fn();
                $("#alertWrap").remove();
                //$("#alertWrap").fadeOut("fast", function () {
                //    if (fn) fn();
                //    $("#alertWrap").remove();
                //});
            }, 200);
        }
        $("#alertWrap button").each(function (i, item) {
            $(this).unbind("click").click(function () {
                if (!buttonEvent) { self.closeAlert(); return false; }
                if (buttonEvent[i].hasOwnProperty("fn")) {
                    buttonEvent[i].fn.call(self);
                } else {
                    self.closeAlert(function () { });
                }
            });
        });
    }
    exp.requestAjax = function (url, option, data, success) {
        var _option = $.extend({
            type: "get",
            dataType: "json",
            async: true,
        }, option || {});
        if ($("#loading").size() == 0) {
            $("body").append("<div id=\"loading\"><div><img src=\"https://img10.360buyimg.com/cms/jfs/t2821/84/923092587/781/ad9c511d/572b0127N566e3610.gif\" /><br />加载中，请稍后...</div></div>");
        }
        $.ajax({
            type: _option.type,
            dataType: _option.dataType,
            async: _option.async,
            url: url,
            data: data,
            beforeSend: function () {
                $("#loading").show();
            },
            success: function (data) {
                $("#loading").hide();
                success(data);
            },
            complete: function () { },
            error: function (data) {
                $("#loading").hide();
                //alert("内部错误：" + JSON.stringify(data));
                alert("网络不给力，请重试~");
            }
        });
    }
    exp.Trip = function (option) {
        $("body").append("<div class='pageLoading2'></div>");
        var _option = typeof option === "string" ? { content: option } : option;
        var setting = $.extend({
            title: "",
            content: "",
            position: "center",//"bottom"//"top"
            timeout: 2000,
            callBack: function () { },
            closeBack: function () { }
        }, _option || {});
        var className = new Object();
        className["center"] = ""; className["bottom"] = "floatWindow_bottom"; className["top"] = "floatWindow_top";
        var _window = "<div id=\"floatWindow\" class=\"floatWindow " + className[setting.position] + "\"><h2>" + setting.title + "</h2><p>" + setting.content + "</p></div>";
        if ($("#floatWindow").size() == 0) { $("body").append(_window); }
        //$("body").one("click", function () { if ($("#floatWindow").size() != 0) { _close(); return false; } });
        var floatWindow = $("#floatWindow");
        window.setTimeout(function () {
            floatWindow.addClass("showFloat").css({ "height": floatWindow.height() * 1.1 });
            setting.callBack();
        }, 50); 
        var _close = function () {
            if (floatWindow.size() != 0) {
                floatWindow.removeClass("showFloat").css({ "height": $("#floatWindow").height() * 0.99 });
                window.setTimeout(function () {
                    $("#floatWindow").remove();
                    $(".pageLoading2").remove();
                    setting.closeBack();
                }, 150);
            }
        }
        var _timer = window.setInterval(function () { _close(); window.clearInterval(_timer); }, setting.timeout);
        if (typeof event !== "undefined") event.stopPropagation();
    }
    exp.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    exp.validateObj = {};
    /*
    exp.requestForJsonPHander = function (data) {
        if (data.retCode === 'RM000000' || isNormalRequest) {
            return true;
        } else {
            if (data.retCode === 'RMF00002') {
                Trip('您已参与过此活动！');
            } else if (data.retCode === 'RMF00005') {
                Trip('您已经投过票了！');
            } else {
                Trip(data.retMessage);
            }
            return false;
        }
    }*/
    exp.requestForJsonP = function (url, option, success, noLoading, isNormalRequest) {
        if (!noLoading) $("#loading").show();
        var radomId = parseInt(Math.random() * 100000);
        var _option = $.extend({
            callbackHeader: "callBack_" + radomId,
            param: "",
            error: function () { }
        }, option || {});
        exp[_option.callbackHeader] = function (data) {
            //if (requestForJsonPHander(data)) { if (typeof (success) == "function") success(data); }
            if (typeof (success) == "function") success(data);
        }

        var _script = document.createElement("script");
        _script.id = "jspSctipt_" + radomId;
        _script.setAttribute("type", "text/javascript");
        _script.onload = _script.onreadystatechange = function () {
            if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                $("#loading").hide();
            } else {
                $("#loading").hide();
                Trip("对不起 ，请求发生错误~");
                _option.error();
            }
        }
        _script.setAttribute("src", url + "?callback=" + _option.callbackHeader + "&" + _option.param + "&timer=" + parseInt(Math.random() * 100000));
        (document.getElementsByTagName("head").item(0) || document.documentElement).appendChild(_script);
    }
    exp.phoneValidate = function (number, code, getCode, submit, option) {
        var phoneNumber = "";//缓存出phoneNumber
        var getTime = function () {
            var time = _option.requestTime;
            getCode.attr("disabled", true);
            getCode.html(_option.requestText.replace("requestText", time));
            var timer = window.setInterval(function () {
                if (time == 1) {
                    getCode.attr("disabled", false);
                    window.clearInterval(timer);
                    getCode.html(_option.readyText);
                    return false;
                }
                getCode.html(_option.requestText.replace("requestText", --time));
            }, 1000);
        }
        var _option = $.extend({
            readyText: "获取验证码",
            requestTime: 60,
            requestText: "requestText 秒后重获",
            ajaxfn: undefined,
            ajaxUrl: "",
            validateUrl: "",
            getCodeCallBack: function (data) { },
            submit: undefined,
            submitCallBack: function () { },
            submitData: {},
            error: function (data) { }
        }, option || {});
        mk_m.addValidate(number, $(number).parent().attr("guid"), /^[1][3,5,7,8][0-9]{9}$/, "请输入正确的手机号码");
        getCode.on("click", function () {
            if (!validateObj[$(number).parent().attr("guid")].result) {
                Trip(validateObj[$(number).parent().attr("guid")].errorWeak);
                return false;
            }
            if (_option.ajaxfn) {
                _option.ajaxfn.call(number[0]);
                return false;
            }
            if (_option.ajaxUrl == "") return false;
            _option.ajaxUrl = _option.ajaxUrl.indexOf("?") == -1 ? _option.ajaxUrl + "?timer=" + Math.random() : _option.ajaxUrl + "&timer=" + Math.random();
            _option.validateUrl = _option.validateUrl.indexOf("?") == -1 ? _option.validateUrl + "?timer=" + Math.random() : _option.validateUrl + "&timer=" + Math.random();
            requestAjax(_option.ajaxUrl, {}, { entranceId: Config.entranceId, mobile: number.val() }, function (data) {
                if (data.code == "A00000") getTime();
                phoneNumber = number.val();
                mk_m.addValidate(code, $(code).parent().attr("guid"), /^[0-9]+.?[0-9]*$/, "请输入正确的验证码");
                _option.getCodeCallBack(data);
            });
        });
        submit.on("click", function () {
            if (phoneNumber == "") {
                Trip("请填写您收到的短信验证码以验证您的手机号~");
                return false;
            }
            //if (!validateObj[$(number).parent().attr("guid")].result) {
            //    Trip(validateObj[$(number).parent().attr("guid")].errorWeak);
            //    return false;
            //}
            if (!validateObj[$(code).parent().attr("guid")].result) {
                Trip(validateObj[$(code).parent().attr("guid")].errorWeak);
                return false;
            }
            if (_option.submit) {
                _option.submit(phoneNumber);
            } else {
                var _data = $.extend({
                    entranceId: Config.entranceId,
                    wxOpenId: Config.wxOpenId,
                    mobile: phoneNumber,
                    verifyCode: code.val(),
                    qrCode: Config.qrCode
                }, _option.submitData);
                requestAjax(_option.validateUrl, {}, _data
                , function (data) {
                    _option.submitCallBack(data);
                });
            }
        });
    }
    var cache = {};
    exp.makeTemplate = function tmpl(str, data) {
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" + str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        return data ? fn(data) : fn;
    };

    exp.PageCommon = {
        initFirstPage: function (pageId) { lastPage = pageId; },
        init: function (_pageHome) {
            var pageHome = _pageHome || (location.hash ? location.hash.split("&")[1] : $(".page[role='homePage']")[0].id);
            var pagesList = [];
            var lastPage = pageHome;
            function Page(id, option) {
                var self = this;
                self.id = id;
                self._showCall = function () { }
                self.show = function (option) {
                    var _o = $.extend({
                        callback: null,
                        isCache: true
                    }, option || {});
                    if (_o.callback) this._showCall = _o.callback;
                    //Mobilebone.transition(document.querySelector("#" + id), document.querySelector("#" + lastPage));
                    Mobilebone.transition(document.querySelector("#" + id), document.querySelector("#" + lastPage), { history: _o.isCache });
                }
                var _option = $.extend({
                    showBack: function () { },
                    init: function () { },
                    hide: function () { }
                }, option || {});
                //$("#" + self.id).height($("#" + self.id).height());
                for (var i in _option) { self[i] = _option[i]; }
                pagesList.push(self);
            }
            var getPage = function (pageinId, fn) {
                for (var i = 0; i < pagesList.length; i++) {
                    if (pagesList[i].id == pageinId) {
                        fn.call(pagesList[i]);
                        return;
                    }
                }
            }
            if (window.hasOwnProperty("Mobilebone")) {
                Mobilebone.callback = function (pagein, pageout) {
                    //if (pageHome == lastPage) { return false; }
                    lastPage = pagein.id;
                    getPage(pagein.id, function () {
                        this.showBack();
                        this._showCall();
                        this._showCall = function () { }
                        $("#" + pagein.id + " content").height($("#" + pagein.id).height());//让content自动撑满
                    });
                };
                Mobilebone.onpagefirstinto = function (pagein) {
                    getPage(pagein.id, function () { this.init(); });
                };
                Mobilebone.fallback = function (pagein) {
                    getPage(pagein.id, function () { this.hide(); });
                };
            }
            window.Page = Page;
            Mobilebone.transition(document.querySelector("#" + pageHome), "");
        }
    }
    exp.Requester = {};
    var paramStrs = ['qrCode', 'wxOpenId', 'auth', 'code', 'refresh_token', 'entranceId', 'params'];
    exp.RequestFactory = function (_option) {
        var option = $.extend({
            url: "", param: {}, dataStruct: "data", modelName: "Model", htmlTemp: "", ajaxOption: {}
        }, _option || {});
        option.url = option.url.indexOf("http://") == -1 ? Config.serverUrl + option.url : option.url;
        return {
            templ: option.htmlTemp,
            request: function (callback, filter, filterError) {
                var _self = this;
                var _param = {};
                for (var i = 0; i < paramStrs.length; i++) {
                    var _key = paramStrs[i];
                    if (Config[_key]) { _param[_key] = Config[_key]; }
                }
                option.param = $.extend(_param, option.param);
                requestAjax(option.url + (option.url.indexOf("?") == -1 ? "?" : "&") + 'timer=' + parseInt(Math.random() * 10000), option.ajaxOption, option.param, function (data) {
                    //var data = eval("({code:'A00000',data:[{title:'title1',value:'value1'},{title:'title2',value:'value2'},{title:'title3',value:'value3'}]})");
                    //var data = eval("(" + '{"code":"A00003","customerId":"360000000000129757","data":{"description":"已经领过啦，请给其他小伙伴机会吧！"},"msg":"已经领过啦，请给其他小伙伴机会吧！"}' + ")");
                    if (!filter) {
                        filter = function (data) { if (data.code == 'A00000') { return true; } else { return false; } }
                    }
                    var resultData = data;
                    option.dataStruct.split(".").forEach(function (item) {
                        resultData = resultData[item];
                    });
                    if (filter(data)) {
                        var pageMod = new PageMod(_self.templ, resultData, function () {
                            if (callback) callback(data, this.resultHtml);
                        }, { modelName: option.modelName });
                    } else { if (filterError) { filterError(data); } }
                });
            }
        }
    }
    function PageMod(templ, data, callBack, option) {
        var _self = this;
        _self.option = $.extend({
            modelName: "Model"
        }, option || {});
        _self.templ = templ;
        _self.data = data;
        _self.callBack = callBack;
        _self.get();
    }
    PageMod.prototype.templ;
    PageMod.prototype.data;
    PageMod.prototype.resultHtml;
    PageMod.prototype.callBack = function () { };
    PageMod.prototype.option = {};
    PageMod.prototype.get = function () {
        var _self = this;
        _self.templ = _self.templ.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        window[_self.option.modelName] = _self.data;
        _self.resultHtml = makeTemplate(_self.templ, window[_self.option.modelName]);
        _self.callBack();
    }
    exp.PageMod = PageMod;
    exp.Config = {
        entranceId: "2015122300000000002",
        serverUrl: "https://m.jdpay.com/",
        appUrl: "http://m.jdpay.com/",
        set: function () {
            var self = this;
            paramStrs.forEach(function (item) {
                var value = getParameterByName(item);
                if (value) self[item] = value;
            });
            if (!getParameterByName("auth")) {
                _mApp.getInfo(function (data) {
                    userInfo = eval("(" + data + ")");
                    Config["auth"] = userInfo.auth;
                });
            }
        }
    }
})(window);

Config.set();
var models = {};
var modelGuids = function (guid) {
    models[guid] = $("*[guid=" + guid + "]");
}
var mk_m = (function () {
    var result = {};
    result.initHeight = function (dom) {
        if (dom.size == 0) return;
        var r = $(dom).attr("ratio").split(",");
        var ratio = parseInt(r[0]) / parseInt(r[1]);
        var height = $(dom).width() * ratio;
        $(dom).height(height);
    }
    result.openActivityRole = function (guid) {
        var _html = "<div class='activityRoleTextWrap' style='display:none' id='roleLayer'><div class='RoleTextWrap'><span class='close'><img src='http://img12.360buyimg.com/cms/jfs/t1936/186/2409786086/2419/e7d381e0/56dec94eN3e56c191.png'/></span><div>" + $("#hd_roleText" + (guid || "")).html() + "</div></div></div>";
        $("body").append(_html).find("#roleLayer").show().find(".close").click(function () {
            $("#roleLayer>div").removeClass("showRole");
            window.setTimeout(function () { $("#roleLayer").remove(); }, 200);
        });
        window.setTimeout(function () {
            $("#roleLayer>div").addClass("showRole");
        }, 10);
    }

    result.addValidate = function (dom, valiObjName, validateStr, errorWeak) {
        validateObj[valiObjName] = { "validateStr": validateStr, "result": false, errorWeak: errorWeak }
        dom.on("blur", function () {
            if (!validateStr.test($(this).val())) {
                Trip(errorWeak);
                //this.focus();
                validateObj[valiObjName].result = false;
            } else {
                validateObj[valiObjName].result = true;
            }
        });
    }
    return result;
})();