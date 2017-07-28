(function (exp) {
    Array.prototype.isContain = function (item) {
        var isPass = false;
        for (var i = 0; i < this.length; i++) { if (this[i] == item) { isPass = true; break; } }
        return isPass;
    }
    Array.prototype.removeByIndex = function (index) {
        if (isNaN(index) || index > this.length) { return false; }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[index]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    }
    Array.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    Array.prototype.getIndexByValue = function (value) {
        var index = -1;
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value) { index = i; break; }
        }
        return index;
    }
    String.prototype.Trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
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
    exp.Trip = function (option) {
        var _option = typeof option === "string" ? { content: option } : option;
        var setting = $.extend({
            title: "",
            content: "",
            position: "center",//"bottom"//"top"
            timeout: 2000,
            callBack: function () { }
        }, _option || {});
        var className = new Object();
        className["center"] = ""; className["bottom"] = "floatWindow_bottom"; className["top"] = "floatWindow_top";
        var _window = "<div id=\"floatWindow\" class=\"floatWindow " + className[setting.position] + "\"><h2>" + setting.title + "</h2><p>" + setting.content + "</p></div>";
        if ($("#floatWindow").size() == 0) { $("body").append(_window); }
        $("body").one("click", function () { if ($("#floatWindow").size() != 0) { _close(); return false; } });
        var floatWindow = $("#floatWindow");
        floatWindow.animate({ "opacity": 1, "width": "50%", "height": floatWindow.height() * 1.1 }, 200, function () { setting.callBack(); });
        var _close = function () { if (floatWindow.size() != 0) { floatWindow.animate({ "opacity": 0, "width": "48%", "height": $("#floatWindow").height() * 0.99 }, 150, function () { $(this).remove() }); } }
        var _timer = window.setInterval(function () { _close(); window.clearInterval(_timer); }, setting.timeout);
        if (typeof event !== "undefined") event.stopPropagation();
    }
    exp.requestForJsonP = function (url, option, success, noLoading, isNormalRequest) {
        if (!noLoading) $("#loading").show();
        var radomId = parseInt(Math.random() * 100000);
        var _option = $.extend({
            callbackHeader: "callBack_" + radomId,
            param: "",
            error: function () { }
        }, option || {});
        exp[_option.callbackHeader] = function (data) {
            if (data.retCode === 'RM000000' || isNormalRequest) {
                if (typeof (success) == "function") success(data);
            } else {
                if(data.retCode === 'RMF00002'){
                     Trip('您已参与过此活动！');
                }else if(data.retCode === 'RMF00005'){
                    Trip('您已经投过票了！');
                }else{
                    Trip(data.retMessage);
                }
            }

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
    exp.base64Coder = (function () {
        var obj = {};
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var base64DecodeChars = new Array(
             -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
             -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
             -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
             52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
             -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
             15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
             -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
             41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        obj.base64encode = function (str) {
            var out, i, len;
            var c1, c2, c3;

            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        }
        obj.base64decode = function (str) {
            var c1, c2, c3, c4;
            var i, len, out;

            len = str.length;
            i = 0;
            out = "";
            while (i < len) {

                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;


                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;

                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));


                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;

                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));


                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        }
        return obj;
    })();
    exp.getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    exp.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    //时间戳转换
    exp.getLocalTime = function (date_time) {
        var date_time = new Date(parseInt(date_time)), year = date_time.getFullYear(), month = date_time.getMonth() + 1, date = date_time.getDate();
        return year + '-' + month + '-' + date;
    }
    exp.requestAjax = function (url, option, data, success) {
        var _option = $.extend({
            type: "get",
            dataType: "json",
            async: true,
        }, option || {});
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
                alert("内部错误：" + JSON.stringify(data));
            }
        });
    }
    //手机验证
    exp.phoneNumber = "";
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
            requestText: "requestText 's后重获",
            ajaxfn: undefined,
            ajaxUrl: "",
            callBack: function (data) { },
            error: function (data) { }
        }, option || {})
        btu.click(function () {
            if (!/^1\d{10}$/.test($("#txt_PhoneNumber").val().Trim())) {
                //openAlert("", "请输入正确的手机号码！");
                Trip("请输入正确的手机号码！");
                return false;
            }
            if (_option.ajaxfn) {
                _option.ajaxfn.call(_self);
                return false;
            }
            if (_option.ajaxUrl == "") return false;
            _option.ajaxUrl = _option.ajaxUrl.indexOf("?") == -1 ? _option.ajaxUrl + "?timer=" + Math.random() : _option.ajaxUrl + "&timer=" + Math.random();
            requestAjax(_option.ajaxUrl, {}, { entranceId: Config.entranceId, mobile: $(_self).val().Trim() }, function (data) {
                if (data.code == "A00000") getTime();
                phoneNumber = (_self).val();
                _option.callBack.call(_self, data);
            });
            /*
            $.ajax({
                type: "get",
                url: _option.ajaxUrl,
                dataType: "json",
                data: { entranceId: Config.entranceId, mobile: $(_self).val() },
                success: function (data) {
                    _option.callBack.call(_self, data);
                },
                error: function (data) {
                    _option.error.call(_self, data);
                }
            });*/
        });
    }
    //messagesBox
    exp.openAlert = function (title, text, buttonEvent, option) {
        if (!title && !text) { return false; }
        var self = this;
        var _option = $.extend({
            isCloseBtu: true
        }, option || {});
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
                $("#alertWrap").fadeOut("fast", function () {
                    if (fn) fn();
                });
            }, 50);
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
    exp.browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }()
    }
    //fastClick 到时候显示

    //if (browser.versions.mobile) { window.addEventListener('load', function () { FastClick.attach(document.body); }, false); }

    exp.pages = new Array();
    function Page(domId, option, fn) {
        this.option = $.extend({
            isAutoInit: true,
            isFooterBar: true
        }, option || {});
        this.domId = domId;
        this.indexName = "p_" + domId;
        this.fn = fn;
        this.showBack = function () { }
        this.hideBack = function () { }
        var $self = $("#" + this.domId);
        
        var isSlideing = false;
        this.show = function (_showBack) {
            if (isSlideing) { return false; }
            var _self = this;
            if (window.set) if (set["lastPage"] == _self) { return false; }
            isSlideing = true;
            window.setTimeout(function () { isSlideing = false; }, 400);
            $self.show();
            //$self.css({ '-webkit-transform': 'translate3d(0%, 0px, 0px)', '-webkit-transition': '-webkit-transform 250ms cubic-bezier(0.42, 0, 0.58, 1.0)' });
            if (window.set) {
                set["lastPage"].hide();
            }

            if (!window.hasOwnProperty("set")) { window.set = {}; }
            set["lastPage"] = _self;
            urlRoleCommon.pageChangeEven.call(_self);
            if (_showBack) _showBack.call(_self);
            if (_self.showBack) _self.showBack.call(_self);
            if (this.option.isFooterBar) {
                //$self.find("content").addClass("mainWrapMar");
                $("#J_openBtn").show();
            }
        }
        this.hide = function () {
            $("#" + this.domId).hide();
            //$("#" + this.domId).css({ '-webkit-transform': 'translate3d(-100%, 0px, 0px)', '-webkit-transition': '-webkit-transform 250ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s' });
            this.hideBack();
            $("#J_openBtn").hide();
        }
        this.init = function () {
            if (this.fn) { this.fn(this); }
        }
        if (this.option.isAutoInit) this.fn();
        pages.push(this);
        //if (!window.hasOwnProperty("pages")) { window.pages = []; }
        //pages.push(domId);
    }
    var urlRoleCommon = (function () {
        var distoeyState = "", result = {};
        history.replaceState(location.hash, "", location.href);
        var _jump = function (callback) {
            for (var p in pages) {
                var item = pages[p];
                if (item.__proto__ === Page.prototype) {
                    if ("#" + item.indexName == location.hash) { _page = item; item.show(function () { if (callback) callback(); }); }
                }
            }
        }
        var _page = {};
        var _tempCallBck = function () { }
        exp.addEventListener('popstate', function (e) {
            result.changePageBack();
        }, false);
        exp.addEventListener('hashchange', function (e) {
            _jump(function () {
                if (_tempCallBck) _tempCallBck(_page);
                _tempCallBck = function () { }
                result.changeHashBack();
            });
        }, false);
        result.goActive = function (hash, callBack) {
            distoeyState = history.state;
            location.href = hash;
            //history.pushState(hash, "", hash);
            if (typeof callBack == "function") { _tempCallBck = callBack; }
        }
        result.changePageBack = function () {/*不管hash有没有变动都触发*/ }
        result.changeHashBack = function () { /*有变动才触发*/ }
        result.loadDefaultActive = function () { if (location.hash) { _jump(); } }
        result.pageChangeEven = function () {}
        return result;
    })();
    /*使用urlRoleCommon.goActive("#p_indexPage",function(page){})进行跳转（在pageId前加“p_”）,
    urlRoleCommon.changePageBack()为全局事件(只要使用goActive就会触发)，
    urlRoleCommon.changeHashBack()为全局事件(只要使用hash变动就会触发)
    */
    exp.urlRoleCommon = urlRoleCommon;
    exp.Page = Page;
})(window);


$("span[role=checkRole]").click(function () {
    $(this).parents(".mainWrap").eq(0).scrollTop(0);

    //$(this).parents(".mainWrap").eq(0).append($("#roleLayer").show());

    $("#roleLayer").show();

    window.setTimeout(function () { $("#roleLayer>div").addClass("show"); }, 10);
});
//活动规则层关闭
$("#roleLayer").find(".close").click(function () {
    $("#roleLayer>div").removeClass("show");
    window.setTimeout(function () { $("#roleLayer").hide(); }, 300);
});
$("#J_openBtn").click(function () {
    $(this).animate({ "bottom": "-100%" }, 600);
}).find("button").click(function () {
    _mApp.start('http://sq.jd.com/UiMMRN', 'ACTIVITY');
    return false;
});



