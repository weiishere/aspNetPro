
window.pageData = {};

var indexModel = {
    entry: function (arg) {
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
                //return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
                //    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                //    return v.toString(16);
                //});
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
                        _optionsList.push(_self.getMod(arg.initialize.webData.moduleList["options"], _self.activeModel.optionsList[i], true));
                    }
                    _self.activeModel.dom = resultHtml;
                    if (_self.activeModel.dom[0]) {
                        _self.activeModel.classList = (!_self.activeModel.dom[0].className ? "" : _self.activeModel.dom[0].className) == "" ? [] : _self.activeModel.dom[0].className.split(" ");
                    }
                    _self.acrtiveMods.push({ model: _self.activeModel, guid: guid, optionsList: _optionsList });
                    _self.refreshOptions(guid, function () { this.activeModel.refreshCallBack(); });
                    _self.activeModsListRander.reRender({ array: _self.acrtiveMods });
                    _self.activeModel.dragCallBack();
                }

                if (typeof _self.activeModel.template == "string") {
                    resultHtml = $(_self.activeModel.template).attr({ "guid": guid, m: _self.activeModel.index });
                    if (_self.activeModel.isContainer) { resultHtml.attr("con", "true") }
                    $(_self.activeModel.container).append(resultHtml);
                    _init();
                } else if (typeof _self.activeModel.template == "object") {
                    $.fn.getContent("", arg.initialize.webData.RootPath + "Template/" + _self.activeModel.template.templateName + ".html?t=" + (parseInt(Math.random() * 10000)), {}, function (master_html) {
                        window.setTimeout(function () {
                            var compiled = _.template(arg.global.String.zyEnChart(master_html.replace(/\[%/g, '<%').replace(/%]/g, '%>')));
                            resultHtml = $(compiled(_self.activeModel.template.data())).attr({ "guid": guid, m: _self.activeModel.index });
                            if (_self.activeModel.isContainer) { resultHtml.attr("con", "true") }
                            $(_self.activeModel.container).append(resultHtml);
                            //$("#phoneView").append(resultHtml);
                            _init();

                        }, 30);
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
                var model = _self.activeModel = _self.getMod(_self.acrtiveMods, function (i) {
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
                for (var i = 0; i < _options.length; i++) {
                    (function (item) {
                        $.fn.getContent("", arg.initialize.webData.RootPath + "Template/" + _self.runatMod.optionsTemplate + ".html?v=" + arg.initialize.webData.versionCode, {}, function (master_html) {
                            window.setTimeout(function () {
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
                                item.dom.find("input[role='color'],input[role='fontColor'],input[role='bdColor'],input[role='bgColor']").colorpicker({ fillcolor: true });
                                loadCount++;
                                if (loadCount == _options.length) {
                                    if (fn) fn.call(_self);
                                    $(document.forms[0]).trigger("submit");
                                }
                            }, 30);
                        });
                    })(_options[i]);
                }
            }
            that.initMainScreen = function () {
                //初始化主屏model
                var _self = this;
                //_self.activeProject = _self.getMod(arg.initialize.webData.moduleList["projects"], "p1", false);
                _self.activeView = _self.getMod(arg.initialize.webData.moduleList["views"], "v1", false);
                _self.initActiveView();
            }
            //初始化多页面
            that.initPageModelsData = function (callback) {
                var _self = this;
                var mainUrl = arg.global.tool.getRootPath() + arg.initialize.webData.RootPath;
                _self.activeProject.pageModelsData = {};
                //如果出现重刷新，需要清除掉临时添加的View
                for (var i in arg.initialize.webData.moduleList["views"]) {
                    if (arg.initialize.webData.moduleList["views"][i].isNew) {
                        delete arg.initialize.webData.moduleList["views"][i];
                    }
                }
                var loader = new Loader(_self.activeProject.viewsList.length * 2, callback);
                for (var i = 0; i < _self.activeProject.viewsList.length; i++) {
                    (function (v) {
                        _self.activeProject.pageModelsData[v] = { html: "", data: null }
                        $.fn.getContent("", mainUrl + "Template/view/" + v + ".html?v=" + arg.initialize.webData.versionCode, {}, function (html) {
                            window.setTimeout(function () {
                                _self.activeProject.pageModelsData[v].html = html;
                                loader.loadingCount--;
                                arg.global.tool.loadFile.loadJsAndRun(mainUrl + "Model/" + v + ".js?v=" + arg.initialize.webData.versionCode, function () {
                                    _self.activeProject.pageModelsData[v].data = v_models;
                                    loader.loadingCount--;
                                });
                            }, 10);
                        });

                    })(_self.activeProject.viewsList[i]);
                }
            }

            //加载view
            that.initActiveView = function () {
                var _self = this;
                var isReInit = false;
                if (!_self.activeProject) { isReInit = true; } else {
                    if (_self.activeProject.index != _self.tempActiveProject.index) {
                        isReInit = true;
                    }
                }
                var _init = function () {
                    var v_models = _self.activeProject.pageModelsData[_self.activeView.index].data;
                    $(".phoneTitle").html(_self.activeProject.name + "-" + _self.activeView.name + "(" + _self.activeView.index + ")");
                    $("#phoneView").remove();
                    $("#phoneScreen").append(_self.activeProject.pageModelsData[_self.activeView.index].html);
                    window.pageData["activeProject"] = _self.activeProject;
                    window.pageData["acrtiveMods"] = _self.acrtiveMods = [];
                    for (var i = 0; i < v_models.length; i++) {
                        var m = _self.getMod(arg.initialize.webData.moduleList["models"], v_models[i].model.index, true);
                        v_models[i].model.dom = $("div[guid='" + v_models[i].guid + "']");
                        for (var j = 0; j < v_models[i].optionsList.length; j++) {
                            var o = _self.getMod(arg.initialize.webData.moduleList["options"], v_models[i].optionsList[j].index, true);
                            v_models[i].optionsList[j] = $.extend(o, v_models[i].optionsList[j]);
                        }
                        var _model = $.extend(m, v_models[i].model);
                        _self.acrtiveMods.push({ model: _model, guid: v_models[i].guid, optionsList: v_models[i].optionsList });
                        _model.dragCallBack();
                    }
                    _self.activeModsListRander.reRender({ array: _self.acrtiveMods });
                    _self.refreshOptions(v_models[0].guid, function () { this.activeModel.refreshCallBack(); });
                    $("#modelEditView").css({ "visibility": "initial" });
                }
                _self.activeProject = _self.tempActiveProject;
                if (isReInit) {
                    _self.initPageModelsData(function () { _init(); });
                } else {
                    _init();
                }
            }
            that.runatMod;
            that.tempActiveProject;
            that.activeProject;
            that.activeView;
            that.activeModel;
            that.renderData(arg);
            that.initListeners(arg);
            that.dragInContainer;
            window.pageData["acrtiveMods"] = that.acrtiveMods = [];
            that.initMainScreen();
            that.projectViewsListCopy;
            that.viewsCopy = arg.global.tool.ObjectClone(arg.initialize.webData.moduleList["views"]);
            
        }
    },
    renderData: function (arg) {
        var _self = this;
        _self.viewsListRander;
        var _runatMod = _self.runatMod = _self.getMod(arg.initialize.webData.moduleList["runatModes"], arg.initialize.webData.runatMod, false);
        for (var i = 0; i < _runatMod.projectHides.length; i++) {
            delete arg.initialize.webData.moduleList["projects"][_runatMod.projectHides[i]];
        }
        for (var i = 0; i < _runatMod.modelHides.length; i++) {
            delete arg.initialize.webData.moduleList["models"][_runatMod.modelHides[i]];
        }
        //项目列表
        arg.initialize.templateList["projectList"].reRender({ array: arg.initialize.webData.moduleList["projects"] });
        //视图列表
        _self.viewsListRander = arg.initialize.templateList["viewsList"];
        //模块列表
        arg.initialize.templateList["modsList"].reRender({ array: arg.initialize.webData.moduleList["models"] });
        //活动的模块列表
        _self.activeModsListRander = arg.initialize.templateList["activeModsList"];
        $("body").show().find("#headerVersionCode").html(Global_data.versionCode);
        $("#headerRunatMod").html(_runatMod.name);
        _runatMod.action();
    },
    initListeners: function (arg) {
        var _self = this;
        $(document.body).delegates({
            '#projectList li': function () {
                //点击事件
                _self.tempActiveProject = _self.getMod(arg.initialize.webData.moduleList["projects"], this.id, false);
                var _views = [];
                for (var i = 0; i < _self.tempActiveProject.viewsList.length; i++) {
                    var _view = _self.getMod(arg.initialize.webData.moduleList["views"], _self.tempActiveProject.viewsList[i]);
                    //可能出现重刷新，已经清除掉了临时view对象，那么在这里需要对viewlist的项进行相应的删除
                    if (_view === undefined) {
                        _self.tempActiveProject.viewsList.removeByIndex(i);
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
                                _self.activeModel = _self.getMod(arg.initialize.webData.moduleList["models"], this.id, true);
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
                _self.acrtiveMods.remove(obj);
                $("#modelEditView").css({ "visibility": "hidden" });
                $("#" + _guid + ",#phoneView div[guid='" + _guid + "']").remove();
                return false;
            },
            '#phoneView': {
                'drop': function (event) {
                    var that = this;
                    event.preventDefault();
                    _self.activeModel = _self.getMod(arg.initialize.webData.moduleList["models"], event.originalEvent.dataTransfer.getData("drag_target"), true);
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
                        _self.activeProject.pageModelsData[_self.activeView.index].data = _self.acrtiveMods;
                    }
                    array.push(_cb);
                    _self.activeModel.setDone.apply(_self.activeModel, array);

                    if (_self.activeModel.jsCode == "") { $("#ModelCodeEdit textarea").val(""); }
                    if (_self.activeModel.isForCode) {
                        if ($("#ModelCodeEdit textarea").val() != "") {
                            _self.activeModel.jsCode = $("#ModelCodeEdit textarea").val();
                        }
                    }
                    _cb();
                    //console.log(0);
                    return false;
                }
            },
            "#operationWrap button": function () {
                var mainUrl = arg.global.tool.getRootPath() + arg.initialize.webData.RootPath;
                var serverUrl = "//static.jdpay.com/activity/item/MarketingFramework/";
                switch ($(this).attr("role")) {
                    case "preview":
                        var temp = arg.global.tool.ObjectClone(_self.acrtiveMods);
                        for (var i = 0; i < temp.length; i++) {
                            temp[i].model.dom = ""; 
                            for (var j = 0; j < temp[i].optionsList.length; j++) { temp[i].optionsList[j].dom = ""; }
                        }
                        console.log(JSON.stringify(temp));
                        break;
                    case "checkCode":
                        var cssCode = "", htmlCode = "", jsCode = "";
                        //$.fn.getContent("", mainUrl + "Style/m.css", {}, function (style) {
                        //    window.setTimeout(function () {
                        //code += "<style>" + style + "</style>";
                        var count = 0;
                        var makeCode = function (item) {
                            var _html = $(_self.activeProject.pageModelsData[item].html).clone();
                            var data = _self.activeProject.pageModelsData[item].data;
                            var pageName = "page_" + item;
                            htmlCode += "<div id=\"" + pageName + "\" class=\"page " + (count == 0 ? "in" : "out") + "\" role=\"" + (count == 0 ? "homePage" : "subPage") + "\"><content>" + arg.global.String.Trim(_html.prop("outerHTML").replace(/&quot;/g, "'")) + "</content></div>\r\n";
                            //jsCode += "<script src=\"" + mainUrl + "Model/" + _self.activeProject.index + ".js\"></script>\r\n<script>\r\n";
                            for (var i = 0; i < data.length; i++) {
                                if (_mod.javaScriptFrame) jsCode += _mod.javaScriptFrame + "\r\n";
                            }
                            jsCode += "<script>\r\n";
                            jsCode += "var page_" + item + "= new Page(\"" + pageName + "\",{showBack: function () { \r\n";
                            for (var i = 0; i < data.length; i++) {
                                //console.log(JSON.stringify(data[i].model.index));
                                var m = _self.getMod(arg.initialize.webData.moduleList["models"], data[i].model.index, true);
                                var _mod = $.extend(m, data[i].model);
                                
                                _mod.goCode(cssCode, jsCode, htmlCode);
                                jsCode += "(function(guid,data){" + _mod.jsCode + " \r\n modelGuids(guid); })('" + _mod.guid + "',eval(\"(" + JSON.stringify(_mod.valueForBackToJs).replace(/\"/g, '\\"') + ")\"));\r\n";
                            }
                            jsCode += "}});\r\n</script>\r\n";
                            count++;
                        }
                        cssCode += "<link href=\"//static.jdpay.com/basic/dist/css/m.css\" rel=\"stylesheet\" />";
                        jsCode += "<script src=\"//static.jdpay.com/basic/dist/js/m-public/??zepto.min.js,mobilebone.js,mApp.js,fastclick.js,m.js,share.js\"></script>\r\n";

                        if (!_self.activeProject.isMultiPage) {
                            makeCode(_self.activeView.index);
                        } else {
                            for (var item in _self.activeProject.pageModelsData) {
                                makeCode(item);
                            }
                        }
                        jsCode += "<script>Mobilebone.init();</script>";
                        //var _c = arg.global.String.zyDeChart(cssCode + "<br/>" + htmlCode + "<br/>" + jsCode);
                        //_c=_c.replace(/&lt;br\/&gt;/g, "<br/>");
                        var _c = cssCode + "\r\n" + htmlCode + "\r\n" + jsCode;
                        $("#resultCodeWrap").show().find("#resultCode").val(_c).height($("#resultCode").height());

                        //-------------------------------------------------------------------------------------------------------------------------------
                        return false;

                        //    }, 10);
                        //});

                        break;
                    case "reset":
                        _self.initActiveView();
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
                delete _self.activeProject.pageModelsData[_vid];
                var _views = [];
                for (var i = 0; i < _self.activeProject.viewsList.length; i++) {
                    _views.push(_self.getMod(arg.initialize.webData.moduleList["views"], _self.tempActiveProject.viewsList[i]));
                }
                _self.viewsListRander.reRender({ array: _views });
                return false;
            },
            "#viewListWrap li[id]": function () {
                _self.activeView = _self.getMod(arg.initialize.webData.moduleList["views"], this.id, false);
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
                                arg.initialize.webData.moduleList["views"][viewIndex] = new View({ name: name, index: viewIndex });
                                _self.activeProject.viewsList.push(viewIndex);
                                var _views = [];
                                for (var i = 0; i < _self.activeProject.viewsList.length; i++) {
                                    var _view = _self.getMod(arg.initialize.webData.moduleList["views"], _self.tempActiveProject.viewsList[i]);
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
                                var mainUrl = arg.global.tool.getRootPath() + arg.initialize.webData.RootPath;
                                $.fn.getContent("", mainUrl + "Template/view/" + _this.id + ".html?v=" + arg.initialize.webData.versionCode, {}, function (html) {
                                    _self.activeProject.pageModelsData[viewIndex].html = html;
                                    loader.loadingCount--;
                                    arg.global.tool.loadFile.loadJsAndRun(mainUrl + "Model/" + _this.id + ".js?v=" + arg.initialize.webData.versionCode, function () {
                                        _self.activeProject.pageModelsData[viewIndex].data = v_models;
                                        loader.loadingCount--;
                                    });
                                }, function () {
                                    loader.end();
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
            }
        });
        $("#projectList li").eq(0).trigger("click");
    }
}
function init(arg) { indexModel.entry(arg); }