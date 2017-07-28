({
    appDir: '.',
    baseUrl: './',
    dir: './built',
    fileExclusionRegExp: /^node_modules$|^release-history$^html$|.psd$|Gruntfile.js$|build.js$/,
    optimizeAllPluginResources: true,
    // optimize: 'none',

    //加载非AMD库标识
    //shim里面的key: 真实路径 基于baseUrl
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
    },

    modules: [
        {
            //基于BaseUrl的路径 
            name: 'Frame/main',
            include: []
        },
        {
            //基于BaseUrl的路径 
            name: 'Template/temp',
            include: []
        }
    ]
})
