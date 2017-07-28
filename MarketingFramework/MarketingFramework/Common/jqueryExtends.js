
jQuery.support.cors = true;


//example $.cookie('name', 'value');
//设置cookie的值，把name变量的值设为value
//example $.cookie('name', 'value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
//新建一个cookie 包括有效期 路径 域名等
//example $.cookie('name', 'value');
//新建cookie
//example $.cookie('name', null);
//删除一个cookie
//var account= $.cookie('name');
//取一个cookie(name)值给myvar
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie 
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE 
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie 
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want? 
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

jQuery.extend({
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
            case 'unknown': return; break;
            case 'function':
            case 'boolean':
            case 'regexp': return object.toString(); break;
            case 'number': return isFinite(object) ? object.toString() : 'null'; break;
            case 'string': return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
        function () {
            var a = arguments[0];
            return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
        }) + '"'; break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = jQuery.toJsonObj(object[property]);
                    if (value !== undefined) results.push(jQuery.toJsonObj(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = jQuery.toJsonObj(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
});

//字符串格式化(使用：$.format("And the %1 want to know whose %2 you % 3", "papers", "shirt", "wear")返回And the papers want to know whose shirt you wear)
jQuery.format = function (string) {
    var args = arguments;
    var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
    return String(string).replace(pattern, function (match, index) {
        return args[index];
    })
}
//生成字符串格式化模板
jQuery.makeFunc = function () {
    var args = Array.prototype.slice.call(arguments);
    var func = $.format;
    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };
}
//倒计时
$.fn.countDown = function (bind, callback, time) {
    var _this = this;
    var _time = time || 2000;
    _this.timer = window.setInterval(function () {
        if (callback) { callback.apply(_this, arguments); } else { _this.hide(); }
        window.clearInterval(_this.timer);
    }, _time);
    bind.apply(_this, arguments);
    return _this;
}
$.fn.cancleCountDown = function () {
    var _this = this;
    alert($(_this).timer);
}

$.fn.imgUploader = function (option) {
    var _option = $.extend({
        url: "/p/m/upload ",
        btuText:"upload",
        onProgress: function (readyState, statu) { },
        success: function (imgUrl) { }
    }, option || {});
    var _self = this;
    $(this).after("<a href=\"javascript:;\" class=\"a-upload\"><div class='text'><b>" + _option.btuText + "</b><input type=\"file\"></div><div class='pro'></div></a>");
    var fileBtu = $(this).next().find("input")[0];
    fileBtu.addEventListener('change', function (e) {
        var file = fileBtu.files[0];
        if (file) {
            if (file.size >= 1024000) {
                alert("对不起，上传的图片大小不能超过1M");
                return;
            }
            $(".a-upload .text input").hide();
            $(".a-upload .text b").html("0%");
            var formData = new FormData();
            formData.append("file", file);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState > 3) {
                    if (xhr.status == 200) {
                        try {
                            var url = JSON.parse(xhr.responseText).data.url;
                            $(_self).val(url);
                            _option.success.call(_self, url);
                        } catch (e) {
                            alert("服务器数据错误~" + e.message);
                        }
                    } else {
                        alert("图片上传出现错误-" + xhr.status);
                    }
                }
                _option.onProgress.call(_self, xhr.readyState, xhr.status);
            }
            xhr.upload.onprogress = function (ev) {
                if (ev.lengthComputable) {
                    var percent = 100 * ev.loaded / ev.total;
                    $(".a-upload .text b").html(parseInt(percent) + "%");
                    $(".a-upload .pro").css("right", 100 - percent + "%");
                }
            }
            //侦查当前附件上传情况  
            xhr.upload.onload = function (ev) {
                var _parent = $(_self).parent();
                _parent.find(".a-upload .text input").show();
                _parent.find(".a-upload .text b").html(_option.btuText);
                _parent.find(".a-upload .pro").css("right", "100%");
            }
            xhr.open("post", _option.url);
            xhr.send(formData);
        }
    }, false);
}

// 将Underscore对象重命名为global_underscore,
//var global_underscore = _.noConflict();
$.fn.getContent = function (wrapId, pageUrl, data, callBack, error) {
    
    $(function () {
        $.ajax({
            async: true,
            type: "Get",
            url: pageUrl,
            cache: true,
            dataType: "html",
            data: "",//"{t:" + Math.random() * 1000 + "}",
            error: function () {
                alert("template load error");
                if (error) { error(); }
            },
            success: function (html) {
                var compiled = _.template(html);
                if (wrapId !== "") {
                    $(wrapId).append(compiled(data));
                    callBack.call($(wrapId)[0], compiled(data));
                } else {
                    callBack(compiled(data));
                }
            }
        });
    });
}

jQuery.RequestForJsonP = function (options) {
    var setting = $.extend({
        url: "",
        timeOut: 4000,
        complete: function (data) { },
        error: function (ex) { }
    }, options || {});
    var isSuccess = false;
    var timer = window.setInterval(function () {
        if (!isSuccess) {
            setting.error();
        }
        window.clearInterval(timer);
    }, setting.timeOut);
    try {
        // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
        //var url = "https://127.0.0.1/GetProductGroups/" + orgId;
        // 创建script标签，设置其属性
        window.localHandler = function (data) {
            //alert(setting.complete);
            setting.complete(data);
            isSuccess = true;
        };
        var jsonpScript = document.getElementById("jsonpScript");
        if (jsonpScript) {
            document.getElementsByTagName('head')[0].removeChild(jsonpScript);
        }
        var script = document.createElement('script');
        script.setAttribute('src', setting.url);
        script.id = "jsonpScript";
        // 把script标签加入head，此时调用开始
        document.getElementsByTagName('head')[0].appendChild(script);
    } catch (ex) {
        if (setting.error) { setting.error(ex); }
    }
}
//扩展委托方法
$.fn.delegates = function (configs) {
    el = $(this[0]);
    for (var name in configs) {
        var value = configs[name];
        if (typeof value == 'function') {
            var obj = {};
            obj.click = value;
            value = obj;
        };
        for (var type in value) {
            el.delegate(name, type, value[type]);
        }
    }
    return this;
}
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
$.fn.enableDrag = function (downFn, moveFn, upFn) {
    var isDrag, isZoom = false; var x, y, w, h, xon_x, con_y, event, self;
    function mousePosition(ev) {
        if (ev.pageX || ev.pageY) {//firefox、chrome等浏览器
            return { x: ev.pageX, y: ev.pageY };
        }
        return {// IE浏览器
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
    $(this).addClass("cu-m").on("mousedown", function (ev) {
        isDrag = true; self = this;
        if ($(ev.target).attr("zoom")) { isZoom = true; }
        w = $(self).width();
        h = $(self).height();
        ev = ev || window.event;
        event = ev;
        var mousePos = mousePosition(ev);
        x = mousePos.x;
        y = mousePos.y;
        if (downFn) downFn.call(self);
        return false;
    }).find('[zoom]').addClass("cu-z");
    $(".outWrap").on("mouseup", function () { isDrag = false; isZoom = false; if (upFn) upFn.call(self); });
    $(".outWrap").on("mousemove", function (ev) {
        var dragType = "move";
        if (isDrag) {
            ev = ev || window.event;
            event = ev;
            var mousePos = mousePosition(ev);
            con_x = mousePos.x - x;
            con_y = mousePos.y - y;
            w += con_x; h += con_y;
            if (isZoom) {
                var zoomSet = !$(self).attr("zoomSet") ? "x,y" : $(self).attr("zoomSet");
                for (var i = 0; i < zoomSet.length; i++) {
                    if (zoomSet[i] == "x") $(self).css({ "width": w });
                    if (zoomSet[i] == "y") $(self).css({ "height": h });
                }
                dragType = "zoom";
            } else {
                var dragSet = !$(self).attr("dragSet") ? "x,y" : $(self).attr("dragSet");
                for (var i = 0; i < dragSet.length; i++) {
                    if (dragSet[i] == "x") var dom_x = $(self).css("left") == "auto" ? 0 : parseInt($(self).css("left"));
                    if (dragSet[i] == "y") var dom_y = $(self).css("top") == "auto" ? 0 : parseInt($(self).css("top"));
                }
                //var dom_x = $(self).css("left") == "auto" ? 0 : parseInt($(self).css("left"));
                //var dom_y = $(self).css("top") == "auto" ? 0 : parseInt($(self).css("top"));
                $(self).css({ "left": (dom_x + con_x) + "px", "top": (dom_y + con_y) + "px" });
            }
            x = mousePos.x;
            y = mousePos.y;
            if (moveFn) moveFn.call(self, dragType);
            //$(self).attr("ratio", h + ',' + w);
        }
        /*
        ev = ev || window.event;
        event = ev;
        var mousePos = mousePosition(ev);
        con_x = mousePos.x - x;
        con_y = mousePos.y - y;
        if (isZoom) {
            w += con_x; h += con_y;
            $(self).css({ "width": w, "height": h });
        }
        if (isDrag && !isZoom) {
            var dom_x = $(self).css("left") == "auto" ? 0 : parseInt($(self).css("left"));
            var dom_y = $(self).css("top") == "auto" ? 0 : parseInt($(self).css("top"));
            $(self).css({ "left": (dom_x + con_x) + "px", "top": (dom_y + con_y) + "px" });
        }
        x = mousePos.x;
        y = mousePos.y;
        if (moveFn) moveFn.call(self);*/

    });
    return $(this);
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

$.dailog = function (option) {
    var _option = $.extend({
        title: "",
        width: 400,
        height: 400,
        callback: function () { }
    }, option || {});
    var result = {
        wrap: $(".dailogContent"), close: function () {
            $("#dailogWrap").removeClass("open");
        }
    }
    $("#dailogWrap>div").css({ width: _option.width, height: _option.height }).find(".title").html(_option.title);
    $("#dailogWrap").addClass("open").find(".close").unbind("click").click(function () {
        result.close();
    });
    _option.callback.call(result);
}
//示例requestForJsonP("http://192.168.191.1/jsonPdata.ashx", { callbackHeader: "handler", param: "r=ddd&wss=w22" }, function (data) {})；
//使用范例:var majorTom = $.makeFunc("This is Major Tom to ground control. I’m %1.");
//alert(majorTom("stepping through the door"));
//jQuery(function ($) {
//    $.datepicker.regional['zh-CN'] = {
//        closeText: '关闭',
//        prevText: '&#x3c;上月',
//        nextText: '下月&#x3e;',
//        currentText: '今天',
//        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
//        '七月', '八月', '九月', '十月', '十一月', '十二月'],
//        monthNamesShort: ['一', '二', '三', '四', '五', '六',
//        '七', '八', '九', '十', '十一', '十二'],
//        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
//        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
//        weekHeader: '周',
//        dateFormat: 'yy-mm-dd',
//        firstDay: 1,
//        isRTL: false,
//        showMonthAfterYear: true,
//        yearSuffix: '年'
//    };
//    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
//});