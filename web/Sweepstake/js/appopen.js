window.isTest = false;
window.isDev = false;
window._config = {
    //获取数据
    requestUrl: 'http://m.jdpay.com/marketing/qrcode/index.action',
    sendCodeUrl: 'http://m.jdpay.com/marketing/sms/send',
    //是否在钱包内部
    _isInApp: false,
    wxOpenId: '',
    //调试模式
    _isDebug: false,
    // 钱包必传
    _auth: '',
    qrCode: '',
    mobile: '', //手机验证
    //使用cors请求类型
    _uesCors: true,
    //活动id
    _entranceId: "2015101300000000001",
    //重试刷新地址
    _reloadUrl: window.location.href
};
var openDetails = function () {
    $(".popup_detail").show();
}
var closeDetails = function () {
    $(".popup_detail").hide();
}
window.dataForWeixin = {
    appId: "",
    MsgImg: 'http://img13.360buyimg.com/cms/jfs/t790/61/1403238732/5911/2dcd4cf2/559f6b56Na06dce77.png',
    TLImg: 'http://img13.360buyimg.com/cms/jfs/t790/61/1403238732/5911/2dcd4cf2/559f6b56Na06dce77.png',
    url: 'http://sale.jd.com/app/act/8SyL3gznBWjdiP.html',
    title: '品珍骨汤享京东钱包豪礼',
    desc: '吃得到的美味，抓得住的实惠！一大波京东钱包礼金向您飞奔而来！',
    fakeid: "",
    callback: function () { }
};
(function (w, d) {

    var n = w.navigator,
        ua = n.userAgent,
        Util = {
            baseUrl: 'http://sale.jd.com/app/act/KBuoE641DZmxgYf.html', //京东域，做打开app用
            androidDownload: 'http://sq.jd.com/oO3VaB',
            iosDownload: 'http://sq.jd.com/oO3VaB',
            inWx: (ua.search(/micromessenger/ig) == -1) ? false : true,
            inIosApp: (ua.search(/safari/ig) == -1 && ua.indexOf('jdapp') == -1 && ua.indexOf('UC') == -1 && ua.indexOf('MQQBrowser')) == -1 ? true : false,
            inAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
            inIos: ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1,
            //检查后缀
            check_domain: function (host) {
                var pattern = "/^aero$|^cat$|^coop$|^int$|^museum$|^pro$|^travel$|^xxx$|^com$|^net$|^gov$|^org$|^mil$|^edu$|^biz$|^info$|^name$|^ac$|^mil$|^co$|^ed$|^gv$|^nt$|^bj$|^hz$|^sh$|^tj$|^cq$|^he$|^nm$|^ln$|^jl$|^hl$|^js$|^zj$|^ah$|^hb$|^hn$|^gd$|^gx$|^hi$|^sc$|^gz$|^yn$|^xz$|^sn$|^gs$|^qh$|^nx$|^xj$|^tw$|^hk$|^mo$|^fj$|^ha$|^jx$|^sd$|^sx$/i";
                if (str.match(pattern)) {
                    return 1;
                }
                return 0;
            },

            //返回域
            get_domain: function () {
                var host = d.domain.replace(/^www\./, ""), arr = host.split('.'), len = arr.length, domain;
                if (len == 3) {
                    domain = arr[1] + '.' + arr[2];
                } else if (len > 3) {
                    var ip_pat = "^[0-9]*\.[0-9]*\.[0-9]*\.[0-9]*$";
                    if (host.match(ip_pat)) {
                        return host;
                    }
                    if (Util.check_domain(arr[len - 2])) {
                        domain = arr[len - 3] + "." + arr[len - 2] + "." + arr[len - 1];
                    } else {
                        domain = arr[len - 2] + "." + arr[len - 1];
                    }
                }
                return domain;
            },
            //判断是否在app内
            inApp: function () {
                if (Util.inAndroid) {
                    return typeof (android) != 'undefined' ? true : false;
                } else if (Util.inIos) {
                    return this.inIosApp;
                } else {
                    return false;
                }
            }
        };

    function json2str(json) {
        var str = '';
        for (var i in json) {
            str += '&' + i + '=' + json[i]
        };
        return str;
    };

    function openWithIframe(ifrSrc) {
        var ifr = document.createElement('iframe');
        ifr.src = ifrSrc;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        setTimeout(function () {
            document.body.removeChild(ifr);
        }, 2000);
    };

    function openModel(json) {
        if (Util.inAndroid && Util.inApp()) {
            openAndroid(json);
        } else if (Util.inIos && Util.inIosApp && !Util.inWx) {
            openIos(json);
        } else if (Util.inWx) {
            if (Util.get_domain() == 'jd.com') {
                openIframe(json);
            } else {
                openLink(json);
            }
        } else {
            openIframe(json);
        }



        //打开弹出提示
        function showLayer() {
            var downLoadUrl = Util.inIos ? Util.iosDownload : Util.androidDownload;
            if (!document.querySelector('.J_layerDom')) {
                var lDom = document.createElement('div');
                lDom.className = 'J_layerDom';
                lDom.style.cssText = 'position: fixed; z-index: 3000; left: 50%; top: 50%; margin: -85px 0 0 -140px; width: 280px; padding: 20px 0; text-align: center; background: rgba(0,0,0, .8); border-radius: 6px; color: #fff';
                lDom.innerHTML = '<p style="margin-bottom: 30px; font-size: 18px;">您还未安装京东钱包客户端</p><a href="' + downLoadUrl + '" class="J_appDownload" style="display: block; width: 90%; margin-left: 5%; font-size: 16px; line-height: 40px; border-radius: 3px; text-decoration:none;font-weight: bold; background: #d9434b; color: #fff; ">立即下载</a>';
                document.body.appendChild(lDom);
            } else {
                document.querySelector('.J_layerDom').style.display = 'block';
            }
            setTimeout(function () {
                document.querySelector('.J_layerDom').style.display = 'none';
            }, 6000);
        };

        //构造iframe激活app
        function openIframe(json) {
            var str = json2str(json.params);
            var ifrSrc = 'wangyin://wallet/start?module=' + json.name + str;
            if (!ifrSrc) return;
            var ifr = document.createElement('iframe');
            ifr.src = ifrSrc;
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            setTimeout(function () {
                document.body.removeChild(ifr);
            }, 2000);
            setTimeout(function () {
                showLayer()
            }, 300);
        };

        //通过打开京东域的链接
        function openLink(json) {
            var url = Util.baseUrl;
            if (json.name == 'ACTIVITY') {
                url += '?url=' + json.params.browserUrl;
            };
            window.location.href = url + '#' + json.name;
        };

        //android客户端打开
        function openAndroid(json) {
            try {
                json.name = json.name == 'LOGIN' ? 'HOME' : json.name;
                if (json.name == 'ACTIVITY') {
                    _config._isDebug && alert(json.params.browserUrl);
                    android.start(json.params.browserUrl, json.callback);
                } else if (json.name == 'CLOSE') {
                    android.close();
                } else if (json.name == 'TITLE') {
                    android.setTitleName(json.params.text);
                } else {
                    android.start(json.name, JSON.stringify(json.params), json.callback);
                }
            } catch (err) {
                alert('请升级最新版京东钱包');
            }
        };

        //ios客户端打开
        function openIos(json) {
            var str = json.params ? json2str(json.params) : '',
                    url = 'native://start?name=' + json.name + str + '&callback=' + json.callback;
            if (json.name == 'CLOSE') {
                url = 'native://close';
            } else if (json.name == 'ACTIVITY') {
                url = 'native://start?name=' + json.params.browserUrl;
            } else if (json.name == 'TITLE') {
                url = 'native://setTitleName?titleName=' + json.params.text;
            };
            openWithIframe(url);
            /*  try{
             safari.open = url; //兼容iphone 4
             }catch(err){
             window.location.href = url;
             }*/
        };

    };


    var App = window.App || {};
    App.noop = function () { };
    App.open = function () {
        var len = arguments.length,
            _this = this,
            json = {
                name: '',
                params: {},
                callback: 'App.noop'
            },
            param;
        json.name = arguments[0] ? arguments[0].toUpperCase() : 'LOGIN';
        _this.noop = function () { };
        if (len == 2) {
            if (typeof (arguments[1]) == 'function') {
                _this.noop = arguments[1];
            } else {
                param = arguments[1];
            }
        } else if (len == 3) {
            if (typeof (arguments[2]) == 'function') {
                _this.noop = arguments[2];
            }
            param = arguments[1];
        };

        switch (json.name) {
            case 'FUND':
                if (param) json.params.code = param;
                break;
            case 'JRB':
                if (arguments[1]) {
                    json.params.forceLogin = 'JRB';
                    json.params.action = arguments[1];
                    json.params.channel = 'web';
                }
                break;
            case 'ACTIVITY':
                json.params.browserUrl = param;
                break;
            case 'TITLE':
                json.params.text = param;
                break;
            default:
                break;
        }
        openModel(json);
    };
    App.close = function () {
        openModel({ name: 'CLOSE' });
    };
    App.share = function (json) {

        var json = json || window.dataForWeixin,
            url = 'native://shareWebPage?url=' + json.url + '&webTitle=' + json.title + '&webDesc=' + json.desc;

        if (Util.inAndroid && Util.inApp()) {
            android.shareWebPage(json.url, json.title, json.desc);
        } else if (Util.inIos && Util.inIosApp && !Util.inWx) {
            try {
                safari.open = url; //兼容iphone 4
            } catch (err) {
                window.location.href = url;
            }
        } else if (Util.inWx) {
            window.dataForWeixin.url = json.url;
            window.dataForWeixin.title = json.title;
            window.dataForWeixin.desc = json.desc;
            onBridgeReady();
        }
    };

    window.App = App;
    window.Util = Util;

})(window, document);

function openApp() {
    App.open();
}