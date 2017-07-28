(function (exp) {
    exp.onresize = function () { LGlobal.resize(); }
    LGlobal.destroy = true; //保证游戏中的不用的对象能够顺利被释放
    //LGlobal.preventDefault = false;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;

    //全局变量
    (function () {
        exp.backLayer;
        exp.black_bg;
        exp.passengerLayer;
        exp.activePassenger = undefined;
        exp._con_x;
        exp._con_y;
        exp.stairs_1;
        exp.stairs_2;
        exp.game_1_time = 0;
        exp.game_1_scorePanel;
        exp.game_1_score = 0;
        exp.game_2_score = 0;
        exp.game_1_timer;
        exp.metro;
        exp.thisGameIndex = 1;
        isLoad_1 = true;
        isLoad_2 = true;
        exp.input_userName = undefined;
        exp.input_userPhone = undefined;
        exp._hard;
        exp.isRuning = false;
        exp.isClearCacheImg = true;
        exp.version = "v2.41";
        exp.gameRole = " 一、怎么玩：\n1.站务员角色体验：\n①将下车携带大型行李、携带小孩、行动不方便的乘客引领到垂直电梯内；\n②将下车的普通乘客引领到手扶梯和楼梯上；\n③将等待上车的乘客引领到准备出发的列车内；\n④每一关卡玩家将所有乘客引领到正确的位置才可通关；\n⑤随着关卡难度增加，每一关卡规定的时间将逐渐缩短；\n★游戏通关得分：每通过一关卡获得1000得分，没有在规定时间内顺利通关不得分；\n2.列车司机角色体验：\n①列车驶入前响铃提醒（2s），列车从画面下方向上方驶入，玩者点击停止按钮，判断是否将列车头对准铁轨亮灯区域内准确停车，如准确停车，自动进入下一站；\n②随着关卡难度增加，列车进站速度将随之变快；\n★游戏通关得分：每通过一关卡获得1000得分，没有在规定时间内顺利通关不得分； \n二、得分排行榜：\n游戏后台将自动统计每位玩家的累计得分，通过越多得分越高，快来挑战你的4号线体验员吧！\n";
        exp.fwtsWeak = [
            "【港铁（深圳）服务提升】“微笑服务”践行以客为本，提升全员服务水平；“增加站务”助力顺畅通行，体验最佳搭乘感受",
            "【港铁（深圳）服务提升】“增加班次”缩短等候时间，提供便捷地铁生活；“小小站长”协助社区建设，安全文明从小做起。"
        ];//服务提升文案


        

        //乘务员游戏数据
        exp.levelIndex = 0;
        exp.gameLevelData = eval(document.forms[0].stationData.value);
        //[
        //{ time: 35, out_person: 4, into_person:4 },
        //{ time: 30, out_person: 4, into_person: 4 },
        //{ time: 25, out_person: 4, into_person: 4 },
        //{ time: 20, out_person: 10, into_person: 6 },
        //{ time: 15, out_person: 10, into_person: 6 },
        //{ time: 10, out_person: 10, into_person: 6 }
        //];
        //列车游戏数据
        exp.levelIndex2 = 0;
        exp.gameLevelData2 = eval(document.forms[0].levelData.value);
        //    [
        //    { speed: 20, acc: 2.5, name: "清湖1" },
        //    { speed: 25, acc: 2.5, name: "清湖2" },
        //    { speed: 30, acc: 2.5, name: "清湖3" },
        //    { speed: 35, acc: 2.5, name: "清湖4" },
        //    { speed: 40, acc: 2.5, name: "清湖5" },
        //    { speed: 45, acc: 2.5, name: "清湖6" }
        //];
        //排行列表数据
        exp.qeueuList = eval(document.forms[0].rankingData.value);
        //    [
        //    { name: "第一名", score: 451104445, index: 1 },
        //    { name: "第二名", score: 451104446, index: 2 },
        //    { name: "第三名", score: 451104447, index: 3 },
        //    { name: "第四名", score: 451104448, index: 4 },
        //    { name: "第五名", score: 451104449, index: 5 },
        //    { name: "第六名", score: 451104450, index: 6 },
        //];
        //当前玩家数据
        exp.userInfo = null;//{ sex: 1, name: "豆豆子", openId: "", score: 10000, index: 28, isFristLogin: true, isNew: true }
        
        exp.imgData = new Array(
            //{ name: "bg_sound", path: "sound/bg_sound.mp3" },
            { name: "game_over", path: "sound/game_over.mp3",type:"sound" },
            { name: "open", path: "sound/open.mp3", type: "sound" },
            { name: "train_come", path: "sound/train_come.mp3", type: "sound" },

            { name: "gameBg1_demo", path: "img/gameBg1_demo.png" },
            { name: "gameBg2_demo", path: "img/gameBg2_demo.png" },

            { name: "wjxx", path: "img/text/wjxx.png" },
            { name: "dialog_0", path: "img/dialog/dialog_0.png" },
            { name: "dialog_1", path: "img/dialog/dialog_1.png" },
            { name: "dialog_2", path: "img/dialog/dialog_2.png" },
            { name: "dialog_3", path: "img/dialog/dialog_3.png" },
            { name: "dialog_4", path: "img/dialog/dialog_4.png" },
            { name: "dialog_5", path: "img/dialog/dialog_5.png" },
            { name: "dialog_6", path: "img/dialog/dialog_6.png" },
            { name: "dialog_7", path: "img/dialog/dialog_7.png" },

            { name: "but_start", path: "img/button/but_start.png" },
            { name: "but_again", path: "img/button/but_again.png" },
            { name: "but_enter", path: "img/button/but_enter.png" },
            { name: "but_know", path: "img/button/but_know.png" },
            { name: "but_look-help", path: "img/button/but_look-help.png" },
            { name: "but_look", path: "img/button/but_look.png" },
            { name: "but_sure", path: "img/button/but_sure.png" },

            { name: "input", path: "img/input.png" },
        { name: "stopArea", path: "img/stopArea.png" },
        { name: "btu_dialog", path: "img/btu_dialog.png" },
        { name: "hard", path: "img/hard.png" },
        { name: "stopLine", path: "img/stopLine.png" },
        { name: "myIndexWrap", path: "img/myIndexWrap.png" },
        { name: "Button_close", path: "img/Button_close.png" },
        { name: "qlist_bg", path: "img/qlist_bg.png" },
        { name: "button_endGame", path: "img/Button_endGame.png" },
        { name: "button_reStart", path: "img/Button_reStart.png" },
        { name: "button_share", path: "img/Button_share.png" },
        { name: "Button_join", path: "img/Button_join.png" },

        { name: "stionName", path: "img/stionName.png" },
        { name: "but_brake_1", path: "img/but_brake_1.png" },
        { name: "but_brake_2", path: "img/but_brake_2.png" },
        { name: "rainWay_bg", path: "img/rainWay_bg.png" },
        { name: "over_bg", path: "img/over_bg.png" },

        { name: "number2_0", path: "img/number/number2_0.png" },
        { name: "number2_1", path: "img/number/number2_1.png" },
        { name: "number2_2", path: "img/number/number2_2.png" },
        { name: "number2_3", path: "img/number/number2_3.png" },
        { name: "number2_4", path: "img/number/number2_4.png" },
        { name: "number2_5", path: "img/number/number2_5.png" },
        { name: "number2_6", path: "img/number/number2_6.png" },
        { name: "number2_7", path: "img/number/number2_7.png" },
        { name: "number2_8", path: "img/number/number2_8.png" },
        { name: "number2_9", path: "img/number/number2_9.png" },

        { name: "number1_0", path: "img/number/number1_0.png" },
        { name: "number1_1", path: "img/number/number1_1.png" },
        { name: "number1_2", path: "img/number/number1_2.png" },
        { name: "number1_3", path: "img/number/number1_3.png" },
        { name: "number1_4", path: "img/number/number1_4.png" },
        { name: "number1_5", path: "img/number/number1_5.png" },
        { name: "number1_6", path: "img/number/number1_6.png" },
        { name: "number1_7", path: "img/number/number1_7.png" },
        { name: "number1_8", path: "img/number/number1_8.png" },
        { name: "number1_9", path: "img/number/number1_9.png" },

        { name: "passenger_1", path: "img/passenger/1.png" },
        { name: "passenger_2", path: "img/passenger/2.png" },
        { name: "passenger_3", path: "img/passenger/3.png" },
        { name: "passenger_4", path: "img/passenger/4.png" },
        { name: "passenger_5", path: "img/passenger/5.png" },
        { name: "passenger_6", path: "img/passenger/6.png" },
        { name: "passenger_7", path: "img/passenger/7.png" },
        { name: "passenger_8", path: "img/passenger/8.png" },
        { name: "passenger_9", path: "img/passenger/9.png" },

        { name: "stairs_1", path: "img/stairs_1.png" },
        { name: "stairs_2", path: "img/stairs_2.png" },
        { name: "stairs_3", path: "img/stairs_3.png" },

        { name: "train_body", path: "img/train_body.png" },
        { name: "train_head", path: "img/train_head.png" },
        { name: "game_1_header", path: "img/game_1_header.png" },
        //{ name: "btu_play", path: "img/btu_play.png" },
        { name: "game_1_bg", path: "img/game_1_bg.png" },
        { name: "game_hader_1_1", path: "img/game_hader_1_1.png" },
        //{ name: "game_hader_1_2", path: "img/game_hader_1_2.png" },
        { name: "game_hader_2_1", path: "img/game_hader_2_1.png" },
        //{ name: "game_hader_2_2", path: "img/game_hader_2_2.png" },
        { name: "ys_btu", path: "img/ys_btu.png" },
        { name: "help_btu", path: "img/help_btu.png" },
        { name: "zs_header_bg", path: "img/zs_header_bg.png" },
        { name: "zs_header_1", path: "img/zs_header_1.png" },
        { name: "mb_bg", path: "img/mb_bg.png" },
        { name: "dialog_header_1", path: "img/dialog_header_2.png" },
        { name: "dialog_header_2", path: "img/dialog_header_2.png" },
        { name: "dialog2", path: "img/dialog2.png" },
        { name: "dialog", path: "img/dialog.png" },
        { name: "init_bg", path: "img/init_bg.png" },
        { name: "start_footer", path: "img/start_footer.png" },
        { name: "start", path: "img/start.png" },
        { name: "weibo", path: "img/Button-micro-blog.png" },
        { name: "weixin", path: "img/Button-micro-channel.png" });
        if (isClearCacheImg) {
            for (var i = 0; i < imgData.length; i++) {
                if (imgData[i].type) { continue; }
                imgData[i].path = imgData[i].path + "?v=" + version;// + $.now();
            }
        }
        
    })();
    //工具以及扩展
    (function () {
        jQuery.extend({ evalJSON: function (strJson) { return eval("(" + strJson + ")"); } });
        jQuery.extend(
        {
            toJSON: function (object) {
                var type = typeof object;
                if ('object' == type) {
                    if (Array == object.constructor) type = 'array';
                    else if (RegExp == object.constructor) type = 'regexp';
                    else type = 'object';
                }
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
                }) + '"';
                        break;
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
        jQuery.extend({ isEmptyObject: function (obj) { for (var name in obj) { return false; } return true; } });
        //获取随机数
        exp.getRedom = function (minNum, maxNum) {
            switch (arguments.length) {
                case 1: return parseInt(Math.random() * minNum + 1);
                case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
                default: return 0;
            }
        }
        exp.playSound = function (soundRole, time, callBack) {
            var _sound = new LSound();
            _sound.load("sound/" + soundRole);
            _sound.addEventListener(LEvent.COMPLETE, function () {
                //backLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
                //    sound.play();
                //});
                if (callBack) callBack.call(_sound);
                if (time != 0) {
                    window.setTimeout(function () {
                        _sound.stop();
                    }, time);
                }
            });
        }
        //居中
        LTextField.prototype.align = function (parent) {
            if (parent) {
                this.x = (parent.getWidth() - this.getWidth()) / 2;
            } else {
                this.x = (LGlobal.width - this.getWidth()) / 2;
            }
        }
        LSprite.prototype.align = function (parent) {
            if (parent) {
                this.x = (parent.getWidth() - this.getWidth()) / 2;
            } else {
                this.x = (LGlobal.width - this.getWidth()) / 2;
            }
        }
        LSprite.prototype.isActive = false;
        LSprite.prototype.alignY = function (parent) {
            if (parent) {
                this.y = (parent.getHeight() - this.getHeight()) / 2;
            } else {
                this.y = (LGlobal.height - this.getHeight()) / 2;
            }
        }
        //居中
        //加入层
        exp.createSprite = function (option, callBack) {
            if (typeof option == "function") {
                var _sprite = new LSprite();
                option.call(_sprite);
                return _sprite;
            }
            var _option = $.extend({
                x: 0,
                y: 0,
                image: "",
                click: undefined,
            }, option || {});
            var _sprite = new LSprite();
            _sprite.x = _option.x;
            _sprite.y = _option.y;
            if (_option.image != "") {
                var bitmap = new LBitmap(new LBitmapData(imglist[_option.image]));
                _sprite.addChild(bitmap);
            }
            _sprite.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                if (_option.click) { _option.click.call(_sprite, e); }
            });
            if (callBack) {
                callBack.call(_sprite);
            }
            return _sprite;
        }
        exp.createText = function (text, option, callBack) {
            var _option = $.extend({
                x: 0,
                y: 0,
                color: "#ae7318",
                size: 20
            }, option || {});
            var _text = new LTextField();
            _text.text = text;
            _text.size = _option.size;
            _text.color = _option.color;
            _text.y = _option.y;
            _text.x = _option.x;
            if (callBack) { callBack.call(_text); }
            return _text;
        }
        function Trip(text, time) {
            base(this, LSprite, []);
            this.text = text; this.time = time;
            this.setView();
            return this;
        }
        Trip.prototype.setView = function () {
            var _self = this;
            var shape = new LShape();
            var _text = createText(_self.text, { color: "#fff", size: 24 });

            shape.graphics.drawRect(0, "#ff0000", [10, 10, _text.getWidth() + 40, 50], true, "#000000");
            shape.y = 800; _text.y = 820;
            shape.x = (LGlobal.width - shape.getWidth()) / 2;
            _text.x = (LGlobal.width - _text.getWidth()) / 2 + 10;
            _self.addChild(shape);
            _self.addChild(_text);
            _self.close = function () { LTweenLite.to(_self, 0.6, { loop: false, ease: LEasing.Sine.easeOut, alpha: 0, onComplete: function () { _self.remove(); } }); }
            if (_self.time != 0) {
                window.setTimeout(function () {
                    _self.close();
                }, _self.time);
            }
        }
        Trip.prototype.text = "";
        Trip.prototype.time = "";
        Trip.prototype.close = function () { };

        //消息页
        function DialogMode(option, fn) {
            base(this, LSprite, []);
            var _option = $.extend({
                header: 1,
                title: "",
                title2: "",
                text: "",
                size: 24,
                autoHideTime: 2000,
                htmlText: "",
                buttonText: "",
                buttonRole: "sure",
                buttonEvent: function () { return true; },
                heightLevel: 0,
                isCloseBtu: false,
                customeView: null,
                customeButtons: null,//[{role:"look",click:function(){}},{role:"enter",click:function(){}}]
                callback: function () { }
            }, option || {});
            var self = this;
            self.header = _option.header;
            self.title = _option.title;
            self.title2 = _option.title2;
            self.text = _option.text;
            self.htmlText = _option.htmlText;
            self.size = _option.size || 50;
            self.autoHideTime = _option.autoHideTime;
            self.buttonText = _option.buttonText;
            self.buttonRole = _option.buttonRole;
            self.buttonEvent = _option.buttonEvent;
            self.heightLevel = _option.heightLevel;
            self.isCloseBtu = _option.isCloseBtu;
            self.customeView = _option.customeView;
            self.customeButtons = _option.customeButtons;
            self.callback = _option.callback;
            self.setView();
            if (fn) fn.call(self);
        }           
        DialogMode.prototype.setView = function () {
            var self = this;
            self.addChild(createSprite({ image: "mb_bg" }));
            var dialogBg = new LSprite();
            dialogBg.addChild(new LBitmap(new LBitmapData(imglist["dialog_" + self.heightLevel])));
            dialogBg.align(); dialogBg.y = 315;
            if (self.header != 0) {
                var header = new LSprite();
                header.addChild(new LBitmap(new LBitmapData(imglist["dialog_header_" + self.header])));
                header.align(dialogBg);
                header.y = -header.getHeight() / 2 + 20;
                header.x = header.x + 10;
                dialogBg.addChild(header);
            }
            self.dialogBg = dialogBg;
            self.addChild(dialogBg);
            if (!self.customeView) {
                
                var _title1 = self.title.split("\n")[0];
                var _title2 = self.title.split("\n")[1];

                var title = createText(_title1, { x: 54, y: 90, color: "#ae7318", size: self.size }, function () {
                    if (this.getWidth() > dialogBg.getWidth() - 60) {
                        this.setWordWrap(true, 30);
                        this.width = dialogBg.getWidth() - 80; this.x = 40;
                    } else {
                        this.align(dialogBg);
                    }
                });

                if (_title2) {
                    var title2 = createText(_title2, { x: 54, y: 130, color: "#ae7318", size: self.size * 0.9 }, function () {
                        if (this.getWidth() > dialogBg.getWidth() - 60) {
                            this.setWordWrap(true, 30);
                            this.width = dialogBg.getWidth() - 60;
                            this.x = 30;
                        } else {
                            this.align(dialogBg);
                        }
                    });
                    self.title2 = title2;
                    dialogBg.addChild(title2);
                }
                var content2 = new LTextField();
                content2.width = dialogBg.getWidth() - 80;
                if (self.htmlText == "") {
                    content2.setWordWrap(true, 30);
                    content2.text = self.text;
                    content2.size = self.size * 0.8; content2.color = "#ae7318"; content2.x = 40; content2.y = 140;
                } else {
                    content2.setWordWrap(true, 20);
                    content2.htmlText = self.htmlText;
                    content2.color = "#ae7318"; content2.x = 40; content2.y = 140;
                }
                self.title = title;
                self.text = content2;
                //var shadow = new LDropShadowFilter(5, 90, "#000");//d9ac6a
                //content.filters = [shadow];
                dialogBg.addChild(title); dialogBg.addChild(content2);
            } else {
                dialogBg.addChild(self.customeView);
            }
            var closeFn = function () {
                self.remove();
                black_bg.remove();
                if (self.callback) self.callback();
            }
            if (self.isCloseBtu) {
                dialogBg.addChild(createSprite({
                    image: "Button_close", x: dialogBg.getWidth() - 45, y: -5, click: function () { closeFn(); }
                }));
            }

            if (self.autoHideTime == 0) {
                if (!self.customeButtons) {
                    var _button = createSprite({ image: "but_" + self.buttonRole }, function () {
                        var _thisBut = this;
                        this.addChild(createText(self.buttonText, {
                            color: "#fff", size: 24
                        }, function () {
                            this.x = (_thisBut.getWidth() - this.getWidth()) / 2;
                            this.y = (_thisBut.getHeight() - this.getHeight()) / 2;
                        }));
                        this.y = dialogBg.getHeight() - 120;
                        this.align(dialogBg);
                        //if (self.isMoreText) { this.y = 620; } else { this.y = 520; }
                        this.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                            if (self.buttonEvent()) {
                                closeFn();
                            }
                        });
                    });
                    self.button = _button;
                    dialogBg.addChild(_button);
                } else {
                    var _size = self.customeButtons.length;
                    self.buttons = new Array();
                    for (var i = 0; i < _size; i++) {
                        (function (arg) {
                            var _btuItem = self.customeButtons[arg];
                            dialogBg.addChild(createSprite({
                                image: "but_" + _btuItem.role, click: function () { _btuItem.click.call(self); closeFn(); }
                            }, function () {
                                this.y = dialogBg.getHeight() - 100;
                                this.x = (arg * dialogBg.getWidth() / _size) + (dialogBg.getWidth() / (_size * 2) - this.getWidth() / 2);
                                if (arg == 0) { this.x += 20; } else { this.x -= 20; }
                                self.buttons[i] = this;
                            }));
                        })(i);
                    }
                }

            } else {
                var isCall = false;
                window.setTimeout(function () {
                    if (isCall) { return false; }
                    isCall = true;
                    closeFn();
                }, self.autoHideTime);
                self.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                    if (isCall) { return false; } isCall = true;
                    closeFn();
                });
            }
        }
        exp.Trip = Trip;
        exp.DialogMode = DialogMode;
    })();

    if (document.forms[0].userdata.value != "") {
        userInfo = $.evalJSON(document.forms[0].userdata.value);
        userInfo.score = parseInt(userInfo.score);
    }

    var showCount = [1, 2, 3, 4];//登录判断一次0、开始游戏一次1、乘务员游戏2，列车长游戏3
    var isShowLoginInfo = function (index) {
        if (!userInfo.isFristLogin) { return false; }
        if (showCount[index] == 0) {
            return false;
        } else {
            showCount[index] = 0;
            return true;
        }
    }
    var ajaxUpdate = function (obj, callBack, error) {
        var timestamp = $.now();
        if (userInfo.type == "weibo") { obj.weiboId = userInfo.weiboId } else if (userInfo.type == "weixin") { obj.weixinId = userInfo.openId }
        $.ajax({
            url: "http://www.teamotto.net/metro/interface/interface.php?class=user&func=updateUserData",//&token=" + hex_md5(timestamp) + "&time=" + timestamp,
            type: "post",
            dataType: 'json',
            data: obj,
            success: function () { if (callBack) callBack(); },
            error: function () { if (error) error(); }
        });                           
    }
    function main() {
        LSystem.screen(LStage.FULL_SCREEN);
        backLayer = createSprite();
        backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
        //背景显示
        addChild(backLayer);
        loadingLayer = new LoadingSample1();
        backLayer.addChild(loadingLayer);

        LLoadManage.load(imgData, function (progress) {
            loadingLayer.setProgress(progress);
        }, gameInit);
    }
    //读取完所有图片，进行游戏标题画面的初始化工作
    function gameInit(result) {
        //取得图片读取结果
        imglist = result;
        //移除进度条层//移除或者这样写 loadingLayer.remove();
        backLayer.removeChild(loadingLayer);
        //加入欢迎页
        //gameStart(2);
        //return false;
        backLayer.addChild(initPages.indexPage());
        //playSound("bg_sound.mp3", 0, function () { this.play(); });
        black_bg = createSprite({ image: "mb_bg" });
        game_1_scorePanel = new Number(0);
    }
    //加载界面
    var initPages = {
        //未登陆首页
        indexPage: function () {
            if (userInfo != null && userInfo != "" && userInfo != undefined) {
                backLayer.addChild(initPages.initPage());//进入游戏角色选择页
                return false;
            }
            var returnPage = createSprite({ image: "start" });
            //returnPage.addChild(new LBitmap(new LBitmapData(imglist["start"])));
            //var footer = new LBitmap(new LBitmapData(imglist["start_footer"]));
            //footer.y = LGlobal.height - footer.getHeight();
            //footer.x = LGlobal.width - footer.getWidth();
            //returnPage.addChild(initPages.footer());
            //加入按钮
            var button2 = new LButton(new LBitmap(new LBitmapData(imglist["weixin"])), new LBitmap(new LBitmapData(imglist["weixin"])));
            button2.x = 157; button2.y = 810;
            button2.addEventListener(LMouseEvent.MOUSE_UP, function () {
                //微信登录2
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1e725c242109837&redirect_uri=http%3A%2F%2Fwww.teamotto.net%2Fmetro%2Finterface%2Fweixin.php&response_type=code&scope=snsapi_userinfo&state=5608a7632f9e6#wechat_redirect";
                //backLayer.die();
                //backLayer.removeAllChild();
                //backLayer.addChild(initPages.initPage());//进入游戏角色选择页
                ////加入登录提示
                //if (isShowLoginInfo(0)) {
                //    backLayer.addChild(new DialogMode({ title: "每天登录可以得到更多的积分" }));
                //}
            });

            var button1 = new LButton(new LBitmap(new LBitmapData(imglist["weibo"])), new LBitmap(new LBitmapData(imglist["weibo"])));
            button1.x = 315; button1.y = 810;
            button1.addEventListener(LMouseEvent.MOUSE_UP, function () {
                //微博登录1
                location.href = "https://api.weibo.com/oauth2/authorize?client_id=1189697522&response_type=code&redirect_uri=http%3A%2F%2Fwww.teamotto.net%2Fmetro%2Finterface%2Fweibo.php";
                //backLayer.die();
                //backLayer.removeAllChild();
                //backLayer.addChild(initPages.initPage());//进入游戏角色选择页
                ////加入登录提示
                //if (isShowLoginInfo(0)) {
                //    backLayer.addChild(new DialogMode({ title: "每天登录可以得到更多的积分", text: "" }));
                //}
            });
            returnPage.addChild(button1);
            returnPage.addChild(button2);
            return returnPage;
        },
        //已登录首页
        initPage: function () {
            //加载角色选择页面
            var returnPage = createSprite({ image: "init_bg" });
            //returnPage.addChild(initPages.footer());
            //加入左上头像
            exp.zsHeader = createSprite({
                image: "zs_header_bg", x: 20, y: 20, click: function () {
                    backLayer.addChild(initPages.inputInfoPageForInfo(false));
                }
            });
            var _header = createSprite({ image: "zs_header_" + userInfo.sex, y: 7 });
            _header.align(zsHeader);
            zsHeader.addChild(_header);
            returnPage.addChild(zsHeader);

            exp.userNamepanel = createText(userInfo.name, { size: 12, color: "#ae7318", y: 70 }, function () {
                //this.x = (zsHeader.getWidth() - this.getWidth()) / 2;
                this.align(zsHeader);
            });
            zsHeader.addChild(userNamepanel);
            //加上右上按钮
            var ysBtu = createSprite({
                image: "ys_btu", y: 20, click: function () { backLayer.addChild(initPages.queueList()); }
            }, function () {
                this.x = LGlobal.width - this.getWidth() - 20;
            });
            returnPage.addChild(ysBtu);
            var helpBtu = createSprite({
                image: "help_btu", y: 20, click: function () { backLayer.addChild(initPages.gameRolePage()); }
            }, function () {
                this.x = LGlobal.width - this.getWidth() - 80;
            });
            returnPage.addChild(helpBtu);
            //var paihangText = createText("排行榜", { size: 12, color: "#fff", y: 60 }, function () { this.x = (ysBtu.getWidth() - this.getWidth()) / 2; });
            //ysBtu.addChild(paihangText);
            //加入角色选择
            returnPage.addChild(initPages.selectUser());
            //if (isShowLoginInfo(2)) {
            //    _hard = initPages.getHard(370, 480, true);
            //    returnPage.addChild(_hard);
            //}



            //新玩家的话，加入填写玩家数据页
            if (userInfo.isNew) {
                returnPage.addChild(initPages.inputInfoPage());
                return returnPage;
            }
            //如果当天第一次登录且不是新玩家，第一次登录弹窗
            if (isShowLoginInfo(0)) {
                returnPage.addChild(new DialogMode({ title: "每天登录可以得到更多的积分", heightLevel: 3, autoHideTime: 0 }, function () { this.button.y -= 40; }));
            }
            return returnPage;
        },
        //用户信息面板
        customeView: function (isEdit) {
            exp.customeView = createSprite();
            customeView.addChild(createSprite({ image: "input", y: 150, x: 45 }, function () {
                this.addChild(createText("联系人：", { size: 22, x: 30, y: 20 }));
                input_userName = createText("", { size: 22, x: 120, y: 12 });
                if (isEdit) {
                    var inputLayer = new LSprite();
                    inputLayer.graphics.drawRect(1, "#ae7318", [0, 0, 200, 40]);
                    input_userName.setType(LTextFieldType.INPUT, inputLayer);
                }
                this.addChild(input_userName);
            }));
            customeView.addChild(createSprite({ image: "input", y: 220, x: 45 }, function () {
                this.addChild(createText("联系电话：", { size: 22, x: 10, y: 20 }));
                input_userPhone = createText("", { size: 22, x: 120, y: 12 });
                if (isEdit) {
                    var inputLayer = new LSprite();
                    inputLayer.graphics.drawRect(1, "#ae7318", [0, 0, 200, 40]);
                    input_userPhone.setType(LTextFieldType.INPUT, inputLayer);
                }
                this.addChild(input_userPhone);
            }));
        },
        //用户信息填写页
        inputInfoPage: function () {
            initPages.customeView(true);//初始化用户面板
            var returnPage = new DialogMode({
                autoHideTime: 0,
                heightLevel: 6,
                header: 0, 
                customeView: customeView,
                buttonEvent: function () {
                    if (input_userName.text == "" || input_userPhone.text == "") {
                        backLayer.addChild(new DialogMode({ title: "请将联系信息填写完整", header: 0, heightLevel: 2 }));
                        return false;
                    }
                    var regu = /^[1][3,5,7,8][0-9]{9}$/;
                    var re = new RegExp(regu);
                    if (!re.test(input_userPhone.text)) {
                        backLayer.addChild(new DialogMode({ title: "请正确填写手机号码", header: 0, heightLevel: 2 }));
                        return false;
                    }
                    //--------------------------------------------------------------------这里ajax更新数据-----------------------------------------------------------
                    var _trip = new Trip("数据更新中...", 0);
                    backLayer.addChild(_trip);
                    var obj = {};
                    if (input_userName) { obj.name = input_userName.text }
                    if (input_userPhone) { obj.mobile = input_userPhone.text }
                    ajaxUpdate(obj, function () {
                        userInfo.isNew = false; userInfo.isFristLogin = false;
                        userInfo.name = input_userName.text;
                        userInfo.mobile = input_userPhone.text;
                        backLayer.addChild(initPages.inputInfoPageForInfo(true));
                        userNamepanel.text = input_userName.text;
                        userNamepanel.align(zsHeader);
                        _trip.close();
                    }, function () {
                        _trip.close();
                        //backLayer.addChild(initPages.inputInfoPage());
                        backLayer.addChild(new Trip("数据更新失败，请检查网络环境", 2000));
                    });
                    //backLayer.addChild(new DialogMode({ title: "数据更新中...", autoHideTime: 100000, hreder: 0, heightLevel: 1 }, function () {
                    //    var _self = this;
                    //    ajaxUpdate(userInfo.score, function () {
                    //        userInfo.isNew = false; userInfo.isFristLogin = false;
                    //        userInfo.name = input_userName.text;
                    //        userInfo.mobile = input_userPhone.text;
                    //        backLayer.addChild(initPages.inputInfoPageForInfo(true));
                    //        _self.remove();
                    //    });
                    //}));
                    return true;
                }
            }, function () {
                var _self = this;
                this.dialogBg.addChild(createSprite({ image: "wjxx", y: 75 }, function () { this.align(_self.dialogBg); }));
            });
            return returnPage;
        },
        //用户信息展示页
        inputInfoPageForInfo: function (isNotice) {
            initPages.customeView(false);//初始化用户面板
            input_userName.y = 20; input_userName.text = userInfo.name;
            input_userPhone.y = 20; input_userPhone.text = userInfo.mobile;
            var returnPage = new DialogMode({
                autoHideTime: 0,
                heightLevel: 6,
                header: 0,
                isCloseBtu: true,
                customeView: customeView,
                customeButtons: [{
                    role: "look-help", click: function () {
                        //去看看
                        backLayer.addChild(initPages.gameRolePage());
                    }
                }, {
                    role: "enter", click: function () {
                        //进入游戏
                        if (isNotice) backLayer.addChild(new DialogMode({ title: "每天登录可以得到更多的积分", heightLevel: 3, autoHideTime: 0 }, function () { this.button.y -= 40; }));
                    }
                }]
            }, function () {
                var _self = this;
                this.dialogBg.addChild(createSprite({ image: "wjxx", y: 75 }, function () { this.align(_self.dialogBg); }));
            });
            return returnPage;
        },
        //游戏玩法文案弹出层
        gameRolePage: function () {
            var returnPage = new LSprite();
            var scrollView = new LScrollbar(createSprite(function () {
                this.addChild(createText("游戏玩法", { size: 40 }, function () {
                    //this.align(dialogBg);
                    this.x = 130;
                }));
                this.addChild(createText(gameRole, { size: 30, y: 80 }, function () {
                    this.width = 420;
                    this.setWordWrap(true, 40);
                }));
            }), 420, 700, 18);
            scrollView.x = 50; scrollView.y = 60;

            returnPage = new DialogMode({
                heightLevel: 7,
                autoHideTime: 0,
                header: 0,
                buttonRole: "know",
                customeView: scrollView,
                buttonEvent: function () {
                    //如果当天第一次登录且不是新玩家，第一次登录弹窗
                    if (isShowLoginInfo(0)) {
                        backLayer.addChild(new DialogMode({ title: "每天登录可以得到更多的积分", heightLevel: 2 }));
                    }
                    return true;
                }
            }, function () {
                this.dialogBg.y = 40;
                var _con = this.dialogBg.getHeight() - 836;//由于加入scrollView导致高度发生变化，这里要处理一下
                this.button.y += (140 - _con);
            });

            return returnPage;
        },
        //游戏结束页
        overPage: function (thisScore, allTotal, reStart, end, share) {
            playSound("game_over.mp3", 1000, function () { this.play(); });
            var returnPage = createSprite({ image: "over_bg" });
            game_1_score = 0;
            game_2_score = 0;
            //重新开始按钮
            var button_reStart = createSprite({ image: "button_reStart", y: 500 });
            button_reStart.align();
            button_reStart.addEventListener(LMouseEvent.MOUSE_UP, function (e) { gameStart("game", thisGameIndex); if (reStart) reStart(); });
            //结束游戏
            var button_endGame = createSprite({ image: "button_endGame", y: 570 });
            button_endGame.align();
            button_endGame.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                levelIndex = levelIndex2 = 0;//重置游戏关卡数
                backLayer.die();
                backLayer.removeAllChild();
                backLayer.addChild(initPages.initPage());//进入游戏角色选择页
                if (end) end();
            });
            //分享
            var button_share = createSprite({
                image: "button_share", y: 640, click: function () {

                    if (userInfo.type == "weibo") {
                        //新浪分享
                        var title = "4号线大挑战";
                        var url = "http://www.teamotto.net/metro/Game/gangtie.html";
                        var picurl = "http://www.teamotto.net/metro/Game/img/zs_header_1.png";
                        var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
                        window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
                    } else if (userInfo.type == "weixin") {
                        backLayer.addChild(new DialogMode({ title: "微信用户请直接轻击右上角菜单进行分享", header: 0, heightLevel: 2, autoHideTime: 4000 }));
                    }
                }
            });

            


            button_share.align();
            button_share.addEventListener(LMouseEvent.MOUSE_UP, function (e) { if (share) share(); });
            //加入
            var button_join = createSprite({
                image: "Button_join", y: 710, click: function () {
                    backLayer.addChild(new DialogMode({
                        heightLevel: 4,
                        title: "注册加入友你会，乘坐4号线获积分，丰富礼品等您兑换",
                        autoHideTime: 0,
                        header: 0,
                        callback: function () {
                            window.open("https://www.mtrsz.com.cn/members/user/mobileregister");
                        }
                    }, function () { }));
                }
            }, function () { this.align(); });

            //button_join.addEventListener(LMouseEvent.MOUSE_UP, function (e) {  });

            //分数
            var _thisScore = new Number(0, 1, 2); _thisScore.y = 378;
            _thisScore.spacing = 10;
            _thisScore.x = LGlobal.width / 2;
            _thisScore.setNumber(thisScore);
            returnPage.addChild(_thisScore);
            //累计分数
            var _allScore = new Number(0, 1, 2); _allScore.y = 440; 
            _allScore.spacing = 20; _allScore.scaleX = _allScore.scaleY = 0.8;
            _allScore.x = LGlobal.width / 2;
            _allScore.setNumber(allTotal);
            returnPage.addChild(_allScore);

            returnPage.addChild(button_reStart);
            returnPage.addChild(button_endGame);
            returnPage.addChild(button_share);
            returnPage.addChild(button_join);

            if (thisScore != 0) {
                var _trip = new Trip("数据更新中...", 0);
                backLayer.addChild(_trip);
                //userInfo.score = thisScore;
                var obj = {};
                obj.score = parseInt(userInfo.score);
                ajaxUpdate(obj, function () {
                    _trip.close();
                }, function () {
                    _trip.close();
                    backLayer.addChild(new Trip("数据更新失败，请检查网络环境", 2000));
                });
            }
            return returnPage;
        },
        footer: function () {
            var _footer = new LBitmap(new LBitmapData(imglist["start_footer"]));
            _footer.y = LGlobal.height - _footer.getHeight();
            _footer.x = LGlobal.width - _footer.getWidth();
            return _footer;
        },
        //角色选择页
        selectUser: function () {
            var returnPage = new LSprite();
            //var button1 = createSprite({ image: "btu_play", y: 225 });
            //var button2 = createSprite({ image: "btu_play", y: 225 });
            var header_1 = createSprite({
                image: "game_hader_1_1", y: 225, x: 60, click: function (e) { backLayer.addChild(initPages.teachPage(1)); }
            }, function () {
                var _self = this;
                //_self.addChild(button1);
                //button1.align(_self);
                returnPage.addChild(_self);
            });
            var header_2 = createSprite({
                image: "game_hader_2_1", y: 225, x: 290, click: function (e) { backLayer.addChild(initPages.teachPage(2)); }
            }, function () {
                var _self = this;
                //_self.addChild(button2);
                //button2.align(_self);
                returnPage.addChild(_self);
            });
            return returnPage;
        },
        //是否查看教程页
        teachPage: function (gameIndex) {
            var returnPage = new DialogMode({
                heightLevel: 3,
                autoHideTime: 0,
                header: 0,
                //customeView: (createSprite({ image: "hard" }, function () {})),
                customeView: (createText("查看游戏示范教程", { size: 40, y: 60 }, function () {
                    //this.x = 60;
                    this.align(); this.x -= 40;
                })),
                customeButtons: [{
                    role: "look", click: function () {
                        //去看看
                        gameStart("teach", gameIndex);
                    }
                }, {
                    role: "start", click: function () {
                        //进入游戏
                        gameStart("game", gameIndex);
                    }
                }]
            }, function () { });
            return returnPage;
        },  
        //排行榜
        queueList: function () {
            var returnPage = createSprite({ image: "qlist_bg" });
            //returnPage.addChild(new LBitmap(new LBitmapData(imglist["qlist_bg"])));
            //加入关闭叉叉
            var close_btu = createSprite({ image: "Button_close", x: 480, y: 78, click: function () { returnPage.remove(); } });
            returnPage.addChild(close_btu);
            //加入列表
            for (var i = 0; i < qeueuList.length; i++) {
                var _item = qeueuList[i];
                var _itemLayer = new LSprite();
                _item.name = _item.name.length >= 7 ? _item.name.substring(0, 7)+"..." : _item.name;
                _itemLayer.addChild(createText(_item.name, { size: 18, color: "#fd8a02", y: 30, x: 180 }));
                _itemLayer.addChild(createText(_item.score, { size: 20, y: 30, x: 320 }, function () { this.color = (i < 3 ? "#fd8a02" : "#d9ac6a"); }));
                _itemLayer.y = i * 76.5 + 228;
                returnPage.addChild(_itemLayer);
            }
            var MyItemLayer = createSprite({
                y: 765
            }, function () {
                this.addChild(createText(userInfo.name, { size: 18, color: "#fd8a02", y: 30, x: 180 }));
                this.addChild(createText(userInfo.score, { size: 20, color: "#d9ac6a", y: 30, x: 320 }));
                var myIndexWrap = createSprite({ image: "myIndexWrap", x: 396, y: 25 }, function () {
                    this.addChild(createText(userInfo.rank, { size: 16, color: "#ffffff", y: 6 }, function () { this.x = (this.getWidth() - this.getWidth()) / 2 + 4; }));
                });
                this.addChild(myIndexWrap);
            });
            returnPage.addChild(MyItemLayer);
            return returnPage;
        },
        //手势
        getHard: function (x, y, isMove) {
            return createSprite({
                image: "hard", x: x, y: y
            }, function () {
                if (isMove) {
                    var _i = 0; var _is = true;
                    this.addEventListener(LEvent.ENTER_FRAME, function (e) {
                        _i++;
                        if (_i % 5 == 0) { if (_is) { e.x += 5; e.y += 5; _is = false; } else { e.x -= 5; e.y -= 5; _is = true; } }
                    });
                }
            });
        }
    }
    function GameObject(runType, gameName) {
        var self = this;
        backLayer.die();
        backLayer.removeAllChild();
        this.gameName = gameName;
        this.runType = runType;
        self.initView();
    }
    GameObject.prototype.gameName = "";
    GameObject.prototype.initGameData = {};//数据集
    GameObject.prototype.initView = function () { alert(this.gameName); }//初始化界面
    GameObject.prototype.run = function () { }
    GameObject.prototype.runTeachMode = function () { }
    GameObject.prototype.gameState = function () { }
    GameObject.prototype.train = null;
    GameObject.prototype.runType = "game";
    GameObject.prototype.weakInfo = [];
    GameObject.prototype.getWeakInfoIndex = 1;
    GameObject.prototype.getWeakInfo = function () {
        this.getWeakInfoIndex = this.getWeakInfoIndex == 0 ? 1 : 0;
        return this.weakInfo[this.getWeakInfoIndex];
    }

    function PassengerGame(runType, gameName) { base(this, GameObject, [runType, gameName]); }
    function DriverGame(runType, gameName) { base(this, GameObject, [runType, gameName]); }
    PassengerGame.prototype.initView = function () {
        backLayer.die();
        backLayer.removeAllChild();
        var _self = this;
        //初始化站务员游戏
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["game_1_bg"])));
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["game_1_header"])));
        //加入直达电梯
        stairs_1 = createSprite({ image: "stairs_1", x: 18, y: 112 });
        backLayer.addChild(stairs_1);
        //加入扶梯
        stairs_2 = createSprite({ image: "stairs_2", x: 12, y: 830 });
        backLayer.addChild(stairs_2);
        //加入时间
        game_1_time = new Number(0, 0.75); game_1_time.defaultlength = 4; game_1_time.x = 47; game_1_time.y = 50;
        game_1_time.setNumber(gameLevelData[levelIndex].time);
        backLayer.addChild(game_1_time);
        game_1_scorePanel = new Number(0); game_1_scorePanel.defaultlength = 5; game_1_scorePanel.x = 158; game_1_scorePanel.y = 31; game_1_scorePanel.spacing = 27;
        game_1_scorePanel.setNumber(game_1_score);
        backLayer.addChild(game_1_scorePanel);
        //列车
        this.train = createSprite(function () {
            var _train = this;
            var train_head = createSprite({ image: "train_head" });
            var train_body = createSprite({ image: "train_body" }, function () { this.y = train_head.getHeight(); });
            _train.addChild(train_head);
            _train.addChild(train_body);
            _train.x = LGlobal.width - _train.getWidth() - 20;
            _train.y = LGlobal.height;
            LTweenLite.to(_train, 1.5, {
                loop: false, ease: LEasing.Sine.easeOut, y: 126, onComplete: function () {
                    playSound("open.mp3", 1000, function () {
                        this.play();
                        window.setTimeout(function () {
                            if (_self.runType == "game") {
                                //加入出站乘客
                                var pcount = 0;
                                var ptimer = window.setInterval(function () {
                                    if (pcount == gameLevelData[levelIndex].out_person) { window.clearInterval(ptimer); return false; }
                                    pcount++;
                                    var passenger = new Passenger(getRedom(1, 2) == 1 ? "sp" : "nor");
                                    passenger.way = "out";
                                    passenger.bitmap.rotate = -90;
                                    passenger.x += (pcount / 2) * 20;
                                    if (pcount % 2 == 0) {
                                        passenger.y = 280;
                                    } else {
                                        passenger.y = 730;
                                    }
                                    passenger.speedX = 2;
                                    passenger.state = "auto";
                                    passengerLayer.addChild(passenger);
                                }, 800);
                            } else if (_self.runType == "teach") { }
                        }, 1500);
                    });
                    
                }
            });
        });
        backLayer.addChild(this.train);
        //加入乘客层
        passengerLayer = new LSprite();
        //加入乘车乘客
        if (_self.runType == "teach") {
            //加入扶梯乘客
            var passenger1 = new Passenger("nor");
            passenger1.x = 300; passenger1.y = 780; passengerLayer.addChild(passenger1); passenger1.rotate = -90;
            //加入垂直电梯乘客
            var passenger2 = new Passenger("sp");
            passenger2.x = 220; passenger2.y = 780; passengerLayer.addChild(passenger2); passenger2.rotate = -90;
            //加入下车乘客
            var passenger3 = new Passenger("sp");
            passenger3.x = 280; passenger3.y = 600; passengerLayer.addChild(passenger3); passenger3.rotate = 90;
        } else if (_self.runType == "game") {
            var y_con = [130, 350, 570, 830], y_index = -1, x_index = 1;
            for (var i = 0; i < gameLevelData[levelIndex].into_person; i++) {
                var passenger = lastPassenger = new Passenger(getRedom(1, 3) == 1 ? "sp" : "nor");
                passenger.way = "in";
                passenger.x = 400;
                passenger.bitmap.rotate = 90;
                y_index++;
                passenger.x -= x_index * 80;
                passenger.y = y_con[y_index];
                if (y_index == 3) { y_index = -1; x_index++; }
                passenger.speedX = getRedom(5, 10) / 10;
                passenger.speedY = getRedom(-10, 10) / 10;
                passengerLayer.addChild(passenger);
            }
        }
        backLayer.addChild(passengerLayer);
    }
    PassengerGame.prototype.run = function () {
        var _self = this;
        //加入拖动--------------------------------------------------------------------------------------------加入拖动
        backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
            if (!activePassenger) return false;
            if (activePassenger.state != "drag") return false;
            activePassenger.x = e.offsetX - activePassenger.getWidth() / 2;
            activePassenger.y = e.offsetY - activePassenger.getHeight() / 2;
            _con_x = e.offsetX;
            _con_y = e.offsetY;
        });
        backLayer.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
            if (!activePassenger) return false;
            var _passenger = activePassenger;
            //拖至电梯
            if (LGlobal.hitTestRect(stairs_1, _passenger)) {
                if (_passenger.way == "in") {
                    _passenger.state = "wrong";//拉到了乘车乘客
                    return true;
                }
                if (_passenger.type == "sp") {
                    _passenger.state = "right";//得分
                } else {
                    _passenger.state = "wrong";//拉错乘客
                }
                return true;
            }
            if (LGlobal.hitTestRect(stairs_2, _passenger)) {
                if (_passenger.way == "in") {
                    _passenger.state = "wrong";//拉到了乘车乘客
                    return true;
                }
                if (_passenger.type == "sp") {
                    _passenger.state = "wrong";//拉错乘客
                } else {
                    _passenger.state = "right"//得分
                }
                return true;
            }
            //拖至列车
            if (LGlobal.hitTestRect(_passenger, _self.train)) {
                if (_passenger.way == "out") {
                    //拉到了乘车乘客
                    _passenger.state = "wrong";//拉错乘客
                } else {
                    _passenger.state = "right"//得分
                }
                return true;
            }
            activePassenger = undefined;
        });
        backLayer.addEventListener(LEvent.ENTER_FRAME, function () {
            for (var item in passengerLayer.childList) {
                if (passengerLayer.childList.hasOwnProperty(item)) { passengerLayer.childList[item].run(); }
            }
        });
        window.setTimeout(function () {
            game_1_timer = window.setInterval(function () {
                var _t = parseInt(game_1_time.value);
                _t -= 1;
                game_1_time.setNumber(_t);
                if (_t == 0) {
                    window.clearInterval(game_1_timer);
                    var _text = _self.getWeakInfo();//levelIndex < 2 ? _self.weakInfo[levelIndex] : _self.weakInfo[getRedom(0, 1)];
                    backLayer.addChild(new DialogMode({
                        title: "对不起，超时啦，游戏结束", heightLevel: 4, text: _text, autoHideTime: 0, callback: function () {
                            backLayer.addChild(initPages.overPage(game_1_score, userInfo.score));
                        }
                    }, function () { this.text.y += 20; this.button.y -= 50; }));
                    return false;
                }
            }, 1000);
        }, 1500);
    }
    PassengerGame.prototype.runTeachMode = function () {
        window.setTimeout(function () {
            //加入手指引导
            var pag1 = passengerLayer.childList[0];
            var pag2 = passengerLayer.childList[1];
            var pag3 = passengerLayer.childList[2];
            var _hard1 = initPages.getHard(pag1.x, pag1.y, false);
            var _hard2 = initPages.getHard(pag2.x, pag2.y, false);
            var _hard3 = initPages.getHard(pag3.x, pag3.y, false);
            backLayer.addChild(_hard1);
            LTweenLite.to(_hard1, 1, {
                x: 60, y: 940, ease: LEasing.Sine.easeOut,
                onStart: function (e) { },
                onComplete: function (e) {
                    //e.x = pag2.x, e.y = pag2.y;
                    backLayer.addChild(new DialogMode({ header: 0, heightLevel: 2, title: "1、将下车的普通乘客引领到手扶梯和楼梯上" }));
                },
                onUpdate: function (e) { pag1.x = _hard1.x; pag1.y = _hard1.y; }
            });
            LTweenLite.to(_hard2, 1, {
                delay: 3, x: 60, y: 210, ease: LEasing.Sine.easeOut,
                onStart: function (e) { backLayer.addChild(_hard2); _hard1.remove(); },
                onComplete: function (e) {
                    //e.remove();
                    //e.x = pag3.x, e.y = pag3.y;
                    backLayer.addChild(new DialogMode({ header: 0, heightLevel: 2, title: "2、将下车携带大型行李、携带小孩、行动不方便的乘客引领到垂直电梯内" }, function () { this.title.y -= 20; }));
                },
                onUpdate: function (e) { pag2.x = _hard2.x; pag2.y = _hard2.y; }
            });
            LTweenLite.to(_hard3, 1, {
                delay: 6, x: 480, y: pag3.y, ease: LEasing.Sine.easeOut,
                onStart: function (e) { backLayer.addChild(_hard3); _hard2.remove(); },
                onComplete: function (e) {
                    //e.remove();
                    backLayer.addChild(new DialogMode({
                        header: 0, heightLevel: 2, title: "3、将等待上车的乘客引领到准备出发的列车内", callback: function () {
                            backLayer.addChild(new DialogMode({
                                autoHideTime: 0, heightLevel: 3, title: "站务员游戏示范演程结束",
                                customeButtons: [{
                                    role: "again", click: function () {
                                        //再看一遍
                                        gameStart("teach", 1);
                                    }
                                }, {
                                    role: "enter", click: function () {
                                        //进入游戏
                                        gameStart("game", 1);
                                    }
                                }]
                            }, function () {
                                this.buttons[0].y -= 60; this.buttons[1].y -= 70;
                            }));
                        }
                    }));
                },
                onUpdate: function (e) { pag3.x = _hard3.x; pag3.y = _hard3.y; }
            });
        }, 1000);
    }
    PassengerGame.prototype.gameState = function () {
        if (passengerLayer.childList.length <= 0) {
            //游戏过关
            backLayer.die();
            window.clearInterval(game_1_timer);
            var _text = this.getWeakInfo();//levelIndex < 2 ? this.weakInfo[levelIndex] : this.weakInfo[getRedom(0, 1)];

            if (levelIndex == gameLevelData.length - 1) {
                backLayer.addChild(new DialogMode({
                    title: "太厉害了，关卡已全部通过，游戏结束", heightLevel: 4, text: _text, autoHideTime: 0, callback: function () {
                        game_1_score += 100;
                        userInfo.score += 100;
                        backLayer.addChild(initPages.overPage(game_1_score, userInfo.score));
                    }
                }, function () { this.text.y += 20; this.button.y -= 50; }));
                return false;
            }
            backLayer.addChild(new DialogMode({
                title: "恭喜通关成功！\n即将进入下一关，下一关速度会更快哦", heightLevel: 5, text: _text, autoHideTime: 0, callback: function () {
                    levelIndex++;
                    game_1_score += 100;
                    userInfo.score += 100;
                    passengerGame.initView();
                    window.setTimeout(function () { passengerGame.run() }, 1500);
                }
            }, function () { this.text.y += 70; this.button.y -= 50; }));
        }
    }
    PassengerGame.prototype.weakInfo =
        [
            "【港铁（深圳）服务提升】“微笑服务”践行以客为本，提升全员服务水平。",
            "【港铁（深圳）服务提升】“增加站务人手”助力顺畅通行，体验最佳搭乘感受",
        ];

    DriverGame.prototype.initView = function () {
        backLayer.die();
        backLayer.removeAllChild();
        var _self = this;
        //列车员游戏
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["rainWay_bg"])));
        //接入停止线
        var stopLine2 = new LBitmap(new LBitmapData(imglist["stopLine"])); stopLine2.x = 220; stopLine2.y = 230;
        exp.stopArea = new LBitmap(new LBitmapData(imglist["stopArea"])); stopArea.x = 220; stopArea.y = 166; stopArea.scaleY = 3.5;
        backLayer.addChild(stopArea);
        //backLayer.addChild(stopLine);
        backLayer.addChild(stopLine2);
        //加入站牌
        var staion = createSprite({ image: "stionName", x: 13 });
        var content = createText(gameLevelData2[levelIndex2].name, { size: 20, color: "#ae7318", y: 30 }, function () {
            staion.addChild(this);
            this.align(staion);
        });
        //content.filters = [shadow];
        game_2_score = 0;
        backLayer.addChild(staion);
        //加入列车
        metro = new Metro();
        metro.y = metro.getHeight();
        metro.speed = gameLevelData2[levelIndex2].speed;
        metro.ACC = gameLevelData2[levelIndex2].acc;
        backLayer.addChild(metro);
        exp.breakTimer;
        //var button02 = new LButton(bitmapUp, bitmapOver); button02.x = (LGlobal.width - button02.getWidth()) / 2;
        var _hear;
        exp.breakButton = createSprite({
            image: "but_brake_1", y: 810, click: function () {
                if (_self.runType == "game") {
                    if (metro.brake) { return false; }
                    window.clearInterval(breakTimer);
                    metro.brake = true;
                    if (_hear) _hear.remove();
                }
            }
        }, function () {
            this.align();
            backLayer.addChild(this);
        });
    }
    DriverGame.prototype.run = function () {
        //火车驶入
        playSound("train_come.mp3", 5000, function () { this.play(); });
        window.setTimeout(function () {
            var breakButtonBitmap_1 = new LBitmap(new LBitmapData(imglist["but_brake_1"]));
            var breakButtonBitmap_2 = new LBitmap(new LBitmapData(imglist["but_brake_2"]));
            var index = 1;
            breakTimer = window.setInterval(function () {
                index = index == 1 ? 2 : 1;
                breakButton.removeAllChild();
                breakButton.addChild(new LBitmap(new LBitmapData(imglist["but_brake_" + index])));
            }, 200);
            backLayer.addEventListener(LEvent.ENTER_FRAME, function () {
                metro.run();
            });
        }, 2000);
    }
    DriverGame.prototype.runTeachMode = function () {
        backLayer.addChild(new DialogMode({
            header: 0, heightLevel: 4, autoHideTime: 0,
            title: "列车驶入前响铃提醒（2s），列车从画面下方向上方驶入，玩者点击停止按钮，判断是否将列车头对准铁轨亮灯区域内准确停车，如准确停车，进入下一站", text: "", buttonEvent: function () {
                var _hear = initPages.getHard(320, 860, false)
                backLayer.addChild(_hear);
                playSound("train_come.mp3", 4000, function () { this.play(); });
                window.setTimeout(function () {
                    //火车驶入
                    
                    var breakButtonBitmap_1 = new LBitmap(new LBitmapData(imglist["but_brake_1"]));
                    var breakButtonBitmap_2 = new LBitmap(new LBitmapData(imglist["but_brake_2"]));
                    var index = 1;
                    breakTimer = window.setInterval(function () {
                        index = index == 1 ? 2 : 1;
                        breakButton.removeAllChild();
                        breakButton.addChild(new LBitmap(new LBitmapData(imglist["but_brake_" + index])));
                    }, 200);
                    backLayer.addEventListener(LEvent.ENTER_FRAME, function () { metro.run(); });
                    metro.addEventListener(LEvent.ENTER_FRAME, function () {
                        if (LGlobal.hitTestRect(metro, stopArea)) {
                            console.log(0);
                            if (metro.brake) { return false; }
                            //metro.ACC = 11;
                            metro.brake = true;
                        }
                    });
                },2000);
                //模拟按钮
                window.setTimeout(function () {
                    _hear.remove();
                    backLayer.addChild(initPages.getHard(320, 860, true));
                    window.clearInterval(breakTimer);
                }, 4200);
                return true;
            }
        }, function () {
            this.title.y -= 20;
            this.button.y += 20;
            //backLayer.addChild(initPages.getHard(320, 320, false));
        }));

    }
    DriverGame.prototype.gameState = function () {
        var _text = this.getWeakInfo();// levelIndex < 2 ? this.weakInfo[levelIndex2] : this.weakInfo[getRedom(0, 1)];
        if (metro.y >= 166 && metro.y <= 300) {
            if (driverGame.runType == "teach") {
                backLayer.addChild(new DialogMode({
                    autoHideTime: 0, heightLevel: 3, title: "列车员游戏示范演程结束",
                    customeButtons: [{
                        role: "again", click: function () {
                            //再看一遍
                            gameStart("teach", 2);
                        }
                    }, {
                        role: "enter", click: function () {
                            //进入游戏
                            gameStart("game", 2);
                        }
                    }]
                }, function () {
                    this.buttons[0].y -= 60; this.buttons[1].y -= 70;
                }));
                return false;
            }
            game_2_score += 100;
            userInfo.score += 100;
            backLayer.addChild(new DialogMode({
                title: "恭喜通关成功！\n即将进入下一关，下一关速度会更快哦", heightLevel: 5, text: _text, autoHideTime: 0, callback: function () {
                    if (levelIndex2 == gameLevelData2.length - 1) {
                        backLayer.addChild(new DialogMode({
                            title: "太厉害了，关卡已全部通过，游戏结束", callback: function () {
                                backLayer.addChild(initPages.overPage(game_2_score, userInfo.score));
                            }
                        }));
                        return false;
                    }
                    levelIndex2++;
                    driverGame.initView();
                    driverGame.run();
                }
            }, function () { this.text.y += 70; this.button.y -= 50; }));
        } else {
            backLayer.addChild(new DialogMode({
                title: "对不起，游戏结束！\n列车未停到位", heightLevel: 4, text: _text, autoHideTime: 0, callback: function () {
                    //backLayer.die();
                    backLayer.addChild(initPages.overPage(game_2_score, userInfo.score));
                }
            }, function () { this.text.y += 30; this.button.y -= 40; }));
        }
    }
    DriverGame.prototype.weakInfo =
        [
            "【港铁（深圳）服务提升】“小小站长”协助社区建设，安全文明从小做起。",
            "【港铁（深圳）服务提升】“增加班次”缩短等候时间，提供便捷地铁生活。",
        ];
    exp.gameStart = function (runType, gameIndex) {
        thisGameIndex = gameIndex;
        var _gameStart = function () {
            backLayer.die();
            backLayer.removeAllChild();
            if (gameIndex == 1) {
                if (runType == "game") {
                    backLayer.addChild(new LBitmap(new LBitmapData(imglist["gameBg1_demo"])));
                    backLayer.addChild(new DialogMode({
                        autoHideTime: 0,
                        isMoreText: true,
                        title: "您即将开启站务员体验之旅！", text: fwtsWeak[0],
                        callback: function () {
                            exp.passengerGame = new PassengerGame(runType, "passengerGame");
                            window.setTimeout(function () {
                                passengerGame.run();
                            }, 1500);
                        }
                    }, function () { this.button.y -= 50; }));
                }
                else if (runType == "teach") {
                    exp.passengerGame = new PassengerGame(runType, "passengerGame");
                    window.setTimeout(function () {
                        passengerGame.runTeachMode();
                    }, 3000);
                }
            } else if (gameIndex == 2) {
                if (runType == "game") {
                    backLayer.addChild(new LBitmap(new LBitmapData(imglist["gameBg2_demo"])));
                    backLayer.addChild(new DialogMode({
                        autoHideTime: 0,
                        isMoreText: true,
                        title: "您即将开启列车长体验之旅！", text: fwtsWeak[1],
                        callback: function () {
                            exp.driverGame = new DriverGame(runType, "driverGame");
                            driverGame.run();
                        }
                    }, function () { this.button.y -= 50; }));
                } else if (runType == "teach") {
                    exp.driverGame = new DriverGame(runType, "driverGame");
                    driverGame.runTeachMode();
                }
            }
        }

        if (runType == "teach") {
            _gameStart();
        } else {
            if ((gameIndex == 1 && isLoad_1 == true) || (gameIndex == 2 && isLoad_2 == true)) {
                $("#loading_" + gameIndex).fadeIn();
                if (gameIndex == 1) { isLoad_1 = false; } else { isLoad_2 = false; }
                window.setTimeout(function () {
                    $("#loading_" + gameIndex).fadeOut();
                    _gameStart();
                }, 1000);
            } else {
                _gameStart();
            }
        }
    }

    //乘客
    function Passenger(type) {
        base(this, LSprite, []);
        var self = this;
        self.type = type;
        self.setView();
    }
    Passenger.prototype.type = 1;
    Passenger.prototype.speedY = 0;
    Passenger.prototype.speedX = 0;
    Passenger.prototype.wayX = "left";
    Passenger.prototype.way = "in";//out
    Passenger.prototype.state = "hold";
    Passenger.prototype.score = 100;
    Passenger.prototype.bitmap;
    Passenger.prototype.setView = function () {
        var self = this; var index = 0;
        if (self.type == "sp") {
            self.score = 200;
            index = getRedom(1, 4);
            if (index == 2) { index = 3; }//不要儿童乘客
        } else {
            self.score = 100;
            index = getRedom(5, 9);
        }
        self.x = 337;
        self.scaleX = self.scaleY = 0.7;
        self.bitmap = new LBitmap(new LBitmapData(imglist["passenger_" + index]));
        self.addChild(self.bitmap);
        self.rotateCenter = false;
        self.bitmap.rotateCenter = false;
        self.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
            self.state = "drag";
            activePassenger = self;
            _con_x = e.offsetX;
            _con_y = e.offsetY;
            activePassenger.x = e.offsetX - activePassenger.getWidth() / 2;
            activePassenger.y = e.offsetY - activePassenger.getHeight() / 2;
            self.bitmap.rotate = 0;//将角度归0，不然会影响碰撞检测
        });
    }
    Passenger.prototype.run = function () {
        var self = this;
        if (self.state == "hold") {
            //self.rotate = -90;
        } else if (self.state == "auto") {
            if (self.way == "in") { return false; }//乘车乘客不动
            if (self.x < 22) {
                self.x = 22; self.speedX = self.speedX * -1; self.wayX = "right"
            }
            if (self.x > 370 - self.getHeight()) {
                self.x = 370 - self.getHeight(); self.speedX = self.speedX * -1; self.wayX = "left";
            }
            if (LGlobal.hitTestRect(stairs_1, self) || LGlobal.hitTestRect(stairs_2, self)) {
                self.x += self.getHeight();
                self.speedX = self.speedX * -1
                self.wayX = "right";
            }

            if (self.wayX == "left") {
                self.bitmap.rotate = -Math.atan(self.speedY / self.speedX) * 180 / Math.PI - 90;
            } else {
                self.bitmap.rotate = -Math.atan(self.speedY / self.speedX) * 180 / Math.PI + 90;
            }
            if (self.y <= 90 || self.y >= LGlobal.height) {
                //乘客走失
                self.remove();
                //gameLevelData[levelIndex].out--;
                window.clearInterval(game_1_timer);
                backLayer.addChild(new DialogMode({
                    title: "对不起，乘客走失..", callback: function () {
                        window.clearInterval(game_1_timer);
                        backLayer.die();
                        backLayer.addChild(initPages.overPage(game_1_score, userInfo.score));
                    }
                }));
                //gameState(1);
            }
            self.x -= self.speedX;
            self.y += self.speedY;
        } else if (self.state == "wrong") {
            var _text = passengerGame.getWeakInfo();// levelIndex < 2 ? passengerGame.weakInfo[levelIndex2] : passengerGame.weakInfo[getRedom(0, 1)];
            window.clearInterval(game_1_timer);
            backLayer.die();
            backLayer.addChild(new DialogMode({
                title: "对不起，游戏结束！\n未将乘客拖动至正确位置", text: _text, autoHideTime: 0, heightLevel: 4, callback: function () {
                    backLayer.die();
                    backLayer.addChild(initPages.overPage(game_1_score, userInfo.score));
                }
            }, function () { this.button.y -= 40; this.text.y += 30; }));
        } else if (self.state == "right") {
            self.state = "hold";
            //game_1_scorePanel.setNumber(parseInt(game_1_scorePanel.value) + self.score);
            LTweenLite.to(self, 0.3, {
                alpha: 0, scaleY: 0, scaleX: 0, onComplete: function () {
                    self.remove();
                    passengerGame.gameState();
                }
            });
        }
    }

    function Metro() {
        base(this, LSprite, []);
        var self = this;
        self.setView();
    }
    Metro.prototype.setView = function () {
        var train = createSprite(function () {
            var train_head = createSprite({ image: "train_head" });
            var train_body = createSprite({ image: "train_body" }, function () { this.y = train_head.getHeight(); });
            var train_body2 = createSprite({ image: "train_body" }, function () { this.y = train_head.getHeight() + train_body.getHeight(); });
            this.addChild(train_head);
            this.addChild(train_body);
            this.addChild(train_body2);
        });
        this.addChild(train);
        this.scaleX = this.scaleY = 0.8;
        this.align();
        this.x += 8;
    }
    Metro.prototype.brake = false;
    Metro.prototype.isStop = false;
    Metro.prototype.ACC = 10;
    Metro.prototype.speed = 100;
    Metro.prototype.run = function () {
        var self = this;
        if (self.speed > 0) {
            self.y -= self.speed;
            if (self.brake == true) {
                self.speed -= self.ACC;
            } else {
                if (self.y < -self.getHeight()) {
                    self.y = self.getHeight();
                    self.speed = 0;
                }
            }
        } else {
            if (self.isStop == false) {
                driverGame.gameState();
                //gameState(2);
                self.isStop = true;
            }
        }
    }

    function Number(num, scale, sharpType) {
        base(this, LSprite, []);
        var self = this;
        self.sharpType = sharpType || "1";
        self.value = num;
        self.scale = scale || 1;
        self.setView(num);
    }
    Number.prototype.value = 0;
    Number.prototype.changeSpeed = 0.1;
    Number.prototype.defaultlength = 0;
    Number.prototype.spacing = 0;//数字间隔
    Number.prototype.scale = 1;//放大倍数
    Number.prototype.sharpType = "1";//数字图形类别
    Number.prototype.singleWidth = 0;
    Number.prototype.setView = function (num) {
        var self = this;
        var digit = (num + "").split("");
        var spriteWrap = new LSprite();
        spriteWrap.x = 0;
        for (var i = 0; i < digit.length; i++) {
            var sprite = new LSprite();
            var num = parseInt(digit[i]);
            sprite.addChild(new LBitmap(new LBitmapData(imglist["number" + self.sharpType + "_" + num])));
            sprite.scaleX = sprite.scaleY = self.scale;
            spriteWrap.y = sprite.getHeight() / 2;
            sprite.y = -sprite.getHeight() / 2;
            sprite.x = self.singleWidth = spriteWrap.getWidth() + self.spacing;//i * (sprite.width * self.scale + self.spacing);
            spriteWrap.addChild(sprite);
            self.addChild(spriteWrap);
        }
    }
    Number.prototype.setNumber = function (num, callBack) {
        var self = this;
        self.value = num;
        if (self.defaultlength != 0) {
            var _t = parseInt(num);
            var returnValue = "";
            var ss = self.defaultlength - (_t + "").length;
            for (var i = 0; i < ss; i++) { returnValue += "0"; }
            returnValue += _t;
            num = returnValue;
        }
        var spriteWrap = self.getChildAt(0);
        LTweenLite.to(spriteWrap, self.changeSpeed, {
            scaleY: 0, onComplete: function () {
                self.removeAllChild();
                self.setView(num);
                spriteWrap = self.getChildAt(0);
                spriteWrap.scaleY = 0;
                LTweenLite.to(spriteWrap, self.changeSpeed, {
                    scaleY: 1, onComplete: function () {
                        if (callBack) callBack.call(self);
                    }
                });
            }
        });
    }
    var loadImages = function (url, callBack) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.onload = function () { img.onload = null; callBack(img); }
        img.src = url;
    }
    init(30, "canvas", 559, 994, function () {
        main();
    });
})(window);