var root = window; (function (a, b) { if (document.MBLOADED) { return } if (typeof define === "function" && (define.amd || define.cmd)) { define("mobilebone", function (c) { return b(a, c) }) } else { a.Mobilebone = b(a, {}) } })(this, function (g, d) { if (document.MBLOADED) { return "Don't repeat load Mobilebone!" } var i = {}; var e = []; var j = e.slice; var a = /^#?\w+(?:[\-_]\w+)*$/i; var c = "WebkitAppearance" in document.documentElement.style || typeof document.webkitHidden != "undefined"; var h = "pushState" in history && "replaceState" in history; d.support = h; var f = false; d.VERSION = "2.6.2"; d.captureLink = true; d.captureForm = true; d.rootTransition = g; d.mergeCallback = true; d.classAnimation = "slide"; d.classPage = "page"; d.classMask = "mask"; d.pushStateEnabled = true; d.evalScript = false; if ((window.navigator.userAgent.indexOf("Firefox") >= 0 && window.top !== window)) { d.pushStateEnabled = false } if (h == false) { return d } history.popstate = false; d.transition = function (E, q, x, t) { if (arguments.length == 0 || E == q) { return } if (arguments.length == 3 && isNaN(x * 1) == true) { t = x; x = t.back } q = q || null, x = x || false, t = t || {}; var u = { root: this.rootTransition, form: this.form || this.classAnimation, onpagefirstinto: this.onpagefirstinto, animationstart: this.animationstart, animationend: this.animationend, preventdefault: this.preventdefault, fallback: this.fallback, callback: this.callback }, w = function (J) { if (!J || !J.getAttribute) { return {} } var I = {}, K = b(J.getAttribute("data-params") || "");["title", "root", "form"].forEach(function (L) { I[L] = J.getAttribute("data-" + L) || K[L] || t[L] || u[L] }); if (typeof I.root == "string") { I.root = d.getFunction(I.root) } ["onpagefirstinto", "callback", "fallback", "animationstart", "animationend", "preventdefault"].forEach(function (M) { if (d.mergeCallback == true && typeof u[M] == "function") { var L = J.getAttribute("data-" + M) || K[M]; if (typeof I.root[L] == "function") { I[M] = function () { u[M].apply(this, arguments); I.root[L].apply(this, arguments) } } else { if (typeof t[M] == "function") { I[M] = function () { u[M].apply(this, arguments); t[M].apply(this, arguments) } } else { I[M] = u[M] } } } else { I[M] = J.getAttribute("data-" + M) || K[M] || t[M] || u[M] } }); return I }; var s = w(q), o = w(E); if (q != null && q.classList) { var G = s.preventdefault, k = false; if (typeof G == "string") { G = s.root[G] } } if (E != null && E.classList) { var l = o.preventdefault, m = false; if (typeof l == "string") { l = o.root[l] } } if (typeof G == "function") { k = G.call(s.root, E, q, t) } if (k == true && G === l) { return false } if (typeof l == "function") { m = l.call(o.root, E, q, t) } if (m == true) { return false } var v = function (J, I) { if (J.flagAniBind == true) { return } ["animationstart", "animationend"].forEach(function (N, L) { var K = o[N], O = "webkit" + N.replace(/^a|s|e/g, function (P) { return P.toUpperCase() }); var M = c ? O : N; if (L) { J.addEventListener(M, function () { if (this.classList.contains("in") == false) { this.style.display = "none"; if (this.removeSelf == true) { this.parentElement.removeChild(this); this.removeSelf = null } } this.classList.remove(w(this).form) }) } if (typeof K == "string" && o.root[K]) { J.addEventListener(M, function () { I.root[K].call(I.root, this, this.classList.contains("in") ? "into" : "out", t) }) } else { if (typeof K == "function") { J.addEventListener(M, function () { K.call(I.root, this, this.classList.contains("in") ? "into" : "out", t) }) } } J.flagAniBind = true }) }; if (q != null && q.classList) { if (k != true) { q.classList.add(s.form); q.offsetWidth = q.offsetWidth; q.style.display = "block"; q.classList.add("out"); q.classList.remove("in"); q.classList[x ? "add" : "remove"]("reverse"); q.removeSelf = q.removeSelf || null; v(q, s); var A = s.fallback; if (typeof A == "string") { A = s.root[A] } if (typeof A == "function") { A.call(s.root, E, q, t) } } } if (E != null && E.classList) { var H = o.title, D = document.querySelector("h1"), p = document.querySelector("." + this.classPage); if (H && t.title !== false) { document.title = H; if (D) { D.innerHTML = H; D.title = H } } else { if (p == E && !q && document.title) { E.setAttribute("data-title", document.title) } } var n = t.id || E.id, z = t.id || E.id; if (t.id) { n = n.split("?")[0] } var B = i["_" + n]; if (t.remove !== false && i[n] && i[n] != E) { if (B && i[B] && t.reload == true) { delete i[B]; delete i["_" + n] } if (i[n] != q) { i[n].parentElement && i[n].parentElement.removeChild(i[n]) } else { q.removeSelf = true } delete i[n] } if (q) { E.classList.add(o.form) } E.offsetWidth = E.offsetWidth; E.style.display = "block"; E.classList.remove("out"); E.classList.add("in"); E.classList[x ? "add" : "remove"]("reverse"); var y = o.onpagefirstinto; if (!E.firstintoBind) { if (typeof y == "string" && o.root[y]) { o.root[y].call(o.root, E, q, t) } else { if (typeof y == "function") { y.call(o.root, E, q, t) } } j.call(E.querySelectorAll("form")).forEach(function (I) { d.submit(I) }); E.firstintoBind = true } v(E, o); var C = z, F = ""; if (C && /^#/.test(C) == false) { C = "#" + C } F = C.replace(/^#/, "#&"); if (h && this.pushStateEnabled && t.history !== false && C && F != location.hash) { history.popstate = false; history[q ? "pushState" : "replaceState"](null, document.title, C.replace(/^#/, "#&")) } if (!i[n]) { i[n] = E; if (z !== n) { i[z] = E; i["_" + n] = z } } var r = o.callback; if (typeof r == "string") { r = o.root[r] } if (typeof r == "function") { r.call(o.root, E, q, t) } setTimeout(function () { history.popstate = true }, 17) } }; d.getCleanUrl = function (p, l, n) { var k = "", s = "", t = ""; if (p) { if (p.nodeType == 1) { if (p.action) { k = p.getAttribute("action"); if (p.method && p.method.toUpperCase() == "POST") { return k } else { if (window.$ && $.fn && $.fn.serialize) { s = $(p).serialize() } else { s = {}; j.call(p.querySelectorAll("input,select,textarea")).forEach(function (v) { if (v.name && !v.disabled) { var w = v.value.trim(), u = v.name; if (/^radio|checkbox/i.test(v.type)) { if (v.checked) { if (s[u]) { s[u].push(w) } else { s[u] = [w] } } } else { s[u] = [w] } } }) } } } else { k = p.getAttribute("href"); s = p.getAttribute("data-formdata") || p.getAttribute("data-data") || ""; var r = "container", o = p.getAttribute("data-" + r); if (s.indexOf(r) == -1 && o) { var q = r + "=" + o; s = s ? s + "&" + q : q } } } else { if (p.url) { k = p.url; s = p.data } } } if (!(k = k || l)) { return "" } s = s || n || ""; if (typeof s == "object") { var m = []; for (key in s) { if (!s[key].forEach) { s[key] = [s[key]] } s[key].forEach(function (u) { m.push(key + "=" + encodeURIComponent(u)) }) } if (m.length > 0) { s = m.join("&") } else { s = "" } } t = k.split("#")[0].replace(/&+$/, ""); if (t.slice(-1) == "?") { t = t.split("?")[0] } if (s != "") { if (/\?/.test(t)) { s = s.replace(/^&|\?/, ""); t = t + "&" + s } else { if (s != "") { s = s.replace("?", ""); t = t + "?" + s } } } return t }; d.createPage = function (s, r, y) { var p = null, x = null, q = this.classPage, w = null; if (!s) { return } if (typeof y == "undefined" && typeof r == "object") { y = r } y = y || {}; var v = {}; var l, z, o; if (r) { if (r.nodeType == 1) { if (r.href || r.action) { l = r.getAttribute("data-title") || y.title } p = y.response; z = r.getAttribute("data-container"); x = document.getElementById(z); o = r.getAttribute("data-classpage"); v.target = r; w = r.getAttribute("data-reload"); if (r.tagName.toLowerCase() == "form" || (w !== null && w != "false")) { v.reload = true } v.back = r.getAttribute("data-rel") == "back"; if (r.getAttribute("data-history") == "false") { v.history = false } } else { p = r.response || y.response; l = r.title || y.title; x = r.container || y.container; o = r.classPage || y.classPage; v.target = r.target; v.back = r.back || y.back } if (x && o) { q = o } } var u = (q == o ? x : document).querySelector(".in." + q); var n = null; var m = document.createElement("div"); if (typeof s == "string") { m.innerHTML = s } else { m.appendChild(s) } if (d.evalScript == true && s.firstintoBind != true) { j.call(m.getElementsByTagName("script")).forEach(function (B) { var A = B.innerHTML.trim(), E = B.getAttribute("type"); if (A.trim() == "" || B.src) { return } var C = document.getElementsByTagName("head")[0] || document.documentElement, D = document.createElement("script"); if (E) { D.type = E } D.appendChild(document.createTextNode(A)); setTimeout(function () { C.insertBefore(D, C.firstChild); C.removeChild(D); D = null }, 17); B = null }) } var k = m.getElementsByTagName("title")[0]; if (!(n = m.querySelector("." + q))) { m.className = q + " out"; n = m } if (typeof l == "string") { n.setAttribute("data-title", l) } else { if (k && k.innerText) { n.setAttribute("data-title", k.innerText) } } v.response = p || s; v.id = this.getCleanUrl(r) || n.id || ("unique" + Date.now()); if (typeof y == "object") { if (typeof y.history != "undefined") { v.history = y.history } if (typeof y.remove != "undefined") { v.remove = y.remove } if (typeof y.target != "undefined") { v.target = y.target } if (typeof y.title != "undefined") { v.title = y.title } } if (q == o) { v.history = false; v.classPage = q } x = x || document.body; var t = v.id.split("?")[0]; if (t && i[t] && x.contains(i[t])) { x.insertBefore(n, i[t]) } else { x.appendChild(n) } m = null; this.transition(n, u, v) }; d.getFunction = function (n) { if (typeof n != "string") { return } var k = g, m = n.split("."); for (var l = 0; l < m.length; l += 1) { if (!(k = k[m[l]])) { break } } return k }; d.ajax = function (k) { if (!k) { return } var n = { url: "", type: "", dataType: "", data: {}, timeout: 10000, async: true, username: "", password: "", success: function () { }, error: function () { }, complete: function () { } }; var o = {}, s = null, l = null; var u = {}, v; if (k.nodeType == 1) { u = b(k.getAttribute("data-params") || ""); for (key in n) { o[key] = k.getAttribute("data-" + key) || u[key] || n[key]; if (typeof n[key] == "function" && typeof o[key] == "string") { o[key] = this.getFunction(o[key]); if (typeof o[key] != "function") { o[key] = n[key] } } } o.url = this.getCleanUrl(k, o.url); o.target = k; o.back = k.getAttribute("data-rel") == "back"; var q = k.tagName.toLowerCase(); if (q == "form") { o.type = k.method; l = new FormData(k) } else { if (q == "a") { var t = k.getAttribute("data-container"), m = k.getAttribute("data-classpage"), r = t && document.getElementById(t); if (r && m && m != d.classPage) { o.history = false; o.title = false } } } v = k.getAttribute("data-mask"); if (v == "true" || v == "") { s = k.querySelector("." + this.classMask) } } else { if (k.url) { for (key2 in n) { o[key2] = k[key2] || n[key2] } o.url = this.getCleanUrl(null, o.url, o.data); o.title = k.title; o.back = k.back; o.container = k.container } else { return } } var p = r || document.body; if (typeof v != "string") { s = p.querySelector("." + this.classMask) } if (s == null) { s = document.createElement("div"); s.className = this.classMask; s.innerHTML = '<i class="loading"></i>'; if (typeof v == "string") { k.appendChild(s) } else { p.appendChild(s) } } s.style.display = "block"; var w = new XMLHttpRequest(); w.open(o.type || "GET", o.url + (/\?/.test(o.url) ? "&" : "?") + "r=" + Date.now(), o.async, o.username, o.password); w.timeout = o.timeout; w.onload = function () { var x = null; if (w.status == 200) { if (o.dataType == "json" || o.dataType == "JSON") { try { x = JSON.parse(w.response); o.response = x; d.createPage(d.jsonHandle(x), k, o) } catch (y) { o.message = "JSON parse error：" + y.message; o.error.call(o, w, w.status) } } else { if (o.dataType == "unknown") { o.history = false; try { x = JSON.parse(w.response); o.response = x; d.createPage(d.jsonHandle(x), k, o) } catch (y) { x = w.response; d.createPage(x, k, o) } } else { x = w.response; d.createPage(x, k, o) } } o.success.call(o, x, w.status) } else { o.message = "The status code exception!"; o.error.call(o, w, w.status) } o.complete.call(o, w, w.status); s.style.display = "none" }; w.onerror = function (x) { o.message = "Illegal request address or an unexpected network error!"; o.error.call(o, w, w.status); s.style.display = "none" }; w.ontimeout = function () { o.message = "The request timeout!"; o.error.call(o, w, w.status); s.style.display = "none" }; w.setRequestHeader("Type", "ajax"); w.setRequestHeader("From", "mobilebone"); w.send(l) }; d.submit = function (k) { if (!k || typeof k.action != "string") { return } var l = k.getAttribute("data-ajax"); if (l == "false" || (d.captureForm == false && l != "true")) { return } k.addEventListener("submit", function (n) { var o = this.getAttribute("data-preventdefault"); var m = d.getFunction(o); if (typeof m == "function" && m(this) == true) { n.preventDefault(); return false } d.ajax(this); n.preventDefault() }) }; d.isBack = function (l, k) { if (history.tempBack == true) { history.tempBack = null; return true } if (typeof l == "undefined") { return true } if (!k) { return false } return l.compareDocumentPosition(k) == 4 }; d.jsonHandle = function (k) { return '<p style="text-align:center;">Dear master, if you see me, show that JSON parsing function is undefined!</p>' }, d.init = function () { if (f == true) { return "Don't repeat initialization!" } var m = location.hash.replace("#&", "#"), n = null, k = null; if (m == "" || m == "#") { this.transition(document.querySelector("." + this.classPage)) } else { if (a.test(m) == true && (n = document.querySelector(m)) && n.classList.contains(this.classPage)) { this.transition(n) } else { if (m.split("container=").length == 2) { k = document.getElementById(m.split("container=")[1].split("&")[0]) } this.ajax({ url: m.replace("#", ""), dataType: "unknown", container: k, error: function () { n = document.querySelector("." + d.classPage); d.transition(n) } }) } } var l = g.$ || g.jQuery || g.Zepto; if (l && l.fn && l.fn.tap && ("ontouchstart" in window == true)) { l(document).tap(this.handleTapEvent); document.addEventListener("click", function (q) { var s = q.target; if (!s) { return } if (s.tagName.toLowerCase() != "a" && !(s = s.getParentElementByTag("a"))) { return } var r = s.getAttribute("data-ajax"), p = s.href; if (s.getAttribute("data-rel") == "external" || r == "false" || (p.replace("://", "").split("/")[0] !== location.href.replace("://", "").split("/")[0] && r != "true") || (d.captureLink == false && r != "true")) { if (/^http/i.test(p)) { location.href = p } return } q.preventDefault() }) } else { document.addEventListener("click", this.handleTapEvent) } var o = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.hidden !== "undefined" && !window.chrome; if ("ontouchstart" in window == true && o) { document.addEventListener("touchmove", function () { history.popstateswipe = true }); document.addEventListener("touchend", function () { history.popstateswipe = false }) } f = true }; d.handleTapEvent = function (A) { var w = null; if (A && A.nodeType == 1) { w = A; w.preventDefault = function () { } } w = w || A.target || A.touches[0], href = w.href; if ((!href || /a/i.test(w.tagName) == false) && (w = w.getParentElementByTag("a"))) { href = w.href } var q = document.querySelector(".in." + d.classPage); if (q == null || !w) { return } var o = { target: w }; var v = w.getAttribute("data-preventdefault") || b(w.getAttribute("data-params") || "").preventdefault; var s = d.getFunction(v); if (typeof s == "function" && s(w) == true) { A.preventDefault(); return false } var B = w.getElementsByClassName(d.classMask)[0]; if (B && B.style.display != "none") { A.preventDefault(); return false } var C = w.getAttribute("data-container"), k = w.getAttribute("data-classpage"), l = C && document.getElementById(C); if (l && k && k != d.classPage) { q = l.querySelector(".in." + k) || l.querySelector(k); o.history = false; o.title = false; o.classPage = k } var z = (d.captureLink == true); var m = w.getAttribute("data-rel"); var y = false; if (m == "back") { y = true } var n = (m == "external"); if (!href) { return } href = href.replace("#&", "#"); if (w.getAttribute("href").replace(/#/g, "") === "") { A.preventDefault(); return } if (/^javascript/.test(href)) { if (y == false) { return } } else { n = n || (href.replace("://", "").split("/")[0] !== location.href.replace("://", "").split("/")[0]); if ((n == true || z == false) && w.getAttribute("data-ajax") != "true") { return } } if (/^#/.test(w.getAttribute("href")) == true) { var t = href.split("#")[1], p = t && document.getElementById(t); if (y == false && m == "auto") { y = d.isBack(p, q) } if (p) { d.transition(p, q, y, o) } A.preventDefault() } else { if (/^javascript/.test(href)) { history.tempBack = true; history.back() } else { if (w.getAttribute("data-ajax") != "false") { var D = d.getCleanUrl(w); var u = w.getAttribute("data-reload"), x = w.getAttribute("href"); if ((u == null || u == "false") && i[D]) { if (y == false && m == "auto") { y = d.isBack(i[D], q) } o.id = D; var r = l || document.body; if (r.contains(i[D]) == false) { r.appendChild(i[D]) } d.transition(i[D], q, y, o) } else { d.ajax(w) } A.preventDefault() } } } }; Element.prototype.getParentElementByTag = function (k) { if (!k) { return null } var n = null, m = this; var l = function () { m = m.parentElement; if (!m) { return null } var o = m.tagName.toLowerCase(); if (o === k) { n = m } else { if (o == "body") { n = null } else { l() } } }; l(); return n }; var b = function (k) { var l = {}; if (typeof k == "string") { k.split("&").forEach(function (m) { var n = m.split("="); if (n.length > 1) { l[n[0]] = m.replace(n[0] + "=", "") } }) } return l }; window.addEventListener("DOMContentLoaded", function () { if (f == false) { d.init() } }); window.addEventListener("popstate", function () { if (history.popstateswipe == true) { location.reload(); history.popstateswipe = false; return } if (history.popstate == false) { history.popstate = true; return } var n = location.hash.replace("#&", "").replace(/^#/, ""), l = null, m = null; if (n == "") { l = document.querySelector("." + d.classPage); if (l.id) { return } } else { l = i[n]; if (n.split("container=").length == 2) { m = document.getElementById(n.split("container=")[1].split("&")[0]) } if (l && a.test(n) == false) { d.transition(l, ((m || document).querySelector(".in." + d.classPage)), true, { id: n, history: false, container: m }); return } } if (!l) { if (a.test(n) == false) { d.ajax({ url: n, dataType: "unknown", back: d.isBack(), container: m }); return } l = document.querySelector("#" + n) } var k = document.querySelector(".in." + d.classPage); if ((l && l == k) || d.pushStateEnabled == false) { return } if (l) { d.transition(l, k, d.isBack(l, k), { id: n, history: false, remove: false }) } }); document.MBLOADED = true; return d });



var _mApp = mApp({ eventId: 269070 });
var mAppConfig = _mApp.config();
Mobilebone.init();
(function (exp) {
    //messagesBox
    exp.openAlert = function (title, text, buttonEvent, option) {
        if (!title && !text) { return false; }
        var self = this;
        var _option = $.extend({
            isCloseBtu: true
        }, option || {});
        $("body").append("<div class=\"alertWrap\" id=\"alertWrap\"><div class=\"alert\"><h1>消息标题</h1><span></span><div class=\"buttonWrap\"></div></div></div>");
        if (_option.isCloseBtu) { $("#alertWrap i").show().click(function () { self.closeAlert() }); }
        $("#alertWrap").show().find("h1").html(title);
        $("#alertWrap").find("span").html(text);
        window.setTimeout(function () { $(".alert").addClass("alertActive"); }, 10);
        var buHtml = "";
        if (buttonEvent) {
            buttonEvent.forEach(function (i) { buHtml += "<button " + (buttonEvent.length == 1 ? 'class=\"singleBtu\"' : '') + ">" + i.name + "</button>"; });
        } else {
            buHtml = "<button class=\"singleBtu\">OK</button>";
        }
        $("#alertWrap").find(".buttonWrap").empty().append(buHtml);
        self.closeAlert = function (fn) {
            $(".alert").removeClass("alertActive");
            window.setTimeout(function () {
                $("#alertWrap").fadeOut("fast", function () {
                    if (fn) fn();
                    $("#alertWrap").remove();
                });
            }, 50);
        }
        $("#alertWrap button").each(function (i, item) {
            $(this).unbind("click").click(function () {
                if (!buttonEvent) { self.closeAlert(); return false; }
                if (buttonEvent[i].hasOwnProperty("fn")) {
                    buttonEvent[i].fn.call(self);
                } else {
                    self.closeAlert(function () { });
                }
            });
        });
    }
    exp.requestAjax = function (url, option, data, success) {
        var _option = $.extend({
            type: "get",
            dataType: "json",
            async: true,
        }, option || {});
        $.ajax({
            type: _option.type,
            dataType: _option.dataType,
            async: _option.async,
            url: url,
            data: data,
            beforeSend: function () {
                $("#loading").show();
            },
            success: function (data) {
                $("#loading").hide();
                success(data);
            },
            complete: function () { },
            error: function (data) {
                $("#loading").hide();
                alert("内部错误：" + JSON.stringify(data));
            }
        });
    }
    exp.Trip = function (option) {
        var _option = typeof option === "string" ? { content: option } : option;
        var setting = $.extend({
            title: "",
            content: "",
            position: "center",//"bottom"//"top"
            timeout: 2000,
            callBack: function () { }
        }, _option || {});
        var className = new Object();
        className["center"] = ""; className["bottom"] = "floatWindow_bottom"; className["top"] = "floatWindow_top";
        var _window = "<div id=\"floatWindow\" class=\"floatWindow " + className[setting.position] + "\"><h2>" + setting.title + "</h2><p>" + setting.content + "</p></div>";
        if ($("#floatWindow").size() == 0) { $("body").append(_window); }
        //$("body").one("click", function () { if ($("#floatWindow").size() != 0) { _close(); return false; } });
        var floatWindow = $("#floatWindow");
        floatWindow.animate({ "opacity": 1, "width": "50%", "height": floatWindow.height() * 1.1 }, 200, function () { setting.callBack(); });
        var _close = function () { if (floatWindow.size() != 0) { floatWindow.animate({ "opacity": 0, "width": "48%", "height": $("#floatWindow").height() * 0.99 }, 150, function () { $(this).remove() }); } }
        var _timer = window.setInterval(function () { _close(); window.clearInterval(_timer); }, setting.timeout);
        if (typeof event !== "undefined") event.stopPropagation();
    }
    exp.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    exp.validateObj = {};
    exp.requestForJsonPHander = function (data) {
        if (data.retCode === 'RM000000' || isNormalRequest) {
            return true;
        } else {
            if (data.retCode === 'RMF00002') {
                Trip('您已参与过此活动！');
            } else if (data.retCode === 'RMF00005') {
                Trip('您已经投过票了！');
            } else {
                Trip(data.retMessage);
            }
            return false;
        }
    }
    exp.requestForJsonP = function (url, option, success, noLoading, isNormalRequest) {
        if (!noLoading) $("#loading").show();
        var radomId = parseInt(Math.random() * 100000);
        var _option = $.extend({
            callbackHeader: "callBack_" + radomId,
            param: "",
            error: function () { }
        }, option || {});
        exp[_option.callbackHeader] = function (data) {
            if (requestForJsonPHander(data)) { if (typeof (success) == "function") success(data); }
        }

        var _script = document.createElement("script");
        _script.id = "jspSctipt_" + radomId;
        _script.setAttribute("type", "text/javascript");
        _script.onload = _script.onreadystatechange = function () {
            if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                $("#loading").hide();
            } else {
                $("#loading").hide();
                Trip("对不起 ，请求发生错误~");
                _option.error();
            }
        }
        _script.setAttribute("src", url + "?callback=" + _option.callbackHeader + "&" + _option.param + "&timer=" + parseInt(Math.random() * 100000));
        (document.getElementsByTagName("head").item(0) || document.documentElement).appendChild(_script);
    }
    exp.phoneValidate = function (number, code, getCode, submit, option) {
        var phoneNumber;//缓存出phoneNumber
        var getTime = function () {
            var time = _option.requestTime;
            getCode.attr("disabled", true);
            getCode.html(_option.requestText.replace("requestText", time));
            var timer = window.setInterval(function () {
                if (time == 1) {
                    getCode.attr("disabled", false);
                    window.clearInterval(timer);
                    getCode.html(_option.readyText);
                    return false;
                }
                getCode.html(_option.requestText.replace("requestText", --time));
            }, 1000);
        }
        var _option = $.extend({
            readyText: "获取验证码",
            requestTime: 60,
            requestText: "requestText 's后重获",
            ajaxfn: undefined,
            ajaxUrl: "",
            validateUrl: "",
            getCodeCallBack: function (data) { },
            submitCallBack: function () { },
            error: function (data) { }
        }, option || {});
        getCode.on("click", function () {
            if (!validateObj["t8882m810528"].result) {
                return false;
            }
            if (_option.ajaxfn) {
                _option.ajaxfn.call(number[0]);
                return false;
            }
            if (_option.ajaxUrl == "") return false;
            _option.ajaxUrl = _option.ajaxUrl.indexOf("?") == -1 ? _option.ajaxUrl + "?timer=" + Math.random() : _option.ajaxUrl + "&timer=" + Math.random();
            _option.validateUrl = _option.validateUrl.indexOf("?") == -1 ? _option.validateUrl + "?timer=" + Math.random() : _option.validateUrl + "&timer=" + Math.random();
            requestAjax(_option.ajaxUrl, {}, { entranceId: Config.entranceId, mobile: number.val() }, function (data) {
                if (data.code == "A00000") getTime();
                phoneNumber = number.val();
                _option.getCodeCallBack(data);
            });
        });
        submit.on("click", function () {
            requestAjax(_option.validateUrl, {},
                {
                    entranceId: Config.entranceId,
                    wxOpenId: Config.wxOpenId,
                    mobile: phoneNumber,
                    verifyCode: code.val(),
                    qrCode: Config.qrCode
                }
            , function (data) {
                _option.submitCallBack(data);
            });
        });
    }

    //alert($(".page[role='homePage']").size());

    exp.PageCommon = (function (pageHome, exp) {
        var result = {
            initFirstPage: function (pageId) { lastPage = pageId; }
        };
        var pagesList = [];
        var lastPage = pageHome;
        function Page(id, option) {
            var self = this;
            self.id = id;
            self._showCall = function () { }
            self.show = function (fn) {
                if (fn) this._showCall = fn;
                Mobilebone.transition(document.querySelector("#" + id), document.querySelector("#" + lastPage));
            }
            var _option = $.extend({
                showBack: function () { },
                init: function () { },
                hide: function () { }
            }, option || {});
            for (var i in _option) { self[i] = _option[i]; }
            pagesList.push(self);
        }
        var getPage = function (pageinId, fn) {
            for (var i = 0; i < pagesList.length; i++) {
                if (pagesList[i].id == pageinId) {
                    fn.call(pagesList[i]);
                    return;
                }
            }
        }
        Mobilebone.callback = function (pagein) {
            //if (pageHome == lastPage) { return false; }
            lastPage = pagein.id;
            getPage(pagein.id, function () {
                this.showBack();
                this._showCall();
                this._showCall = function () { }
            });
        };
        Mobilebone.onpagefirstinto = function (pagein) {
            getPage(pagein.id, function () { this.init(); });
        };
        Mobilebone.fallback = function (pagein) {
            getPage(pagein.id, function () { this.hide(); });
        };
        exp.Page = Page;
        return result;
    })((location.hash ? location.hash.split("&")[1] : $(".page[role='homePage']")[0].id), exp);
    exp.Config = {
        entranceId: "2015122300000000002",
        serverUrl: "http://m.jdpay.com/",
        appUrl: "http://m.jdpay.com/",
        wxOpenId: "",
        set: function () {
            var self = this;
            var paramStrs = ['qrCode', 'wxOpenId', 'auth', 'code', 'refresh_token', 'entranceId'];
            paramStrs.forEach(function (item) {
                var value = getParameterByName(item);
                if (value) self[item] = value;
            });
        }
    }
})(window);

Config.set();
var models = {};
var modelGuids = function (guid) {
    models[guid] = $("*[guid=" + guid + "]");
}
var mk_m = (function () {
    var result = {};
    result.initHeight = function (dom) {
        var r = $(dom).attr("ratio").split(",");
        var ratio = parseInt(r[0]) / parseInt(r[1]);
        var height = $(dom).width() * ratio;
        $(dom).height(height);
    }
    result.openActivityRole = function () {
        var _html = "<div class='activityRoleTextWrap' style='display:none' id='roleLayer'><div class='RoleTextWrap'><span class='close'><img src='http://img12.360buyimg.com/cms/jfs/t1936/186/2409786086/2419/e7d381e0/56dec94eN3e56c191.png'/></span><div>" + $("#hd_roleText").html() + "</div></div></div>";
        $("body").append(_html).find("#roleLayer").show().find(".close").click(function () {
            $("#roleLayer>div").removeClass("showRole");
            window.setTimeout(function () { $("#roleLayer").hide(); }, 300);
        });
        window.setTimeout(function () {
            $("#roleLayer>div").addClass("showRole");
        }, 10);
    }
    result.addValidate = function (dom, valiObjName, validateStr, errorWeak) {
        validateObj[valiObjName] = { "validateStr": validateStr, "result": false }
        dom.on("blur", function () {
            if (!validateStr.test($(this).val())) {
                Trip(errorWeak);
                this.focus();
                validateObj[valiObjName].result = false;
            } else {
                validateObj[valiObjName].result = true;
            }
        });
    }
    return result;
})();
