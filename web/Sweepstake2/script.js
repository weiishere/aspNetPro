
/// <reference path="lufylegend-1.9.11.min.js" />




(function (exp) {
    exp.onresize = function () { LGlobal.resize(); }
    LGlobal.destroy = true; //保证游戏中的不用的对象能够顺利被释放
    //LGlobal.preventDefault = false;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    //全局变量
    (function () {
        exp.baseUrl = "http://10.9.47.24";
        exp.imgData = new Array(
            { name: "buton_go", path: "img/buton_go.png" },
            { name: "main_bg", path: "img/main_bg.png" },
            { name: "zhuanpan", path: "img/zhuanpan.png" },
            { name: "pointer", path: "img/pointer.png" },
            { name: "price_wrap", path: "img/price_wrap.png" },
            { name: "role_button", path: "img/role_button.png" }
        );
    })();
    //工具及扩展
    (function () {
        exp.extend = function () {
            var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target))
                target = {};
            if (length == i) { target = this; --i; }
            for (i = 0; i < length; i++)
                if ((options = arguments[i]) != null)
                    for (var name in options) {
                        var src = target[name], copy = options[name];
                        if (target === copy) continue;
                        if (deep && copy && typeof copy === "object" && !copy.nodeType)
                            target[name] = jQuery.extend(deep,
                            src || (copy.length != null ? [] : {}), copy);
                        else
                            if (copy !== undefined) target[name] = copy;
                    }
            return target;
        };
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
            _sound.load("sound/" + soundRole + (isClearCacheImg ? "?v=" + version : ""));
            _sound.addEventListener(LEvent.COMPLETE, function () {
                if (callBack) callBack.call(_sound);
                if (time != 0) {
                    window.setTimeout(function () { _sound.stop(); }, time);
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
        LTextField.prototype.alignY = function (parent) {
            if (parent) {
                this.y = (parent.getHeight() - this.getHeight()) / 2;
            } else {
                this.y = (LGlobal.height - this.getHeight()) / 2;
            }
        }
        LSprite.prototype.ObjectList = function (typeName) {
            var _arr = new Array();
            for (var i = 0, l = this.childList.length; i < l; i++) {
                var item = this.childList[i];
                if (item.type === typeName) {
                    _arr.push(item);
                }
            }
            return _arr;
        }
        LShape.prototype.relationSprite = null;
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
            var _option = extend({
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
            if (_option.click) {
                _sprite.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                    _option.click.call(_sprite, e);
                });
            }
            if (callBack) {
                callBack.call(_sprite);
            }
            return _sprite;
        }
        exp.createText = function (text, option, callBack) {
            var _option = extend({
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
        Array.prototype.isContain = function (item) {
            var isPass = false;
            //this.forEach(function (e) { if (e == item) { isPass = true; return false; } });//forEach循环无法跳出，暂时弃用
            for (var i = 0; i < this.length; i++) { if (this[i] == item) { isPass = true; break; } }
            return isPass;
        }
        exp.Trip = Trip;
    })();

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
        //LGlobal.setDebug(true);
        //addChild(new FPS());
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    function gameInit(result) {
        //取得图片读取结果
        exp.imglist = result;
        exp.priceWrap = undefined;
        backLayer.die();
        backLayer.removeAllChild();
        backLayer.graphics.drawRect(0, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#ec4f6d");
        backLayer.addChild(createSprite({ image: "main_bg" }));
        //加入转盘
        var zPanWrap = new LSprite(); zPanWrap.y = 515; zPanWrap.x = 327;
        var zPan = createSprite({ image: "zhuanpan" }, function () { zPanWrap.addChild(this); this.x = -this.getWidth() / 2; this.y = -this.getHeight() / 2; });
        
        var isRound = false;
        var pointer = new LButton(new LBitmap(new LBitmapData(imglist["pointer"])), new LBitmap(new LBitmapData(imglist["pointer"])));
        pointer.x = 137; pointer.y = 330;
        pointer.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
            if (isRound) { return false; }
            if (count.text != "0") { count.text = parseInt(count.text) - 1; } else { return false; }

            HybridBridge.getInfo(function (data) {
                var entranceId = getParameterByName("entranceId");
                LAjax.get(baseUrl + "/marketing/lottery/take", { entranceId: entranceId, auth: eval("(" + data + ")").auth }, function (_data) {
                    //alert(JSON.stringify(data));
                    var data = eval("(" + _data + ")");
                    alert(data.code);
                    if (data.code != "A00000") {
                        alert(data.msg);
                    } else {
                        count.text = data.data.voucherInfo.validTimes;
                        if (count.text == "0") { alert("抱歉，您的抽奖机会已经用完"); }
                    }
                });
            });

            zPanWrap.rotate = 0;
            var prizeIndex = 2; isRound = true;
            tweenLite = LTweenLite.to(zPanWrap, 3, {
                rotate: 360 * 3 + (360 / 8) * (prizeIndex - 1) + 23, loop: false, ease: LEasing.Sine.easeInOut, onComplete: function () {
                    LTweenLite.removeAll();
                    isRound = false;
                    priceWrap = showPriceWrap("奖品名称", "2015-11-12");
                    backLayer.addChild(priceWrap);
                    LTweenLite.to(priceWrap, 0.5, {
                        y: 900, loop: false, ease: LEasing.Sine.easeInOut
                    });
                }
            });
        });
        var count = createText("3", { x: 435, y: 780, size: 50, color: "#fee27a" });
        var prizeInfo = createText("阿**获得8.8元现金红包", { x: 220, y: 845, size: 26, color: "#f7b3c0" });
        var showPriceWrap = function (name, time) {
            if (priceWrap) priceWrap.remove();
            var sprite = createSprite({ image: "price_wrap", y: 890 });
            sprite.addChild(createText(name, { x: 140, y: 40, color: "#fee27a", size: 32 }));
            sprite.addChild(createText("领取时间：" + time, { x: 140, y: 88, color: "#fee27a", size: 24 }));
            var buton_go = new LButton(new LBitmap(new LBitmapData(imglist["buton_go"])), new LBitmap(new LBitmapData(imglist["buton_go"])));
            buton_go.x = 420; buton_go.y = 42;
            sprite.addChild(buton_go); sprite.alpha = 1;
            
            return sprite;
        }

        var role_button = new LButton(new LBitmap(new LBitmapData(imglist["role_button"])), new LBitmap(new LBitmapData(imglist["role_button"])));
        role_button.y = 1078; role_button.align();
        role_button.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
            //活动规则
        });

        addChild(zPanWrap);
        addChild(pointer);
        backLayer.addChild(count);
        backLayer.addChild(prizeInfo);
        backLayer.addChild(role_button);

        
        HybridBridge.getInfo(function (data) {
            var entranceId = getParameterByName("entranceId");
            LAjax.get(baseUrl + "/marketing/lottery/show", { entranceId: entranceId, auth: eval("(" + data + ")").auth }, function (_data) {
                //alert(JSON.stringify(data));
                var data = eval("(" + _data + ")");
                alert(data.code);
                if (data.code != "A00000") {
                    alert(data.msg);
                } else {
                    count.text=10;//= data.data.voucherInfo.validTimes;
                    //if (count.text == "0") { alert("抱歉，您的抽奖机会已经用完"); }
                }
            });
        });
    }
    LInit(15, "canvas", 640, 1172, main, LEvent.INIT);
})(window);