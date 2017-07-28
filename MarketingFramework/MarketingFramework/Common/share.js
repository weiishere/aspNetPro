
function shareInit(title, content, url, appTitle, shareImg) {
    var shareData_wx = {
        url: url,
        title: title,
        desc: content,
        defaultShare: true
    }
    var shareData_app = {
        url: url,
        title: title,
        desc: content,
        appTitle: appTitle,
        callback: "JdWalletShareCallback"
    }
    if (shareImg !== "") {
        shareData_wx["imgUrl"] = shareImg;
        shareData_app["iconUrl"] = shareImg;
        if (_mApp.configData().inJdWallet()) {
            if (_mApp.configData().inAndroid) {
                android.shareIconURL("shareUrl", shareImg);
            }
        }
    }

    _mApp.dataForWeixin(shareData_wx);

    window.setTimeout(function () {
        _mApp.jdWalletReady(function (clientInfo) {
            window.shareCallback = function () {
                try {
                    _mApp.share(shareData_app);
                } catch (e) { };
            };
            //在钱包 
            if (clientInfo.isInApp) {
                if (_mApp.config().inAndroid) {
                    _mApp.setTitle(appTitle);
                    _mApp.setMenu(
                        [
                            {
                                "menuTitle": "分享",
                                "menuAction": "shareCallback"
                            }
                        ]
                    )
                }
                if (_mApp.config().inIos) {
                    _mApp.setTitle(appTitle);
                    var timer = setInterval(function () {
                        if (window.WebViewJavascriptBridge) {
                            _mApp.setMenu(
                                [
                                    {
                                        "menuTitle": "分享",
                                        "menuAction": "shareCallback"
                                    }
                                ]
                            )
                            clearInterval(timer);
                        }
                    }, 100)
                }
            }
        });
    }, 50);
}



