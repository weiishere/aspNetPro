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
    var backLayer, shooter, arrow, heartLayer, arrowLayer, hdmb;
    var heartTimer, heartTimer2;
    var hitHeart = null;
    var con_x, con_y = 0;

    var reSetValue = function (_exp) {
        _exp.isStop = false;
    }
    var levelName = [
        "桃花爆棚，爱破苍穹",
        "桃花犯命，注意身体",
        "桃花乱袭，且行且惜",
        "桃花沾衣，多多知己",
        "桃花偶遇，莫失良机",
        "桃花将近，戒躁戒急",
        "桃花未至，勿忘初心",
        "桃花无边，顺其自然", ];
    reSetValue(exp);
    var imgData = new Array(
        { name: "bg", path: "http://img12.360buyimg.com/cms/jfs/t1729/178/572233072/98202/4e619fd8/55d42523N75bb4e6a.png" },
        { name: "btu", path: "http://img10.360buyimg.com/cms/jfs/t1771/160/381707384/10933/2df2363c/55d157faNbc72cc18.png" },
        { name: "btu_2", path: "http://img12.360buyimg.com/cms/jfs/t1678/183/307064183/6780/31df23e2/55d19a6cNca795f08.png" },
        { name: "btu_3", path: "http://img14.360buyimg.com/cms/jfs/t1270/84/1336802582/5853/51cb8111/55d19a7dNd8024992.png" },
        { name: "backBg", path: "http://img13.360buyimg.com/cms/jfs/t1756/272/446883046/10043/a13cc335/55d2d768N72a370bc.png" },
        { name: "shotter_1", path: "http://img14.360buyimg.com/cms/jfs/t1834/272/407285632/13780/fa43e163/55d157faN7bc484ad.png" },
        { name: "shotter_2", path: "http://img14.360buyimg.com/cms/jfs/t1810/208/371396113/16950/5f3e20d7/55d15770N8aa74a4e.png" },
        { name: "heart", path: "http://img13.360buyimg.com/cms/jfs/t1807/138/355206890/60583/3545c487/55d15770N9445a5f5.png" },
        { name: "heart2", path: "http://img14.360buyimg.com/cms/jfs/t1753/238/445688957/3263/1cc8ce61/55d15770N311914e6.png" },
        { name: "hdmb", path: "http://img12.360buyimg.com/cms/jfs/t1405/215/391526019/303686/9f930658/55d32e3fN84612f6a.jpg" },
        { name: "heart3", path: "http://img13.360buyimg.com/cms/jfs/t1828/161/374257907/3209/55bf0509/55d1580eN8878dfe2.png" },
        { name: "cloud", path: "http://img11.360buyimg.com/cms/jfs/t1762/155/395887903/5050/5dae8379/55d157faNe7075c18.png" },
        { name: "arrow", path: "http://img12.360buyimg.com/cms/jfs/t1756/164/382459419/17174/598aa749/55d15770N8a88f393.png" },
        { name: "bg_2", path: "http://img13.360buyimg.com/cms/jfs/t1681/130/896612540/54304/9a3765ae/55d4224bNb4d0c5e3.png" },
        { name: "layerBg", path: "http://img11.360buyimg.com/cms/jfs/t1735/188/547580560/32139/3caefcff/55d355a1N90688a61.png" },
        { name: "arrow_in", path: "http://img11.360buyimg.com/cms/jfs/t1816/131/355665033/11432/52304884/55d15770N7c898df6.png" });

    function main() {
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        LSystem.screen(LStage.FULL_SCREEN);
        backLayer = new LSprite();
        heartLayer = new LSprite();//心层
        arrowLayer = new LSprite();//箭层
        backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
        //背景显示
        addChild(backLayer);
        loadingLayer = new LoadingSample1();
        backLayer.addChild(loadingLayer);

        LLoadManage.load(imgData, function (progress) {
            //document.getElementById("loadingBg_div").innerHTML = progress + "%";
            loadingLayer.setProgress(progress);
        }, gameInit);
    }
    //读取完所有图片，进行游戏标题画面的初始化工作
    function gameInit(result) {
        //取得图片读取结果
        imglist = result;
        //document.getElementById("loadingBg").style.display = "none";
        //移除进度条层//移除或者这样写 loadingLayer.remove();
        backLayer.removeChild(loadingLayer);
        //加入欢迎页
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
        //加入冒泡的心心
        startheartLayer = new LSprite();
        backLayer.addChild(startheartLayer);
        heartTimer2 = window.setInterval(function () {
            var startHeart = new Heart2();
            startheartLayer.addChild(startHeart);
        }, 300);
        var btu = new LSprite(); var textLayer = new LSprite(); var link = new LTextField();
        link.text = "活动规则"; link.size = 32; link.color = "#ffffff";
        btu.addChild(new LBitmap(new LBitmapData(imglist["btu"])));
        btu.x = (LGlobal.width - btu.getWidth()) / 2;
        link.x = (LGlobal.width - link.getWidth()) / 2;
        btu.y = 730;
        textLayer.addChild(link);
        textLayer.y = 850;
        btu.addEventListener(LMouseEvent.MOUSE_UP, function () {
            gameStart();
        });
        //加入活动规则
        hdmb = new LSprite();
        exp.hdmb_y, exp.hdmb_con = 0;
        hdmb.addChild(new LBitmap(new LBitmapData(imglist["hdmb"])));
        exp.isDrop = true;
        var hdmb_height = hdmb.getHeight();
        hdmb.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
            isDrop = false;
            hdmb_y = e.selfY;
        });
        hdmb.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
            isDrop = true;
            hdmb_con = e.selfY - hdmb_y;
            hdmb.y += hdmb_con;
            if (hdmb.y >= 0) { hdmb.y = 0; }
            if (hdmb.y <= LGlobal.height - hdmb_height) { hdmb.y = LGlobal.height - hdmb_height }
        });
        hdmb.x = LGlobal.width;
        hdmb.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (!isDrop) hdmb.x = LGlobal.width;//backLayer.removeChild(hdmb);
        });

        textLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
            //打开活动规则模板
            //document.getElementById("span_hdmb").style.display = "block";
            hdmb.x = 0;
            //backLayer.addChild(hdmb);
        });
        backLayer.addChild(btu);

        backLayer.addChild(textLayer);
        backLayer.addChild(hdmb);
        backLayer.addEventListener(LEvent.ENTER_FRAME, function () {
            for (var item in startheartLayer.childList) {
                if (startheartLayer.childList.hasOwnProperty(item)) {
                    startheartLayer.childList[item].onframe();
                }
            }
        });

    }
    //游戏开始
    var gameStart = function () {
        backLayer.die();
        backLayer.removeAllChild();
        heartLayer = new LSprite();//心层
        arrowLayer = new LSprite();//箭层
        //绘制背景
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["backBg"])));
        var f_heart = new Heart();
        f_heart.x = 100;
        heartLayer.addChild(f_heart);
        heartTimer = window.setInterval(function () {
            //加入心
            if (getRedom(1, 2) <= 2) {
                heart = new Heart();
                heartLayer.addChild(heart);
            }
        }, 1000);
        //加入弓
        shooter = new Shooter();
        backLayer.addChild(shooter);
        //加入箭
        arrow = new Arrow();
        //backLayer.addChild(arrow);
        backLayer.addChild(heartLayer);
        backLayer.addChild(arrowLayer);
        arrowLayer.addChild(arrow);
        backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
        backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function () {
            if (arrow.state == 1) arrow.state = 2;
            shooter.state = 2;
        });
        backLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (arrow.state == 2) arrow.state = 3;
            shooter.state = 1;
        });

    }
    //回到主界面
    var backMainPage = function () {

    }
    //游戏暂停,显示结果
    var gamePause = function () {
        isStop = isStop ? false : true;
        backLayer.die();
        backLayer.removeAllChild();
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["bg_2"])));
        var resultText = new LTextField();
        resultText.text = pingyu = levelName[getRedom(0, 7)];
        resultText.color = "#f96884";
        resultText.size = 42;
        resultText.x = (LGlobal.width - resultText.getWidth()) / 2 + 20;
        resultText.y = 265;
        backLayer.addChild(resultText);
        var btu_2 = new LSprite();
        btu_2.addChild(new LBitmap(new LBitmapData(imglist["btu_2"])));
        btu_2.x = 35; btu_2.y = 800;
        var btu_3 = new LSprite();
        btu_3.addChild(new LBitmap(new LBitmapData(imglist["btu_3"])));
        btu_3.x = 325; btu_3.y = 800;
        //分享描述
        //window.dataForWeixin.desc = '我的桃花运是“' + resultText.text + '”，还被送了五块钱！';
        //window.sharecode = resultText.text;

        //var layerBg = document.querySelector('.layerBg'), shareLayer = document.querySelector('.shareLayer');
        //shareLayer.addEventListener("click", function (e) {
        //    layerBg.style.display = "none";
        //    shareLayer.style.display = 'none';
        //});
        btu_2.addEventListener(LMouseEvent.MOUSE_UP, function () {
            //分享领卷
            if (Util.inApp() && !Util.inWx) {
                App.share();
            } else if (Util.inWx) {
                //layerBg.style.display = "block";
                //shareLayer.style.display = 'block';
                var _layerBg = new LSprite();
                _layerBg.addChild(new LBitmap(new LBitmapData(imglist["layerBg"])));
                _layerBg.addEventListener(LMouseEvent.MOUSE_UP, function () {
                    backLayer.removeChild(_layerBg);
                    delete _layerBg;
                });
                backLayer.addChild(_layerBg);
            } else {
                window.location.href = 'http://m.jdpay.com/basic/index.html';
            }

        });
        btu_3.addEventListener(LMouseEvent.MOUSE_UP, function () {
            //重新来一次
            isStop = false;
            window.clearInterval(heartTimer);
            window.clearInterval(heartTimer2);
            //main();
            gameStart();
        });
        backLayer.addChild(btu_2);
        backLayer.addChild(btu_3);
    }
    //游戏结束
    var gameOver = function (type, food) {

    }
    function onframe() {
        if (!isStop) {
            shooter.run();
            for (var item in arrowLayer.childList) {
                if (arrowLayer.childList.hasOwnProperty(item)) {
                    var _arrow = arrowLayer.childList[item];
                }
            }
            if (arrow.y <= 0 || arrow.x >= LGlobal.width) {
                arrow.remove();
                delete arrow;
                arrow = new Arrow();
                arrowLayer.addChild(arrow);
            } else {
                _arrow.run();
            }

            for (var item in heartLayer.childList) {
                if (heartLayer.childList.hasOwnProperty(item)) {
                    heartLayer.childList[item].run();
                }
            }
            //for (var i=0; i < heartLayer.childList.length; i++) {
            //    console.log(heartLayer.getChildAt(i));
            //    heartLayer.getChildAt(i).run();
            //}
        }
    }
    function Shooter() {
        base(this, LSprite, []); var self = this; self.setView();
    }
    Shooter.prototype.state = 1;
    Shooter.prototype.setView = function () {
        var self = this;
        self.addChild(new LBitmap(new LBitmapData(imglist["shotter_1"])));
        self.y = 710;
        self.x = (LGlobal.width - self.getWidth()) / 2;
    }
    Shooter.prototype.run = function () {
        var self = this;
        self.removeAllChild();
        if (self.state == 1) {
            self.y = 710;
            self.addChild(new LBitmap(new LBitmapData(imglist["shotter_1"])));
        } else {
            self.y = 730;
            self.addChild(new LBitmap(new LBitmapData(imglist["shotter_2"])));
        }
    }

    function Arrow() {
        base(this, LSprite, []); var self = this; self.setView();
    }
    Arrow.prototype.setView = function () {
        var self = this;
        self.addChild(new LBitmap(new LBitmapData(imglist["arrow"])));
        self.y = 540;
        self.x = (LGlobal.width - self.getWidth()) / 2;
    }
    Arrow.prototype.state = 1;//1静止、2预备、3飞行、4射中
    Arrow.prototype.scaleSpeed = 0.97;
    Arrow.prototype.run = function () {
        var self = this;
        switch (self.state) {
            case 1:
                self.y = self.y;
                break;
            case 2:
                self.y = 660;
                break;
            case 3:
                self.y = self.y * (0.92) - 1;
                self.scaleX = self.scaleX * self.scaleSpeed;
                self.scaleY = self.scaleY * self.scaleSpeed * 0.98;
                break;
            case 4:
                self.removeAllChild();
                self.addChild(new LBitmap(new LBitmapData(imglist["arrow_in"])));
                self.x = hitHeart.x + con_x; self.y = hitHeart.y + con_y;
                break;
        }
    }
    function Heart() {
        base(this, LSprite, []); var self = this; self.setView();
    }
    Heart.prototype.size = 0.7;
    Heart.prototype.setView = function () {
        var self = this;
        //self.size = getRedom(3, 5) * 0.1;
        var _cloud = new LSprite();
        _cloud.addChild(new LBitmap(new LBitmapData(imglist["cloud"])));
        self.addChild(_cloud);
        var bitmap = new LBitmap(new LBitmapData(imglist["heart"]));
        bitmap.rotate = getRedom(0, 30);
        self.addChild(bitmap);
        _cloud.y = self.getHeight() * 0.65;
        //_cloud.x = self.getWidth() * getRedom(1, 5)/10;

        var _readom = getRedom(5, 10) / 10;//0.5~1
        self.y = 300 * getRedom(0, 10) / 10;
        self.x = -self.getWidth();
        self.scaleX = self.scaleX * self.size * _readom;
        self.scaleY = self.scaleY * self.size * _readom;
        self.speed = parseInt(self.speed * _readom);
    }
    Heart.prototype.speed = 10;
    Heart.prototype.state = 1;//1飘动、2射中
    //被射中
    Heart.prototype.hitIn = function () {
        var self = this;
        hitHeart = self;
        arrow.state = 4;
        con_x = arrow.x - self.x;
        con_y = ((arrow.y - self.y) <= self.getHeight() / 3 || ((self.y + self.getHeight()) - arrow.y) <= self.getHeight() / 3) ? self.getHeight() / 2 : (arrow.y - self.y);
        arrow.removeAllChild();
        arrow.addChild(new LBitmap(new LBitmapData(imglist["arrow_in"])));
        arrow.x = hitHeart.x + con_x; arrow.y = hitHeart.y + con_y;
        var _t = window.setInterval(function () {
            gamePause();
            window.clearInterval(_t);
        }, 500);
    }
    Heart.prototype.run = function () {
        var self = this;
        for (var item in arrowLayer.childList) {
            if (arrowLayer.childList.hasOwnProperty(item)) {
                var _arrow = arrowLayer.childList[item];
                if (_arrow.state == 4) { break; }
                var SW = self.getWidth(); var PW = _arrow.getWidth();
                if (LGlobal.hitTestRect(self, _arrow)) {
                    if (((_arrow.x - self.x) < SW / 2) && (((self.x + SW) - (_arrow.x + PW)) < SW / 2) && (_arrow.y - self.y <= 90) && (_arrow.y - self.y >= 0)) {
                        //与篮子发生碰撞
                        arrow = _arrow;
                        self.hitIn();
                    }
                }
            }
        }
        switch (self.state) {
            case 1:
                self.x += self.speed;
                break;
            case 2:
                break;
        }
        if (self.x >= LGlobal.width) {
            heartLayer.removeChild(self);
            self.remove();
        }

    }
    function Heart2() {
        base(this, LSprite, []); var self = this; self.setView();
    }
    Heart2.prototype.speed_x = 1;
    Heart2.prototype.speed_y = 10;
    Heart2.prototype.speed_alpha = 0.05;
    Heart2.prototype.setView = function () {
        var self = this;
        self.addChild(new LBitmap(new LBitmapData(imglist["heart" + getRedom(2, 3)])));
        self.x = (LGlobal.width - self.getWidth()) / 2;
        self.y = LGlobal.height / 2;
        self.speed_x = getRedom(-5, 5);
        self.speed_y = getRedom(8, 12);
        self.speed_alpha = getRedom(3, 5) * 0.01;
        self.alpha = 1;
    }
    Heart2.prototype.onframe = function () {
        var self = this;
        self.x += self.speed_x;
        self.y -= self.speed_y;
        self.alpha -= self.speed_alpha;
        if (self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.alpha <= 0) {
            self.remove();
            delete self;
        }
    };
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
    init(30, "canvas", 640, 960, function () {
        main();
    });
})(window);