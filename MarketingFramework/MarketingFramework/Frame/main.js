
require.config({
    baseUrl: (Global_data.queryAddress || "") + Global_data.RootPath,
    waitSeconds: 15,
    urlArgs: Global_data.webSiteCache ? "bust=" + Global_data.versionCode + "-" + parseInt(Math.random() * 10000) : "bust=" + Global_data.versionCode,
    paths: {
        "jquery": "Frame/jquery-1.8.2.min",
        "jqueryExtend": "Common/jqueryExtends",
        "underscore": "Frame/underscore-min",
        "colorpicker": "Frame/jquery.colorpicker",
        "global": "Common/Global",
        "initialize": "Common/initialize",
        "mainData": "Model/main",
        "core": "Common/core",
        "marketMod": "markets/marketMod",
        "markets": "markets/markets"
    },
    shim: {
        'jqueryExtend': ['jquery'],
        'underscore': ['jquery'],
        'colorpicker': ['jquery'],
        'global': ['jquery', 'jqueryExtend'],
        'initialize': ['jquery', 'underscore'],
        'mainData': ['jquery', 'global', 'initialize'],
        'core': ['jquery', 'global', 'initialize', 'mainData']
    }
});
require(["jquery", "jqueryExtend", "underscore", "colorpicker", "initialize", "global", "mainData", "core", "marketMod", "markets"], function ($, je, _, colorpicker, initialize, global, mainData, core, marketMod, markets) {
    //init({ global: global, initialize: initialize });
});