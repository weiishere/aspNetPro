
define(['global', 'underscore', 'text!Template/_master.html'], function (g, _, master) {
    function Base() { }
    Base.prototype.name = "obj";
    Base.prototype.guid = "";
    Base.prototype.index = "";
    Base.prototype.dom = {};
    Base.prototype.disable = false;
    Base.prototype.display = true;
    Base.prototype.init = function () {
        //alert(this.index);
    }
    function baseFor(o, option) {
        var _constructor = this.constructor;
        var _prototype = this.constructor.prototype;
        var _prototype2 = o.prototype;
        for (var i in _prototype2) {
            var isPass = false;
            for (var j in _prototype) { if (i == j) { isPass = true; break; } }
            if (!isPass) _prototype[i] = _prototype2[i];
        }
        this.constructor = _constructor;
        if (typeof option === "object") {
            for (var i in this.constructor.prototype) {
                for (var j in option) {
                    if (i === j) this[i] = option[j];
                }
            }
        }
        if (this.init) this.init();
    }

    //项目
    function Project(_option) {
        var _self = this;
        baseFor.call(_self, Base, _option);
    }
    Project.prototype.viewsList = [];
    Project.prototype.viewsObjList = [];//视图对象，可以为空，主要用于存储自定义的视图(主要为了补充viewlist只存了index的问题)
    Project.prototype.defaultViewIndex = 0;
    Project.prototype.modsList = [];//预制的模块
    Project.prototype.isMultiPage = true;
    Project.prototype.runMod = "";//运行模式
    Project.prototype.pageModelsData = {};
    Project.prototype.resource = { markets: [], marketMod:[] };
    //视图/页面
    function View(_option) {
        var _self = this;
        baseFor.call(_self, Base, _option);
    }
    View.prototype.isNew = false;
    //模块
    function Model(_option) {
        var _self = this;
        baseFor.call(_self, Base, _option);
    }
    Model.prototype.valueForBackToJs = {};//用于返回给自定义脚本的数据
    Model.prototype.template = "";//html字符串、模板信息{id:'**',function(){return {}}}
    Model.prototype.optionsList = [];
    Model.prototype.dragCallBack = function () { }//加载options之前
    Model.prototype.refreshCallBack = function () { }//加载options之后
    Model.prototype.setDone = function () { }
    Model.prototype.goCode = function () { }//生成代码后要执行的方法
    Model.prototype.remove = function () { }
    Model.prototype.loadInit = function () { }//加载模板的时候需要执行的方法
    Model.prototype.container = null;
    Model.prototype.isForCode = true;//视觉模块是否支持操作者自定义脚本，如果不支持，模块开发者可以在代码中修改jsCode，否则修改jsCode则不生效
    Model.prototype.jsCode = "";
    Model.prototype.classList = [];
    Model.prototype.isContainer = true;
    Model.prototype.needfulOptions = [];
    Model.prototype.javaScriptFrame = "";//用于某个组件专用到的js库或者源码，需要加上<script>标签
    //配置项目
    function Option(_option) {
        var _self = this;
        baseFor.call(_self, Base, _option);
    }
    Option.prototype.name = "配置项1";
    Option.prototype.inputType = "text";
    Option.prototype.defalutValue = "";
    Option.prototype.description = "";
    Option.prototype.isNeedful = false;
    Option.prototype.data = [];//用于绑定选项的数据，比如皮肤列表
    //Option.prototype.initRender = function () { }
    Option.prototype.getValue = function () { return ""; }
    Option.prototype.fillValue = function () { }
    Option.prototype.serviceSet = {
        disable: true,
        url: "",
        type: "get",
        callback: function () { }
    }
    //框架运行模式
    function FrameworkRunatMode(_option) {
        var _self = this;
        baseFor.call(_self, Object, _option);
    }
    FrameworkRunatMode.prototype.name = "";
    FrameworkRunatMode.prototype.index = "";
    FrameworkRunatMode.prototype.projectHides = [];
    FrameworkRunatMode.prototype.modelHides = [];
    FrameworkRunatMode.prototype.action = function () { }
    FrameworkRunatMode.prototype.callback = function () { }
    FrameworkRunatMode.prototype.optionsTemplate = "";

    window.Project = Project;
    window.View = View;
    window.Model = Model;
    window.Option = Option;
    window.FrameworkRunatMode = FrameworkRunatMode;

    function Loader(loadingCount, callback) {
        var _self = this;
        this.callback = callback;
        $("#pageLoading").show();
        _self.loadingCount = _self.allLoadingCount = loadingCount;
        _self._t = window.setInterval(function () {
            $("#pageLoading div").html(parseInt((((_self.allLoadingCount - _self.loadingCount) / _self.allLoadingCount) * 100)) + "%");
            if (_self.loadingCount == 0) {
                _self.end(true);
            }
        }, 50);
    }
    Loader.prototype.loadingCount = 0;
    Loader.prototype.allLoadingCount = 0;
    Loader.prototype.end = function (result) {
        window.clearInterval(this._t);
        $("#pageLoading").fadeOut();
        if (this.callback) this.callback(result ? true : false);
    }
    window.Loader = Loader;
    var isReady = false;
    //window.ready = function () { }
    var obj = {};
    (function () {
        obj.template = { index: 1, name: "默认皮肤", code: "default" }
        obj.webData = {
            userStatusData: { userName: "无法获取", uid: 0, messNum: 0 },
            queryAddress:Global_data.queryAddress,
            RootPath: Global_data.RootPath,
            webSiteCache: Global_data.webSiteCache,
            versionCode: Global_data.versionCode,
            runatMod: Global_data.runatMod,
        };
        //后面都通过obj.us来访问和创建Underscore对象
        //obj.us = global_underscore;
        obj.initHeader = function () { }
        obj.templateList = {};
        obj.templateCallBack = {};
        obj.templateInit = {}
        obj.initTagTemplate = function (tp, masterHtml) {
            var that = this;
            if (masterHtml) obj.masterHtml = masterHtml;
            var masterDiv = $(obj.masterHtml).children("div");
            var _html = "";
            if (!tp.innerHTML) {
                _html = tp.nextSibling.data;
            } else {
                _html = $(tp).html();
            }
            var wrapId = (/^\w+/.exec(_html));
            
            var data = $.toJsonObj((/{(.)*}/.exec(_html.replace(/\n/g, "").replace(/ /g, ""))[0]));
            masterDiv.each(function () {
                if (wrapId == this.id) {
                    //alert($(this).children().html().replace(/\[%/g, '<%').replace(/%]/g, '%>'));
                    //alert($(this).children().html().replace(/\[%/g, '<%').replace(/%]/g, '%>').replace(/&amp;/g, '&'));
                    var compiled = _.template(g.String.zyEnChart($(this).children().html().replace(/\[%/g, '<%').replace(/%]/g, '%>').replace(/&amp;/g, '&')));
                    var result = $(this).children().clone().empty().append(compiled(data));
                    result[0].reRender = function (data,fn) {
                        $(this).empty().append(compiled(data));
                        if (fn) fn.call(this);
                    }
                    $(tp).after(result);
                    obj.templateList[wrapId] = result[0];
                    if (that.templateCallBack[wrapId]) that.templateCallBack[wrapId].call(result[0], data);
                    if (that.templateInit[wrapId]) that.templateInit[wrapId].call(result[0], data);
                    return;
                }
            });
        }
        var _random = obj.webData.webSiteCache ? "?v=" + obj.webData.versionCode + "-" + parseInt(Math.random() * 10000) : "?v=" + obj.webData.versionCode;

        //require(["text!Template/template_options.html"], function (html) {
        //    alert(html);
        //});
        

        var _t = window.setInterval(function () { if (isReady) { if (window.ready) { window.ready(); window.clearInterval(_t); } else { } } }, 10);
        //$.fn.getContent("", obj.webData.RootPath+"Template/_master.html" + _random, {}, function (master_html) {
        //    window.setTimeout(function () {
        //        var masterDiv = $(master_html).children("div");
        //        $("tp").each(function (i, item) {
        //            obj.initTagTemplate(item, master_html);
        //            $(this).remove();
        //        });
        //        masterDiv.remove();
        //        isReady = true;
        //    }, 10);
        //});
        var masterDiv = $(master).children("div");
        $("tp").each(function (i, item) {
            obj.initTagTemplate(item, master);
            $(this).remove();
        });
        masterDiv.remove();
        isReady = true;
        var cssLink = [];
        $("head").find("link").each(function () {
            cssLink.push(this.href);
            $(this).remove();
        });
        $("body").hide();
        g.tool.loadFile.loadCss(obj.webData.queryAddress + obj.webData.RootPath + "Style/g.css" + _random, "globalCss_1");
        g.tool.loadFile.loadCss(obj.webData.queryAddress + obj.webData.RootPath + "Style/index.css" + _random, "globalCss_2");
        g.tool.loadFile.loadCss(obj.webData.queryAddress + obj.webData.RootPath + "Style/main.css" + _random, "globalCss_3");
        g.tool.loadFile.loadCss(obj.webData.queryAddress + obj.webData.RootPath + "Style/m.css" + _random, "globalCss_4");
        //g.tool.loadFile.loadCss(obj.webData.RootPath + "Style/mobilebone.css" + _random, "mobilebone");
        //g.tool.loadFile.loadCss(obj.webData.RootPath + "Style/mobilebone.animate.css" + _random, "mobilebone.animate");
        var ids = 0;
        cssLink.forEach(function (item) {
            ids++;
            g.tool.loadFile.loadCss(item + _random, "pageCss_" + ids);
        });
        //for (var i in cssLink) {
        //    ids++;
        //    g.tool.loadFile.loadCss(cssLink[i] + _random, "pageCss_" + ids);
        //}
        
    })();
    return obj;
});








