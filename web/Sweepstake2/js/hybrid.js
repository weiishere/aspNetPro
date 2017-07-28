(function(){
    var HybridBridge = function(opt){},
        clientInfo;

    document.addEventListener('WebViewJavascriptBridgeReady', function() {
        clientInfo = 'ios';
    }, false);

    if ( typeof android != 'undefined' ) {
        HybridBridge.prototype = {
            getInfo: function(cbFn){
                var fnName = this.renderFn(cbFn);
                android.getInfo(fnName);
            },
            setTitleName: function(title){
                android.setTitleName(title)
            },
            setTitleMenu: function(menuList){
                android.setTitleMenu(JSON.stringify(menuList))
            },
            share: function(url, title, desc){
                android.shareWebPage(url, title, desc);
            },
            close: function(){
                android.close();
            },
            setGoBackListener: function(cbFn, remain){
                android.setGoBackListener( this.renderFn(cbFn, remain) );
            },
            start: function (obj) {
                var data = renderStartArgs(obj, this);

                android.start(data.moduleName, data.paramsStr, data.callbackName);
            },

            constructor: HybridBridge
        }
    } else {
        HybridBridge.prototype = {
            getInfo: function(cbFn){
                var fnName = this.renderFn(cbFn);
                reqNative('getInfo?callback='+ fnName);
            },

            setTitleName: function(title){
               reqNative('setTitleName?titleName=' + title); 
            },

            setTitleMenu: function(menuList){
                //转换为iOS专用的数据格式
                var obj = {};
                menuList.forEach(function(item, idx){
                    ++idx;
                    obj['item' + idx] = item;

                });
                WebViewJavascriptBridge.callHandler('setMenu', obj);
            },

            // 分享
            share: function(url, title, desc){
                reqNative('shareWebPage?url=' + url + '&webTitle=' + title + '&webDesc=' + desc);
            },

            close: function(){
                reqNative('close');
            },

            setGoBackListener: function(cbFn, remain){
                reqNative('setGoBackListener?listener=' + this.renderFn(cbFn, remain));
            },
            start: function (obj) {
                var data = renderStartArgs(obj, this);
                var str = 'start?name=' + data.moduleName + data.paramsStr + '&callback=' + data.callbackName;
                reqNative(str);
            },

            constructor: HybridBridge
        };
    }

    HybridBridge.prototype.ready = function(callback){
        var me = this;

        callback && 
        this.getInfo(function(info){
            info = JSON.parse(info);

            //Android
            if ( info.clientName == 'android' ) {
                cb();
            //iOS
            } else {
                if ( window.WebViewJavascriptBridge ) {
                    return cb(WebViewJavascriptBridge);
                }
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    cb(WebViewJavascriptBridge);
                }, false);
            }

            function cb(bridge){
                callback.call(me, info, bridge);
            }
        });
    };

    /**
     *  判断是否在App里面
     *
     *  @param {Function} callback 
     *
     *  callback = function(clientName){ //获取客户端类型 'ios'、'android'、undefined }
     *  因iOS客户端固有缺陷，此方法只能异步调用，在callback里面获取是否在App里面的消息
     */
    HybridBridge.prototype.isInApp = function(callback){
        var me = this,
            UA = window.navigator.userAgent,
            isIosUA = /iPad|iPhone|iPod/.test(UA),
            isWalletClientUA = /WalletClient/.test(UA);

        if ( !callback || typeof callback !== 'function' ) throw '必要参数`callback`错误';

        if ( clientInfo ) return clientInfo;

        //判断是否是在 京东钱包 Android 客户端内
        if (typeof window.android === 'object' && isWalletClientUA) {
            clientInfo = 'android';
            callback.call(this, clientInfo);

        //判断是否是在 iOS 浏览器
        } else if (isIosUA) {

            //在APP里面
            if ( isWalletClientUA ) {
                clientInfo = 'ios';
                callback.call(this, clientInfo);
            } else {
                //IOS APP 第一次取不到UA信息，尝试每100ms获取一次，总共10次
                tryToGetClientInfo(10, 100);
            }
        } else {
            callback.call(this);
        }

        function tryToGetClientInfo(times, interval){
            var i = 0;
            (function checkStatus() {
                timmer = setTimeout(function() {
                    if ( !clientInfo && i < times ) {
                        checkStatus();
                    } else {
                        if ( clientInfo ) {
                            callback.call(me, clientInfo);
                        } else {
                            callback.call(me);
                        }
                    }
                    i++;
                }, interval);
            }());
        }
    };

    HybridBridge.prototype.renderFn = function(fn, remain){
        var me = this,
            name = this.unique('hybridBridgeCallbackFn');

        window[name] = function(){
            fn && fn.apply(me, arguments); 
            !remain && delete window[name];
        }
        return name;
    };

    HybridBridge.prototype.unique = function(){
        var i = 0;
        return function(prefix){
            var id = '' + (i++);
            return prefix ? (prefix + id) : id;
        };
    }();

    function noop(){};

    function reqNative(url){
        var iframe = document.createElement('iframe');
        iframe.src= 'native://' + url;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        setTimeout(function(){
            iframe.parentNode.removeChild(iframe);
        }, 200);
    }

    function convertToArgs(obj){
        var str = '';
        for ( var key in obj ) {
            str += '&' + key + '=' + obj[key];
        }
        return str;
    }

    function renderStartArgs(obj, bridge){        
        if (typeof obj != 'object') {
            throw '传入错误的参数类型';
        }

        return {
            moduleName: obj.name.toUpperCase(),
            paramsStr: convertToArgs(obj.params || {}),
            callbackName: bridge.renderFn(obj.callback)
        }
    }

    var bridge = new HybridBridge();


    var _globals = (function(){ return this || (0,eval)("this"); }());

    if (typeof module !== "undefined" && module.exports) {
        module.exports = bridge;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return bridge;});
    } else {
        _globals.HybridBridge = bridge;
    }
}.call(this));