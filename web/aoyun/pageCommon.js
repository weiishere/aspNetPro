!(function (exp) {
    exp.PageCommon = (function () {
        var result = {};
        //var defaultTransition = "3d";
        //var transition = 300;
        function Page(id, option) {
            var _self = this;
            _self.id = id;
            _self.container = $("#" + id);
            var o = $.extend({
                init: function () { },
                slideBefore: function () { },
                slideAfter: function () { },
                hide: function () { }
            }, option || {});
            for (var i in o) { _self[i] = o[i] }
            _self.init();
            _self.show = function (transition, callback) {
                var me = this;
                if (arguments.length == 1) {
                    if (typeof transition != "string") {
                        callback = transition; transition = undefined;
                    }
                }
                //alert($("#" + me.id).attr("type"));
                var _dt = transition || result.set.defaultTransition;
                $("#" + result.thisPage).addClass("trans-" + _dt + "-a");

                //if (transition === "modal") {
                //    //模态
                //} else {
                    
                //}

                
                
                $("#" + me.id).addClass("trans-" + _dt + "-b");
                me.slideBefore();
                window.setTimeout(function () {
                    $("#" + result.thisPage).removeClass(function (index, css) {
                        return (css.match(/\b(trans|in)-\S+/g) || []).join(' ');
                    });
                    $("#" + result.thisPage).addClass("out-" + _dt);
                    $("#" + me.id).removeClass(function (index, css) {
                        return (css.match(/\b(trans|out)-\S+/g) || []).join(' ');
                    });
                    $("#" + me.id).addClass("in-" + _dt);
                    me.slideAfter();
                    if (callback) callback.call(me);
                    me.back = (function (pa, pb) {
                        return function (_callback) {
                            $("#" + pb).addClass("trans-" + _dt + "-a");
                            $("#" + pa).addClass("trans-" + _dt + "-b");
                            $("#" + pb + ",#" + pa).addClass("back");
                            window.setTimeout(function () {
                                $("#" + pb).removeClass("trans-" + _dt + "-a in-" + _dt);
                                $("#" + pb).addClass("out-" + _dt);
                                $("#" + pa).removeClass("trans-" + _dt + "-b out-" + _dt);
                                $("#" + pa).addClass("in-" + _dt);
                                $("#" + pb + ",#" + pa).removeClass("back");
                                result.thisPage = pa;
                                if (_callback) _callback();
                            }, transitionArr[_dt]);
                        }
                    })(result.thisPage, me.id);
                    result.thisPage = me.id;
                }, transitionArr[_dt]);
            }
        }
        result.Page = Page;
        var transitionArr = {};
        transitionArr["slider"] = 300;
        transitionArr["overturn"] = 500;
        transitionArr["zoom"] = 400;
        result.init = function (homePage, option) {
            var _self = this;
            _self.set = $.extend({
                defaultTransition: "slider"
            }, option || {});
            result.thisPage = homePage;
            $("#" + homePage).addClass("in-" + _self.set.defaultTransition);
        }
        return result;
    })();
    exp.delayCommon = function () {
        if (arguments.length == 0) { return; }
        var moveItem = Array.prototype.slice.call(arguments);
        var index = 0;
        var lostTime = 0;
        var thisTime = moveItem[0].time;
        var length = moveItem.length;
        var timer = window.setInterval(function () {
            if (lostTime == thisTime) {
                lostTime = 0;
                var _index = index;
                index++;
                moveItem[_index].fn();
                if (index == length) {
                    window.clearInterval(timer);
                } else {
                    thisTime = moveItem[index].time;
                }
            }
            lostTime += 10;
        }, 10);
    }
})(window);