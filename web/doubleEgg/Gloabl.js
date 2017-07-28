/// <reference path="../jquery-1.8.1.min.js" />
//定义命名空间函数
var Global = {};
Global.namespace = function (str) {
    var arr = str.split("."), o = Global;
    for (i = (arr[0] = "Global") ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
}
Global.namespace("Global.tool");
Global.namespace("Global.String");
Global.namespace("Global.method");
//示例:Global.namespace("A.Cat");A.Car.name="Tom";A.Cat.move=function(){...}
jQuery.support.cors = true;

//jquery扩展
$.extend({
    //动态加载JS
    jsLoder: function (scripts, callback) {
        if (typeof (scripts) != "object") var scripts = [scripts];
        var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
        var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) {  //递归
            s[i] = document.createElement("script");
            s[i].setAttribute("type", "text/javascript");
            s[i].onload = s[i].onreadystatechange = function () {
                if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                    if (i != last) recursiveLoad(i + 1); else if (typeof (callback) == "function") callback();
                }
            }
            s[i].setAttribute("src", scripts[i]);
            HEAD.appendChild(s[i]);
        };
        recursiveLoad(0);
    },
    //检查空对象
    isEmptyObject: function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },
    //将json字符串转化为对象
    toJsonObj: function (strJson) {
        return eval("(" + strJson + ")");
    },
    //将json对象转换为字符串
    toJsonStr: function (object) {
        var type = typeof object;
        if ('object' == type) { if (Array == object.constructor) type = 'array'; else if (RegExp == object.constructor) type = 'regexp'; else type = 'object'; }
        switch (type) {
            case 'undefined':
            case 'unknown':  return; break;
            case 'function':
            case 'boolean':
            case 'regexp':return object.toString(); break;
            case 'number':  return isFinite(object) ? object.toString() : 'null';break;
            case 'string': return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
        function () {
            var a = arguments[0];
            return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "" }) + '"'; break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = jQuery.toJSON(object[property]);
                    if (value !== undefined) results.push(jQuery.toJSON(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = jQuery.toJSON(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
});
//手机验证组件
//示例：$("#txt_PhoneNumber").phoneValidate($("#btu_getsms"),{});
$.fn.phoneValidate = function (btu, option) {
    var _self = this;
    var getTime = function () {
        var time = _option.requestTime;
        btu.attr("disabled", true);
        btu.html(_option.requestText.replace("requestText", time)).val(_option.requestText.replace("requestText", time));
        var timer = window.setInterval(function () {
            if (time == 1) {
                btu.attr("disabled", false);
                window.clearInterval(timer);
                btu.html(_option.readyText).val(_option.readyText);
                return false;
            }
            btu.html(_option.requestText.replace("requestText", --time)).val(_option.requestText.replace("requestText", --time));
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
        if (!/^1\d{10}$/.test($("#txt_PhoneNumber").val())) {
            G_t.trip("请输入正确的手机号码！");
            return false;
        }
        if (_option.ajaxfn) {
            _option.ajaxfn.call(_self);
            return false;
        }
        _option.ajaxUrl = _option.ajaxUrl.indexOf("?") == -1 ? _option.ajaxUrl + "?timer=" + Math.random() : _option.ajaxUrl + "&timer=" + Math.random();
        if (_option.ajaxUrl == "") return false;
        $.ajax({
            type: "get",
            url: _option.ajaxUrl,
            dataType: "json",
            data: { mobile: $(_self).val() },
            success: function (data) {
                _option.callBack.call(_self, data);
            },
            error: function (data) {
                _option.error.call(_self, data);
            }
        });
    });
}
$.requestForJsonP = function (url, option, success) {
    $("#loading").show();
    var _option = $.extend({
        callbackHeader: "callBack",
        param: "",
        error: function () { }
    }, option || {});
    window[_option.callbackHeader] = function (data) {
        if (typeof (success) == "function") success(data);
    }
    var _script = document.createElement("script");
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
//示例requestForJsonP("http://192.168.191.1/jsonPdata.ashx", { callbackHeader: "handler", param: "r=ddd&wss=w22" }, function (data) {})；

//Global.tool
(function (G_t) {
    //此法是将文件加在header头上
    G_t.loadFile = {
        loadJs: function (file) {
            var scriptTag = document.getElementById('loadScript');
            var head = document.getElementsByTagName('head').item(0);
            if (scriptTag) head.removeChild(scriptTag);
            script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.id = 'loadScript';
            head.appendChild(script);
        }, loadCss: function (file) {
            var cssTag = document.getElementById('loadCss');
            var head = document.getElementsByTagName('head').item(0);
            if (cssTag) head.removeChild(cssTag);
            css = document.createElement('link');
            css.href = file;
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.id = 'loadCss';
            head.appendChild(css);
        },
        loadJsAndRun: function (scripts, callback) {
            if (typeof (scripts) != "object") var scripts = [scripts];
            var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
            var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) {
                s[i] = document.createElement("script");
                s[i].setAttribute("type", "text/javascript");
                s[i].onload = s[i].onreadystatechange = function () {
                    if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                        this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                        if (i != last) recursiveLoad(i + 1); else if (typeof (callback) == "function") callback();
                    }
                }
                s[i].setAttribute("src", scripts[i]);
                HEAD.appendChild(s[i]);
            };
            recursiveLoad(0);
        }
    }
    //获取根目录
    G_t.getRootPath = function () {
        var strFullPath = window.document.location.href;
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos);
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        //return (prePath + postPath);
        return (prePath);
    }
    //获取URL参数方法
    G_t.getScriptArg = function (key) {//获取单个参数
        return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    }
    //跳转(参数2：是否在新页面中打开)
    G_t.gotoUrl = function (url, isNewPage) {
        if (isNewPage) {
            window.open(url);
        } else {
            location.href = url;
        }
        //return false;
    }
    //获取单个参数(自定义src)
    G_t.getScriptArg = function (src, key) {
        var reg = /_(c|m|s|t|o|b)\.(jpg|gif|png|bmp|ico|jpeg){1}$/gi;
        var reg2 = /\.(jpg|gif|png|bmp|ico|jpeg){1}$/gi;
        var reg3 = /(.)*_(c|m|s|t|o|b)\.(jpg|gif|png|bmp|ico|jpeg){1}$/gi;
        if (reg3.test(src)) {
            return src.replace(src.match(reg), key + src.match(reg2));
        } else {
            return src;
        }
    }
    //加载flash，注意此方法需要swfobject.js的支持
    G_t.initFlash = function (div_id, flash_src, _width, _height) {
        var so = new SWFObject(flash_src, div_id, _width, _height, "7", "#fff");
        so.addParam("wmode", "Opaque");
        so.addParam("allowscriptaccess", "sameDomain");
        //    params.allowscriptaccess = "sameDomain";
        so.write(div_id);
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-1465702-6']);
        _gaq.push(['_trackPageview']);

    }
    //获取元素坐标（此方法有bug）
    G_t.getPostion = function (obj) {
        var vLeft = 0;
        var vTop = 0;
        while (obj != null && obj != document.body) {
            vLeft += obj.offsetLeft;
            vTop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return { left: vLeft, top: vTop };
    }
    G_t.gotoTop = function () {
        $("html").animate({ scrollTop: 0 }, "fast");
        $("body").animate({ scrollTop: 0 }, "fast");
    }
    //获取元素相对于浏览器的X坐标
    G_t.getElementLeft = function (element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }
    //获取元素相对于浏览器的Y坐标
    G_t.getElementTop = function (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
    //获取元素相对于浏览器滚动条的Y坐标
    G_t.getElementViewTop = function (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            var elementScrollTop = document.body.scrollTop;
        } else {
            var elementScrollTop = $(document).scrollTop();
        }
        return actualTop - elementScrollTop;
    }
    //获取元素相对于浏览器滚动条的X坐标
    G_t.getElementViewLeft = function (element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            var elementScrollLeft = document.body.scrollLeft;
        } else {
            var elementScrollLeft = $(document).scrollLeft();
        }
        return actualLeft - elementScrollLeft;
    }
    //异步加载图片
    G_t.loadImage = function (url, callBack) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.onload = function () {
            img.onload = null;
            callBack(img);
        }
        img.src = url;
    }
    //手机端trip
    G_t.trip = function (option) {
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
    //获取随机数
    G_t.getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    //时间戳转换
    G_t.getLocalTime = function (date_time) {
        var date_time = new Date(parseInt(date_time)), year = date_time.getFullYear(), month = date_time.getMonth() + 1, date = date_time.getDate();
        return year + '-' + month + '-' + date;
    }
})(Global.tool);
//Global.string
(function (G_s) {
    //去除前后空格
    G_s.Trim = function (val) {
        return val.replace(/(^\s*)|(\s*$)/g, "");
    }
    //去除HTML标签
    G_s.deleteHtmlTag = function (str, charLength) {
        var _str = str.replace(/<[^>].*?>/g, "");
        if (charLength != 0) {
            _str = _str.length > charLength ? _str.substr(0, charLength) + "..." : _str;
        }
        return _str;
    }
    //格式化HTML标签
    G_s.zyDeChart = function (str) {
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
        return str;
    }
    //还原HTML标签
    G_s.zyEnChart = function (str) {
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
        return str;
    }
    /*Javascript设置要保留的小数位数，四舍五入。
    (Dight,How):数值格式化函数，Dight要格式化的 数字，How要保留的小数位数。 
    */
    G_s.ForDight = function (Dight, How) {
        Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);

        return Dight.toFixed(How);
    }
})(Global.String);

//原生对象扩展
(function (ex) {
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
    Date.prototype.Format = function (fmt) {
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
})(window);
