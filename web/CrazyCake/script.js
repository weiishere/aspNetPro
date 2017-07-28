/// <reference path="lufylegend-1.8.6.min.js" />


(function (exp) {
    exp.onresize = function () { LGlobal.resize(); }
    LGlobal.destroy = true; //保证游戏中的不用的对象能够顺利被释放
    //获取随机数
    exp.getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    var backLayer, rabbit, person, cakeLayer, heartLayer, topTimeLayer, sound;
    var dropTimer, gameTimer, speedTimer;
    var personCount = 0;

    var reSetValue = function (_exp) {
        _exp.cakeMap = new HashMap();
        _exp.drop_step = 5;//下落速度
        _exp.dropQuantity = 1500;//每几秒钟下落一个
        _exp.timeGoQuantity = 10000;//没几秒钟加速一次
        _exp.timeBulking = 2;//每次增加的速度增量
        _exp.getCakeCount = 0;
        _exp.lostCakeCount = 0;
        _exp.gameSecond = 0;
        _exp.isStop = false;
        _exp.isSoundLoaded = false;
    }
    reSetValue(exp);
    var levelName = ["静如呆子", "标准手残", "行动迅速", "眼疾手快", "动如脱兔"];
    var imgData = new Array(
        { name: "ready", path: "images/start.jpg" },
        { name: "backBg", path: "images/backBg.png" },
        { name: "rabbit", path: "images/rabbit.png" },
        { name: "cloud", path: "images/cloud.png" },
        { name: "person", path: "images/person.png" },
        { name: "person2", path: "images/person_2.png" },
        { name: "heart", path: "images/heart.png" },
        { name: "cake_1", path: "images/cake_1.png" },
        { name: "cake_2", path: "images/cake_2.png" },
        { name: "cake_3", path: "images/cake_3.png" },
        { name: "cake_4", path: "images/cake_4.png" },
        { name: "cake_5", path: "images/cake_5.png" },
        { name: "cake_6", path: "images/cake_6.png" },
        { name: "cake_7", path: "images/cake_7.png" },
        { name: "cake_8", path: "images/cake_8.png" },
        { name: "zongzi", path: "images/zongzi.png" },
        { name: "tangyuan", path: "images/tangyuan.png" },
        { name: "jiaozi", path: "images/jiaozi.png" },
        { name: "menu", path: "images/menu.png" },
        { name: "reStart", path: "images/reStart.png" },
        { name: "btu_resume", path: "images/btu_resume.png" },
        { name: "btu_restart", path: "images/btu_restart.png" },
        { name: "btu_exit", path: "images/btu_exit.png" },
        { name: "pausePanel", path: "images/pausePanel.png" },
        { name: "btu_pause", path: "images/btu_pause.png" },
        { name: "number1_0", path: "images/number/0.png" },
        { name: "number1_1", path: "images/number/1.png" },
        { name: "number1_2", path: "images/number/2.png" },
        { name: "number1_3", path: "images/number/3.png" },
        { name: "number1_4", path: "images/number/4.png" },
        { name: "number1_5", path: "images/number/5.png" },
        { name: "number1_6", path: "images/number/6.png" },
        { name: "number1_7", path: "images/number/7.png" },
        { name: "number1_8", path: "images/number/8.png" },
        { name: "number1_9", path: "images/number/9.png" },
        { name: "number2_0", path: "images/number2/0.png" },
        { name: "number2_1", path: "images/number2/1.png" },
        { name: "number2_2", path: "images/number2/2.png" },
        { name: "number2_3", path: "images/number2/3.png" },
        { name: "number2_4", path: "images/number2/4.png" },
        { name: "number2_5", path: "images/number2/5.png" },
        { name: "number2_6", path: "images/number2/6.png" },
        { name: "number2_7", path: "images/number2/7.png" },
        { name: "number2_8", path: "images/number2/8.png" },
        { name: "number2_9", path: "images/number2/9.png" },
        { name: "resultTxt_0", path: "images/resultTxt_0.png" },
        { name: "resultTxt_1", path: "images/resultTxt_1.png" },
        { name: "resultTxt_2", path: "images/resultTxt_2.png" },
        { name: "resultTxt_3", path: "images/resultTxt_3.png" },
        { name: "resultTxt_4", path: "images/resultTxt_4.png" },
        { name: "scorePanel", path: "images/scorePanel.png" });

    function main() {
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        LSystem.screen(LStage.FULL_SCREEN);
        backLayer = new LSprite();
        backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
        //var bitmapData = new LBitmapData(imglist["loading"]);
        //背景显示
        addChild(backLayer);
        loadingLayer = new LoadingSample2(50);
        backLayer.addChild(loadingLayer);
        //LAjax.get("../Handler/mainHandler.ashx", { gameIndex: 1, temp: getRedom(1, 100) }, function (data) {
        //    personCount = data;
        //    LLoadManage.load(imgData, function (progress) {
        //        document.getElementById("loadingBg_div").innerHTML = progress + "%";
        //        loadingLayer.setProgress(progress);
        //    }, gameInit);
        //});
        LLoadManage.load(imgData, function (progress) {
            document.getElementById("loadingBg_div").innerHTML = progress + "%";
            loadingLayer.setProgress(progress);
        }, gameInit);
    }
    //读取完所有图片，进行游戏标题画面的初始化工作
    function gameInit(result) {
        //取得图片读取结果
        imglist = result;
        document.getElementById("loadingBg").style.display = "none";
        //移除进度条层//移除或者这样写 loadingLayer.remove();
        backLayer.removeChild(loadingLayer);
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["ready"])));
        //加入玩家次数
        var _textField = initTextField("欢迎你，第" + personCount + "位玩家", "#ffffff", 30, LGlobal.width, 20, true);
        //backLayer.addChild(_textField);//玩家统计
        //添加点击事件，点击画面则游戏开始
        sound = new LSound();
        backLayer.addEventListener(LMouseEvent.MOUSE_UP, function () { gameStart(); });
        LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, function (event) { if (event.keyCode == 13) { gameStart(); } });
    }
    //游戏开始
    var gameStart = function () {
        backLayer.die();
        backLayer.removeAllChild();
        reSetValue(exp);
        //播放音频
        onup();
        //加载背景
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["backBg"])));
        //加入月饼层
        cakeLayer = new LSprite();
        backLayer.addChild(cakeLayer);
        //加入心
        heartLayer = new LSprite();
        initHeart(3);
        backLayer.addChild(heartLayer);
        //加入时间层
        topTimeMinute = new Number(0);
        topTimeMinute.x = (LGlobal.width - topTimeMinute.getWidth()) / 2 - 20; topTimeMinute.y = 16;
        var topTimeSecond = new Number(0);
        topTimeSecond.x = (LGlobal.width - topTimeSecond.getWidth()) / 2 + 24; topTimeSecond.y = 16;
        backLayer.addChild(topTimeMinute); backLayer.addChild(topTimeSecond);
        gameTimer = window.setInterval(function () {
            if (isStop) { return; }
            gameSecond++;
            if (gameSecond % 60 == 0) {
                topTimeMinute.setNumber(topTimeMinute.value + 1);
                topTimeSecond.setNumber(0);
            } else {
                topTimeSecond.setNumber(gameSecond % 60);
            }
        }, 1000);

        //加载兔子
        rabbit = new Rabbit();
        rabbit.speed = 5;
        backLayer.addChild(rabbit);
        //加载云朵
        var cloud = new LBitmap(new LBitmapData(imglist["cloud"]));
        cloud.y = 166;
        backLayer.addChild(cloud);
        //加载主角
        person = new Person();
        person.x = (LGlobal.width - person.getWidth()) / 2;
        person.y = LGlobal.height - person.getHeight();
        backLayer.addChild(person);
        backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
        //加入暂停按钮
        var btuPause = new LSprite();
        btuPause.addChild(new LBitmap(new LBitmapData(imglist["btu_pause"]))); btuPause.x = 580; btuPause.y = 0;
        btuPause.addEventListener(LMouseEvent.MOUSE_UP, function () { gamePause(); });
        backLayer.addChild(btuPause);
        //开始发月饼
        initFood();
        var timeIndex = 0;
        //计时撒月饼事件
        speedTimer = window.setInterval(function () {
            if (isStop) { return; }
            timeIndex++;
            if (timeIndex == timeGoQuantity / 100) {
                timeIndex = 0;
                drop_step += timeBulking;
                if (dropQuantity >= 700) {
                    dropQuantity -= 200;
                    initFood();
                }
            }
            if (drop_step >= 25) {
                drop_step = 25;//最大速度25
                window.clearInterval(speedTimer);
            }
        }, 100);
        //document.getElementById("_adv").style.display = "none";
    }
    //回到主界面
    var backMainPage = function () {
        backLayer.die();
        backLayer.removeAllChild();
        reSetValue(exp);
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["ready"])));
        backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function () { gameStart(); });
        //LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, function (event) { if (event.keyCode == 13) { gameStart(); } });
    }
    //游戏暂停
    var gamePause = function () {
        if (!isStop) {
            isStop = true;
            //加载游戏面板
            exp.pausePanel = new LSprite();
            pausePanel.addChild(new LBitmap(new LBitmapData(imglist["pausePanel"])));
            backLayer.addChild(pausePanel);
            var btu_resume = new LSprite(); btu_resume.x = 207; btu_resume.y = 333; btu_resume.addChild(new LBitmap(new LBitmapData(imglist["btu_resume"])));
            var btu_restart = new LSprite(); btu_restart.x = 207; btu_restart.y = 427; btu_restart.addChild(new LBitmap(new LBitmapData(imglist["btu_restart"])));
            var btu_exit = new LSprite(); btu_exit.x = 207; btu_exit.y = 530; btu_exit.addChild(new LBitmap(new LBitmapData(imglist["btu_exit"])));
            pausePanel.addChild(btu_resume); pausePanel.addChild(btu_restart); pausePanel.addChild(btu_exit);
            btu_resume.addEventListener(LMouseEvent.MOUSE_UP, function () { gamePause() });
            btu_restart.addEventListener(LMouseEvent.MOUSE_UP, function () { gameStart() });
            btu_exit.addEventListener(LMouseEvent.MOUSE_UP, function () { backMainPage() });
        } else {
            isStop = false;
            backLayer.removeChild(pausePanel);
        }
    }
    //游戏结束
    var gameOver = function (type, food) {
        //type=1:接到了非月饼type=2：掉落月饼超过3个
        window.clearInterval(speedTimer);
        window.clearInterval(gameTimer);
        window.clearInterval(dropTimer);
        //backLayer.die();
        var scorePanel = new LSprite();
        scorePanel.addChild(new LBitmap(new LBitmapData(imglist["scorePanel"])));
        var theTextField = initTextField("", "#ffcccc", 50, LGlobal.width, LGlobal.height / 2, true);
        theTextField.textAlign = "center"; theTextField.alpha = 0;
        if (type == 1) {
            //theTextField.text = "你接到" + food.CHname + "啦";
            theTextField.text = "接错月饼，游戏结束";
        } else {
            theTextField.text = "丢失3个以上月饼";
        }
        //cakeLayer.removeAllChild();
        isStop = true;
        backLayer.addChild(theTextField);
        var tween2 = LTweenLite.to(theTextField, 3, {
            y: 430, alpha: 1, loop: false, ease: LEasing.Sine.easeOut, onComplete: function () {
                //加载成绩面板
                backLayer.die();
                //sound.stop();
                backLayer.removeChild(theTextField);
                backLayer.addChild(scorePanel);
                totalGameData(scorePanel);
            }
        });
        //初始化分享信息
    }
    function onframe() {
        if (!isStop) {
            rabbit.run();
            for (var item in cakeLayer.childList) {
                cakeLayer.childList[item].onframe();
            }
        }
        if (isSoundLoaded) {
            if (!sound.playing) sound.play();
        }
    }
    //初始化抛算月饼算法
    var initFood = function () {
        if (dropTimer) { window.clearInterval(dropTimer); }
        dropTimer = window.setInterval(function () {
            if (isStop) { return; }
            var food;
            var readom = getRedom(1, 14);
            if (readom <= 8) {
                food = new Cake(readom);
            } else if (readom <= 10) {
                food = new Zongzi(readom);
            }
            else if (readom <= 12) {
                food = new Tangyuan(readom);
            }
            else if (readom <= 14) {
                food = new Jiaozi(readom);
            }
            food.x = rabbit.x;
            cakeLayer.addChild(food);
        }, dropQuantity);
    }
    //加载心
    var initHeart = function (num) {
        heartLayer.removeAllChild();
        for (var i = 0; i < num; i++) {
            var heart = new LSprite();
            heart.addChild(new LBitmap(new LBitmapData(imglist["heart"])));
            heart.x = 13 + (heart.getWidth() + 3) * i; heart.y = 5;
            heartLayer.addChild(heart);
        }
    }
    //统计游戏数据
    var totalGameData = function (scorePanel) {
        var levelNameIndex = 0;
        if (getCakeCount <= 20) levelNameIndex = 0;
        if (getCakeCount > 20 && getCakeCount <= 40) levelNameIndex = 1;
        if (getCakeCount > 40 && getCakeCount <= 70) levelNameIndex = 2;
        if (getCakeCount > 70 && getCakeCount <= 120) levelNameIndex = 3;
        if (getCakeCount > 120) levelNameIndex = 4;
        /*var theTextField = initTextField(levelName[levelNameIndex], "#ffffff", 50, scorePanel.getWidth(), 200, true);
        scorePanel.addChild(theTextField);*/
        var resultTxtPic = new LSprite();
        resultTxtPic.addChild(new LBitmap(new LBitmapData(imglist["resultTxt_" + levelNameIndex])));
        resultTxtPic.x = (LGlobal.width - resultTxtPic.getWidth()) / 2; resultTxtPic.y = 200;
        scorePanel.addChild(resultTxtPic);
        for (var i = 1; i <= 8; i++) {
            var _count = new Number(0, "2");
            for (var item in cakeMap.keys()) {
                var key = cakeMap.keys()[item];
                if (parseInt(key) == i) {
                    _count = new Number(cakeMap.get(key), "2");
                    continue;
                }
            }
            _count.x = scorePanel.getWidth() - 150;
            _count.y = 285 + 39 * i;
            scorePanel.addChild(_count);
        }
        var totalCount = new Number(getCakeCount, "2"); totalCount.x = scorePanel.getWidth() - 180; totalCount.y = LGlobal.height - 320;
        scorePanel.addChild(totalCount);
        var btuBack = new LSprite(); btuBack.x = 40; btuBack.y = 680; btuBack.addChild(new LBitmap(new LBitmapData(imglist["menu"])));
        btuBack.addEventListener(LMouseEvent.MOUSE_UP, function () { backMainPage() });
        var reStart = new LSprite(); reStart.x = 415; reStart.y = 680; reStart.addChild(new LBitmap(new LBitmapData(imglist["reStart"])));
        reStart.addEventListener(LMouseEvent.MOUSE_UP, function () { gameStart() });
        scorePanel.addChild(btuBack); scorePanel.addChild(reStart);
        var wxData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl": "http://www.teamotto.net/crazycakeWeb/ICON.png",
            "link": "http://www.teamotto.net/crazycakeWeb/crazycake.html",
            desc: "在下今日喜获嫦娥仙子亲制月饼" + getCakeCount + "个，诚邀众位英豪共同品尝，祝愿四海升平、月圆人圆！",
            //"desc": "我在“疯狂的月饼”游戏中一口气接住了" + getCakeCount + "个月饼，获取“" + levelName[levelNameIndex] + "”称号，不服来玩！",
            "title": "腾沐科技-疯狂的月饼"
        };
        //if (WeixinApi) {
        //    WeixinApi.shareToTimeline(wxData, function () { alert(0)});
        //}
        //document.getElementById("_adv").style.display = "block";
    }
    //兔子类
    function Rabbit() {
        base(this, LSprite, []);
        var self = this;
        self.setView();
    }
    Rabbit.prototype.setView = function () {
        var self = this;
        self.y = 60;
        self.addChild(new LBitmap(new LBitmapData(imglist["rabbit"])));
    }
    Rabbit.prototype.speed = 5;//每次移动的速度
    Rabbit.prototype.isRound = true;//是否移动到头，用于控制临时变相，在下次触碰前不变相
    Rabbit.prototype.run = function () {
        var self = this;
        if (self.speed <= 0) {
            self.speed = getRedom(5, 7) * -1;//速度时快时慢
        } else {
            self.speed = getRedom(5, 7);//速度时快时慢
        }
        if (self.x <= 0) {
            self.isRound = false;
            self.speed = Math.abs(self.speed);
        } else if (self.x >= LGlobal.width - self.getWidth()) {
            self.isRound = false;
            self.speed = Math.abs(self.speed) * -1;
        }
        //可能临时变相
        var _isRound = getRedom(1, 70);
        //console.log(_isRound);
        //if (_isRound == 1 && self.isRound == false) {//加上这句话，变换方向之后，不撞墙就不会再变向
        if (_isRound == 1) {
            self.isRound = true;
            self.speed = self.speed * -1;
        }
        self.x += self.speed;
    }
    //主角
    function Person() {
        base(this, LSprite, []); var self = this; self.setView();
        var isBeginMove = false;
        //if (!LGlobal.canTouch) {//判断当前浏览器是电脑还是只能手机，即判断是否可以触屏
        self.addEventListener(LMouseEvent.MOUSE_DOWN, function () { isBeginMove = true; });//按下
        self.addEventListener(LMouseEvent.MOUSE_UP, function () { isBeginMove = false; });//弹起
        backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, move);//弹起
        //}
        var max_x = LGlobal.width - self.getWidth();
        
        function move(event) {
            if (isBeginMove) {
                if (self.x <= 0) { self.x = 1; return; }
                if (self.x > max_x) { self.x = max_x - 1; return; }
                self.x = event.offsetX - self.getWidth() / 2;
                self.lastPostion_x = self.x;
            }
        }
        Person.prototype.foodInPerson.removeAllChild();
    }
    Person.prototype.lastPostion_x = 0;
    Person.prototype.foodInPerson = new LSprite();
    Person.prototype.setView = function (isHaveFood) {
        var self = this;
        Person.prototype.foodInPerson.scaleX = Person.prototype.foodInPerson.scaleY = 0.3;
        self.foodInPerson.y = 0;
        Person.prototype.foodInPerson.x = ((self.getWidth() + Person.prototype.foodInPerson.getWidth()) / 2) - 8;
        self.addChild(Person.prototype.foodInPerson);
        var _person = new LSprite();
        if (isHaveFood)
            _person.addChild(new LBitmap(new LBitmapData(imglist["person2"])));
        else
            _person.addChild(new LBitmap(new LBitmapData(imglist["person"])));
        self.addChild(_person);
    }
    Person.prototype.getFood = function (food) {
        var self = this;
        self.removeAllChild();
        Person.prototype.foodInPerson.removeAllChild();
        Person.prototype.foodInPerson.addChild(new LBitmap(new LBitmapData(imglist[food.imgListName])));
        self.setView(true);
        var theTextField;
        self.foodInPerson.y = -40;
        if (food instanceof Cake)
            theTextField = initTextField(getCakeCount, "#ffffff", 40, self.getWidth(), -50, true);
        else
            theTextField = initTextField("你接到" + food.CHname + "啦", "#ffffff", 40, self.getWidth(), -50, true);
        theTextField.filters = null;
        //theTextField.textAlign = "center";
        self.addChild(theTextField);
        //var number = new LSprite();
        var tween = LTweenLite.to(theTextField, 0.8, {
            y: -150, alpha: 0, loop: false, ease: LEasing.Sine.easeOut, onComplete: function () { }
        });
    }
    //食物父类
    function Food(index) {
        base(this, LSprite, []);
        var self = this;
        self.y = 200;
        self.scaleX = self.scaleY = 0.3;
    }
    Food.prototype.onframe = function () {
        var self = this;
        self.y += drop_step;
    }
    //Food.prototype.speed = drop_step;
    Food.prototype.hitIn = function () {
        var self = this;
        if (self instanceof Cake) {
            getCakeCount++;
            if (cakeMap.get(self.cakeIndex)) {
                var _count = parseInt(cakeMap.get(self.cakeIndex));
                cakeMap.put(self.cakeIndex, _count + 1);
            } else {
                cakeMap.put(self.cakeIndex, 1);
            }
        } else {
            //接到了非月饼食物，游戏结束
            gameOver(1, self);
        }
    }//下落到篮子行为
    Food.prototype.hitFloor = function () {
        if (this instanceof Cake)
            lostCakeCount++;
        if (lostCakeCount >= 3) {
            //未接到月饼达到3个，游戏结束
            gameOver(2);
        } else {
            initHeart(3 - lostCakeCount);
        }
    }//下落到地面行为
    Food.prototype.name = "";
    Food.prototype.setView = function (index) { }
    Food.prototype.imgListName = "";
    Food.prototype.cakeIndex = 0;
    Food.prototype.onframe = function () {
        var self = this;
        var SW = self.getWidth(); var PW = person.getWidth();
        if (LGlobal.hitTestRect(self, person)) {
            if (((person.x - self.x) < SW / 2) && (((self.x + SW) - (person.x + PW)) < SW / 2) && (person.y - self.y <= 90) && (person.y - self.y >= 0)) {
                //与篮子发生碰撞
                self.hitIn();
                person.getFood(self);
                self.remove();
            }
        }
        if (self.y >= LGlobal.height) {
            //落到地上
            self.hitFloor();
            self.remove();
        } else {
            self.y += drop_step;
        }
    }
    //月饼类
    function Cake(index) {
        base(this, Food, []); var self = this; self.cakeIndex = index; self.setView(index);
    }
    Cake.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "cake_" + index;
        self.addChild(new LBitmap(new LBitmapData(imglist["cake_" + index])));
    }
    Cake.prototype.CHname = "月饼";
    function Zongzi(index) {
        base(this, Food, []); var self = this; self.setView(index);
    }
    function Tangyuan(index) {
        base(this, Food, []); var self = this; self.setView(index);
    }
    function Jiaozi(index) {
        base(this, Food, []); var self = this; self.setView(index);
    }
    Zongzi.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "zongzi";
        self.addChild(new LBitmap(new LBitmapData(imglist["zongzi"])));
    }
    Zongzi.prototype.CHname = "粽子";
    Tangyuan.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "tangyuan";
        self.addChild(new LBitmap(new LBitmapData(imglist["tangyuan"])));
    }
    Tangyuan.prototype.CHname = "汤圆";
    Jiaozi.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "jiaozi";
        self.addChild(new LBitmap(new LBitmapData(imglist["jiaozi"])));
    }
    Jiaozi.prototype.CHname = "饺子";

    var initTextField = function (text, color, size, x, y, iscenter) {
        var _text = new LTextField();
        _text.text = text; _text.color = color; _text.size = size;
        if (iscenter) {
            _text.x = (x - _text.getWidth()) / 2;
        } else { _text.x = x; }
        _text.y = y;
        var shadow = new LDropShadowFilter(2, 45, "#000000", 1);
        _text.filters = [shadow];
        return _text;
    }
    function Number(num, sharpType) {
        base(this, LSprite, []);
        var self = this;
        self.sharpType = sharpType || "1";
        self.setView(num);
        self.value = num;

    }
    Number.prototype.value = 0;
    Number.prototype.changeSpeed = 0.1;
    Number.prototype.spacing = 0;//数字间隔
    Number.prototype.scale = 1;//放大倍数
    Number.prototype.sharpType = "1";//数字图形类别
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
            sprite.x = spriteWrap.getWidth() + self.spacing;//i * (sprite.width * self.scale + self.spacing);
            spriteWrap.addChild(sprite);
            self.addChild(spriteWrap);
        }
    }
    Number.prototype.setNumber = function (num, callBack) {
        var self = this;
        self.value = num;
        var spriteWrap = self.getChildAt(0);
        LTweenLite.to(spriteWrap, self.changeSpeed, {
            scaleY: 0, onComplete: function () {
                self.removeAllChild();
                self.setView(num);
                spriteWrap = self.getChildAt(0);
                spriteWrap.scaleY = 0;
                LTweenLite.to(spriteWrap, self.changeSpeed, {
                    scaleY: 1, onComplete: function () { if (callBack) callBack.call(self); }
                });
            }
        });
    }
    //播放音频
    function onup(e) {
        var url = "sound.";
        sound.load(url + "mp3," + url + "ogg," + url + "wav");
        sound.addEventListener(LEvent.COMPLETE,loadOver);
    }
    function loadOver (e) {
        sound.play();
        isSoundLoaded = true;
    }
    //获取随机数
    exp.getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    var loadImages = function (url, callBack) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.onload = function () { img.onload = null; callBack(img); }
        img.src = url;
    }
    loadImages("images/load.gif", function (img) {
        document.getElementById("loadingBg").style.display = "block";
        init(30, "canvas", 640, 960, main);//加载canvas
    });
})(window);