
function shareInit(title, content, url, appTitle) {
    var shareData = {
        title: title,
        content: content,
        url: url,
        appTitle: appTitle
    }

    _mApp.jdWalletReady(function (clientInfo) {
        window.shareCallback = function () {
            try {
                _mApp.share({
                    url: shareData.url,
                    title: shareData.title,
                    desc: shareData.content,
                    callback: "JdWalletShareCallback"
                })
            } catch (e) { };
        };
        //在钱包 
        if (clientInfo.isInApp) {
            if (_mApp.config().inAndroid) {
                _mApp.setTitle(shareData.appTitle);
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
                _mApp.setTitle(shareData.appTitle);
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
        } else {
            if (window.hasOwnProperty("isfooterBanner")) {
                _mApp.config().bottomBar({ touchFunc: true, style: 'style2' });
                $('.phoneView').css('padding-bottom', 92);
            }
        }
    });

}

