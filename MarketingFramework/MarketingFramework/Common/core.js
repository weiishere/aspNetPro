
define(['global', 'initialize', 'underscore', 'mainData', 'marketMod', 'markets'], function (g, initialize, _, mainData, marketMod, markets) {
    window.pageData = {};
    var serverIP = "http://qianbao-m6.cbpmgt.com";
    //var serverIP = "http://172.25.47.49:8080";
    //判断登陆状态
    $.ajax({
        'type': 'GET',
        'url': serverIP + "/p/m/get-user-info/",
        'contentType': 'application/json',
        'data': "",
        'dataType': 'json',
        //'xhrFields': { withCredentials: true },
        'success': function (re) {
            if (re.code == "0") {
                //未登录，需要跳转
                location.href = serverIP + "/p/m/login";
            }
        }, error: function (e) { alert("用户状态数据请求错误~"); }
    });


    var indexModel = {
        entry: function (arg) {
            window.mainUrl = (arg.initialize.webData.queryAddress || arg.global.tool.getRootPath()) + arg.initialize.webData.RootPath;
            var that = this;
            window.ready = function () {
                that.clone = function (obj) {
                    var copy = (obj instanceof Array) ? [] : new obj.constructor();
                    for (attr in obj) {
                        if (!obj.hasOwnProperty(attr)) continue;
                        copy[attr] = (typeof obj[attr] == "object") ? that.clone(obj[attr]) : obj[attr];
                    }
                    return copy;
                }
                that.getMod = function (list, exp, isNew) {
                    var result;
                    for (var i in list) {
                        if (typeof exp == "string") {
                            if (list[i].index == exp) {
                                result = list[i];
                                break;
                            }
                        } else if (typeof exp == "function") {
                            if (exp(i)) {
                                result = list[i];
                                break;
                            }
                        } else {
                            console.log("getMod is error");
                            return false;
                        }
                    }
                    if (isNew) {
                        var _c = that.clone(result)
                        return _c;
                    } else {
                        return result;
                    }
                }
                that.getGuid = function () {
                    var date = new Date();
                    return (that.activeProject.index + "_" + that.activeView.index + "_" + that.activeModel.index + "_" + (date.getTime() + "").substring(9) + parseInt(Math.random() * 10000));
                }

                //加载活动控件
                that.initActiveModle = function () {
                    var _self = this;
                    var resultHtml = "";
                    var guid = _self.activeModel.guid = _self.getGuid();
                    var _init = function () {
                        _self.dragInContainer = null;
                        var _optionsList = [];
                        for (var i = 0; i < _self.activeModel.optionsList.length; i++) {
                            _optionsList.push(_self.getMod(mainData["options"], _self.activeModel.optionsList[i], true));
                        }
                        _self.activeModel.dom = resultHtml;
                        if (_self.activeModel.dom[0]) {
                            _self.activeModel.classList = (!_self.activeModel.dom[0].className ? "" : _self.activeModel.dom[0].className) == "" ? [] : _self.activeModel.dom[0].className.split(" ");
                        }
                        _self.acrtiveMods.push({ model: _self.activeModel, guid: guid, optionsList: _optionsList });
                        _self.refreshOptions(guid, function () { this.activeModel.refreshCallBack(); });
                        _self.activeModsListRander.reRender({ array: _self.acrtiveMods });
                        window.pageData["activeModel"] = _self.activeModel;
                        _self.activeModel.dragCallBack();
                    }

                    if (typeof _self.activeModel.template == "string") {
                        resultHtml = $(_self.activeModel.template).attr({ "guid": guid, m: _self.activeModel.index });
                        if (_self.activeModel.isContainer) { resultHtml.attr("con", "true") }
                        $(_self.activeModel.container).append(resultHtml);
                        _init();
                    } else if (typeof _self.activeModel.template == "object") {
                        require(["text!Template/" + _self.activeModel.template.templateName + ".html?t=" + (parseInt(Math.random() * 10000))], function (master_html) {
                            var compiled = _.template(arg.global.String.zyEnChart(master_html.replace(/\[%/g, '<%').replace(/%]/g, '%>')));
                            resultHtml = $(compiled(_self.activeModel.template.data())).attr({ "guid": guid, m: _self.activeModel.index });
                            if (_self.activeModel.isContainer) { resultHtml.attr("con", "true") }
                            $(_self.activeModel.container).append(resultHtml);
                            _init();
                        });
                    }
                }
                //刷新option
                that.refreshOptions = function (guid, fn) {
                    var _self = this;
                    //var model = _self.activeModel;
                    //alert(model.optionValue);
                    $("#showModelList li").removeClass("showModelList_select");
                    $("#" + guid).addClass("showModelList_select");
                    $("div[guid]").removeClass("boderStress");
                    $("div[guid='" + guid + "']").addClass("boderStress");
                    var model = window.pageData["activeModel"] = _self.activeModel = _self.getMod(_self.acrtiveMods, function (i) {
                        if (_self.acrtiveMods[i].guid == guid) return true; else return false;
                    }, false).model;
                    if (_self.activeModel.isForCode) {
                        $("#ModelCodeTrg").show();
                        $("#ModelCodeEdit").attr("modelguid", guid).find("textarea").val(_self.activeModel.jsCode);
                        //if (_self.activeModel.jsCode == "") $("#ModelCodeEdit").hide(); else $("#ModelCodeEdit").show();
                    } else { $("#ModelCodeTrg,#ModelCodeEdit").hide(); }
                    $("#Modelguid").html(_self.activeModel.guid);
                    $("#modelEditView .editItemWrap").remove();
                    $("#modelEditView").css({ "visibility": "inherit" }).find("legend").html("参数配置-" + model.name);
                    var _options = _self.getMod(_self.acrtiveMods, function (i) {
                        if (_self.acrtiveMods[i].guid == guid) return true; else return false;
                    }, false).optionsList;
                    $("#trg_more").hide();
                    var loadCount = 0;
                    require(["text!Template/" + _self.runatMod.optionsTemplate + ".html"], function (master_html) {
                        for (var i = 0; i < _options.length; i++) {
                            (function (item) {
                                var compiled = _.template(arg.global.String.zyEnChart(master_html.replace(/\[%/g, '<%').replace(/%]/g, '%>')));
                                for (var k = 0; k < _self.activeModel.needfulOptions.length; k++) {
                                    //alert(_self.activeModel.needfulOptions[k] + "---" + item.index);
                                    if (_self.activeModel.needfulOptions[k] == item.index) { item.isNeedful = true; }
                                }
                                resultHtml = $(compiled({ option: item })).attr({ "guid": _self.getGuid() });
                                if (!item.isNeedful) { resultHtml.hide().addClass("moreOption"); $("#trg_more").show(); }
                                item.dom = resultHtml;
                                $("#modelEditView fieldset").append(resultHtml);
                                item.fillValue();
                                item.dom.find("input[role='color'],input[role='fontColor'],input[role='bdColor'],input[role='bgColor']").colorpicker({
                                    fillcolor: true
                                }).bind("blur", function () { window.setTimeout(function () { $("#colorpanel").hide(70); }, 200); });
                                item.dom.find("input[role='bgImg']").each(function () {
                                    $(this).imgUploader({
                                        onProgress: function (readyState, state) {
                                            if (readyState > 3 && state == 200) { $(this).val($(this).val().replace("http:", "")); }
                                        }
                                    });
                                });
                                loadCount++;
                                if (loadCount == _options.length) {
                                    $(document.forms[0]).trigger("submit");
                                    if (fn) fn.call(_self);
                                }
                            })(_options[i]);
                        }
                    });


                }
                //初始化主屏
                //that.initMainScreen = function () {
                //    //初始化主屏model
                //    var _self = this;
                //    _self.activeView = _self.getMod(mainData["views"], "v1", false);
                //    _self.initActiveView();
                //}
                //初始化多页面
                that.initPageModelsData = function (callback) {
                    var _self = this;
                    _self.activeProject.pageModelsData = {};
                    //如果出现重刷新，需要清除掉临时添加的View
                    for (var i in mainData["views"]) {
                        if (mainData["views"][i].isNew) {
                            delete mainData["views"][i];
                        }
                    }
                    var loader = new Loader(_self.activeProject.viewsList.length * 2, callback);
                    _self.activeProject.viewsObjList = [];
                    for (var i = 0; i < _self.activeProject.viewsList.length; i++) {
                        _self.activeProject.viewsObjList.push(_self.getMod(mainData["views"], _self.activeProject.viewsList[i]));
                        (function (v) {
                            _self.activeProject.pageModelsData[v] = { html: "", data: null }
                            require(["text!Template/view/" + v + ".html"], function (html) {
                                _self.activeProject.pageModelsData[v].html = html;
                                loader.loadingCount--;
                                arg.global.tool.loadFile.loadJsAndRun(mainUrl + "Model/" + v + ".js?v=" + arg.initialize.webData.versionCode, function () {
                                    _self.activeProject.pageModelsData[v].data = v_models;
                                    loader.loadingCount--;
                                });
                            });
                        })(_self.activeProject.viewsList[i]);
                    }
                }
                //加载view
                that.initActiveView = function (isReload,callback) {
                    var _self = this;
                    var isReInit = false;
                    if (!_self.activeProject) { isReInit = true; } else {
                        if (_self.activeProject.index != _self.tempActiveProject.index) {
                            isReInit = true;
                        }
                    }
                    if (isReload) { isReInit = true; }
                    var _init = function () {
                        var v_models = _self.activeProject.pageModelsData[_self.activeView.index].data;
                        $(".phoneTitle").html(_self.activeProject.name + "-" + _self.activeView.name + "(" + _self.activeView.index + ")");
                        $("#phoneView").remove();
                        $("#phoneScreen").append(_self.activeProject.pageModelsData[_self.activeView.index].html);
                        window.pageData["activeProject"] = _self.activeProject;
                        window.pageData["activeView"] = _self.activeView;
                        window.pageData["acrtiveMods"] = _self.acrtiveMods = [];
                        for (var i = 0; i < v_models.length; i++) {
                            var m = _self.getMod(mainData["models"], v_models[i].model.index, true);
                            v_models[i].model.dom = $("div[guid='" + v_models[i].guid + "']");
                            for (var j = 0; j < v_models[i].optionsList.length; j++) {
                                var o = _self.getMod(mainData["options"], v_models[i].optionsList[j].index, true);
                                v_models[i].optionsList[j] = $.extend(o, v_models[i].optionsList[j]);
                            }
                            var _model = $.extend(m, v_models[i].model);
                            _self.acrtiveMods.push({ model: _model, guid: v_models[i].guid, optionsList: v_models[i].optionsList });
                            _model.dragCallBack();
                        }
                        _self.activeModsListRander.reRender({ array: _self.acrtiveMods });
                        _self.refreshOptions(v_models[0].guid, function () {
                            this.activeModel.refreshCallBack();
                            if (callback) callback.call(_self);
                        });
                        $("#modelEditView").css({ "visibility": "initial" });
                    }
                    _self.activeProject = _self.tempActiveProject;
                    if (isReInit) {
                        _self.initPageModelsData(function () {
                            //if (_self.runatMod.callback()) _self.runatMod.callback();
                            _init();
                        });
                    } else {
                        _init();
                    }
                }
                //对acrtiveMods进行压缩
                that.pressAcrtiveMods = function (acrtiveMods) {
                    var optionData = arg.global.tool.ObjectClone(acrtiveMods);
                    for (var i = 0; i < optionData.length; i++) {
                        var vs1 = ["guid", "index", "container", "defalutValue", "optionsList", "jsCode", "classList", "javaScriptFrame", "valueForBackToJs"];
                        var vs2 = ["guid", "index", "container", "defalutValue"];
                        for (var key in optionData[i].model) {
                            if (!vs1.isContain(key) || optionData[i].model[key] == "") {
                                delete optionData[i].model[key];
                            }
                        }
                        for (var j = 0; j < optionData[i].optionsList.length; j++) {
                            for (var key in optionData[i].optionsList[j]) {
                                if (!vs2.isContain(key) || optionData[i].optionsList[j][key] == "") {
                                    delete optionData[i].optionsList[j][key];
                                }
                            }
                        }
                    }
                    return optionData;
                }
                that.runatMod;
                that.tempActiveProject;
                that.activeProject;
                that.activeView;
                that.activeModel;


                that.dragInContainer;
                window.pageData["acrtiveMods"] = that.acrtiveMods = [];

                that.projectViewsListCopy;
                that.viewsCopy = arg.global.tool.ObjectClone(mainData["views"]);
                that.pageId = arg.global.tool.getScriptArg("pageId");

                //$.ajax({
                //    'type': 'POST',
                //    'url': serverIP+"/p/m/login",
                //    'contentType': 'application/json',
                //    'data': JSON.stringify({ email: "huangwei10@jd.com", password: "dangerous-123/" }),
                //    'dataType': 'json',
                //    'xhrFields': { withCredentials: true },
                //    'success': function (re) {
                //        if (re.code == "1") {
                //            alert("成功！");
                //        } else {
                //            alert("失败！" + re.msg);
                //        }
                //    }, error: function (e) {
                //        alert("失败，请检查网络状况（" + e.status + "）");
                //    }
                //});

                if (that.pageId) {
                    //获取
                    $.ajax({
                        'type': 'GET',
                        'url': serverIP + "/p/m/edit/" + that.pageId,
                        'contentType': 'application/json',
                        'data': "",
                        'dataType': 'json',
                        'xhrFields': { withCredentials: true },
                        'success': function (re) {
                            if (re.code == "1") {
                                window.pageTitle = re.data.post.title;
                                that.activeProject = eval("(" + re.data.post.config + ")");
                                //默认打开活动下第一个视图
                                that.activeView = that.getMod(mainData["views"], that.activeProject.viewsList[0], false);
                                that.activeProject = $.extend(that.getMod(arg.initialize.webData.moduleList["projects"], that.activeProject.index, true), that.activeProject);
                                arg.initialize.webData.runatMod = that.activeProject.runatMod || "easyPage";
                                //if (that.activeProject.isMultiPage) {
                                //    //以高级模式运行
                                //    arg.initialize.webData.runatMod = "multifunction";
                                //}
                                
                                that.renderData(arg);
                                that.initListeners(arg);
                                $("#" + that.activeProject.index).trigger("click");
                                //可能存在自定义的视图列表，需要首先初始化它们
                                if (that.activeProject.viewsObjList.length != 0) {
                                    that.activeProject.viewsObjList.forEach(function (item) {
                                        mainData["views"][item.index] = new View({ name: item.name, index: item.index, isNew: item.isNew });
                                    });
                                    that.viewsListRander.reRender({ array: that.activeProject.viewsObjList });
                                }

                                that.tempActiveProject = that.activeProject;
                                that.initActiveView(false, function () {
                                    if (that.runatMod.callback) that.runatMod.callback();
                                });
                                
                                $("#" + that.activeView.index).addClass("active");//执行顺序很重要
                            } else {
                                alert("数据初始化失败！" + re.msg);
                            }
                        }, error: function (e) {
                            alert("请求失败，请检查网络状况（" + e.status + "）");
                        }
                    });
                    $("button[role='release']").html("保存");
                    window.releaseUrl = serverIP + "/p/page/preview/" + that.pageId;
                } else {
                    that.renderData(arg);
                    that.initListeners(arg);
                    that.activeView = that.getMod(mainData["views"], "v1", false);
                    that.initActiveView(false, function () {
                        if (that.runatMod.callback) that.runatMod.callback();
                    });
                }
            }
        },
        renderData: function (arg) {
            var _self = this;
            _self.viewsListRander;
            var _runatMod = _self.runatMod = _self.getMod(mainData.runatModes, arg.initialize.webData.runatMod, false);
            for (var i = 0; i < _runatMod.projectHides.length; i++) {
                delete mainData["projects"][_runatMod.projectHides[i]];
            }
            for (var i = 0; i < _runatMod.modelHides.length; i++) {
                delete mainData["models"][_runatMod.modelHides[i]];
            }
            //项目列表
            arg.initialize.templateList["projectList"].reRender({ array: mainData["projects"] });
            //视图列表
            _self.viewsListRander = arg.initialize.templateList["viewsList"];
            //模块列表
            arg.initialize.templateList["modsList"].reRender({ array: mainData["models"] });
            //活动的模块列表
            _self.activeModsListRander = arg.initialize.templateList["activeModsList"];
            $("body").show().find("#headerVersionCode").html(Global_data.versionCode);
            $("#headerRunatMod").html(_runatMod.name);
            _runatMod.action.call(_self);
        },
        initListeners: function (arg) {
            var _self = this;
            var activeEditElem, positionFocus, eventId = 0;
            var isEdie = false;
            $(document.body).delegates({
                '#projectList li': function () {
                    //点击事件
                    _self.tempActiveProject = _self.getMod(mainData["projects"], this.id, false);
                    var _views = [];
                    for (var i = 0; i < _self.tempActiveProject.viewsList.length; i++) {
                        var _view = _self.getMod(mainData["views"], _self.tempActiveProject.viewsList[i]);
                        if (_view === undefined) {
                            //可能出现重刷新，已经清除掉了临时view对象，那么在这里需要对viewlist的项进行相应的删除
                            _self.tempActiveProject.viewsList.removeByIndex(i);
                            _self.tempActiveProject.viewsObjList.removeByIndex(i);
                        } else { _views.push(_view); }
                    }
                    _self.viewsListRander.reRender({ array: _views }, function () { /*$("#projectList li").eq(0).trigger("click");*/ });
                    if (_self.tempActiveProject.index == "p1") {
                        $("#viewListWrap li:last").hide();
                    }
                    //$(".subLeftBar").css("margin-top", (($(window).height() - $(".subLeftBar").height()) / 2));
                },
                '#showModelList1 li': {
                    'dragstart': function (event) { event.originalEvent.dataTransfer.setData("drag_target", event.target.id); }
                },
                "#showModelList li": function () {
                    if ($(this).attr("role") != "add") {
                        //添加控件到主屏
                        _self.refreshOptions(this.id);
                    } else {
                        $.dailog({
                            height: "auto", width: 300, title: "请选择要添加到主屏的控件",
                            callback: function () {
                                var list = $("#showModelList1 nav").clone();
                                var __self = this;
                                this.wrap.empty().append(list).find("li").click(function () {
                                    _self.activeModel = _self.getMod(mainData["models"], this.id, true);
                                    _self.activeModel.container = "#phoneView";
                                    _self.initActiveModle();
                                    __self.close();
                                });
                            }
                        });
                    }
                },
                "#showModelList li span": function () {
                    var _guid = $(this).parent()[0].id;
                    var obj = _self.activeModel = _self.getMod(_self.acrtiveMods, function (i) { if (_self.acrtiveMods[i].guid == _guid) return true; else return false; }, false);
                    _self.activeModel.model.remove();
                    _self.acrtiveMods.remove(obj);
                    $("#modelEditView").css({ "visibility": "hidden" });
                    $("#" + _guid + ",#phoneView div[guid='" + _guid + "']").remove();
                    $(document.forms[0]).trigger("submit");//主要用于更新activeProject.pageModelsData
                    return false;
                },
                '#phoneView': {
                    'drop': function (event) {
                        var that = this;
                        event.preventDefault();
                        _self.activeModel = _self.getMod(mainData["models"], event.originalEvent.dataTransfer.getData("drag_target"), true);
                        _self.activeModel.container = _self.dragInContainer || "#phoneView";
                        _self.initActiveModle();
                    },
                    'dragover': function (event) {
                        event.preventDefault();
                    },
                    'mousemove': function (evert) {
                        if (!$(event.target).attr("guid")) return;
                        if (_self.lastTarget) {
                            if (event.target === _self.lastTarget) {
                                return false;
                            } else {
                                $(_self.lastTarget).removeClass("boderStress");
                            }
                        }
                        _self.lastTarget = event.target;
                        $(event.target).addClass("boderStress");
                    },
                    "mouseout": function () {
                        $(_self.lastTarget).removeClass("boderStress");
                        delete _self.lastTarget;
                    },
                    "scroll": function () {
                        //console.log(20);
                    }
                },
                '#phoneView div[guid][con]': {
                    'dragenter': function (event) {
                        (function (target) {
                            //由于原生要后执行dragleave事件，所以使用时钟将dragleave提前
                            window.setTimeout(function () {
                                _self.dragInContainer = "div[guid='" + $(target).attr("guid") + "']";
                                //console.log("in" + _self.dragInContainer.attr("guid"));
                                $(target).addClass("boderStress");
                            }, 10);
                        })(event.currentTarget);
                        return false;
                    },
                    'dragleave': function (event) {
                        _self.dragInContainer = "#phoneView";
                        //console.log("out" + _self.dragInContainer.attr("guid"));
                        $(event.currentTarget).removeClass("boderStress");
                        return false;
                    }
                },
                '#phoneView div[guid]': function () {
                    _self.refreshOptions($(this).attr("guid"));
                    return false;
                },
                "form": {
                    "submit": function () {
                        var array = [];
                        var _options = _self.getMod(_self.acrtiveMods, function (i) {
                            if (_self.acrtiveMods[i].guid == _self.activeModel.guid) { return true; } else { return false; }
                        }, false).optionsList;
                        for (var i = 0; i < _options.length; i++) {
                            array.push(_options[i].getValue());
                        }
                        //_self.activeModel.dom.empty().removeAttr("style");
                        //_self.activeModel.dom.removeAllClass();
                        if (_self.activeModel.classList != "") {
                            _self.activeModel.dom[0].className = _self.activeModel.classList.join(" ");
                        }
                        $.each(_self.activeModel.dom.children(), function (i, item) {
                            if ($(item).attr("active")) {
                                $(item).remove();
                            }
                        });
                        _self.activeModel.dom.removeAttr("style");
                        var _cb = function () {
                            var _html = $("#phoneView").clone();
                            _self.activeProject.pageModelsData[_self.activeView.index].html = arg.global.String.Trim(_html.prop("outerHTML"));
                            _self.activeProject.pageModelsData[_self.activeView.index].data = _self.pressAcrtiveMods(_self.acrtiveMods);
                        }
                        array.push(_cb);
                        _self.activeModel.setDone.apply(_self.activeModel, array);


                        if (_self.activeModel.isForCode) {
                            if ($("#ModelCodeEdit textarea").val() != "") {
                                _self.activeModel.jsCode = $("#ModelCodeEdit textarea").val();
                            }
                        }
                        if (_self.activeModel.jsCode == "") { $("#ModelCodeEdit textarea").val(""); }
                        _cb();
                        return false;
                    }
                },
                "#operationWrap button": function () {
                    var _button = this;
                    //var mainUrl = arg.global.tool.getRootPath() + arg.initialize.webData.RootPath;
                    switch ($(this).attr("role")) {
                        case "preview":
                            console.log(JSON.stringify(_self.pressAcrtiveMods(_self.acrtiveMods)));
                            if (window.hasOwnProperty("releaseUrl")) {
                                window.open(releaseUrl);
                            } else {
                                $.dailog({
                                    height: "100", width: 300, title: "提示",
                                    callback: function () { this.wrap.empty().append("<div class='tc m-10'>预览之前请先进行保存操作~<span>"); }
                                });
                            }
                            break;
                        case "checkCode":

                            var cssCode = "", htmlCode = "", jsCode = "";
                            //$.fn.getContent("", mainUrl + "Style/m.css", {}, function (style) {
                            //    window.setTimeout(function () {
                            //code += "<style>" + style + "</style>";
                            var count = 0;
                            var makeCode = function (item) {
                                var _html = $(_self.activeProject.pageModelsData[item].html).clone().removeAttr("id");
                                var data = _self.activeProject.pageModelsData[item].data;
                                var pageName = "page_" + item;
                                htmlCode += "<div id=\"" + pageName + "\" class=\"page " + (!_self.activeProject.isMultiPage ? "in" : "out") + "\" role=\"" + (count == 0 ? "homePage" : "subPage") + "\"><content>" + arg.global.String.Trim(_html.prop("outerHTML").replace(/&quot;/g, "'")) + "</content></div>\r\n";
                                var tempMod = [];
                                for (var i = 0; i < data.length; i++) {
                                    var m = _self.getMod(arg.initialize.webData.moduleList["models"], data[i].model.index, true);
                                    var _mod = $.extend(m, data[i].model);
                                    tempMod.push(_mod);
                                    if (_mod.javaScriptFrame) jsCode += _mod.javaScriptFrame + "\r\n";
                                }
                                jsCode += "<script>\r\n";

                                if (_self.activeProject.isMultiPage) { jsCode += "var page_" + item + "= new Page(\"" + pageName + "\",{showBack: function () { \r\n"; }
                                for (var i = 0; i < data.length; i++) {
                                    //console.log(JSON.stringify(data[i].model.index));
                                    //var m = _self.getMod(arg.initialize.webData.moduleList["models"], data[i].model.index, true);
                                    //var _mod = $.extend(m, data[i].model);
                                    var _mod = tempMod[i];
                                    _mod.goCode(cssCode, jsCode, htmlCode);
                                    jsCode += "(function(guid,data){" + _mod.jsCode + " \r\n modelGuids(guid); })('" + _mod.guid + "',eval(\"(" + JSON.stringify(_mod.valueForBackToJs).replace(/\"/g, '\\"') + ")\"));\r\n";
                                }
                                if (_self.activeProject.isMultiPage) { jsCode += "}});\r\n</script>\r\n"; } else { jsCode += "\r\n</script>\r\n"; }
                                count++;
                            }
                            cssCode += "<link href=\"//static.jdpay.com/basic/dist/css/m.css\" rel=\"stylesheet\" />";
                            if (!_self.activeProject.isMultiPage) {
                                jsCode += "<script src=\"//static.jdpay.com/basic/dist/js/m-public/??zepto.min.js,mApp.js,fastclick.js,m.js,share524.js\"></script>\r\n";
                                makeCode(_self.activeView.index);
                            } else {
                                jsCode += "<script src=\"//static.jdpay.com/basic/dist/js/m-public/??zepto.min.js,mobilebone.js,mApp.js,fastclick.js,m.js,share524.js\"></script>\r\n<script>PageCommon.init();</script>\r\n";
                                for (var item in _self.activeProject.pageModelsData) {
                                    makeCode(item);
                                }
                                jsCode += "<script>" + arg.global.tool.writeFunc('marketMod', marketMod, _self.activeProject.resource.marketMod) + "</script>";
                                jsCode += "<script>" + arg.global.tool.writeFunc('markets', markets, _self.activeProject.resource.markets) + "</script>";
                            }
                            if (_self.activeProject.isMultiPage) { jsCode += "<script>Mobilebone.init();</script>"; }
                            if (arg.initialize.webData.runatMod == "singlePage") {
                                //可能还未编辑完就点了生成代码，要去掉mbEditWrap
                                $(htmlCode).find(".mbEditWrap").remove();
                                mbEditWrap = $(htmlCode).html();
                            }
                            window.releaseCode = cssCode + "\r\n" + htmlCode + "\r\n" + jsCode;
                            $("#resultCodeWrap").show().find("#resultCode").val(releaseCode).height($("#resultCode").height());



                            //-------------------------------------------------------------------------------------------------------------------------------
                            return false;
                            //    }, 10);
                            //});

                            break;
                        case "release":
                            //$.ajax({
                            //    'type': 'POST',
                            //    'url': serverIP+"/p/m/login",
                            //    'contentType': 'application/json',
                            //    'data': JSON.stringify({ email: "huangwei10@jd.com", password: "dangerous-123/" }),
                            //    'dataType': 'json',
                            //    'xhrFields': { withCredentials: true },
                            //    'success': function (re) {
                            //        if (re.code == "1") {
                            //            alert("成功！");
                            //        } else {
                            //            alert("失败！" + re.msg);
                            //        }
                            //    }, error: function (e) {
                            //        alert("失败，请检查网络状况（" + e.status + "）");
                            //    }
                            //});
                            var _fn = function (title) {
                                $.dailog({
                                    height: "auto", width: 300, title: "请输入的页面title",
                                    callback: function () {
                                        var __self = this;
                                        this.wrap.empty().append("<div class='inputViewName clear'><input value='" + (title || "演示页") + "' type='text'/><button>确定</button></div>").find("button").click(function () {
                                            var siteCode = "<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0,user-scalable=no\"><title>" + (title || $(".inputViewName input").val()) + "</title></head><body>";
                                            $("#operationWrap button[role='checkCode']").trigger("click");
                                            releaseCode = releaseCode.replace(/\r\n/g, "");
                                            //$(_button).html("发布中");
                                            var buttonText = $(_button).html();
                                            $(_button).html(buttonText + "中..");
                                            _self.activeProject.runatMod = window.location.hash.substring(1) || _self.activeProject.runatMod || "easyPage";
                                            var postData = {
                                                title: __self.wrap.find("input").val(),
                                                //content: siteCode + releaseCode + "</body></html>",
                                                content: siteCode + releaseCode,
                                                config: JSON.stringify(_self.activeProject),
                                                slug: "marketing-tool"
                                            };
                                            //if (_self.pageId) { postData["id"] = _self.pageId; }
                                            $.ajax({
                                                'type': 'POST',
                                                'url': _self.pageId ? (serverIP + "/p/m/edit/" + _self.pageId) : (serverIP + "/p/m/new-draft"),
                                                'contentType': 'application/json',
                                                'data': JSON.stringify(postData),
                                                'dataType': 'json',
                                                //'xhrFields': { withCredentials: true },
                                                'success': function (re) {
                                                    if (re.code == "1") {
                                                        $(_button).html("保存");
                                                        window.pageTitle = postData.title;
                                                        if (!_self.pageId) _self.pageId = re.data.draft._id;
                                                        window.releaseUrl = serverIP + "/p/page/preview/" + _self.pageId; //re.data.draft.pageLink;
                                                        alert("操作成功！");
                                                    } else {
                                                        alert("发布失败！" + re.msg);
                                                    }
                                                    //$(_button).html("发布");
                                                }, error: function (e) {
                                                    alert("发布失败，请检查网络状况（" + e.status + "）");
                                                    $(_button).html(buttonText);
                                                }
                                            });
                                            __self.close();
                                        });
                                    }
                                });

                            }
                            if (_self.pageId) {
                                //更新
                                _fn(pageTitle);
                            } else {
                                //新增
                                _fn();
                            }
                            break;
                        case "reset":
                            _self.initActiveView(true);
                            break;
                    }
                },
                "#ModelCodeTrg": function () {
                    $("#ModelCodeEdit").toggle();
                },
                "#trg_more": function () {
                    $("div.moreOption").toggle("fast");
                },
                "#viewListWrap span": function () {
                    var _vid = $(this).parent()[0].id;
                    _self.activeProject.viewsList.remove(_vid);
                    _self.activeProject.viewsObjList.forEach(function (item) {
                        if (item.index == _vid) { _self.activeProject.viewsObjList.remove(item); }
                    });
                    delete _self.activeProject.pageModelsData[_vid];
                    var _views = [];
                    for (var i = 0; i < _self.activeProject.viewsList.length; i++) {
                        _views.push(_self.getMod(mainData["views"], _self.tempActiveProject.viewsList[i]));
                    }
                    _self.viewsListRander.reRender({ array: _views });
                    return false;
                },
                "#viewListWrap li[id]": function () {
                    _self.activeView = _self.getMod(mainData["views"], this.id, false);
                    _self.initActiveView();
                    $("#viewListWrap li").removeClass("active");
                    $(this).addClass("active");
                },
                "#viewListWrap li:last": function () {
                    if (_self.activeProject.index != _self.tempActiveProject.index) {
                        $("#viewListWrap li:first").trigger("click");
                    }
                    $.dailog({
                        height: "auto", width: 300, title: "请选择或新增到项目的视图",
                        callback: function () {
                            var _html = "";
                            var __self = this;
                            for (var i in _self.viewsCopy) {
                                _html += "<li id=\"" + _self.viewsCopy[i].index + "\"><div><h2>" + _self.viewsCopy[i].name + "</h2></div></li>";
                            }
                            this.wrap.empty().append("<nav><ul>" + _html + "</ul></nav>").find("li").click(function () {
                                //新增view
                                var _this = this;
                                var _fn = function (name) {
                                    var viewIndex = _this.id + "_" + _self.activeProject.viewsList.length;
                                    mainData["views"][viewIndex] = new View({ name: name, index: viewIndex });
                                    _self.activeProject.viewsList.push(viewIndex);
                                    _self.activeProject.viewsObjList.push(mainData["views"][viewIndex]);
                                    var _views = [];
                                    for (var i = 0; i < _self.activeProject.viewsList.length; i++) {
                                        var _view = _self.getMod(mainData["views"], _self.tempActiveProject.viewsList[i]);
                                        if (_view.index == viewIndex) _view.isNew = true;
                                        _views.push(_view);
                                    }
                                    _self.activeProject.pageModelsData[viewIndex] = { html: "", data: null }
                                    var loader = new Loader(2, function (result) {
                                        if (result) {
                                            _self.viewsListRander.reRender({ array: _views });
                                            $("#viewListWrap li").eq(_self.activeProject.viewsList.length - 1).trigger("click");
                                        }
                                    });
                                    //var mainUrl = arg.global.tool.getRootPath() + arg.initialize.webData.RootPath;
                                    //$.fn.getContent("", mainUrl + "Template/view/" + _this.id + ".html?v=" + arg.initialize.webData.versionCode, {}, function (html) {
                                    //    _self.activeProject.pageModelsData[viewIndex].html = html;
                                    //    loader.loadingCount--;
                                    //    arg.global.tool.loadFile.loadJsAndRun(mainUrl + "Model/" + _this.id + ".js?v=" + arg.initialize.webData.versionCode, function () {
                                    //        _self.activeProject.pageModelsData[viewIndex].data = v_models;
                                    //        loader.loadingCount--;
                                    //    });
                                    //}, function () {
                                    //    loader.end();
                                    //});
                                    require(["text!Template/view/" + _this.id + ".html"], function (html) {
                                        _self.activeProject.pageModelsData[viewIndex].html = html;
                                        loader.loadingCount--;
                                        arg.global.tool.loadFile.loadJsAndRun(mainUrl + "Model/" + _this.id + ".js?v=" + arg.initialize.webData.versionCode, function () {
                                            _self.activeProject.pageModelsData[viewIndex].data = v_models;
                                            loader.loadingCount--;
                                        });
                                    });
                                    __self.close();
                                }
                                if (_this.id == "v1") {
                                    __self.close();
                                    $.dailog({
                                        height: "auto", width: 300, title: "请填写视图名称",
                                        callback: function () {
                                            var ___self = this;
                                            this.wrap.empty().append("<div class='inputViewName clear'><input value='新增页' type='text'/><button>确认</button><div>").find("button").click(function () {
                                                ___self.close();
                                                _fn(___self.wrap.find("input").val());
                                            });
                                            ___self.wrap.find("input")[0].select();
                                        }
                                    });
                                } else {
                                    //_fn(_this.innerText + "(新页)");
                                    _fn(_this.innerText);
                                }
                            });
                        }
                    });
                    return false;
                },
                "#phoneView *[edit]": function () {
                    if (isEdie) { alert("对不起，请同时启用一个编辑状态~"); return false; }
                    isEdie = true;
                    var editType = $(this).attr("edit");
                    var position = $(this).position();
                    activeEditElem = this;
                    if (editType === "word") {
                        $("#phoneView").append("<div class='mbEditWrap txteditable' style='left:" + position.left + "px;top:" + position.top + "px;width:" + $(this).width() + "px;height:" + $(this).height() + "px'><input value='" + $(this).html() + "' /></div>").find(".txteditable input")[0].select();
                    } else if (editType === "word&Img") {
                        eventId++;
                        var _h = $(this).height();
                        $("#phoneView").append("<div class='mbEditWrap editable' style='left:" + position.left + "px;top:" + position.top + "px;width:" + $(this).width() + "px;height:" + (_h < 300 ? 300 : _h) + "px;border:solid 1px #ccc'><div tagName='DIV' contenteditable='true' id='editIndex-" + eventId + "'>" + $(this).html() + "</div><div class='bottomButs'><input type='button' name='editIndex-" + eventId + "' value='✔' /><input name='editIndex-" + eventId + "' type='text' /></div></div>").find(".mbEditWrap>div")[0].focus();
                        $(".bottomButs input[type='text']").imgUploader({
                            success: function (url) {
                                if (!positionFocus) { positionFocus = $("#" + this.name)[0]; }
                                if (["div", "span", "p", "section"].indexOf(positionFocus.tagName.toLowerCase()) != -1) {
                                    $(positionFocus).append("<img src='" + url + "'/>");
                                } else {
                                    $(positionFocus).after("<img src='" + url + "'/>");
                                }
                            },onProgress: function (readyState, state) {
                                if (readyState > 3 && state != 200) {  }
                            },
                            btuText: "✚"
                        });
                    }
                    //$(this).html("");
                },
                ".mbEditWrap>input": {  
                    "blur": function () {
                        $(activeEditElem).html($(this).val());
                        $(this).parent().remove();
                        _self.activeProject.pageModelsData[_self.activeView.index].html = $("#phoneView").prop("outerHTML");
                        isEdie = false;
                    }
                },
                ".bottomButs input[type='button']": function () {
                    $(activeEditElem).html($("#" + this.name).html());
                    $(".mbEditWrap").remove();
                    _self.activeProject.pageModelsData[_self.activeView.index].html = $("#phoneView").prop("outerHTML");
                    isEdie = false;
                },
                ".editable div[contenteditable]": function (e) {
                    if (!e) { var e = window.event; }
                    positionFocus = e.target;
                    //positionFocus = window.getSelection().anchorOffset;
                    //console.log(positionFocus);
                }
            });
            $("#projectList li").eq(0).trigger("click");
        }
    } 
    indexModel.entry({ global: g, initialize: initialize });


});

