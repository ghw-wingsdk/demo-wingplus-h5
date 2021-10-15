(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("wingsdk", [], factory);
	else if(typeof exports === 'object')
		exports["wingsdk"] = factory();
	else
		root["wingsdk"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    var util = {}
    util.log = function(content){
        if(__webpack_require__(0).context.debug){
            var header = "[wing]";
            var msg = header;
            if (typeof content === "string") {
                msg += content;
            } else {
                msg += stringifyJSON(content);
            }
            console.log(msg);
        }

        function stringifyJSON (obj) {
            if (window.JSON && window.JSON.stringify) {
                return window.JSON.stringify(obj);
            }
            switch (typeof (obj)) {
                case 'string':
                    return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
                case 'array':
                    return '[' + obj.map(this.stringifyJSON).join(',') + ']';
                case 'object':
                    if (obj instanceof Array) {
                        var strArr = [];
                        var len = obj.length;
                        for (var i = 0; i < len; i++) {
                            strArr.push(this.stringifyJSON(obj[i]));
                        }
                        return '[' + strArr.join(',') + ']';
                    } else if (obj === null) {
                        return 'null';
                    } else {
                        var string = [];
                        for (var property in obj) {
                            if (obj.hasOwnProperty(property)) {
                                string.push(this.stringifyJSON(property) + ':' + this.stringifyJSON(obj[property]));
                            }
                        }
                        return '{' + string.join(',') + '}';
                    }
                    break;
                case 'number':
                    return obj;
                case false:
                    return obj;
                case 'boolean':
                    return obj;
            }
        };
    }




    util.md5 = function(content){
        util.log('signStr='+content)
        var hexCase = 0;
        var chrsz = 8
        function binl2hex(binarray) {
            var hex_tab = hexCase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
            }
            return str;
        }

        function str2binl(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
            return bin;
        }

        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        function bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        function md5_cmn(q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        }

        function md5_ff(a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function md5_gg(a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function md5_hh(a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function md5_ii(a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        function core_md5(x, len) {
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;

                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);

        }
        var sign = binl2hex(core_md5(str2binl(content), content.length * chrsz));
        util.log('sign='+sign)
        return sign;
    }

    util.cookie = {
        write:function(name, value, days, domain, path) {
            var date = new Date();
            days = days || 30; // 默认30天
            path = path || '/';
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();
            var cookieValue = name + '=' + value + expires + '; path=' + path;
            if (domain) {
                cookieValue += '; domain=' + domain;
            }
            document.cookie = cookieValue;
        },
        read:function(name) {
            var allCookie = '' + document.cookie;
            var index = allCookie.indexOf(name);
            if (name === undefined || name === '' || index === -1) return '';
            var ind1 = allCookie.indexOf(';', index);
            if (ind1 == -1) ind1 = allCookie.length;
            return unescape(allCookie.substring(index + name.length + 1, ind1));
        },
        remove:function(name) {
            if (this.read(name)) {
                this.write(name, '', -1, null, '/');
            }
        }
    }


    util.ajax = function(){
        this.log('start ajax request:')
        var ajaxData = {
            type:arguments[0].type || "GET",
            url:arguments[0].url || "",
            async:arguments[0].async,
            data:arguments[0].data || null,
            dataType:arguments[0].dataType || "text",
            contentType:arguments[0].contentType || "application/x-www-form-urlencoded",
            beforeSend:arguments[0].beforeSend || function(){},
            success:arguments[0].success || function(){},
            error:arguments[0].error || function(){}
        }
        if(ajaxData.async== null){
            ajaxData.async=true;
        }
        this.log('request params:')
        this.log(ajaxData)
        ajaxData.beforeSend()
        var xhr = null;

        if (window.XMLHttpRequest)  {
            xhr =  new XMLHttpRequest();
        } else if (window.ActiveXObject){
            xhr =  new ActiveXObject("Microsoft.XMLHTTP");
        }else {
            //不支持ajax
            this.log('Your Browser does not support ajax')
        }


        var convertData = "" ;
        if( typeof ajaxData.data === 'object' ){
            for(var c in ajaxData.data){
                convertData += c + "=" + ajaxData.data[c] + "&";
            }
            convertData = convertData.substring(0,convertData.length-1)
        } else {
            convertData = ajaxData.data;
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                    util.log('result:'+(xhr.response || xhr.responseText))
                    ajaxData.success(xhr.response || xhr.responseText)
                }else{
                    ajaxData.error(xhr.response)
                }
            }
        }

        if(ajaxData.type.toUpperCase() == 'GET'){
            xhr.open('GET', ajaxData.url+'?'+convertData,ajaxData.async);
            xhr.send();
        } else if(ajaxData.type.toUpperCase() == 'POST'){
            xhr.open('POST', ajaxData.url, ajaxData.async);
            // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
            xhr.setRequestHeader("Content-type",ajaxData.contentType);
            xhr.send(convertData);
        }

    }

    /**
     * 签名 支持（单个字段，对象，和集合）
     */
    util.sign =function  (){
        var len = arguments.length;
        var osign="";
        for(var i = 0;i<len;i++){
            var param=arguments[i];
            if(param==null || param==0){
                osign+='';
                continue;
            }
            switch (typeof param){
                case 'array':
                    for(var j=0;j<param.length;j++){
                        if(param[j]==null){
                            osign+='';
                            continue;
                        }
                        osign+=param[j];
                    }
                    break;
                case 'object':
                    if(param instanceof Array){
                        for(var j=0;j<param.length;j++){
                            if(param[j]==null){
                                osign+='';
                                continue;
                            }
                            osign+=param[j];
                        }
                        break;
                    }
                    for (var property in param) {
                        if(param[property]==null){
                            osign+='';
                            continue;
                        }
                        osign+=param[property];
                    }
                    break;
                default :
                    osign+=param;
                    break;

            }
        }
        console.log(osign)
        return util.md5(osign);
    };


    util.$Id = function (id){
       return  document.getElementById(id)
    }

    /**
     * * 创建HTMl 标签
     * parentId 父级Id
     * tagType  标签类型
     * 其他属性相对应
     *
     * @returns  新标签
     */
    util.createNode = function (){
       var  newNodeInfo=arguments[0];
       if(!newNodeInfo){
           return ;
       }

       //Id 存在
       if(newNodeInfo.id && util.$Id(newNodeInfo.id)){
           return util.$Id(newNodeInfo.id);
       }

       var  newNode= document.createElement(newNodeInfo.tagType || "div");
       var  nodeText=  document.createTextNode(newNodeInfo.text || "");//创建文本节点
        newNode.appendChild(nodeText);

        for (var property in newNodeInfo) {
            if(!newNodeInfo[property]){
                continue;
            }
            if(property=="class" || property=="style"){
               newNode.setAttribute(property,newNodeInfo[property]);
                continue;
            }else if(property=="html") {
                newNode.innerHTML=newNodeInfo[property];
            }else{
                newNode[property]=newNodeInfo[property];
            }
        }


        if(newNodeInfo.parentId && util.$Id(newNodeInfo.parentId)){
            util.$Id(newNodeInfo.parentId).appendChild(newNode);
        }else{
            //将标记挂载到 body上
            document.body.appendChild(newNode)
        }

        return  newNode;
    }

    /**
     * 删除节点
     * @param id
     */

    util.deleteNode = function (id){
        var $this= util.$Id(id);
        if($this){

        }

    }

    util.loadJs=function(id,src,async,loadFuntion)
    {
        var js, fjs = document.getElementsByTagName("script")[0];
        //存在
        if (util.$Id(id)) {
            return;
        }
        //创建节点
        js = document.createElement("script");
        js.id  = id;
        js.src = src;
        js.type="application/javascript";
        js.async=async || true;
        if(loadFuntion){
            js.onload=loadFuntion;
        }

        fjs.parentNode.insertBefore(js, fjs);
    }


    //注册
    util.register = function(ns, maker) {
        var NSList = ns.split(".");
        var step = window;
        var k = null;
        while(k = NSList.shift()) {
            if(NSList.length) {
                if(step[k] === undefined) {
                    step[k] = {}
                }
                step = step[k]
            } else {
                if(step[k] === undefined) {
                    try {
                        step[k] = maker;
                    } catch(exp) {
                        util.log("异常");
                    }
                }
            }
        }
    };

    //获取当前时间
    util.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    //获取当前参数
    util.getUrlParams = function(paramName){
        var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }


    util.RESPONSE_CODE =  {
        SUCCESS: 200,
        FAIL: 400
    };


    util.BroswerUtil = {
        //检测浏览器版本
        getBrowserVersion: function () {
            var agent = navigator.userAgent.toLowerCase();
            var arr = [];
            var Browser = "";
            var Bversion = "";
            var verinNum = "";
            //IE
            if (agent.indexOf("msie") > 0) {
                var regStr_ie = /msie [\d.]+;/gi;
                Browser = "IE";
                Bversion = "" + agent.match(regStr_ie)
            }
            //firefox
            else if (agent.indexOf("firefox") > 0) {
                var regStr_ff = /firefox\/[\d.]+/gi;
                Browser = "firefox";
                Bversion = "" + agent.match(regStr_ff);
            }
            //Chrome
            else if (agent.indexOf("chrome") > 0) {
                var regStr_chrome = /chrome\/[\d.]+/gi;
                Browser = "chrome";
                Bversion = "" + agent.match(regStr_chrome);
            }
            //Safari
            else if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                var regStr_saf = /version\/[\d.]+/gi;
                Browser = "safari";
                Bversion = "" + agent.match(regStr_saf);
            }
            //Opera
            else if (agent.indexOf("opera") >= 0) {
                var regStr_opera = /version\/[\d.]+/gi;
                Browser = "opera";
                Bversion = "" + agent.match(regStr_opera);
            } else {
                var browser = navigator.appName;
                if (browser == "Netscape") {
                    var version = agent.split(";");
                    var trim_Version = version[7].replace(/[ ]/g, "");
                    var rvStr = trim_Version.match(/[\d\.]/g).toString();
                    var rv = rvStr.replace(/[,]/g, "");
                    Bversion = rv;
                    Browser = "IE"
                }
            }
            verinNum = (Bversion + "").replace(/[^0-9.]/ig, "");
            arr.push(Browser);
            arr.push(verinNum);
            return arr;
        },
        //检测当前操作系统
        CurrentSystem: (function () {
            var system = {};

            var ua = navigator.userAgent;
            // 检测平台
            var p = navigator.platform;
            if (p.indexOf('Win') == 0) {
                system.windows = p.indexOf('Win') == 0;
            }
            if (p.indexOf('Mac') == 0) {
                system.mac = p.indexOf('Mac') == 0;
            }
            if (p.indexOf('Xll') == 0 || p.indexOf('Linux') == 0) {
                system.linux = (p.indexOf('Xll') == 0 || p.indexOf('Linux') == 0);
            }
            // 检测Windows操作系统
            if (system.windows) {
                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                    // system.windows = RegExp['$1'] + " " + RegExp['$2']
                    system.windows = RegExp['$2']

                }
            }
            // 移动设备
            if (ua.indexOf('iPhone') > -1) {
                system.ios = ua.indexOf('iPhone') > -1;
            }
            if (ua.indexOf('iPod') > -1) {
                system.ios = ua.indexOf('iPod') > -1;
            }
            if (ua.indexOf('iPad') > -1) {
                system.ios = ua.indexOf('iPad') > -1;
            }
            if (ua.indexOf('nokiaN') > -1) {
                system.nokiaN = ua.indexOf('nokiaN') > -1;
            }
            // 检测IOS版本
            if (system.ios && ua.indexOf('Mobile') > -1) {
                if (/CPU (?:iPhone )?OS ((\d+_)*\d+)/i.test(ua)) {
                    system.ios = (RegExp['$1'].replace(/_/g, '.'));
                } else {
                    system.ios = "unknown";        // 不能真正检测出来，所以只能猜测
                }
            }
            // 检测Android版本
            if (/Android ((\d+\.)*\d+)/i.test(ua)) {
                system.android = (RegExp['$1']);
            }
            // 游戏系统
            if (ua.indexOf('Wii') > -1) {
                system.wii = ua.indexOf('Wii') > -1;
            }
            if (/PlayStation/i.test(ua)) {
                system.ps = /PlayStation/i.test(ua);
            }
            return system
        })()
    };

    var mobileFlagArray = ["ios","android","wii","ps"];
    Array.prototype.inArray=function(e){
        var r=new RegExp(','+e+',');
        return (r.test(','+this.join(this.S)+','));
    };

    util.isMobileDevice = function(){
        var systemInfo = util.BroswerUtil.CurrentSystem;
        if(!systemInfo){
            return false;
        }
        var currSystem;
        for (var k in systemInfo){
            currSystem = k;
        }
        if(mobileFlagArray.inArray(currSystem)){
            return true;
        }
        return false;
    }

    /**
     * 用户是否登录
     * @returns {boolean}
     */
    util.isLogin = function(){
        if(util.cookie.read("wing_user_token")){
            return true;
        }
        return false;
    }

    /**
     * 获取当前用户ID
     * @returns {*|null}
     */
    util.getUserId = function(){
        return util.cookie.read("wing_user_id") || null;
    }


    return util;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Google 用户模块
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util,ggsdk) {
    /**
     * 注册登录方法
     */
    util.register("wing.google.login",function (callback){
        try {
            if(!auth2){
                return;
            }
        }catch (e){
            console.log("google login fail")
            return;
        }

        var result = {};
        auth2.signIn().then(function(googleUser) {
            result.code = 200;
            result.token = googleUser.getAuthResponse().id_token;
            callback(result);
            return ;

        },function (res){
            result.code = 400;
            console.log("google login error:"+res.error)
            callback(result);
            return ;
        });
    });

}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * FB 用户模块
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util) {

    //fb小游戏目前只有fb一种登录方式常量值
    var FB_INSTANT_LOGIN_PLATFORM = "FACEBOOK"

    if(!FB){
        return;
    }
    /**
     * 注册登录方法
     */
    util.register("wing.facebook.login",function (callback){
        var result = {};
        //调用Facebook登录
        FB.login(function (response) {
            console.log(response)
            if (response!=null && response.status == "connected") {
                result.code = 200;
                result.token = response.authResponse.accessToken;
                callback(result);
            } else {
                result.code = 400;
                callback(result);
            }
        });
    });

    var fbuser = {};
    fbuser.fbInstantInit = function(object) {
        try {
            if (FB) {
                if (wing.facebook.init) {
                    wing.facebook.init();
                } else {
                    FB.init({
                        appId            : __webpack_require__(0).context.initInfo.fbAppId,
                        autoLogAppEvents : false,
                        xfbml            : true,
                        version          : 'v6.0'
                    });
                }
                FB.getLoginStatus(function (response) {
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    console.log(uid);
                    console.log(accessToken);
                    //把uid和 accessToken通过旧初始化接口传到wing后台做校验，获取后台wing token，userid等信息，通过回调函数返回给cp
                    var data = {
                        appId: __webpack_require__(0).context.appId,
                        appKey: __webpack_require__(0).context.appKey,
                        bindType: 2,
                        sdkVer: __webpack_require__(0).context.version,
                        sdkType: __webpack_require__(0).context.sdkType,
                        clientId: __webpack_require__(0).context.clientId,
                        runPlatform: __webpack_require__(0).context.runPlatform,
                        platform: FB_INSTANT_LOGIN_PLATFORM,
                        accessToken: accessToken,
                        ghwToken: __webpack_require__(0).context.token || "",
                        userId: __webpack_require__(0).context.userId || -1
                    };
                    data.osign = util.sign(data);
                    data.appKey = null;
                    delete data.appKey;
                    util.ajax({
                        type: "POST",
                        dataType: "json",
                        url: __webpack_require__(0).context.GHW_BKD_API + "v4/init.do",
                        data: data,
                        success: function (response) {
                            var result = JSON.parse(response);
                            if (object.complete) {
                                object.complete();
                            }
                            if (result.code ==  util.RESPONSE_CODE.SUCCESS) {
                                util.log("Login successful");
                                __webpack_require__(0).context.token = result.token;
                                __webpack_require__(0).context.userId = result.userId;
                                localStorage.setItem("token", result.token);
                                localStorage.setItem("userId", result.userId);
                                if (object.success) {
                                    object.success({
                                        code: 200, message: "success", data: {
                                            "token": result.token,
                                            "userId": result.userId
                                        }
                                    });
                                }
                            } else {
                                util.log("Logon failure");
                                util.log(result);
                                if (object.fail) {
                                    object.fail()
                                }
                            }
                        },
                        error: function (e) {
                            if (object.fail) {
                                object.fail()
                            }
                        }
                    });
                });
            }
        } catch (e) {
            console.log(e)
        }

    };
    util.register("wing.fbuser", fbuser);
    return fbuser
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * fb 支付 模块
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util) {
    /**
     * 初始化Facebook SDK
     */
    util.register("wing.facebook.pay",function (payObject){
        //检查FB环境
        if(!FB){
            console.log("fb module not load!")
            return;
        }
        //调用FB支付窗口
        FB.ui({
            method: 'pay',
            display: 'iframe',
            action: 'purchaseitem',
            product: payObject.payChannel.productUrl,
            request_id: payObject.orderInfo.orderId
        },function(fbData){
            //回调
            if(payObject.success){
                payObject.success(fbData);
            }
        })
    })
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(19),__webpack_require__(11),__webpack_require__(16),__webpack_require__(1),__webpack_require__(17),__webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(game, data, user, pay, util,Fingerprint2,log) {
//define("sdk", ['./wing/game/winggame.js', './wing/track/wingtrack.js','./wing/user/winguser.js','./common/util.js','./common/fingerprint2.min.js','./common/log.js'], function(game, data, user, util,Fingerprint2,log) {
    var wing = {};

    /**
     * 配置项：初始化方法
     */
    __webpack_require__(0).context = {};

    //初始化clientId
    if(window.localStorage){
        if(!localStorage.getItem("clientId")){
            new Fingerprint2().get(function(result){
                localStorage.setItem("clientId",result);
            });
        }
    }
    /**
     * 初始化配置
     */
    wing.init = function (){
        __webpack_require__(0).context = {
            appId:arguments[0].appId || '',
            appKey:arguments[0].appKey || '',
            debug:arguments[0].debug || false,
            sdkType:arguments[0].sdkType || "html5",
            runPlatform:arguments[0].platform || "html5",
            token:arguments[0].token || "",
            userId:arguments[0].userId || 0,
            os:arguments[0].os || "windows" ,
            logSize:arguments[0].logSize || 2000
        };
        log.init();
        loadDefaultConfig();
        getInitInfo();
        getCacheTokenInfo();
        util.log('clientId='+__webpack_require__(0).context.clientId)
    }
    util.register("wing.init",wing.init);
    function loadDefaultConfig(){
        getClientId()
        __webpack_require__(0).context.version = "0.0.1";
        __webpack_require__(0).context.DATA_COLLECTION_API = "https://sdk-test1.gamehollywood.com/data_collection_qa/";
        __webpack_require__(0).context.GHW_BKD_API = "https://sdk-test1.gamehollywood.com/sdk_bkd_qa/sdkapi/";
        if(wing.facebook || wing.fbinstant){
            __webpack_require__(0).context.channelId = 'Facebook Ads';
            //define.context.campaignId = 'Facebook Ads';
        }
        //获取地址参数
        if(util.getUrlParams('channelId')){
            __webpack_require__(0).context.channelId=util.getUrlParams('channelId');
        }
        if(util.getUrlParams('campaignId')){
            __webpack_require__(0).context.campaignId=util.getUrlParams('campaignId');
        }
        if(util.getUrlParams('os')){
            __webpack_require__(0).context.os=util.getUrlParams('os');
        }
        if(util.getUrlParams('miniClient') && util.getUrlParams('miniClient')=='y'){
            __webpack_require__(0).context.miniClient=true;
            __webpack_require__(0).context.runPlatform="miniClient";

        }
    }

    function getClientId(){
        if(window.localStorage){
            __webpack_require__(0).context.clientId = localStorage.getItem("clientId");
        }
        if(!__webpack_require__(0).context.clientId){
            new Fingerprint2().get(function(result){
                localStorage.setItem("clientId",result);
                __webpack_require__(0).context.clientId = result;
            });
        }
    }

    function getInitInfo(){
        if (!__webpack_require__(0).context.clientId) {
            util.log('client id 尚未初始化完成');
            setTimeout(function () {
                getInitInfo()
            }, 500);
            return false
        }
        if(!__webpack_require__(0).context.appId || !__webpack_require__(0).context.appKey){
            util.log('not init!')
            return
        }
        var params = {
            appId:__webpack_require__(0).context.appId,
            clientId:__webpack_require__(0).context.clientId,
            sdkVer:__webpack_require__(0).context.version,
            sdkType:__webpack_require__(0).context.sdkType,
            os:__webpack_require__(0).context.os,
            runPlatform:__webpack_require__(0).context.runPlatform
        };

        params.osign = util.sign([params.appId,__webpack_require__(0).context.appKey,params.clientId,params.os,params.sdkVer,params.sdkType,params.runPlatform]);
        util.ajax({
            url: __webpack_require__(0).context.GHW_BKD_API+'v2/config/client.do',
            async:false,
            data:params,
            success:function(data){
                var result = JSON.parse(data);
                if(result.code == 200){
                    __webpack_require__(0).context.init = true;
                    var initInfo =  {};
                    for (var c in result){
                        initInfo[c] = result[c];
                    }
                    __webpack_require__(0).context.initInfo = initInfo;
                }else {
                    util.log(data)
                }
            }
        })
    }

    function getCacheTokenInfo(){
        __webpack_require__(0).context.token=localStorage.getItem("token") || "";
        __webpack_require__(0).context.userId=localStorage.getItem("userId") || "";
    }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(wing) {
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util) {

    __webpack_require__(9);

    //fb小游戏目前只有fb一种登录方式常量值
    var LOGIN_PLATFORM_NAME = "FACEBOOK";

    var RESPONSE_CODE = util.RESPONSE_CODE;

    var helper = {};

    helper.getFailRes = function (errorInfo) {
        console.log(errorInfo);
        return { code: RESPONSE_CODE.FAIL, message: "fail", data: errorInfo}
    };

    helper.getSuccessRes = function(data, msg) {
        var retMessage = "success";
        if (msg) {
            retMessage = msg
        }
        return { code: RESPONSE_CODE.SUCCESS, message: retMessage, data: data}
    };

    helper.getCompleteRes = function(data, msg) {
        var retMessage = "complete";
        if (msg) {
            retMessage = msg
        }
        return { code: RESPONSE_CODE.SUCCESS, message: retMessage, data: data}
    };

    /**
     * 检查参数
     * @param object
     * @returns {null}
     */
    helper.checkAndSetData = function (object) {
        if (object && object.data) {
            return object.data
        }
        return null
    };

    //统一处理
    helper.doProcess = function(instant, object) {
        instant.then(function (result) {
            if (object.complete) {
                object.complete(helper.getCompleteRes(result));
            }
            if (object.success) {
                object.success(helper.getSuccessRes(result));
            }
        }).catch(function (e) {
            if (object.fail) {
                object.fail(helper.getFailRes(e))
            }
        })
    };

    var fb = {};

    fb.isInit = false;

    function checkSDKInit() {
        if (!fb.isInit) {
            // util.log("FB instant Sdk 尚未初始化");
            console.log("FB instant Sdk 尚未初始化", "event_info")
        }
        return fb.isInit
    }

    /**
     * 初始化
     * 参数为
     *  {
     *      data: {}
     *      success: fun1,
     *      fail: func2,
     *      complete: func3
     *  }
     * @param object
     */
    fb.initializeAsync = function (object) {
        console.log("执行初始化initializeAsync", "event_info");
        FBInstant.initializeAsync().then(function() {
            console.log("初始化initializeAsync成功", "event_info");
            //设置为已初始化
            fb.isInit = true;

            var querydata = null;
            if (object.data) {
                querydata = object.data
            }
            fb.getSignedPlayerInfoAsync({
                data: querydata,
                success: function (res) {
                    if (wing.fbuser) {
                        console.log("", "event_info");
                        console.log("初始化fbInstantInit", "event_info");
                        console.log("", "event_info");
                        wing.fbuser.fbInstantInit(object);
                        return //若打包脸书h5版本则执行此方法并直接结束
                    }

                    console.log("FBInstant init GHW后台接口", "event_info");
                    // console.log("define.context.appKey " + define.context.appKey)
                    // console.log("playID " + res.data.playerID);
                    // console.log("signature " + res.data.signature);
                    //执行无FB JavaScript的初始化, 新接口
                    var data={
                        appId:__webpack_require__(0).context.appId,
                        appKey:__webpack_require__(0).context.appKey,
                        bindType:2,
                        sdkVer:__webpack_require__(0).context.version,
                        sdkType:__webpack_require__(0).context.sdkType,
                        clientId:__webpack_require__(0).context.clientId,
                        runPlatform: __webpack_require__(0).context.runPlatform,
                        platform: LOGIN_PLATFORM_NAME,
                        accessToken: "",
                        ghwToken:__webpack_require__(0).context.token|| "",
                        userId:__webpack_require__(0).context.userId || -1
                    };
                    data.osign=util.sign(data);
                    data.extra = JSON.stringify({
                        signature:res.data.signature
                    });
                    data.puserId = res.data.playerID;
                    data.appKey=null;
                    delete data.appKey;
                    util.ajax({
                        type:"POST",
                        dataType:"json",
                        url:__webpack_require__(0).context.GHW_BKD_API+"v4/init.do",
                        data:data,
                        success:function (response){
                            var  result=JSON.parse(response);
                            if (object.complete) {
                                object.complete(helper.getCompleteRes());
                            }
                            if(result.code==util.RESPONSE_CODE.SUCCESS){
                                util.log("Login successful");
                                __webpack_require__(0).context.token=result.token;
                                __webpack_require__(0).context.userId=result.userId;
                                localStorage.setItem("token",result.token) ;
                                localStorage.setItem("userId",result.userId);
                                if (object.success) {
                                    object.success(helper.getSuccessRes({
                                        "token": result.token,
                                        "userId": result.userId
                                    }));
                                }
                            }else{
                                util.log("Logon failure");
                                util.log(result);
                                if (object.fail) {
                                    object.fail(helper.getFailRes())
                                }
                            }
                        },
                        error:function () {
                            if (object.fail) {
                                object.fail(helper.getFailRes())
                            }
                        }
                    });
                },
                fail: function (e) {
                    if (object.fail) {
                        object.fail(helper.getFailRes(e))
                    }
                }
            });
        })
    };

    /**
     * 设置调试模式
     * @param object
     */
    fb.setDebugMode = function(object) {
        __webpack_require__(0).context.debug = object;
        if (log.init) {
            log.init()
        }
    };

    /**
     * 设置游戏用户id
     * @param object
     */
    fb.setGameUserId = function (object) {
        if (wing.setGameUserId) {
            wing.setGameUserId(object)
        }
    };

    /**
     * 设置服务器id
     * @param object
     */
    fb.setServerId = function (object) {
        if (wing.setServerId) {
            wing.setServerId(object)
        }
    };

    /**
     * 设置等级
     * @param object
     */
    fb.setLevel = function(object) {
        if (wing.setLevel) {
            wing.setLevel(object)
        }
    };

    fb.getPlayerID = function() {
        return FBInstant.player.getID()
    };

    fb.getSignedPlayerInfoAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        FBInstant.player.getSignedPlayerInfoAsync(query)
            .then(function (result) {
                // console.log(result.getPlayerID())
                // console.log(result.getSignature())
                if (object.complete) {
                    object.complete(helper.getSuccessRes({playerID: result.getPlayerID(), signature: result.getSignature()}));
                }
                if (object.success) {
                    console.log(JSON.stringify(helper.getSuccessRes({playerID: result.getPlayerID(), signature: result.getSignature()})))
                    object.success(helper.getSuccessRes({playerID: result.getPlayerID(), signature: result.getSignature()}));
                }
            }).catch(function (e) {
                if (object.fail) {
                    object.fail(helper.getFailRes(e))
                }
            }
        );
    };

    fb.getName = function () {
        checkSDKInit();
        return FBInstant.player.getName();
    };
    fb.getPhoto = function () {
        checkSDKInit();
        return FBInstant.player.getPhoto();
    };

    /**
     * 从指定的云存储中检索当前玩家的数据。
     *
     * @param keys
     * @param callback
     */
    fb.getDataAsync = function (object) {
        checkSDKInit();
        var query = null;
        if (object.data) {
            query = object.data
        }
        helper.doProcess(FBInstant.player
            .getDataAsync(query), object)
    };
    fb.setDataAsync = function (object) {
        checkSDKInit();
        helper.doProcess(FBInstant.player
            .setDataAsync(object.data), object)
    };
    fb.flushDataAsync = function (object) {
        checkSDKInit();
        helper.doProcess(FBInstant.player.flushDataAsync(), object)
    };
    fb.getStatsAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.player.getStatsAsync(query), object)
    };
    fb.setStatsAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.player.setStatsAsync(query), object)
    };
    fb.incrementStatsAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.player.incrementStatsAsync(query), object)
    };
    fb.getConnectedPlayersAsync = function (object) {
        checkSDKInit();
        helper.doProcess(FBInstant.player.getConnectedPlayersAsync(), object)
    };
    fb.getContextID = function () {
        checkSDKInit();
        return FBInstant.context.getID();
    };
    fb.getContextType = function () {
        checkSDKInit();
        return FBInstant.context.getType();
    };
    fb.isSizeBetween = function (object) {
        checkSDKInit();
        return FBInstant.context.isSizeBetween(object.data.minSize, object.data.maxSize)
    };
    fb.switchAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.context.switchAsync(query), object)
    };
    fb.chooseAsync = function (object) {
        checkSDKInit();
        var filter = null;
        if (object.data) {
            filter = object.data
        }
        helper.doProcess(FBInstant.context.chooseAsync(filter), object)
    };
    fb.createAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.context.createAsync(query), object)
    };
    fb.getPlayersAsync = function (object) {
        checkSDKInit();
        FBInstant.context.getPlayersAsync()
            .then(function(players) {
                var resData = players.map(function(player) {
                    return {
                        id: player.getID(),
                        name: player.getName()
                    }
                });
                if (object.complete) {
                    object.complete(helper.getCompleteRes(resData));
                }
                if (object.success) {
                    object.success(helper.getSuccessRes(resData))
                }
            }).catch(function (e) {
                if (object.fail) {
                    object.fail(helper.getFailRes(e))
                }
            })
    };
    fb.getLocale = function () {
        checkSDKInit();
        return FBInstant.getLocale();
    };
    fb.getPlatform = function (object) {
        checkSDKInit();
        return FBInstant.getPlatform();
    };
    fb.getSDKVersion = function () {
        checkSDKInit();
        return FBInstant.getSDKVersion();
    };
    fb.setLoadingProgress = function (object) {
        FBInstant.setLoadingProgress(object);
    };
    fb.getSupportedAPIs = function () {
        checkSDKInit();
        return FBInstant.getSupportedAPIs();
    };
    fb.getEntryPointData = function () {
        checkSDKInit();
        return FBInstant.getEntryPointData();
    };
    fb.getEntryPointAsync = function (object) {
        checkSDKInit();
        // var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.getEntryPointAsync(), object)
    };
    fb.setSessionData = function (object) {
        checkSDKInit();
        FBInstant.setSessionData(object);
    };
    fb.startGameAsync = function (object) {
        helper.doProcess(FBInstant.startGameAsync(), object);
    };
    fb.shareAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.shareAsync(query), object);
    };
    fb.updateAsync = function (object) {
        checkSDKInit();
        var query = helper.checkAndSetData(object);
        helper.doProcess(FBInstant.updateAsync(query), object);
    };
    fb.quit = function () {
        checkSDKInit();
        FBInstant.quit();
    };
    /**
     *  eventName字符串 事件名称。必须为 2 到 40 个字符， 且只能包含“_”、“-”、“ ”和字母数字字符。
     *  valueToSum数字 可选的数值，Facebook 分析利用此参数来 计算总和。
     *  parameters对象 可选的对象，
     * @param object
     */
    fb.logEvent = function (object) {
        checkSDKInit();
        FBInstant.logEvent(
            object.data.eventName,
            object.data.valueToSum,
            object.data.parameters
        );
        if (wing.trackEvent) {
            wing.trackEvent(wing.WAEvent.builder().setDefaultEventName(object.data.eventName)
            .setDefaultValue(object.data.valueToSum).addAllDefaultEventValue(object.data.parameters).disableAllChannel());
        }
    };

    fb.onPause = function (object) {
        checkSDKInit();
        FBInstant.onPause(object.success)
    };

    util.register("wing.fbinstant", fb);
    return fb
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(10))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "/*1516861829,,JIT Construction: v3597473,en_US*/\n\n/**\n * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.\n *\n * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,\n * copy, modify, and distribute this software in source code or binary form for use\n * in connection with the web services and APIs provided by Facebook.\n *\n * As with any software that integrates with the Facebook platform, your use of\n * this software is subject to the Facebook Platform Policy\n * [http://developers.facebook.com/policy/]. This copyright notice shall be\n * included in all copies or substantial portions of the software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\n * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\n * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\n * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\n * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n */\ntry {window.FB|| (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 0;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    var __p;    with (this) {      (function(){var a={},b=function b(i,j){if(!i&&!j)return null;var k={};if(typeof i!==\"undefined\")k.type=i;if(typeof j!==\"undefined\")k.signature=j;return k},c=function c(i,j){return b(i&&/^[A-Z]/.test(i)?i:undefined,j&&(j.params&&j.params.length||j.returns)?\"function(\"+(j.params?j.params.map(function(k){return/\\?/.test(k)?\"?\"+k.replace(\"?\",\"\"):k}).join(\",\"):\"\")+\")\"+(j.returns?\":\"+j.returns:\"\"):undefined)},d=function d(i,j,k){return i},e=function e(i,j,k){if(\"sourcemeta\"in __transform_includes)i.__SMmeta=j;if(\"typechecks\"in __transform_includes){var l=c(j?j.name:undefined,k);if(l)__w(i,l)}return i},f=function f(i,j,k){return k.apply(i,j)},g=function g(i,j,k,l){if(l&&l.params)__t.apply(i,l.params);var m=k.apply(i,j);if(l&&l.returns)__t([m,l.returns]);return m},h=function h(i,j,k,l,m){if(m){if(!m.callId)m.callId=m.module+\":\"+(m.line||0)+\":\"+(m.column||0);var n=m.callId;a[n]=(a[n]||0)+1}return k.apply(i,j)};if(typeof __transform_includes===\"undefined\"){__annotator=d;__bodyWrapper=f}else{__annotator=e;if(\"codeusage\"in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a};__bodyWrapper.clearCodeUsage=function(){a={}}}else if(\"typechecks\"in __transform_includes)__bodyWrapper=g;else __bodyWrapper=f}})();\n__t=function(a){return a[0]};__w=function(a){return a};\nvar require,__d;(function(a){var b={},c={},d=[\"global\",\"require\",\"requireDynamic\",\"requireLazy\",\"module\",\"exports\"];require=function(e,f){if(Object.prototype.hasOwnProperty.call(c,e))return c[e];if(!Object.prototype.hasOwnProperty.call(b,e)){if(f)return null;throw new Error(\"Module \"+e+\" has not been defined\")}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case\"module\":j=g;break;case\"exports\":j=g.exports;break;case\"global\":j=a;break;case\"require\":j=require;break;case\"requireDynamic\":j=null;break;case\"requireLazy\":j=null;break;default:j=require.call(null,h[l])}k.push(j)}g.factory.apply(a,k);c[e]=g.exports;return g.exports};__d=function(e,f,g,h){if(typeof g==\"function\"){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e)}else c[e]=g}})(this);\n__d(\"ES5Array\",[],(function a(b,c,d,e,f,g){var h={};h.isArray=function(i){return Object.prototype.toString.call(i)==\"[object Array]\"};f.exports=h}),null);\n__d(\"ES5ArrayPrototype\",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.map=function(i,j){if(typeof i!=\"function\")throw new TypeError();var k=void 0,l=this.length,m=new Array(l);for(k=0;k<l;++k)if(k in this)m[k]=i.call(j,this[k],k,this);return m};h.forEach=function(i,j){h.map.call(this,i,j)};h.filter=function(i,j){__p&&__p();if(typeof i!=\"function\")throw new TypeError();var k=void 0,l=void 0,m=this.length,n=[];for(k=0;k<m;++k)if(k in this){l=this[k];if(i.call(j,l,k,this))n.push(l)}return n};h.every=function(i,j){if(typeof i!=\"function\")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(!i.call(j,k[m],m,k))return false;return true};h.some=function(i,j){if(typeof i!=\"function\")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(i.call(j,k[m],m,k))return true;return false};h.indexOf=function(i,j){var k=this.length;j|=0;if(j<0)j+=k;for(;j<k;j++)if(j in this&&this[j]===i)return j;return-1};f.exports=h}),null);\n__d(\"ES5Date\",[],(function a(b,c,d,e,f,g){var h={};h.now=function(){return new Date().getTime()};f.exports=h}),null);\n__d(\"ES5FunctionPrototype\",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.bind=function(i){if(typeof this!=\"function\")throw new TypeError(\"Bind must be called on a function\");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName=\"bound:\"+(j.displayName||j.name||\"(?)\");l.toString=function m(){return\"bound: \"+j};return l};f.exports=h}),null);\n__d(\"ie8DontEnum\",[],(function a(b,c,d,e,f,g){var h=[\"toString\",\"toLocaleString\",\"valueOf\",\"hasOwnProperty\",\"isPrototypeOf\",\"prototypeIsEnumerable\",\"constructor\"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable(\"toString\"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);\n__d(\"ES5Object\",[\"ie8DontEnum\"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!=\"object\"&&m!=\"function\")throw new TypeError(\"Object prototype may only be a Object or null\");k.prototype=l;return new k()};j.keys=function(l){__p&&__p();var m=typeof l;if(m!=\"object\"&&m!=\"function\"||l===null)throw new TypeError(\"Object.keys called on non-object\");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);\n__d(\"ES5StringPrototype\",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.trim=function(){if(this==null)throw new TypeError(\"String.prototype.trim called on null or undefined\");return String.prototype.replace.call(this,/^\\s+|\\s+$/g,\"\")};h.startsWith=function(i){var j=String(this);if(this==null)throw new TypeError(\"String.prototype.startsWith called on null or undefined\");var k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;var l=Math.min(Math.max(k,0),j.length);return j.indexOf(String(i),k)==l};h.endsWith=function(i){__p&&__p();var j=String(this);if(this==null)throw new TypeError(\"String.prototype.endsWith called on null or undefined\");var k=j.length,l=String(i),m=arguments.length>1?Number(arguments[1]):k;if(isNaN(m))m=0;var n=Math.min(Math.max(m,0),k),o=n-l.length;if(o<0)return false;return j.lastIndexOf(l,o)==o};h.includes=function(i){if(this==null)throw new TypeError(\"String.prototype.contains called on null or undefined\");var j=String(this),k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;return j.indexOf(String(i),k)!=-1};h.contains=h.includes;h.repeat=function(i){__p&&__p();if(this==null)throw new TypeError(\"String.prototype.repeat called on null or undefined\");var j=String(this),k=i?Number(i):0;if(isNaN(k))k=0;if(k<0||k===Infinity)throw RangeError();if(k===1)return j;if(k===0)return\"\";var l=\"\";while(k){if(k&1)l+=j;if(k>>=1)j+=j}return l};f.exports=h}),null);\n__d(\"ES6Array\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();var h={from:function i(j){__p&&__p();if(j==null)throw new TypeError(\"Object is null or undefined\");var k=arguments[1],l=arguments[2],m=this,n=Object(j),o=typeof Symbol===\"function\"?typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\":\"@@iterator\",p=typeof k===\"function\",q=typeof n[o]===\"function\",r=0,s=void 0,t=void 0;if(q){s=typeof m===\"function\"?new m():[];var u=n[o](),v=void 0;while(!(v=u.next()).done){t=v.value;if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}var w=n.length;if(isNaN(w)||w<0)w=0;s=typeof m===\"function\"?new m(w):new Array(w);while(r<w){t=n[r];if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}};f.exports=h}),null);\n__d(\"ES6ArrayPrototype\",[],(function a(b,c,d,e,f,g){__p&&__p();var h={find:function i(j,k){if(this==null)throw new TypeError(\"Array.prototype.find called on null or undefined\");if(typeof j!==\"function\")throw new TypeError(\"predicate must be a function\");var l=h.findIndex.call(this,j,k);return l===-1?void 0:this[l]},findIndex:function i(j,k){if(this==null)throw new TypeError(\"Array.prototype.findIndex called on null or undefined\");if(typeof j!==\"function\")throw new TypeError(\"predicate must be a function\");var l=Object(this),m=l.length>>>0;for(var n=0;n<m;n++)if(j.call(k,l[n],n,l))return n;return-1},fill:function i(j){if(this==null)throw new TypeError(\"Array.prototype.fill called on null or undefined\");var k=Object(this),l=k.length>>>0,m=arguments[1],n=m>>0,o=n<0?Math.max(l+n,0):Math.min(n,l),p=arguments[2],q=p===undefined?l:p>>0,r=q<0?Math.max(l+q,0):Math.min(q,l);while(o<r){k[o]=j;o++}return k}};f.exports=h}),null);\n__d(\"ES6DatePrototype\",[],(function a(b,c,d,e,f,g){function h(j){return(j<10?\"0\":\"\")+j}var i={toISOString:function j(){if(!isFinite(this))throw new Error(\"Invalid time value\");var k=this.getUTCFullYear();k=(k<0?\"-\":k>9999?\"+\":\"\")+(\"00000\"+Math.abs(k)).slice(0<=k&&k<=9999?-4:-6);return k+\"-\"+h(this.getUTCMonth()+1)+\"-\"+h(this.getUTCDate())+\"T\"+h(this.getUTCHours())+\":\"+h(this.getUTCMinutes())+\":\"+h(this.getUTCSeconds())+\".\"+(this.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+\"Z\"}};f.exports=i}),null);\n__d(\"ES6Number\",[],(function a(b,c,d,e,f,g){__p&&__p();var h=Math.pow(2,-52),i=Math.pow(2,53)-1,j=-1*i,k={isFinite:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l==\"number\"&&isFinite(l)}),isNaN:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l==\"number\"&&isNaN(l)}),isInteger:function l(m){return this.isFinite(m)&&Math.floor(m)===m},isSafeInteger:function l(m){return this.isFinite(m)&&m>=this.MIN_SAFE_INTEGER&&m<=this.MAX_SAFE_INTEGER&&Math.floor(m)===m},EPSILON:h,MAX_SAFE_INTEGER:i,MIN_SAFE_INTEGER:j};f.exports=k}),null);\n__d(\"ES6Object\",[\"ie8DontEnum\"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={assign:function k(l){__p&&__p();if(l==null)throw new TypeError(\"Object.assign target cannot be null or undefined\");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);\n__d(\"ES7ArrayPrototype\",[\"ES5ArrayPrototype\",\"ES5Array\"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=h.indexOf,k=i.isArray;function l(p){return Math.min(Math.max(m(p),0),Number.MAX_SAFE_INTEGER)}function m(p){var q=Number(p);return isFinite(q)&&q!==0?n(q)*Math.floor(Math.abs(q)):q}function n(p){return p>=0?1:-1}var o={includes:function p(q){\"use strict\";__p&&__p();if(q!==undefined&&k(this)&&!(typeof q===\"number\"&&isNaN(q)))return j.apply(this,arguments)!==-1;var r=Object(this),s=r.length?l(r.length):0;if(s===0)return false;var t=arguments.length>1?m(arguments[1]):0,u=t<0?Math.max(s+t,0):t,v=isNaN(q)&&typeof q===\"number\";while(u<s){var w=r[u];if(w===q||typeof w===\"number\"&&v&&isNaN(w))return true;u++}return false}};f.exports=o}),null);\n__d(\"ES7Object\",[\"ie8DontEnum\"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};j.entries=function(k){if(k==null)throw new TypeError(\"Object.entries called on non-object\");var l=[];for(var m in k)if(i.call(k,m))l.push([m,k[m]]);h(k,function(n){return l.push([n,k[n]])});return l};j.values=function(k){if(k==null)throw new TypeError(\"Object.values called on non-object\");var l=[];for(var m in k)if(i.call(k,m))l.push(k[m]);h(k,function(n){return l.push(k[n])});return l};f.exports=j}),null);\n__d(\"ES7StringPrototype\",[],(function a(b,c,d,e,f,g){var h={};h.trimLeft=function(){return this.replace(/^\\s+/,\"\")};h.trimRight=function(){return this.replace(/\\s+$/,\"\")};f.exports=h}),null);\n/**\n * License: https://www.facebook.com/legal/license/feHxB3UzKXp/\n */\n__d(\"json3-3.3.2\",[],(function aa(ba,ca,da,ea,fa,a){\"use strict\";__p&&__p();var b={},c={exports:b},d;function ga(){__p&&__p();(function(){__p&&__p();var e=typeof d===\"function\"&&d.amd,f={\"function\":true,object:true},g=f[typeof b]&&b&&!b.nodeType&&b,h=f[typeof window]&&window||this,i=g&&f[typeof c]&&c&&!c.nodeType&&typeof ba==\"object\"&&ba;if(i&&(i.global===i||i.window===i||i.self===i))h=i;function j(m,a){__p&&__p();m||(m=h.Object());a||(a=h.Object());var ma=m.Number||h.Number,na=m.String||h.String,oa=m.Object||h.Object,n=m.Date||h.Date,pa=m.SyntaxError||h.SyntaxError,qa=m.TypeError||h.TypeError,ra=m.Math||h.Math,k=m.JSON||h.JSON;if(typeof k==\"object\"&&k){a.stringify=k.stringify;a.parse=k.parse}var sa=oa.prototype,o=sa.toString,p,q,r,s=new n(-3509827334573292);try{s=s.getUTCFullYear()==-109252&&s.getUTCMonth()===0&&s.getUTCDate()===1&&s.getUTCHours()==10&&s.getUTCMinutes()==37&&s.getUTCSeconds()==6&&s.getUTCMilliseconds()==708}catch(t){}function u(J){__p&&__p();if(u[J]!==r)return u[J];var K;if(J==\"bug-string-char-index\")K=\"a\"[0]!=\"a\";else if(J==\"json\")K=u(\"json-stringify\")&&u(\"json-parse\");else{var L,M='{\"a\":[1,true,false,null,\"\\\\u0000\\\\b\\\\n\\\\f\\\\r\\\\t\"]}';if(J==\"json-stringify\"){var N=a.stringify,O=typeof N==\"function\"&&s;if(O){(L=function(){return 1}).toJSON=L;try{O=N(0)===\"0\"&&N(new ma())===\"0\"&&N(new na())=='\"\"'&&N(o)===r&&N(r)===r&&N()===r&&N(L)===\"1\"&&N([L])==\"[1]\"&&N([r])==\"[null]\"&&N(null)==\"null\"&&N([r,o,null])==\"[null,null,null]\"&&N({a:[L,true,false,null,\"\\0\\b\\n\\f\\r\\t\"]})==M&&N(null,L)===\"1\"&&N([1,2],null,1)==\"[\\n 1,\\n 2\\n]\"&&N(new n(-864e13))=='\"-271821-04-20T00:00:00.000Z\"'&&N(new n(864e13))=='\"+275760-09-13T00:00:00.000Z\"'&&N(new n(-621987552e5))=='\"-000001-01-01T00:00:00.000Z\"'&&N(new n(-1))=='\"1969-12-31T23:59:59.999Z\"'}catch(t){O=false}}K=O}if(J==\"json-parse\"){var P=a.parse;if(typeof P==\"function\")try{if(P(\"0\")===0&&!P(false)){L=P(M);var Q=L.a.length==5&&L.a[0]===1;if(Q){try{Q=!P('\"\\t\"')}catch(t){}if(Q)try{Q=P(\"01\")!==1}catch(t){}if(Q)try{Q=P(\"1.\")!==1}catch(t){}}}}catch(t){Q=false}K=Q}}return u[J]=!!K}if(!u(\"json\")){var v=\"[object Function]\",ta=\"[object Date]\",w=\"[object Number]\",x=\"[object String]\",y=\"[object Array]\",ua=\"[object Boolean]\",z=u(\"bug-string-char-index\");if(!s)var A=ra.floor,va=[0,31,59,90,120,151,181,212,243,273,304,334],B=function(J,K){return va[K]+365*(J-1970)+A((J-1969+(K=+(K>1)))/4)-A((J-1901+K)/100)+A((J-1601+K)/400)};if(!(p=sa.hasOwnProperty))p=function(J){__p&&__p();var K={},L;if((K.__proto__=null,K.__proto__={toString:1},K).toString!=o)p=function(J){var M=this.__proto__,N=J in(this.__proto__=null,this);this.__proto__=M;return N};else{L=K.constructor;p=function(J){var M=(this.constructor||L).prototype;return J in this&&!(J in M&&this[J]===M[J])}}K=null;return p.call(this,J)};q=function(J,K){__p&&__p();var L=0,M,N,O;(M=function(){this.valueOf=0}).prototype.valueOf=0;N=new M();for(O in N)if(p.call(N,O))L++;M=N=null;if(!L){N=[\"valueOf\",\"toString\",\"toLocaleString\",\"propertyIsEnumerable\",\"isPrototypeOf\",\"hasOwnProperty\",\"constructor\"];q=function(J,K){var P=o.call(J)==v,O,Q,R=!P&&typeof J.constructor!=\"function\"&&f[typeof J.hasOwnProperty]&&J.hasOwnProperty||p;for(O in J)if(!(P&&O==\"prototype\")&&R.call(J,O))K(O);for(Q=N.length;O=N[--Q];R.call(J,O)&&K(O));}}else if(L==2)q=function(J,K){var N={},P=o.call(J)==v,O;for(O in J)if(!(P&&O==\"prototype\")&&!p.call(N,O)&&(N[O]=1)&&p.call(J,O))K(O)};else q=function(J,K){var P=o.call(J)==v,O,Q;for(O in J)if(!(P&&O==\"prototype\")&&p.call(J,O)&&!(Q=O===\"constructor\"))K(O);if(Q||p.call(J,O=\"constructor\"))K(O)};return q(J,K)};if(!u(\"json-stringify\")){var wa={92:\"\\\\\\\\\",34:'\\\\\"',8:\"\\\\b\",12:\"\\\\f\",10:\"\\\\n\",13:\"\\\\r\",9:\"\\\\t\"},xa=\"000000\",C=function(J,K){return(xa+(K||0)).slice(-J)},ya=\"\\\\u00\",za=function(J){__p&&__p();var K='\"',L=0,M=J.length,N=!z||M>10,O=N&&(z?J.split(\"\"):J);for(;L<M;L++){var P=J.charCodeAt(L);switch(P){case 8:case 9:case 10:case 12:case 13:case 34:case 92:K+=wa[P];break;default:if(P<32){K+=ya+C(2,P.toString(16));break}K+=N?O[L]:J.charAt(L)}}return K+'\"'},D=function(J,K,L,M,N,O,P){__p&&__p();var Q,R,S,T,U,V,W,Ea,Fa,Ga,X,Y,Z,$,Ha,Ia;try{Q=K[J]}catch(t){}if(typeof Q==\"object\"&&Q){R=o.call(Q);if(R==ta&&!p.call(Q,\"toJSON\"))if(Q>-1/0&&Q<1/0){if(B){U=A(Q/864e5);for(S=A(U/365.2425)+1970-1;B(S+1,0)<=U;S++);for(T=A((U-B(S,0))/30.42);B(S,T+1)<=U;T++);U=1+U-B(S,T);V=(Q%864e5+864e5)%864e5;W=A(V/36e5)%24;Ea=A(V/6e4)%60;Fa=A(V/1e3)%60;Ga=V%1e3}else{S=Q.getUTCFullYear();T=Q.getUTCMonth();U=Q.getUTCDate();W=Q.getUTCHours();Ea=Q.getUTCMinutes();Fa=Q.getUTCSeconds();Ga=Q.getUTCMilliseconds()}Q=(S<=0||S>=1e4?(S<0?\"-\":\"+\")+C(6,S<0?-S:S):C(4,S))+\"-\"+C(2,T+1)+\"-\"+C(2,U)+\"T\"+C(2,W)+\":\"+C(2,Ea)+\":\"+C(2,Fa)+\".\"+C(3,Ga)+\"Z\"}else Q=null;else if(typeof Q.toJSON==\"function\"&&(R!=w&&R!=x&&R!=y||p.call(Q,\"toJSON\")))Q=Q.toJSON(J)}if(L)Q=L.call(K,J,Q);if(Q===null)return\"null\";R=o.call(Q);if(R==ua)return\"\"+Q;else if(R==w)return Q>-1/0&&Q<1/0?\"\"+Q:\"null\";else if(R==x)return za(\"\"+Q);if(typeof Q==\"object\"){for($=P.length;$--;)if(P[$]===Q)throw qa();P.push(Q);X=[];Ha=O;O+=N;if(R==y){for(Z=0,$=Q.length;Z<$;Z++){Y=D(Z,Q,L,M,N,O,P);X.push(Y===r?\"null\":Y)}Ia=X.length?N?\"[\\n\"+O+X.join(\",\\n\"+O)+\"\\n\"+Ha+\"]\":\"[\"+X.join(\",\")+\"]\":\"[]\"}else{q(M||Q,function(J){var Y=D(J,Q,L,M,N,O,P);if(Y!==r)X.push(za(J)+\":\"+(N?\" \":\"\")+Y)});Ia=X.length?N?\"{\\n\"+O+X.join(\",\\n\"+O)+\"\\n\"+Ha+\"}\":\"{\"+X.join(\",\")+\"}\":\"{}\"}P.pop();return Ia}};a.stringify=function(J,K,L){__p&&__p();var M,N,O,P;if(f[typeof K]&&K)if((P=o.call(K))==v)N=K;else if(P==y){O={};for(var Q=0,R=K.length,S;Q<R;S=K[Q++],(P=o.call(S),P==x||P==w)&&(O[S]=1));}if(L)if((P=o.call(L))==w){if((L-=L%1)>0)for(M=\"\",L>10&&(L=10);M.length<L;M+=\" \");}else if(P==x)M=L.length<=10?L:L.slice(0,10);return D(\"\",(S={},S[\"\"]=J,S),N,O,M,\"\",[])}}if(!u(\"json-parse\")){var Aa=na.fromCharCode,Ba={92:\"\\\\\",34:'\"',47:\"/\",98:\"\\b\",116:\"\\t\",110:\"\\n\",102:\"\\f\",114:\"\\r\"},E,F,G=function(){E=F=null;throw pa()},H=function(){__p&&__p();var J=F,K=J.length,L,M,N,O,P;while(E<K){P=J.charCodeAt(E);switch(P){case 9:case 10:case 13:case 32:E++;break;case 123:case 125:case 91:case 93:case 58:case 44:L=z?J.charAt(E):J[E];E++;return L;case 34:for(L=\"@\",E++;E<K;){P=J.charCodeAt(E);if(P<32)G();else if(P==92){P=J.charCodeAt(++E);switch(P){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:L+=Ba[P];E++;break;case 117:M=++E;for(N=E+4;E<N;E++){P=J.charCodeAt(E);if(!(P>=48&&P<=57||P>=97&&P<=102||P>=65&&P<=70))G()}L+=Aa(\"0x\"+J.slice(M,E));break;default:G()}}else{if(P==34)break;P=J.charCodeAt(E);M=E;while(P>=32&&P!=92&&P!=34)P=J.charCodeAt(++E);L+=J.slice(M,E)}}if(J.charCodeAt(E)==34){E++;return L}G();default:M=E;if(P==45){O=true;P=J.charCodeAt(++E)}if(P>=48&&P<=57){if(P==48&&(P=J.charCodeAt(E+1),P>=48&&P<=57))G();O=false;for(;E<K&&(P=J.charCodeAt(E),P>=48&&P<=57);E++);if(J.charCodeAt(E)==46){N=++E;for(;N<K&&(P=J.charCodeAt(N),P>=48&&P<=57);N++);if(N==E)G();E=N}P=J.charCodeAt(E);if(P==101||P==69){P=J.charCodeAt(++E);if(P==43||P==45)E++;for(N=E;N<K&&(P=J.charCodeAt(N),P>=48&&P<=57);N++);if(N==E)G();E=N}return+J.slice(M,E)}if(O)G();if(J.slice(E,E+4)==\"true\"){E+=4;return true}else if(J.slice(E,E+5)==\"false\"){E+=5;return false}else if(J.slice(E,E+4)==\"null\"){E+=4;return null}G()}}return\"$\"},I=function(J){__p&&__p();var K,L;if(J==\"$\")G();if(typeof J==\"string\"){if((z?J.charAt(0):J[0])==\"@\")return J.slice(1);if(J==\"[\"){K=[];for(;;L||(L=true)){J=H();if(J==\"]\")break;if(L)if(J==\",\"){J=H();if(J==\"]\")G()}else G();if(J==\",\")G();K.push(I(J))}return K}else if(J==\"{\"){K={};for(;;L||(L=true)){J=H();if(J==\"}\")break;if(L)if(J==\",\"){J=H();if(J==\"}\")G()}else G();if(J==\",\"||typeof J!=\"string\"||(z?J.charAt(0):J[0])!=\"@\"||H()!=\":\")G();K[J.slice(1)]=I(H())}return K}G()}return J},Ca=function(J,K,L){var M=Da(J,K,L);if(M===r)delete J[K];else J[K]=M},Da=function(J,K,L){var M=J[K],N;if(typeof M==\"object\"&&M)if(o.call(M)==y)for(N=M.length;N--;)Ca(M,N,L);else q(M,function(K){Ca(M,K,L)});return L.call(J,K,M)};a.parse=function(J,K){var L,M;E=0;F=\"\"+J;L=I(H());if(H()!=\"$\")G();E=F=null;return K&&o.call(K)==v?Da((M={},M[\"\"]=L,M),\"\",K):L}}}a.runInContext=j;return a}if(g&&!e)j(h,g);else{var k=h.JSON,ka=h.JSON3,la=false,l=j(h,h.JSON3={noConflict:function(){if(!la){la=true;h.JSON=k;h.JSON3=ka;k=ka=null}return l}});h.JSON={parse:l.parse,stringify:l.stringify}}if(e)d(function(){return l})}).call(this)}var ha=false,ia=function(){if(!ha){ha=true;ga()}return c.exports},ja=function(e){switch(e){case undefined:return ia()}};fa.exports=ja}),null);\n__d(\"json3\",[\"json3-3.3.2\"],(function a(b,c,d,e,f,g){f.exports=c(\"json3-3.3.2\")()}),null);\n__d(\"ES\",[\"json3\",\"ES5ArrayPrototype\",\"ES5FunctionPrototype\",\"ES5StringPrototype\",\"ES5Array\",\"ES5Object\",\"ES5Date\",\"ES6Array\",\"ES6Object\",\"ES6ArrayPrototype\",\"ES6DatePrototype\",\"ES6Number\",\"ES7StringPrototype\",\"ES7Object\",\"ES7ArrayPrototype\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w={}.toString,x={\"JSON.stringify\":h.stringify,\"JSON.parse\":h.parse},y={\"Array.prototype\":i,\"Function.prototype\":j,\"String.prototype\":k,Object:m,Array:l,Date:n},z={Object:p,\"Array.prototype\":q,\"Date.prototype\":r,Number:s,Array:o},A={Object:u,\"String.prototype\":t,\"Array.prototype\":v};function B(D){__p&&__p();for(var E in D){if(!Object.prototype.hasOwnProperty.call(D,E))continue;var F=D[E],G=E.split(\".\");if(G.length===2){var H=G[0],I=G[1];if(!H||!I||!window[H]||!window[H][I]){var J=H?window[H]:\"-\",K=H&&window[H]&&I?window[H][I]:\"-\";throw new Error(\"Unexpected state (t11975770): \"+(H+\", \"+I+\", \"+J+\", \"+K+\", \"+E))}}var L=G.length===2?window[G[0]][G[1]]:window[E];for(var M in F){if(!Object.prototype.hasOwnProperty.call(F,M))continue;if(typeof F[M]!==\"function\"){x[E+\".\"+M]=F[M];continue}var N=L[M];x[E+\".\"+M]=N&&/\\{\\s+\\[native code\\]\\s\\}/.test(N)?N:F[M]}}}B(y);B(z);B(A);function C(D,E,F){var G=F?w.call(D).slice(8,-1)+\".prototype\":D,H=x[G+\".\"+E]||D[E];if(typeof H===\"function\"){for(var I=arguments.length,J=Array(I>3?I-3:0),K=3;K<I;K++)J[K-3]=arguments[K];return H.apply(D,J)}else if(H)return H;throw new Error(\"Polyfill \"+G+\" does not have implementation of \"+E)}f.exports=C}),null);\n__d(\"ES5FunctionPrototype\",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.bind=function(i){if(typeof this!=\"function\")throw new TypeError(\"Bind must be called on a function\");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName=\"bound:\"+(j.displayName||j.name||\"(?)\");l.toString=function m(){return\"bound: \"+j};return l};f.exports=h}),null);\n__d(\"ie8DontEnum\",[],(function a(b,c,d,e,f,g){var h=[\"toString\",\"toLocaleString\",\"valueOf\",\"hasOwnProperty\",\"isPrototypeOf\",\"prototypeIsEnumerable\",\"constructor\"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable(\"toString\"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);\n__d(\"ES5Object\",[\"ie8DontEnum\"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!=\"object\"&&m!=\"function\")throw new TypeError(\"Object prototype may only be a Object or null\");k.prototype=l;return new k()};j.keys=function(l){__p&&__p();var m=typeof l;if(m!=\"object\"&&m!=\"function\"||l===null)throw new TypeError(\"Object.keys called on non-object\");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);\n__d(\"ES6Object\",[\"ie8DontEnum\"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={assign:function k(l){__p&&__p();if(l==null)throw new TypeError(\"Object.assign target cannot be null or undefined\");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);\n__d(\"sdk.babelHelpers\",[\"ES5FunctionPrototype\",\"ES5Object\",\"ES6Object\"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={},l=Object.prototype.hasOwnProperty;k.inherits=function(m,n){j.assign(m,n);m.prototype=i.create(n&&n.prototype);m.prototype.constructor=m;m.__superConstructor__=n;return n};k._extends=j.assign;k[\"extends\"]=k._extends;k.objectWithoutProperties=function(m,n){var o={};for(var p in m){if(!l.call(m,p)||n.indexOf(p)>=0)continue;o[p]=m[p]}return o};k.taggedTemplateLiteralLoose=function(m,n){m.raw=n;return m};k.bind=h.bind;f.exports=k}),null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      (function(a,b){var c=\"keys\",d=\"values\",e=\"entries\",f=function(){var l=h(Array),m=void 0;if(!l)m=function(){function m(n,o){\"use strict\";this.$ArrayIterator1=n;this.$ArrayIterator2=o;this.$ArrayIterator3=0}m.prototype.next=function(){\"use strict\";if(this.$ArrayIterator1==null)return{value:b,done:true};var n=this.$ArrayIterator1,o=this.$ArrayIterator1.length,p=this.$ArrayIterator3,q=this.$ArrayIterator2;if(p>=o){this.$ArrayIterator1=b;return{value:b,done:true}}this.$ArrayIterator3=p+1;if(q===c)return{value:p,done:false};else if(q===d)return{value:n[p],done:false};else if(q===e)return{value:[p,n[p]],done:false}};m.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]=function(){\"use strict\";return this};return m}();return{keys:l?function(n){return n.keys()}:function(n){return new m(n,c)},values:l?function(n){return n.values()}:function(n){return new m(n,d)},entries:l?function(n){return n.entries()}:function(n){return new m(n,e)}}}(),g=function(){var l=h(String),m=void 0;if(!l)m=function(){function m(n){\"use strict\";this.$StringIterator1=n;this.$StringIterator2=0}m.prototype.next=function(){\"use strict\";if(this.$StringIterator1==null)return{value:b,done:true};var n=this.$StringIterator2,o=this.$StringIterator1,p=o.length;if(n>=p){this.$StringIterator1=b;return{value:b,done:true}}var q=void 0,r=o.charCodeAt(n);if(r<55296||r>56319||n+1===p)q=o[n];else{var s=o.charCodeAt(n+1);if(s<56320||s>57343)q=o[n];else q=o[n]+o[n+1]}this.$StringIterator2=n+q.length;return{value:q,done:false}};m.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]=function(){\"use strict\";return this};return m}();return{keys:function n(){throw TypeError(\"Strings default iterator doesn't implement keys.\")},values:l?function(n){return n[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]()}:function(n){return new m(n)},entries:function n(){throw TypeError(\"Strings default iterator doesn't implement entries.\")}}}();function h(l){return typeof l.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]===\"function\"&&typeof l.prototype.values===\"function\"&&typeof l.prototype.keys===\"function\"&&typeof l.prototype.entries===\"function\"}function i(l,m){\"use strict\";this.$ObjectIterator1=l;this.$ObjectIterator2=m;this.$ObjectIterator3=ES(\"Object\",\"keys\",false,l);this.$ObjectIterator4=0}i.prototype.next=function(){\"use strict\";var l=this.$ObjectIterator3.length,m=this.$ObjectIterator4,n=this.$ObjectIterator2,o=this.$ObjectIterator3[m];if(m>=l){this.$ObjectIterator1=b;return{value:b,done:true}}this.$ObjectIterator4=m+1;if(n===c)return{value:o,done:false};else if(n===d)return{value:this.$ObjectIterator1[o],done:false};else if(n===e)return{value:[o,this.$ObjectIterator1[o]],done:false}};i.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]=function(){\"use strict\";return this};var j={keys:function l(m){return new i(m,c)},values:function l(m){return new i(m,d)},entries:function l(m){return new i(m,e)}};function k(l,m){if(typeof l===\"string\")return g[m||d](l);else if(ES(\"Array\",\"isArray\",false,l))return f[m||d](l);else if(l[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"])return l[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();else return j[m||e](l)}ES(\"Object\",\"assign\",false,k,{KIND_KEYS:c,KIND_VALUES:d,KIND_ENTRIES:e,keys:function l(m){return k(m,c)},values:function l(m){return k(m,d)},entries:function l(m){return k(m,e)},generic:j.entries});a.FB_enumerate=k})(typeof global===\"undefined\"?this:global);\n(function(a,b){var c=a.window||a;function d(){return\"f\"+(Math.random()*(1<<30)).toString(16).replace(\".\",\"\")}function e(j){var k=j?j.ownerDocument||j:document,l=k.defaultView||c;return!!(j&&(typeof l.Node===\"function\"?j instanceof l.Node:typeof j===\"object\"&&typeof j.nodeType===\"number\"&&typeof j.nodeName===\"string\"))}function f(j){var k=c[j];if(k==null)return true;if(typeof c.Symbol!==\"function\")return true;var l=k.prototype;return k==null||typeof k!==\"function\"||typeof l.clear!==\"function\"||new k().size!==0||typeof l.keys!==\"function\"||typeof l.forEach!==\"function\"}var g=a.FB_enumerate,h=function(){if(!f(\"Map\"))return c.Map;var j=\"key\",k=\"value\",l=\"key+value\",m=\"$map_\",n=void 0,o=\"IE_HASH_\";function h(A){\"use strict\";if(!t(this))throw new TypeError(\"Wrong map object type.\");s(this);if(A!=null){var B=g(A),C=void 0;while(!(C=B.next()).done){if(!t(C.value))throw new TypeError(\"Expected iterable items to be pair objects.\");this.set(C.value[0],C.value[1])}}}h.prototype.clear=function(){\"use strict\";s(this)};h.prototype.has=function(A){\"use strict\";var B=q(this,A);return!!(B!=null&&this._mapData[B])};h.prototype.set=function(A,B){\"use strict\";var C=q(this,A);if(C!=null&&this._mapData[C])this._mapData[C][1]=B;else{C=this._mapData.push([A,B])-1;r(this,A,C);this.size+=1}return this};h.prototype.get=function(A){\"use strict\";var B=q(this,A);if(B==null)return b;else return this._mapData[B][1]};h.prototype[\"delete\"]=function(A){\"use strict\";var B=q(this,A);if(B!=null&&this._mapData[B]){r(this,A,b);this._mapData[B]=b;this.size-=1;return true}else return false};h.prototype.entries=function(){\"use strict\";return new p(this,l)};h.prototype.keys=function(){\"use strict\";return new p(this,j)};h.prototype.values=function(){\"use strict\";return new p(this,k)};h.prototype.forEach=function(A,B){\"use strict\";if(typeof A!==\"function\")throw new TypeError(\"Callback must be callable.\");var C=ES(A,\"bind\",true,B||b),D=this._mapData;for(var E=0;E<D.length;E++){var F=D[E];if(F!=null)C(F[1],F[0],this)}};h.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]=function(){\"use strict\";return this.entries()};function p(A,B){\"use strict\";if(!(t(A)&&A._mapData))throw new TypeError(\"Object is not a map.\");if(ES([j,l,k],\"indexOf\",true,B)===-1)throw new Error(\"Invalid iteration kind.\");this._map=A;this._nextIndex=0;this._kind=B}p.prototype.next=function(){\"use strict\";if(!this instanceof h)throw new TypeError(\"Expected to be called on a MapIterator.\");var A=this._map,B=this._nextIndex,C=this._kind;if(A==null)return u(b,true);var D=A._mapData;while(B<D.length){var E=D[B];B+=1;this._nextIndex=B;if(E)if(C===j)return u(E[0],false);else if(C===k)return u(E[1],false);else if(C)return u(E,false)}this._map=b;return u(b,true)};p.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]=function(){\"use strict\";return this};function q(A,B){if(t(B)){var C=y(B);return C?A._objectIndex[C]:b}else{var D=m+B;if(typeof B===\"string\")return A._stringIndex[D];else return A._otherIndex[D]}}function r(A,B,C){var D=C==null;if(t(B)){var E=y(B);if(!E)E=z(B);if(D)delete A._objectIndex[E];else A._objectIndex[E]=C}else{var F=m+B;if(typeof B===\"string\")if(D)delete A._stringIndex[F];else A._stringIndex[F]=C;else if(D)delete A._otherIndex[F];else A._otherIndex[F]=C}}function s(A){A._mapData=[];A._objectIndex={};A._stringIndex={};A._otherIndex={};A.size=0}function t(A){return A!=null&&(typeof A===\"object\"||typeof A===\"function\")}function u(A,B){return{value:A,done:B}}h.__isES5=function(){try{Object.defineProperty({},\"__.$#x\",{});return true}catch(A){return false}}();function v(A){if(!h.__isES5||!Object.isExtensible)return true;else return Object.isExtensible(A)}function w(A){var B=void 0;switch(A.nodeType){case 1:B=A.uniqueID;break;case 9:B=A.documentElement.uniqueID;break;default:return null}if(B)return o+B;else return null}var x=d();function y(A){if(A[x])return A[x];else if(!h.__isES5&&A.propertyIsEnumerable&&A.propertyIsEnumerable[x])return A.propertyIsEnumerable[x];else if(!h.__isES5&&e(A)&&w(A))return w(A);else if(!h.__isES5&&A[x])return A[x]}var z=function(){var A=Object.prototype.propertyIsEnumerable,B=0;return function z(C){if(v(C)){B+=1;if(h.__isES5)Object.defineProperty(C,x,{enumerable:false,writable:false,configurable:false,value:B});else if(C.propertyIsEnumerable){C.propertyIsEnumerable=function(){return A.apply(this,arguments)};C.propertyIsEnumerable[x]=B}else if(e(C))C[x]=B;else throw new Error(\"Unable to set a non-enumerable property on object.\");return B}else throw new Error(\"Non-extensible objects are not allowed as keys.\")}}();return __annotator(h,{name:\"Map\"})}(),i=function(){if(!f(\"Set\"))return c.Set;function i(k){\"use strict\";if(this==null||typeof this!==\"object\"&&typeof this!==\"function\")throw new TypeError(\"Wrong set object type.\");j(this);if(k!=null){var l=g(k),m=void 0;while(!(m=l.next()).done)this.add(m.value)}}i.prototype.add=function(k){\"use strict\";this._map.set(k,k);this.size=this._map.size;return this};i.prototype.clear=function(){\"use strict\";j(this)};i.prototype[\"delete\"]=function(k){\"use strict\";var l=this._map[\"delete\"](k);this.size=this._map.size;return l};i.prototype.entries=function(){\"use strict\";return this._map.entries()};i.prototype.forEach=function(k){\"use strict\";var l=arguments[1],m=this._map.keys(),n=void 0;while(!(n=m.next()).done)k.call(l,n.value,n.value,this)};i.prototype.has=function(k){\"use strict\";return this._map.has(k)};i.prototype.values=function(){\"use strict\";return this._map.values()};i.prototype.keys=function(){\"use strict\";return this.values()};i.prototype[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]=function(){\"use strict\";return this.values()};function j(k){k._map=new h();k.size=k._map.size}return __annotator(i,{name:\"Set\"})}();a.Map=h;a.Set=i})(typeof global===\"undefined\"?this:global);      __d(\"PromiseUsePolyfillSetImmediateGK\",[],{\"www_always_use_polyfill_setimmediate\":false});__d(\"ServerNonce\",[],{\"ServerNonce\":\"8K7LGd35deaKrQWQRzuQKC\"});      __d(\"InstantGamesGameState\",[],(function a(b,c,d,e,f,g){f.exports={INITIAL:\"initial\",LOADING:\"loading\",READY:\"ready\",PLAYING:\"playing\",GAMEOVER:\"gameover\"}}),null);\n__d(\"InstantGamesPassThroughRequestType\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({CAN_PLAYER_MATCH:\"CAN_PLAYER_MATCH\",ECHO:\"ECHO\",ERROR:\"ERROR\",GET_ENTRY_POINT:\"GET_ENTRY_POINT\",GET_PLAYER_STATS:\"GET_PLAYER_STATS\",HEARTBEAT:\"HEARTBEAT\",INCREMENT_PLAYER_STATS:\"INCREMENT_PLAYER_STATS\",JOIN_ROOM:\"JOIN_ROOM\",LEADERBOARD_FETCH:\"LEADERBOARD_FETCH\",LEADERBOARD_OPERATION:\"LEADERBOARD_OPERATION\",SDK_EVENT:\"SDK_EVENT\",SET_PLAYER_STATS:\"SET_PLAYER_STATS\"})}),null);\n__d(\"InstantGamesSDKFeatures\",[],(function a(b,c,d,e,f,g){\"use strict\";var h={FLEXIBLE:\"flexible\"};f.exports=h}),null);\n__d(\"InstantGamesSDKMessages\",[],(function a(b,c,d,e,f,g){\"use strict\";var h={AD_CLICK:\"adclick\",ANALYTICS_LOG_EVENT:\"analyticslogevent\",AVERAGE_FRAME_TIME:\"averageframetime\",CHANGE_CONTEXT_ASYNC:\"changecontextasync\",CONTEXT_CHOOSE_ASYNC:\"contextchooseasync\",CONTEXT_CREATE_ASYNC:\"contextcreateasync\",CONTEXT_SWITCH_ASYNC:\"contextswitchasync\",CONTEXT_MATCH_CREATE_ASYNC:\"contextmatchcreateasync\",CONTEXT_MATCH_DATA_FETCH_ASYNC:\"contextmatchdatafetchasync\",CONTEXT_MATCH_DATA_INC_ASYNC:\"contextmatchdataincasync\",CONTEXT_MATCH_DATA_SAVE_ASYNC:\"contextmatchdatasaveasync\",CONTEXT_MATCH_END_ASYNC:\"contextmatchendasync\",CONTEXT_MATCH_FETCH_ASYNC:\"contextmatchfetchasync\",CONTEXT_PLAYERS_FETCH_ASYNC:\"contextplayersfetchasync\",FLUSH_PLAYER_DATA_ASYNC:\"flushplayerdataasync\",GAME_START:\"gamestart\",GAME_SWITCH:\"gameswitch\",GET_CONNECTED_PLAYERS_ASYNC:\"getconnectedplayersasync\",GET_INTERSTITIAL_AD_ASYNC:\"getinterstitialadasync\",GET_REWARDED_VIDEO_ASYNC:\"getrewardedvideoasync\",GET_SIGNED_PLAYER_INFO_ASYNC:\"getsignedplayerinfoasync\",GET_PLAYER_DATA_ASYNC:\"getplayerdataasync\",INITIALIZE_ASYNC:\"initializeasync\",LOAD_AD_ASYNC:\"loadadasync\",MATCH_PLAYER_ASYNC:\"matchplayerasync\",MEDIA_SEND_IMAGE_ASYNC:\"mediasendimageasync\",ON_BEGIN_LOAD:\"onbeginload\",ON_CONSOLE:\"onconsole\",ON_END_GAME:\"onendgame\",ON_FRAME_DROP:\"onframedrop\",ON_GAME_READY:\"ongameready\",ON_PICTURE:\"onpicture\",ON_PROGRESS_LOAD:\"onprogressload\",ON_SCORE:\"onscore\",ON_SCREENSHOT:\"onscreenshot\",PAUSE:\"pause\",PAYMENTS_CONSUME_PURCHASE_ASYNC:\"paymentsconsumepurchaseasync\",PAYMENTS_FETCH_CATALOG_ASYNC:\"paymentsfetchcatalogasync\",PAYMENTS_FETCH_PURCHASES_ASYNC:\"paymentsfetchpurchasesasync\",PAYMENTS_INITIALIZED:\"paymentsinitialized\",PAYMENTS_PURCHASE_ASYNC:\"paymentspurchaseasync\",PAYMENTS_RESTORE_PURCHASES_ASYNC:\"paymentsrestorepurchasesasync\",QUIT:\"quit\",REJECT_PROMISE:\"rejectpromise\",RESOLVE_PROMISE:\"resolvepromise\",RESTART:\"restart\",SEND_PASS_THROUGH_ASYNC:\"sendpassthroughasync\",SET_PLAYER_DATA_ASYNC:\"setplayerdataasync\",SET_SESSION_DATA:\"setsessiondata\",SHARE_ASYNC:\"shareasync\",SHOW_AD_ASYNC:\"showadasync\"};f.exports=h}),null);\n__d(\"ExecutionContextObservers\",[],(function a(b,c,d,e,f,g){var h={MUTATION_COUNTING:0,PROFILING_COUNTERS:1,REFERENCE_COUNTING:2,HEARTBEAT:3,CALL_STACK:4,ASYNC_PROFILER:5,TIMESLICE_EXECUTION_LOGGER:6},i={MUTATION_COUNTING:0,REFERENCE_COUNTING:1,PROFILING_COUNTERS:2,HEARTBEAT:3,CALL_STACK:4,ASYNC_PROFILER:5,TIMESLICE_EXECUTION_LOGGER:6},j={beforeIDs:h,afterIDs:i};f.exports=j}),null);\n__d(\"ifRequired\",[],(function a(b,c,d,e,f,g){function h(i,j,k){var l=void 0;e&&e.call(null,[i],function(m){return l=[m]});l?j.apply(null,l):k()}f.exports=h}),null);\n__d(\"uniqueID\",[],(function a(b,c,d,e,f,g){var h=\"js_\",i=36,j=0;function k(){return h+(j++).toString(i)}f.exports=k}),null);\n__d(\"CallStackExecutionObserver\",[\"ExecutionContextObservers\",\"ifRequired\",\"uniqueID\"],(function a(b,c,d,e,f,g,h,i,j){\"use strict\";__p&&__p();var k={onNewContextCreated:function l(m,n,o){__p&&__p();var p,q=i(\"TimeSliceAutoclosedInteraction\",function(t){return t}),r=q?q.getInteractionsActiveRightNow():[],s=ES(r,\"filter\",true,function(t){return t.isEnabledForMode(\"full\")});if(o&&o.isContinuation&&s.length){var p=function(){var t=j(),u=Error.stackTraceLimit;Error.stackTraceLimit=1e3;var v=new Error().stack;Error.stackTraceLimit=u;ES(s,\"forEach\",true,function(w){w.inform(\"created_continuation:\"+n,{rawStackTrace:v}).addStringAnnotation(\"id\",t);w.trace().addStringAnnotation(\"has_stack_trace\",\"1\")});return{v:{id:t,name:n,interactions:s}}}();if(typeof p===\"object\")return p.v}return null},onContextCanceled:function l(m,n){},onBeforeContextStarted:function l(m,n,o){return null},onAfterContextStarted:function l(m,n,o,p){__p&&__p();var q;if(n)(function(){var r=n.id,s=n.name,t=n.interactions,u=Error.stackTraceLimit;Error.stackTraceLimit=1e3;var v=new Error().stack;Error.stackTraceLimit=u;ES(t,\"forEach\",true,function(w){w.inform(\"executing_continuation:\"+s,{rawStackTrace:v}).addStringAnnotation(\"id\",r)})})();return null},onAfterContextEnded:function l(m,n,o,p){},getBeforeID:function l(){return h.beforeIDs.CALL_STACK},getAfterID:function l(){return h.afterIDs.CALL_STACK}};f.exports=k}),null);\n__d(\"eprintf\",[],(function a(b,c,d,e,f,g){__p&&__p();function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=ES(k,\"map\",true,function(p){return String(p)}),n=i.split(\"%s\").length-1;if(n!==m.length)return h(\"eprintf args number mismatch: %s\",ES(\"JSON\",\"stringify\",false,[i].concat(m)));var o=0;return i.replace(/%s/g,function(){return String(m[o++])})}f.exports=h}),null);\n__d(\"ex\",[\"eprintf\"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];var n=ES(l,\"map\",true,function(p){return String(p)}),o=j.split(\"%s\").length-1;if(o!==n.length)return i(\"ex args number mismatch: %s\",ES(\"JSON\",\"stringify\",false,[j].concat(n)));return i._prefix+ES(\"JSON\",\"stringify\",false,[j].concat(n))+i._suffix}i._prefix=\"<![EX[\";i._suffix=\"]]>\";f.exports=i}),null);\n__d(\"sprintf\",[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(){return String(k[m++])})}f.exports=h}),null);\n__d(\"invariant\",[\"ex\",\"sprintf\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();var j=h;function k(l,m){__p&&__p();if(!l){var n=void 0;if(m===undefined)n=new Error(\"Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.\");else{for(var o=arguments.length,p=Array(o>2?o-2:0),q=2;q<o;q++)p[q-2]=arguments[q];n=new Error(j.apply(undefined,[m].concat(p)));n.name=\"Invariant Violation\";n.messageWithParams=[m].concat(p)}n.framesToPop=1;throw n}}f.exports=k}),null);\n__d(\"CircularBuffer\",[\"invariant\"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){\"use strict\";j>0||h(0);this.$CircularBuffer1=j;this.$CircularBuffer2=0;this.$CircularBuffer3=[];this.$CircularBuffer4=[]}i.prototype.write=function(j){\"use strict\";__p&&__p();if(this.$CircularBuffer3.length<this.$CircularBuffer1)this.$CircularBuffer3.push(j);else{ES(this.$CircularBuffer4,\"forEach\",true,ES(function(k){return k(this.$CircularBuffer3[this.$CircularBuffer2])},\"bind\",true,this));this.$CircularBuffer3[this.$CircularBuffer2]=j;this.$CircularBuffer2++;this.$CircularBuffer2%=this.$CircularBuffer1}return this};i.prototype.onEvict=function(j){\"use strict\";this.$CircularBuffer4.push(j);return this};i.prototype.read=function(){\"use strict\";return this.$CircularBuffer3.slice(this.$CircularBuffer2).concat(this.$CircularBuffer3.slice(0,this.$CircularBuffer2))};i.prototype.expand=function(j){\"use strict\";if(j>this.$CircularBuffer1){var k=this.read();this.$CircularBuffer2=0;this.$CircularBuffer3=k;this.$CircularBuffer1=j}return this};i.prototype.dropFirst=function(j){\"use strict\";if(j<=this.$CircularBuffer1){var k=this.read();this.$CircularBuffer2=0;k.splice(0,j);this.$CircularBuffer3=k}return this};i.prototype.clear=function(){\"use strict\";this.$CircularBuffer2=0;this.$CircularBuffer3=[];return this};i.prototype.currentSize=function(){\"use strict\";return this.$CircularBuffer3.length};f.exports=i}),null);\n__d(\"Env\",[],(function a(b,c,d,e,f,g){var h={start:ES(\"Date\",\"now\",false),nocatch:b.FB_GKS&&b.FB_GKS.js_nocatch,ajaxpipe_token:null};if(b.Env)ES(\"Object\",\"assign\",false,h,b.Env);b.Env=h;f.exports=h}),null);\n__d(\"ManagedError\",[],(function a(b,c,d,e,f,g){function h(i,j){Error.prototype.constructor.call(this,i);this.message=i;this.innerError=j}h.prototype=new Error();h.prototype.constructor=h;f.exports=h}),null);\n__d(\"LogviewForcedKeyError\",[\"ManagedError\"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j;i=babelHelpers.inherits(k,h);j=i&&i.prototype;function k(l,m){\"use strict\";j.constructor.call(this,m,l)}k.prototype.getCause=function(){\"use strict\";return this.innerError};k.prototype.getForcedCategoryKey=function(){\"use strict\";return this.message};f.exports=k}),null);\n__d(\"erx\",[\"ex\"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){__p&&__p();if(typeof j!==\"string\")return j;var k=ES(j,\"indexOf\",true,h._prefix),l=j.lastIndexOf(h._suffix);if(k<0||l<0)return[j];var m=k+h._prefix.length,n=l+h._suffix.length;if(m>=l)return[\"erx slice failure: %s\",j];var o=j.substring(0,k),p=j.substring(n);j=j.substring(m,l);try{var q=ES(\"JSON\",\"parse\",false,j);q[0]=o+q[0]+p;return q}catch(r){return[\"erx parse failure: %s\",j]}}f.exports=i}),null);\n__d(\"removeFromArray\",[],(function a(b,c,d,e,f,g){function h(i,j){var k=ES(i,\"indexOf\",true,j);if(k!==-1)i.splice(k,1)}f.exports=h}),null);\n__d(\"ErrorUtils\",[\"Env\",\"LogviewForcedKeyError\",\"eprintf\",\"erx\",\"removeFromArray\",\"sprintf\"],(function aa(a,ba,ca,da,b,ea,c,d,e,f,g,h){__p&&__p();var i=\"<anonymous guard>\",j=\"<generated guard>\",k=typeof window===\"undefined\"?\"<self.onerror>\":\"<window.onerror>\",l=/^https?:\\/\\//i,m=/^Type Mismatch for/,n=/(.*)[@\\s][^\\s]+$/,o=/^at eval eval (at .*\\:\\d+\\:\\d+), .*$/,p=[],q=void 0,r=[],s=50,t=[],u=false,v=false,w=false,x=/\\bnocatch\\b/.test(location.search),y=[\"Unknown script code\",\"Function code\",\"eval code\"];if(c.long_stack_traces&&Error.stackTraceLimit!=null)Error.stackTraceLimit=100;function z(I){var J=I.columnNumber||I.column;return J!=null?String(J):\"\"}function A(I){return I[0]&&I[0].column||\"\"}function B(I){for(var J=0;J<y.length;J++){var K=\" \"+y[J];if(ES(I,\"endsWith\",true,K))return[I,I.substring(0,I.length-K.length)]}return null}function C(I){var J=I.lineNumber||I.line;return J!=null?String(J):\"\"}function D(I){return I[0]&&I[0].line||\"\"}function E(I){var J=I.fileName||I.sourceURL;return J!=null?String(J):\"\"}function F(I){return I[0]&&I[0].script||\"\"}function fa(I){if(!I)return null;var J=I.split(\"\\n\");J.splice(0,1);return ES(J,\"map\",true,function(K){return ES(K,\"trim\",true)})}function ga(I){__p&&__p();if(!I)return[];return ES(I.split(/\\n\\n/)[0].replace(/[\\(\\)]|\\[.*?\\]|^[\\w \\.]+:\\s.*?\\n/g,\"\").split(\"\\n\"),\"map\",true,function(J){__p&&__p();J=ES(J,\"trim\",true);var K=J.match(o);if(K)J=K[1];var L=void 0,M=void 0,N=J.match(/:(\\d+)(?::(\\d+))?$/);if(N){L=N[1];M=N[2];J=J.slice(0,-N[0].length)}var O=void 0,P=B(J)||J.match(n);if(P){J=J.substring(P[1].length+1);var Q=P[1].match(/(?:at)?\\s*(.*)(?:[^\\s]+|$)/);O=Q?Q[1]:\"\"}if(ES(J,\"includes\",true,\"charset=utf-8;base64,\"))J=\"<inlined-file>\";var R={column:M,identifier:O,line:L,script:J};if(q)q(R);var S=\"    at\"+(R.identifier?\" \"+R.identifier+\" (\":\" \")+R.script+(R.line?\":\"+R.line:\"\")+(R.column?\":\"+R.column:\"\")+(R.identifier?\")\":\"\");return babelHelpers[\"extends\"]({},R,{text:S})})}function ha(I){t.unshift(I);u=true}function G(){t.shift();u=t.length!==0}var H={ANONYMOUS_GUARD_TAG:i,GENERATED_GUARD_TAG:j,GLOBAL_ERROR_HANDLER_TAG:k,history:r,addListener:function I(J){var K=arguments.length<=1||arguments[1]===undefined?false:arguments[1];p.push(J);if(!K)ES(r,\"forEach\",true,J)},removeListener:function I(J){g(p,J)},setSourceResolver:function I(J){q=J},applyWithGuard:function I(J,K,L,M,N){__p&&__p();var O;ha(N||i);if(c.nocatch)x=true;if(x){var P=void 0;try{P=J.apply(K,L||[])}finally{G()}return P}try{return J.apply(K,L||[])}catch(Q){var R=Q;if(R==null)try{var S=K;if(K!=null)(function(){var X=K,Y={};ES(ES(\"Object\",\"keys\",false,X),\"map\",true,function(Z,la){var $=X[Z];Y[Z]=$!==null&&typeof $===\"object\"?$.toString():$!==undefined?$:null});S=Y})();var T=ES(L||[],\"map\",true,function(X){return X!==null&&typeof X===\"object\"?X.toString():X!==undefined?X:null}),U=\"applyWithGuard threw null or undefined:\\nContext: %s\\nArgs: %s\",ia=h(U,ES(\"JSON\",\"stringify\",false,S),ES(\"JSON\",\"stringify\",false,T));R=new Error(ia);R.messageWithParams=[U]}catch(ja){var V=\"applyWithGuard threw null or undefined with unserializable data\";R=new Error(V);R.messageWithParams=[V]}var W=H.normalizeError(R);if(M)M(W);if(J)try{W.callee=J.toString().substring(0,100)}catch(ka){}if(L)W.args=ES(\"Array\",\"from\",false,L).toString().substring(0,100);W.guard=t[0];W.guardList=t.slice();H.reportError(W)}finally{G()}},guard:function I(J,K,L){K=K||J.name||j;function M(){return H.applyWithGuard(J,L||this,arguments,null,K)}if(J.__SMmeta)M.__SMmeta=J.__SMmeta;return M},inGuard:function I(){return u},normalizeError:function I(J){__p&&__p();var K=J;J=J!=null?J:{};if(Object.prototype.hasOwnProperty.call(J,\"_originalError\"))return J;var L=ga(J.stackTrace||J.stack),M=false;if(J.framesToPop){var N=J.framesToPop,O=void 0;while(N>0&&L.length>0){O=L.shift();N--;M=true}if(m.test(J.message)&&J.framesToPop===2&&O)if(l.test(O.script))J.message+=\" at \"+O.script+(O.line?\":\"+O.line:\"\")+(O.column?\":\"+O.column:\"\")}var P=fa(J.reactComponentStackForLogging),Q=J instanceof d?J.getForcedCategoryKey():null,R={_originalError:K,column:M?A(L):z(J)||A(L),extra:J.extra,forcedLogviewKey:Q,guard:J.guard,guardList:J.guardList,line:M?D(L):C(J)||D(L),message:J.message,messageWithParams:J.messageWithParams,name:J.name,reactComponentStack:P,script:M?F(L):E(J)||F(L),snapshot:J.snapshot,stack:ES(L,\"map\",true,function(T){return T.text}).join(\"\\n\"),stackFrames:L,type:J.type};if(typeof R.message===\"string\")R.messageWithParams=R.messageWithParams||f(R.message);else{R.messageObject=R.message;R.message=String(R.message)+\" (\"+typeof R.message+\")\"}if(R.messageWithParams)R.message=e.apply(undefined,R.messageWithParams);if(typeof window!==\"undefined\"&&window&&window.location)R.windowLocationURL=window.location.href;if(q)q(R);for(var S in R)if(R[S]==null)delete R[S];return R},onerror:function I(J,K,L,M,N){N=N||{};N.message=N.message||J;N.script=N.script||K;N.line=N.line||L;N.column=N.column||M;N.guard=k;N.guardList=[k];H.reportError(N,true)},reportError:function I(J){__p&&__p();var K=arguments.length<=1||arguments[1]===undefined?false:arguments[1];if(v)return false;if(t.length>0){J.guard=J.guard||t[0];J.guardList=t.slice()}var L=H.normalizeError(J);if(!K){var M=a.console,N=L._originalError,O=N!=null?\"\"+N.message:\"\";if((!M[L.type]||L.type===\"error\")&&!w){var P=O.length>80?O.slice(0,77)+\"...\":O;M.error('ErrorUtils caught an error: \"'+P+\"\\\". Subsequent errors won't be logged; see https://fburl.com/debugjs.\");w=true}}if(r.length>s)r.splice(s/2,1);r.push(L);v=true;for(var Q=0;Q<p.length;Q++)try{p[Q](L)}catch(R){}v=false;return true}};a.onerror=H.onerror;b.exports=a.ErrorUtils=H;if(typeof __t===\"function\"&&__t.setHandler)__t.setHandler(H.reportError)}),3);\n__d(\"IntervalTrackingBoundedBuffer\",[\"CircularBuffer\",\"ErrorUtils\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();var j=5e3;function k(l){__p&&__p();this.$IntervalTrackingBoundedBuffer6=0;if(l!=null){if(l<=0)throw new Error(\"Size for a buffer must be greater than zero.\")}else l=j;this.$IntervalTrackingBoundedBuffer4=l;this.$IntervalTrackingBoundedBuffer1=new h(l);this.$IntervalTrackingBoundedBuffer1.onEvict(ES(function(){return this.$IntervalTrackingBoundedBuffer6++},\"bind\",true,this));this.$IntervalTrackingBoundedBuffer2=[];this.$IntervalTrackingBoundedBuffer3=1;this.$IntervalTrackingBoundedBuffer5=0}k.prototype.open=function(){__p&&__p();var l=this.$IntervalTrackingBoundedBuffer3++,m=false,n=void 0,o=this.$IntervalTrackingBoundedBuffer5,p={id:l,startIdx:o,hasOverflown:ES(function(){return n!=null?n:this.$IntervalTrackingBoundedBuffer6>o},\"bind\",true,this),close:ES(function(){if(m)return[];else{m=true;n=this.$IntervalTrackingBoundedBuffer6>o;return this.$IntervalTrackingBoundedBuffer7(l)}},\"bind\",true,this)};this.$IntervalTrackingBoundedBuffer2.push(p);return p};k.prototype.pushElement=function(l){if(this.$IntervalTrackingBoundedBuffer2.length>0){this.$IntervalTrackingBoundedBuffer1.write(l);this.$IntervalTrackingBoundedBuffer5++}return this};k.prototype.isActive=function(){return this.$IntervalTrackingBoundedBuffer2.length>0};k.prototype.$IntervalTrackingBoundedBuffer8=function(l){return Math.max(l-this.$IntervalTrackingBoundedBuffer6,0)};k.prototype.$IntervalTrackingBoundedBuffer7=function(l){__p&&__p();var m=void 0,n=void 0,o=void 0,p=void 0;for(var q=0;q<this.$IntervalTrackingBoundedBuffer2.length;q++){var r=this.$IntervalTrackingBoundedBuffer2[q],s=r.startIdx,t=r.id;if(t===l){o=q;p=s}else if(n==null||s<n)n=s;if(m==null||s<m)m=s}if(o==null||m==null||p==null){i.reportError(new Error(\"messed up state inside IntervalTrackingBoundedBuffer\"));return[]}this.$IntervalTrackingBoundedBuffer2.splice(o,1);var u=this.$IntervalTrackingBoundedBuffer8(p),v=this.$IntervalTrackingBoundedBuffer1.read().slice(u),w=this.$IntervalTrackingBoundedBuffer8(n==null?this.$IntervalTrackingBoundedBuffer5:n)-this.$IntervalTrackingBoundedBuffer8(m);if(w>0){this.$IntervalTrackingBoundedBuffer1.dropFirst(w);this.$IntervalTrackingBoundedBuffer6+=w}return v};f.exports=k}),null);\n__d(\"nullthrows\",[],(function a(b,c,d,e,f,g){var h=function h(i){var j=arguments.length<=1||arguments[1]===undefined?\"Got unexpected null or undefined\":arguments[1];if(i!=null)return i;var k=new Error(j);k.framesToPop=1;throw k};f.exports=h}),null);\n__d(\"ExecutionEnvironment\",[],(function a(b,c,d,e,f,g){\"use strict\";var h=!!(typeof window!==\"undefined\"&&window.document&&window.document.createElement),i={canUseDOM:h,canUseWorkers:typeof Worker!==\"undefined\",canUseEventListeners:h&&!!(window.addEventListener||window.attachEvent),canUseViewport:h&&!!window.screen,isInWorker:!h};f.exports=i}),null);\n__d(\"performance\",[\"ExecutionEnvironment\"],(function a(b,c,d,e,f,g,h){\"use strict\";var i=void 0;if(h.canUseDOM)i=window.performance||window.msPerformance||window.webkitPerformance;f.exports=i||{}}),null);\n__d(\"performanceAbsoluteNow\",[\"performance\"],(function a(b,c,d,e,f,g,h){var i;if(h.now&&h.timing&&h.timing.navigationStart){var j=h.timing.navigationStart;i=function i(){return h.now()+j}}else i=function i(){return ES(\"Date\",\"now\",false)};f.exports=i}),null);\n__d(\"wrapFunction\",[],(function a(b,c,d,e,f,g){var h={},i=function i(j,k,l){return function(){var m=k in h?h[k](j,l):j;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m.apply(this,o)}};i.setWrapper=function(j,k){h[k]=j};f.exports=i}),null);\n__d(\"TimeSlice\",[\"CallStackExecutionObserver\",\"CircularBuffer\",\"Env\",\"ErrorUtils\",\"IntervalTrackingBoundedBuffer\",\"invariant\",\"nullthrows\",\"performanceAbsoluteNow\",\"wrapFunction\"],(function aa(a,ba,ca,da,b,ea,c,d,e,f,g,h,i,j,k){__p&&__p();var l=[],m=[],n=\"key\"+Math.random(),o=1,p=false,q=0,r=1,s=2,t={},u=q,v=new d(100),w=0,x=0,y=e.timesliceBufferSize;if(y==null)y=5e3;var z=new g(y),A=\"stackTraceLimit\"in Error,B=[],C=[],D=[];function E(){return F(B)}function F(N){return N.length>0?N[N.length-1]:null}function G(N,O){var P={};f.applyWithGuard(K,null,[N,O,P]);f.applyWithGuard(L,null,[N,O,P]);B.push(N);C.push(O);D.push(P)}function H(N,O,P){ES(l,\"forEach\",true,function(Q){var R=Q.onNewContextCreated(E(),O,P);N[Q.getBeforeID()]=R})}function I(N,O){ES(l,\"forEach\",true,function(P){P.onContextCanceled(N,O[P.getBeforeID()])})}function J(N,O,P){ES(m,\"forEach\",true,function(Q){Q.onAfterContextEnded(N,O[Q.getBeforeID()],P[Q.getBeforeID()],N.meta)})}function K(N,O,P){ES(l,\"forEach\",true,function(Q){var R=Q.onBeforeContextStarted(N,O[Q.getBeforeID()],N.meta);P[Q.getBeforeID()]=R})}function L(N,O,P){ES(l,\"forEach\",true,function(Q){var R=Q.onAfterContextStarted(N,O[Q.getBeforeID()],P[Q.getBeforeID()],N.meta);P[Q.getBeforeID()]=R})}function fa(){__p&&__p();var N=E(),O=F(C),P=F(D);if(N==null||O==null||P==null){f.reportError(new Error(\"popped too many times off the timeslice stack\"));p=false;return}f.applyWithGuard(J,null,[N,O,P]);p=!N.isRoot;B.pop();C.pop();D.pop()}var M={PropagationType:{CONTINUATION:0,EXECUTION:1,ORPHAN:2},guard:function N(O,P,Q){__p&&__p();typeof O===\"function\"||h(0);typeof P===\"string\"||h(0);var R=ga(Q);if(O[n])return O;if(!R.root)M.checkCoverage();var S=void 0;if(p)S=E();var T={},ha=0,N={cancel:function V(){if(!N.invoked)f.applyWithGuard(I,null,[P,T])},tokens:[],invoked:false},U=function U(){__p&&__p();var V=j(),W=void 0,ia=o++,X={contextID:ia,name:P,isRoot:!p,executionNumber:ha++,meta:R,absBeginTimeMs:V};if(!N.invoked){N.invoked=true;if(N.tokens.length){ES(N.tokens,\"forEach\",true,function(pa){delete t[pa]});N.tokens=[]}}G(X,T);if(S!=null){var Y=!!R.isContinuation;if(S.isRoot){X.indirectParentID=S.contextID;X.isEdgeContinuation=Y}else{X.indirectParentID=S.indirectParentID;X.isEdgeContinuation=!!(Y&&S.isEdgeContinuation)}}p=true;try{if(!X.isRoot)return O.apply(this,arguments);else{var ja=\"TimeSlice\"+(P?\": \"+P:\"\");W=f.applyWithGuard(O,this,arguments,null,ja);return W}}finally{var Z=E();if(Z==null){f.reportError(new Error(\"timeslice stack misaligned, not logging the block\"));p=false}else{var ka=Z.isRoot,la=Z.contextID,ma=Z.indirectParentID,na=Z.isEdgeContinuation,$=j();Z.absEndTimeMs=$;if(ka&&V!=null){x+=$-V;var oa=babelHelpers[\"extends\"]({begin:V,end:$,id:la,indirectParentID:ma,representsExecution:true,isEdgeContinuation:S&&na,guard:P},R,O.__SMmeta);z.pushElement(oa)}fa()}}};U=U;U[n]=N;f.applyWithGuard(H,null,[T,P,R]);return U},copyGuardForWrapper:function N(O,P){if(O[n])P[n]=O[n];return P},cancel:function N(O){var P=O[n];if(P&&!P.invoked){P.cancel();ES(P.tokens,\"forEach\",true,function(Q){delete t[Q]});P.invoked=true}},cancelWithToken:function N(O){if(t[O])M.cancel(t[O])},registerForCancelling:function N(O,P){if(!!O)if(P[n])if(!t[O])if(!P[n].invoked){t[O]=P;P[n].tokens.push(O)}},inGuard:function N(){return p},checkCoverage:function N(){__p&&__p();var O=void 0;if(u!==s&&!p){if(A){O=Error.stackTraceLimit;Error.stackTraceLimit=50}var P=new Error(\"Missing TimeSlice coverage\");if(A)Error.stackTraceLimit=O;P.type=\"warn\";if(u===r&&Math.random()<w)f.reportError(P);else if(u===q)i(v).write(P)}},setLogging:function N(O,P){__p&&__p();if(u!==q)return;w=P;if(O){u=r;ES(i(v).read(),\"forEach\",true,function(Q){if(Math.random()<w)f.reportError(Q)})}else u=s;i(v).clear();v=undefined},getContext:function N(){return E()},getTotalTime:function N(){return x},getGuardedContinuation:function N(O){return M.guard(function P(Q){for(var R=arguments.length,S=Array(R>1?R-1:0),T=1;T<R;T++)S[T-1]=arguments[T];return Q.apply(this,S)},O,{propagationType:M.PropagationType.CONTINUATION})},getGuardNameStack:function N(){return ES(B,\"map\",true,function(O){return O.name})},registerExecutionContextObserver:function N(O){__p&&__p();var P=false;for(var Q=0;Q<l.length;Q++)if(l[Q].getBeforeID()>O.getBeforeID()){l.splice(Q,0,O);P=true;break}if(!P)l.push(O);for(var R=0;R<m.length;R++)if(m[R].getAfterID()>O.getAfterID()){m.splice(R,0,O);return}m.push(O)},catchUpOnDemandExecutionContextObservers:function N(O){for(var P=0;P<B.length;P++){var Q=B[P],R=C[P],S=D[P]||{},T=O.onBeforeContextStartedWhileEnabled(Q,R[O.getBeforeID()],Q.meta);S[O.getBeforeID()]=T;D[P]=S}},getBuffer:function N(){return z}};function ga(N){__p&&__p();var O={};if(N&&N.propagateCounterAttribution!==undefined)O.propagateCounterAttribution=N.propagateCounterAttribution;if(N&&N.root!==undefined)O.root=N.root;switch(N&&N.propagationType){case M.PropagationType.CONTINUATION:O.isContinuation=true;O.extendsExecution=true;break;case M.PropagationType.ORPHAN:O.isContinuation=false;O.extendsExecution=false;break;case M.PropagationType.EXECUTION:default:O.isContinuation=false;O.extendsExecution=true}return O}if(e.sample_continuation_stacktraces)M.registerExecutionContextObserver(c);k.setWrapper(M.guard,\"entry\");a.TimeSlice=M;b.exports=M}),3);\n/**\n * License: https://www.facebook.com/legal/license/mgL-nhsiotL/\n */\n__d(\"ImmediateImplementation\",[],(function a(b,c,d,e,f,g){__p&&__p();(function(b,h){\"use strict\";__p&&__p();var i=1,j={},k={},l=k,m=false,n=b.document,o=void 0;function p(x){var y=x[0];x=Array.prototype.slice.call(x,1);j[i]=function(){y.apply(h,x)};l=l.next={handle:i++};return l.handle}function q(){__p&&__p();var x=void 0,y=void 0;while(!m&&(x=k.next)){k=x;if(y=j[x.handle]){m=true;try{y();m=false}finally{r(x.handle);if(m){m=false;if(k.next)o(q)}}}}}function r(x){delete j[x]}function s(){__p&&__p();var x;if(b.postMessage&&!b.importScripts){var x=function(){__p&&__p();var y=true,z=function z(){y=false;if(b.removeEventListener)b.removeEventListener(\"message\",z,false);else b.detachEvent(\"onmessage\",z)};if(b.addEventListener)b.addEventListener(\"message\",z,false);else if(b.attachEvent)b.attachEvent(\"onmessage\",z);else return{v:false};b.postMessage(\"\",\"*\");return{v:y}}();if(typeof x===\"object\")return x.v}}function t(){__p&&__p();var x=\"setImmediate$\"+Math.random()+\"$\",y=function y(event){if(event.source===b&&typeof event.data===\"string\"&&ES(event.data,\"indexOf\",true,x)===0)q()};if(b.addEventListener)b.addEventListener(\"message\",y,false);else b.attachEvent(\"onmessage\",y);o=function o(){var z=p(arguments);b.postMessage(x+z,\"*\");return z}}function u(){var x=new MessageChannel();x.port1.onmessage=q;o=function o(){var y=p(arguments);x.port2.postMessage(y);return y}}function v(){__p&&__p();var x=n.documentElement;o=function o(){var y=p(arguments),z=n.createElement(\"script\");z.onreadystatechange=function(){z.onreadystatechange=null;x.removeChild(z);z=null;q()};x.appendChild(z);return y}}function w(){o=function o(){setTimeout(q,0);return p(arguments)}}if(s())t();else if(b.MessageChannel)u();else if(n&&n.createElement&&\"onreadystatechange\"in n.createElement(\"script\"))v();else w();g.setImmediate=o;g.clearImmediate=r})(Function(\"return this\")())}),null);\n__d(\"setImmediatePolyfill\",[\"PromiseUsePolyfillSetImmediateGK\",\"invariant\",\"ImmediateImplementation\"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=b.setImmediate;if(h.www_always_use_polyfill_setimmediate||!j){var k=c(\"ImmediateImplementation\");j=k.setImmediate}function l(m){typeof m===\"function\"||i(0);for(var n=arguments.length,o=Array(n>1?n-1:0),p=1;p<n;p++)o[p-1]=arguments[p];return j.apply(undefined,[m].concat(o))}f.exports=l}),null);\n__d(\"setImmediateAcrossTransitions\",[\"TimeSlice\",\"setImmediatePolyfill\"],(function a(b,c,d,e,f,g,h,i){function j(k){var l=h.guard(k,\"setImmediate\",{propagationType:h.PropagationType.CONTINUATION});for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];return i.apply(undefined,[l].concat(n))}f.exports=j}),null);\n__d(\"TimerStorage\",[],(function a(b,c,d,e,f,g){var h={ANIMATION_FRAME:\"ANIMATION_FRAME\",IDLE_CALLBACK:\"IDLE_CALLBACK\",IMMEDIATE:\"IMMEDIATE\",INTERVAL:\"INTERVAL\",TIMEOUT:\"TIMEOUT\"},i={};ES(ES(\"Object\",\"keys\",false,h),\"forEach\",true,function(k){return i[k]={}});var j=babelHelpers[\"extends\"]({},h,{set:function k(l,m){i[l][m]=true},unset:function k(l,m){delete i[l][m]},clearAll:function k(l,m){ES(ES(\"Object\",\"keys\",false,i[l]),\"forEach\",true,m);i[l]={}}});f.exports=j}),18);\n__d(\"setTimeoutAcrossTransitions\",[\"TimerStorage\",\"TimeSlice\"],(function a(b,c,d,e,f,g,h,i){var j=b.setTimeout.nativeBackup||b.setTimeout,k=h.TIMEOUT;function l(m,n){var o=i.guard(m,\"setTimeout\",{propagationType:i.PropagationType.CONTINUATION});for(var p=arguments.length,q=Array(p>2?p-2:0),r=2;r<p;r++)q[r-2]=arguments[r];var s=Function.prototype.apply.call(j,b,[o,n].concat(q)),t=k+s;i.registerForCancelling(t,o);return s}f.exports=l}),18);\n__d(\"Promise\",[\"TimeSlice\",\"invariant\",\"setImmediateAcrossTransitions\",\"setTimeoutAcrossTransitions\"],(function a(b,c,d,e,f,g,h,i,j,k){\"use strict\";__p&&__p();function l(){}var m=null,n={};function o(G){try{return G.then}catch(H){m=H;return n}}function p(G,H){try{return G(H)}catch(I){m=I;return n}}function q(G,H,I){try{G(H,I)}catch(J){m=J;return n}}function r(G){__p&&__p();if(typeof this!==\"object\")throw new TypeError(\"Promises must be constructed via new\");if(typeof G!==\"function\")throw new TypeError(\"not a function\");this._state=0;this._value=null;this._deferreds=[];if(G===l)return;y(G,this)}r._noop=l;r.prototype.then=function(G,H){if(this.constructor!==r)return s(this,G,H);var I=new r(l);t(this,new x(G,H,I));return I};function s(G,H,I){return new G.constructor(function(u,v){var J=new r(l);J.then(u,v);t(G,new x(H,I,J))})}function t(G,H){__p&&__p();while(G._state===3)G=G._value;if(G._state===0){G._deferreds.push(H);return}j(function I(){__p&&__p();var J=G._state===1?H.onFulfilled:H.onRejected;if(J===null){H.continuation(function(){});if(G._state===1)u(H.promise,G._value);else v(H.promise,G._value);return}var K=p(ES(H.continuation,\"bind\",true,null,J),G._value);if(K===n)v(H.promise,m);else u(H.promise,K)})}function u(G,H){__p&&__p();if(H===G)return v(G,new TypeError(\"A promise cannot be resolved with itself.\"));if(H&&(typeof H===\"object\"||typeof H===\"function\")){var I=o(H);if(I===n)return v(G,m);if(I===G.then&&H instanceof r){G._state=3;G._value=H;w(G);return}else if(typeof I===\"function\"){y(ES(I,\"bind\",true,H),G);return}}G._state=1;G._value=H;w(G)}function v(G,H){G._state=2;G._value=H;w(G)}function w(G){for(var H=0;H<G._deferreds.length;H++)t(G,G._deferreds[H]);G._deferreds=null}function x(G,H,I){this.onFulfilled=typeof G===\"function\"?G:null;this.onRejected=typeof H===\"function\"?H:null;this.continuation=h.getGuardedContinuation(\"Promise Handler\");this.promise=I}function y(G,H){__p&&__p();var I=false,J=q(G,function(K){if(I)return;I=true;u(H,K)},function(K){if(I)return;I=true;v(H,K)});if(!I&&J===n){I=true;v(H,m)}}r.prototype.done=function(G,H){var I=arguments.length?this.then.apply(this,arguments):this;I.then(null,function(J){k(function(){throw J},0)})};var z=F(true),A=F(false),B=F(null),C=F(undefined),D=F(0),E=F(\"\");function F(G){var H=new r(r._noop);H._state=1;H._value=G;return H}r.resolve=function(G){__p&&__p();if(G instanceof r)return G;if(G===null)return B;if(G===undefined)return C;if(G===true)return z;if(G===false)return A;if(G===0)return D;if(G===\"\")return E;if(typeof G===\"object\"||typeof G===\"function\")try{var H=G.then;if(typeof H===\"function\")return new r(ES(H,\"bind\",true,G))}catch(I){return new r(function(u,v){v(I)})}return F(G)};r.all=function(G){__p&&__p();if(!ES(\"Array\",\"isArray\",false,G))G=[new r(function(){throw new TypeError(\"Promise.all must be passed an iterable.\")})];var H=Array.prototype.slice.call(G);return new r(function(u,v){__p&&__p();if(H.length===0)return u([]);var I=H.length;function J(K,L){__p&&__p();if(L&&(typeof L===\"object\"||typeof L===\"function\"))if(L instanceof r&&L.then===r.prototype.then){while(L._state===3)L=L._value;if(L._state===1)return J(K,L._value);if(L._state===2)v(L._value);L.then(function(L){J(K,L)},v);return}else{var M=L.then;if(typeof M===\"function\"){var N=new r(ES(M,\"bind\",true,L));N.then(function(L){J(K,L)},v);return}}H[K]=L;if(--I===0)u(H)}for(var K=0;K<H.length;K++)J(K,H[K])})};r.reject=function(G){return new r(function(u,v){v(G)})};r.race=function(G){return new r(function(u,v){ES(G,\"forEach\",true,function(H){r.resolve(H).then(u,v)})})};r.prototype[\"catch\"]=function(G){return this.then(null,G)};f.exports=r}),null);\n__d(\"fbinstant/common/consoleLogger\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();var h={init:function i(j){if(!j)return;window.addEventListener(\"error\",function(k){var l={type:\"error\",message:k&&k.message||null,filename:k&&k.filename||null,lineno:k&&k.lineno||null,colno:k&&k.colno||null,stack:k&&k.error&&k.error.stack||null};try{l.print=JSON.stringify(l)}catch(m){l.print=l.message}j(l)})}};f.exports=h}),null);\n__d(\"InstantGamesErrorCode\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({ADS_FREQUENT_LOAD:\"ADS_FREQUENT_LOAD\",ADS_NO_FILL:\"ADS_NO_FILL\",ADS_NOT_LOADED:\"ADS_NOT_LOADED\",ADS_TOO_MANY_INSTANCES:\"ADS_TOO_MANY_INSTANCES\",ANALYTICS_POST_EXCEPTION:\"ANALYTICS_POST_EXCEPTION\",CLIENT_REQUIRES_UPDATE:\"CLIENT_REQUIRES_UPDATE\",CLIENT_UNSUPPORTED_OPERATION:\"CLIENT_UNSUPPORTED_OPERATION\",INVALID_OPERATION:\"INVALID_OPERATION\",INVALID_PARAM:\"INVALID_PARAM\",LEADERBOARD_NOT_FOUND:\"LEADERBOARD_NOT_FOUND\",NETWORK_FAILURE:\"NETWORK_FAILURE\",PENDING_REQUEST:\"PENDING_REQUEST\",SAME_CONTEXT:\"SAME_CONTEXT\",UNKNOWN:\"UNKNOWN\",USER_INPUT:\"USER_INPUT\",PAYMENTS_INVALID:\"PAYMENTS_INVALID\",PAYMENTS_NOT_ALLOWED:\"PAYMENTS_NOT_ALLOWED\",PAYMENTS_NOT_INITIALIZED:\"PAYMENTS_NOT_INITIALIZED\",PAYMENTS_PURCHASE_CREATION_FAILED:\"PAYMENTS_PURCHASE_CREATION_FAILED\",PAYMENTS_USER_CANCELLED:\"PAYMENTS_USER_CANCELLED\"})}),null);\n__d(\"fbinstant/common/errorCode\",[\"InstantGamesErrorCode\"],(function a(b,c,d,e,f,g,h){\"use strict\";var i=h;f.exports=i}),null);\n__d(\"fbinstant/common/event\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();function h(){this.$Event1=[]}h.prototype.on=function(i){this.$Event1.push(i)};h.prototype.off=function(i){for(var j=0;j<this.$Event1.length;j++)if(this.$Event1[j]===i){this.$Event1.splice(j,1);return}};h.prototype.unbind=function(){this.$Event1=[]};h.prototype.triggerSubscribers=function(i){for(var j=0;j<this.$Event1.length;j++)this.$Event1[j](i)};f.exports=h}),null);\n__d(\"fbinstant/common/requestAnimationFrameListener\",[\"fbinstant/common/event\"],(function a(b,c,d,e,f,g,h){\"use strict\";__p&&__p();var i=[\"requestAnimationFrame\",\"webkitRequestAnimationFrame\",\"mozRequestAnimationFrame\",\"msRequestAnimationFrame\"];function j(){this.$requestAnimationFrameListener1=new h()}j.prototype.init=function(){__p&&__p();for(var k=i,l=Array.isArray(k),m=0,k=l?k:k[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var n;if(l){if(m>=k.length)break;n=k[m++]}else{m=k.next();if(m.done)break;n=m.value}var o=n;this.$requestAnimationFrameListener2(o)}};j.prototype.on=function(k){this.$requestAnimationFrameListener1.on(k)};j.prototype.$requestAnimationFrameListener2=function(k){var l=window[k];if(l)window[k]=function(m){l(function(n){m(n);this.$requestAnimationFrameListener1.triggerSubscribers(n)}.bind(this))}.bind(this)};f.exports=new j()}),null);\n__d(\"fbinstant/common/performanceTracker\",[\"InstantGamesSDKMessages\",\"fbinstant/common/requestAnimationFrameListener\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();var j=1.5;(function(){var l;if(!window.performance)window.performance={};if(!window.performance.now)(function(){var m=Date.now();window.performance.now=function(){return Date.now()-m}})()})();function k(){this.$PerformanceTracker1=0;this.$PerformanceTracker2=0;this.$PerformanceTracker3=0;this.$PerformanceTracker4=0}k.prototype.init=function(l){__p&&__p();this.$PerformanceTracker5=l;i.init();this.$PerformanceTracker1=window.performance.now();i.on(function(m){var n=m-this.$PerformanceTracker1;if(this.$PerformanceTracker4&&n>j*this.$PerformanceTracker4)this.$PerformanceTracker5.send(h.ON_FRAME_DROP,n);this.$PerformanceTracker2+=n;this.$PerformanceTracker3++;this.$PerformanceTracker1=m}.bind(this));window.setInterval(function(){if(this.$PerformanceTracker3){var m=this.$PerformanceTracker2/this.$PerformanceTracker3;this.$PerformanceTracker4=m;this.$PerformanceTracker5.send(h.AVERAGE_FRAME_TIME,m)}this.$PerformanceTracker2=0;this.$PerformanceTracker3=0}.bind(this),1e3)};f.exports=new k()}),null);\n__d(\"fbinstant/common/platform\",[],(function a(b,c,d,e,f,g){\"use strict\";f.exports={IOS:\"IOS\",ANDROID:\"ANDROID\",WEB:\"WEB\",MOBILE_WEB:\"MOBILE_WEB\"}}),null);\n__d(\"Set\",[],(function a(b,c,d,e,f,g){\"use strict\";f.exports=function(b){return b.Set}(b)}),null);\n__d(\"fbinstant/common/supportedFeaturesManager\",[\"Set\"],(function a(b,c,d,e,f,g,h){\"use strict\";__p&&__p();function i(){this.$SupportedFeaturesManager1=new h()}i.prototype.setSupported=function(j){this.$SupportedFeaturesManager1=new h(j)};i.prototype.isSupported=function(j){if(this.$SupportedFeaturesManager1.has(j))return true;return false};f.exports=new i()}),null);\n__d(\"fbinstant/common/validator\",[\"Promise\",\"fbinstant/common/errorCode\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();var j,k,l,m,n,o,p,q,r,s,t,u,v,w;x.prototype.validate=function(G,H){return H.validate(G)[\"catch\"](function(I){var J={code:i.INVALID_PARAM,message:I.message};throw J})};x.prototype.object=function(){return new z()};x.prototype.array=function(){return new A()};x.prototype.string=function(){return new B()};x.prototype.number=function(){return new C()};x.prototype.integer=function(){return new D()};x.prototype[\"boolean\"]=function(){return new E()};x.prototype.union=function(G){return new F(G)};function x(){}function y(){this.errors=[];this.isOptional=false;this.type=\"Any\"}y.prototype.validate=function(G){this.validator(G);return new h(function(H,I){if(this.errors.length>0)return I(new Error(this.errors.map(function(J){return J.message}).join(\"\\n\")));return H(G)}.bind(this))};y.prototype.validator=function(G){return};y.prototype.optional=function(){this.isOptional=true;return this};y.prototype.addError=function(G,H){if(H){this.errors.push(new Error(H));return}this.errors.push(new Error(\"Expected a value of type \"+this.type+\", received: \"+String(G)))};y.prototype.getErrors=function(){return this.errors};y.prototype.getType=function(){return this.type};j=babelHelpers.inherits(z,y);k=j&&j.prototype;function z(){k.constructor.call(this);this.$ObjectSchema1={};this.$ObjectSchema2=null;this.$ObjectSchema3=null;this.type=\"Object\"}z.prototype.keys=function(G){this.$ObjectSchema1=G;return this};z.prototype.maxSize=function(G){this.$ObjectSchema2=G;return this};z.prototype.minSize=function(G){this.$ObjectSchema3=G;return this};z.prototype.validator=function(G){__p&&__p();if(G==null&&this.isOptional)return;if(typeof G!==\"object\"||Array.isArray(G))this.addError(G);this.$ObjectSchema4(G);for(var H in this.$ObjectSchema1){var I=G[H],J=this.$ObjectSchema1[H];if(!J.validator){this.addError(I,\"Bad/missing validator for key: \"+H);return}J.validator(I);var K=J.getErrors();if(K.length>0){var L=\"For key \"+H+\": \";for(var M=K,N=Array.isArray(M),O=0,M=N?M:M[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var P;if(N){if(O>=M.length)break;P=M[O++]}else{O=M.next();if(O.done)break;P=O.value}var Q=P;L+=\"[\"+Q.message+\"],\"}this.addError(I,L)}}};z.prototype.$ObjectSchema4=function(G){if(this.$ObjectSchema2||this.$ObjectSchema3){var H=JSON.stringify(G).length;if(this.$ObjectSchema2&&H>this.$ObjectSchema2)this.errors.push(new Error(\"Object must be at most \"+String(this.$ObjectSchema2)+\" characters when stringified, was \"+String(H)));if(this.$ObjectSchema3&&H<this.$ObjectSchema3)this.errors.push(new Error(\"Object must be at least \"+String(this.$ObjectSchema3)+\" characters when stringified, was \"+String(H)))}};l=babelHelpers.inherits(A,y);m=l&&l.prototype;function A(){m.constructor.call(this);this.$ArraySchema1=new y();this.$ArraySchema2=null;this.type=\"Array\"}A.prototype.schemaType=function(G){this.$ArraySchema1=G;return this};A.prototype.length=function(G){this.$ArraySchema2=G;return this};A.prototype.validator=function(G){__p&&__p();if(G==null&&this.isOptional)return;if(!Array.isArray(G)){this.addError(G);return}if(this.$ArraySchema2&&G.length!==this.$ArraySchema2){this.addError(G,\"Received an array of length \"+String(G.length)+\", expected an array of length \"+String(this.$ArraySchema2));return}for(var H=G,I=Array.isArray(H),J=0,H=I?H:H[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var K;if(I){if(J>=H.length)break;K=H[J++]}else{J=H.next();if(J.done)break;K=J.value}var L=K;if(!this.$ArraySchema1.validator){this.addError(L,\"Bad/missing validator for Array\");return}this.$ArraySchema1.validator(L);var M=this.$ArraySchema1.getErrors();if(M.length>0){var N=this.$ArraySchema1.getType(),O=\"Array of type \"+N+\" contained a value of another type: \"+String(L);this.addError(L,O);return}}};n=babelHelpers.inherits(B,y);o=n&&n.prototype;function B(){o.constructor.call(this);this.type=\"String\"}B.prototype.validator=function(G){if(G==null&&this.isOptional)return;if(typeof G!==\"string\")this.addError(G)};p=babelHelpers.inherits(C,y);q=p&&p.prototype;function C(){q.constructor.call(this);this.type=\"Number\"}C.prototype.validator=function(G){if(G==null&&this.isOptional)return;var H=typeof G===\"number\"&&!isNaN(G);if(!H)this.addError(G)};r=babelHelpers.inherits(D,C);s=r&&r.prototype;function D(){s.constructor.call(this);this.type=\"Integer\"}D.prototype.validator=function(G){if(G==null&&this.isOptional)return;if(!Number.isInteger(G))this.addError(G)};t=babelHelpers.inherits(E,y);u=t&&t.prototype;function E(){u.constructor.call(this);this.type=\"Boolean\"}E.prototype.validator=function(G){if(G==null&&this.isOptional)return;if(typeof G!==\"boolean\")this.addError(G)};v=babelHelpers.inherits(F,y);w=v&&v.prototype;function F(G){__p&&__p();w.constructor.call(this);this.$UnionSchema1=G;var H=\" or \",I=\"\";for(var J=G,K=Array.isArray(J),L=0,J=K?J:J[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var M;if(K){if(L>=J.length)break;M=J[L++]}else{L=J.next();if(L.done)break;M=L.value}var N=M;I+=N.type+H}this.type=I.substring(0,I.length-H.length)}F.prototype.validator=function(G){__p&&__p();if(G==null&&this.isOptional)return;var H=[];for(var I=this.$UnionSchema1,J=Array.isArray(I),K=0,I=J?I:I[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var L;if(J){if(K>=I.length)break;L=I[K++]}else{K=I.next();if(K.done)break;L=K.value}var M=L;M.validator(G);var N=M.getErrors();if(N.length===0)return;H.concat(N)}this.addError(G);for(var O=H,P=Array.isArray(O),Q=0,O=P?O:O[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var R;if(P){if(Q>=O.length)break;R=O[Q++]}else{Q=O.next();if(Q.done)break;R=Q.value}var S=R;this.errors.push(S)}};f.exports=new x()}),null);\n__d(\"AppCustomEventType\",[],(function a(b,c,d,e,f,g){f.exports={FB_MOBILE_ACTIVATE_APP:\"fb_mobile_activate_app\",FB_MOBILE_COMPLETE_REGISTRATION:\"fb_mobile_complete_registration\",FB_MOBILE_CONTENT_VIEW:\"fb_mobile_content_view\",FB_MOBILE_SEARCH:\"fb_mobile_search\",FB_MOBILE_RATE:\"fb_mobile_rate\",FB_MOBILE_TUTORIAL_COMPLETION:\"fb_mobile_tutorial_completion\",FB_MOBILE_ADD_TO_CART:\"fb_mobile_add_to_cart\",FB_MOBILE_ADD_TO_WISHLIST:\"fb_mobile_add_to_wishlist\",FB_MOBILE_INITIATED_CHECKOUT:\"fb_mobile_initiated_checkout\",FB_MOBILE_ADD_PAYMENT_INFO:\"fb_mobile_add_payment_info\",FB_MOBILE_PURCHASE:\"fb_mobile_purchase\",FB_MOBILE_LEVEL_ACHIEVED:\"fb_mobile_level_achieved\",FB_MOBILE_ACHIEVEMENT_UNLOCKED:\"fb_mobile_achievement_unlocked\",FB_MOBILE_SPENT_CREDITS:\"fb_mobile_spent_credits\",FB_DIRECT_INSTALL_SUCCESS:\"fb_direct_install_success\",APPMANAGER_CRASH_REPORT:\"appmanager_crash_report\",FB_PAGE_VIEW:\"fb_page_view\",FB_WEB_NEW_USER:\"fb_web_new_user\",FB_OTHER:\"fb_other\",FB_MESSENGER_BOT_NEW_USER:\"fb_messenger_bot_new_user\",FB_MESSENGER_BOT_MESSAGE_SENT:\"fb_messenger_bot_message_sent\",FB_MESSENGER_BOT_MESSAGE_RECEIVED:\"fb_messenger_bot_message_received\",FB_MESSENGER_BOT_THREAD_DELETED:\"fb_messenger_bot_thread_deleted\",FB_MESSENGER_BOT_STOPPED:\"fb_messenger_bot_stopped\",FB_MESSENGER_BOT_STARTED:\"fb_messenger_bot_started\",FB_MESSENGER_BOT_POSTBACK_CALLED:\"fb_messenger_bot_postback_called\",FB_INSTANT_EXPERIENCES_LAUNCH:\"fb_instant_experiences_launch\",FB_INSTANT_EXPERIENCES_NEW_USER:\"fb_instant_experiences_new_user\",FB_INSTANT_ARTICLES_CTA_SIGN_UP:\"fb_instant_articles_cta_sign_up\",FB_INSTANT_ARTICLES_CTA_IMPRESSION:\"fb_instant_articles_cta_impression\",FB_INSTANT_ARTICLES_NEW_USER:\"fb_instant_articles_new_user\",FB_INSTANT_ARTICLES_CLICK:\"fb_instant_articles_click\",FB_INSTANT_GAMES_NEW_USER:\"fb_instant_games_new_user\",FB_INSTANT_GAMES_LAUNCH:\"fb_instant_games_launch\",FB_INSTANT_GAMES_UPDATE_SENT:\"fb_instant_games_update_sent\",FB_INSTANT_GAMES_UPDATE_CLICK:\"fb_instant_games_update_click\",FB_INSTANT_GAMES_BOT_MESSAGE_SEND:\"fb_instant_games_bot_message_sent\",FB_INSTANT_GAMES_BOT_MESSAGE_CLICK:\"fb_instant_games_bot_message_click\",FB_INSTANT_GAMES_SESSION_PLAY:\"fb_instant_games_session_play\",FB_INSTANT_GAMES_PLATFORM_EVENT:\"fb_instant_games_platform_event\",FB_OFFLINE_PURCHASE:\"fb_offline_purchase\",FB_OFFLINE_NEW_USER:\"fb_offline_new_user\",FB_OFFLINE_LEAD:\"fb_offline_lead\",FB_PAGES_POST_REACTION:\"fb_pages_post_reaction\",FB_PAGES_POST_COMMENT:\"fb_pages_post_comment\",FB_PAGES_POST_SHARE:\"fb_pages_post_share\",FB_PAGES_POST_ANSWER:\"fb_pages_post_answer\",FB_PAGES_POST_RSVP:\"fb_pages_post_rsvp\",FB_PAGES_PAGE_CHECKIN:\"fb_pages_page_checkin\",FB_PAGES_MESSAGING_THREAD_READ:\"fb_pages_messaging_thread_read\",FB_PAGES_MESSAGING_MESSAGE_RECEIVED:\"fb_pages_messaging_message_received\",FB_PAGES_MESSAGING_MESSAGE_SENT:\"fb_pages_messaging_message_sent\",FB_PAGES_MESSAGING_BLOCK:\"fb_pages_messaging_block\",FB_PAGES_MESSAGING_DELETE_THREAD:\"fb_pages_messaging_delete_thread\",FB_PAGES_MESSAGING_MARK_SPAM:\"fb_pages_messaging_mark_spam\",FB_PAGES_MESSAGING_LABEL_ADDED:\"fb_pages_messaging_label_added\",FB_PAGES_MESSAGING_LABEL_REMOVED:\"fb_pages_messaging_label_removed\",FB_PAGES_MESSAGING_NEW_CONVERSATION:\"fb_pages_messaging_new_conversation\",FB_PAGES_POST_VIDEO_PLAY_CLICK:\"fb_pages_post_video_play_click\",FB_PAGES_POST_PHOTO_VIEW_CLICK:\"fb_pages_post_photo_view_click\",FB_PAGES_NEW_USER:\"fb_pages_new_user\",FB_CAMERA_EFFECT_OPENED:\"fb_camera_effect_opened\",FB_CAMERA_EFFECT_SHARED:\"fb_camera_effect_shared\",FB_CAMERA_EFFECT_SHARE_IMPRESSION:\"fb_camera_effect_share_impression\",FB_CAMERA_EFFECT_TIME_SPENT:\"fb_camera_effect_time_spent\",FB_CAMERA_EFFECT_POST_IMPRESSION:\"fb_camera_effect_post_impression\",FB_CAMERA_EFFECT_CAMERA_CAPTURE:\"fb_camera_effect_camera_capture\",FB_VIDEO_ASSET_VIDEO_VIEW:\"fb_video_asset_video_view\",FB_VIDEO_ASSET_IMPRESSION:\"fb_video_asset_impression\",FB_VIDEO_ASSET_REACTION:\"fb_video_asset_reaction\",FB_VIDEO_ASSET_COMMENT:\"fb_video_asset_comment\",FB_VIDEO_ASSET_SHARE:\"fb_video_asset_share\",FB_VIDEO_POST_VIDEO_VIEW:\"fb_video_post_video_view\",FB_VIDEO_POST_IMPRESSION:\"fb_video_post_impression\",FB_VIDEO_POST_REACTION:\"fb_video_post_reaction\",FB_VIDEO_POST_COMMENT:\"fb_video_post_comment\",FB_VIDEO_POST_SHARE:\"fb_video_post_share\",FB_MOBILE_INSTALL:\"fb_mobile_first_app_launch\",FB_MOBILE_DEACTIVATE_APP:\"fb_mobile_deactivate_app\",FB_BASE_EVENT:\"fb_base_event\",FB_NEW_USER:\"fb_new_user\",FB_PURCHASE:\"fb_purchase\",FB_PAGE_MESSAGING_ACTIVE_CONVERSATION:\"fb_pages_messaging_active_conversation\"}}),null);\n__d(\"AppEventField\",[],(function a(b,c,d,e,f,g){f.exports={ANALYTICS_PARTNER_APP_ID:\"_analyticsPartnerAppid\",APP_USER_ID:\"_app_user_id\",APP_VERSION:\"_appVersion\",EVENT_NAME:\"_eventName\",EVENT_NAME_MD5:\"_eventName_md5\",IMPLICITLY_LOGGED:\"_implicitlyLogged\",IS_TIMED_EVENT:\"_isTimedEvent\",LOG_TIME:\"_logTime\",ORDER_ID:\"fb_order_id\",SESSION_ID:\"_session_id\",UI:\"_ui\",VALUE_TO_SUM:\"_valueToSum\",COUNT:\"$aggr.count\"}}),null);\n__d(\"FBEventsParamList\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();var h=\"deep\",i=\"shallow\";function j(){this.list=[]}j.prototype={append:function l(m,n){this._append(encodeURIComponent(m),n,h)},_append:function l(m,n,o){if(Object(n)!==n)this._appendPrimitive(m,n);else if(o===h)this._appendObject(m,n);else this._appendPrimitive(m,k(n))},_appendPrimitive:function l(m,n){if(n!=null)this.list.push([m,n])},_appendObject:function l(m,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var p=m+\"[\"+encodeURIComponent(o)+\"]\";this._append(p,n[o],i)}},each:function l(m){var n=this.list;for(var o=0,p=n.length;o<p;o++)m(n[o][0],n[o][1])},toQueryString:function l(){var m=[];this.each(function(n,o){m.push(n+\"=\"+encodeURIComponent(o))});return m.join(\"&\")}};function k(l){if(typeof JSON===\"undefined\"||JSON===null||!ES(\"JSON\",\"stringify\",false))return Object.prototype.toString.call(l);else return ES(\"JSON\",\"stringify\",false,l)}f.exports=j}),null);\n__d(\"GraphApplicationActivitiesUserIDType\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({INSTANT_GAMES_PLAYER_ID:\"INSTANT_GAMES_PLAYER_ID\"})}),null);\n__d(\"fbinstant/common/postEvent\",[],(function a(b,c,d,e,f,g){\"use strict\";var h=function h(i,j){var k=new XMLHttpRequest();k.open(\"POST\",i);k.setRequestHeader(\"Content-type\",\"application/x-www-form-urlencoded\");k.send(j.toQueryString())};f.exports=h}),null);\n__d(\"fbinstant/common/analytics\",[\"AppCustomEventType\",\"AppEventField\",\"FBEventsParamList\",\"GraphApplicationActivitiesUserIDType\",\"Set\",\"fbinstant/common/errorCode\",\"fbinstant/common/postEvent\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){\"use strict\";__p&&__p();var o=h.FB_INSTANT_GAMES_LAUNCH,p=k.INSTANT_GAMES_PLAYER_ID;function q(){this.$Analytics1=\"WAITING\";this.$Analytics6=[];this.$Analytics2=null;this.$Analytics3=/^apps-(\\d+)\\..*\\.fbsbx\\.com$/i;this.$Analytics4=new l()}q.prototype.init=function(r,s){__p&&__p();this.$Analytics2=r;this.$Analytics5=s;if(!this.$Analytics2)this.$Analytics2=this.$Analytics7();if(!this.$Analytics2){this.$Analytics1=\"FAILED\";return}this.$Analytics8();this.$Analytics1=\"DONE\"};q.prototype.logActive=function(){return this.logEvent(o)};q.prototype.logEvent=function(r,s,t){var event={eventName:r,valueToSum:s,parameters:t};if(this.$Analytics1===\"WAITING\"){this.$Analytics6.push(event);return null}else if(this.$Analytics1===\"DONE\")return this.$Analytics9([event]);else return{code:m.ANALYTICS_POST_EXCEPTION,message:\"Failed to log analytics event\"}};q.prototype.logAPICall=function(r){if(this.$Analytics4.has(r))return{code:m.ANALYTICS_POST_EXCEPTION,message:\"Already logged this API event\"};var s=this.logEvent(\"_FBInstant\",null,{name:r});if(!s)this.$Analytics4.add(r);return s};q.prototype.logBeginAsyncAPICall=function(r){return this.logEvent(\"_FBInstant\",null,{name:r,action:\"begin\"})};q.prototype.logResolveAsyncAPICall=function(r){return this.logEvent(\"_FBInstant\",null,{name:r,action:\"resolve\"})};q.prototype.logRejectAsyncAPICall=function(r,s){return this.logEvent(\"_FBInstant\",null,{name:r,action:\"reject\",code:s||null})};q.prototype.$Analytics10=function(){if(!this.$Analytics2)return null;return\"https://graph.facebook.com/\"+this.$Analytics2+\"/activities\"};q.prototype.$Analytics11=function(event){var r=babelHelpers[\"extends\"]({},event.parameters,{app_id:this.$Analytics2});r[i.EVENT_NAME]=event.eventName;r[i.VALUE_TO_SUM]=event.valueToSum;return JSON.stringify(r)};q.prototype.$Analytics9=function(r){__p&&__p();if(!this.$Analytics2)return{code:m.ANALYTICS_POST_EXCEPTION,message:\"Analytics failed to resolve the application ID.\"};try{var s=r.map(function(event){return this.$Analytics11(event)}.bind(this)),t=new j();t.append(\"event\",\"CUSTOM_APP_EVENTS\");t.append(\"extinfo\",[\"ig1\"]);t.append(\"user_id\",this.$Analytics5);t.append(\"user_id_type\",p);t.append(\"advertiser_tracking_enabled\",1);t.append(\"application_tracking_enabled\",1);t.append(\"custom_events\",s);var u=this.$Analytics10();if(!u)return{code:m.ANALYTICS_POST_EXCEPTION,message:\"Unable to use the analytics endpoint\"};n(u,t)}catch(v){return{code:m.ANALYTICS_POST_EXCEPTION,message:v.message}}return null};q.prototype.$Analytics8=function(){if(this.$Analytics6.length===0)return null;this.$Analytics9(this.$Analytics6);this.$Analytics6=[]};q.prototype.$Analytics7=function(){var r=window.location.hostname;if(r){var s=this.$Analytics3.exec(r);if(s&&s.length&&s.length>1&&s[1])return s[1]}return null};f.exports=q}),null);\n__d(\"fbinstant/common/supportedMessagesManager\",[\"InstantGamesSDKMessages\",\"Set\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();var j=new i([h.INITIALIZE_ASYNC,h.ON_BEGIN_LOAD,h.ON_CONSOLE,h.ON_PROGRESS_LOAD,h.ON_GAME_READY,h.ON_SCORE,h.ON_SCREENSHOT,h.ON_PICTURE,h.ON_END_GAME,h.GET_PLAYER_DATA_ASYNC,h.SET_PLAYER_DATA_ASYNC]);function k(){this.$SupportedMessagesManager1=new i()}k.prototype.setSupported=function(l){this.$SupportedMessagesManager1=new i(l)};k.prototype.isSupported=function(l){if(j.has(l))return true;return this.$SupportedMessagesManager1.has(l)};f.exports=new k()}),null);\n__d(\"fbinstant/releases/5.0/contextType\",[],(function a(b,c,d,e,f,g){\"use strict\";f.exports={GROUP:\"GROUP\",POST:\"POST\",SOLO:\"SOLO\",THREAD:\"THREAD\"}}),null);\n__d(\"fbinstant/releases/5.0/gameContext\",[\"fbinstant/releases/5.0/contextType\"],(function a(b,c,d,e,f,g,h){\"use strict\";__p&&__p();function i(j){__p&&__p();this.$GameContext4=null;var k=j.id,l=j.type,m=j.size;if(!k||!l||l===h.SOLO){this.$GameContext1=null;this.$GameContext2=null;this.$GameContext3=h.SOLO;return}this.$GameContext3=l;this.$GameContext1=k;this.$GameContext2=m||null}i.prototype.getID=function(){return this.$GameContext1};i.prototype.getType=function(){return this.$GameContext3};i.prototype.getSize=function(){return this.$GameContext2};i.prototype.getContextSizeResponse=function(){return this.$GameContext4};i.prototype.setContextSizeResponse=function(j){this.$GameContext4=j};f.exports=i}),null);\n__d(\"fbinstant/common/eventBatcher\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();var h=5e3;function i(j){this.$EventBatcher4=function(){this.$EventBatcher3(this.$EventBatcher2);this.$EventBatcher2=[]}.bind(this);this.$EventBatcher3=j;this.$EventBatcher2=[];this.$EventBatcher1=null}i.prototype.startInterval=function(){var j=arguments.length<=0||arguments[0]===undefined?h:arguments[0];if(this.$EventBatcher1!==null)this.stopInterval();this.$EventBatcher1=setInterval(this.$EventBatcher4,j)};i.prototype.stopInterval=function(){if(!this.$EventBatcher1)return;clearInterval(this.$EventBatcher1);this.$EventBatcher1=null};i.prototype.logEvent=function(event){this.$EventBatcher2.push(event)};f.exports=i}),null);\n/**\n * License: https://www.facebook.com/legal/license/IOrG1U-MQVN/\n */\n__d(\"Alea\",[],(function a(b,c,d,e,f,g){__p&&__p();function h(){__p&&__p();var j=4022871197,k=function k(l){__p&&__p();l=l.toString();for(var m=0;m<l.length;m++){j+=l.charCodeAt(m);var n=.02519603282416938*j;j=n>>>0;n-=j;n*=j;j=n>>>0;n-=j;j+=n*4294967296}return(j>>>0)*23283064365386963e-26};k.version=\"Mash 0.9\";return k}function i(){__p&&__p();return function(j){__p&&__p();var k=0,l=0,m=0,n=1;if(j.length===0)j=[new Date()];var o=new h();k=o(\" \");l=o(\" \");m=o(\" \");for(var p=0;p<j.length;p++){k-=o(j[p]);if(k<0)k+=1;l-=o(j[p]);if(l<0)l+=1;m-=o(j[p]);if(m<0)m+=1}o=null;var q=function q(){var r=2091639*k+n*23283064365386963e-26;k=l;l=m;m=r-(n=r|0);return m};q.version=\"Alea 0.9\";q.args=j;return q}(Array.prototype.slice.call(arguments))}f.exports=i}),null);\n__d(\"Random\",[\"Alea\",\"ServerNonce\"],(function a(b,c,d,e,f,g,h){\"use strict\";__p&&__p();var i=4294967296,j=c(\"ServerNonce\").ServerNonce,k=h(j),l={random:function m(){if(window!==undefined&&Uint32Array!==undefined){var n=new Uint32Array(1),o=window.crypto||window.msCrypto;if(o&&o.getRandomValues){o.getRandomValues(n);return n[0]/i}}return k()},uint32:function m(){return Math.floor(this.random()*i)},coinflip:function m(n){if(n===0)return false;if(n<=1)return true;return l.random()*n<=1}};f.exports=l}),null);\n__d(\"Map\",[],(function a(b,c,d,e,f,g){\"use strict\";f.exports=function(b){return b.Map}(b)}),null);\n__d(\"fbinstant/common/messageLocksMap\",[\"InstantGamesSDKMessages\"],(function a(b,c,d,e,f,g,h){\"use strict\";var i=[h.CONTEXT_CHOOSE_ASYNC,h.CONTEXT_CREATE_ASYNC,h.CONTEXT_SWITCH_ASYNC,h.SHARE_ASYNC],j=[h.FLUSH_PLAYER_DATA_ASYNC,h.SET_PLAYER_DATA_ASYNC],k={};k[h.SHARE_ASYNC]=i;k[h.CONTEXT_CHOOSE_ASYNC]=i;k[h.CONTEXT_CREATE_ASYNC]=i;k[h.CONTEXT_SWITCH_ASYNC]=i;k[h.FLUSH_PLAYER_DATA_ASYNC]=j;k[h.CONTEXT_MATCH_CREATE_ASYNC]=[h.CONTEXT_MATCH_CREATE_ASYNC];f.exports=k}),null);\n__d(\"fbinstant/common/exclusiveMessageManager\",[\"Promise\",\"InstantGamesErrorCode\",\"Map\",\"fbinstant/common/messageLocksMap\",\"invariant\"],(function a(b,c,d,e,f,g,h,i,j,k,l){\"use strict\";__p&&__p();function m(){this.$ExclusiveMessageManager1=new j()}m.prototype.isLocked=function(n){return this.$ExclusiveMessageManager1.has(n)};m.prototype.lockOrThrow=function(n){__p&&__p();if(this.isLocked(n)){var o=this.$ExclusiveMessageManager1.get(n);return this.$ExclusiveMessageManager2(String(o))}var p=k[n];if(!p)return h.resolve();for(var q=p,r=Array.isArray(q),s=0,q=r?q:q[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var t;if(r){if(s>=q.length)break;t=q[s++]}else{s=q.next();if(s.done)break;t=s.value}var u=t;if(this.$ExclusiveMessageManager1.has(u)){var v=this.$ExclusiveMessageManager1.get(u);v!==undefined||l(0);return this.$ExclusiveMessageManager2(v)}}for(var w=p,x=Array.isArray(w),y=0,w=x?w:w[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var z;if(x){if(y>=w.length)break;z=w[y++]}else{y=w.next();if(y.done)break;z=y.value}var A=z;this.$ExclusiveMessageManager1.set(A,n)}return h.resolve()};m.prototype.release=function(n){__p&&__p();var o=k[n];if(!o)return;for(var p=o,q=Array.isArray(p),r=0,p=q?p:p[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var s;if(q){if(r>=p.length)break;s=p[r++]}else{r=p.next();if(r.done)break;s=r.value}var t=s;this.$ExclusiveMessageManager1[\"delete\"](t)}};m.prototype.reset_TESTINGONLY=function(){this.$ExclusiveMessageManager1=new j()};m.prototype.$ExclusiveMessageManager2=function(n){return h.reject({code:i.PENDING_REQUEST,message:\"There is currently a pending request for locking message: \"+n})};f.exports=new m()}),null);\n__d(\"fbinstant/releases/5.0/apiError\",[\"fbinstant/common/errorCode\"],(function a(b,c,d,e,f,g,h){\"use strict\";function i(j){this.code=j.code||h.UNKNOWN;this.message=j.message;if(this.code===h.CLIENT_REQUIRES_UPDATE)this.code=h.CLIENT_UNSUPPORTED_OPERATION}f.exports=i}),null);\n__d(\"fbinstant/releases/5.0/messageSender\",[\"Promise\",\"InstantGamesSDKMessages\",\"Random\",\"fbinstant/common/errorCode\",\"fbinstant/common/event\",\"fbinstant/common/exclusiveMessageManager\",\"fbinstant/common/supportedMessagesManager\",\"fbinstant/releases/5.0/apiError\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){\"use strict\";__p&&__p();function p(q){this.$MessageSender4=q;this.$MessageSender1={};this.$MessageSender2=new l();this.$MessageSender3=new l()}p.prototype.initialize=function(q){__p&&__p();this.$MessageSender6=q.source;this.$MessageSender5=q.sender;this.$MessageSender2.on(function(t){this.$MessageSender7(t,true)}.bind(this));this.$MessageSender3.on(function(t){this.$MessageSender7(t,false)}.bind(this));var r=new RegExp(\"[?&]IsMobileWeb(=([^&#]*)|&|#|$)\",\"i\"),s=r.exec(window.location.href);if(!s||!s[2])return;window.IsMobileWeb=parseInt(s[2],10)===1};p.prototype.getResolvePromiseEvent=function(){return this.$MessageSender2};p.prototype.getRejectPromiseEvent=function(){return this.$MessageSender3};p.prototype.send=function(q,r){if(!this.$MessageSender6||!this.$MessageSender5||!n.isSupported(q))return;this.$MessageSender5.postMessage(this.$MessageSender8({type:q,content:r,destination:this.$MessageSender6}),\"*\")};p.prototype.sendAsync=function(q,r){if(!n.isSupported(q))return h.reject(new o({code:k.CLIENT_UNSUPPORTED_OPERATION,message:\"Client does not support the message: \"+q}));return m.lockOrThrow(q).then(function(){return this.$MessageSender9(q,r).then(function(s){m.release(q);return s})[\"catch\"](function(s){m.release(q);throw s})}.bind(this))[\"catch\"](function(s){throw new o(s)})};p.prototype.sendPassThroughAsync=function(q,r){var s=JSON.stringify(r||{}),t={data:s,request:q,sdkVersion:this.$MessageSender4};return this.sendAsync(i.SEND_PASS_THROUGH_ASYNC,t).then(function(u){if(!u)return h.reject(new o({code:k.UNKNOWN,message:\"No response data provided\"}));var v=JSON.parse(u),w=v.data,x=v.errorCode,y=v.errorMessage;if(x)return h.reject(new o({code:x,message:y||\"\"}));return w})};p.prototype.$MessageSender8=function(q){switch(this.$MessageSender6){case\"Android\":case\"quicksilver-rn\":return JSON.stringify(q)}return q};p.prototype.$MessageSender10=function(q){return q+\"_\"+j.uint32().toString()};p.prototype.$MessageSender11=function(q,r,s){this.$MessageSender1[q]={resolve:r,reject:s}};p.prototype.$MessageSender7=function(q,r){__p&&__p();var s=q.promiseID;if(!s||!this.$MessageSender1[s])return;var t=this.$MessageSender1[s];if(r&&t.resolve)t.resolve(q.data);else if(!r&&t.reject){var u=q.data;if(!u)u=new o({message:\"\"});else u=new o({code:u.code||k.UNKNOWN,message:u.message||\"\"});t.reject(u)}delete this.$MessageSender1[s]};p.prototype.$MessageSender9=function(q,r){return new h(function(s,t){var u=this.$MessageSender10(q);this.$MessageSender11(u,s,t);var v=r||{};v.promiseID=u;this.send(q,v)}.bind(this))};f.exports=p}),null);\n__d(\"fbinstant/releases/5.0/internalEventLogger\",[\"InstantGamesPassThroughRequestType\",\"fbinstant/common/eventBatcher\",\"fbinstant/releases/5.0/messageSender\"],(function a(b,c,d,e,f,g,h,i,j){\"use strict\";__p&&__p();function k(){this.$InternalEventLogger3=function(l){if(!this.$InternalEventLogger2)return;if(l.length<=0)return;this.$InternalEventLogger2.sendPassThroughAsync(h.SDK_EVENT,{events:l})}.bind(this);this.$InternalEventLogger1=new i(this.$InternalEventLogger3)}k.prototype.initialize=function(l){this.$InternalEventLogger2=l;this.$InternalEventLogger1.startInterval()};k.prototype.logEvent=function(l,m,n){this.$InternalEventLogger1.logEvent({type:l,data:babelHelpers[\"extends\"]({},n,{contextID:m.getContext().getID()})})};f.exports=k}),null);\n__d(\"fbinstant/releases/5.0/paymentsState\",[\"Promise\",\"fbinstant/common/event\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();function j(){this.$PaymentsState3=false;this.$PaymentsState1=new i();this.$PaymentsState2=new h(function(k,l){this.$PaymentsState1.on(function(){this.$PaymentsState3=true;k();this.$PaymentsState1.unbind()}.bind(this))}.bind(this))}j.prototype.getPaymentsInitializedEvent=function(){return this.$PaymentsState1};j.prototype.isClientReady=function(){return this.$PaymentsState3};j.prototype.onInitialized=function(k){this.$PaymentsState2.done(k)};f.exports=j}),null);\n__d(\"fbinstant/releases/5.0/internalStates\",[\"InstantGamesGameState\",\"fbinstant/common/analytics\",\"fbinstant/common/event\",\"fbinstant/common/supportedFeaturesManager\",\"fbinstant/common/supportedMessagesManager\",\"fbinstant/releases/5.0/contextType\",\"fbinstant/releases/5.0/gameContext\",\"fbinstant/releases/5.0/internalEventLogger\",\"fbinstant/releases/5.0/messageSender\",\"fbinstant/releases/5.0/paymentsState\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){\"use strict\";__p&&__p();function r(){__p&&__p();this.$InternalStates24=\"fbinstant.5.0\".substring(\"fbinstant.\".length);this.$InternalStates15=new p(this.$InternalStates24);this.$InternalStates1=new i();this.$InternalStates2=new j();this.$InternalStates3=null;this.$InternalStates4=null;this.$InternalStates5=new n({type:m.SOLO});this.$InternalStates6=null;this.$InternalStates7=0;this.$InternalStates9=null;this.$InternalStates8=null;this.$InternalStates10=h.LOADING;this.$InternalStates11=new j();this.$InternalStates12=false;this.$InternalStates13=new o();this.$InternalStates14=null;this.$InternalStates17=new q();this.$InternalStates18=null;this.$InternalStates19=null;this.$InternalStates20=null;this.$InternalStates21=null;this.$InternalStates22=null;this.$InternalStates23=new j();this.$InternalStates16=new j()}r.prototype.initialize=function(s){__p&&__p();if(s.appID)this.setAppID(s.appID);this.setLocale(s.locale);this.setPlayerID(s.playerID);this.setPlayerName(s.playerName);this.setPlayerPhoto(s.playerPhoto);if(s.supportedMessages&&Array.isArray(s.supportedMessages))l.setSupported(s.supportedMessages);if(s.supportedFeatures&&Array.isArray(s.supportedFeatures))k.setSupported(s.supportedFeatures);if(s.entryPointData)try{this.setEntryPointData(JSON.parse(s.entryPointData))}catch(t){}if(s.entryPoint)this.setRawSource(s.entryPoint);this.updateContext(s);this.setInitialized();this.getAnalytics().init(this.getAppID(),this.getPlayerID());this.getAnalyticsLogEvent().on(function(event){var u=event.eventName,v=event.valueToSum,w=event.parameters;if(!u)return;this.getAnalytics().logEvent(u,v!=null?v:null,w||null)}.bind(this));this.getInternalEventLogger().initialize(this.getMessageSender())};r.prototype.updateContext=function(s){if(!s.contextType)return;this.setContextPlayersPromise(null);this.$InternalStates5=new n({id:s.contextID,size:s.contextSize,type:s.contextType.toUpperCase()})};r.prototype.setAppID=function(s){this.$InternalStates3=s};r.prototype.setLocale=function(s){this.$InternalStates14=s};r.prototype.setPlayerID=function(s){this.$InternalStates19=s};r.prototype.setPlayerName=function(s){this.$InternalStates20=s};r.prototype.setPlayerPhoto=function(s){this.$InternalStates21=s};r.prototype.setRawSource=function(s){this.$InternalStates22=s};r.prototype.setEntryPoint=function(s){this.$InternalStates9=s};r.prototype.setEntryPointData=function(s){this.$InternalStates8=s};r.prototype.setInitialized=function(){this.$InternalStates12=true};r.prototype.setPlatform=function(s){this.$InternalStates18=s};r.prototype.setLoadingProgress=function(s){this.$InternalStates7=s};r.prototype.setGameState=function(s){this.$InternalStates10=s};r.prototype.setConnectedPlayersPromise=function(s){this.$InternalStates4=s};r.prototype.setContextPlayersPromise=function(s){this.$InternalStates6=s};r.prototype.getAnalytics=function(){return this.$InternalStates1};r.prototype.getAppID=function(){return this.$InternalStates3};r.prototype.getConnectedPlayersPromise=function(){return this.$InternalStates4};r.prototype.getContext=function(){return this.$InternalStates5};r.prototype.getContextPlayersPromise=function(){return this.$InternalStates6};r.prototype.getLoadingProgress=function(){return this.$InternalStates7};r.prototype.getEntryPoint=function(){return this.$InternalStates9};r.prototype.getEntryPointData=function(){return this.$InternalStates8};r.prototype.getGameState=function(){return this.$InternalStates10};r.prototype.getGameStartEvent=function(){return this.$InternalStates11};r.prototype.isInitialized=function(){return this.$InternalStates12};r.prototype.getInternalEventLogger=function(){return this.$InternalStates13};r.prototype.getLocale=function(){return this.$InternalStates14};r.prototype.getMessageSender=function(){return this.$InternalStates15};r.prototype.getPaymentsState=function(){return this.$InternalStates17};r.prototype.getPlatform=function(){return this.$InternalStates18};r.prototype.getPlayerID=function(){return this.$InternalStates19};r.prototype.getPlayerName=function(){return this.$InternalStates20};r.prototype.getPlayerPhoto=function(){return this.$InternalStates21};r.prototype.getRestartEvent=function(){return this.$InternalStates23};r.prototype.getPauseEvent=function(){return this.$InternalStates16};r.prototype.getAnalyticsLogEvent=function(){return this.$InternalStates2};r.prototype.getSdkVersion=function(){return this.$InternalStates24};r.prototype.getRawSource=function(){return this.$InternalStates22};f.exports=new r()}),null);\n__d(\"InstantGamesSDKEventType\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({API_CALL:\"api_call\",API_BEGIN_ASYNC:\"api_begin_async\",API_REJECT_ASYNC:\"api_reject_async\",API_RESOLVE_ASYNC:\"api_resolve_async\"})}),null);\n__d(\"InstantGamesSDKEvents\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({API:\"API\"})}),null);\n__d(\"fbinstant/releases/5.0/logger\",[\"InstantGamesSDKEvents\",\"InstantGamesSDKEventType\",\"fbinstant/releases/5.0/internalStates\"],(function a(b,c,d,e,f,g,h,i,j){\"use strict\";__p&&__p();function k(q,r){return q.then(function(s){o(r);return s})[\"catch\"](function(s){var t=s&&s.code||null;n(r,t);throw s})}function l(q){var r=j.getAnalytics();r.logAPICall(q);p(h.API,{type:i.API_CALL,name:q})}function m(q){var r=j.getAnalytics();r.logBeginAsyncAPICall(q);p(h.API,{type:i.API_BEGIN_ASYNC,name:q})}function n(q,r){var s=j.getAnalytics();s.logRejectAsyncAPICall(q,r);p(h.API,{type:i.API_REJECT_ASYNC,name:q,code:r})}function o(q){var r=j.getAnalytics();r.logResolveAsyncAPICall(q);p(h.API,{type:i.API_RESOLVE_ASYNC,name:q})}function p(q,r){j.getInternalEventLogger().logEvent(q,j,r)}f.exports={logAPICall:l,logBeginAsync:m,logAsyncResult:k,logReject:n,logResolve:o}}),null);\n__d(\"fbinstant/releases/5.0/ads\",[\"InstantGamesSDKMessages\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/internalStates\",\"fbinstant/releases/5.0/logger\"],(function a(b,c,d,e,f,g,h,i,j,k){\"use strict\";__p&&__p();function l(m){this.$AdInstance1=m}l.prototype.getPlacementID=function(){return this.$AdInstance1.placementID};l.prototype.loadAsync=function(){var m=\"AdInstance_loadAsync\";k.logBeginAsync(m);var n=j.getMessageSender().sendAsync(h.LOAD_AD_ASYNC,{adInstanceID:this.$AdInstance1.adInstanceID});return k.logAsyncResult(n,m).then(function(){})};l.prototype.showAsync=function(){var m=\"AdInstance_showAsync\";k.logBeginAsync(m);var n=j.getMessageSender().sendAsync(h.SHOW_AD_ASYNC,{adInstanceID:this.$AdInstance1.adInstanceID});return k.logAsyncResult(n,m).then(function(){})};f.exports={AdInstance:l,getInterstitialAdAsync:function m(n){return i.validate(n,i.string()).then(function(){return j.getMessageSender().sendAsync(h.GET_INTERSTITIAL_AD_ASYNC,{placementID:n})}).then(function(o){return new l(o)})},getRewardedVideoAsync:function m(n){return i.validate(n,i.string()).then(function(){return j.getMessageSender().sendAsync(h.GET_REWARDED_VIDEO_ASYNC,{placementID:n})}).then(function(o){return new l(o)})}}}),null);\n__d(\"InstantGamesChallengePickerFilter\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({NEW_CONTEXT_ONLY:\"NEW_CONTEXT_ONLY\",INCLUDE_EXISTING_CHALLENGES:\"INCLUDE_EXISTING_CHALLENGES\",NEW_PLAYERS_ONLY:\"NEW_PLAYERS_ONLY\"})}),null);\n__d(\"InstantGamesContextMatchStatus\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({ACTIVE:\"ACTIVE\",ENDED:\"ENDED\"})}),null);\n__d(\"fbinstant/releases/5.0/activityStore\",[\"Promise\",\"InstantGamesContextMatchStatus\",\"InstantGamesSDKMessages\",\"fbinstant/common/errorCode\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/apiError\",\"fbinstant/releases/5.0/internalStates\",\"fbinstant/releases/5.0/logger\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){\"use strict\";__p&&__p();var p=64,q=2048;function r(s){var t=s.id,u=s.contextID,v=s.status;if(!t||!u||!v)throw new m({code:k.UNKNOWN,message:\"Context activity store has an invalid configuration\"});this.$ActivityStore1=s;this.$ActivityStore1.name=this.$ActivityStore1.name!=null?this.$ActivityStore1.name:null;this.$ActivityStore2=false}r.prototype.getID=function(){o.logAPICall(\"activityStore_getID\");return this.$ActivityStore1.id};r.prototype.getContextID=function(){o.logAPICall(\"activityStore_getContextID\");return this.$ActivityStore1.contextID};r.prototype.getName=function(){o.logAPICall(\"activityStore_getName\");return this.$ActivityStore1.name};r.prototype.getStatus=function(){o.logAPICall(\"activityStore_getStatus\");return this.$ActivityStore1.status};r.prototype.endAsync=function(){__p&&__p();var s=\"activityStore_endAsync\";o.logBeginAsync(s);var t=this.$ActivityStore3().then(function(){return n.getMessageSender().sendAsync(j.CONTEXT_MATCH_END_ASYNC,{contextID:this.$ActivityStore1.contextID,matchID:this.$ActivityStore1.id}).then(function(u){return this.$ActivityStore4().then(function(){return u})}.bind(this))[\"catch\"](function(u){return this.$ActivityStore4().then(function(){throw u})}.bind(this))}.bind(this)).then(function(u){this.$ActivityStore1=u;return this}.bind(this));return o.logAsyncResult(t,s)};r.prototype.getDataAsync=function(s){var t=\"activityStore_getDataAsync\";o.logBeginAsync(t);var u=l.validate(s,l.array().schemaType(l.string())).then(function(){return n.getMessageSender().sendAsync(j.CONTEXT_MATCH_DATA_FETCH_ASYNC,{contextID:this.$ActivityStore1.contextID,keys:s,matchID:this.$ActivityStore1.id})}.bind(this)).then(this.$ActivityStore5);return o.logAsyncResult(u,t)};r.prototype.saveDataAsync=function(s){__p&&__p();var t=\"activityStore_saveDataAsync\";o.logBeginAsync(t);var u=this.$ActivityStore3().then(function(){return l.validate(s,l.object()).then(this.$ActivityStore6).then(function(v){return n.getMessageSender().sendAsync(j.CONTEXT_MATCH_DATA_SAVE_ASYNC,{contextID:this.$ActivityStore1.contextID,matchID:this.$ActivityStore1.id,data:v})}.bind(this)).then(function(){return this.$ActivityStore4().then(function(){return})}.bind(this))[\"catch\"](function(v){return this.$ActivityStore4().then(function(){throw v})}.bind(this))}.bind(this));return o.logAsyncResult(u,t)};r.prototype.incrementDataAsync=function(s){__p&&__p();var t=\"activityStore_incrementDataAsync\";o.logBeginAsync(t);var u=l.validate(s,l.object()).then(function(){for(var v in s)if(!Number.isInteger(s[v]))return h.reject(new m({code:k.INVALID_PARAM,message:'Provided key \"'+v+'\" contained a non-integer value: '+String(s[v])}));return h.resolve(JSON.stringify(s))}).then(function(){return this.$ActivityStore3()}.bind(this)).then(function(){return n.getMessageSender().sendAsync(j.CONTEXT_MATCH_DATA_INC_ASYNC,{contextID:this.$ActivityStore1.contextID,data:s,keys:Object.keys(s),matchID:this.$ActivityStore1.id}).then(function(v){return this.$ActivityStore4().then(function(){return v})}.bind(this))[\"catch\"](function(v){return this.$ActivityStore4().then(function(){throw v})}.bind(this))}.bind(this)).then(this.$ActivityStore5);return o.logAsyncResult(u,t)};r.prototype.$ActivityStore3=function(){if(this.$ActivityStore2)return h.reject(new m({code:k.PENDING_REQUEST,message:\"Cannot mutate a store that has a pending mutation.\"}));if(this.getStatus()===i.ENDED)return h.reject(new m({code:k.INVALID_OPERATION,message:\"Cannot mutate a store that has ended.\"}));if(n.getContext().getID()!==this.$ActivityStore1.contextID)return h.reject(new m({code:k.INVALID_PARAM,message:\"Cannot mutate a store in a context other than the current one.\"}));this.$ActivityStore2=true;return h.resolve()};r.prototype.$ActivityStore4=function(){this.$ActivityStore2=false;return h.resolve()};r.prototype.$ActivityStore6=function(s){__p&&__p();var t={};for(var u in s){if(new Blob([u]).size>p)return h.reject(new m({code:k.INVALID_PARAM,message:'Key \"'+u+'\" in provided data was greater than '+String(p)+\" byte limit\"}));var v=s[u],w=JSON.stringify(v);if(new Blob([w]).size>q)return h.reject(new m({code:k.INVALID_PARAM,message:'Value \"'+w+'\" in provided data was greater than '+String(q)+\" byte limit\"}));t[u]=w}return h.resolve(JSON.stringify(t))};r.prototype.$ActivityStore5=function(s){var t=JSON.parse(s),u={};for(var v in t){var w=t[v],x=JSON.parse(w);u[v]=x}return h.resolve(u)};f.exports=r}),null);\n__d(\"fbinstant/releases/5.0/connectedPlayers\",[\"InstantGamesSDKMessages\",\"fbinstant/releases/5.0/internalStates\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();function j(l){this.$ConnectedPlayer1=l}j.prototype.getID=function(){return this.$ConnectedPlayer1.id};j.prototype.getName=function(){return this.$ConnectedPlayer1.name||null};j.prototype.getPhoto=function(){return this.$ConnectedPlayer1.photo||null};var k={fetchAsync:function l(){return i.getMessageSender().sendAsync(h.GET_CONNECTED_PLAYERS_ASYNC,{}).then(function(m){return m.map(function(n){return new j(n)})})},ConnectedPlayer:j};f.exports=k}),null);\n__d(\"fbinstant/releases/5.0/contextPlayers\",[\"InstantGamesSDKMessages\",\"fbinstant/releases/5.0/internalStates\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();function j(l){this.$ContextPlayer1=l}j.prototype.getID=function(){return this.$ContextPlayer1.id};j.prototype.getName=function(){return this.$ContextPlayer1.name||null};j.prototype.getPhoto=function(){return this.$ContextPlayer1.photo||null};var k={fetchAsync:function l(){return i.getMessageSender().sendAsync(h.CONTEXT_PLAYERS_FETCH_ASYNC,{}).then(function(m){return m.map(function(n){return new j(n)})})},ContextPlayer:j};f.exports=k}),null);\n__d(\"fbinstant/releases/5.0/context\",[\"Promise\",\"InstantGamesChallengePickerFilter\",\"InstantGamesContextMatchStatus\",\"InstantGamesSDKMessages\",\"Set\",\"fbinstant/common/errorCode\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/activityStore\",\"fbinstant/releases/5.0/apiError\",\"fbinstant/releases/5.0/connectedPlayers\",\"fbinstant/releases/5.0/contextPlayers\",\"fbinstant/releases/5.0/internalStates\",\"fbinstant/releases/5.0/logger\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){\"use strict\";__p&&__p();var u={getID:function v(){t.logAPICall(\"context_getID\");return s.getContext().getID()},getType:function v(){t.logAPICall(\"context_getType\");return s.getContext().getType()},isSizeBetween:function v(w,x){__p&&__p();t.logAPICall(\"context_isSizeBetween\");var y=s.getContext().getContextSizeResponse();if(y)return y;var z=s.getContext().getSize();if(w!==null&&!Number.isInteger(w)||x!==null&&!Number.isInteger(x)||z==null)return null;var A=false;if((!w||z>=w)&&(!x||z<=x))A=true;var B={answer:A,minSize:w,maxSize:x};s.getContext().setContextSizeResponse(B);return B},switchAsync:function v(w){__p&&__p();var x=\"context_switchAsync\";t.logBeginAsync(x);if(w===s.getContext().getID()){t.logReject(x,m.SAME_CONTEXT);return h.reject(new p({code:m.SAME_CONTEXT,message:\"Must specify a context other than the current one.\"}))}var y=n.validate(w,n.string()).then(function(){return s.getMessageSender().sendAsync(k.CONTEXT_SWITCH_ASYNC,{id:w})}).then(function(z){s.updateContext(z);return});return t.logAsyncResult(y,x)},chooseAsync:function v(w){__p&&__p();var x=\"context_chooseAsync\";t.logBeginAsync(x);var y=w||{};y.filters=y.filters||[];y.maxSize=y.maxSize||null;y.minSize=y.minSize||null;if(y.maxSize&&y.maxSize<2){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:\"The maximum context size must be at least 2\"}))}else if(y.minSize&&y.minSize<2){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:\"The minimum context size must be at least 2\"}))}else if(y.maxSize&&y.minSize&&y.minSize>y.maxSize){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:\"The min size cannot be greater than the max size\"}))}for(var z=y.filters,A=Array.isArray(z),B=0,z=A?z:z[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var C;if(A){if(B>=z.length)break;C=z[B++]}else{B=z.next();if(B.done)break;C=B.value}var D=C;if(!Object.prototype.hasOwnProperty.call(i,D)){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:'Filter \"'+D+'\" is not supported'}))}}var E=n.object().keys({filters:n.array().schemaType(n.string()),maxSize:n.number().optional(),minSize:n.number().optional()}),F=n.validate(y,E).then(function(){return s.getMessageSender().sendAsync(k.CONTEXT_CHOOSE_ASYNC,y)}).then(function(G){s.updateContext(G);return});return t.logAsyncResult(F,x)},createAsync:function v(w){__p&&__p();var x=\"context_createAsync\";t.logBeginAsync(x);var y=[w];return n.validate(y,n.array().schemaType(n.string()).length(1)).then(function(){__p&&__p();var z=y.indexOf(s.getPlayerID()||\"\");if(z>-1)y.splice(z,1);if(y.length===0){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:\"At least one player id besides the current player'smust be provided.\"}))}var A=s.getConnectedPlayersPromise();if(A)return A;var B=q.fetchAsync();s.setConnectedPlayersPromise(B);return B}).then(function(z){__p&&__p();var A=new l(z.map(function(G){return G.getID()}));for(var B=y,C=Array.isArray(B),D=0,B=C?B:B[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var E;if(C){if(D>=B.length)break;E=B[D++]}else{D=B.next();if(D.done)break;E=D.value}var F=E;if(!A.has(F)){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:\"Provided ID \"+String(F)+\" is not a connected player of the current player.\"}))}}return s.getMessageSender().sendAsync(k.CONTEXT_CREATE_ASYNC,{playerIDs:y})}).then(function(z){s.updateContext(z);t.logResolve(x);return})[\"catch\"](function(z){t.logReject(x);throw z})},createStoreAsync:function v(w){__p&&__p();var x=\"context_createStoreAsync\";t.logBeginAsync(x);if(s.getContext().getID()===null){t.logReject(x,m.INVALID_OPERATION);return h.reject(new p({code:m.INVALID_OPERATION,message:\"Cannot create a new activity store in a solo context\"}))}return n.validate(w,n.string().optional()).then(function(){return s.getMessageSender().sendAsync(k.CONTEXT_MATCH_CREATE_ASYNC,{name:w||null})}).then(function(y){return new o(y)}).then(function(y){t.logResolve(x);return y})[\"catch\"](function(y){t.logReject(x);throw y})},getStoresAsync:function v(w){__p&&__p();var x=\"context_getStoresAsync\";t.logBeginAsync(x);var y={};y.contextID=w&&w.contextID||s.getContext().getID()||null;y.matches=w&&w.stores||null;y.status=w&&w.status||null;if(y.status!==null&&!Object.prototype.hasOwnProperty.call(j,y.status)){t.logReject(x,m.INVALID_PARAM);return h.reject(new p({code:m.INVALID_PARAM,message:'Value provided for property \"status\" was not a valid option'}))}var z=n.object().keys({contextID:n.string(),matches:n.array().optional().schemaType(n.string()),status:n.string().optional()});return n.validate(y,z).then(function(){return s.getMessageSender().sendAsync(k.CONTEXT_MATCH_FETCH_ASYNC,y)}).then(function(A){if(!A||!Array.isArray(A)){t.logReject(x,m.UNKNOWN);return h.reject(new p({code:m.UNKNOWN,message:\"Response data was invalid.\"}))}return A.map(function(B){return new o(B)})}).then(function(A){t.logResolve(x);return A})[\"catch\"](function(A){t.logReject(x);throw A})},getPlayersAsync:function v(){__p&&__p();var w=\"context_fetchPlayers\",x=s.getContextPlayersPromise();if(x)return x;t.logBeginAsync(w);if(s.getContext().getID()===null){t.logReject(w,m.INVALID_OPERATION);return h.reject(new p({code:m.INVALID_OPERATION,message:\"Cannot get context players in a solo context\"}))}var y=r.fetchAsync().then(function(z){t.logResolve(w);return z})[\"catch\"](function(z){t.logReject(w);s.setConnectedPlayersPromise(null);throw z});s.setContextPlayersPromise(y);return y}};f.exports=u}),null);\n__d(\"InstantGameSDKCustomUpdateNotificationType\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({PUSH:\"PUSH\",NO_PUSH:\"NO_PUSH\"})}),null);\n__d(\"InstantGameSDKEndAction\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({SCORE:\"SCORE\",CUSTOM:\"CUSTOM\",NONE:\"NONE\"})}),null);\n__d(\"InstantGamesCustomUpdateDeliveryPolicy\",[],(function a(b,c,d,e,f,g){f.exports={IMMEDIATE:\"IMMEDIATE\",LAST:\"LAST\",IMMEDIATE_CLEAR:\"IMMEDIATE_CLEAR\"}}),null);\n__d(\"fbinstant/releases/5.0/endGamePayload\",[\"Promise\",\"InstantGamesCustomUpdateDeliveryPolicy\",\"InstantGameSDKCustomUpdateNotificationType\",\"InstantGameSDKEndAction\",\"fbinstant/common/errorCode\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/apiError\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){\"use strict\";__p&&__p();o.prototype.format=function(p){if(!p||!(p instanceof Object)||!p.action||p.action!==k.CUSTOM)return h.reject(new n({code:l.INVALID_PARAM,message:'Update action property must be \"CUSTOM\"'}));return this.$EndGamePayload1(p)};o.prototype.$EndGamePayload1=function(p){var q=p.strategy&&p.strategy in i?p.strategy:i.IMMEDIATE,r=p.notification&&p.notification in j?p.notification:j.NO_PUSH,s=babelHelpers[\"extends\"]({},p,{strategy:q,notification:r}),t=m.object().keys({action:m.string(),template:m.string(),cta:m.union([m.string(),m.object()]).optional(),image:m.string(),text:m.union([m.string(),m.object()]),data:m.object().optional().maxSize(1e3),strategy:m.string(),notification:m.string()});return this.$EndGamePayload2(s,t,[\"action\",\"cta\",\"image\",\"text\",\"data\",\"strategy\"],[\"data\"])};o.prototype.$EndGamePayload2=function(p,q,r){var s=arguments.length<=3||arguments[3]===undefined?[]:arguments[3];return m.validate(p,q).then(function(t){return h.resolve(this.$EndGamePayload3(t,r,s))}.bind(this))};o.prototype.$EndGamePayload3=function(p,q){__p&&__p();var r=arguments.length<=2||arguments[2]===undefined?[]:arguments[2],s=this.$EndGamePayload4(p),t=babelHelpers[\"extends\"]({},p,s),u={};for(var v in t)if(r.indexOf(v)!==-1)try{t[v]=JSON.stringify(t[v])}catch(w){}for(var x in t)if(q.indexOf(x)===-1){u[x]=t[x];delete t[x]}t.extra=JSON.stringify(u);return t};o.prototype.$EndGamePayload4=function(p){__p&&__p();var q={},r=p.text,s=p.cta;if(typeof r!==\"string\"){q.text_localizations=r.localizations;p.text=r[\"default\"]}if(s!=null&&typeof s!==\"string\"){q.cta_localizations=s.localizations;p.cta=s[\"default\"]}return q};function o(){}f.exports=new o()}),null);\n__d(\"InstantGamesHeartbeatAction\",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({START:\"start\",UPDATE:\"update\",END:\"end\"})}),null);\n__d(\"fbinstant/releases/5.0/heartbeat\",[\"InstantGamesHeartbeatAction\",\"InstantGamesPassThroughRequestType\",\"fbinstant/releases/5.0/internalStates\"],(function a(b,c,d,e,f,g,h,i,j){\"use strict\";__p&&__p();var k=6e4,l={_heartbeatInterval:null,startHeartbeat:function m(){if(this._heartbeatInterval)this.stopHeartbeat();this.sendHeartbeat(h.START);this._heartbeatInterval=setInterval(function(){this.sendHeartbeat(h.UPDATE)}.bind(this),k)},stopHeartbeat:function m(){clearInterval(this._heartbeatInterval);this._heartbeatInterval=null;this.sendHeartbeat(h.END)},sendHeartbeat:function m(n){j.getMessageSender().sendPassThroughAsync(i.HEARTBEAT,{action:n,contextID:j.getContext().getID()})}};f.exports=l}),null);\n__d(\"fbinstant/releases/5.0/messageConfig\",[],(function a(b,c,d,e,f,g){\"use strict\";var h={getConfig:function i(){if(window.QuicksilverAndroid)return{sender:window.QuicksilverAndroid,source:\"Android\"};else if(window.webkit&&window.webkit.messageHandlers)return{sender:window.webkit.messageHandlers.quicksilver||parent,source:\"iOS\"};var j=new RegExp(\"[?&]source(=([^&#]*)|&|#|$)\",\"i\"),k=j.exec(window.location.href);return{sender:parent,source:k&&k[2]&&decodeURIComponent(k[2].replace(/\\+/g,\" \"))}}};f.exports=h}),null);\n__d(\"fbinstant/releases/5.0/messageReceiver\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();function h(){this.$MessageReceiver1=null}h.prototype.$MessageReceiver2=function(i){if(!i.data||!i.data.source)return;var j=i.data.type;if(!j)return;var k=this.$MessageReceiver1&&this.$MessageReceiver1[j];if(!k)return;k(i.data.content)};h.prototype.init=function(){this.$MessageReceiver1={};window.addEventListener(\"message\",this.$MessageReceiver2.bind(this))};h.prototype.registerMessageHandler=function(i,j,k){var l=this.$MessageReceiver1;if(!l)return;if(k)l[i]=j.triggerSubscribers.bind(j,k);else l[i]=j.triggerSubscribers.bind(j)};f.exports=new h()}),null);\n__d(\"fbinstant/releases/5.0/auth\",[\"InstantGamesSDKMessages\",\"fbinstant/releases/5.0/internalStates\"],(function a(b,c,d,e,f,g,h,i){\"use strict\";__p&&__p();function j(k){this.$SignedPlayerInfo1=k}j.prototype.getPlayerID=function(){return this.$SignedPlayerInfo1.playerID};j.prototype.getSignature=function(){return this.$SignedPlayerInfo1.signature};f.exports={SignedPlayerInfo:j,getSignedPlayerInfoAsync:function k(l){return i.getMessageSender().sendAsync(h.GET_SIGNED_PLAYER_INFO_ASYNC,{requestPayload:l||null}).then(function(m){return new j(m)})}}}),null);\n__d(\"fbinstant/releases/5.0/playerStats\",[\"Promise\",\"InstantGamesPassThroughRequestType\",\"fbinstant/common/errorCode\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/apiError\",\"fbinstant/releases/5.0/internalStates\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){\"use strict\";__p&&__p();function n(){this.$PlayerStats1=false}n.prototype.getAsync=function(o){if(!o)return m.getMessageSender().sendPassThroughAsync(i.GET_PLAYER_STATS,{});var p=k.array().schemaType(k.string());return k.validate(o,p).then(function(){this.$PlayerStats2();return m.getMessageSender().sendPassThroughAsync(i.GET_PLAYER_STATS,{stat_keys:o})}.bind(this))};n.prototype.setAsync=function(o){return k.validate(o,k.object()).then(function(p){return h.all(Object.keys(o).map(function(q){return k.validate(o[q],k.integer())}))}).then(function(p){this.$PlayerStats3();return m.getMessageSender().sendPassThroughAsync(i.SET_PLAYER_STATS,{stats:o}).then(function(q){this.$PlayerStats4();return q}.bind(this))[\"catch\"](function(q){this.$PlayerStats4();throw q}.bind(this))}.bind(this))};n.prototype.incrementAsync=function(o){return k.validate(o,k.object()).then(function(p){return h.all(Object.keys(o).map(function(q){return k.validate(o[q],k.integer())}))}).then(function(p){this.$PlayerStats3();return m.getMessageSender().sendPassThroughAsync(i.INCREMENT_PLAYER_STATS,{increments:o}).then(function(q){this.$PlayerStats4();return q}.bind(this))[\"catch\"](function(q){this.$PlayerStats4();throw q}.bind(this))}.bind(this))};n.prototype.$PlayerStats2=function(){if(this.$PlayerStats1)throw new l({code:j.PENDING_REQUEST,message:\"A set or increment stats request is pending, please wait for it to resolve or reject before making another stats request.\"})};n.prototype.$PlayerStats3=function(){this.$PlayerStats2();this.$PlayerStats1=true};n.prototype.$PlayerStats4=function(){this.$PlayerStats1=false};f.exports=new n()}),null);\n__d(\"fbinstant/releases/5.0/player\",[\"Promise\",\"InstantGamesGameState\",\"InstantGamesSDKMessages\",\"fbinstant/common/errorCode\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/apiError\",\"fbinstant/releases/5.0/auth\",\"fbinstant/releases/5.0/connectedPlayers\",\"fbinstant/releases/5.0/internalStates\",\"fbinstant/releases/5.0/logger\",\"fbinstant/releases/5.0/playerStats\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){\"use strict\";__p&&__p();var s={getID:function t(){q.logAPICall(\"player_getID\");return p.getPlayerID()},getSignedPlayerInfoAsync:function t(u){var v=\"player_getSignedPlayerInfoAsync\";q.logBeginAsync(v);var w=l.string().optional(),x=l.validate(u,w).then(function(){return n.getSignedPlayerInfoAsync(u)});return q.logAsyncResult(x,v)},getName:function t(){q.logAPICall(\"player_getName\");if(p.getGameState()!==i.PLAYING)p.getAnalytics().logEvent(\"_ig_pre_na\");return p.getPlayerName()},getPhoto:function t(){q.logAPICall(\"player_getPhoto\");if(p.getGameState()!==i.PLAYING)p.getAnalytics().logEvent(\"_ig_pre_ph\");return p.getPlayerPhoto()},getDataAsync:function t(u){var v=\"player_getDataAsync\";q.logBeginAsync(v);var w=l.array().schemaType(l.string()),x=l.validate(u,w).then(function(){return p.getMessageSender().sendAsync(j.GET_PLAYER_DATA_ASYNC,{keys:u})});return q.logAsyncResult(x,v)},setDataAsync:function t(u){__p&&__p();var v=\"player_setDataAsync\";q.logBeginAsync(v);var w=function w(z){__p&&__p();for(var A=Object.keys(z),B=Array.isArray(A),C=0,A=B?A:A[typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\"]();;){var D;if(B){if(C>=A.length)break;D=A[C++]}else{C=A.next();if(C.done)break;D=C.value}var E=D,F=z[E];if(typeof F===\"function\")return true}return false},x=function x(z){try{JSON.stringify(z);return false}catch(A){return true}},y=l.validate(u,l.object()).then(function(z){if(w(z)||x(z)){q.logReject(v,k.INVALID_PARAM);return h.reject(new m({code:k.INVALID_PARAM,message:\"Object is not serializable\"}))}return z}).then(function(z){return p.getMessageSender().sendAsync(j.SET_PLAYER_DATA_ASYNC,{data:u})});return q.logAsyncResult(y,v).then(function(){})},flushDataAsync:function t(){var u=\"player_flushDataAsync\";q.logBeginAsync(u);var v=p.getMessageSender().sendAsync(j.FLUSH_PLAYER_DATA_ASYNC,null);return q.logAsyncResult(v,u).then(function(){})},getStatsAsync:function t(u){var v=\"player_getStatsAsync\";q.logBeginAsync(v);var w=r.getAsync(u);return q.logAsyncResult(w,v)},setStatsAsync:function t(u){var v=\"player_setStatsAsync\";q.logBeginAsync(v);var w=r.setAsync(u);return q.logAsyncResult(w,v).then(function(){})},incrementStatsAsync:function t(u){var v=\"player_incrementStatsAsync\";q.logBeginAsync(v);var w=r.incrementAsync(u);return q.logAsyncResult(w,v)},getConnectedPlayersAsync:function t(){var u=\"player_getConnectedPlayers\",v=p.getConnectedPlayersPromise();if(v)return v;q.logBeginAsync(u);var w=q.logAsyncResult(o.fetchAsync(),u)[\"catch\"](function(x){p.setConnectedPlayersPromise(null);throw x});p.setConnectedPlayersPromise(w);return w}};f.exports=s}),null);\n__d(\"ES6Array\",[],(function a(b,c,d,e,f,g){\"use strict\";__p&&__p();var h={from:function i(j){__p&&__p();if(j==null)throw new TypeError(\"Object is null or undefined\");var k=arguments[1],l=arguments[2],m=this,n=Object(j),o=typeof Symbol===\"function\"?typeof Symbol===\"function\"?Symbol.iterator:\"@@iterator\":\"@@iterator\",p=typeof k===\"function\",q=typeof n[o]===\"function\",r=0,s=void 0,t=void 0;if(q){s=typeof m===\"function\"?new m():[];var u=n[o](),v=void 0;while(!(v=u.next()).done){t=v.value;if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}var w=n.length;if(isNaN(w)||w<0)w=0;s=typeof m===\"function\"?new m(w):new Array(w);while(r<w){t=n[r];if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}};f.exports=h}),null);\n__d(\"fbinstant/releases/5.0/supportedFunctions\",[\"ES6Array\",\"InstantGamesSDKFeatures\",\"InstantGamesSDKMessages\",\"Set\",\"fbinstant/common/supportedFeaturesManager\",\"fbinstant/common/supportedMessagesManager\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){\"use strict\";__p&&__p();var n=new k([\"getLocale\",\"getPlatform\",\"getSDKVersion\",\"getSupportedAPIs\",\"getEntryPointData\",\"player.getID\",\"player.getName\",\"player.getPhoto\",\"context.getID\",\"context.getType\",\"context.isSizeBetween\",\"logEvent\",\"onPause\"]),o={initializeAsync:j.INITIALIZE_ASYNC,setLoadingProgress:j.ON_PROGRESS_LOAD,setSessionData:j.SET_SESSION_DATA,startGameAsync:j.ON_GAME_READY,\"player.flushDataAsync\":j.FLUSH_PLAYER_DATA_ASYNC,\"player.getDataAsync\":j.GET_PLAYER_DATA_ASYNC,\"player.setDataAsync\":j.SET_PLAYER_DATA_ASYNC,\"player.getConnectedPlayersAsync\":j.GET_CONNECTED_PLAYERS_ASYNC,\"player.getSignedPlayerInfoAsync\":j.GET_SIGNED_PLAYER_INFO_ASYNC,\"context.switchAsync\":j.CONTEXT_SWITCH_ASYNC,\"context.chooseAsync\":j.CONTEXT_CHOOSE_ASYNC,\"context.createAsync\":j.CONTEXT_CREATE_ASYNC,\"context.getPlayersAsync\":j.CONTEXT_PLAYERS_FETCH_ASYNC,getInterstitialAdAsync:j.GET_INTERSTITIAL_AD_ASYNC,getRewardedVideoAsync:j.GET_REWARDED_VIDEO_ASYNC,shareAsync:j.SHARE_ASYNC,quit:j.QUIT},p=new k([\"getEntryPointAsync\",\"player.getStatsAsync\",\"player.setStatsAsync\",\"player.incrementStatsAsync\"]),q={updateAsync:function w(){return l.isSupported(i.FLEXIBLE)}};function r(){var w=s(),x=t(),y=u();return h.from(n).concat(w).concat(x).concat(y)}function s(){var w=new k();for(var x in o){var y=o[x];if(m.isSupported(y))w.add(x)}return h.from(w)}function t(){return m.isSupported(j.SEND_PASS_THROUGH_ASYNC)?h.from(p):[]}function u(){var w=new k();for(var x in q){var y=q[x]();if(y)w.add(x)}return h.from(w)}var v={getSupported:r};f.exports=v}),null);\n__d(\"fbinstant/releases/5.0\",[\"Promise\",\"InstantGamesGameState\",\"InstantGamesPassThroughRequestType\",\"InstantGamesSDKFeatures\",\"InstantGamesSDKMessages\",\"fbinstant/common/consoleLogger\",\"fbinstant/common/errorCode\",\"fbinstant/common/performanceTracker\",\"fbinstant/common/platform\",\"fbinstant/common/supportedFeaturesManager\",\"fbinstant/common/validator\",\"fbinstant/releases/5.0/ads\",\"fbinstant/releases/5.0/apiError\",\"fbinstant/releases/5.0/context\",\"fbinstant/releases/5.0/endGamePayload\",\"fbinstant/releases/5.0/heartbeat\",\"fbinstant/releases/5.0/internalStates\",\"fbinstant/releases/5.0/logger\",\"fbinstant/releases/5.0/messageConfig\",\"fbinstant/releases/5.0/messageReceiver\",\"fbinstant/releases/5.0/player\",\"fbinstant/releases/5.0/supportedFunctions\"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){\"use strict\";__p&&__p();var D={getLocale:function E(){y.logAPICall(\"getLocale\");return x.getLocale()},getPlatform:function E(){y.logAPICall(\"getPlatform\");return x.getPlatform()},getSDKVersion:function E(){y.logAPICall(\"getSDKVersion\");return x.getSdkVersion()},initializeAsync:function E(){__p&&__p();var F=\"initializeAsync\";if(x.isInitialized())return h.reject(new t({code:n.INVALID_OPERATION,message:\"Game has already been initialized.\"}));var G=this;return new h(function(H,I){__p&&__p();y.logBeginAsync(F);var J=x.getMessageSender();J.initialize(z.getConfig());J.send(l.ON_BEGIN_LOAD,100);m.init(function(L){J.send(l.ON_CONSOLE,L)});A.init();A.registerMessageHandler(l.RESTART,x.getRestartEvent(),null);A.registerMessageHandler(l.RESOLVE_PROMISE,J.getResolvePromiseEvent(),null);A.registerMessageHandler(l.REJECT_PROMISE,J.getRejectPromiseEvent(),null);A.registerMessageHandler(l.PAUSE,x.getPauseEvent(),null);A.registerMessageHandler(l.ANALYTICS_LOG_EVENT,x.getAnalyticsLogEvent(),null);x.getGameStartEvent().on(function(){x.setGameState(i.PLAYING)});A.registerMessageHandler(l.GAME_START,x.getGameStartEvent(),null);A.registerMessageHandler(l.PAYMENTS_INITIALIZED,x.getPaymentsState().getPaymentsInitializedEvent(),null);G._populatePlatform();var K=J.sendAsync(l.INITIALIZE_ASYNC,{sdkVersion:G.sdkVersion});y.logAsyncResult(K,F).then(function(L){if(!x.isInitialized())x.initialize(L);H()})[\"catch\"](function(L){I(L)}).done()})},_populatePlatform:function E(){if(window.IsQuicksilverReactNativeIOS||window.webkit)x.setPlatform(p.IOS);else if(window.IsQuicksilverReactNativeAndroid||window.QuicksilverAndroid)x.setPlatform(p.ANDROID);else if(window.IsMobileWeb)x.setPlatform(p.MOBILE_WEB);else x.setPlatform(p.WEB)},setLoadingProgress:function E(F){if(F>=0&&F<=100&&F>x.getLoadingProgress()){x.getMessageSender().send(l.ON_PROGRESS_LOAD,F);x.setLoadingProgress(F)}else{var G=\"FbInstant::setLoadingProgress(\",H=\") is invalid. The progress must be\";if(!(F<0||F>100))F<=x.getLoadingProgress()}},getSupportedAPIs:function E(){return C.getSupported()},getEntryPointData:function E(){y.logAPICall(\"getEntryPointData\");return x.getEntryPointData()},getEntryPointAsync:function E(){var F=\"getEntryPointAsync\";y.logBeginAsync(F);var G=x.getEntryPoint();if(G!=null)return h.resolve(G);var H=x.getMessageSender().sendPassThroughAsync(j.GET_ENTRY_POINT,{source:x.getRawSource()});return y.logAsyncResult(H,F).then(function(I){x.setEntryPoint(I.entry_point);return h.resolve(I.entry_point)})},setSessionData:function E(F){y.logAPICall(\"setSessionData\");var G=F;r.validate(G,r.object().maxSize(1e3)).done(function(){x.getMessageSender().send(l.SET_SESSION_DATA,JSON.stringify(G))})},startGameAsync:function E(){__p&&__p();var F=\"startGameAsync\";return new h(function(G,H){__p&&__p();var I,J=x.getAnalytics();y.logBeginAsync(F);if(x.getGameState()===i.PLAYING){y.logResolve(F);G()}else(function(){__p&&__p();var K=x.getMessageSender();o.init(K);K.send(l.ON_GAME_READY);var L=function L(M){__p&&__p();x.getGameStartEvent().off(L);x.setGameState(i.PLAYING);J.logActive();if(M)x.updateContext(M);if(!q.isSupported(k.FLEXIBLE)){y.logReject(F,n.CLIENT_UNSUPPORTED_OPERATION);H(new t({code:n.CLIENT_UNSUPPORTED_OPERATION,message:\"Client does not support the flexible platform.\"}));return}y.logResolve(F);G()};x.getGameStartEvent().on(L)})();w.startHeartbeat()})},player:B,context:u,shareAsync:function E(F){var G=\"shareAsync\",H=r.object().keys({intent:r.string(),image:r.string(),text:r.string(),data:r.object().optional().maxSize(1e3)});y.logBeginAsync(G);var I=r.validate(F,H).then(function(){var J=babelHelpers[\"extends\"]({},F);if(F.data)J.data=JSON.stringify(F.data);return x.getMessageSender().sendAsync(l.SHARE_ASYNC,J)});return y.logAsyncResult(I,G).then(function(){})},sendImageAsync:function E(F,G){var H=\"sendImageAsync\",I=r.object().keys({image:r.string(),data:r.object().optional().maxSize(1e3)}),J={image:F,data:G};y.logBeginAsync(H);var K=r.validate(J,I).then(function(){var L={};L.image=J.image;if(J.data)L.data=JSON.stringify(J.data);return x.getMessageSender().sendAsync(l.MEDIA_SEND_IMAGE_ASYNC,L)});return y.logAsyncResult(K,H).then(function(){})},updateAsync:function E(F){__p&&__p();var G=\"updateAsync\";return new h(function(H,I){__p&&__p();v.format(F).then(function(J){__p&&__p();y.logBeginAsync(G);x.getMessageSender().send(l.ON_END_GAME,J);x.getRestartEvent().on(function(K){__p&&__p();if(K&&K.error){y.logReject(G);I(new t({message:K.error.message}));return}if(K&&K.contextType)x.updateContext(K);y.logResolve(G);H();x.getRestartEvent().unbind()})})[\"catch\"](function(J){I(J)})})},quit:function E(){y.logAPICall(\"quit\");x.getMessageSender().send(l.QUIT,{});w.stopHeartbeat()},logEvent:function E(F,G,H){var I=x.getAnalytics().logEvent(F,G,H);if(!I)return null;return new t({code:I.code,message:I.message})},onPause:function E(F){y.logAPICall(\"onPause\");x.getPauseEvent().on(F)},getInterstitialAdAsync:function E(F){var G=\"getInterstitialAdAsync\";y.logBeginAsync(G);var H=r.string(),I=r.validate(F,H).then(function(){return s.getInterstitialAdAsync(F)});return y.logAsyncResult(I,G)},getRewardedVideoAsync:function E(F){var G=\"getRewardedVideoAsync\";y.logBeginAsync(G);var H=r.string(),I=r.validate(F,H).then(function(){return s.getRewardedVideoAsync(F)});return y.logAsyncResult(I,G)},matchPlayerAsync:function E(F){__p&&__p();var G=\"matchPlayerAsync\",H=x.getAnalytics();H.logBeginAsyncAPICall(G);var I={};I.matchTag=F||null;var J=/^[a-zA-Z0-9_]+$/;if(I.matchTag&&I.matchTag.search(J)===-1)return h.reject(new t({code:n.INVALID_PARAM,message:\"Match Tag must only include letters, numbers and underscores.\"}));if(I.matchTag&&I.matchTag.length>100)return h.reject(new t({code:n.INVALID_PARAM,message:\"Match Tag must be 100 characters or less.\"}));var K=r.object().keys({matchTag:r.string().optional()});return r.validate(I,K).then(function(L){return x.getMessageSender().sendPassThroughAsync(j.CAN_PLAYER_MATCH,{contextID:x.getContext().getID()})}).then(function(L){if(!L.can_match)throw new t({code:n.INVALID_OPERATION,message:\"The player is not currently eligible to match.\"});I.dialogTitle=L.dialog_title;I.dialogTextLineOne=L.dialog_text_line_one;I.dialogTextLineTwo=L.dialog_text_line_two;I.dialogButtonText=L.dialog_button_text;return x.getMessageSender().sendAsync(l.MATCH_PLAYER_ASYNC,I)}).then(function(L){x.updateContext(L);H.logResolveAsyncAPICall(G);return})[\"catch\"](function(L){H.logRejectAsyncAPICall(G);throw L})},checkCanPlayerMatchAsync:function E(){var F=\"checkCanPlayerMatchAsync\",G=x.getAnalytics();G.logBeginAsyncAPICall(F);return new h(function(H,I){x.getMessageSender().sendPassThroughAsync(j.CAN_PLAYER_MATCH,{contextID:x.getContext().getID()}).then(function(J){G.logResolveAsyncAPICall(F);H(J.can_match)})[\"catch\"](function(J){G.logRejectAsyncAPICall(F);I(J)})})}};f.exports=D}),null);\n__d(\"legacy:fbinstant.5.0.all\",[\"fbinstant/releases/5.0\"],(function a(b,c,d,e,f,g){\"use strict\";window.FBInstant=c(\"fbinstant/releases/5.0\")}),3);\n    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src=\"https:\\/\\/www.facebook.com\\/\" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{\"error\":\"LOAD\", \"extra\": {\"name\":\"'+e.name+'\",\"line\":\"'+(e.lineNumber||e.line)+'\",\"script\":\"'+(e.fileName||e.sourceURL||e.script)+'\",\"stack\":\"'+(e.stackTrace||e.stack)+'\",\"revision\":\"3597473\",\"namespace\":\"FB\",\"message\":\"'+e.message+'\"}}');}"

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(4),__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util,fbuser) {
//define("user",['./../../common/util.js'],function(util) {
    //require('!style-loader!css-loader!./../../../css/wing/mobile_style.css');

    var user = {};

    /**
     * 获取登录方式
     */
    user.getLoginWay = function(){
        var data = {
            appId: __webpack_require__(0).context.appId,
            sdkVer: __webpack_require__(0).context.version,
            os: __webpack_require__(0).context.runPlatform,
            clientId: __webpack_require__(0).context.clientId,
            osign: ""
        }

        data.osign = util.sign([data.appId,__webpack_require__(0).context.appKey, data.sdkVer, data.clientId, "", ""]);
        var loginWayList =[];
        util.ajax({
            type: "POST",
            url: __webpack_require__(0).context.GHW_BKD_API+"v2/login_way.do",
            data: data,
            async: false,
            success: function (response) {
                var result = JSON.parse(response);
                if (result.code == 200) {
                    loginWayList = JSON.parse(response).data;

                    var loginWayMap={};
                    for (var i=0;i<loginWayList.length;i++){
                        loginWayMap[loginWayList[i].platform] = loginWayList[i].logoUrl;
                    }
                    __webpack_require__(0).context.loginWayMap = loginWayMap;
                    return loginWayList;
                }
                return null;
            },
            error: function (error) {
                util.log(new message("500", "get loginWay ：ERR_CONNECTION_REFUSED"))
                return null;
            }
        })
        return loginWayList;
    }

    var cacheLoginObj = {};

    user.login = function(loginObject){
        if(!__webpack_require__(0).context.loginWayMap){
            user.getLoginWay();
        }
        //通过登录选择层，进行登录
        if(typeof  loginObject === 'string'){
            if(__webpack_require__(0).context.loginWayMap.hasOwnProperty(loginObject)){
                cacheLoginObj.platform=loginObject;
            }else {
                util.log("platform error");
            }
        }else if(typeof  loginObject === 'object' && !loginObject.platform ){ //没有明确登录方式，弹出登录选择层
            cacheLoginObj=loginObject;
            renderUI();
            return;
        }else if(typeof loginObject === 'object' && loginObject.platform ){    //明确登录方式
            cacheLoginObj=loginObject;
        }else{
            receipt(cacheLoginObj.fail,new message("500","parameter error"));
            return ;
        };

        util.log("platform :"+cacheLoginObj.platform);
        switch (cacheLoginObj.platform) {
            case 'FACEBOOK':
                if(wing.facebook){
                    wing.facebook.init();
                    wing.facebook.login(function(result){
                        if(result.code==200){
                            login(result.token);
                        }
                    });
                }
                break;
            case 'GOOGLE':
                if(wing.google){
                    wing.google.init();
                    wing.google.login(function(result){
                        if(result.code==200){
                            login(result.token);
                        }
                    });
                }
                break;
            case 'GUEST':
                login("");
                break ;
            case 'APPSELF':
                login(cacheLoginObj.token || "");
                break;
            default:
                receipt(cacheLoginObj.fail,new message("500","platform is  error"));
                return
        }

    }

    //渲染UI
    function renderUI(){
        //用户根DIV
        var loginRootId = 'wing_login_root';
        if(document.getElementById(loginRootId)){
            document.getElementById(loginRootId).remove();
        }
        var node = document.createElement('div');
        node.id = loginRootId;
        var loginWayMap = __webpack_require__(0).context.loginWayMap;
        var paramValueJson = "{";
        for(var k in loginWayMap){
            paramValueJson += '"'+k+'":"'+loginWayMap[k]+'",';
        }
        if(paramValueJson.length>1){
            paramValueJson = paramValueJson.substring(0,paramValueJson.length-1);
        }
        paramValueJson +="}";
        console.log(paramValueJson)
        console.log(window.btoa(encodeURIComponent(paramValueJson)));
        var modalUrl = __webpack_require__(0).context.GHW_BKD_API+"v1/user/user_modal.do?mobile="+util.isMobileDevice()+"&pcdate="+window.btoa(encodeURIComponent(paramValueJson));
        var loginRootHtml ='<iframe id="wing_login_modal" style="height: 25rem;position: absolute;top: 0;left: 0;right: 0;bottom: 0; width: 100%; height: 100%;margin: auto;background-color: #ffffff; z-index: 99;overflow: hidden;font-size: 1rem;font-family: "Arial";color: #ffffff;" frameborder="0" scrolling="no" allowtransparency="true" data-processed="false" title="Pay with Wing SDK" name="wing_login_modal" src="'+modalUrl+'"></iframe>';
        document.body.appendChild(node);
        node.innerHTML = loginRootHtml;

        //增加监听
        window.addEventListener('message', function closeUserModal (event) {
            if(event.data){
                var resultData = JSON.parse(event.data);
                if(resultData.hasOwnProperty("user")){
                    document.getElementById(loginRootId).remove();
                    window.removeEventListener("message",closeUserModal);
                    if(resultData["user"]){
                        user.login(resultData["user"]);
                    }else {
                        receipt(cacheLoginObj.cancel);
                    }
                }
            }
        }, false);
    }


    function login(token){
        var data={
            appId:__webpack_require__(0).context.appId,
            appKey:__webpack_require__(0).context.appKey,
            bindType:2,
            sdkVer:__webpack_require__(0).context.version,
            sdkType:__webpack_require__(0).context.sdkType,
            clientId:__webpack_require__(0).context.clientId,
            runPlatform:__webpack_require__(0).context.runPlatform,
            platform:cacheLoginObj.platform,
            accessToken:token,
            ghwToken:__webpack_require__(0).context.token|| "",
            userId:__webpack_require__(0).context.userId || -1
        }
        data.osign=util.sign(data);
        data.appKey=null;
        if(data.extInfo){
            data.extInfo=cacheLoginObj.extInfo;
        }
        util.ajax({
            type:"POST",
            dataType:"json",
            url:__webpack_require__(0).context.GHW_BKD_API+"v4/init.do",
            data:data,
            success:function (response){
                var  result=JSON.parse(response);
                if(result.code==200){
                    util.log("Login successful");
                    __webpack_require__(0).context.token=result.token;
                    __webpack_require__(0).context.userId=result.userId;
                    localStorage.setItem("token",result.token) ;
                    localStorage.setItem("userId",result.userId);
                    __webpack_require__(0).context.userLogin = true;
                    util.cookie.write("wing_user_token",result.token,1)
                    util.cookie.write("wing_user_id",result.userId,1)
                    receipt(cacheLoginObj.success,result);
                }else{
                    util.log("Logon failure");
                    util.log(result);
                    receipt(cacheLoginObj.fail,result);
                }
            },
            error:function (){
                receipt(cacheLoginObj.fail,new message(500,"ERR_CONNECTION_REFUSED"));
            }
        });
    }

    function receipt (functionName,value){
        if(functionName &&  typeof functionName == 'function'){
            functionName(value);
        }else{
            util.log("回调方法  无法调用")
        }
    }

    //消息对象
    function message(code,message){
        this.code=code;
        this.message=message;
    }

    util.register("wing.user",user);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Created by zhihu on 2018/2/2.
 */
/**
 * Google 模块
 * util,ggsdk必须导入
 * 其他模块可以根据需求导入
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(13),__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util,ggsdk,gguser) {
    /**
     * 初始化Google SDK
     */
    util.register("wing.google.init",function (clientID){
        if(!clientID){
            clientID = __webpack_require__(0).context.initInfo.googleClientId;
        }
        gapi.load('auth2', function() {
            auth2 = gapi.auth2.init({
                client_id: clientID,
                cookiepolicy: 'single_host_origin',
                scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            });
            __webpack_require__(0).context.init = true;
        });
    })
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var m=this,aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},ca=function(a,b,c){ca=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return ca.apply(null,arguments)},da=function(a,
b){function c(){}c.prototype=b.prototype;a.ea=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.w=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};/*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
var p=window,t=document,ea=p.location,fa=function(){},ha=/\[native code\]/,v=function(a,b,c){return a[b]=a[b]||c},ia=function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1},ja=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b},ka=/&/g,la=/</g,ma=/>/g,na=/"/g,oa=/'/g,pa=function(a){return String(a).replace(ka,"&amp;").replace(la,"&lt;").replace(ma,"&gt;").replace(na,"&quot;").replace(oa,"&#39;")},w=function(){var a;if((a=Object.create)&&
ha.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},x=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},qa=function(a){if(ha.test(Object.keys))return Object.keys(a);var b=[],c;for(c in a)x(a,c)&&b.push(c);return b},z=function(a,b){a=a||{};for(var c in a)x(a,c)&&(b[c]=a[c])},ra=function(a){return function(){p.setTimeout(a,0)}},A=function(a,b){if(!a)throw Error(b||"");},B=v(p,"gapi",{});var C=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d.exec(a)||b.exec(a)))try{c=decodeURIComponent(a[2])}catch(e){}return c},sa=new RegExp(/^/.source+/([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source+/(\/\/[^\/?#]*)?/.source+/([^?#]*)?/.source+/(\?([^#]*))?/.source+/(#((#|[^#])*))?/.source+/$/.source),ta=/[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,ua=new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source+/%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
"g"),va=/%([a-f]|[0-9a-fA-F][a-f])/g,wa=/^(https?|ftp|file|chrome-extension):$/i,D=function(a){a=String(a);a=a.replace(ta,function(a){try{return encodeURIComponent(a)}catch(f){return encodeURIComponent(a.replace(/^[^%]+$/g,"\ufffd"))}}).replace(ua,function(a){return a.replace(/%/g,"%25")}).replace(va,function(a){return a.toUpperCase()});a=a.match(sa)||[];var b=w(),c=function(a){return a.replace(/\\/g,"%5C").replace(/\^/g,"%5E").replace(/`/g,"%60").replace(/\{/g,"%7B").replace(/\|/g,"%7C").replace(/\}/g,
"%7D")},d=!!(a[1]||"").match(wa);b.w=c((a[1]||"")+(a[2]||"")+(a[3]||(a[2]&&d?"/":"")));d=function(a){return c(a.replace(/\?/g,"%3F").replace(/#/g,"%23"))};b.query=a[5]?[d(a[5])]:[];b.g=a[7]?[d(a[7])]:[];return b},xa=function(a){return a.w+(0<a.query.length?"?"+a.query.join("&"):"")+(0<a.g.length?"#"+a.g.join("&"):"")},ya=function(a,b){var c=[];if(a)for(var d in a)if(x(a,d)&&null!=a[d]){var e=b?b(a[d]):a[d];c.push(encodeURIComponent(d)+"="+encodeURIComponent(e))}return c},za=function(a,b,c,d){a=D(a);
a.query.push.apply(a.query,ya(b,d));a.g.push.apply(a.g,ya(c,d));return xa(a)},Ba=new RegExp(/\/?\??#?/.source+"("+/[\/?#]/i.source+"|"+/[\uD800-\uDBFF]/i.source+"|"+/%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source+"|"+/%[0-9a-f]?/i.source+")$","i"),Ca=function(a,b){var c=D(b);b=c.w;c.query.length&&(b+="?"+c.query.join(""));c.g.length&&(b+="#"+c.g.join(""));var d="";2E3<b.length&&(c=b,b=b.substr(0,2E3),b=b.replace(Ba,""),d=c.substr(b.length));var e=a.createElement("div");a=a.createElement("a");
c=D(b);b=c.w;c.query.length&&(b+="?"+c.query.join(""));c.g.length&&(b+="#"+c.g.join(""));a.href=b;e.appendChild(a);e.innerHTML=e.innerHTML;b=String(e.firstChild.href);e.parentNode&&e.parentNode.removeChild(e);c=D(b+d);b=c.w;c.query.length&&(b+="?"+c.query.join(""));c.g.length&&(b+="#"+c.g.join(""));return b},Da=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var Ea=function(a,b,c,d){if(p[c+"EventListener"])p[c+"EventListener"](a,b,!1);else if(p[d+"tachEvent"])p[d+"tachEvent"]("on"+a,b)},Fa=function(){var a=t.readyState;return"complete"===a||"interactive"===a&&-1==navigator.userAgent.indexOf("MSIE")},Ia=function(a){var b=Ga;if(!Fa())try{b()}catch(c){}Ha(a)},Ha=function(a){if(Fa())a();else{var b=!1,c=function(){if(!b)return b=!0,a.apply(this,arguments)};p.addEventListener?(p.addEventListener("load",c,!1),p.addEventListener("DOMContentLoaded",c,!1)):p.attachEvent&&
(p.attachEvent("onreadystatechange",function(){Fa()&&c.apply(this,arguments)}),p.attachEvent("onload",c))}},Ja=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)},Ka={button:!0,div:!0,span:!0};var F;F=v(p,"___jsl",w());v(F,"I",0);v(F,"hel",10);var La=function(a){return F.dpo?F.h:C(a,"jsh",F.h)},Ma=function(a){var b=v(F,"sws",[]);b.push.apply(b,a)},Na=function(a){return v(F,"watt",w())[a]},Oa=function(a){var b=v(F,"PQ",[]);F.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},Pa=function(a){return v(v(F,"H",w()),a,w())};var Qa=v(F,"perf",w()),Ra=v(Qa,"g",w()),Sa=v(Qa,"i",w());v(Qa,"r",[]);w();w();
var Ta=function(a,b,c){var d=Qa.r;"function"===typeof d?d(a,b,c):d.push([a,b,c])},G=function(a,b,c){Ra[a]=!b&&Ra[a]||c||(new Date).getTime();Ta(a)},Va=function(a,b,c){b&&0<b.length&&(b=Ua(b),c&&0<c.length&&(b+="___"+Ua(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=v(Sa,"_p",w()),v(b,c,w())[a]=(new Date).getTime(),Ta(a,"_p",c))},Ua=function(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/,/g,"_")};var Wa=w(),H=[],J=function(a){throw Error("Bad hint"+(a?": "+a:""));};H.push(["jsl",function(a){for(var b in a)if(x(a,b)){var c=a[b];"object"==typeof c?F[b]=v(F,b,[]).concat(c):v(F,b,c)}if(b=a.u)a=v(F,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);var Xa=/^(\/[a-zA-Z0-9_\-]+)+$/,Ya=[/\/amp\//,/\/amp$/,/^\/amp$/],Za=/^[a-zA-Z0-9\-_\.,!]+$/,$a=/^gapi\.loaded_[0-9]+$/,ab=/^[a-zA-Z0-9,._-]+$/,eb=function(a,b,c,d){var e=a.split(";"),f=e.shift(),g=Wa[f],h=null;g?h=g(e,b,c,d):J("no hint processor for: "+f);h||J("failed to generate load url");b=h;c=b.match(bb);(d=b.match(cb))&&1===d.length&&db.test(b)&&c&&1===c.length||J("failed sanity: "+a);return h},hb=function(a,b,c,d){a=fb(a);$a.test(c)||J("invalid_callback");b=gb(b);d=d&&d.length?gb(d):null;var e=
function(a){return encodeURIComponent(a).replace(/%2C/g,",")};return[encodeURIComponent(a.pathPrefix).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.L?"/am="+e(a.L):"",a.T?"/rs="+e(a.T):"",a.V?"/t="+e(a.V):"","/cb=",e(c)].join("")},fb=function(a){"/"!==a.charAt(0)&&J("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))J("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);
break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);2==f.length&&g&&h&&(a[g]=a[g]||h)}b="/"+c.join("/");Xa.test(b)||J("invalid_prefix");c=0;for(d=Ya.length;c<d;++c)Ya[c].test(b)&&J("invalid_prefix");c=ib(a,"k",!0);d=ib(a,"am");e=ib(a,"rs");a=ib(a,"t");return{pathPrefix:b,version:c,L:d,T:e,V:a}},gb=function(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");ab.test(e)&&b.push(e)}return b.join(",")},
ib=function(a,b,c){a=a[b];!a&&c&&J("missing: "+b);if(a){if(Za.test(a))return a;J("invalid: "+b)}return null},db=/^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,cb=/\/cb=/g,bb=/\/\//g,jb=function(){var a=La(ea.href);if(!a)throw Error("Bad hint");return a};Wa.m=function(a,b,c,d){(a=a[0])||J("missing_hint");return"https://apis.google.com"+hb(a,b,c,d)};var K=decodeURI("%73cript"),kb=/^[-+_0-9\/A-Za-z]+={0,2}$/,lb=function(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>ia.call(b,e)&&c.push(e)}return c},mb=function(){var a=F.nonce;if(void 0!==a)return a&&a===String(a)&&a.match(kb)?a:F.nonce=null;var b=v(F,"us",[]);if(!b||!b.length)return F.nonce=null;for(var c=t.getElementsByTagName(K),d=0,e=c.length;d<e;++d){var f=c[d];if(f.src&&(a=String(f.nonce||f.getAttribute("nonce")||"")||null)){for(var g=0,h=b.length;g<h&&b[g]!==f.src;++g);if(g!==h&&
a&&a===String(a)&&a.match(kb))return F.nonce=a}}return null},ob=function(a){if("loading"!=t.readyState)nb(a);else{var b=mb(),c="";null!==b&&(c=' nonce="'+b+'"');t.write("<"+K+' src="'+encodeURI(a)+'"'+c+"></"+K+">")}},nb=function(a){var b=t.createElement(K);b.setAttribute("src",a);a=mb();null!==a&&b.setAttribute("nonce",a);b.async="true";(a=t.getElementsByTagName(K)[0])?a.parentNode.insertBefore(b,a):(t.head||t.body||t.documentElement).appendChild(b)},pb=function(a,b){var c=b&&b._c;if(c)for(var d=
0;d<H.length;d++){var e=H[d][0],f=H[d][1];f&&x(c,e)&&f(c[e],a,b)}},rb=function(a,b,c){qb(function(){var c=b===La(ea.href)?v(B,"_",w()):w();c=v(Pa(b),"_",c);a(c)},c)},L=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);pb(a,c);b=a?a.split(":"):[];var d=c.h||jb(),e=v(F,"ah",w());if(e["::"]&&b.length){a=[];for(var f=null;f=b.shift();){var g=f.split(".");g=e[f]||e[g[1]&&"ns:"+g[0]||""]||d;var h=a.length&&a[a.length-1]||null,k=h;h&&h.hint==g||(k={hint:g,O:[]},a.push(k));k.O.push(f)}var l=
a.length;if(1<l){var q=c.callback;q&&(c.callback=function(){0==--l&&q()})}for(;b=a.shift();)sb(b.O,c,b.hint)}else sb(b||[],c,d)},sb=function(a,b,c){a=ja(a)||[];var d=b.callback,e=b.config,f=b.timeout,g=b.ontimeout,h=b.onerror,k=void 0;"function"==typeof h&&(k=h);var l=null,q=!1;if(f&&!g||!f&&g)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";h=v(Pa(c),"r",[]).sort();var n=v(Pa(c),"L",[]).sort(),r=[].concat(h),u=function(a,b){if(q)return 0;p.clearTimeout(l);n.push.apply(n,
y);var d=((B||{}).config||{}).update;d?d(e):e&&v(F,"cu",[]).push(e);if(b){Va("me0",a,r);try{rb(b,c,k)}finally{Va("me1",a,r)}}return 1};0<f&&(l=p.setTimeout(function(){q=!0;g()},f));var y=lb(a,n);if(y.length){y=lb(a,h);var E=v(F,"CP",[]),I=E.length;E[I]=function(a){if(!a)return 0;Va("ml1",y,r);var b=function(b){E[I]=null;u(y,a)&&Oa(function(){d&&d();b()})},c=function(){var a=E[I+1];a&&a()};0<I&&E[I-1]?E[I]=function(){b(c)}:b(c)};if(y.length){var Aa="loaded_"+F.I++;B[Aa]=function(a){E[I](a);B[Aa]=null};
a=eb(c,y,"gapi."+Aa,h);h.push.apply(h,y);Va("ml0",y,r);b.sync||p.___gapisync?ob(a):nb(a)}else E[I](fa)}else u(y)&&d&&d()};var qb=function(a,b){if(F.hee&&0<F.hel)try{return a()}catch(c){b&&b(c),F.hel--,L("debug_error",function(){try{window.___jsl.hefn(c)}catch(d){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;}};B.load=function(a,b){return qb(function(){return L(a,b)})};var M=function(a){var b=window.___jsl=window.___jsl||{};b[a]=b[a]||[];return b[a]},N=function(a){var b=window.___jsl=window.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},tb=function(a){return"object"===typeof a&&/\[native code\]/.test(a.push)},O=function(a,b,c){if(b&&"object"===typeof b)for(var d in b)!Object.prototype.hasOwnProperty.call(b,d)||c&&"___goc"===d&&"undefined"===typeof b[d]||(a[d]&&b[d]&&"object"===typeof a[d]&&"object"===typeof b[d]&&!tb(a[d])&&!tb(b[d])?O(a[d],b[d]):b[d]&&"object"===
typeof b[d]?(a[d]=tb(b[d])?[]:{},O(a[d],b[d])):a[d]=b[d])},ub=function(a){if(a&&!/^\s+$/.test(a)){for(;0==a.charCodeAt(a.length-1);)a=a.substring(0,a.length-1);try{var b=window.JSON.parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(c){}return"object"===typeof b?b:{}}},vb=function(a,b){var c={___goc:void 0};a.length&&a[a.length-1]&&Object.hasOwnProperty.call(a[a.length-
1],"___goc")&&"undefined"===typeof a[a.length-1].___goc&&(c=a.pop());O(c,b);a.push(c)},wb=function(a){N(!0);var b=window.___gcfg,c=M("cu"),d=window.___gu;b&&b!==d&&(vb(c,b),window.___gu=b);b=M("cu");var e=document.scripts||document.getElementsByTagName("script")||[];d=[];var f=[];f.push.apply(f,M("us"));for(var g=0;g<e.length;++g)for(var h=e[g],k=0;k<f.length;++k)h.src&&0==h.src.indexOf(f[k])&&d.push(h);0==d.length&&0<e.length&&e[e.length-1].src&&d.push(e[e.length-1]);for(e=0;e<d.length;++e)d[e].getAttribute("gapi_processed")||
(d[e].setAttribute("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=ub(f))&&b.push(f));a&&vb(c,a);d=M("cd");a=0;for(b=d.length;a<b;++a)O(N(),d[a],!0);d=M("ci");a=0;for(b=d.length;a<b;++a)O(N(),d[a],!0);a=0;for(b=c.length;a<b;++a)O(N(),c[a],!0)},P=function(a){var b=N();if(!a)return b;a=a.split("/");for(var c=0,d=a.length;b&&"object"===typeof b&&c<d;++c)b=b[a[c]];return c===a.length&&void 0!==b?b:void 0},xb=function(a,b){var c;
if("string"===typeof a){var d=c={};a=a.split("/");for(var e=0,f=a.length;e<f-1;++e){var g={};d=d[a[e]]=g}d[a[e]]=b}else c=a;wb(c)};var yb=function(){var a=window.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),v(F,"ci",[]).push(a),window.__GOOGLEAPIS=void 0)};var zb={apppackagename:1,callback:1,clientid:1,cookiepolicy:1,openidrealm:-1,includegrantedscopes:-1,requestvisibleactions:1,scope:1},Ab=!1,Bb=w(),Cb=function(){if(!Ab){for(var a=document.getElementsByTagName("meta"),b=0;b<a.length;++b){var c=a[b].name.toLowerCase();if(0==c.lastIndexOf("google-signin-",0)){c=c.substring(14);var d=a[b].content;zb[c]&&d&&(Bb[c]=d)}}if(window.self!==window.top){a=document.location.toString();for(var e in zb)0<zb[e]&&(b=C(a,e,""))&&(Bb[e]=b)}Ab=!0}e=w();z(Bb,e);return e},
Db=function(a){return!!(a.clientid&&a.scope&&a.callback)};var Eb=window.console,Fb=function(a){Eb&&Eb.log&&Eb.log(a)};var Gb=function(){return!!F.oa},Hb=function(){};var Q=v(F,"rw",w()),Ib=function(a){for(var b in Q)a(Q[b])},Jb=function(a,b){(a=Q[a])&&a.state<b&&(a.state=b)};var Kb;var Lb=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,Mb=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,Nb=function(a){var b=P("googleapis.config/sessionIndex");"string"===typeof b&&254<b.length&&(b=null);null==b&&(b=window.__X_GOOG_AUTHUSER);"string"===typeof b&&254<b.length&&(b=null);if(null==b){var c=window.google;c&&(b=c.authuser)}"string"===typeof b&&254<b.length&&(b=null);null==b&&(a=a||window.location.href,b=C(a,"authuser")||
null,null==b&&(b=(b=a.match(Lb))?b[1]:null));if(null==b)return null;b=String(b);254<b.length&&(b=null);return b},Ob=function(a){var b=P("googleapis.config/sessionDelegate");"string"===typeof b&&21<b.length&&(b=null);null==b&&(b=(a=(a||window.location.href).match(Mb))?a[1]:null);if(null==b)return null;b=String(b);21<b.length&&(b=null);return b};var Pb,R,S=void 0,T=function(a){try{return m.JSON.parse.call(m.JSON,a)}catch(b){return!1}},U=function(a){return Object.prototype.toString.call(a)},Qb=U(0),Rb=U(new Date(0)),Sb=U(!0),Tb=U(""),Ub=U({}),Vb=U([]),V=function(a,b){if(b)for(var c=0,d=b.length;c<d;++c)if(a===b[c])throw new TypeError("Converting circular structure to JSON");d=typeof a;if("undefined"!==d){c=Array.prototype.slice.call(b||[],0);c[c.length]=a;b=[];var e=U(a);if(null!=a&&"function"===typeof a.toJSON&&(Object.prototype.hasOwnProperty.call(a,
"toJSON")||(e!==Vb||a.constructor!==Array&&a.constructor!==Object)&&(e!==Ub||a.constructor!==Array&&a.constructor!==Object)&&e!==Tb&&e!==Qb&&e!==Sb&&e!==Rb))return V(a.toJSON.call(a),c);if(null==a)b[b.length]="null";else if(e===Qb)a=Number(a),isNaN(a)||isNaN(a-a)?a="null":-0===a&&0>1/a&&(a="-0"),b[b.length]=String(a);else if(e===Sb)b[b.length]=String(!!Number(a));else{if(e===Rb)return V(a.toISOString.call(a),c);if(e===Vb&&U(a.length)===Qb){b[b.length]="[";var f=0;for(d=Number(a.length)>>0;f<d;++f)f&&
(b[b.length]=","),b[b.length]=V(a[f],c)||"null";b[b.length]="]"}else if(e==Tb&&U(a.length)===Qb){b[b.length]='"';f=0;for(c=Number(a.length)>>0;f<c;++f)d=String.prototype.charAt.call(a,f),e=String.prototype.charCodeAt.call(a,f),b[b.length]="\b"===d?"\\b":"\f"===d?"\\f":"\n"===d?"\\n":"\r"===d?"\\r":"\t"===d?"\\t":"\\"===d||'"'===d?"\\"+d:31>=e?"\\u"+(e+65536).toString(16).substr(1):32<=e&&65535>=e?d:"\ufffd";b[b.length]='"'}else if("object"===d){b[b.length]="{";d=0;for(f in a)Object.prototype.hasOwnProperty.call(a,
f)&&(e=V(a[f],c),void 0!==e&&(d++&&(b[b.length]=","),b[b.length]=V(f),b[b.length]=":",b[b.length]=e));b[b.length]="}"}else return}return b.join("")}},Wb=/[\0-\x07\x0b\x0e-\x1f]/,Xb=/^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,Yb=/^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,Zb=/^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,$b=/"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,ac=/-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,bc=/[ \t\n\r]+/g,
cc=/[^"]:/,dc=/""/g,ec=/true|false|null/g,fc=/00/,gc=/[\{]([^0\}]|0[^:])/,hc=/(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,ic=/[^\[,:][\[\{]/,jc=/^(\{|\}|\[|\]|,|:|0)+/,kc=/\u2028/g,lc=/\u2029/g,mc=function(a){a=String(a);if(Wb.test(a)||Xb.test(a)||Yb.test(a)||Zb.test(a))return!1;var b=a.replace($b,'""');b=b.replace(ac,"0");b=b.replace(bc,"");if(cc.test(b))return!1;b=b.replace(dc,"0");b=b.replace(ec,"0");if(fc.test(b)||gc.test(b)||hc.test(b)||ic.test(b)||!b||(b=b.replace(jc,"")))return!1;a=a.replace(kc,"\\u2028").replace(lc,
"\\u2029");b=void 0;try{b=S?[T(a)]:eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n"+a+"\n)")}catch(c){return!1}return b&&1===b.length?b[0]:!1},nc=function(){var a=((m.document||{}).scripts||[]).length;if((void 0===Pb||void 0===S||R!==a)&&-1!==R){Pb=S=!1;R=-1;try{try{S=!!m.JSON&&'{"a":[3,true,"1970-01-01T00:00:00.000Z"]}'===m.JSON.stringify.call(m.JSON,{a:[3,!0,new Date(0)],c:function(){}})&&!0===T("true")&&3===T('[{"a":3}]')[0].a}catch(b){}Pb=S&&!T("[00]")&&
!T('"\u0007"')&&!T('"\\0"')&&!T('"\\v"')}finally{R=a}}},oc=function(a){if(-1===R)return!1;nc();return(Pb?T:mc)(a)},pc=function(a){if(-1!==R)return nc(),S?m.JSON.stringify.call(m.JSON,a):V(a)},qc=!Date.prototype.toISOString||"function"!==typeof Date.prototype.toISOString||"1970-01-01T00:00:00.000Z"!==(new Date(0)).toISOString(),rc=function(){var a=Date.prototype.getUTCFullYear.call(this);return[0>a?"-"+String(1E6-a).substr(1):9999>=a?String(1E4+a).substr(1):"+"+String(1E6+a).substr(1),"-",String(101+
Date.prototype.getUTCMonth.call(this)).substr(1),"-",String(100+Date.prototype.getUTCDate.call(this)).substr(1),"T",String(100+Date.prototype.getUTCHours.call(this)).substr(1),":",String(100+Date.prototype.getUTCMinutes.call(this)).substr(1),":",String(100+Date.prototype.getUTCSeconds.call(this)).substr(1),".",String(1E3+Date.prototype.getUTCMilliseconds.call(this)).substr(1),"Z"].join("")};Date.prototype.toISOString=qc?rc:Date.prototype.toISOString;var sc=function(){this.j=-1};var W=function(){this.j=64;this.b=[];this.F=[];this.W=[];this.B=[];this.B[0]=128;for(var a=1;a<this.j;++a)this.B[a]=0;this.C=this.o=0;this.reset()};da(W,sc);W.prototype.reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.C=this.o=0};
var tc=function(a,b,c){c||(c=0);var d=a.W;if("string"==typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];var g=a.b[2],h=a.b[3],k=a.b[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+g&4294967295;a.b[3]=a.b[3]+h&4294967295;a.b[4]=a.b[4]+k&4294967295};
W.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.j,d=0,e=this.F,f=this.o;d<b;){if(0==f)for(;d<=c;)tc(this,a,d),d+=this.j;if("string"==typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.j){tc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.j){tc(this,e);f=0;break}}this.o=f;this.C+=b}};
W.prototype.digest=function(){var a=[],b=8*this.C;56>this.o?this.update(this.B,56-this.o):this.update(this.B,this.j-(this.o-56));for(var c=this.j-1;56<=c;c--)this.F[c]=b&255,b/=256;tc(this,this.F);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.b[c]>>d&255,++b;return a};var uc=function(){this.J=new W};uc.prototype.reset=function(){this.J.reset()};var vc=p.crypto,wc=!1,xc=0,yc=0,zc=1,Ac=0,Bc="",Cc=function(a){a=a||p.event;var b=a.screenX+a.clientX<<16;b+=a.screenY+a.clientY;b*=(new Date).getTime()%1E6;zc=zc*b%Ac;0<xc&&++yc==xc&&Ea("mousemove",Cc,"remove","de")},Dc=function(a){var b=new uc;a=unescape(encodeURIComponent(a));for(var c=[],d=0,e=a.length;d<e;++d)c.push(a.charCodeAt(d));b.J.update(c);b=b.J.digest();a="";for(c=0;c<b.length;c++)a+="0123456789ABCDEF".charAt(Math.floor(b[c]/16))+"0123456789ABCDEF".charAt(b[c]%16);return a};
wc=!!vc&&"function"==typeof vc.getRandomValues;wc||(Ac=1E6*(screen.width*screen.width+screen.height),Bc=Dc(t.cookie+"|"+t.location+"|"+(new Date).getTime()+"|"+Math.random()),xc=P("random/maxObserveMousemove")||0,0!=xc&&Ea("mousemove",Cc,"add","at"));var Ec=function(){var a=zc;a+=parseInt(Bc.substr(0,20),16);Bc=Dc(Bc);return a/(Ac+Math.pow(16,20))},Fc=function(){var a=new p.Uint32Array(1);vc.getRandomValues(a);return Number("0."+a[0])};var Gc=function(){var a=F.onl;if(!a){a=w();F.onl=a;var b=w();a.e=function(a){var c=b[a];c&&(delete b[a],c())};a.a=function(a,d){b[a]=d};a.r=function(a){delete b[a]}}return a},Hc=function(a,b){b=b.onload;return"function"===typeof b?(Gc().a(a,b),b):null},Ic=function(a){A(/^\w+$/.test(a),"Unsupported id - "+a);Gc();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},Jc=function(a){Gc().r(a)};var Kc={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},Lc={allowtransparency:!0,onload:!0},Mc=0,Nc=function(a){A(!a||Da.test(a),"Illegal url for new iframe - "+a)},Oc=function(a,b,c,d,e){Nc(c.src);var f,g=Hc(d,c),h=g?Ic(d):"";try{document.all&&(f=a.createElement('<iframe frameborder="'+pa(String(c.frameborder))+'" scrolling="'+pa(String(c.scrolling))+'" '+h+' name="'+pa(String(c.name))+'"/>'))}catch(l){}finally{f||
(f=a.createElement("iframe"),g&&(f.onload=function(){f.onload=null;g.call(this)},Jc(d)))}f.setAttribute("ng-non-bindable","");for(var k in c)a=c[k],"style"===k&&"object"===typeof a?z(a,f.style):Lc[k]||f.setAttribute(k,String(a));(k=e&&e.beforeNode||null)||e&&e.dontclear||Ja(b);b.insertBefore(f,k);f=k?k.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var Pc=/^:[\w]+$/,Qc=/:([a-zA-Z_]+):/g,Rc=function(){var a=Nb()||"0",b=Ob();var c=Nb(void 0)||a;var d=Ob(void 0),e="";c&&(e+="u/"+encodeURIComponent(String(c))+"/");d&&(e+="b/"+encodeURIComponent(String(d))+"/");c=e||null;(e=(d=!1===P("isLoggedIn"))?"_/im/":"")&&(c="");var f=P("iframes/:socialhost:"),g=P("iframes/:im_socialhost:");return Kb={socialhost:f,ctx_socialhost:d?g:f,session_index:a,session_delegate:b,session_prefix:c,im_prefix:e}},Sc=function(a,b){return Rc()[b]||""},Tc=function(a){return function(b,
c){return a?Rc()[c]||a[c]||"":Rc()[c]||""}};var Uc=function(a){var b;a.match(/^https?%3A/i)&&(b=decodeURIComponent(a));return Ca(document,b?b:a)},Vc=function(a){a=a||"canonical";for(var b=document.getElementsByTagName("link"),c=0,d=b.length;c<d;c++){var e=b[c],f=e.getAttribute("rel");if(f&&f.toLowerCase()==a&&(e=e.getAttribute("href"))&&(e=Uc(e))&&null!=e.match(/^https?:\/\/[\w\-_\.]+/i))return e}return window.location.href};var Wc={se:"0"},Xc={post:!0},Yc={style:"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"},Zc="onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),$c=v(F,"WI",w()),ad=function(a,b,c){var d;var e={};var f=d=a;"plus"==a&&b.action&&(d=a+"_"+b.action,f=a+"/"+b.action);(d=P("iframes/"+d+"/url"))||(d=":im_socialhost:/:session_prefix::im_prefix:_/widget/render/"+f+"?usegapi=1");for(var g in Wc)e[g]=g+"/"+(b[g]||Wc[g])+"/";e=Ca(t,d.replace(Qc,
Tc(e)));g="iframes/"+a+"/params/";f={};z(b,f);(d=P("lang")||P("gwidget/lang"))&&(f.hl=d);Xc[a]||(f.origin=window.location.origin||window.location.protocol+"//"+window.location.host);f.exp=P(g+"exp");if(g=P(g+"location"))for(d=0;d<g.length;d++){var h=g[d];f[h]=p.location[h]}switch(a){case "plus":case "follow":g=f.href;d=b.action?void 0:"publisher";g=(g="string"==typeof g?g:void 0)?Uc(g):Vc(d);f.url=g;delete f.href;break;case "plusone":g=(g=b.href)?Uc(g):Vc();f.url=g;g=b.db;d=P();null==g&&d&&(g=d.db,
null==g&&(g=d.gwidget&&d.gwidget.db));f.db=g||void 0;g=b.ecp;d=P();null==g&&d&&(g=d.ecp,null==g&&(g=d.gwidget&&d.gwidget.ecp));f.ecp=g||void 0;delete f.href;break;case "signin":f.url=Vc()}F.ILI&&(f.iloader="1");delete f["data-onload"];delete f.rd;for(var k in Wc)f[k]&&delete f[k];f.gsrc=P("iframes/:source:");k=P("inline/css");"undefined"!==typeof k&&0<c&&k>=c&&(f.ic="1");k=/^#|^fr-/;c={};for(var l in f)x(f,l)&&k.test(l)&&(c[l.replace(k,"")]=f[l],delete f[l]);l="q"==P("iframes/"+a+"/params/si")?f:
c;k=Cb();for(var q in k)!x(k,q)||x(f,q)||x(c,q)||(l[q]=k[q]);q=[].concat(Zc);(l=P("iframes/"+a+"/methods"))&&"object"===typeof l&&ha.test(l.push)&&(q=q.concat(l));for(var n in b)x(b,n)&&/^on/.test(n)&&("plus"!=a||"onconnect"!=n)&&(q.push(n),delete f[n]);delete f.callback;c._methods=q.join(",");return za(e,f,c)},bd=["style","data-gapiscan"],dd=function(a){for(var b=w(),c=0!=a.nodeName.toLowerCase().indexOf("g:"),d=0,e=a.attributes.length;d<e;d++){var f=a.attributes[d],g=f.name,h=f.value;0<=ia.call(bd,
g)||c&&0!=g.indexOf("data-")||"null"===h||"specified"in f&&!f.specified||(c&&(g=g.substr(5)),b[g.toLowerCase()]=h)}a=a.style;(c=cd(a&&a.height))&&(b.height=String(c));(a=cd(a&&a.width))&&(b.width=String(a));return b},cd=function(a){var b=void 0;"number"===typeof a?b=a:"string"===typeof a&&(b=parseInt(a,10));return b},fd=function(){var a=F.drw;Ib(function(b){if(a!==b.id&&4!=b.state&&"share"!=b.type){var c=b.id,d=b.type,e=b.url;b=b.userParams;var f=t.getElementById(c);if(f){var g=ad(d,b,0);g?(f=f.parentNode,
e.replace(/#.*/,"").replace(/(\?|&)ic=1/,"")!==g.replace(/#.*/,"").replace(/(\?|&)ic=1/,"")&&(b.dontclear=!0,b.rd=!0,b.ri=!0,b.type=d,ed(f,b),(d=Q[f.lastChild.id])&&(d.oid=c),Jb(c,4))):delete Q[c]}else delete Q[c]}})};var gd,hd,X,id,jd,kd=/(?:^|\s)g-((\S)*)(?:$|\s)/,ld={plusone:!0,autocomplete:!0,profile:!0,signin:!0,signin2:!0};gd=v(F,"SW",w());hd=v(F,"SA",w());X=v(F,"SM",w());id=v(F,"FW",[]);jd=null;
var nd=function(a,b){md(void 0,!1,a,b)},md=function(a,b,c,d){G("ps0",!0);c=("string"===typeof c?document.getElementById(c):c)||t;var e=t.documentMode;if(c.querySelectorAll&&(!e||8<e)){e=d?[d]:qa(gd).concat(qa(hd)).concat(qa(X));for(var f=[],g=0;g<e.length;g++){var h=e[g];f.push(".g-"+h,"g\\:"+h)}e=c.querySelectorAll(f.join(","))}else e=c.getElementsByTagName("*");c=w();for(f=0;f<e.length;f++){g=e[f];var k=g;h=d;var l=k.nodeName.toLowerCase(),q=void 0;if(k.getAttribute("data-gapiscan"))h=null;else{var n=
l.indexOf("g:");0==n?q=l.substr(2):(n=(n=String(k.className||k.getAttribute("class")))&&kd.exec(n))&&(q=n[1]);h=!q||!(gd[q]||hd[q]||X[q])||h&&q!==h?null:q}h&&(ld[h]||0==g.nodeName.toLowerCase().indexOf("g:")||0!=qa(dd(g)).length)&&(g.setAttribute("data-gapiscan",!0),v(c,h,[]).push(g))}if(b)for(var r in c)for(b=c[r],d=0;d<b.length;d++)b[d].setAttribute("data-onload",!0);for(var u in c)id.push(u);G("ps1",!0);if((r=id.join(":"))||a)try{B.load(r,a)}catch(E){Fb(E);return}if(od(jd||{}))for(var y in c){a=
c[y];u=0;for(b=a.length;u<b;u++)a[u].removeAttribute("data-gapiscan");pd(y)}else{d=[];for(y in c)for(a=c[y],u=0,b=a.length;u<b;u++)e=a[u],qd(y,e,dd(e),d,b);rd(r,d)}},sd=function(a){var b=v(B,a,{});b.go||(b.go=function(b){return nd(b,a)},b.render=function(b,d){d=d||{};d.type=a;return ed(b,d)})},td=function(a){gd[a]=!0},ud=function(a){hd[a]=!0},vd=function(a){X[a]=!0};var pd=function(a,b){var c=Na(a);b&&c?(c(b),(c=b.iframeNode)&&c.setAttribute("data-gapiattached",!0)):B.load(a,function(){var c=Na(a),e=b&&b.iframeNode,f=b&&b.userParams;e&&c?(c(b),e.setAttribute("data-gapiattached",!0)):(c=B[a].go,"signin2"==a?c(e,f):c(e&&e.parentNode,f))})},od=function(){return!1},rd=function(){},qd=function(a,b,c,d,e,f,g){switch(wd(b,a,f)){case 0:a=X[a]?a+"_annotation":a;d={};d.iframeNode=b;d.userParams=c;pd(a,d);break;case 1:if(b.parentNode){for(var h in c){if(f=x(c,h))f=c[h],
f=!!f&&"object"===typeof f&&(!f.toString||f.toString===Object.prototype.toString||f.toString===Array.prototype.toString);if(f)try{c[h]=pc(c[h])}catch(y){delete c[h]}}f=!0;c.dontclear&&(f=!1);delete c.dontclear;Hb();h=ad(a,c,e);e=g||{};e.allowPost=1;e.attributes=Yc;e.dontclear=!f;g={};g.userParams=c;g.url=h;g.type=a;if(c.rd)var k=b;else k=document.createElement("div"),b.setAttribute("data-gapistub",!0),k.style.cssText="position:absolute;width:450px;left:-10000px;",b.parentNode.insertBefore(k,b);g.siteElement=
k;k.id||(b=k,v($c,a,0),f="___"+a+"_"+$c[a]++,b.id=f);b=w();b[">type"]=a;z(c,b);f=h;c=k;h=e||{};b=h.attributes||{};A(!(h.allowPost||h.forcePost)||!b.onload,"onload is not supported by post iframe (allowPost or forcePost)");e=b=f;Pc.test(b)&&(e=P("iframes/"+e.substring(1)+"/url"),A(!!e,"Unknown iframe url config for - "+b));f=Ca(t,e.replace(Qc,Sc));b=c.ownerDocument||t;k=0;do e=h.id||["I",Mc++,"_",(new Date).getTime()].join("");while(b.getElementById(e)&&5>++k);A(5>k,"Error creating iframe id");k={};
var l={};b.documentMode&&9>b.documentMode&&(k.hostiemode=b.documentMode);z(h.queryParams||{},k);z(h.fragmentParams||{},l);var q=h.pfname;var n=w();P("iframes/dropLegacyIdParam")||(n.id=e);n._gfid=e;n.parent=b.location.protocol+"//"+b.location.host;var r=C(b.location.href,"parent");q=q||"";!q&&r&&(r=C(b.location.href,"_gfid","")||C(b.location.href,"id",""),q=C(b.location.href,"pfname",""),q=r?q+"/"+r:"");q||(r=oc(C(b.location.href,"jcp","")))&&"object"==typeof r&&(q=(q=r.id)?r.pfname+"/"+q:"");n.pfname=
q;h.connectWithJsonParam&&(r={},r.jcp=pc(n),n=r);r=C(f,"rpctoken")||k.rpctoken||l.rpctoken;r||(r=h.rpctoken||String(Math.round(1E8*(wc?Fc():Ec()))),n.rpctoken=r);h.rpctoken=r;z(n,h.connectWithQueryParams?k:l);r=b.location.href;n=w();(q=C(r,"_bsh",F.bsh))&&(n._bsh=q);(r=La(r))&&(n.jsh=r);h.hintInFragment?z(n,l):z(n,k);f=za(f,k,l,h.paramsSerializer);l=w();z(Kc,l);z(h.attributes,l);l.name=l.id=e;l.src=f;h.eurl=f;k=h||{};n=!!k.allowPost;if(k.forcePost||n&&2E3<f.length){k=D(f);l.src="";l["data-postorigin"]=
f;f=Oc(b,c,l,e);if(-1!=navigator.userAgent.indexOf("WebKit")){var u=f.contentWindow.document;u.open();l=u.createElement("div");n={};r=e+"_inner";n.name=r;n.src="";n.style="display:none";Oc(b,l,n,r,h)}l=(h=k.query[0])?h.split("&"):[];h=[];for(n=0;n<l.length;n++)r=l[n].split("=",2),h.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);k.query=[];l=xa(k);A(Da.test(l),"Invalid URL: "+l);k=b.createElement("form");k.action=l;k.method="POST";k.target=e;k.style.display="none";for(e=0;e<h.length;e++)l=
b.createElement("input"),l.type="hidden",l.name=h[e][0],l.value=h[e][1],k.appendChild(l);c.appendChild(k);k.submit();k.parentNode.removeChild(k);u&&u.close();u=f}else u=Oc(b,c,l,e,h);g.iframeNode=u;g.id=u.getAttribute("id");u=g.id;c=w();c.id=u;c.userParams=g.userParams;c.url=g.url;c.type=g.type;c.state=1;Q[u]=c;u=g}else u=null;u&&((g=u.id)&&d.push(g),pd(a,u))}},wd=function(a,b,c){if(a&&1===a.nodeType&&b){if(c)return 1;if(X[b]){if(Ka[a.nodeName.toLowerCase()])return(a=a.innerHTML)&&a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,
"")?0:1}else{if(hd[b])return 0;if(gd[b])return 1}}return null},ed=function(a,b){var c=b.type;delete b.type;var d=("string"===typeof a?document.getElementById(a):a)||void 0;if(d){a={};for(var e in b)x(b,e)&&(a[e.toLowerCase()]=b[e]);a.rd=1;(b=!!a.ri)&&delete a.ri;e=[];qd(c,d,a,e,0,b,void 0);rd(c,e)}else Fb("string"==="gapi."+c+".render: missing element "+typeof a?a:"")};v(B,"platform",{}).go=nd;od=function(a){for(var b=["_c","jsl","h"],c=0;c<b.length&&a;c++)a=a[b[c]];b=La(ea.href);return!a||0!=a.indexOf("n;")&&0!=b.indexOf("n;")&&a!==b};rd=function(a,b){xd(a,b)};var Ga=function(a){md(a,!0)},yd=function(a,b){b=b||[];for(var c=0;c<b.length;++c)a(b[c]);for(a=0;a<b.length;a++)sd(b[a])};
H.push(["platform",function(a,b,c){jd=c;b&&id.push(b);yd(td,a);yd(ud,c._c.annotation);yd(vd,c._c.bimodal);yb();wb();if("explicit"!=P("parsetags")){Ma(a);Db(Cb())&&!P("disableRealtimeCallback")&&Hb();if(c&&(a=c.callback)){var d=ra(a);delete c.callback}Ia(function(){Ga(d)})}}]);B._pl=!0;var zd=function(a){a=(a=Q[a])?a.oid:void 0;if(a){var b=t.getElementById(a);b&&b.parentNode.removeChild(b);delete Q[a];zd(a)}};var Ad=/^\{h:'/,Bd=/^!_/,Cd="",xd=function(a,b){function c(){Ea("message",d,"remove","de")}function d(d){var f=d.data,h=d.origin;if(Dd(f,b)){var k=e;e=!1;k&&G("rqe");Ed(a,function(){k&&G("rqd");c();for(var a=v(F,"RPMQ",[]),b=0;b<a.length;b++)a[b]({data:f,origin:h})})}}if(0!==b.length){Cd=C(ea.href,"pfname","");var e=!0;Ea("message",d,"add","at");L(a,c)}},Dd=function(a,b){a=String(a);if(Ad.test(a))return!0;var c=!1;Bd.test(a)&&(c=!0,a=a.substr(2));if(!/^\{/.test(a))return!1;var d=oc(a);if(!d)return!1;
a=d.f;if(d.s&&a&&-1!=ia.call(b,a)){if("_renderstart"===d.s||d.s===Cd+"/"+a+"::_renderstart")if(d=d.a&&d.a[c?0:1],b=t.getElementById(a),Jb(a,2),d&&b&&d.width&&d.height){a:{c=b.parentNode;a=d||{};if(Gb()){var e=b.id;if(e){d=(d=Q[e])?d.state:void 0;if(1===d||4===d)break a;zd(e)}}(d=c.nextSibling)&&d.getAttribute&&d.getAttribute("data-gapistub")&&(c.parentNode.removeChild(d),c.style.cssText="");d=a.width;var f=a.height,g=c.style;g.textIndent="0";g.margin="0";g.padding="0";g.background="transparent";g.borderStyle=
"none";g.cssFloat="none";g.styleFloat="none";g.lineHeight="normal";g.fontSize="1px";g.verticalAlign="baseline";c=c.style;c.display="inline-block";g=b.style;g.position="static";g.left="0";g.top="0";g.visibility="visible";d&&(c.width=g.width=d+"px");f&&(c.height=g.height=f+"px");a.verticalAlign&&(c.verticalAlign=a.verticalAlign);e&&Jb(e,3)}b["data-csi-wdt"]=(new Date).getTime()}return!0}return!1},Ed=function(a,b){L(a,b)};var Fd=function(a,b){this.H=a;a=b||{};this.Y=Number(a.maxAge)||0;this.N=a.domain;this.R=a.path;this.Z=!!a.secure},Gd=/^[-+/_=.:|%&a-zA-Z0-9@]*$/,Hd=/^[A-Z_][A-Z0-9_]{0,63}$/;Fd.prototype.read=function(){for(var a=this.H+"=",b=document.cookie.split(/;\s*/),c=0;c<b.length;++c){var d=b[c];if(0==d.indexOf(a))return d.substr(a.length)}};
Fd.prototype.write=function(a,b){if(!Hd.test(this.H))throw"Invalid cookie name";if(!Gd.test(a))throw"Invalid cookie value";a=this.H+"="+a;this.N&&(a+=";domain="+this.N);this.R&&(a+=";path="+this.R);b="number"===typeof b?b:this.Y;if(0<=b){var c=new Date;c.setSeconds(c.getSeconds()+b);a+=";expires="+c.toUTCString()}this.Z&&(a+=";secure");document.cookie=a;return!0};Fd.prototype.clear=function(){this.write("",0)};
Fd.iterate=function(a){for(var b=document.cookie.split(/;\s*/),c=0;c<b.length;++c){var d=b[c].split("="),e=d.shift();a(e,d.join("="))}};var Id=function(a){this.A=a},Y={};Id.prototype.read=function(){if(Y.hasOwnProperty(this.A))return Y[this.A]};Id.prototype.write=function(a){Y[this.A]=a;return!0};Id.prototype.clear=function(){delete Y[this.A]};Id.iterate=function(a){for(var b in Y)Y.hasOwnProperty(b)&&a(b,Y[b])};var Jd="https:"===window.location.protocol,Kd=Jd||"http:"===window.location.protocol?Fd:Id,Ld=function(a){var b=a.substr(1),c="",d=window.location.hostname;if(""!==b){c=parseInt(b,10);if(isNaN(c))return null;b=d.split(".");if(b.length<c-1)return null;b.length==c-1&&(d="."+d)}else d="";return{i:"S"==a.charAt(0),domain:d,l:c}},Md=function(){var a,b=null;Kd.iterate(function(c,d){0===c.indexOf("G_AUTHUSER_")&&(c=Ld(c.substring(11)),!a||c.i&&!a.i||c.i==a.i&&c.l>a.l)&&(a=c,b=d)});return{X:a,D:b}};var Nd=function(a){if(0!==a.indexOf("GCSC"))return null;var b={P:!1};a=a.substr(4);if(!a)return b;var c=a.charAt(0);a=a.substr(1);var d=a.lastIndexOf("_");if(-1==d)return b;var e=Ld(a.substr(d+1));if(null==e)return b;a=a.substring(0,d);if("_"!==a.charAt(0))return b;d="E"===c&&e.i;return!d&&("U"!==c||e.i)||d&&!Jd?b:{P:!0,i:d,ba:a.substr(1),domain:e.domain,l:e.l}},Od=function(a){if(!a)return[];a=a.split("=");return a[1]?a[1].split("|"):[]},Pd=function(a){a=a.split(":");return{clientId:a[0].split("=")[1],
aa:Od(a[1]),da:Od(a[2]),ca:Od(a[3])}},Qd=function(){var a=Md(),b=a.X;a=a.D;if(null!==a){var c;Kd.iterate(function(a,d){(a=Nd(a))&&a.P&&a.i==b.i&&a.l==b.l&&(c=d)});if(c){var d=Pd(c),e=d&&d.aa[Number(a)];d=d&&d.clientId;if(e)return{D:a,$:e,clientId:d}}}return null};var Z=function(){this.M=Rd};Z.prototype.v=0;Z.prototype.K=2;Z.prototype.M=null;Z.prototype.G=!1;Z.prototype.U=function(){this.G||(this.v=0,this.G=!0,this.S())};Z.prototype.S=function(){this.G&&(this.M()?this.v=this.K:this.v=Math.min(2*(this.v||this.K),120),window.setTimeout(ca(this.S,this),1E3*this.v))};for(var Sd=0;64>Sd;++Sd);var Td=null;Gb=function(){return F.oa=!0};Hb=function(){F.oa=!0;var a=Qd();(a=a&&a.D)&&xb("googleapis.config/sessionIndex",a);Td||(Td=v(F,"ss",new Z));a=Td;a.U&&a.U()};
var Rd=function(){var a=Qd(),b=a&&a.$||null,c=a&&a.clientId;L("auth",{callback:function(){var a=p.gapi.auth,e={client_id:c,session_state:b};a.checkSessionState(e,function(b){var c=e.session_state,d=P("isLoggedIn");b=P("debug/forceIm")?!1:c&&b||!c&&!b;if(d=d!=b)xb("isLoggedIn",b),Hb(),fd(),b||((b=a.signOut)?b():(b=a.setToken)&&b(null));b=Cb();var f=P("savedUserState");c=a._guss(b.cookiepolicy);f=f!=c&&"undefined"!=typeof f;xb("savedUserState",c);(d||f)&&Db(b)&&!P("disableRealtimeCallback")&&a._pimf(b,
!0)})}});return!0};G("bs0",!0,window.gapi._bs);G("bs1",!0);delete window.gapi._bs;}).call(this);
gapi.load("",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"deviceType":"desktop","oauth-flow":{"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","disableOpt":true,"idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe","usegapi":false},"debug":{"reportExceptionRate":0.05,"forceIm":false,"rethrowException":false,"host":"https://apis.google.com"},"enableMultilogin":true,"googleapis.config":{"auth":{"useFirstPartyAuthV2":false}},"isPlusUser":false,"inline":{"css":1},"disableRealtimeCallback":false,"drive_share":{"skipInitCommand":true},"csi":{"rate":0.01},"client":{"cors":false},"isLoggedIn":false,"signInDeprecation":{"rate":0.0},"include_granted_scopes":true,"llang":"zh","iframes":{"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},":source:":"3p","playemm":{"url":"https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"},"partnersbadge":{"url":"https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"},"dataconnector":{"url":"https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"},"shortlists":{"url":""},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},"signin":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1","methods":["onauth"]},"donation":{"url":"https://onetoday.google.com/home/donationWidget?usegapi\u003d1"},"plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},":im_socialhost:":"https://plus.googleapis.com","backdrop":{"url":"https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"additnow":{"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1","methods":["launchurl"]},":signuphost:":"https://plus.google.com","community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"appfinder":{"url":"https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"savetodrive":{"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1","methods":["save"]},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"},"youtube":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1","methods":["scroll","openwindow"]},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},"udc_webconsentflow":{"params":{"url":""},"url":"https://myaccount.google.com/webconsent?usegapi\u003d1"},"savetoandroidpay":{"url":"https://androidpay.google.com/a/widget/save"},"blogger":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1","methods":["scroll","openwindow"]},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"surveyoptin":{"url":"https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"},":socialhost:":"https://apis.google.com","hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},":gplus_url:":"https://plus.google.com","rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"comments":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1","methods":["scroll","openwindow"]},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"ratingbadge":{"url":"https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"sharetoclassroom":{"url":"https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"},"ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},"family_creation":{"params":{"url":""},"url":"https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},"savetowallet":{"url":"https://androidpay.google.com/a/widget/save"}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.zh_CN.4v_Vct6X2EI.O/m\u003d__features__/am\u003dAQE/rt\u003dj/d\u003d1/rs\u003dAGLTcCPhbTCLITENZ6Z8CZmaVDVjuOTxtA","u":"https://apis.google.com/js/platform.js","hee":true,"fp":"8293def0774ce8745a6547a3e9942bca532cc81d","dpo":false},"platform":["additnow","backdrop","blogger","comments","commentcount","community","family_creation","follow","hangout","page","partnersbadge","person","playemm","playreview","plus","plusone","post","savetoandroidpay","savetodrive","savetowallet","shortlists","signin2","udc_webconsentflow","visibility","youtube","ytsubscribe","zoomableimage","sharetoclassroom","donation","ratingbadge","surveyoptin"],"fp":"8293def0774ce8745a6547a3e9942bca532cc81d","annotation":["interactivepost","recobar","signin2","autocomplete","profile"],"bimodal":["signin","share"]}});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * fb 模块
 * util,fbsdk必须导入
 * 其他模块可以根据需求导入
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(15),__webpack_require__(4),__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util,fbsdk,fbuser,fbpay) {
    /**
     * 初始化Facebook SDK
     */
    util.register("wing.facebook.init",function (fbAppId){
        if(!fbAppId){
            fbAppId = __webpack_require__(0).context.initInfo.fbAppId;
        }
        FB.init({
            appId:fbAppId,
            cookie: true,
            xfbml:true,
            version:'v3.2'
        });
    })
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var require;/*1516861528,,JIT Construction: v3597473,en_US*/

/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
try {window.FB|| (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 0;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    var __p;    with (this) {      (function(){var a={},b=function b(i,j){if(!i&&!j)return null;var k={};if(typeof i!=="undefined")k.type=i;if(typeof j!=="undefined")k.signature=j;return k},c=function c(i,j){return b(i&&/^[A-Z]/.test(i)?i:undefined,j&&(j.params&&j.params.length||j.returns)?"function("+(j.params?j.params.map(function(k){return/\?/.test(k)?"?"+k.replace("?",""):k}).join(","):"")+")"+(j.returns?":"+j.returns:""):undefined)},d=function d(i,j,k){return i},e=function e(i,j,k){if("sourcemeta"in __transform_includes)i.__SMmeta=j;if("typechecks"in __transform_includes){var l=c(j?j.name:undefined,k);if(l)__w(i,l)}return i},f=function f(i,j,k){return k.apply(i,j)},g=function g(i,j,k,l){if(l&&l.params)__t.apply(i,l.params);var m=k.apply(i,j);if(l&&l.returns)__t([m,l.returns]);return m},h=function h(i,j,k,l,m){if(m){if(!m.callId)m.callId=m.module+":"+(m.line||0)+":"+(m.column||0);var n=m.callId;a[n]=(a[n]||0)+1}return k.apply(i,j)};if(typeof __transform_includes==="undefined"){__annotator=d;__bodyWrapper=f}else{__annotator=e;if("codeusage"in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a};__bodyWrapper.clearCodeUsage=function(){a={}}}else if("typechecks"in __transform_includes)__bodyWrapper=g;else __bodyWrapper=f}})();
__t=function(a){return a[0]};__w=function(a){return a};
var require,__d;(function(a){var b={},c={},d=["global","require","requireDynamic","requireLazy","module","exports"];require=function(e,f){if(Object.prototype.hasOwnProperty.call(c,e))return c[e];if(!Object.prototype.hasOwnProperty.call(b,e)){if(f)return null;throw new Error("Module "+e+" has not been defined")}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case"module":j=g;break;case"exports":j=g.exports;break;case"global":j=a;break;case"require":j=require;break;case"requireDynamic":j=null;break;case"requireLazy":j=null;break;default:j=require.call(null,h[l])}k.push(j)}g.factory.apply(a,k);c[e]=g.exports;return g.exports};__d=function(e,f,g,h){if(typeof g=="function"){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e)}else c[e]=g}})(this);
__d("ES5Array",[],(function a(b,c,d,e,f,g){var h={};h.isArray=function(i){return Object.prototype.toString.call(i)=="[object Array]"};f.exports=h}),null);
__d("ES5ArrayPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.map=function(i,j){if(typeof i!="function")throw new TypeError();var k=void 0,l=this.length,m=new Array(l);for(k=0;k<l;++k)if(k in this)m[k]=i.call(j,this[k],k,this);return m};h.forEach=function(i,j){h.map.call(this,i,j)};h.filter=function(i,j){__p&&__p();if(typeof i!="function")throw new TypeError();var k=void 0,l=void 0,m=this.length,n=[];for(k=0;k<m;++k)if(k in this){l=this[k];if(i.call(j,l,k,this))n.push(l)}return n};h.every=function(i,j){if(typeof i!="function")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(!i.call(j,k[m],m,k))return false;return true};h.some=function(i,j){if(typeof i!="function")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(i.call(j,k[m],m,k))return true;return false};h.indexOf=function(i,j){var k=this.length;j|=0;if(j<0)j+=k;for(;j<k;j++)if(j in this&&this[j]===i)return j;return-1};f.exports=h}),null);
__d("ES5Date",[],(function a(b,c,d,e,f,g){var h={};h.now=function(){return new Date().getTime()};f.exports=h}),null);
__d("ES5FunctionPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.bind=function(i){if(typeof this!="function")throw new TypeError("Bind must be called on a function");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName="bound:"+(j.displayName||j.name||"(?)");l.toString=function m(){return"bound: "+j};return l};f.exports=h}),null);
__d("ie8DontEnum",[],(function a(b,c,d,e,f,g){var h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","prototypeIsEnumerable","constructor"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable("toString"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);
__d("ES5Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!="object"&&m!="function")throw new TypeError("Object prototype may only be a Object or null");k.prototype=l;return new k()};j.keys=function(l){__p&&__p();var m=typeof l;if(m!="object"&&m!="function"||l===null)throw new TypeError("Object.keys called on non-object");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);
__d("ES5StringPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.trim=function(){if(this==null)throw new TypeError("String.prototype.trim called on null or undefined");return String.prototype.replace.call(this,/^\s+|\s+$/g,"")};h.startsWith=function(i){var j=String(this);if(this==null)throw new TypeError("String.prototype.startsWith called on null or undefined");var k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;var l=Math.min(Math.max(k,0),j.length);return j.indexOf(String(i),k)==l};h.endsWith=function(i){__p&&__p();var j=String(this);if(this==null)throw new TypeError("String.prototype.endsWith called on null or undefined");var k=j.length,l=String(i),m=arguments.length>1?Number(arguments[1]):k;if(isNaN(m))m=0;var n=Math.min(Math.max(m,0),k),o=n-l.length;if(o<0)return false;return j.lastIndexOf(l,o)==o};h.includes=function(i){if(this==null)throw new TypeError("String.prototype.contains called on null or undefined");var j=String(this),k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;return j.indexOf(String(i),k)!=-1};h.contains=h.includes;h.repeat=function(i){__p&&__p();if(this==null)throw new TypeError("String.prototype.repeat called on null or undefined");var j=String(this),k=i?Number(i):0;if(isNaN(k))k=0;if(k<0||k===Infinity)throw RangeError();if(k===1)return j;if(k===0)return"";var l="";while(k){if(k&1)l+=j;if(k>>=1)j+=j}return l};f.exports=h}),null);
__d("ES6Array",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h={from:function i(j){__p&&__p();if(j==null)throw new TypeError("Object is null or undefined");var k=arguments[1],l=arguments[2],m=this,n=Object(j),o=typeof Symbol==="function"?typeof Symbol==="function"?Symbol.iterator:"@@iterator":"@@iterator",p=typeof k==="function",q=typeof n[o]==="function",r=0,s=void 0,t=void 0;if(q){s=typeof m==="function"?new m():[];var u=n[o](),v=void 0;while(!(v=u.next()).done){t=v.value;if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}var w=n.length;if(isNaN(w)||w<0)w=0;s=typeof m==="function"?new m(w):new Array(w);while(r<w){t=n[r];if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}};f.exports=h}),null);
__d("ES6ArrayPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={find:function i(j,k){if(this==null)throw new TypeError("Array.prototype.find called on null or undefined");if(typeof j!=="function")throw new TypeError("predicate must be a function");var l=h.findIndex.call(this,j,k);return l===-1?void 0:this[l]},findIndex:function i(j,k){if(this==null)throw new TypeError("Array.prototype.findIndex called on null or undefined");if(typeof j!=="function")throw new TypeError("predicate must be a function");var l=Object(this),m=l.length>>>0;for(var n=0;n<m;n++)if(j.call(k,l[n],n,l))return n;return-1},fill:function i(j){if(this==null)throw new TypeError("Array.prototype.fill called on null or undefined");var k=Object(this),l=k.length>>>0,m=arguments[1],n=m>>0,o=n<0?Math.max(l+n,0):Math.min(n,l),p=arguments[2],q=p===undefined?l:p>>0,r=q<0?Math.max(l+q,0):Math.min(q,l);while(o<r){k[o]=j;o++}return k}};f.exports=h}),null);
__d("ES6DatePrototype",[],(function a(b,c,d,e,f,g){function h(j){return(j<10?"0":"")+j}var i={toISOString:function j(){if(!isFinite(this))throw new Error("Invalid time value");var k=this.getUTCFullYear();k=(k<0?"-":k>9999?"+":"")+("00000"+Math.abs(k)).slice(0<=k&&k<=9999?-4:-6);return k+"-"+h(this.getUTCMonth()+1)+"-"+h(this.getUTCDate())+"T"+h(this.getUTCHours())+":"+h(this.getUTCMinutes())+":"+h(this.getUTCSeconds())+"."+(this.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"}};f.exports=i}),null);
__d("ES6Number",[],(function a(b,c,d,e,f,g){__p&&__p();var h=Math.pow(2,-52),i=Math.pow(2,53)-1,j=-1*i,k={isFinite:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l=="number"&&isFinite(l)}),isNaN:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l=="number"&&isNaN(l)}),isInteger:function l(m){return this.isFinite(m)&&Math.floor(m)===m},isSafeInteger:function l(m){return this.isFinite(m)&&m>=this.MIN_SAFE_INTEGER&&m<=this.MAX_SAFE_INTEGER&&Math.floor(m)===m},EPSILON:h,MAX_SAFE_INTEGER:i,MIN_SAFE_INTEGER:j};f.exports=k}),null);
__d("ES6Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={assign:function k(l){__p&&__p();if(l==null)throw new TypeError("Object.assign target cannot be null or undefined");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);
__d("ES7ArrayPrototype",["ES5ArrayPrototype","ES5Array"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=h.indexOf,k=i.isArray;function l(p){return Math.min(Math.max(m(p),0),Number.MAX_SAFE_INTEGER)}function m(p){var q=Number(p);return isFinite(q)&&q!==0?n(q)*Math.floor(Math.abs(q)):q}function n(p){return p>=0?1:-1}var o={includes:function p(q){"use strict";__p&&__p();if(q!==undefined&&k(this)&&!(typeof q==="number"&&isNaN(q)))return j.apply(this,arguments)!==-1;var r=Object(this),s=r.length?l(r.length):0;if(s===0)return false;var t=arguments.length>1?m(arguments[1]):0,u=t<0?Math.max(s+t,0):t,v=isNaN(q)&&typeof q==="number";while(u<s){var w=r[u];if(w===q||typeof w==="number"&&v&&isNaN(w))return true;u++}return false}};f.exports=o}),null);
__d("ES7Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};j.entries=function(k){if(k==null)throw new TypeError("Object.entries called on non-object");var l=[];for(var m in k)if(i.call(k,m))l.push([m,k[m]]);h(k,function(n){return l.push([n,k[n]])});return l};j.values=function(k){if(k==null)throw new TypeError("Object.values called on non-object");var l=[];for(var m in k)if(i.call(k,m))l.push(k[m]);h(k,function(n){return l.push(k[n])});return l};f.exports=j}),null);
__d("ES7StringPrototype",[],(function a(b,c,d,e,f,g){var h={};h.trimLeft=function(){return this.replace(/^\s+/,"")};h.trimRight=function(){return this.replace(/\s+$/,"")};f.exports=h}),null);
/**
 * License: https://www.facebook.com/legal/license/feHxB3UzKXp/
 */
__d("json3-3.3.2",[],(function aa(ba,ca,da,ea,fa,a){"use strict";__p&&__p();var b={},c={exports:b},d;function ga(){__p&&__p();(function(){__p&&__p();var e=typeof d==="function"&&d.amd,f={"function":true,object:true},g=f[typeof b]&&b&&!b.nodeType&&b,h=f[typeof window]&&window||this,i=g&&f[typeof c]&&c&&!c.nodeType&&typeof ba=="object"&&ba;if(i&&(i.global===i||i.window===i||i.self===i))h=i;function j(m,a){__p&&__p();m||(m=h.Object());a||(a=h.Object());var ma=m.Number||h.Number,na=m.String||h.String,oa=m.Object||h.Object,n=m.Date||h.Date,pa=m.SyntaxError||h.SyntaxError,qa=m.TypeError||h.TypeError,ra=m.Math||h.Math,k=m.JSON||h.JSON;if(typeof k=="object"&&k){a.stringify=k.stringify;a.parse=k.parse}var sa=oa.prototype,o=sa.toString,p,q,r,s=new n(-3509827334573292);try{s=s.getUTCFullYear()==-109252&&s.getUTCMonth()===0&&s.getUTCDate()===1&&s.getUTCHours()==10&&s.getUTCMinutes()==37&&s.getUTCSeconds()==6&&s.getUTCMilliseconds()==708}catch(t){}function u(J){__p&&__p();if(u[J]!==r)return u[J];var K;if(J=="bug-string-char-index")K="a"[0]!="a";else if(J=="json")K=u("json-stringify")&&u("json-parse");else{var L,M='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if(J=="json-stringify"){var N=a.stringify,O=typeof N=="function"&&s;if(O){(L=function(){return 1}).toJSON=L;try{O=N(0)==="0"&&N(new ma())==="0"&&N(new na())=='""'&&N(o)===r&&N(r)===r&&N()===r&&N(L)==="1"&&N([L])=="[1]"&&N([r])=="[null]"&&N(null)=="null"&&N([r,o,null])=="[null,null,null]"&&N({a:[L,true,false,null,"\0\b\n\f\r\t"]})==M&&N(null,L)==="1"&&N([1,2],null,1)=="[\n 1,\n 2\n]"&&N(new n(-864e13))=='"-271821-04-20T00:00:00.000Z"'&&N(new n(864e13))=='"+275760-09-13T00:00:00.000Z"'&&N(new n(-621987552e5))=='"-000001-01-01T00:00:00.000Z"'&&N(new n(-1))=='"1969-12-31T23:59:59.999Z"'}catch(t){O=false}}K=O}if(J=="json-parse"){var P=a.parse;if(typeof P=="function")try{if(P("0")===0&&!P(false)){L=P(M);var Q=L.a.length==5&&L.a[0]===1;if(Q){try{Q=!P('"\t"')}catch(t){}if(Q)try{Q=P("01")!==1}catch(t){}if(Q)try{Q=P("1.")!==1}catch(t){}}}}catch(t){Q=false}K=Q}}return u[J]=!!K}if(!u("json")){var v="[object Function]",ta="[object Date]",w="[object Number]",x="[object String]",y="[object Array]",ua="[object Boolean]",z=u("bug-string-char-index");if(!s)var A=ra.floor,va=[0,31,59,90,120,151,181,212,243,273,304,334],B=function(J,K){return va[K]+365*(J-1970)+A((J-1969+(K=+(K>1)))/4)-A((J-1901+K)/100)+A((J-1601+K)/400)};if(!(p=sa.hasOwnProperty))p=function(J){__p&&__p();var K={},L;if((K.__proto__=null,K.__proto__={toString:1},K).toString!=o)p=function(J){var M=this.__proto__,N=J in(this.__proto__=null,this);this.__proto__=M;return N};else{L=K.constructor;p=function(J){var M=(this.constructor||L).prototype;return J in this&&!(J in M&&this[J]===M[J])}}K=null;return p.call(this,J)};q=function(J,K){__p&&__p();var L=0,M,N,O;(M=function(){this.valueOf=0}).prototype.valueOf=0;N=new M();for(O in N)if(p.call(N,O))L++;M=N=null;if(!L){N=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];q=function(J,K){var P=o.call(J)==v,O,Q,R=!P&&typeof J.constructor!="function"&&f[typeof J.hasOwnProperty]&&J.hasOwnProperty||p;for(O in J)if(!(P&&O=="prototype")&&R.call(J,O))K(O);for(Q=N.length;O=N[--Q];R.call(J,O)&&K(O));}}else if(L==2)q=function(J,K){var N={},P=o.call(J)==v,O;for(O in J)if(!(P&&O=="prototype")&&!p.call(N,O)&&(N[O]=1)&&p.call(J,O))K(O)};else q=function(J,K){var P=o.call(J)==v,O,Q;for(O in J)if(!(P&&O=="prototype")&&p.call(J,O)&&!(Q=O==="constructor"))K(O);if(Q||p.call(J,O="constructor"))K(O)};return q(J,K)};if(!u("json-stringify")){var wa={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},xa="000000",C=function(J,K){return(xa+(K||0)).slice(-J)},ya="\\u00",za=function(J){__p&&__p();var K='"',L=0,M=J.length,N=!z||M>10,O=N&&(z?J.split(""):J);for(;L<M;L++){var P=J.charCodeAt(L);switch(P){case 8:case 9:case 10:case 12:case 13:case 34:case 92:K+=wa[P];break;default:if(P<32){K+=ya+C(2,P.toString(16));break}K+=N?O[L]:J.charAt(L)}}return K+'"'},D=function(J,K,L,M,N,O,P){__p&&__p();var Q,R,S,T,U,V,W,Ea,Fa,Ga,X,Y,Z,$,Ha,Ia;try{Q=K[J]}catch(t){}if(typeof Q=="object"&&Q){R=o.call(Q);if(R==ta&&!p.call(Q,"toJSON"))if(Q>-1/0&&Q<1/0){if(B){U=A(Q/864e5);for(S=A(U/365.2425)+1970-1;B(S+1,0)<=U;S++);for(T=A((U-B(S,0))/30.42);B(S,T+1)<=U;T++);U=1+U-B(S,T);V=(Q%864e5+864e5)%864e5;W=A(V/36e5)%24;Ea=A(V/6e4)%60;Fa=A(V/1e3)%60;Ga=V%1e3}else{S=Q.getUTCFullYear();T=Q.getUTCMonth();U=Q.getUTCDate();W=Q.getUTCHours();Ea=Q.getUTCMinutes();Fa=Q.getUTCSeconds();Ga=Q.getUTCMilliseconds()}Q=(S<=0||S>=1e4?(S<0?"-":"+")+C(6,S<0?-S:S):C(4,S))+"-"+C(2,T+1)+"-"+C(2,U)+"T"+C(2,W)+":"+C(2,Ea)+":"+C(2,Fa)+"."+C(3,Ga)+"Z"}else Q=null;else if(typeof Q.toJSON=="function"&&(R!=w&&R!=x&&R!=y||p.call(Q,"toJSON")))Q=Q.toJSON(J)}if(L)Q=L.call(K,J,Q);if(Q===null)return"null";R=o.call(Q);if(R==ua)return""+Q;else if(R==w)return Q>-1/0&&Q<1/0?""+Q:"null";else if(R==x)return za(""+Q);if(typeof Q=="object"){for($=P.length;$--;)if(P[$]===Q)throw qa();P.push(Q);X=[];Ha=O;O+=N;if(R==y){for(Z=0,$=Q.length;Z<$;Z++){Y=D(Z,Q,L,M,N,O,P);X.push(Y===r?"null":Y)}Ia=X.length?N?"[\n"+O+X.join(",\n"+O)+"\n"+Ha+"]":"["+X.join(",")+"]":"[]"}else{q(M||Q,function(J){var Y=D(J,Q,L,M,N,O,P);if(Y!==r)X.push(za(J)+":"+(N?" ":"")+Y)});Ia=X.length?N?"{\n"+O+X.join(",\n"+O)+"\n"+Ha+"}":"{"+X.join(",")+"}":"{}"}P.pop();return Ia}};a.stringify=function(J,K,L){__p&&__p();var M,N,O,P;if(f[typeof K]&&K)if((P=o.call(K))==v)N=K;else if(P==y){O={};for(var Q=0,R=K.length,S;Q<R;S=K[Q++],(P=o.call(S),P==x||P==w)&&(O[S]=1));}if(L)if((P=o.call(L))==w){if((L-=L%1)>0)for(M="",L>10&&(L=10);M.length<L;M+=" ");}else if(P==x)M=L.length<=10?L:L.slice(0,10);return D("",(S={},S[""]=J,S),N,O,M,"",[])}}if(!u("json-parse")){var Aa=na.fromCharCode,Ba={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},E,F,G=function(){E=F=null;throw pa()},H=function(){__p&&__p();var J=F,K=J.length,L,M,N,O,P;while(E<K){P=J.charCodeAt(E);switch(P){case 9:case 10:case 13:case 32:E++;break;case 123:case 125:case 91:case 93:case 58:case 44:L=z?J.charAt(E):J[E];E++;return L;case 34:for(L="@",E++;E<K;){P=J.charCodeAt(E);if(P<32)G();else if(P==92){P=J.charCodeAt(++E);switch(P){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:L+=Ba[P];E++;break;case 117:M=++E;for(N=E+4;E<N;E++){P=J.charCodeAt(E);if(!(P>=48&&P<=57||P>=97&&P<=102||P>=65&&P<=70))G()}L+=Aa("0x"+J.slice(M,E));break;default:G()}}else{if(P==34)break;P=J.charCodeAt(E);M=E;while(P>=32&&P!=92&&P!=34)P=J.charCodeAt(++E);L+=J.slice(M,E)}}if(J.charCodeAt(E)==34){E++;return L}G();default:M=E;if(P==45){O=true;P=J.charCodeAt(++E)}if(P>=48&&P<=57){if(P==48&&(P=J.charCodeAt(E+1),P>=48&&P<=57))G();O=false;for(;E<K&&(P=J.charCodeAt(E),P>=48&&P<=57);E++);if(J.charCodeAt(E)==46){N=++E;for(;N<K&&(P=J.charCodeAt(N),P>=48&&P<=57);N++);if(N==E)G();E=N}P=J.charCodeAt(E);if(P==101||P==69){P=J.charCodeAt(++E);if(P==43||P==45)E++;for(N=E;N<K&&(P=J.charCodeAt(N),P>=48&&P<=57);N++);if(N==E)G();E=N}return+J.slice(M,E)}if(O)G();if(J.slice(E,E+4)=="true"){E+=4;return true}else if(J.slice(E,E+5)=="false"){E+=5;return false}else if(J.slice(E,E+4)=="null"){E+=4;return null}G()}}return"$"},I=function(J){__p&&__p();var K,L;if(J=="$")G();if(typeof J=="string"){if((z?J.charAt(0):J[0])=="@")return J.slice(1);if(J=="["){K=[];for(;;L||(L=true)){J=H();if(J=="]")break;if(L)if(J==","){J=H();if(J=="]")G()}else G();if(J==",")G();K.push(I(J))}return K}else if(J=="{"){K={};for(;;L||(L=true)){J=H();if(J=="}")break;if(L)if(J==","){J=H();if(J=="}")G()}else G();if(J==","||typeof J!="string"||(z?J.charAt(0):J[0])!="@"||H()!=":")G();K[J.slice(1)]=I(H())}return K}G()}return J},Ca=function(J,K,L){var M=Da(J,K,L);if(M===r)delete J[K];else J[K]=M},Da=function(J,K,L){var M=J[K],N;if(typeof M=="object"&&M)if(o.call(M)==y)for(N=M.length;N--;)Ca(M,N,L);else q(M,function(K){Ca(M,K,L)});return L.call(J,K,M)};a.parse=function(J,K){var L,M;E=0;F=""+J;L=I(H());if(H()!="$")G();E=F=null;return K&&o.call(K)==v?Da((M={},M[""]=L,M),"",K):L}}}a.runInContext=j;return a}if(g&&!e)j(h,g);else{var k=h.JSON,ka=h.JSON3,la=false,l=j(h,h.JSON3={noConflict:function(){if(!la){la=true;h.JSON=k;h.JSON3=ka;k=ka=null}return l}});h.JSON={parse:l.parse,stringify:l.stringify}}if(e)d(function(){return l})}).call(this)}var ha=false,ia=function(){if(!ha){ha=true;ga()}return c.exports},ja=function(e){switch(e){case undefined:return ia()}};fa.exports=ja}),null);
__d("json3",["json3-3.3.2"],(function a(b,c,d,e,f,g){f.exports=c("json3-3.3.2")()}),null);
__d("ES",["json3","ES5ArrayPrototype","ES5FunctionPrototype","ES5StringPrototype","ES5Array","ES5Object","ES5Date","ES6Array","ES6Object","ES6ArrayPrototype","ES6DatePrototype","ES6Number","ES7StringPrototype","ES7Object","ES7ArrayPrototype"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w={}.toString,x={"JSON.stringify":h.stringify,"JSON.parse":h.parse},y={"Array.prototype":i,"Function.prototype":j,"String.prototype":k,Object:m,Array:l,Date:n},z={Object:p,"Array.prototype":q,"Date.prototype":r,Number:s,Array:o},A={Object:u,"String.prototype":t,"Array.prototype":v};function B(D){__p&&__p();for(var E in D){if(!Object.prototype.hasOwnProperty.call(D,E))continue;var F=D[E],G=E.split(".");if(G.length===2){var H=G[0],I=G[1];if(!H||!I||!window[H]||!window[H][I]){var J=H?window[H]:"-",K=H&&window[H]&&I?window[H][I]:"-";throw new Error("Unexpected state (t11975770): "+(H+", "+I+", "+J+", "+K+", "+E))}}var L=G.length===2?window[G[0]][G[1]]:window[E];for(var M in F){if(!Object.prototype.hasOwnProperty.call(F,M))continue;if(typeof F[M]!=="function"){x[E+"."+M]=F[M];continue}var N=L[M];x[E+"."+M]=N&&/\{\s+\[native code\]\s\}/.test(N)?N:F[M]}}}B(y);B(z);B(A);function C(D,E,F){var G=F?w.call(D).slice(8,-1)+".prototype":D,H=x[G+"."+E]||D[E];if(typeof H==="function"){for(var I=arguments.length,J=Array(I>3?I-3:0),K=3;K<I;K++)J[K-3]=arguments[K];return H.apply(D,J)}else if(H)return H;throw new Error("Polyfill "+G+" does not have implementation of "+E)}f.exports=C}),null);
__d("ES5FunctionPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.bind=function(i){if(typeof this!="function")throw new TypeError("Bind must be called on a function");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName="bound:"+(j.displayName||j.name||"(?)");l.toString=function m(){return"bound: "+j};return l};f.exports=h}),null);
__d("ie8DontEnum",[],(function a(b,c,d,e,f,g){var h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","prototypeIsEnumerable","constructor"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable("toString"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);
__d("ES5Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!="object"&&m!="function")throw new TypeError("Object prototype may only be a Object or null");k.prototype=l;return new k()};j.keys=function(l){__p&&__p();var m=typeof l;if(m!="object"&&m!="function"||l===null)throw new TypeError("Object.keys called on non-object");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);
__d("ES6Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={assign:function k(l){__p&&__p();if(l==null)throw new TypeError("Object.assign target cannot be null or undefined");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);
__d("sdk.babelHelpers",["ES5FunctionPrototype","ES5Object","ES6Object"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={},l=Object.prototype.hasOwnProperty;k.inherits=function(m,n){j.assign(m,n);m.prototype=i.create(n&&n.prototype);m.prototype.constructor=m;m.__superConstructor__=n;return n};k._extends=j.assign;k["extends"]=k._extends;k.objectWithoutProperties=function(m,n){var o={};for(var p in m){if(!l.call(m,p)||n.indexOf(p)>=0)continue;o[p]=m[p]}return o};k.taggedTemplateLiteralLoose=function(m,n){m.raw=n;return m};k.bind=h.bind;f.exports=k}),null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      (function(a,b){var c="keys",d="values",e="entries",f=function(){var l=h(Array),m=void 0;if(!l)m=function(){function m(n,o){"use strict";this.$ArrayIterator1=n;this.$ArrayIterator2=o;this.$ArrayIterator3=0}m.prototype.next=function(){"use strict";if(this.$ArrayIterator1==null)return{value:b,done:true};var n=this.$ArrayIterator1,o=this.$ArrayIterator1.length,p=this.$ArrayIterator3,q=this.$ArrayIterator2;if(p>=o){this.$ArrayIterator1=b;return{value:b,done:true}}this.$ArrayIterator3=p+1;if(q===c)return{value:p,done:false};else if(q===d)return{value:n[p],done:false};else if(q===e)return{value:[p,n[p]],done:false}};m.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};return m}();return{keys:l?function(n){return n.keys()}:function(n){return new m(n,c)},values:l?function(n){return n.values()}:function(n){return new m(n,d)},entries:l?function(n){return n.entries()}:function(n){return new m(n,e)}}}(),g=function(){var l=h(String),m=void 0;if(!l)m=function(){function m(n){"use strict";this.$StringIterator1=n;this.$StringIterator2=0}m.prototype.next=function(){"use strict";if(this.$StringIterator1==null)return{value:b,done:true};var n=this.$StringIterator2,o=this.$StringIterator1,p=o.length;if(n>=p){this.$StringIterator1=b;return{value:b,done:true}}var q=void 0,r=o.charCodeAt(n);if(r<55296||r>56319||n+1===p)q=o[n];else{var s=o.charCodeAt(n+1);if(s<56320||s>57343)q=o[n];else q=o[n]+o[n+1]}this.$StringIterator2=n+q.length;return{value:q,done:false}};m.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};return m}();return{keys:function n(){throw TypeError("Strings default iterator doesn't implement keys.")},values:l?function(n){return n[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()}:function(n){return new m(n)},entries:function n(){throw TypeError("Strings default iterator doesn't implement entries.")}}}();function h(l){return typeof l.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==="function"&&typeof l.prototype.values==="function"&&typeof l.prototype.keys==="function"&&typeof l.prototype.entries==="function"}function i(l,m){"use strict";this.$ObjectIterator1=l;this.$ObjectIterator2=m;this.$ObjectIterator3=ES("Object","keys",false,l);this.$ObjectIterator4=0}i.prototype.next=function(){"use strict";var l=this.$ObjectIterator3.length,m=this.$ObjectIterator4,n=this.$ObjectIterator2,o=this.$ObjectIterator3[m];if(m>=l){this.$ObjectIterator1=b;return{value:b,done:true}}this.$ObjectIterator4=m+1;if(n===c)return{value:o,done:false};else if(n===d)return{value:this.$ObjectIterator1[o],done:false};else if(n===e)return{value:[o,this.$ObjectIterator1[o]],done:false}};i.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};var j={keys:function l(m){return new i(m,c)},values:function l(m){return new i(m,d)},entries:function l(m){return new i(m,e)}};function k(l,m){if(typeof l==="string")return g[m||d](l);else if(ES("Array","isArray",false,l))return f[m||d](l);else if(l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"])return l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();else return j[m||e](l)}ES("Object","assign",false,k,{KIND_KEYS:c,KIND_VALUES:d,KIND_ENTRIES:e,keys:function l(m){return k(m,c)},values:function l(m){return k(m,d)},entries:function l(m){return k(m,e)},generic:j.entries});a.FB_enumerate=k})(typeof global==="undefined"?this:global);
(function(a,b){var c=a.window||a;function d(){return"f"+(Math.random()*(1<<30)).toString(16).replace(".","")}function e(j){var k=j?j.ownerDocument||j:document,l=k.defaultView||c;return!!(j&&(typeof l.Node==="function"?j instanceof l.Node:typeof j==="object"&&typeof j.nodeType==="number"&&typeof j.nodeName==="string"))}function f(j){var k=c[j];if(k==null)return true;if(typeof c.Symbol!=="function")return true;var l=k.prototype;return k==null||typeof k!=="function"||typeof l.clear!=="function"||new k().size!==0||typeof l.keys!=="function"||typeof l.forEach!=="function"}var g=a.FB_enumerate,h=function(){if(!f("Map"))return c.Map;var j="key",k="value",l="key+value",m="$map_",n=void 0,o="IE_HASH_";function h(A){"use strict";if(!t(this))throw new TypeError("Wrong map object type.");s(this);if(A!=null){var B=g(A),C=void 0;while(!(C=B.next()).done){if(!t(C.value))throw new TypeError("Expected iterable items to be pair objects.");this.set(C.value[0],C.value[1])}}}h.prototype.clear=function(){"use strict";s(this)};h.prototype.has=function(A){"use strict";var B=q(this,A);return!!(B!=null&&this._mapData[B])};h.prototype.set=function(A,B){"use strict";var C=q(this,A);if(C!=null&&this._mapData[C])this._mapData[C][1]=B;else{C=this._mapData.push([A,B])-1;r(this,A,C);this.size+=1}return this};h.prototype.get=function(A){"use strict";var B=q(this,A);if(B==null)return b;else return this._mapData[B][1]};h.prototype["delete"]=function(A){"use strict";var B=q(this,A);if(B!=null&&this._mapData[B]){r(this,A,b);this._mapData[B]=b;this.size-=1;return true}else return false};h.prototype.entries=function(){"use strict";return new p(this,l)};h.prototype.keys=function(){"use strict";return new p(this,j)};h.prototype.values=function(){"use strict";return new p(this,k)};h.prototype.forEach=function(A,B){"use strict";if(typeof A!=="function")throw new TypeError("Callback must be callable.");var C=ES(A,"bind",true,B||b),D=this._mapData;for(var E=0;E<D.length;E++){var F=D[E];if(F!=null)C(F[1],F[0],this)}};h.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this.entries()};function p(A,B){"use strict";if(!(t(A)&&A._mapData))throw new TypeError("Object is not a map.");if(ES([j,l,k],"indexOf",true,B)===-1)throw new Error("Invalid iteration kind.");this._map=A;this._nextIndex=0;this._kind=B}p.prototype.next=function(){"use strict";if(!this instanceof h)throw new TypeError("Expected to be called on a MapIterator.");var A=this._map,B=this._nextIndex,C=this._kind;if(A==null)return u(b,true);var D=A._mapData;while(B<D.length){var E=D[B];B+=1;this._nextIndex=B;if(E)if(C===j)return u(E[0],false);else if(C===k)return u(E[1],false);else if(C)return u(E,false)}this._map=b;return u(b,true)};p.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};function q(A,B){if(t(B)){var C=y(B);return C?A._objectIndex[C]:b}else{var D=m+B;if(typeof B==="string")return A._stringIndex[D];else return A._otherIndex[D]}}function r(A,B,C){var D=C==null;if(t(B)){var E=y(B);if(!E)E=z(B);if(D)delete A._objectIndex[E];else A._objectIndex[E]=C}else{var F=m+B;if(typeof B==="string")if(D)delete A._stringIndex[F];else A._stringIndex[F]=C;else if(D)delete A._otherIndex[F];else A._otherIndex[F]=C}}function s(A){A._mapData=[];A._objectIndex={};A._stringIndex={};A._otherIndex={};A.size=0}function t(A){return A!=null&&(typeof A==="object"||typeof A==="function")}function u(A,B){return{value:A,done:B}}h.__isES5=function(){try{Object.defineProperty({},"__.$#x",{});return true}catch(A){return false}}();function v(A){if(!h.__isES5||!Object.isExtensible)return true;else return Object.isExtensible(A)}function w(A){var B=void 0;switch(A.nodeType){case 1:B=A.uniqueID;break;case 9:B=A.documentElement.uniqueID;break;default:return null}if(B)return o+B;else return null}var x=d();function y(A){if(A[x])return A[x];else if(!h.__isES5&&A.propertyIsEnumerable&&A.propertyIsEnumerable[x])return A.propertyIsEnumerable[x];else if(!h.__isES5&&e(A)&&w(A))return w(A);else if(!h.__isES5&&A[x])return A[x]}var z=function(){var A=Object.prototype.propertyIsEnumerable,B=0;return function z(C){if(v(C)){B+=1;if(h.__isES5)Object.defineProperty(C,x,{enumerable:false,writable:false,configurable:false,value:B});else if(C.propertyIsEnumerable){C.propertyIsEnumerable=function(){return A.apply(this,arguments)};C.propertyIsEnumerable[x]=B}else if(e(C))C[x]=B;else throw new Error("Unable to set a non-enumerable property on object.");return B}else throw new Error("Non-extensible objects are not allowed as keys.")}}();return __annotator(h,{name:"Map"})}(),i=function(){if(!f("Set"))return c.Set;function i(k){"use strict";if(this==null||typeof this!=="object"&&typeof this!=="function")throw new TypeError("Wrong set object type.");j(this);if(k!=null){var l=g(k),m=void 0;while(!(m=l.next()).done)this.add(m.value)}}i.prototype.add=function(k){"use strict";this._map.set(k,k);this.size=this._map.size;return this};i.prototype.clear=function(){"use strict";j(this)};i.prototype["delete"]=function(k){"use strict";var l=this._map["delete"](k);this.size=this._map.size;return l};i.prototype.entries=function(){"use strict";return this._map.entries()};i.prototype.forEach=function(k){"use strict";var l=arguments[1],m=this._map.keys(),n=void 0;while(!(n=m.next()).done)k.call(l,n.value,n.value,this)};i.prototype.has=function(k){"use strict";return this._map.has(k)};i.prototype.values=function(){"use strict";return this._map.values()};i.prototype.keys=function(){"use strict";return this.values()};i.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this.values()};function j(k){k._map=new h();k.size=k._map.size}return __annotator(i,{name:"Set"})}();a.Map=h;a.Set=i})(typeof global==="undefined"?this:global);      __d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","an_https":"an.facebook.com","fbcdn_http":"static.xx.fbcdn.net","fbcdn_https":"static.xx.fbcdn.net","cdn_http":"staticxx.facebook.com","cdn_https":"staticxx.facebook.com"});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"3597473"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"js_sdk_mbasic_share_plugin_init":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"getloginstatus_tracking":{"rate":0.001},"xd_timeout":{"rate":4,"value":30000},"use_bundle":true,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPageView","AppEvents.logPurchase","AppEvents.setUserID","AppEvents.getUserID","AppEvents.clearUserID","AppEvents.updateUserProperties","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui","AppEvents.setAppVersion","AppEvents.getAppVersion","AppEvents.clearAppVersion","RankingService.hidePlugin","RankingService.showPlugin"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=42","XdBundleUrl":"\/connect\/xd_arbiter\/r\/lY4eZXm_YWu.js?version=42","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_loader{background-color:#f6f7f9;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #29487d;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f9;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}\n.fb_invisible_flow{display:inherit;height:0;overflow-x:hidden;width:0}.fb_mobile_overlay_active{height:100\u0025;overflow:hidden;position:fixed;width:100\u0025}.fb_shrink_active{opacity:1;transform:scale(1, 1);transition-duration:200ms;transition-timing-function:ease-out}.fb_shrink_active:active{opacity:.5;transform:scale(.75, .75)}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget","css:fb.css.customer_chat_plugin_iframe"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466,768691303149786,320528941393723],"sampleRate":500});      __d("DOMWrapper",[],(function a(b,c,d,e,f,g){var h,i,j={setRoot:function k(l){h=l},getRoot:function k(){return h||document.body},setWindow:function k(l){i=l},getWindow:function k(){return i||self}};f.exports=j}),null);
__d("dotAccess",[],(function a(b,c,d,e,f,g){function h(i,j,k){var l=j.split(".");do{var m=l.shift();i=i[m]||k&&(i[m]={})}while(l.length&&i);return i}f.exports=h}),null);
__d("guid",[],(function a(b,c,d,e,f,g){function h(){return"f"+(Math.random()*(1<<30)).toString(16).replace(".","")}f.exports=h}),18);
__d("wrapFunction",[],(function a(b,c,d,e,f,g){var h={},i=function i(j,k,l){return function(){var m=k in h?h[k](j,l):j;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m.apply(this,o)}};i.setWrapper=function(j,k){h[k]=j};f.exports=i}),null);
__d("GlobalCallback",["DOMWrapper","dotAccess","guid","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();var l,m,n={setPrefix:function o(p){l=i(h.getWindow(),p,true);m=p},create:function o(p,q){if(!l)this.setPrefix("__globalCallbacks");var r=j();l[r]=k(p,"entry",q||"GlobalCallback");return m+"."+r},remove:function o(p){var q=p.substring(m.length+1);delete l[q]}};f.exports=n}),null);
__d("sprintf",[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(){return String(k[m++])})}f.exports=h}),null);
__d("Log",["sprintf"],(function a(b,c,d,e,f,g,h){var i={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function j(l,m){var n=Array.prototype.slice.call(arguments,2),o=h.apply(null,n),p=window.console;if(p&&k.level>=m)p[l in p?l:"log"](o)}var k={level:-1,Level:i,debug:ES(j,"bind",true,null,"debug",i.DEBUG),info:ES(j,"bind",true,null,"info",i.INFO),warn:ES(j,"bind",true,null,"warn",i.WARNING),error:ES(j,"bind",true,null,"error",i.ERROR)};f.exports=k}),null);
__d("ObservableMixin",[],(function a(b,c,d,e,f,g){__p&&__p();function h(){this.__observableEvents={}}h.prototype={inform:function i(j){__p&&__p();var k=Array.prototype.slice.call(arguments,1),l=Array.prototype.slice.call(this.getSubscribers(j));for(var m=0;m<l.length;m++){if(l[m]===null)continue;try{l[m].apply(this,k)}catch(n){setTimeout(function(){throw n},0)}}return this},getSubscribers:function i(j){return this.__observableEvents[j]||(this.__observableEvents[j]=[])},clearSubscribers:function i(j){if(j)this.__observableEvents[j]=[];return this},clearAllSubscribers:function i(){this.__observableEvents={};return this},subscribe:function i(j,k){var l=this.getSubscribers(j);l.push(k);return this},unsubscribe:function i(j,k){var l=this.getSubscribers(j);for(var m=0;m<l.length;m++)if(l[m]===k){l.splice(m,1);break}return this},monitor:function i(j,k){if(!k()){var i=ES(function(l){if(k.apply(k,arguments))this.unsubscribe(j,i)},"bind",true,this);this.subscribe(j,i)}return this}};f.exports=h}),null);
__d("UrlMap",["UrlMapConfig"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={resolve:function j(k,l){var m=typeof l=="undefined"?location.protocol.replace(":",""):l?"https":"http";if(k in h)return m+"://"+h[k];if(typeof l=="undefined"&&k+"_"+m in h)return m+"://"+h[k+"_"+m];if(l!==true&&k+"_http"in h)return"http://"+h[k+"_http"];if(l!==false&&k+"_https"in h)return"https://"+h[k+"_https"]}};f.exports=i}),null);
__d("QueryString",[],(function a(b,c,d,e,f,g){__p&&__p();function h(l){__p&&__p();var m=[];ES(ES("Object","keys",false,l).sort(),"forEach",true,function(n){var o=l[n];if(typeof o==="undefined")return;if(o===null){m.push(n);return}m.push(encodeURIComponent(n)+"="+encodeURIComponent(o))});return m.join("&")}function i(l,m){__p&&__p();var n={};if(l==="")return n;var o=l.split("&");for(var p=0;p<o.length;p++){var q=o[p].split("=",2),r=decodeURIComponent(q[0]);if(m&&Object.prototype.hasOwnProperty.call(n,r))throw new URIError("Duplicate key: "+r);n[r]=q.length===2?decodeURIComponent(q[1]):null}return n}function j(l,m){return l+(ES(l,"indexOf",true,"?")!==-1?"&":"?")+(typeof m==="string"?m:k.encode(m))}var k={encode:h,decode:i,appendToUrl:j};f.exports=k}),null);
__d("ManagedError",[],(function a(b,c,d,e,f,g){function h(i,j){Error.prototype.constructor.call(this,i);this.message=i;this.innerError=j}h.prototype=new Error();h.prototype.constructor=h;f.exports=h}),null);
__d("AssertionError",["ManagedError"],(function a(b,c,d,e,f,g,h){function i(j){h.prototype.constructor.apply(this,arguments)}i.prototype=new h();i.prototype.constructor=i;f.exports=i}),null);
__d("Assert",["AssertionError","sprintf"],(function a(b,c,d,e,f,g,h,i){__p&&__p();function j(o,p){if(typeof o!=="boolean"||!o)throw new h(p);return o}function k(o,p,q){__p&&__p();var r;if(p===undefined)r="undefined";else if(p===null)r="null";else{var s=Object.prototype.toString.call(p);r=/\s(\w*)/.exec(s)[1].toLowerCase()}j(ES(o,"indexOf",true,r)!==-1,q||i("Expression is of type %s, not %s",r,o));return p}function l(o,p,q){j(p instanceof o,q||"Expression not instance of type");return p}function m(o,p){n["is"+o]=p;n["maybe"+o]=function(q,r){if(q!=null)p(q,r)}}var n={isInstanceOf:l,isTrue:j,isTruthy:function o(p,q){return j(!!p,q)},type:k,define:function o(p,q){p=p.substring(0,1).toUpperCase()+p.substring(1).toLowerCase();m(p,function(r,s){j(q(r),s)})}};ES(["Array","Boolean","Date","Function","Null","Number","Object","Regexp","String","Undefined"],"forEach",true,function(o){m(o,ES(k,"bind",true,null,o.toLowerCase()))});f.exports=n}),null);
__d("Type",["Assert"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(){var m=this.__mixins;if(m)for(var n=0;n<m.length;n++)m[n].apply(this,arguments)}function j(m,n){if(n instanceof m)return true;if(n instanceof i)for(var o=0;o<n.__mixins.length;o++)if(n.__mixins[o]==m)return true;return false}function k(m,n){__p&&__p();var o=m.prototype;if(!ES("Array","isArray",false,n))n=[n];for(var p=0;p<n.length;p++){var q=n[p];if(typeof q=="function"){o.__mixins.push(q);q=q.prototype}ES(ES("Object","keys",false,q),"forEach",true,function(r){o[r]=q[r]})}}function l(m,n,o){__p&&__p();var p=n&&Object.prototype.hasOwnProperty.call(n,"constructor")?n.constructor:function(){this.parent.apply(this,arguments)};h.isFunction(p);if(m&&m.prototype instanceof i===false)throw new Error("parent type does not inherit from Type");m=m||i;function q(){}q.prototype=m.prototype;p.prototype=new q();if(n)ES("Object","assign",false,p.prototype,n);p.prototype.constructor=p;p.parent=m;p.prototype.__mixins=m.prototype.__mixins?Array.prototype.slice.call(m.prototype.__mixins):[];if(o)k(p,o);p.prototype.parent=function(){this.parent=m.prototype.parent;m.apply(this,arguments)};p.prototype.parentCall=function(r){return m.prototype[r].apply(this,Array.prototype.slice.call(arguments,1))};p.extend=function(n,o){return l(this,n,o)};return p}ES("Object","assign",false,i.prototype,{instanceOf:function m(n){return j(n,this)}});ES("Object","assign",false,i,{extend:function m(n,o){return typeof n==="function"?l.apply(null,arguments):l(null,n,o)},instanceOf:j});f.exports=i}),null);
__d("sdk.Model",["Type","ObservableMixin"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=h.extend({constructor:function k(l){__p&&__p();this.parent();var m={},n=this;ES(ES("Object","keys",false,l),"forEach",true,function(o){m[o]=l[o];n["set"+o]=function(p){if(p===m[o])return this;m[o]=p;n.inform(o+".change",p);return n};n["get"+o]=function(){return m[o]}})}},i);f.exports=j}),null);
__d("sdk.Runtime",["sdk.Model","JSSDKRuntimeConfig"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},k=new h({AccessToken:"",AutoLogAppEvents:false,ClientID:"",CookieUserID:"",Environment:j.UNKNOWN,Initialized:false,IsVersioned:false,KidDirectedSite:undefined,Locale:i.locale,LoggedIntoFacebook:undefined,LoginStatus:undefined,Revision:i.revision,Rtl:i.rtl,Scope:undefined,Secure:undefined,UseCookie:false,UserID:"",Version:undefined});ES("Object","assign",false,k,{ENVIRONMENTS:j,isEnvironment:function l(m){var n=this.getEnvironment();return(m|n)===n},isCanvasEnvironment:function l(){return this.isEnvironment(j.CANVAS)||this.isEnvironment(j.PAGETAB)}});(function(){var l=/app_runner/.test(window.name)?j.PAGETAB:/iframe_canvas/.test(window.name)?j.CANVAS:j.UNKNOWN;if((l|j.PAGETAB)===l)l|=j.CANVAS;k.setEnvironment(l)})();f.exports=k}),null);
__d("sdk.Cookie",["QueryString","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=null;function k(n,o,p){n=n+i.getClientID();var q=j&&j!==".";if(q){document.cookie=n+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;";document.cookie=n+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;domain="+location.hostname+";"}var r=new Date(p).toGMTString();document.cookie=n+"="+o+(o&&p===0?"":"; expires="+r)+"; path=/"+(q?"; domain="+j:"")}function l(n){n=n+i.getClientID();var o=new RegExp("\\b"+n+"=([^;]*)\\b");return o.test(document.cookie)?RegExp.$1:null}var m={setDomain:function n(o){j=o;var p=h.encode({base_domain:j&&j!=="."?j:""}),q=new Date();q.setFullYear(q.getFullYear()+1);k("fbm_",p,q.getTime())},getDomain:function n(){return j},loadMeta:function n(){var o=l("fbm_");if(o){var p=h.decode(o);if(!j)j=p.base_domain;return p}},loadSignedRequest:function n(){return l("fbsr_")},setSignedRequestCookie:function n(o,p){if(!o)throw new Error("Value passed to Cookie.setSignedRequestCookie was empty.");k("fbsr_",o,p)},clearSignedRequestCookie:function n(){k("fbsr_","",0)},setRaw:k,getRaw:l};f.exports=m}),null);
__d("Miny",[],(function a(b,c,d,e,f,g){__p&&__p();var h="Miny1",i="wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(""),j={encode:function k(l){__p&&__p();if(/^$|[~\\]|__proto__/.test(l))return l;var m=l.match(/\w+|\W+/g),n,o=ES("Object","create",false,null);for(n=0;n<m.length;n++)o[m[n]]=(o[m[n]]||0)+1;var p=ES("Object","keys",false,o);p.sort(function(s,t){return o[t]-o[s]});for(n=0;n<p.length;n++){var q=(n-n%32)/32;o[p[n]]=q?q.toString(32)+i[n%32]:i[n%32]}var r="";for(n=0;n<m.length;n++)r+=o[m[n]];p.unshift(h,p.length);p.push(r);return p.join("~")}};f.exports=j}),null);
__d("sdk.UA",[],(function a(b,c,d,e,f,g){__p&&__p();var h=navigator.userAgent,i={iphone:/\b(iPhone|iP[ao]d)/.test(h),ipad:/\b(iP[ao]d)/.test(h),android:/Android/i.test(h),nativeApp:/FBAN\/\w+;/i.test(h),nativeAndroidApp:/FB_IAB\/\w+;/i.test(h),nativeInstagramApp:/Instagram/i.test(h)},j=/Mobile/i.test(h),k={ie:"",firefox:"",chrome:"",webkit:"",osx:"",edge:"",operaMini:"",ucWeb:""},l=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(h);if(l){k.ie=l[1]?parseFloat(l[1]):l[4]?parseFloat(l[4]):"";k.firefox=l[2]||"";k.webkit=l[3]||"";if(l[3]){var m=/(?:Chrome\/(\d+\.\d+))/.exec(h);k.chrome=m?m[1]:"";var n=/(?:Edge\/(\d+\.\d+))/.exec(h);k.edge=n?n[1]:""}}var o=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(h);if(o)k.osx=o[1];var p=/(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(h);if(p)k.operaMini=p[1];var q=/(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(h);if(q)k.ucWeb=q[1]||"2.0";function r(t){return ES(t.split("."),"map",true,function(u){return parseFloat(u)})}var s={};ES(ES("Object","keys",false,k),"map",true,function(t){s[t]=function(){return parseFloat(k[t])};s[t].getVersionParts=function(){return r(k[t])}});ES(ES("Object","keys",false,i),"map",true,function(t){s[t]=function(){return i[t]}});s.mobile=function(){return i.iphone||i.ipad||i.android||j};s.mTouch=function(){return i.android||i.iphone||i.ipad};s.inAppBrowser=function(){return i.nativeApp||i.nativeAndroidApp||i.nativeInstagramApp};s.mBasic=function(){return!!(k.ucWeb||k.operaMini)};f.exports=s}),null);
__d("getBlankIframeSrc",["sdk.UA"],(function a(b,c,d,e,f,g,h){function i(){return h.ie()<10?"javascript:false":"about:blank"}f.exports=i}),null);
__d("insertIframe",["GlobalCallback","getBlankIframeSrc","guid"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();function k(l){__p&&__p();l.id=l.id||j();l.name=l.name||j();var m=false,n=false,o=function o(){if(m&&!n){n=true;l.onload&&l.onload(l.root.firstChild)}},p=h.create(o);if(document.attachEvent){var q='<iframe id="'+l.id+'" name="'+l.name+'"'+(l.title?' title="'+l.title+'"':"")+(l.className?' class="'+l.className+'"':"")+' style="border:none;'+(l.width?"width:"+l.width+"px;":"")+(l.height?"height:"+l.height+"px;":"")+'" src="'+i()+'" frameborder="0" scrolling="no" allowtransparency="true" onload="'+p+'()"></iframe>';l.root.innerHTML='<iframe src="'+i()+'" frameborder="0" scrolling="no" style="height:1px"></iframe>';m=true;setTimeout(function(){l.root.innerHTML=q;l.root.firstChild.src=l.url;l.onInsert&&l.onInsert(l.root.firstChild)},0)}else{var r=document.createElement("iframe");r.id=l.id;r.name=l.name;r.onload=o;r.scrolling="no";r.style.border="none";r.style.overflow="hidden";if(l.title)r.title=l.title;if(l.className)r.className=l.className;if(l.height!==undefined)r.style.height=l.height+"px";if(l.width!==undefined)if(l.width=="100%")r.style.width=l.width;else r.style.width=l.width+"px";l.root.appendChild(r);m=true;r.src=l.url;l.onInsert&&l.onInsert(r)}}f.exports=k}),null);
__d("sdk.domReady",["sdk.Runtime"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j="readyState"in document?/loaded|complete/.test(document.readyState):!!document.body;function k(){if(!i)return;var n;while(n=i.shift())n();i=null}function l(n){if(i){i.push(n);return}else n()}if(!j){i=[];if(document.addEventListener){document.addEventListener("DOMContentLoaded",k,false);window.addEventListener("load",k,false)}else if(document.attachEvent){document.attachEvent("onreadystatechange",k);window.attachEvent("onload",k)}if(document.documentElement.doScroll&&window==window.top){var m=function m(){try{h.getRtl()?document.documentElement.doScroll("right"):document.documentElement.doScroll("left")}catch(n){setTimeout(m,0);return}k()};m()}}f.exports=l}),3);
__d("sdk.Content",["Log","sdk.UA","sdk.domReady"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k,l,m={append:function n(o,p){__p&&__p();if(!p)if(!k){k=p=document.getElementById("fb-root");if(!p){h.warn('The "fb-root" div has not been created, auto-creating');k=p=document.createElement("div");p.id="fb-root";if(i.ie()||!document.body)j(function(){document.body.appendChild(p)});else document.body.appendChild(p)}p.className+=" fb_reset"}else p=k;if(typeof o=="string"){var q=document.createElement("div");p.appendChild(q).innerHTML=o;return q}else return p.appendChild(o)},appendHidden:function n(o){if(!l){var l=document.createElement("div"),p=l.style;p.position="absolute";p.top="-10000px";p.width=p.height=0;l=m.append(l)}return m.append(o,l)},submitToTarget:function n(o,p){__p&&__p();var q=document.createElement("form");q.action=o.url;q.target=o.target;q.method=p?"GET":"POST";m.appendHidden(q);for(var r in o.params)if(Object.prototype.hasOwnProperty.call(o.params,r)){var s=o.params[r];if(s!==null&&s!==undefined){var t=document.createElement("input");t.name=r;t.value=s;q.appendChild(t)}}q.submit();q.parentNode.removeChild(q)}};f.exports=m}),null);
__d("sdk.Impressions",["sdk.Content","Miny","QueryString","sdk.Runtime","UrlMap","getBlankIframeSrc","guid","insertIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){__p&&__p();function p(r){__p&&__p();var s=k.getClientID();if(!r.api_key&&s)r.api_key=s;r.kid_directed_site=k.getKidDirectedSite();var t=l.resolve("www",true)+"/impression.php/"+n()+"/",u=j.appendToUrl(t,r);if(u.length>2e3)if(r.payload&&typeof r.payload==="string"){var v=i.encode(r.payload);if(v&&v.length<r.payload.length){r.payload=v;u=j.appendToUrl(t,r)}}if(u.length<=2e3){var w=new Image();w.src=u}else{var x=n(),y=h.appendHidden("");o({url:m(),root:y,name:x,className:"fb_hidden fb_invisible",onload:function z(){y.parentNode.removeChild(y)}});h.submitToTarget({url:t,target:x,params:r})}}var q={log:function r(s,t){if(!t.source)t.source="jssdk";p({lid:s,payload:ES("JSON","stringify",false,t)})},impression:p};f.exports=q}),null);
__d("sdk.Scribe",["QueryString","sdk.Runtime","UrlMap"],(function a(b,c,d,e,f,g,h,i,j){function k(m,n){if(typeof n.extra=="object")n.extra.revision=i.getRevision();new Image().src=h.appendToUrl(j.resolve("www",true)+"/common/scribe_endpoint.php",{c:m,m:ES("JSON","stringify",false,n)})}var l={log:k};f.exports=l}),null);
__d("Base64",[],(function a(b,c,d,e,f,g){__p&&__p();var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function i(m){m=m.charCodeAt(0)<<16|m.charCodeAt(1)<<8|m.charCodeAt(2);return String.fromCharCode(h.charCodeAt(m>>>18),h.charCodeAt(m>>>12&63),h.charCodeAt(m>>>6&63),h.charCodeAt(m&63))}var j=">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";function k(m){m=j.charCodeAt(m.charCodeAt(0)-43)<<18|j.charCodeAt(m.charCodeAt(1)-43)<<12|j.charCodeAt(m.charCodeAt(2)-43)<<6|j.charCodeAt(m.charCodeAt(3)-43);return String.fromCharCode(m>>>16,m>>>8&255,m&255)}var l={encode:function m(n){n=unescape(encodeURI(n));var o=(n.length+2)%3;n=(n+"\0\0".slice(o)).replace(/[\s\S]{3}/g,i);return n.slice(0,n.length+o-2)+"==".slice(o)},decode:function m(n){n=n.replace(/[^A-Za-z0-9+\/]/g,"");var o=n.length+3&3;n=(n+"AAA".slice(o)).replace(/..../g,k);n=n.slice(0,n.length+o-3);try{return decodeURIComponent(escape(n))}catch(p){throw new Error("Not valid UTF-8")}},encodeObject:function m(n){return l.encode(ES("JSON","stringify",false,n))},decodeObject:function m(n){return ES("JSON","parse",false,l.decode(n))},encodeNums:function m(n){return String.fromCharCode.apply(String,ES(n,"map",true,function(o){return h.charCodeAt((o|-(o>63))&-(o>0)&63)}))}};f.exports=l}),null);
__d("sdk.SignedRequest",["Base64"],(function a(b,c,d,e,f,g,h){function i(k){if(!k)return null;var l=k.split(".",2)[1].replace(/\-/g,"+").replace(/\_/g,"/");return h.decodeObject(l)}var j={parse:i};f.exports=j}),null);
__d("URIRFC3986",[],(function a(b,c,d,e,f,g){__p&&__p();var h=new RegExp("^([^:/?#]+:)?(//([^\\\\/?#@]*@)?(\\[[A-Fa-f0-9:.]+\\]|[^\\/?#:]*)(:[0-9]*)?)?([^?#]*)(\\?[^#]*)?(#.*)?"),i={parse:function j(k){__p&&__p();if(ES(k,"trim",true)==="")return null;var l=k.match(h);if(l==null)return null;var m={};m.uri=l[0]?l[0]:null;m.scheme=l[1]?l[1].substr(0,l[1].length-1):null;m.authority=l[2]?l[2].substr(2):null;m.userinfo=l[3]?l[3].substr(0,l[3].length-1):null;m.host=l[2]?l[4]:null;m.port=l[5]?l[5].substr(1)?parseInt(l[5].substr(1),10):null:null;m.path=l[6]?l[6]:null;m.query=l[7]?l[7].substr(1):null;m.fragment=l[8]?l[8].substr(1):null;m.isGenericURI=m.authority===null&&!!m.scheme;return m}};f.exports=i}),18);
__d("createObjectFrom",[],(function a(b,c,d,e,f,g){function h(i,j){var k={},l=ES("Array","isArray",false,j);if(j===undefined)j=true;for(var m=i.length-1;m>=0;m--)k[i[m]]=l?j[m]:j;return k}f.exports=h}),18);
__d("URISchemes",["createObjectFrom"],(function a(b,c,d,e,f,g,h){var i=h(["blob","cmms","fb","fba","fbatwork","fb-ama","fb-workchat","fb-messenger","fb-messenger-public","fb-messenger-group-thread","fb-page-messages","fb-pma","fbcf","fbconnect","fbinternal","fbmobilehome","fbrpc","file","ftp","http","https","mailto","ms-app","intent","itms","itms-apps","itms-services","market","svn+ssh","fbstaging","tel","sms","pebblejs","sftp","whatsapp","moments","flash","fblite","chrome-extension","webcal","fb124024574287414","fb124024574287414rc","fb124024574287414master","fb1576585912599779","fb929757330408142","designpack","fbapi20130214","fb1196383223757595","tbauth","oculus","oculus.store","skype","callto"]),j={isAllowed:function k(l){if(!l)return true;return Object.prototype.hasOwnProperty.call(i,l.toLowerCase())}};f.exports=j}),18);
__d("eprintf",[],(function a(b,c,d,e,f,g){__p&&__p();function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=ES(k,"map",true,function(p){return String(p)}),n=i.split("%s").length-1;if(n!==m.length)return h("eprintf args number mismatch: %s",ES("JSON","stringify",false,[i].concat(m)));var o=0;return i.replace(/%s/g,function(){return String(m[o++])})}f.exports=h}),null);
__d("ex",["eprintf"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];var n=ES(l,"map",true,function(p){return String(p)}),o=j.split("%s").length-1;if(o!==n.length)return i("ex args number mismatch: %s",ES("JSON","stringify",false,[j].concat(n)));return i._prefix+ES("JSON","stringify",false,[j].concat(n))+i._suffix}i._prefix="<![EX[";i._suffix="]]>";f.exports=i}),null);
__d("invariant",["ex","sprintf"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j=h;function k(l,m){__p&&__p();if(!l){var n=void 0;if(m===undefined)n=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{for(var o=arguments.length,p=Array(o>2?o-2:0),q=2;q<o;q++)p[q-2]=arguments[q];n=new Error(j.apply(undefined,[m].concat(p)));n.name="Invariant Violation";n.messageWithParams=[m].concat(p)}n.framesToPop=1;throw n}}f.exports=k}),null);
__d("setHostSubdomain",[],(function a(b,c,d,e,f,g){function h(i,j){var k=i.split(".");if(k.length<3)k.unshift(j);else k[0]=j;return k.join(".")}f.exports=h}),null);
__d("URIBase",["URIRFC3986","URISchemes","ex","invariant","setHostSubdomain"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m=new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),n=new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)");function o(r,s,t,u){__p&&__p();if(!s)return true;if(s instanceof q){r.setProtocol(s.getProtocol());r.setDomain(s.getDomain());r.setPort(s.getPort());r.setPath(s.getPath());r.setQueryData(u.deserialize(u.serialize(s.getQueryData())));r.setFragment(s.getFragment());r.setIsGeneric(s.getIsGeneric());r.setForceFragmentSeparator(s.getForceFragmentSeparator());return true}s=ES(s.toString(),"trim",true);var v=h.parse(s)||{fragment:null,scheme:null};if(!t&&!i.isAllowed(v.scheme))return false;r.setProtocol(v.scheme||"");if(!t&&m.test(v.host||""))return false;r.setDomain(v.host||"");r.setPort(v.port||"");r.setPath(v.path||"");if(t)r.setQueryData(u.deserialize(v.query||"")||{});else try{r.setQueryData(u.deserialize(v.query||"")||{})}catch(w){return false}r.setFragment(v.fragment||"");if(v.fragment==="")r.setForceFragmentSeparator(true);r.setIsGeneric(v.isGenericURI||false);if(v.userinfo!==null)if(t)throw new Error(j("URI.parse: invalid URI (userinfo is not allowed in a URI): %s",r.toString()));else return false;if(!r.getDomain()&&ES(r.getPath(),"indexOf",true,"\\")!==-1)if(t)throw new Error(j("URI.parse: invalid URI (no domain but multiple back-slashes): %s",r.toString()));else return false;if(!r.getProtocol()&&n.test(s))if(t)throw new Error(j("URI.parse: invalid URI (unsafe protocol-relative URLs): %s",r.toString()));else return false;if(r.getDomain()&&r.getPath()&&!ES(r.getPath(),"startsWith",true,"/"))if(t)throw new Error(j("URI.parse: invalid URI (domain and path where path lacks leading slash): %s",r.toString()));else return false;return true}var p=[];q.isValidURI=function(r,s){"use strict";return o(new q(null,s),r,false,s)};function q(r,s){"use strict";__p&&__p();s||k(0);this.$URIBase9=s;this.$URIBase7="";this.$URIBase1="";this.$URIBase6="";this.$URIBase5="";this.$URIBase3="";this.$URIBase4=false;this.$URIBase8={};this.$URIBase2=false;o(this,r,true,s)}q.prototype.setProtocol=function(r){"use strict";i.isAllowed(r)||k(0);this.$URIBase7=r;return this};q.prototype.getProtocol=function(){"use strict";return(this.$URIBase7||"").toLowerCase()};q.prototype.setSecure=function(r){"use strict";return this.setProtocol(r?"https":"http")};q.prototype.isSecure=function(){"use strict";return this.getProtocol()==="https"};q.prototype.setDomain=function(r){"use strict";if(m.test(r))throw new Error(j("URI.setDomain: unsafe domain specified: %s for url %s",r,this.toString()));this.$URIBase1=r;return this};q.prototype.getDomain=function(){"use strict";return this.$URIBase1};q.prototype.setPort=function(r){"use strict";this.$URIBase6=r;return this};q.prototype.getPort=function(){"use strict";return this.$URIBase6};q.prototype.setPath=function(r){"use strict";this.$URIBase5=r;return this};q.prototype.getPath=function(){"use strict";return this.$URIBase5};q.prototype.addQueryData=function(r,s){"use strict";if(Object.prototype.toString.call(r)==="[object Object]")ES("Object","assign",false,this.$URIBase8,r);else this.$URIBase8[r]=s;return this};q.prototype.setQueryData=function(r){"use strict";this.$URIBase8=r;return this};q.prototype.getQueryData=function(){"use strict";return this.$URIBase8};q.prototype.removeQueryData=function(r){"use strict";if(!ES("Array","isArray",false,r))r=[r];for(var s=0,t=r.length;s<t;++s)delete this.$URIBase8[r[s]];return this};q.prototype.setFragment=function(r){"use strict";this.$URIBase3=r;this.setForceFragmentSeparator(false);return this};q.prototype.getFragment=function(){"use strict";return this.$URIBase3};q.prototype.setForceFragmentSeparator=function(r){"use strict";this.$URIBase2=r;return this};q.prototype.getForceFragmentSeparator=function(){"use strict";return this.$URIBase2};q.prototype.setIsGeneric=function(r){"use strict";this.$URIBase4=r;return this};q.prototype.getIsGeneric=function(){"use strict";return this.$URIBase4};q.prototype.isEmpty=function(){"use strict";return!(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||ES("Object","keys",false,this.getQueryData()).length>0||this.getFragment())};q.prototype.toString=function(){"use strict";var r=this;for(var s=0;s<p.length;s++)r=p[s](r);return r.$URIBase10()};q.prototype.$URIBase10=function(){"use strict";__p&&__p();var r="",s=this.getProtocol();if(s)r+=s+":"+(this.getIsGeneric()?"":"//");var t=this.getDomain();if(t)r+=t;var u=this.getPort();if(u)r+=":"+u;var v=this.getPath();if(v)r+=v;else if(r)r+="/";var w=this.$URIBase9.serialize(this.getQueryData());if(w)r+="?"+w;var x=this.getFragment();if(x)r+="#"+x;else if(this.getForceFragmentSeparator())r+="#";return r};q.registerFilter=function(r){"use strict";p.push(r)};q.prototype.getOrigin=function(){"use strict";var r=this.getPort();return this.getProtocol()+"://"+this.getDomain()+(r?":"+r:"")};q.prototype.getQualifiedURIBase=function(){"use strict";return new q(this,this.$URIBase9).qualify()};q.prototype.qualify=function(){"use strict";if(!this.getDomain()){var r=new q(window.location.href,this.$URIBase9);this.setProtocol(r.getProtocol()).setDomain(r.getDomain()).setPort(r.getPort())}return this};q.prototype.setSubdomain=function(r){"use strict";var s=this.qualify().getDomain();return this.setDomain(l(s,r))};q.prototype.getSubdomain=function(){"use strict";if(!this.getDomain())return"";var r=this.getDomain().split(".");if(r.length<=2)return"";else return r[0]};f.exports=q}),null);
__d("sdk.URI",["Assert","QueryString","URIBase"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k,l,m=/\.facebook\.com$/,n={serialize:function p(q){return q?i.encode(q):""},deserialize:function p(q){return q?i.decode(q):{}}};k=babelHelpers.inherits(o,j);l=k&&k.prototype;function o(p){"use strict";h.isString(p,"The passed argument was of invalid type.");l.constructor.call(this,p,n)}o.prototype.isFacebookURI=function(){"use strict";return m.test(this.getDomain())};o.prototype.valueOf=function(){"use strict";return this.toString()};o.isValidURI=function(p){"use strict";return j.isValidURI(p,n)};f.exports=o}),null);
__d("Queue",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};function i(j){"use strict";this._opts=babelHelpers["extends"]({interval:0,processor:null},j);this._queue=[];this._stopped=true}i.prototype._dispatch=function(j){"use strict";__p&&__p();if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error("No processor available")}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(ES(this._dispatch,"bind",true,this),this._opts.interval)}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift())};i.prototype.enqueue=function(j){"use strict";if(this._opts.processor&&!this._stopped)this._opts.processor.call(this,j);else this._queue.push(j);return this};i.prototype.start=function(j){"use strict";if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this};i.prototype.isStarted=function(){"use strict";return!this._stopped};i.prototype.dispatch=function(){"use strict";this._dispatch(true)};i.prototype.stop=function(j){"use strict";this._stopped=true;if(j)clearTimeout(this._timeout);return this};i.prototype.merge=function(j,k){"use strict";this._queue[k?"unshift":"push"].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this};i.prototype.getLength=function(){"use strict";return this._queue.length};i.get=function(j,k){"use strict";var l;if(j in h)l=h[j];else l=h[j]=new i(k);return l};i.exists=function(j){"use strict";return j in h};i.remove=function(j){"use strict";return delete h[j]};f.exports=i}),null);
__d("emptyFunction",[],(function a(b,c,d,e,f,g){__p&&__p();function h(j){return function(){return j}}var i=function i(){};i.thatReturns=h;i.thatReturnsFalse=h(false);i.thatReturnsTrue=h(true);i.thatReturnsNull=h(null);i.thatReturnsThis=function(){return this};i.thatReturnsArgument=function(j){return j};f.exports=i}),null);
__d("DOMEventListener",["emptyFunction","invariant","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k=false;try{var l=Object.defineProperty({},"passive",{get:function q(){k=true}});window.addEventListener("test",null,l)}catch(m){}var n=void 0,o=void 0;if(window.addEventListener){n=function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];t.wrapper=j(t,"entry","DOMEventListener.add "+s);r.addEventListener(s,t.wrapper,k?u:false)};o=function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];r.removeEventListener(s,t.wrapper,k?u:false)}}else if(window.attachEvent){n=function q(r,s,t){t.wrapper=j(t,"entry","DOMEventListener.add "+s);r.attachEvent||i(0);r.attachEvent("on"+s,t.wrapper)};o=function q(r,s,t){r.detachEvent||i(0);r.detachEvent("on"+s,t.wrapper)}}else o=n=h;var p={add:function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];n(r,s,t,u);return{remove:function v(){o(r,s,t,u)}}},remove:o};f.exports=p}),18);
__d("UserAgent_DEPRECATED",[],(function a(b,c,d,e,f,g){__p&&__p();var h=false,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){__p&&__p();if(h)return;h=true;var z=navigator.userAgent,A=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),B=/(Mac OS X)|(Windows)|(Linux)/.exec(z);t=/\b(iPhone|iP[ao]d)/.exec(z);u=/\b(iP[ao]d)/.exec(z);r=/Android/i.exec(z);v=/FBAN\/\w+;/i.exec(z);w=/Mobile/i.exec(z);s=!!/Win64/.exec(z);if(A){i=A[1]?parseFloat(A[1]):A[5]?parseFloat(A[5]):NaN;if(i&&document&&document.documentMode)i=document.documentMode;var C=/(?:Trident\/(\d+.\d+))/.exec(z);n=C?parseFloat(C[1])+4:i;j=A[2]?parseFloat(A[2]):NaN;k=A[3]?parseFloat(A[3]):NaN;l=A[4]?parseFloat(A[4]):NaN;if(l){A=/(?:Chrome\/(\d+\.\d+))/.exec(z);m=A&&A[1]?parseFloat(A[1]):NaN}else m=NaN}else i=j=k=m=l=NaN;if(B){if(B[1]){var D=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);o=D?parseFloat(D[1].replace("_",".")):true}else o=false;p=!!B[2];q=!!B[3]}else o=p=q=false}var y={ie:function z(){return x()||i},ieCompatibilityMode:function z(){return x()||n>i},ie64:function z(){return y.ie()&&s},firefox:function z(){return x()||j},opera:function z(){return x()||k},webkit:function z(){return x()||l},safari:function z(){return y.webkit()},chrome:function z(){return x()||m},windows:function z(){return x()||p},osx:function z(){return x()||o},linux:function z(){return x()||q},iphone:function z(){return x()||t},mobile:function z(){return x()||t||u||r||w},nativeApp:function z(){return x()||v},android:function z(){return x()||r},ipad:function z(){return x()||u}};f.exports=y}),18);
__d("htmlSpecialChars",[],(function a(b,c,d,e,f,g){__p&&__p();var h=/&/g,i=/</g,j=/>/g,k=/\"/g,l=/\'/g;function m(n){if(typeof n=="undefined"||n===null||!n.toString)return"";if(n===false)return"0";else if(n===true)return"1";return n.toString().replace(h,"&amp;").replace(k,"&quot;").replace(l,"&#039;").replace(i,"&lt;").replace(j,"&gt;")}f.exports=m}),null);
__d("Flash",["DOMEventListener","DOMWrapper","QueryString","UserAgent_DEPRECATED","guid","htmlSpecialChars"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n={},o,p=i.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v]}function r(){for(var v in n)if(Object.prototype.hasOwnProperty.call(n,v))q(v)}function s(v){return v.replace(/\d+/g,function(w){return"000".substring(w.length)+w})}function t(v){if(!o){if(k.ie()>=9)h.add(window,"unload",r);o=true}n[v]=v}var u={embed:function v(w,x,y,z){__p&&__p();var A=l();w=m(w).replace(/&amp;/g,"&");y=babelHelpers["extends"]({allowscriptaccess:"always",flashvars:z,movie:w},y);if(typeof y.flashvars=="object")y.flashvars=j.encode(y.flashvars);var B=[];for(var C in y)if(Object.prototype.hasOwnProperty.call(y,C)&&y[C])B.push('<param name="'+m(C)+'" value="'+m(y[C])+'">');var D=x.appendChild(p.createElement("span")),E="<object "+(k.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+w+'" '+(y.height?'height="'+y.height+'" ':"")+(y.width?'width="'+y.width+'" ':"")+'id="'+A+'">'+B.join("")+"</object>";D.innerHTML=E;var F=D.firstChild;t(A);return F},remove:q,getVersion:function v(){__p&&__p();var w="Shockwave Flash",x="application/x-shockwave-flash",y="ShockwaveFlash.ShockwaveFlash",z;if(navigator.plugins&&typeof navigator.plugins[w]=="object"){var A=navigator.plugins[w].description;if(A&&navigator.mimeTypes&&navigator.mimeTypes[x]&&navigator.mimeTypes[x].enabledPlugin)z=A.match(/\d+/g)}if(!z)try{z=new ActiveXObject(y).GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/);z=Array.prototype.slice.call(z,1)}catch(B){}return z},getVersionString:function v(){var w=u.getVersion();return w?w.join("."):""},checkMinVersion:function v(w){var x=u.getVersion();if(!x)return false;return s(x.join("."))>=s(w)},isAvailable:function v(){return!!u.getVersion()}};f.exports=u}),null);
__d("XDM",["DOMEventListener","DOMWrapper","emptyFunction","Flash","GlobalCallback","guid","Log","UserAgent_DEPRECATED","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){__p&&__p();var q={},r={transports:[]},s=i.getWindow();function t(w){var x={},y=w.length,z=r.transports;while(y--)x[w[y]]=1;y=z.length;while(y--){var A=z[y],B=q[A];if(!x[A]&&B.isAvailable())return A}}var u={register:function w(x,y){n.debug("Registering %s as XDM provider",x);r.transports.push(x);q[x]=y},create:function w(x){__p&&__p();if(!x.whenReady&&!x.onMessage){n.error("An instance without whenReady or onMessage makes no sense");throw new Error("An instance without whenReady or onMessage makes no sense")}if(!x.channel){n.warn("Missing channel name, selecting at random");x.channel=m()}if(!x.whenReady)x.whenReady=j;if(!x.onMessage)x.onMessage=j;var y=x.transport||t(x.blacklist||[]),z=q[y];if(z&&z.isAvailable()){n.debug("%s is available",y);z.init(x);return y}}};u.register("flash",function(){__p&&__p();var w=false,x,y=false,z=15e3,A;return{isAvailable:function B(){return k.checkMinVersion("8.0.24")},init:function B(C){__p&&__p();n.debug("init flash: "+C.channel);var D={send:function G(H,I,J,K){n.debug("sending to: %s (%s)",I,K);x.postMessage(H,I,K)}};if(w){C.whenReady(D);return}var E=C.root.appendChild(s.document.createElement("div")),F=l.create(function(){__p&&__p();l.remove(F);clearTimeout(A);n.info("xdm.swf called the callback");var G=l.create(function(H,I){H=decodeURIComponent(H);I=decodeURIComponent(I);n.debug("received message %s from %s",H,I);C.onMessage(H,I)},"xdm.swf:onMessage");x.init(C.channel,G);C.whenReady(D)},"xdm.swf:load");x=k.embed(C.flashUrl,E,null,{protocol:location.protocol.replace(":",""),host:location.host,callback:F,log:y});A=setTimeout(function(){n.warn("The Flash component did not load within %s ms - verify that the container is not set to hidden or invisible using CSS as this will cause some browsers to not load the components",z)},z);w=true}}}());var v=/\.facebook\.com(\/|$)/;u.register("postmessage",function(){__p&&__p();var w=false;return{isAvailable:function x(){return!!s.postMessage},init:function x(y){__p&&__p();n.debug("init postMessage: "+y.channel);var z="_FB_"+y.channel,A={send:function B(C,D,E,F){__p&&__p();if(s===E){n.error("Invalid windowref, equal to window (self)");throw new Error()}n.debug("sending to: %s (%s)",D,F);var B=function B(){E.postMessage("_FB_"+F+C,D)};if(o.ie()==8||o.ieCompatibilityMode())setTimeout(B,0);else B()}};if(w){y.whenReady(A);return}h.add(s,"message",p(function(event){__p&&__p();var B=event.data,C=event.origin||"native";if(!/^(https?:\/\/|native$)/.test(C)){n.debug("Received message from invalid origin type: %s",C);return}if(C!=="native"&&!(v.test(location.hostname)||v.test(event.origin)))return;if(typeof B!="string"){n.warn("Received message of type %s from %s, expected a string",typeof B,C);return}n.debug("received message %s from %s",B,C);if(B.substring(0,z.length)==z)B=B.substring(z.length);y.onMessage(B,C)},"entry","onMessage"));y.whenReady(A);w=true}}}());f.exports=u}),null);
__d("isFacebookURI",[],(function a(b,c,d,e,f,g){__p&&__p();var h=null,i=["http","https"];function j(k){if(!h)h=new RegExp("(^|\\.)facebook\\.com$","i");if(k.isEmpty()&&k.toString()!=="#")return false;if(!k.getDomain()&&!k.getProtocol())return true;return ES(i,"indexOf",true,k.getProtocol())!==-1&&h.test(k.getDomain())}j.setRegex=function(k){h=k};f.exports=j}),null);
__d("sdk.Event",[],(function a(b,c,d,e,f,g){__p&&__p();var h={SUBSCRIBE:"event.subscribe",UNSUBSCRIBE:"event.unsubscribe",subscribers:function i(){if(!this._subscribersMap)this._subscribersMap={};return this._subscribersMap},subscribe:function i(j,k){var l=this.subscribers();if(!l[j])l[j]=[k];else if(ES(l[j],"indexOf",true,k)==-1)l[j].push(k);if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.SUBSCRIBE,j,l[j])},unsubscribe:function i(j,k){var l=this.subscribers()[j];if(l)ES(l,"forEach",true,function(m,n){if(m==k)l.splice(n,1)});if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.UNSUBSCRIBE,j,l)},monitor:function i(j,k){if(!k()){var l=this,m=function m(){if(k.apply(k,arguments))l.unsubscribe(j,m)};this.subscribe(j,m)}},clear:function i(j){delete this.subscribers()[j]},fire:function i(j){var k=Array.prototype.slice.call(arguments,1),l=this.subscribers()[j];if(l)ES(l,"forEach",true,function(m){if(m)m.apply(this,k)})}};f.exports=h}),null);
__d("JSONRPC",["Log"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){"use strict";this.$JSONRPC1=0;this.$JSONRPC2={};this.remote=ES(function(k){this.$JSONRPC3=k;return this.remote},"bind",true,this);this.local={};this.$JSONRPC4=j}i.prototype.stub=function(j){"use strict";__p&&__p();this.remote[j]=ES(function(){var k={jsonrpc:"2.0",method:j};for(var l=arguments.length,m=Array(l),n=0;n<l;n++)m[n]=arguments[n];if(typeof m[m.length-1]=="function"){k.id=++this.$JSONRPC1;this.$JSONRPC2[k.id]=m.pop()}k.params=m;this.$JSONRPC4(ES("JSON","stringify",false,k),this.$JSONRPC3||{method:j})},"bind",true,this)};i.prototype.read=function(j,k){"use strict";__p&&__p();var l=ES("JSON","parse",false,j),m=l.id;if(!l.method){if(!this.$JSONRPC2[m]){h.warn("Could not find callback %s",m);return}var n=this.$JSONRPC2[m];delete this.$JSONRPC2[m];delete l.id;delete l.jsonrpc;n(l);return}var o=this,p=this.local[l.method],q;if(m)q=function q(t,u){var v={jsonrpc:"2.0",id:m};v[t]=u;setTimeout(function(){o.$JSONRPC4(ES("JSON","stringify",false,v),k)},0)};else q=function q(){};if(!p){h.error('Method "%s" has not been defined',l.method);q("error",{code:-32601,message:"Method not found",data:l.method});return}l.params.push(ES(q,"bind",true,null,"result"));l.params.push(ES(q,"bind",true,null,"error"));try{var r=p.apply(k||null,l.params);if(typeof r!=="undefined")q("result",r)}catch(s){h.error("Invokation of RPC method %s resulted in the error: %s",l.method,s.message);q("error",{code:-32603,message:"Internal error",data:s.message})}};f.exports=i}),null);
__d("sdk.RPC",["Assert","JSONRPC","Queue"],(function a(b,c,d,e,f,g,h,i,j){var k=new j(),l=new i(function(n){k.enqueue(n)}),m={local:l.local,remote:l.remote,stub:ES(l.stub,"bind",true,l),setInQueue:function n(o){h.isInstanceOf(j,o);o.start(function(p){l.read(p)})},getOutQueue:function n(){return k}};f.exports=m}),null);
__d("hasNamePropertyBug",["guid","UserAgent_DEPRECATED"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=i.ie()?undefined:false;function k(){var m=document.createElement("form"),n=m.appendChild(document.createElement("input"));n.name=h();j=n!==m.elements[n.name];m=n=null;return j}function l(){return typeof j==="undefined"?k():j}f.exports=l}),null);
__d("isNumberLike",[],(function a(b,c,d,e,f,g){function h(i){return!isNaN(parseFloat(i))&&isFinite(i)}f.exports=h}),null);
__d("sdk.createIframe",["DOMEventListener","getBlankIframeSrc","guid","hasNamePropertyBug","isNumberLike"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();function m(n){__p&&__p();n=ES("Object","assign",false,{},n);var o,p=n.name||j(),q=n.root,r=n.style||{border:"none"},s=n.url,t=n.onload,u=n.onerror;if(k())o=document.createElement('<iframe name="'+p+'"/>');else{o=document.createElement("iframe");o.name=p}delete n.style;delete n.name;delete n.url;delete n.root;delete n.onload;delete n.onerror;var v=ES("Object","assign",false,{frameBorder:0,allowTransparency:true,allowFullscreen:true,scrolling:"no"},n);if(v.width&&l(v.width))o.width=v.width+"px";if(v.height&&l(v.height))o.height=v.height+"px";delete v.height;delete v.width;for(var w in v)if(Object.prototype.hasOwnProperty.call(v,w))o.setAttribute(w,v[w]);ES("Object","assign",false,o.style,r);o.src=i();q.appendChild(o);if(t)var x=h.add(o,"load",function(){x.remove();t()});if(u)var y=h.add(o,"error",function(){y.remove();u()});o.src=s;return o}f.exports=m}),null);
__d("sdk.FeatureFunctor",["invariant"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(k,l,m){if(k.features&&l in k.features){var n=k.features[l];if(typeof n==="object"&&typeof n.rate==="number")if(n.rate&&Math.random()*100<=n.rate)return n.value||true;else return n.value?null:false;else return n}return m}function j(k){return function(l,m){arguments.length>=2||h(0);return i(k,l,m)}}f.exports={create:j}}),null);
__d("sdk.feature",["sdk.FeatureFunctor","JSSDKConfig"],(function a(b,c,d,e,f,g,h,i){f.exports=h.create(i)}),null);
__d("sdk.XD",["sdk.Content","sdk.Event","Log","QueryString","Queue","sdk.RPC","sdk.Runtime","sdk.Scribe","sdk.URI","UrlMap","JSSDKXDConfig","XDM","isFacebookURI","sdk.createIframe","sdk.feature","guid"],(function a(b,c,d,e,f,aa,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w=new k(),x=new k(),y=new k(),z,A,B=v(),C=q.useCdn?"cdn":"www",D=u("use_bundle",false)?q.XdBundleUrl:q.XdUrl,E=p.resolve(C,false)+D,F=p.resolve(C,true)+D,G=function G(){if("origin"in location)if(location.origin&&location.origin!=="null")return location.origin;else if(window!==window.parent)try{var U=parent.location.origin;if(U&&U!=="null")return U}catch(V){}return location.protocol+"//"+location.host},H=v(),I=G(),J,K=false,L="Facebook Cross Domain Communication Frame",M={},N=new k();l.setInQueue(N);function O(U){i.info("Remote XD can talk to facebook.com (%s)",U);m.setEnvironment(U==="canvas"?m.ENVIRONMENTS.CANVAS:m.ENVIRONMENTS.PAGETAB)}function P(U,V){__p&&__p();if(!V){i.error("No senderOrigin");throw new Error()}var W=/^https?/.exec(V)[0];switch(U.xd_action){case"proxy_ready":var X,Y;if(W=="https"){X=y;Y=A;m.setLoggedIntoFacebook(U.logged_in==="true")}else{X=x;Y=z}if(U.registered){O(U.registered);w=X.merge(w)}i.info("Proxy ready, starting queue %s containing %s messages",W+"ProxyQueue",X.getLength());X.start(function(U){J.send(typeof U==="string"?U:j.encode(U),V,Y.contentWindow,H+"_"+W)});break;case"plugin_ready":i.info("Plugin %s ready, protocol: %s",U.name,W);M[U.name]={protocol:W};if(k.exists(U.name)){var Z=k.get(U.name);i.debug("Enqueuing %s messages for %s in %s",Z.getLength(),U.name,W+"ProxyQueue");(W=="https"?y:x).merge(Z)}break}if(U.data)Q(U.data,V)}function Q(U,V){__p&&__p();if(V&&V!=="native"&&!s(new o(V)))return;if(typeof U=="string"){if(/^FB_RPC:/.test(U)){N.enqueue(U.substring(7));return}if(U.substring(0,1)=="{")try{U=ES("JSON","parse",false,U)}catch(W){i.warn("Failed to decode %s as JSON",U);return}else U=j.decode(U)}if(!V)if(U.xd_sig==B)V=U.xd_origin;if(U.xd_action){P(U,V);return}if(U.access_token)m.setSecure(/^https/.test(I));if(U.cb){var X=T._callbacks[U.cb];if(!T._forever[U.cb])delete T._callbacks[U.cb];if(X)X(U)}}function R(U,V){__p&&__p();if(U=="facebook"){V.relation="parent.parent";w.enqueue(V)}else{V.relation='parent.frames["'+U+'"]';var W=M[U];if(W){i.debug("Enqueuing message for plugin %s in %s",U,W.protocol+"ProxyQueue");(W.protocol=="https"?y:x).enqueue(V)}else{i.debug("Buffering message for plugin %s",U);k.get(U).enqueue(V)}}}l.getOutQueue().start(function(U){R("facebook","FB_RPC:"+U)});function S(U){__p&&__p();if(K)return;var V=g.appendHidden(document.createElement("div")),W=r.create({blacklist:null,root:V,channel:H,flashUrl:q.Flash.path,whenReady:function X(Y){J=Y;var Z={channel:H,origin:I,transport:W,xd_name:U},$="#"+j.encode(Z);if(m.getSecure()!==true)z=t({url:E+$,name:"fb_xdm_frame_http",id:"fb_xdm_frame_http",root:V,"aria-hidden":true,title:L,tabindex:-1});A=t({url:F+$,name:"fb_xdm_frame_https",id:"fb_xdm_frame_https",root:V,"aria-hidden":true,title:L,tabindex:-1})},onMessage:Q});if(!W)n.log("jssdk_error",{appId:m.getClientID(),error:"XD_TRANSPORT",extra:{message:"Failed to create a valid transport"}});K=true}var T={rpc:l,_callbacks:{},_forever:{},_channel:H,_origin:I,onMessage:Q,recv:Q,init:S,sendToFacebook:R,inform:function U(V,W,X,Y){R("facebook",{method:V,params:ES("JSON","stringify",false,W||{}),behavior:Y||"p",relation:X})},handler:function U(V,W,X,Y){var Z="#"+j.encode({cb:this.registerCallback(V,X,Y),origin:I+"/"+H,domain:location.hostname,relation:W||"opener"});return(location.protocol=="https:"?F:E)+Z},registerCallback:function U(V,W,X){X=X||v();if(W)T._forever[X]=true;T._callbacks[X]=V;return X},getXDArbiterURL:function U(V){return V?F:E}};h.subscribe("init:post",function(U){S(U.xdProxyName);var V=u("xd_timeout",false);if(V)setTimeout(function(){var W=A&&!!z==x.isStarted()&&!!A==y.isStarted();if(!W)n.log("jssdk_error",{appId:m.getClientID(),error:"XD_INITIALIZATION",extra:{message:"Failed to initialize in "+V+"ms"}})},V)});f.exports=T}),null);
__d("sdk.getContextType",["sdk.Runtime","sdk.UA"],(function a(b,c,d,e,f,g,h,i){function j(){if(i.nativeApp())return 3;if(i.mobile())return 2;if(h.isEnvironment(h.ENVIRONMENTS.CANVAS))return 5;return 1}f.exports=j}),null);
__d("sdk.Auth",["sdk.Cookie","sdk.createIframe","DOMWrapper","sdk.feature","sdk.getContextType","guid","sdk.Impressions","Log","ObservableMixin","sdk.Runtime","sdk.Scribe","sdk.SignedRequest","UrlMap","sdk.URI","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w="fblo_",x=365*24*60*60*1e3,y,z,A=new p();function B(J,K){__p&&__p();var L=q.getUserID(),M="";if(J)if(J.userID)M=J.userID;else if(J.signedRequest){var N=s.parse(J.signedRequest);if(N&&N.user_id)M=N.user_id}var O=q.getLoginStatus(),P=O==="unknown"&&J||q.getUseCookie()&&q.getCookieUserID()!==M,Q=L&&!J,R=J&&L&&L!=M,S=J!=y,T=K!=(O||"unknown");q.setLoginStatus(K);q.setAccessToken(J&&J.accessToken||null);q.setUserID(M);y=J;var U={authResponse:J,status:K};if(Q||R)A.inform("logout",U);if(P||R)A.inform("login",U);if(S)A.inform("authresponse.change",U);if(T)A.inform("status.change",U);return U}function C(){return y}function D(J,K,L){__p&&__p();return function(M){__p&&__p();var N;if(M&&M.access_token){var O=s.parse(M.signed_request);K={accessToken:M.access_token,userID:O.user_id,expiresIn:parseInt(M.expires_in,10),signedRequest:M.signed_request};if(M.granted_scopes)K.grantedScopes=M.granted_scopes;if(q.getUseCookie()){var P=K.expiresIn===0?0:ES("Date","now",false)+K.expiresIn*1e3,Q=h.getDomain();if(!Q&&M.base_domain)h.setDomain("."+M.base_domain);h.setSignedRequestCookie(M.signed_request,P);E()}N="connected";B(K,N)}else if(L==="logout"||L==="login_status"){if(M.error&&M.error==="not_authorized")N="not_authorized";else N="unknown";B(null,N);if(q.getUseCookie())h.clearSignedRequestCookie();if(L==="logout"){F();r.log("jssdk_error",{appId:q.getClientID(),error:"PLATFORM_AUTH_LOGOUT",extra:{args:{fblo:true}}})}}if(M&&M.https==1)q.setSecure(true);if(J)J({authResponse:K,status:q.getLoginStatus()});return K}}function E(){h.setRaw(w,"",0)}function F(){h.setRaw(w,"y",ES("Date","now",false)+x)}function G(J){__p&&__p();var K,L=ES("Date","now",false);if(z){clearTimeout(z);z=null}var M=h.getRaw(w)==="y";if(k("getloginstatus_tracking",true))r.log("jssdk_error",{appId:q.getClientID(),error:"PLATFORM_AUTH_GETLOGINSTATUS",extra:{args:{fblo:M}}});if(M){var N="unknown";B(null,N);if(J)J({authResponse:null,status:N});return}var O=D(J,y,"login_status"),P=new u(t.resolve("www",true)+"/connect/ping").setQueryData({client_id:q.getClientID(),response_type:"token,signed_request,code",domain:location.hostname,origin:l(),redirect_uri:v.handler(function(Q){if(k("e2e_ping_tracking",true)){var R={init:L,close:ES("Date","now",false),method:"ping"};o.debug("e2e: %s",ES("JSON","stringify",false,R));n.log(114,{payload:R})}K.parentNode.removeChild(K);if(O(Q))z=setTimeout(function(){G(function(){})},12e5)},"parent"),sdk:"joey",kid_directed_site:q.getKidDirectedSite()});K=i({root:j.getRoot(),name:m(),url:P.toString(),style:{display:"none"}})}var H;function I(J,K){__p&&__p();if(!q.getClientID()){o.warn("FB.getLoginStatus() called before calling FB.init().");return}if(J)if(!K&&H=="loaded"){J({status:q.getLoginStatus(),authResponse:C()});return}else A.subscribe("FB.loginStatus",J);if(!K&&H=="loading")return;H="loading";var L=function L(M){H="loaded";A.inform("FB.loginStatus",M);A.clearSubscribers("FB.loginStatus")};G(L)}ES("Object","assign",false,A,{removeLogoutState:E,getLoginStatus:I,fetchLoginStatus:G,setAuthResponse:B,getAuthResponse:C,parseSignedRequest:s.parse,xdResponseWrapper:D});f.exports=A}),null);
__d("sdk.DOM",["Assert","sdk.UA","sdk.domReady"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={};function l(z,A){var B=z.getAttribute(A)||z.getAttribute(A.replace(/_/g,"-"))||z.getAttribute(A.replace(/-/g,"_"))||z.getAttribute(A.replace(/-/g,""))||z.getAttribute(A.replace(/_/g,""))||z.getAttribute("data-"+A)||z.getAttribute("data-"+A.replace(/_/g,"-"))||z.getAttribute("data-"+A.replace(/-/g,"_"))||z.getAttribute("data-"+A.replace(/-/g,""))||z.getAttribute("data-"+A.replace(/_/g,""));return B?String(B):null}function m(z,A){var B=l(z,A);return B?/^(true|1|yes|on)$/.test(B):null}function n(z,A){h.isTruthy(z,"element not specified");h.isString(A);try{return String(z[A])}catch(B){throw new Error("Could not read property "+A+" : "+B.message)}}function o(z,A){h.isTruthy(z,"element not specified");h.isString(A);try{z.innerHTML=A}catch(B){throw new Error("Could not set innerHTML : "+B.message)}}function p(z,A){h.isTruthy(z,"element not specified");h.isString(A);var B=" "+n(z,"className")+" ";return ES(B,"indexOf",true," "+A+" ")>=0}function q(z,A){h.isTruthy(z,"element not specified");h.isString(A);if(!p(z,A))z.className=n(z,"className")+" "+A}function r(z,A){h.isTruthy(z,"element not specified");h.isString(A);var B=new RegExp("\\s*"+A,"g");z.className=ES(n(z,"className").replace(B,""),"trim",true)}function s(z,A,B){__p&&__p();h.isString(z);A=A||document.body;B=B||"*";if(A.querySelectorAll)return ES("Array","from",false,A.querySelectorAll(B+"."+z));var C=A.getElementsByTagName(B),D=[];for(var E=0,F=C.length;E<F;E++)if(p(C[E],z))D[D.length]=C[E];return D}function t(z,A){h.isTruthy(z,"element not specified");h.isString(A);A=A.replace(/-(\w)/g,function(D,E){return E.toUpperCase()});var B=z.currentStyle||document.defaultView.getComputedStyle(z,null),C=B[A];if(/backgroundPosition?/.test(A)&&/top|left/.test(C))C="0%";return C}function u(z,A,B){h.isTruthy(z,"element not specified");h.isString(A);A=A.replace(/-(\w)/g,function(C,D){return D.toUpperCase()});z.style[A]=B}function v(z,A){__p&&__p();var B=true;for(var C=0,D;D=A[C++];)if(!(D in k)){B=false;k[D]=true}if(B)return;if(i.ie()<11)try{document.createStyleSheet().cssText=z}catch(E){if(document.styleSheets[0])document.styleSheets[0].cssText+=z}else{var F=document.createElement("style");F.type="text/css";F.textContent=z;document.getElementsByTagName("head")[0].appendChild(F)}}function w(){var z=document.documentElement&&document.compatMode=="CSS1Compat"?document.documentElement:document.body;return{scrollTop:z.scrollTop||document.body.scrollTop,scrollLeft:z.scrollLeft||document.body.scrollLeft,width:window.innerWidth?window.innerWidth:z.clientWidth,height:window.innerHeight?window.innerHeight:z.clientHeight}}function x(z){h.isTruthy(z,"element not specified");var A=0,B=0;do{A+=z.offsetLeft;B+=z.offsetTop}while(z=z.offsetParent);return{x:A,y:B}}var y={containsCss:p,addCss:q,removeCss:r,getByClass:s,getStyle:t,setStyle:u,getAttr:l,getBoolAttr:m,getProp:n,html:o,addCssRules:v,getViewportInfo:w,getPosition:x,ready:j};f.exports=y}),null);
__d("normalizeError",["sdk.UA"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){__p&&__p();var k={line:j.lineNumber||j.line,message:j.message,name:j.name,script:j.fileName||j.sourceURL||j.script,stack:j.stackTrace||j.stack};k._originalError=j;var l=/([\w:\.\/]+\.js):(\d+)/.exec(j.stack);if(h.chrome()&&l){k.script=l[1];k.line=parseInt(l[2],10)}for(var m in k)k[m]==null&&delete k[m];return k}f.exports=i}),null);
__d("sdk.ErrorHandler",["ManagedError","normalizeError","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();function k(l,m){__p&&__p();var n="";function o(t){var u=t._originalError;delete t._originalError;m(t);throw u}function p(t,u){__p&&__p();return function(){__p&&__p();if(!l)return t.apply(this,arguments);try{n=u;return t.apply(this,arguments)}catch(v){if(v instanceof h)throw v;var w=i(v);w.entry=u;var x=ES(Array.prototype.slice.call(arguments),"map",true,function(y){var z=Object.prototype.toString.call(y);return/^\[object (String|Number|Boolean|Object|Date)\]$/.test(z)?y:y.toString()});w.args=ES("JSON","stringify",false,x).substring(0,200);o(w)}finally{n=""}}}function q(t){if(!t.__wrapper)t.__wrapper=function(){try{return t.apply(this,arguments)}catch(u){window.setTimeout(function(){throw u},0);return false}};return t.__wrapper}function r(t){try{return t&&t.callee&&t.callee.caller?t.callee.caller.name:""}catch(u){return""}}function s(t,u){return function(v,w){var x=u+":"+(n||"[global]")+":"+(v.name||"[anonymous]"+r(arguments));return t(j(v,"entry",x),w)}}if(l){setTimeout=s(setTimeout,"setTimeout");setInterval=s(setInterval,"setInterval");j.setWrapper(p,"entry")}return{guard:p,unguard:q}}f.exports={create:k}}),null);
__d("sdk.ErrorHandling",["sdk.ErrorHandler","sdk.Runtime","sdk.Scribe","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k){var l=k("error_handling",false);f.exports=h.create(l,function(m){j.log("jssdk_error",{appId:i.getClientID(),error:m.name||m.message,extra:m})})}),null);
__d("sdk.Insights",["sdk.Impressions"],(function a(b,c,d,e,f,g,h){var i={TYPE:{NOTICE:"notice",WARNING:"warn",ERROR:"error"},CATEGORY:{DEPRECATED:"deprecated",APIERROR:"apierror"},log:function j(k,l,m){var n={source:"jssdk",type:k,category:l,payload:m};h.log(113,n)},impression:h.impression};f.exports=i}),null);
__d("FB",["sdk.Auth","JSSDKCssConfig","dotAccess","sdk.domReady","sdk.DOM","sdk.ErrorHandling","sdk.Content","DOMWrapper","GlobalCallback","sdk.Insights","Log","sdk.Runtime","sdk.Scribe","JSSDKConfig"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){__p&&__p();var v=void 0,w=void 0,x=j(u,"api.mode"),y={};v=window.FB={};var z={};r.level=0;p.setPrefix("FB.__globalCallbacks");var A=document.createElement("div");o.setRoot(A);k(function(){r.info("domReady");n.appendHidden(A);if(i.rules)l.addCssRules(i.rules,i.components)});s.subscribe("AccessToken.change",function(D){if(!D&&s.getLoginStatus()==="connected")h.getLoginStatus(null,true)});if(j(u,"api.whitelist.length")){w={};ES(u.api.whitelist,"forEach",true,function(D){w[D]=1})}function B(D,E,F,G){__p&&__p();var H;if(/^_/.test(F))H="hide";else if(w&&!w[E])H=x;switch(H){case"hide":return;case"stub":return function(){r.warn("The method FB.%s has been removed from the JS SDK.",E)};default:return m.guard(function(){__p&&__p();if(H==="warn"){r.warn("The method FB.%s is not officially supported by Facebook and access to it will soon be removed.",E);if(!Object.prototype.hasOwnProperty.call(y,E)){q.log(q.TYPE.WARNING,q.CATEGORY.DEPRECATED,"FB."+E);t.log("jssdk_error",{appId:s.getClientID(),error:"Private method used",extra:{args:E}});y[E]=true}}function I(O){if(ES("Array","isArray",false,O))return ES(O,"map",true,I);if(O&&typeof O==="object"&&O.__wrapped)return O.__wrapped;return typeof O==="function"&&/^function/.test(O.toString())?m.unguard(O):O}var J=ES(Array.prototype.slice.call(arguments),"map",true,I),K=D.apply(G,J),L,M=true;if(K&&typeof K==="object"){L=ES("Object","create",false,K);L.__wrapped=K;for(var F in K){var N=K[F];if(typeof N!=="function"||F==="constructor")continue;M=false;L[F]=B(N,E+":"+F,F,K)}}if(!M)return L;return M?K:L},E)}}function C(D,E){__p&&__p();var F=D?j(v,D,true):v;ES(ES("Object","keys",false,E),"forEach",true,function(G){__p&&__p();var H=E[G];if(typeof H==="function"){var I=(D?D+".":"")+G,J=B(H,I,G,E);if(J)F[G]=J}else if(typeof H==="object"||typeof H==="number"){I=(D?D+".":"")+G;if(w&&w[I])F[G]=H}})}s.setSecure(function(){var D=/iframe_canvas|app_runner/.test(window.name),E=/dialog/.test(window.name);if(location.protocol=="https:"&&(window==top||!(D||E)))return true;if(/_fb_https?/.test(window.name))return ES(window.name,"indexOf",true,"_fb_https")!=-1}());ES("Object","assign",false,z,{provide:C});f.exports=z}),null);
__d("ArgumentError",["ManagedError"],(function a(b,c,d,e,f,g,h){function i(j,k){h.prototype.constructor.apply(this,arguments)}i.prototype=new h();i.prototype.constructor=i;f.exports=i}),null);
__d("flattenObject",[],(function a(b,c,d,e,f,g){__p&&__p();function h(i){__p&&__p();var j={};for(var k in i)if(Object.prototype.hasOwnProperty.call(i,k)){var l=i[k];if(null===l||undefined===l)continue;else if(typeof l=="string")j[k]=l;else j[k]=ES("JSON","stringify",false,l)}return j}f.exports=h}),null);
__d("ApiClientUtils",["ArgumentError","Assert","Log","sdk.URI","flattenObject","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n={get:true,post:true,"delete":true,put:true};function o(p){__p&&__p();var q=p.shift();i.isString(q,"Invalid path");if(!/^https?/.test(q)&&q.charAt(0)!=="/")q="/"+q;var r,s={};try{r=new k(q)}catch(t){throw new h(t.message,t)}ES(p,"forEach",true,function(x){return s[typeof x]=x});var u=(s.string||"get").toLowerCase();i.isTrue(Object.prototype.hasOwnProperty.call(n,u),m("Invalid method passed to ApiClient: %s",u));var v=s["function"];if(!v)j.warn("No callback passed to the ApiClient");if(s.object)r.addQueryData(l(s.object));var w=r.getQueryData();w.method=u;return{uri:r,callback:v,params:w}}f.exports={parseCallDataFromArgs:o}}),null);
__d("errorCode",[],(function a(b,c,d,e,f,g){"use strict";function h(i){throw new Error('errorCode("'+i+'"): This should not happen. Oh noes!')}f.exports=h}),null);
__d("sdk.safelyParseResponse",["errorCode"],(function a(b,c,d,e,f,g,h){"use strict";function i(k){try{return k===null?j:ES("JSON","parse",false,k)}catch(l){return j}}var j={error:{code:1,error_subcode:1357046,message:"Received Invalid JSON reply.",type:"http"}};i.ERROR=j;f.exports=i}),null);
__d("ApiBatcher",["ApiClientUtils","QueryString","invariant","sdk.safelyParseResponse"],(function a(b,c,d,e,f,g,h,i,j,k){"use strict";__p&&__p();var l=50,m=105440539523;function n(o,p){this.$ApiBatcher1=[];this.$ApiBatcher2=[];this.$ApiBatcher4=null;this.executeRequest=o;this.$ApiBatcher3=p}n.prototype.scheduleBatchCall=function(){__p&&__p();for(var o=arguments.length,p=Array(o),q=0;q<o;q++)p[q]=arguments[q];var r=n.prepareBatchParams(p),s=r.body,t=r.callback,u=r.method,v=r.relative_url,w={method:u,relative_url:v};if(s)w.body=s;this.$ApiBatcher1.push(w);this.$ApiBatcher2.push(t);if(this.$ApiBatcher1.length==l){if(this.$ApiBatcher4)clearTimeout(this.$ApiBatcher4);this.$ApiBatcher5()}else if(!this.$ApiBatcher4)this.$ApiBatcher4=setTimeout(ES(function(){this.$ApiBatcher5()},"bind",true,this),0)};n.prepareBatchParams=function(o){var p=h.parseCallDataFromArgs(o),q=p.uri,r=p.callback,s=p.params.method,t,u=q.removeQueryData("method").toString();if(s.toLowerCase()=="post"){t=i.encode(q.getQueryData());u=q.setQueryData({}).toString()}return{body:t,callback:r,method:s,relative_url:u}};n.prototype.$ApiBatcher5=function(){__p&&__p();this.$ApiBatcher1.length>0||j(0);this.$ApiBatcher1.length===this.$ApiBatcher2.length||j(0);var o=this.$ApiBatcher1,p=this.$ApiBatcher2;this.$ApiBatcher1=[];this.$ApiBatcher2=[];this.$ApiBatcher4=null;if(o.length===1){var q=o[0],r=p[0],s=q.body?i.decode(q.body):null;this.executeRequest(q.relative_url,q.method,s,r);return}this.executeRequest("/","POST",{batch:o,include_headers:false,batch_app_id:this.$ApiBatcher3||m},function(t){if(ES("Array","isArray",false,t))ES(t,"forEach",true,function(u,v){p[v](k(u&&u.body))});else ES(p,"forEach",true,function(r){return r({error:{message:"Fatal: batch call failed."}})})})};f.exports=n}),null);
__d("RequestConstants",["errorCode"],(function a(b,c,d,e,f,g,h){var i={code:1,error_subcode:1357045,message:"unknown error (empty response)",type:"http",status:0};f.exports={PARSE_ERROR_TEMPLATE:i}}),null);
__d("CORSRequest",["wrapFunction","QueryString","RequestConstants","sdk.safelyParseResponse"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();function l(o,p){__p&&__p();if(!self.XMLHttpRequest)return null;var q=new XMLHttpRequest(),r=function r(){};if("withCredentials"in q){q.open(o,p,true);q.setRequestHeader("Content-type","application/x-www-form-urlencoded")}else if(self.XDomainRequest){q=new XDomainRequest();try{q.open(o,p);q.onprogress=q.ontimeout=r}catch(s){return null}}else return null;var t={send:function w(x){q.send(x)}},u=h(function(){u=r;if("onload"in t)t.onload(q)},"entry","XMLHttpRequest:load"),v=h(function(){v=r;if("onerror"in t)t.onerror(q)},"entry","XMLHttpRequest:error");q.onload=function(){u()};q.onerror=function(){v()};q.onreadystatechange=function(){if(q.readyState==4)if(q.status==200)u();else v()};return t}function m(o,p,q,r){__p&&__p();q.suppress_http_code=1;var s=i.encode(q);if(p!="post"){o=i.appendToUrl(o,s);s=""}var t=l(p,o);if(!t)return false;t.onload=function(u){r(k(u.responseText))};t.onerror=function(u){if(u.responseText)r(k(u.responseText));else r({error:babelHelpers["extends"]({},j.PARSE_ERROR_TEMPLATE,{status:u.status})})};t.send(s);return true}var n={execute:m};f.exports=n}),null);
__d("GraphBatchConstants",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({FLUSH_DELIMITER:"\r\n"})}),null);
__d("ChunkedRequest",["GraphBatchConstants","QueryString","RequestConstants","sdk.safelyParseResponse","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m="{}";function n(){var r=arguments.length<=0||arguments[0]===undefined?h.FLUSH_DELIMITER:arguments[0];"use strict";this.offset=0;this.delimiter=h.FLUSH_DELIMITER;this.delimiter=r}n.prototype.parse=function(r){__p&&__p();var s=arguments.length<=1||arguments[1]===undefined?false:arguments[1];"use strict";var t=[],u=r.substring(this.offset),v=0,w=ES(u,"indexOf",true,this.delimiter,v);if(w===0){v=this.delimiter.length;w=ES(u,"indexOf",true,this.delimiter,v)}while(w>-1){var x=u.substring(v,w);if(x)t.push(x);v=w+this.delimiter.length;w=ES(u,"indexOf",true,this.delimiter,v)}this.offset+=v;if(s&&u&&w===-1){var y=r.substring(this.offset);t.push(y)}return t};function o(r,s){__p&&__p();if(!self.XMLHttpRequest)return null;var t=new XMLHttpRequest();if(!("withCredentials"in t))return null;t.open(r,s,true);t.setRequestHeader("Content-type","application/x-www-form-urlencoded");var u=new n(),v={send:function y(z){t.send(z)}},w=l(function(y,z){if(v.onchunk){var A=u.parse(y);ES(A,"forEach",true,function(B){return v.onchunk(B,z)});if(z)v.onchunk(m,z)}},"entry","XMLHttpRequest:onchunk"),x=l(function(){if(v.onerror)v.onerror(t)},"entry","XMLHttpRequest:error");t.onerror=x;t.onreadystatechange=function(){if(t.readyState==4)if(t.status===200)w(t.responseText,true);else x();else if(t.readyState==3)w(t.responseText,false)};return v}function p(r,s,t,u){__p&&__p();t.suppress_http_code=1;var v=i.encode(t);if(s!="post"){r=i.appendToUrl(r,v);v=""}var w=o(s,r);if(!w)return false;w.onchunk=function(x,y){u(k(x),y)};w.onerror=function(x){if(x.responseText)u(k(x.responseText));else u({error:babelHelpers["extends"]({},j.PARSE_ERROR_TEMPLATE,{status:x.status})})};w.send(v);return true}var q={execute:p};f.exports=q}),null);
__d("FlashRequest",["DOMWrapper","Flash","GlobalCallback","QueryString","Queue"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m,n={},o,p;function q(){__p&&__p();if(!o)throw new Error("swfUrl has not been set");var t=j.create(function(){m.start(function(v){var w=p.execute(v.method,v.url,v.body);if(!w)throw new Error("Could create request");n[w]=v.callback})}),u=j.create(function(v,w,x){var y;try{y=ES("JSON","parse",false,decodeURIComponent(x))}catch(z){y={error:{type:"SyntaxError",message:z.message,status:w,raw:x}}}n[v](y);delete n[v]});p=i.embed(o,h.getRoot(),null,{log:false,initCallback:t,requestCallback:u})}function r(t,u,v,w){__p&&__p();v.suppress_http_code=1;if(!v.method)v.method=u;var x=k.encode(v);if(u==="get"&&t.length+x.length<2e3){t=k.appendToUrl(t,x);x=""}else u="post";if(!m){if(!i.isAvailable())return false;m=new l();q()}m.enqueue({method:u,url:t,body:x,callback:w});return true}var s={setSwfUrl:function t(u){o=u},execute:r};f.exports=s}),null);
__d("JSONPRequest",["DOMWrapper","GlobalCallback","QueryString"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k=2e3,l=false;function m(p,q,r,s){__p&&__p();var t=document.createElement("script"),u=function w(x){u=function w(){};i.remove(r.callback);s(x);t.parentNode.removeChild(t)};r.callback=i.create(u);if(!r.method)r.method=q;p=j.appendToUrl(p,r);if(!l&&p.length>k){i.remove(r.callback);return false}t.onerror=function(){u({error:{type:"http",message:"unknown error"}})};var v=function v(){setTimeout(function(){u({error:{type:"http",message:"unknown error"}})},0)};if(t.addEventListener)t.addEventListener("load",v,false);else t.onreadystatechange=function(){if(/loaded|complete/.test(this.readyState))v()};t.src=p;h.getRoot().appendChild(t);return true}function n(){l=true}var o={execute:m,ignoreMaxQuerystringLength:n,MAX_QUERYSTRING_LENGTH:k};f.exports=o}),null);
__d("ApiClient",["ApiBatcher","ApiClientUtils","Assert","ChunkedRequest","CORSRequest","FlashRequest","flattenObject","JSONPRequest","Log","ObservableMixin","QueryString","UrlMap","ApiClientConfig"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){__p&&__p();var u,v,w,x=o.MAX_QUERYSTRING_LENGTH,y={fql_query:true,fql_multiquery:true,friends_get:true,notifications_get:true,stream_get:true,users_getinfo:true},z=["jsonp","cors","flash"],A=0,B=[],C=0,D=0,E;function F(M,N,O,P){__p&&__p();var Q=C!==0&&A>=C;if(Q){B.push(function(){return F(M,N,O,P)});K.inform("request.queued",M,N,O);return}A++;if(w)O=ES("Object","assign",false,{},w,O);O.pretty=O.pretty||0;O=n(O);var R={jsonp:o,cors:l,flash:m,chunked:k},S={},T=O.access_token||u;if(T)S.access_token=T;var U=ES("Object","keys",false,S);if(U.length>0){M=r.appendToUrl(M,S);ES(U,"forEach",true,function(Z){return delete O[Z]})}var V;if(O.transport){V=[O.transport];delete O.transport}else V=z;for(var W=0;W<V.length;W++){var X=R[V[W]],Y=ES("Object","assign",false,{},O);if(X.execute(M,N,Y,P))return}P({error:{type:"no-transport",message:"Could not find a usable transport for request"}})}function G(M,N,O,P,Q,R,S,T){__p&&__p();if(P.transport&&P.transport==="chunked"&&T===false){M(S,false);return}if(S&&S.error)K.inform("request.error",N,O,P,S,ES("Date","now",false)-Q,R);K.inform("request.complete",N,O,P,S,ES("Date","now",false)-Q,R);A--;if(M)M(S);var U=B.length>0&&A<C;if(U){var V=B.shift();V()}}function H(){for(var M=arguments.length,N=Array(M),O=0;O<M;O++)N[O]=arguments[O];var P=i.parseCallDataFromArgs(N),Q=P.uri,R=P.callback,S=P.params,T=S.method;if(L(Q,T))T="post";var U=Q.getProtocol()&&Q.getDomain()?Q.setQueryData({}).toString():s.resolve("graph")+Q.getPath(),V=D++;K.inform("request.prepare",U,S,V);F(U,T=="get"?"get":"post",S,ES(G,"bind",true,null,R,Q.getPath(),T,S,ES("Date","now",false),V))}function I(){var M;if(!E)E=new h(H,v);(M=E).scheduleBatchCall.apply(M,arguments)}function J(M,N){j.isObject(M);j.isString(M.method,"method missing");if(!N)p.warn("No callback passed to the ApiClient");var O=M.method.toLowerCase().replace(".","_");M.format="json-strings";M.api_key=v;var P=O in y?"api_read":"api",Q=s.resolve(P)+"/restserver.php",R=D++,S=ES(G,"bind",true,null,N,"/restserver.php","get",M,ES("Date","now",false),R);F(Q,"get",M,S)}var K=ES("Object","assign",false,new q(),{setAccessToken:function M(N){u=N},setAccessTokenForClientID:function M(N,O){if(!(u&&v&&v!==O))u=N},getAccessToken:function M(){return u},setClientID:function M(N){v=N},setDefaultParams:function M(N){w=N},setDefaultTransports:function M(N){z=N},setMaxConcurrentRequests:function M(N){C=N},getCurrentlyExecutingRequestCount:function M(){return A},getQueuedRequestCount:function M(){return B.length},rest:J,graph:H,scheduleBatchCall:I,prepareBatchParams:h.prepareBatchParams});function L(M,N){return M.toString().length>x&&N==="get"}m.setSwfUrl(t.FlashRequest.swfUrl);f.exports=K}),null);
__d("sdk.PlatformVersioning",["sdk.Runtime","ManagedError"],(function a(b,c,d,e,f,g,h,i){var j=/^v\d+\.\d\d?$/,k={REGEX:j,assertVersionIsSet:function l(){if(!h.getVersion())throw new i("init not called with valid version")},assertValidVersion:function l(m){if(!j.test(m))throw new i("invalid version specified")}};f.exports=k}),null);
__d("sdk.api",["ApiClient","sdk.PlatformVersioning","sdk.Runtime","sdk.Scribe","sdk.URI","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n=m("should_log_response_error",false),o;j.subscribe("ClientID.change",function(q){return h.setClientID(q)});j.subscribe("AccessToken.change",function(q){o=q;h.setAccessToken(q)});h.setDefaultParams({sdk:"joey"});h.subscribe("request.complete",function(q,r,s,t){__p&&__p();var u=false;if(t&&typeof t=="object")if(t.error){if(t.error=="invalid_token"||t.error.type=="OAuthException"&&t.error.code==190)u=true}else if(t.error_code)if(t.error_code=="190")u=true;if(u&&o===j.getAccessToken())j.setAccessToken(null)});h.subscribe("request.complete",function(q,r,s,t){if((q=="/me/permissions"&&r==="delete"||q=="/restserver.php"&&s.method=="Auth.revokeAuthorization")&&t===true)j.setAccessToken(null)});h.subscribe("request.error",function(q,r,s,t){if(n&&t.error.type==="http")k.log("jssdk_error",{appId:j.getClientID(),error:"transport",extra:{name:"transport",message:ES("JSON","stringify",false,t.error)}})});function p(q){__p&&__p();if(typeof q==="string")if(j.getIsVersioned()){i.assertVersionIsSet();if(!/https?/.test(q)&&q.charAt(0)!=="/")q="/"+q;q=new l(q).setDomain(null).setProtocol(null).toString();if(!i.REGEX.test(q.substring(1,ES(q,"indexOf",true,"/",1))))q="/"+j.getVersion()+q;var r=[q].concat(Array.prototype.slice.call(arguments,1));h.graph.apply(h,r)}else h.graph.apply(h,arguments);else h.rest.apply(h,arguments)}f.exports=p}),null);
__d("legacy:fb.api",["FB","sdk.api"],(function a(b,c,d,e,f,g,h,i){h.provide("",{api:i})}),3);
__d("AppUserPropertyAPIBuiltinField",[],(function a(b,c,d,e,f,g){f.exports={GENDER:"$gender",CITY:"$city",STATE:"$state",ZIPCODE:"$zipcode",COUNTRY:"$country",LANGUAGE:"$language",CURRENCY:"$currency",INSTALL_SOURCE:"$install_source",USER_TYPE:"$user_type",ACCOUNT_CREATED_TIME:"$account_created_time"}}),null);
__d("FBEventsParamList",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h="deep",i="shallow";function j(){this.list=[]}j.prototype={append:function l(m,n){this._append(encodeURIComponent(m),n,h)},_append:function l(m,n,o){if(Object(n)!==n)this._appendPrimitive(m,n);else if(o===h)this._appendObject(m,n);else this._appendPrimitive(m,k(n))},_appendPrimitive:function l(m,n){if(n!=null)this.list.push([m,n])},_appendObject:function l(m,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var p=m+"["+encodeURIComponent(o)+"]";this._append(p,n[o],i)}},each:function l(m){var n=this.list;for(var o=0,p=n.length;o<p;o++)m(n[o][0],n[o][1])},toQueryString:function l(){var m=[];this.each(function(n,o){m.push(n+"="+encodeURIComponent(o))});return m.join("&")}};function k(l){if(typeof JSON==="undefined"||JSON===null||!ES("JSON","stringify",false))return Object.prototype.toString.call(l);else return ES("JSON","stringify",false,l)}f.exports=j}),null);
__d("FBEventsUtils",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h="console",i="error",j="Facebook Pixel Error",k="Facebook Pixel Warning",l="warn",m=Object.prototype.toString,n=!("addEventListener"in document),o=function o(){},p=window[h]||{},q=window.postMessage||o;function r(w){return ES("Array","isArray",false)?ES("Array","isArray",false,w):m.call(w)==="[object Array]"}function s(w){q({action:"FB_LOG",logType:j,logMessage:w},"*");if(i in p)p[i](j+": "+w)}function t(w){q({action:"FB_LOG",logType:k,logMessage:w},"*");if(l in p)p[l](k+": "+w)}function u(w,x,y){x=n?"on"+x:x;var z=n?"attachEvent":"addEventListener",A=n?"detachEvent":"removeEventListener",B=function B(){w[A](x,B,false);y()};w[z](x,B,false)}function v(w,x,y){var z=w[x];w[x]=function(){var A=z.apply(this,arguments);y.apply(this,arguments);return A}}g.isArray=r;g.logError=s;g.logWarning=t;g.listenOnce=u;g.injectMethod=v}),null);
__d("FBPixelEndpoint",["FBEventsParamList","FBEventsUtils"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j="https://www.facebook.com/tr/",k=location.href,l=window.top!==window,m=document.referrer;function n(s,t,u,v){__p&&__p();v=v||{};var w=new h();w.append("id",s);w.append("ev",t);w.append("dl",k);w.append("rl",m);w.append("if",l);w.append("ts",new Date().valueOf());w.append("cd",u);w.append("sw",window.screen.width);w.append("sh",window.screen.height);for(var x in v)w.append(x,v[x]);return w}function o(s,t,u,v){var w=n(s,t,u,v),x=w.toQueryString();if(2048>(j+"?"+x).length)p(j,x);else q(j,w)}function p(s,t){var u=new Image();u.src=s+"?"+t}function q(s,t){__p&&__p();var u="fb"+Math.random().toString().replace(".",""),v=document.createElement("form");v.method="post";v.action=s;v.target=u;v.acceptCharset="utf-8";v.style.display="none";var w=!!(window.attachEvent&&!window.addEventListener),x=w?'<iframe name="'+u+'">':"iframe",y=document.createElement(x);y.src="javascript:false";y.id=u;y.name=u;v.appendChild(y);i.listenOnce(y,"load",function(){t.each(function(u,z){var A=document.createElement("input");A.name=u;A.value=z;v.appendChild(A)});i.listenOnce(y,"load",function(){v.parentNode.removeChild(v)});v.submit()});document.body.appendChild(v)}var r={sendEvent:o};f.exports=r}),null);
__d("FBAppEvents",["ApiClient","FBPixelEndpoint"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();function j(l,m,n,o,p){var q={};if(o!=null)q.vts=o.toString();if(p!=null)q.at=p;i.sendEvent(l.toString(),m,n,q)}function k(l,m,n,o){var p="/"+m+"/user_properties",q={data:[{user_unique_id:l,custom_data:n}]};h.graph(p,"post",q,o)}f.exports={logEvent:j,updateUserProperties:k}}),null);
__d("sdk.AppEvents",["AppUserPropertyAPIBuiltinField","Assert","sdk.Event","sdk.Impressions","sdk.Model","sdk.Runtime","FBAppEvents","sdk.Auth"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){__p&&__p();var p=Object.freeze({COMPLETED_REGISTRATION:"fb_mobile_complete_registration",VIEWED_CONTENT:"fb_mobile_content_view",SEARCHED:"fb_mobile_search",RATED:"fb_mobile_rate",COMPLETED_TUTORIAL:"fb_mobile_tutorial_completion",ADDED_TO_CART:"fb_mobile_add_to_cart",ADDED_TO_WISHLIST:"fb_mobile_add_to_wishlist",INITIATED_CHECKOUT:"fb_mobile_initiated_checkout",ADDED_PAYMENT_INFO:"fb_mobile_add_payment_info",ACHIEVED_LEVEL:"fb_mobile_level_achieved",UNLOCKED_ACHIEVEMENT:"fb_mobile_achievement_unlocked",PAGE_VIEW:"fb_page_view",SPENT_CREDITS:"fb_mobile_spent_credits"}),q=Object.freeze({ACTIVATED_APP:"fb_mobile_activate_app",PURCHASED:"fb_mobile_purchase"}),r=Object.freeze({APP_USER_ID:"_app_user_id",APP_VERSION:"_appVersion",CURRENCY:"fb_currency",REGISTRATION_METHOD:"fb_registration_method",CONTENT_TYPE:"fb_content_type",CONTENT_ID:"fb_content_id",SEARCH_STRING:"fb_search_string",SUCCESS:"fb_success",MAX_RATING_VALUE:"fb_max_rating_value",PAYMENT_INFO_AVAILABLE:"fb_payment_info_available",NUM_ITEMS:"fb_num_items",LEVEL:"fb_level",DESCRIPTION:"fb_description"}),s=/^[0-9a-zA-Z_][0-9a-zA-Z _-]{0,39}$/,t=40,u=s,v=t,w=100,x=100,y=100,z=100,A=ES("Object","values",false,h),B=new l({UserID:"",Version:""});function C(T,U,V,W){var X={ae:1,ev:U,vts:V,canvas:1};if(W)X.cd=W;k.impression({api_key:T,payload:ES("JSON","stringify",false,X)})}function D(T,U,V,W){var X=o.getAuthResponse(),Y=X&&X.accessToken?X.accessToken:null;n.logEvent(T,U,W||{},V,Y)}function E(T,U,V,W){__p&&__p();F(U);var X=B.getUserID();if(X!==""){W=W||{};W[r.APP_USER_ID]=X}var Y=B.getVersion();if(Y!==""){W=W||{};W[r.APP_VERSION]=Y}if(m.isCanvasEnvironment())C(T,U,V,W);else D(T,U,V,W)}function F(T){i.isTrue(s.test(T),"Invalid event name: "+T+". It must be between 1 and "+t+" characters, and must be contain only alphanumerics, _, - or spaces, starting with alphanumeric or _.")}function G(T,U,V,W){var X={};X[r.CURRENCY]=V;E(T,q.PURCHASED,U,babelHelpers["extends"]({},W,X))}function H(T){E(T,q.ACTIVATED_APP)}function I(T){E(T,p.PAGE_VIEW)}function J(T){i.isTrue(T.length!==0,"User ID must be set before updateUserProperties can be called.");i.isTrue(T.length<=w,"Invalid user ID: "+T+". It must be no longer than "+w+" characters.")}function K(T){J(T);B.setUserID(T)}function L(){return B.getUserID()}function M(){B.setUserID("")}function N(T){i.isTrue(T.length<=x,"Invalid app version: "+T+". It must be no longer than "+x+" characters.")}function O(T){N(T);B.setVersion(T)}function P(){return B.getVersion()}function Q(){B.setVersion("")}function R(T){i.isTrue(ES("Object","keys",false,T).length<=y,"The total number of user properties cannot exceed "+y+".");for(var U in T){i.isTrue(u.test(U)||ES(A,"includes",true,U),"Invalid user properties key name: "+U+". It must be between 1 and "+v+" characters, and must contain only alphanumerics, _, - or spaces, starting with alphanumeric or _. Or, it must be a pre-defined user property");i.isTrue(T[U].toString().length<=z,"Invalid user properties value: "+T[U]+". It must be no longer than "+z+" characters.")}}function S(T,U,V){var W=L();J(W);R(U);n.updateUserProperties(W,T,U,V)}j.subscribe("init:post",function(T){if(m.getClientID()){if(T.autoLogAppEvents!==undefined){i.isBoolean(T.autoLogAppEvents,"Type of property autoLogAppEvents must be boolean");m.setAutoLogAppEvents(T.autoLogAppEvents)}if(m.getAutoLogAppEvents())I(m.getClientID())}});f.exports={activateApp:H,logEvent:E,logPurchase:G,logPageView:I,assertValidEventName:F,EventNames:p,ParameterNames:r,assertValidUserID:J,setUserID:K,getUserID:L,clearUserID:M,assertValidUserProperties:R,updateUserProperties:S,setAppVersion:O,getAppVersion:P,clearAppVersion:Q,assertValidAppVersion:N}}),null);
__d("legacy:fb.appevents",["Assert","sdk.AppEvents","FB","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();function l(){var m=k.getClientID();h.isTrue(m!==null&&m.length>0,"You need to call FB.init() with App ID first.");return m}j.provide("AppEvents",{logEvent:function m(n,o,p){i.logEvent(l(),n,o,p)},logPurchase:function m(n,o,p){i.logPurchase(l(),n,o,p)},activateApp:function m(){i.activateApp(l())},logPageView:function m(){i.logPageView(l())},setUserID:function m(n){i.setUserID(n)},getUserID:function m(){return i.getUserID()},clearUserID:function m(){i.clearUserID()},updateUserProperties:function m(n,o){i.updateUserProperties(l(),n,o)},setAppVersion:function m(n){i.setAppVersion(n)},getAppVersion:function m(){return i.getAppVersion()},clearAppVersion:function m(){i.clearAppVersion()},EventNames:i.EventNames,ParameterNames:i.ParameterNames})}),3);
__d("resolveURI",[],(function a(b,c,d,e,f,g){function h(i){if(!i)return window.location.href;i=i.replace(/&/g,"&amp;").replace(/\"/g,"&quot;");var j=document.createElement("div");j.innerHTML='<a href="'+i+'"></a>';return j.firstChild.href}f.exports=h}),null);
__d("sdk.Canvas.Environment",["sdk.RPC"],(function a(b,c,d,e,f,g,h){function i(l){h.remote.getPageInfo(function(m){l(m.result)})}function j(l,m){h.remote.scrollTo({x:l||0,y:m||0})}h.stub("getPageInfo");h.stub("scrollTo");var k={getPageInfo:i,scrollTo:j};f.exports=k}),null);
__d("sdk.DialogUtils",["sdk.Content","sdk.DOM","DOMEventListener","sdk.UA","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l){"use strict";__p&&__p();var m={isOrientationPotrait:function n(){return window.innerWidth<window.innerHeight},addDoubleClickAction:function n(o,p,q){var r=null;return j.add(o,"click",function(){if(r!==null){clearTimeout(r);r=null;p()}r=setTimeout(function(){r=null},q)})},addIdleDesktopAction:function n(o,p,q){var r=void 0,event=void 0,s=function s(){r=setTimeout(p,q)};s();return j.add(o,"mouseenter",function(){clearTimeout(r);if(!event)event=j.add(o,"mouseleave",function(){s()})})},addMobileOrientationChangeAction:function n(o){if(!k.mobile())return null;var event="onorientationchange"in window?"orientationchange":"resize",p=function p(q){return setTimeout(function(q){return o(q)},50)};return j.add(window,event,p)},applyScreenDimensions:function n(o){if(o==null)return;var p=i.getViewportInfo();o.style.minHeight=p.height||p.width?p.height+"px":"";o.style.top=p.scrollTop?p.scrollTop+"px":""},setDialogPositionToCenter:function n(o,p,q){__p&&__p();var r=function r(B){return typeof B==="number"?B:parseInt(B,10)},s=i.getViewportInfo(),t=r(o.offsetWidth),u=r(o.offsetHeight),v=s.scrollLeft+(s.width-t)/2,w=(s.height-u)/2.5;if(v<w)w=v;var x=s.height-u-w,y=(s.height-u)/2;if(q)y=q.scrollTop-q.offsetTop+(q.clientHeight-u)/2;if(y<w)y=w;else if(y>x)y=x;y+=s.scrollTop;if(k.mobile()){var z=100;if(p){z+=(s.height-u)/2;i.addCss(document.body,"fb_reposition")}else{i.addCss(document.body,"fb_hidden");if(l("dialog_resize_refactor",false))document.body.style.width="auto";y=1e4}var A=i.getByClass("fb_dialog_padding",o);if(A.length)A[0].style.height=z+"px"}o.style.left=(v>0?v:0)+"px";o.style.top=(y>0?y:0)+"px"},setDialogPositionToTop:function n(o,p,q){this.setDialogPositionToCenter(o,p,q);var r=i.getViewportInfo(),s=r.scrollTop+(r.height-o.offsetHeight)*.05;i.setStyle(o,"top",s+"px")},setupNewDarkOverlay:function n(){var o=document.createElement("div");o.setAttribute("id","fb_dialog_ipad_overlay");this.applyScreenDimensions(o);return o},setupNewDialog:function n(o){__p&&__p();o=o||{};var p=document.createElement("div"),q=o,r=q.onClose;if(o.closeIcon&&r){var s=document.createElement("a");s.className="fb_dialog_close_icon";j.add(s,"click",r);p.appendChild(s)}var t="fb_dialog";t+=" "+(o.classes||"");if(k.ie()){t+=" fb_dialog_legacy";ES(["vert_left","vert_right","horiz_top","horiz_bottom","top_left","top_right","bottom_left","bottom_right"],"forEach",true,function(x){var y=document.createElement("span");y.className="fb_dialog_"+x;p.appendChild(y)})}else t+=k.mobile()?" fb_dialog_mobile":" fb_dialog_advanced";p.className=t;if(o.width){var u=parseInt(o.width,10);if(!isNaN(u))p.style.width=u+"px"}var v=document.createElement("div");if(o.content)h.append(o.content,v);v.className="fb_dialog_content";p.appendChild(v);if(k.mobile()){var w=document.createElement("div");w.className="fb_dialog_padding";p.appendChild(w)}return{dialogElement:p,contentRoot:v}},onDialogHideCleanup:function n(o){var p=document.body;if(o)i.removeCss(p,"fb_reposition");else i.removeCss(p,"fb_hidden")}};f.exports=m}),null);
__d("sdk.fbt",[],(function a(b,c,d,e,f,g){var h={_:function i(j){return typeof j==="string"?j:j[0]}};f.exports=h}),null);
__d("sdk.Dialog",["sdk.Canvas.Environment","sdk.Content","sdk.DialogUtils","sdk.DOM","DOMEventListener","ObservableMixin","sdk.Runtime","Type","sdk.UA","sdk.fbt","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){__p&&__p();var s=30,t=590,u=500,v=240,w=575;function x(){if(r("dialog_resize_refactor",false)){var A=k.getViewportInfo();if(A.height&&A.width)return{width:Math.min(A.width,u),height:Math.min(A.height,t)}}return null}var y=o.extend({constructor:function y(A,B){__p&&__p();this.parent();this.id=A;this.display=B;this._e2e={};if(!z._dialogs){z._dialogs={};z._addOrientationHandler()}z._dialogs[A]=this;this.trackEvent("init")},trackEvent:function A(B,C){if(this._e2e[B])return this;this._e2e[B]=C||ES("Date","now",false);if(B=="close")this.inform("e2e:end",this._e2e);return this},trackEvents:function A(B){if(typeof B==="string")B=ES("JSON","parse",false,B);for(var C in B)if(Object.prototype.hasOwnProperty.call(B,C))this.trackEvent(C,B[C]);return this}},m),z={newInstance:function A(B,C){return new y(B,C)},_dialogs:null,_lastYOffset:0,_overlayListeners:[],_loaderEl:null,_overlayEl:null,_stack:[],_active:null,_forceTabletStyle:null,_closeOnOverlayTap:null,_positionDialogAtTopWhenPortrait:null,get:function A(B){return z._dialogs[B]},_findRoot:function A(B){while(B){if(k.containsCss(B,"fb_dialog"))return B;B=B.parentNode}},_createWWWLoader:function A(B){B=B?B:460;return z.create({content:'<div class="dialog_title">  <a id="fb_dialog_loader_close">    <div class="fb_dialog_close_icon"></div>  </a>  <span>Facebook</span>  <div style="clear:both;"></div></div><div class="dialog_content"></div><div class="dialog_footer"></div>',width:B})},_createMobileLoader:function A(){var B;if(p.nativeApp())B='<div class="dialog_header"></div>';else if(z.isTabletStyle())B='<div class="overlayLoader"><div id="fb_dialog_loader_spinner"></div><a id="fb_dialog_loader_close" href="#">'+q._("Cancel")+"</a></div>";else B='<div class="dialog_header"><table>  <tbody>    <tr>      <td class="header_left">        <label class="touchable_button">          <input type="submit" value="'+q._("Cancel")+'"            id="fb_dialog_loader_close"/>        </label>      </td>      <td class="header_center">        <div>         '+q._("Loading...")+'        </div>      </td>      <td class="header_right">      </td>    </tr>  </tbody></table></div>';return z.create({classes:"loading"+(z.isTabletStyle()?" centered":""),content:B})},_setDialogOverlayStyle:function A(){j.applyScreenDimensions(z._overlayEl)},_showTabletOverlay:function A(B){__p&&__p();if(!z.isTabletStyle())return;if(!z._overlayEl){z._overlayEl=j.setupNewDarkOverlay();i.append(z._overlayEl,null)}if(z._closeOnOverlayTap){var C=j.addDoubleClickAction(z._overlayEl,ES(B,"bind",true,this),5e3);z._overlayListeners.push(C)}z._overlayEl.className=""},_hideTabletOverlay:function A(){if(z.isTabletStyle()){z._overlayEl.className="hidden";ES(z._overlayListeners,"forEach",true,function(B){return B.remove()});z._overlayListeners=[]}},showLoader:function A(B,C){__p&&__p();if(!B)B=function B(){};var D=function D(){z._hideLoader();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();B()};z._showTabletOverlay(D);if(!z._loaderEl)z._loaderEl=z._findRoot(p.mobile()?z._createMobileLoader():z._createWWWLoader(C));var E=document.getElementById("fb_dialog_loader_close");if(E){k.removeCss(E,"fb_hidden");var F=l.add(E,"click",D);z._overlayListeners.push(F)}z._makeActive(z._loaderEl)},setCloseOnOverlayTap:function A(B){z._closeOnOverlayTap=!!B},setPositionDialogAtTopWhenPortrait:function A(B){z._positionDialogAtTopWhenPortrait=!!B},_hideLoader:function A(){if(z._loaderEl&&z._loaderEl==z._active)z._loaderEl.style.top="-10000px"},_makeActive:function A(B){z._setDialogSizes();z._lowerActive();z._active=B;if(n.isEnvironment(n.ENVIRONMENTS.CANVAS))h.getPageInfo(function(C){z._centerActive(C)});z._centerActive()},_lowerActive:function A(){if(!z._active)return;z._active.style.top="-10000px";z._active=null},_removeStacked:function A(B){z._stack=ES(z._stack,"filter",true,function(C){return C!=B})},_centerActive:function A(B){var C=z._active;if(!C)return;if(z._positionDialogAtTopWhenPortrait&&j.isOrientationPotrait())j.setDialogPositionToTop(C,z.isTabletStyle(),B);else j.setDialogPositionToCenter(C,z.isTabletStyle(),B)},_setDialogSizes:function A(){__p&&__p();var B=arguments.length<=0||arguments[0]===undefined?false:arguments[0];if(!p.mobile())return;for(var C in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,C)){var D=document.getElementById(C);if(D){D.style.width=z.getDefaultSize().width+"px";if(!B)D.style.height=z.getDefaultSize().height+"px"}}},getDefaultSize:function A(){__p&&__p();if(p.mobile()){var B=x();if(B){if(k.getViewportInfo().width<=B.width)B.width=k.getViewportInfo().width-s;if(k.getViewportInfo().height<=B.height)B.height=k.getViewportInfo().height-s;return B}if(p.ipad())return{width:u,height:t};if(p.android())return{width:screen.availWidth,height:screen.availHeight};else{var C=window.innerWidth,D=window.innerHeight,E=C/D>1.2;return{width:C,height:Math.max(D,E?screen.width:screen.height)}}}return{width:w,height:v}},_handleOrientationChange:function A(){__p&&__p();var B=r("dialog_resize_refactor",false)?k.getViewportInfo().width:screen.availWidth;z._availScreenWidth=B;if(z.isTabletStyle()){z._setDialogSizes(true);z._centerActive();z._setDialogOverlayStyle()}else{var C=z.getDefaultSize().width;for(var D in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,D)){var E=document.getElementById(D);if(E)E.style.width=C+"px"}}},_addOrientationHandler:function A(){if(!p.mobile())return null;z._availScreenWidth=r("dialog_resize_refactor",false)?k.getViewportInfo().width:screen.availWidth;j.addMobileOrientationChangeAction(z._handleOrientationChange)},create:function A(B){var C=j.setupNewDialog(B);i.append(C.dialogElement);if(B.visible)z.show(C.dialogElement);if(typeof B.styles==="object")ES("Object","assign",false,C.dialogElement.style,B.styles);return C.contentRoot},show:function A(B){var C=z._findRoot(B);if(C){z._removeStacked(C);z._hideLoader();z._makeActive(C);z._stack.push(C);if("fbCallID"in B)z.get(B.fbCallID).inform("iframe_show").trackEvent("show")}},hide:function A(B){var C=z._findRoot(B);z._hideLoader();if(C==z._active){z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();if("fbCallID"in B)z.get(B.fbCallID).inform("iframe_hide").trackEvent("hide")}},remove:function A(B){__p&&__p();B=z._findRoot(B);if(B){var C=z._active==B;z._removeStacked(B);if(C){z._hideLoader();if(z._stack.length>0)z.show(z._stack.pop());else{z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay()}}else if(z._active===null&&z._stack.length>0)z.show(z._stack.pop());setTimeout(function(){B.parentNode.removeChild(B)},3e3)}},isActive:function A(B){var C=z._findRoot(B);return C&&C===z._active},setForceTabletStyle:function A(B){z._forceTabletStyle=!!B},isTabletStyle:function A(){__p&&__p();var B;if(!p.mobile())return false;if(z._forceTabletStyle)return true;if(r("dialog_resize_refactor",false)){var C=x();B=C&&(C.height>=t||C.width>=u)}else B=!!p.ipad();return B}};f.exports=z}),null);
__d("sdk.Extensions",["sdk.UA","JSONRPC","Queue"],(function a(b,c,d,e,f,g,h,i,j){"use strict";__p&&__p();var k=new j(),l=new i(function(p){k.enqueue(p)}),m=new j();m.start(function(p){l.read(p)});var n=o();if(n){window._FBBrowserCallbackHandler=function(p){m.enqueue(ES("JSON","stringify",false,p))};n.initializeCallbackHandler(ES("JSON","stringify",false,{name:"_FBBrowserCallbackHandler"}));k.start(function(p){n.jsonRPC(p)})}function o(){if(window._FBSdkExtensions&&window._FBSdkExtensions.jsonRPC&&window._FBSdkExtensions.initializeCallbackHandler&&window._FBSdkExtensions.supportsDialog)return window._FBSdkExtensions;return null}f.exports={local:l.local,remote:l.remote,stub:ES(l.stub,"bind",true,l),supportsDialog:function p(q){if(n)return n.supportsDialog(q);return false}}}),null);
__d("sdk.Frictionless",["sdk.Auth","sdk.api","sdk.Event","sdk.Dialog"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();var l={_allowedRecipients:{},_useFrictionless:false,_updateRecipients:function m(){l._allowedRecipients={};i("/me/apprequestformerrecipients",function(n){if(!n||n.error)return;ES(n.data,"forEach",true,function(o){l._allowedRecipients[o.recipient_id]=true})})},init:function m(){l._useFrictionless=true;h.getLoginStatus(function(n){if(n.status=="connected")l._updateRecipients()});j.subscribe("auth.login",function(n){if(n.authResponse)l._updateRecipients()})},_processRequestResponse:function m(n,o){__p&&__p();return function(p){__p&&__p();var q=p&&p.updated_frictionless;if(l._useFrictionless&&q)l._updateRecipients();if(p){if(!o&&p.frictionless){k._hideLoader();k._restoreBodyPosition();k._hideIPadOverlay()}delete p.frictionless;delete p.updated_frictionless}n&&n(p)}},isAllowed:function m(n){__p&&__p();if(!n)return false;if(typeof n==="number")return n in l._allowedRecipients;if(typeof n==="string")n=n.split(",");n=ES(n,"map",true,function(q){return ES(String(q),"trim",true)});var o=true,p=false;ES(n,"forEach",true,function(q){o=o&&q in l._allowedRecipients;p=true});return o&&p}};j.subscribe("init:post",function(m){if(m.frictionlessRequests)l.init()});f.exports=l}),null);
__d("sdk.Native",["Log","sdk.UA"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j="fbNativeReady",k={onready:function l(m){__p&&__p();if(!i.nativeApp()){h.error("FB.Native.onready only works when the page is rendered in a WebView of the native Facebook app. Test if this is the case calling FB.UA.nativeApp()");return}if(window.__fbNative&&!this.nativeReady)ES("Object","assign",false,this,window.__fbNative);if(this.nativeReady)m();else{var n=function n(o){window.removeEventListener(j,n);this.onready(m)};window.addEventListener(j,n,false)}}};f.exports=k}),null);
__d("sdk.openMessenger",["sdk.UA"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i="https://itunes.apple.com/us/app/messenger/id454638411",j="https://play.google.com/store/apps/details?id=com.facebook.orca",k=3e3;function l(m){__p&&__p();var n=void 0,o=void 0,p=m.link,q=m.app_id;if(h.android()){n="intent://share/#Intent;package=com.facebook.orca;scheme=fb-messenger;S.android.intent.extra.TEXT="+encodeURIComponent(p)+";S.trigger=send_plugin;";if(q)n+="S.platform_app_id="+encodeURIComponent(q)+";";n+="end";o=j}else{n="fb-messenger://share?link="+encodeURIComponent(p);if(q)n+="&app_id="+encodeURIComponent(q);o=i}setTimeout(function(){window.location.href=o},k);window.location.href=n}f.exports=l}),null);
__d("sdk.UIServer",["sdk.Auth","sdk.Extensions","sdk.Content","sdk.DOM","sdk.Dialog","sdk.Event","sdk.Frictionless","Log","sdk.Native","QueryString","sdk.RPC","sdk.Runtime","JSSDKConfig","sdk.UA","UrlMap","sdk.XD","createObjectFrom","sdk.feature","sdk.fbt","flattenObject","sdk.getContextType","guid","insertIframe","sdk.openMessenger","resolveURI"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F){__p&&__p();var G={transform:function N(O){if(O.params.display==="touch"&&M.canIframe(O.params)&&window.postMessage){O.params.channel=M._xdChannelHandler(O.id,"parent");if(!u.nativeApp())O.params.in_iframe=1;return O}else return M.genericTransform(O)},getXdRelation:function N(O){var P=O.display;if(P==="touch"&&window.postMessage&&O.in_iframe)return"parent";return M.getXdRelation(O)}};function H(N){return N.method=="permissions.oauth"||N.method=="permissions.request"||N.method=="oauth"}var I={"stream.share":{size:{width:670,height:340},url:"sharer.php",transform:function N(O){if(!O.params.u)O.params.u=window.location.toString();O.params.display="popup";return O}},apprequests:{transform:function N(O){__p&&__p();O=G.transform(O);O.params.frictionless=n&&n._useFrictionless;if(O.params.frictionless){if(n.isAllowed(O.params.to)){O.params.display="iframe";O.params.in_iframe=true;O.hideLoader=true}O.cb=n._processRequestResponse(O.cb,O.hideLoader)}O.closeIcon=false;return O},getXdRelation:G.getXdRelation},"permissions.oauth":{url:"dialog/oauth",size:{width:u.mobile()?null:475,height:u.mobile()?null:183},transform:function N(O){__p&&__p();if(!s.getClientID()){o.error("FB.login() called before FB.init().");return}if(h.getAuthResponse()&&!O.params.scope&&!O.params.auth_type){o.error("FB.login() called when user is already connected.");O.cb&&O.cb({status:s.getLoginStatus(),authResponse:h.getAuthResponse()});return}var P=O.cb,Q=O.id;delete O.cb;var R=O.params.auth_type==="reauthenticate",S=ES("Object","keys",false,ES("Object","assign",false,O.params.response_type?x(O.params.response_type.split(",")):{},{token:true,signed_request:true})).join(",");if(O.params.display==="async"){ES("Object","assign",false,O.params,{client_id:s.getClientID(),origin:B(),response_type:S,domain:location.hostname});O.cb=h.xdResponseWrapper(P,h.getAuthResponse(),"permissions.oauth")}else{if(R)M._xdNextHandler(function(T){P({authResponse:null,status:"not_authorized"})},Q,"opener",true);ES("Object","assign",false,O.params,{client_id:s.getClientID(),redirect_uri:F(M.xdHandler(P,Q,"opener",h.getAuthResponse(),"permissions.oauth",!R)),origin:B(),response_type:S,domain:location.hostname})}return O}},"auth.logout":{url:"logout.php",transform:function N(O){if(!s.getClientID())o.error("FB.logout() called before calling FB.init().");else if(!h.getAuthResponse())o.error("FB.logout() called without an access token.");else{O.params.next=M.xdHandler(O.cb,O.id,"parent",h.getAuthResponse(),"logout",true);return O}}},"login.status":{url:"dialog/oauth",transform:function N(O){var P=O.cb,Q=O.id;delete O.cb;ES("Object","assign",false,O.params,{client_id:s.getClientID(),redirect_uri:M.xdHandler(P,Q,"parent",h.getAuthResponse(),"login_status",true),origin:B(),response_type:"token,signed_request,code",domain:location.hostname});return O}},pay:{size:{width:555,height:120},connectDisplay:"popup"},live_broadcast:{transform:function N(O){if(O.params.phase==="create")O.size={width:480,height:280};if(O.params.phase==="publish")O.size={width:772,height:540};return O},require_access_token:true},boost:{transform:function N(O){O.size={width:960,height:760};O.params.display="popup";return O}}},J={};function K(N,O){J[O]=true;return function(P){delete J[O];N(P)}}function L(N){if(!y("should_force_single_dialog_instance",true))return false;var O=N.method.toLowerCase();if(O==="pay"&&N.display==="async")return true;return false}var M={Methods:I,_loadedNodes:{},_defaultCb:{},_resultToken:'"xxRESULTTOKENxx"',genericTransform:function N(O){if(O.params.display=="dialog"||O.params.display=="iframe")ES("Object","assign",false,O.params,{display:"iframe",channel:M._xdChannelHandler(O.id,"parent.parent")},true);return O},checkOauthDisplay:function N(O){var P=O.scope||O.perms||s.getScope();if(!P)return O.display;var Q=P.split(/\s|,/g);for(var R=0;R<Q.length;R++)if(!t.initSitevars.iframePermissions[ES(Q[R],"trim",true)])return"popup";return O.display},prepareCall:function N(O,P){__p&&__p();var Q=O.method.toLowerCase(),R=Object.prototype.hasOwnProperty.call(M.Methods,Q)?ES("Object","assign",false,{},M.Methods[Q]):{},S=C(),T=s.getSecure()||Q!=="auth.status"&&Q!="login.status";ES("Object","assign",false,O,{app_id:s.getClientID(),locale:s.getLocale(),sdk:"joey",access_token:T&&s.getAccessToken()||undefined});if(Q==="share"||Q==="share_open_graph"){O.mobile_iframe=u.mobile()&&(O.mobile_iframe||O.iframe_test);if(O.mobile_iframe)R=ES("Object","assign",false,{},G)}O.display=M.getDisplayMode(R,O);if(!R.url)R.url="dialog/"+Q;if((R.url=="dialog/oauth"||R.url=="dialog/permissions.request")&&(O.display=="iframe"||O.display=="touch"&&O.in_iframe))O.display=M.checkOauthDisplay(O);if(O.display=="popup"&&!R.require_access_token)delete O.access_token;if(s.getIsVersioned()&&R.url.substring(0,7)==="dialog/")R.url=O.version+"/"+R.url;if(L(O)){if(J[Q]){var U='Dialog "'+Q+'" is trying to run more than once.';o.warn(U);P({error_code:-100,error_message:U});return}P=K(P,Q)}var V={cb:P,id:S,size:R.size||M.getDefaultSize(),url:v.resolve(O.display=="touch"?"m":"www",T)+"/"+R.url,params:O,name:Q,dialog:l.newInstance(S,O.display)},W=R.transform?R.transform:M.genericTransform;if(W){V=W(V);if(!V)return}if(O.display==="touch"&&O.in_iframe)V.params.parent_height=window.innerHeight;var X=R.getXdRelation||M.getXdRelation,Y=X(V.params);if(!(V.id in M._defaultCb)&&!("next"in V.params)&&!("redirect_uri"in V.params))V.params.next=M._xdResult(V.cb,V.id,Y,true);if(Y==="parent"||Y==="opener")ES("Object","assign",false,V.params,{channel_url:M._xdChannelHandler(S,Y==="parent"?"parent.parent":"opener")},true);V=M.prepareParams(V);return V},prepareParams:function N(O){__p&&__p();if(O.params.display!=="async")delete O.params.method;O.params.kid_directed_site=s.getKidDirectedSite()||O.params.kid_directed_site;O.params=A(O.params);var P=q.encode(O.params);if(!u.nativeApp()&&M.urlTooLongForIE(O.url+"?"+P))O.post=true;else if(P)O.url+="?"+P;return O},urlTooLongForIE:function N(O){return u.ie()&&u.ie()<=8&&O.length>2048},getDisplayMode:function N(O,P){__p&&__p();if(P.display==="hidden"||P.display==="none"||P.display==="native")return P.display;var Q=s.isEnvironment(s.ENVIRONMENTS.CANVAS)||s.isEnvironment(s.ENVIRONMENTS.PAGETAB);if(Q&&!P.display)return"async";if(H(P)&&i.supportsDialog("oauth"))return"async";if(u.mobile()||P.display==="touch")return"touch";if(P.display=="iframe"||P.display=="dialog")if(!M.canIframe(P)){o.error('"dialog" mode can only be used when the user is connected.');return"popup"}if(O.connectDisplay&&!Q)return O.connectDisplay;return P.display||(M.canIframe(P)?"dialog":"popup")},canIframe:function N(O){if(s.getAccessToken())return true;if(u.mobile()&&s.getLoggedIntoFacebook())return!!O.mobile_iframe;return false},getXdRelation:function N(O){var P=O.display;if(P==="popup"||P==="touch")return"opener";if(P==="dialog"||P==="iframe"||P==="hidden"||P==="none")return"parent";if(P==="async")return"parent.frames["+window.name+"]"},popup:function N(O){__p&&__p();var P=typeof window.screenX!="undefined"?window.screenX:window.screenLeft,Q=typeof window.screenY!="undefined"?window.screenY:window.screenTop,R=typeof window.outerWidth!="undefined"?window.outerWidth:document.documentElement.clientWidth,S=typeof window.outerHeight!="undefined"?window.outerHeight:document.documentElement.clientHeight-22,T=u.mobile()?null:O.size.width,U=u.mobile()?null:O.size.height,V=P<0?window.screen.width+P:P,W=parseInt(V+(R-T)/2,10),X=parseInt(Q+(S-U)/2.5,10),Y=[];if(T!==null)Y.push("width="+T);if(U!==null)Y.push("height="+U);Y.push("left="+W);Y.push("top="+X);Y.push("scrollbars=1");if(O.name=="permissions.request"||O.name=="permissions.oauth"){Y.push("toolbar=0");if(!u.chrome()||u.chrome()<59)Y.push("location=1")}Y=Y.join(",");var N;if(O.post){N=window.open("about:blank",O.id,Y);if(N){M.setLoadedNode(O,N,"popup");j.submitToTarget({url:O.url,target:O.id,params:O.params})}}else{N=window.open(O.url,O.id,Y);if(N)M.setLoadedNode(O,N,"popup")}if(!N)return;if(O.id in M._defaultCb)M._popupMonitor()},setLoadedNode:function N(O,P,Q){if(Q==="iframe")P.fbCallID=O.id;P={node:P,type:Q,fbCallID:O.id};M._loadedNodes[O.id]=P},getLoadedNode:function N(O){var P=typeof O=="object"?O.id:O,Q=M._loadedNodes[P];return Q?Q.node:null},hidden:function N(O){O.className="FB_UI_Hidden";O.root=j.appendHidden("");M._insertIframe(O)},iframe:function N(O){__p&&__p();O.className="FB_UI_Dialog";if(O.params.mobile_iframe){l.setForceTabletStyle(true);l.setCloseOnOverlayTap(true);l.setPositionDialogAtTopWhenPortrait(true)}var P=function P(){var R=ES("JSON","stringify",false,{error_code:4201,error_message:z._("User canceled the Dialog flow")});M._triggerDefault(O.id,R)},Q={onClose:P,closeIcon:O.closeIcon===undefined?true:O.closeIcon,classes:l.isTabletStyle()?"centered":""};if(O.params.mobile_iframe)Q.styles={"border-radius":"8px"};O.root=l.create(Q);if(!O.hideLoader)l.showLoader(P,O.size.width);k.addCss(O.root,"fb_dialog_iframe");M._insertIframe(O)},touch:function N(O){__p&&__p();if(O.params&&O.params.in_iframe)if(O.ui_created)l.showLoader(function(){M._triggerDefault(O.id,null)},0);else M.iframe(O);else if(u.nativeApp()&&!O.ui_created){O.frame=O.id;p.onready(function(){M.setLoadedNode(O,p.open(O.url+"#cb="+O.frameName),"native")});M._popupMonitor()}else if(!O.ui_created)M.popup(O)},async:function N(O){__p&&__p();O.params.redirect_uri=location.protocol+"//"+location.host+location.pathname;delete O.params.access_token;var P=function P(Q){var R=Q.result;if(R&&R.e2e){var S=l.get(O.id);S.trackEvents(R.e2e);S.trackEvent("close");delete R.e2e}O.cb(R)};if(H(O.params)&&i.supportsDialog("oauth")){O.params.method="oauth";O.params.redirect_uri=O.params.next;i.remote.showDialog(O.params,P)}else r.remote.showDialog(O.params,P)},"native":function N(O){E(O.params)},getDefaultSize:function N(){return l.getDefaultSize()},_insertIframe:function N(O){M._loadedNodes[O.id]=false;var P=function P(Q){if(O.id in M._loadedNodes)M.setLoadedNode(O,Q,"iframe")};if(O.post)D({url:"about:blank",root:O.root,className:O.className,width:O.size.width,height:O.size.height,id:O.id,onInsert:P,onload:function Q(R){j.submitToTarget({url:O.url,target:R.name,params:O.params})}});else D({url:O.url,root:O.root,className:O.className,width:O.size.width,height:O.size.height,id:O.id,name:O.frameName,onInsert:P})},_handleResizeMessage:function N(O,P){__p&&__p();var Q=M.getLoadedNode(O);if(!Q)return;if(P.height)Q.style.height=P.height+"px";if(P.width)Q.style.width=P.width+"px";w.inform("resize.ack",P||{},"parent.frames["+Q.name+"]");if(!l.isActive(Q))l.show(Q);else l._centerActive()},_triggerDefault:function N(O,P){var Q={frame:O};if(P)Q.result=P;M._xdRecv(Q,M._defaultCb[O]||function(){})},_popupMonitor:function N(){__p&&__p();var O;for(var P in M._loadedNodes)if(Object.prototype.hasOwnProperty.call(M._loadedNodes,P)&&P in M._defaultCb){var Q=M._loadedNodes[P];if(Q.type!="popup"&&Q.type!="native")continue;var R=Q.node;try{if(R.closed)M._triggerDefault(P,null);else O=true}catch(S){}}if(O&&!M._popupInterval)M._popupInterval=setInterval(M._popupMonitor,100);else if(!O&&M._popupInterval){clearInterval(M._popupInterval);M._popupInterval=null}},_xdChannelHandler:function N(O,P){__p&&__p();return w.handler(function(Q){__p&&__p();var R=M.getLoadedNode(O);if(!R)return;if(Q.type=="resize")M._handleResizeMessage(O,Q);else if(Q.type=="hide")l.hide(R);else if(Q.type=="rendered"){var S=l._findRoot(R);l.show(S)}else if(Q.type=="fireevent")m.fire(Q.event,Q)},P,true,null)},_xdNextHandler:function N(O,P,Q,R){if(R)M._defaultCb[P]=O;return w.handler(function(S){M._xdRecv(S,O)},Q)+"&frame="+P},_xdRecv:function N(O,P){__p&&__p();var Q=M.getLoadedNode(O.frame);if(Q)if(Q.close)try{Q.close();if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&RegExp.$1!=="5")window.focus();M._popupCount--}catch(R){}else if(k.containsCss(Q,"FB_UI_Hidden"))setTimeout(function(){Q.parentNode.parentNode.removeChild(Q.parentNode)},3e3);else if(k.containsCss(Q,"FB_UI_Dialog"))l.remove(Q);delete M._loadedNodes[O.frame];delete M._defaultCb[O.frame];if(O.e2e){var S=l.get(O.frame);S.trackEvents(O.e2e);S.trackEvent("close");delete O.e2e}P(O)},_xdResult:function N(O,P,Q,R){return M._xdNextHandler(function(S){O&&O(S.result&&S.result!=M._resultToken&&ES("JSON","parse",false,S.result))},P,Q,R)+"&result="+encodeURIComponent(M._resultToken)},xdHandler:function N(O,P,Q,R,S,T){return M._xdNextHandler(h.xdResponseWrapper(O,R,S),P,Q,T)}};i.stub("showDialog");r.stub("showDialog");f.exports=M}),null);
__d("sdk.ui",["Assert","sdk.Impressions","Log","sdk.PlatformVersioning","sdk.Runtime","sdk.UIServer","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();function o(p,q){__p&&__p();h.isObject(p);h.maybeFunction(q);if(l.getIsVersioned()){k.assertVersionIsSet();if(p.version)k.assertValidVersion(p.version);else p.version=l.getVersion()}p=ES("Object","assign",false,{},p);if(!p.method){j.error('"method" is a required parameter for FB.ui().');return null}if(p.method=="pay.prompt")p.method="pay";var r=p.method;if(p.redirect_uri){j.warn("When using FB.ui, you should not specify a redirect_uri.");delete p.redirect_uri}if((r=="permissions.request"||r=="permissions.oauth")&&(p.display=="iframe"||p.display=="dialog"))p.display=m.checkOauthDisplay(p);if(p.display==="native"&&r!=="send"){j.error('display type "native" not supported');return null}var s=n("e2e_tracking",true);if(s)p.e2e={};var t=m.prepareCall(p,q||function(){});if(!t)return null;var u=t.params.display;if(u==="dialog")u="iframe";else if(u==="none")u="hidden";var v=m[u];if(!v){j.error('"display" must be one of "popup", "dialog", "iframe", "touch", "async", "hidden", or "none"');return null}if(s)t.dialog.subscribe("e2e:end",function(w){w.method=r;w.display=u;j.debug("e2e: %s",ES("JSON","stringify",false,w));i.log(114,{payload:w})});v(t);return t.dialog}f.exports=o}),null);
__d("legacy:fb.auth",["sdk.Auth","sdk.Cookie","sdk.Event","FB","Log","sdk.Runtime","sdk.SignedRequest","sdk.ui"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){__p&&__p();k.provide("",{getLoginStatus:function p(){return h.getLoginStatus.apply(h,arguments)},getAuthResponse:function p(){return h.getAuthResponse()},getAccessToken:function p(){return m.getAccessToken()||null},getUserID:function p(){return m.getUserID()||m.getCookieUserID()},login:function p(q,r){if(r&&r.perms&&!r.scope){r.scope=r.perms;delete r.perms;l.warn("OAuth2 specification states that 'perms' should now be called 'scope'.  Please update.")}var s=m.isEnvironment(m.ENVIRONMENTS.CANVAS)||m.isEnvironment(m.ENVIRONMENTS.PAGETAB);o(babelHelpers["extends"]({method:"permissions.oauth",display:s?"async":"popup",domain:location.hostname},r||{}),q)},logout:function p(q){o({method:"auth.logout",display:"hidden"},q)}});h.subscribe("logout",ES(j.fire,"bind",true,j,"auth.logout"));h.subscribe("login",ES(j.fire,"bind",true,j,"auth.login"));h.subscribe("authresponse.change",ES(j.fire,"bind",true,j,"auth.authResponseChange"));h.subscribe("status.change",ES(j.fire,"bind",true,j,"auth.statusChange"));j.subscribe("init:post",function(p){__p&&__p();if(p.status)h.getLoginStatus();if(m.getClientID())if(p.authResponse)h.setAuthResponse(p.authResponse,"connected");else if(m.getUseCookie()){var q=i.loadSignedRequest(),r;if(q){try{r=n.parse(q)}catch(s){i.clearSignedRequestCookie()}if(r&&r.user_id)m.setCookieUserID(r.user_id)}i.loadMeta()}})}),3);
__d("sdk.Canvas.IframeHandling",["DOMWrapper","sdk.RPC"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=null,k;function l(){var p=h.getWindow().document,q=p.body,r=p.documentElement,s=Math.max(q.offsetTop,0),t=Math.max(r.offsetTop,0),u=q.scrollHeight+s,v=q.offsetHeight+s,w=r.scrollHeight+t,x=r.offsetHeight+t;return Math.max(u,v,w,x)}function m(p){__p&&__p();if(typeof p!="object")p={};var q=0,r=0;if(!p.height){p.height=l();q=16;r=4}if(!p.frame)p.frame=window.name||"iframe_canvas";if(k){var s=k.height,t=p.height-s;if(t<=r&&t>=-q)return false}k=p;i.remote.setSize(p);return true}function n(p,q){__p&&__p();if(q===undefined&&typeof p==="number"){q=p;p=true}if(p||p===undefined){if(j===null)j=setInterval(function(){m()},q||100);m()}else if(j!==null){clearInterval(j);j=null}}i.stub("setSize");var o={setSize:m,setAutoGrow:n};f.exports=o}),null);
__d("sdk.Canvas.Navigation",["sdk.RPC"],(function a(b,c,d,e,f,g,h){function i(k){h.local.navigate=function(l){k({path:l})};h.remote.setNavigationEnabled(true)}h.stub("setNavigationEnabled");var j={setUrlHandler:i};f.exports=j}),null);
__d("sdk.Canvas.Plugin",["Log","sdk.RPC","sdk.Runtime","sdk.UA","sdk.api"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m="CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000",n="CLSID:444785F1-DE89-4295-863A-D46C3A781394",o=null,p=k.osx()&&k.osx.getVersionParts(),q=!(p&&p[0]>10&&p[1]>10&&(k.chrome()>=31||k.webkit()>=537.71||k.firefox()>=25));function r(B){B._hideunity_savedstyle={};B._hideunity_savedstyle.left=B.style.left;B._hideunity_savedstyle.position=B.style.position;B._hideunity_savedstyle.width=B.style.width;B._hideunity_savedstyle.height=B.style.height;B.style.left="-10000px";B.style.position="absolute";B.style.width="1px";B.style.height="1px"}function s(B){if(B._hideunity_savedstyle){B.style.left=B._hideunity_savedstyle.left;B.style.position=B._hideunity_savedstyle.position;B.style.width=B._hideunity_savedstyle.width;B.style.height=B._hideunity_savedstyle.height}}function t(B){B._old_visibility=B.style.visibility;B.style.visibility="hidden"}function u(B){B.style.visibility=B._old_visibility||"";delete B._old_visibility}function v(B){__p&&__p();var C=B.type?B.type.toLowerCase():null,D=C==="application/x-shockwave-flash"||B.classid&&B.classid.toUpperCase()==m;if(!D)return false;var E=/opaque|transparent/i;if(E.test(B.getAttribute("wmode")))return false;for(var F=0;F<B.childNodes.length;F++){var G=B.childNodes[F];if(/param/i.test(G.nodeName)&&/wmode/i.test(G.name)&&E.test(G.value))return false}return true}function w(B){var C=B.type?B.type.toLowerCase():null;return C==="application/vnd.unity"||B.classid&&B.classid.toUpperCase()==n}function x(B){__p&&__p();var C=ES("Array","from",false,window.document.getElementsByTagName("object"));C=C.concat(ES("Array","from",false,window.document.getElementsByTagName("embed")));var D=false,E=false;ES(C,"forEach",true,function(G){__p&&__p();var H=v(G),I=q&&w(G);if(!H&&!I)return;D=D||H;E=E||I;var J=function J(){if(B.state==="opened")if(H)t(G);else r(G);else if(H)u(G);else s(G)};if(o){h.info("Calling developer specified callback");var K={state:B.state,elem:G};o(K);setTimeout(J,200)}else J()});if(Math.random()<=1/1e3){var F={unity:E,flash:D};l(j.getClientID()+"/occludespopups","post",F)}}i.local.hidePluginObjects=function(){h.info("hidePluginObjects called");x({state:"opened"})};i.local.showPluginObjects=function(){h.info("showPluginObjects called");x({state:"closed"})};i.local.showFlashObjects=i.local.showPluginObjects;i.local.hideFlashObjects=i.local.hidePluginObjects;function y(){t();r()}function z(){u();s()}var A={_setHidePluginCallback:function B(C){o=C},hidePluginElement:y,showPluginElement:z};f.exports=A}),null);
__d("sdk.Canvas.Tti",["sdk.RPC","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i){__p&&__p();function j(o,p){var q={appId:i.getClientID(),time:ES("Date","now",false),name:p},r=[q];if(o)r.push(function(s){o(s.result)});h.remote.logTtiMessage.apply(null,r)}function k(){j(null,"StartIframeAppTtiTimer")}function l(o){j(o,"StopIframeAppTtiTimer")}function m(o){j(o,"RecordIframeAppTti")}h.stub("logTtiMessage");var n={setDoneLoading:m,startTimer:k,stopTimer:l};f.exports=n}),null);
__d("legacy:fb.canvas",["Assert","sdk.Canvas.Environment","sdk.Event","FB","sdk.Canvas.IframeHandling","sdk.Canvas.Navigation","sdk.Canvas.Plugin","sdk.RPC","sdk.Runtime","sdk.Canvas.Tti"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){__p&&__p();k.provide("Canvas",{setSize:function r(s){h.maybeObject(s,"Invalid argument");return l.setSize.apply(null,arguments)},setAutoGrow:function r(){return l.setAutoGrow.apply(null,arguments)},getPageInfo:function r(s){h.isFunction(s,"Invalid argument");return i.getPageInfo.apply(null,arguments)},scrollTo:function r(s,t){h.maybeNumber(s,"Invalid argument");h.maybeNumber(t,"Invalid argument");return i.scrollTo.apply(null,arguments)},setDoneLoading:function r(s){h.maybeFunction(s,"Invalid argument");return q.setDoneLoading.apply(null,arguments)},startTimer:function r(){return q.startTimer.apply(null,arguments)},stopTimer:function r(s){h.maybeFunction(s,"Invalid argument");return q.stopTimer.apply(null,arguments)},getHash:function r(s){h.isFunction(s,"Invalid argument");return m.getHash.apply(null,arguments)},setHash:function r(s){h.isString(s,"Invalid argument");return m.setHash.apply(null,arguments)},setUrlHandler:function r(s){h.isFunction(s,"Invalid argument");return m.setUrlHandler.apply(null,arguments)}});o.local.fireEvent=ES(j.fire,"bind",true,j);j.subscribe("init:post",function(r){if(p.isEnvironment(p.ENVIRONMENTS.CANVAS)){h.isTrue(!r.hideFlashCallback||!r.hidePluginCallback,"cannot specify deprecated hideFlashCallback and new hidePluginCallback");n._setHidePluginCallback(r.hidePluginCallback||r.hideFlashCallback)}})}),3);
__d("legacy:fb.canvas.plugin",["FB","sdk.Canvas.Plugin"],(function a(b,c,d,e,f,g,h,i){h.provide("Canvas.Plugin",i)}),3);
__d("sdk.Canvas.Prefetcher",["JSSDKCanvasPrefetcherConfig","sdk.Runtime","sdk.api"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={AUTOMATIC:0,MANUAL:1},l=h.sampleRate,m=h.blacklist,n=k.AUTOMATIC,o=[];function p(){__p&&__p();var u={object:"data",link:"href",script:"src"};if(n==k.AUTOMATIC)ES(ES("Object","keys",false,u),"forEach",true,function(v){var w=u[v];ES(ES("Array","from",false,document.getElementsByTagName(v)),"forEach",true,function(x){if(x[w])o.push(x[w])})});if(o.length===0)return;j(i.getClientID()+"/staticresources","post",{urls:ES("JSON","stringify",false,o),is_https:location.protocol==="https:"});o=[]}function q(){if(!i.isEnvironment(i.ENVIRONMENTS.CANVAS)||!i.getClientID()||!l)return;if(Math.random()>1/l||m=="*"||~ES(m,"indexOf",true,i.getClientID()))return;setTimeout(p,3e4)}function r(u){n=u}function s(u){o.push(u)}var t={COLLECT_AUTOMATIC:k.AUTOMATIC,COLLECT_MANUAL:k.MANUAL,addStaticResource:s,setCollectionMode:r,_maybeSample:q};f.exports=t}),null);
__d("legacy:fb.canvas.prefetcher",["FB","sdk.Canvas.Prefetcher","sdk.Event","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k){h.provide("Canvas.Prefetcher",i);j.subscribe("init:post",function(l){if(k.isEnvironment(k.ENVIRONMENTS.CANVAS))i._maybeSample()})}),3);
__d("legacy:fb.canvas.presence",["sdk.RPC","sdk.Event"],(function a(b,c,d,e,f,g,h,i){__p&&__p();i.subscribe(i.SUBSCRIBE,j);i.subscribe(i.UNSUBSCRIBE,k);h.stub("useFriendsOnline");function j(l,m){if(l!="canvas.friendsOnlineUpdated")return;if(m.length===1)h.remote.useFriendsOnline(true)}function k(l,m){if(l!="canvas.friendsOnlineUpdated")return;if(m.length===0)h.remote.useFriendsOnline(false)}}),3);
__d("legacy:fb.canvas.syncrequests",["sdk.RPC","sdk.Event"],(function a(b,c,d,e,f,g,h,i){h.stub("initPendingSyncRequests");function j(k,l){if(k!="canvas.syncRequestUpdated")return;h.remote.initPendingSyncRequests();i.unsubscribe(i.SUBSCRIBE,j)}i.subscribe(i.SUBSCRIBE,j)}),3);
__d("legacy:fb.event",["FB","sdk.Event","sdk.Runtime","sdk.Scribe","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m=[],n=null,o=l("event_subscriptions_log",false);h.provide("Event",{subscribe:function p(q,r){if(o){m.push(q);if(!n)n=setTimeout(function(){k.log("jssdk_error",{appId:j.getClientID(),error:"EVENT_SUBSCRIPTIONS_LOG",extra:{line:0,name:"EVENT_SUBSCRIPTIONS_LOG",script:"N/A",stack:"N/A",message:m.sort().join(",")}});m.length=0;n=null},o)}return i.subscribe(q,r)},unsubscribe:ES(i.unsubscribe,"bind",true,i)})}),3);
__d("legacy:fb.frictionless",["FB","sdk.Frictionless"],(function a(b,c,d,e,f,g,h,i){h.provide("Frictionless",i)}),3);
__d("sdk.MBasicInitializer",["sdk.DOM","sdk.Runtime","sdk.UA","sdk.URI","UrlMap","sdk.fbt","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();var o=function o(){__p&&__p();function q(r){__p&&__p();if(!r)return;var s=r.parentNode;if(!s)return;var t=h.getAttr(r,"href")||window.location.href,u=new k(l.resolve("m"));u.setPath("/dialog/share");u.addQueryData("href",encodeURI(t));u.addQueryData("app_id",i.getClientID());u.addQueryData("mbasic_link",1);var v=document.createElement("a");v.style="display:inline-block; zoom:1;";v.textContent=m._("Share to Facebook");v.setAttribute("href",u.toString());v.setAttribute("target","_blank");s.insertBefore(v,r);s.removeChild(r)}if(!n("js_sdk_mbasic_share_plugin_init",false))return;ES(ES("Array","from",false,document.getElementsByTagName("fb:share-button")),"forEach",true,function(r){return q(r)});ES(ES("Array","from",false,document.getElementsByClassName("fb-share-button")),"forEach",true,function(r){return q(r)})};function p(){if(!j.mBasic())return;o()}f.exports={init:p}}),null);
__d("sdk.init",["sdk.Cookie","sdk.ErrorHandling","sdk.Event","sdk.Impressions","Log","ManagedError","sdk.MBasicInitializer","sdk.PlatformVersioning","QueryString","sdk.Runtime","sdk.UA","sdk.URI","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){__p&&__p();function u(w){var x=typeof w==="number"&&w>0||typeof w==="string"&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(w);if(x)return w.toString();l.warn("Invalid App Id: Must be a number or numeric string representing the application id.");return null}function v(w){__p&&__p();if(q.getInitialized())l.warn("FB.init has already been called - this could indicate a problem");if(q.getIsVersioned()){if(Object.prototype.toString.call(w)!=="[object Object]")throw new m("Invalid argument");if(w.authResponse)l.warn("Setting authResponse is not supported");if(!w.version)w.version=new s(location.href).getQueryData().sdk_version;o.assertValidVersion(w.version);q.setVersion(w.version)}else{if(/number|string/.test(typeof w)){l.warn("FB.init called with invalid parameters");w={apiKey:w}}w=ES("Object","assign",false,{status:true},w||{})}var x=u(w.appId||w.apiKey);if(x!==null)q.setClientID(x);if("scope"in w)q.setScope(w.scope);if(w.cookie){q.setUseCookie(true);if(typeof w.cookie==="string")h.setDomain(w.cookie)}if(w.kidDirectedSite)q.setKidDirectedSite(true);if(w.autoLogAppEvents==="1"||w.autoLogAppEvents==="true")w.autoLogAppEvents=true;q.setInitialized(true);if(t("js_sdk_impression_on_load",true))k.log(115,{});if(r.mBasic())n.init();j.fire("init:post",w)}setTimeout(function(){__p&&__p();var w=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;ES(ES("Array","from",false,fb_fif_window.document.getElementsByTagName("script")),"forEach",true,function(x){__p&&__p();if(x.src){var y=w.exec(x.src);if(y){var z=p.decode(y[2]);for(var A in z)if(Object.prototype.hasOwnProperty.call(z,A)){var B=z[A];if(B=="0")z[A]=0}v(z)}}});if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){window.fbAsyncInit.hasRun=true;i.unguard(window.fbAsyncInit)()}},0);f.exports=v}),null);
__d("legacy:fb.init",["FB","sdk.init"],(function a(b,c,d,e,f,g,h,i){h.provide("",{init:i})}),3);
__d("legacy:fb.ui",["FB","sdk.ui"],(function a(b,c,d,e,f,g,h,i){h.provide("",{ui:i})}),3);
__d("legacy:fb.versioned-sdk",["sdk.Runtime"],(function a(b,c,d,e,f,g,h){h.setIsVersioned(true)}),3);
__d("runOnce",[],(function a(b,c,d,e,f,g){function h(i){var j,k;return function(){if(!j){j=true;k=i()}return k}}f.exports=h}),null);
__d("XFBML",["Assert","sdk.DOM","Log","ObservableMixin","sdk.UA","runOnce"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n={},o={},p=0,q=new k();function r(y,z){return ES(y[z]+"","trim",true)}function s(y){return y.scopeName?y.scopeName+":"+y.nodeName:""}function t(y){return n[r(y,"nodeName").toLowerCase()]||n[s(y).toLowerCase()]}function u(y){var z=ES(r(y,"className").split(/\s+/),"filter",true,function(A){return Object.prototype.hasOwnProperty.call(o,A)});if(z.length===0)return undefined;if(y.getAttribute("fb-xfbml-state")||!y.childNodes||y.childNodes.length===0||y.childNodes.length===1&&y.childNodes[0].nodeType===3||y.children.length===1&&r(y.children[0],"className")==="fb-xfbml-parse-ignore")return o[z[0]]}function v(y){var z={};ES(ES("Array","from",false,y.attributes),"forEach",true,function(A){z[r(A,"name")]=r(A,"value")});return z}function w(y,z,A){var B=document.createElement("div");i.addCss(y,z+"-"+A);ES(ES("Array","from",false,y.childNodes),"forEach",true,function(C){B.appendChild(C)});ES(ES("Array","from",false,y.attributes),"forEach",true,function(C){B.setAttribute(C.name,C.value)});y.parentNode.replaceChild(B,y);return B}function x(y,z,A){__p&&__p();h.isTrue(y&&y.nodeType&&y.nodeType===1&&!!y.getElementsByTagName,"Invalid DOM node passed to FB.XFBML.parse()");h.isFunction(z,"Invalid callback passed to FB.XFBML.parse()");var B=++p;j.info("XFBML Parsing Start %s",B);var C=1,D=0,E=function E(){C--;if(C===0){j.info("XFBML Parsing Finish %s, %s tags found",B,D);z();q.inform("render",B,D)}h.isTrue(C>=0,"onrender() has been called too many times")};ES(ES("Array","from",false,y.getElementsByTagName("*")),"forEach",true,function(G){__p&&__p();if(!A&&G.getAttribute("fb-xfbml-state"))return;if(G.nodeType!==1)return;var H=t(G)||u(G);if(!H)return;if(l.ie()<9&&G.scopeName)G=w(G,H.xmlns,H.localName);C++;D++;var I=new H.ctor(G,H.xmlns,H.localName,v(G));I.subscribe("render",m(function(){G.setAttribute("fb-xfbml-state","rendered");E()}));var J=function J(){if(G.getAttribute("fb-xfbml-state")=="parsed")q.subscribe("render.queue",J);else{G.setAttribute("fb-xfbml-state","parsed");I.process()}};J()});q.inform("parse",B,D);var F=3e4;setTimeout(function(){if(C>0)j.warn("%s tags failed to render in %s ms",C,F)},F);E()}q.subscribe("render",function(){var y=q.getSubscribers("render.queue");q.clearSubscribers("render.queue");ES(y,"forEach",true,function(z){z()})});ES("Object","assign",false,q,{registerTag:function y(z){var A=z.xmlns+":"+z.localName;h.isUndefined(n[A],A+" already registered");n[A]=z;o[z.xmlns+"-"+z.localName]=z},parse:function y(z,A){x(z||document.body,A||function(){},true)},parseNew:function y(){x(document.body,function(){},false)}});f.exports=q}),null);
__d("legacy:fb.xfbml",["Assert","sdk.Event","FB","XFBML","sdk.domReady","sdk.feature","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();j.provide("XFBML",{parse:function p(q){h.maybeXfbml(q,"Invalid argument");if(q&&q.nodeType===9)q=q.body;return k.parse.apply(null,arguments)}});k.subscribe("parse",ES(i.fire,"bind",true,i,"xfbml.parse"));k.subscribe("render",ES(i.fire,"bind",true,i,"xfbml.render"));i.subscribe("init:post",function(p){if(p.xfbml)setTimeout(n(ES(l,"bind",true,null,k.parse),"entry","init:post:xfbml.parse"),0)});h.define("Xfbml",function(p){return(p.nodeType===1||p.nodeType===9)&&typeof p.nodeName==="string"});try{if(document.namespaces&&!document.namespaces.item.fb)document.namespaces.add("fb")}catch(o){}}),3);
__d("IframePlugin",["sdk.Auth","sdk.DOM","sdk.Event","Log","ObservableMixin","sdk.PlatformVersioning","QueryString","sdk.Runtime","Type","sdk.UA","sdk.URI","UrlMap","sdk.XD","sdk.createIframe","sdk.feature","guid","resolveURI"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){__p&&__p();var y={skin:"string",font:"string",width:"string",height:"px",ref:"string",color_scheme:"string"};function z(H,I,J){if(I||I===0)if(I==="100%")H.style.width="100%";else H.style.width=I+"px";if(J||J===0)H.style.height=J+"px"}function A(H){return function(I){var J={width:I.width,height:I.height,pluginID:H};j.fire("xfbml.resize",J)}}var B={string:function H(I){return I},bool:function H(I){return I?/^(?:true|1|yes|on)$/i.test(I):undefined},url:function H(I){return x(I)},url_maybe:function H(I){return I?x(I):I},hostname:function H(I){return I||window.location.hostname},px:function H(I){return/^(\d+)(?:px)?$/.test(I)?parseInt(RegExp.$1,10):undefined},text:function H(I){return I}};function C(H,I){var J=H[I]||H[I.replace(/_/g,"-")]||H[I.replace(/_/g,"")]||H["data-"+I]||H["data-"+I.replace(/_/g,"-")]||H["data-"+I.replace(/_/g,"")]||undefined;return J}function D(H,I,J,K){ES(ES("Object","keys",false,H),"forEach",true,function(L){if(H[L]=="text"&&!J[L]){J[L]=I.textContent||I.innerText||"";I.setAttribute(L,J[L])}K[L]=B[H[L]](C(J,L))})}function E(H){if(H==="100%")return"100%";return H||H==="0"||H===0?parseInt(H,10):undefined}function F(H){if(H)z(H,0,0)}var G=p.extend({constructor:function H(I,J,K,L){__p&&__p();this.parent();K=K.replace(/-/g,"_");var M=C(L,"plugin_id");this.subscribe("xd.resize",A(M));this.subscribe("xd.resize.flow",A(M));this.subscribe("xd.resize.flow",ES(function(R){ES("Object","assign",false,this._iframeOptions.root.style,{verticalAlign:"bottom",overflow:""});z(this._iframeOptions.root,E(R.width),E(R.height));this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.resize",ES(function(R){ES("Object","assign",false,this._iframeOptions.root.style,{verticalAlign:"bottom",overflow:""});z(this._iframeOptions.root,E(R.width),E(R.height));z(this._iframe,E(R.width),E(R.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.resize.iframe",ES(function(R){if(R.reposition==="true"&&v("reposition_iframe",false))this.reposition(E(R.width));z(this._iframe,E(R.width),E(R.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.sdk_event",function(R){var S=ES("JSON","parse",false,R.data);S.pluginID=M;j.fire(R.event,S,I)});var N=s.resolve("www",true)+"/plugins/"+K+".php?",O={};D(this.getParams(),I,L,O);D(y,I,L,O);ES("Object","assign",false,O,{app_id:o.getClientID(),locale:o.getLocale(),sdk:"joey",kid_directed_site:o.getKidDirectedSite(),channel:t.handler(ES(function(R){return this.inform("xd."+R.type,R)},"bind",true,this),"parent.parent",true)});if(this.shouldIgnoreWidth())O.width=void 0;O.container_width=I.offsetWidth;i.addCss(I,"fb_iframe_widget");var P=w();this.subscribe("xd.verify",function(R){t.sendToFacebook(P,{method:"xd/verify",params:ES("JSON","stringify",false,R.token)})});this.subscribe("xd.refreshLoginStatus",ES(function(){h.removeLogoutState();h.getLoginStatus(ES(this.inform,"bind",true,this,"login.status"),true)},"bind",true,this));var Q=document.createElement("span");ES("Object","assign",false,Q.style,{verticalAlign:"top",width:"0px",height:"0px",overflow:"hidden"});this._element=I;this._ns=J;this._tag=K;this._params=O;this._config=this.getConfig();this._iframeOptions={root:Q,url:N+n.encode(O),name:P,width:this._config.mobile_fullsize&&q.mobile()?void 0:O.width||1e3,height:O.height||1e3,style:{border:"none",visibility:"hidden"},title:this._ns+":"+this._tag+" Facebook Social Plugin",onload:ES(function(){return this.inform("render")},"bind",true,this),onerror:ES(function(){return F(this._iframe)},"bind",true,this)};if(this.isFluid()&&O.width!=="auto"){i.addCss(this._element,"fb_iframe_widget_fluid_desktop");if(!O.width&&this._config.full_width){this._element.style.width="100%";this._iframeOptions.root.style.width="100%";this._iframeOptions.style.width="100%";this._params.container_width=this._element.offsetWidth;this._iframeOptions.url=N+n.encode(this._params)}}},shouldIgnoreWidth:function H(){return q.mobile()&&this.getConfig().mobile_fullsize},useInlineHeightForMobile:function H(){return true},process:function H(){__p&&__p();if(o.getIsVersioned()){m.assertVersionIsSet();var I=new r(this._iframeOptions.url);this._iframeOptions.url=I.setPath("/"+o.getVersion()+I.getPath()).toString()}var J=ES("Object","assign",false,{},this._params);delete J.channel;var K=n.encode(J);if(this._element.getAttribute("fb-iframe-plugin-query")==K){k.info("Skipping render: %s:%s %s",this._ns,this._tag,K);this.inform("render");return}this._element.setAttribute("fb-iframe-plugin-query",K);this.subscribe("render",ES(function(){this._iframe.style.visibility="visible";if(!this._isIframeResized)F(this._iframe)},"bind",true,this));while(this._element.firstChild)this._element.removeChild(this._element.firstChild);this._element.appendChild(this._iframeOptions.root);var L=q.mobile()?120:45;this._timeoutID=setTimeout(ES(function(){F(this._iframe);k.warn("%s:%s failed to resize in %ss",this._ns,this._tag,L)},"bind",true,this),L*1e3);this._iframe=u(this._iframeOptions);if(q.mobile()||J.width==="auto"){if(this.useInlineHeightForMobile())i.addCss(this._element,"fb_iframe_widget_fluid");if(!this._iframeOptions.width){ES("Object","assign",false,this._element.style,{display:"block",width:"100%",height:"auto"});ES("Object","assign",false,this._iframeOptions.root.style,{width:"100%",height:"auto"});var M={height:"auto",position:"static",width:"100%"};if(q.iphone()||q.ipad())ES("Object","assign",false,M,{width:"220px","min-width":"100%"});ES("Object","assign",false,this._iframe.style,M)}}},getConfig:function H(){return{}},isFluid:function H(){var I=this.getConfig();return I.fluid},reposition:function H(I){__p&&__p();var J=i.getPosition(this._iframe).x,K=i.getViewportInfo().width,L=parseInt(i.getStyle(this._iframe,"width"),10),M={};if(J+I>K&&J>I){this._iframe.style.left=parseInt(i.getStyle(this._iframe,"width"),10)-I+"px";this._isRepositioned=true;M.type="reposition"}else if(this._isRepositioned&&L-I!==0){this._iframe.style.left="0px";this._isRepositioned=false;M.type="restore"}else return;t.sendToFacebook(this._iframe.name,{method:"xd/reposition",params:ES("JSON","stringify",false,M)})},updateLift:function H(){var I=this._iframe.style.width===this._iframeOptions.root.style.width&&this._iframe.style.height===this._iframeOptions.root.style.height;i[I?"removeCss":"addCss"](this._iframe,"fb_iframe_widget_lift")}},l);G.getVal=C;G.withParams=function(H,I){return G.extend({getParams:function J(){return H},getConfig:function J(){return I?I:{}}})};f.exports=G}),null);
__d("PluginConfig",["sdk.feature"],(function a(b,c,d,e,f,g,h){var i={comment_embed:{mobile_fullsize:true},messengerpreconfirmation:{mobile_fullsize:true},messengeraccountconfirmation:{mobile_fullsize:true},messengerbusinesslink:{mobile_fullsize:true},messengertoggle:{mobile_fullsize:true},messengermessageus:{mobile_fullsize:true},post:{fluid:h("fluid_embed",false),mobile_fullsize:true},send_to_messenger:{mobile_fullsize:true}};f.exports=i}),null);
__d("PluginTags",[],(function a(b,c,d,e,f,g){var h={comment_embed:{href:"url",include_parent:"bool"},composer:{action_type:"string",action_properties:"string"},create_event_button:{},follow:{href:"url",layout:"string",show_faces:"bool",size:"string"},like:{href:"url",layout:"string",show_faces:"bool",share:"bool",action:"string",send:"bool",size:"string"},like_box:{href:"string",show_faces:"bool",header:"bool",stream:"bool",force_wall:"bool",show_border:"bool",id:"string",connections:"string",profile_id:"string",name:"string"},page:{href:"string",hide_cta:"bool",hide_cover:"bool",small_header:"bool",adapt_container_width:"bool",show_facepile:"bool",show_posts:"bool",tabs:"string"},messenger_checkbox:{messenger_app_id:"string",page_id:"string",pixel_id:"string",prechecked:"bool",allow_login:"bool",size:"string",origin:"string",user_ref:"string",identity_match:"string",use_white_text:"bool",use_transparent_background:"bool"},messengerpreconfirmation:{messenger_app_id:"string",page_id:"string"},messengeraccountconfirmation:{messenger_app_id:"string",page_id:"string",state:"string"},messengerbusinesslink:{messenger_app_id:"string",page_id:"string",state:"string"},messengertoggle:{messenger_app_id:"string",page_id:"string",token:"string",psid:"string"},messengermessageus:{messenger_app_id:"string",page_id:"string",color:"string",size:"string"},send_to_messenger:{messenger_app_id:"string",page_id:"string",color:"string",size:"string",enforce_login:"bool",identity_match:"string",origin:"string"},page_events:{href:"url"},post:{href:"url",show_text:"bool"},profile_pic:{uid:"string",linked:"bool",href:"string",size:"string",facebook_logo:"bool"},send:{href:"url",size:"string"},send_to_mobile:{max_rows:"string",show_faces:"bool",size:"string"}},i={subscribe:"follow",fan:"like_box",likebox:"like_box"};ES(ES("Object","keys",false,i),"forEach",true,function(j){h[j]=h[i[j]]});f.exports=h}),null);
__d("sdk.Arbiter",[],(function a(b,c,d,e,f,g){var h={BEHAVIOR_EVENT:"e",BEHAVIOR_PERSISTENT:"p",BEHAVIOR_STATE:"s"};f.exports=h}),null);
__d("sdk.XFBML.Element",["sdk.DOM","Type","ObservableMixin"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k=i.extend({constructor:function l(m){this.parent();this.dom=m},fire:function l(){this.inform.apply(this,arguments)},getAttribute:function l(m,n,o){var p=h.getAttr(this.dom,m);return p?o?o(p):p:n},_getBoolAttribute:function l(m,n){var o=h.getBoolAttr(this.dom,m);return o===null?n:o},_getPxAttribute:function l(m,n){return this.getAttribute(m,n,function(o){var p=parseInt(o,10);return isNaN(p)?n:p})},_getLengthAttribute:function l(m,n){return this.getAttribute(m,n,function(o){if(o==="100%"||o==="auto")return o;var p=parseInt(o,10);return isNaN(p)?n:p})},_getAttributeFromList:function l(m,n,o){return this.getAttribute(m,n,function(p){p=p.toLowerCase();return ES(o,"indexOf",true,p)>-1?p:n})},isValid:function l(){for(var m=this.dom;m;m=m.parentNode)if(m==document.body)return true},clear:function l(){h.html(this.dom,"")}},j);f.exports=k}),null);
__d("sdk.XFBML.IframeWidget",["sdk.Arbiter","sdk.Auth","sdk.Content","sdk.DOM","sdk.Event","sdk.XFBML.Element","guid","insertIframe","QueryString","sdk.Runtime","sdk.ui","UrlMap","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){__p&&__p();var u=m.extend({_iframeName:null,_showLoader:true,_refreshOnAuthChange:false,_allowReProcess:false,_fetchPreCachedLoader:false,_visibleAfter:"load",_widgetPipeEnabled:false,_borderReset:false,_repositioned:false,getUrlBits:function w(){throw new Error("Inheriting class needs to implement getUrlBits().")},setupAndValidate:function w(){return true},oneTimeSetup:function w(){},getSize:function w(){},getIframeName:function w(){return this._iframeName},getIframeTitle:function w(){return"Facebook Social Plugin"},getChannelUrl:function w(){if(!this._channelUrl){var x=this;this._channelUrl=t.handler(function(y){x.fire("xd."+y.type,y)},"parent.parent",true)}return this._channelUrl},getIframeNode:function w(){return this.dom.getElementsByTagName("iframe")[0]},arbiterInform:function w(event,x,y){t.sendToFacebook(this.getIframeName(),{method:event,params:ES("JSON","stringify",false,x||{}),behavior:y||h.BEHAVIOR_PERSISTENT})},_arbiterInform:function w(event,x,y){var z='parent.frames["'+this.getIframeNode().name+'"]';t.inform(event,x,z,y)},getDefaultWebDomain:function w(){return s.resolve("www")},process:function w(x){__p&&__p();if(this._done){if(!this._allowReProcess&&!x)return;this.clear()}else this._oneTimeSetup();this._done=true;this._iframeName=this.getIframeName()||this._iframeName||n();if(!this.setupAndValidate()){this.fire("render");return}if(this._showLoader)this._addLoader();k.addCss(this.dom,"fb_iframe_widget");if(this._visibleAfter!="immediate")k.addCss(this.dom,"fb_hide_iframes");else this.subscribe("iframe.onload",ES(this.fire,"bind",true,this,"render"));var y=this.getSize()||{},z=this.getFullyQualifiedURL();if(y.width=="100%")k.addCss(this.dom,"fb_iframe_widget_fluid");this.clear();o({url:z,root:this.dom.appendChild(document.createElement("span")),name:this._iframeName,title:this.getIframeTitle(),className:q.getRtl()?"fb_rtl":"fb_ltr",height:y.height,width:y.width,onload:ES(this.fire,"bind",true,this,"iframe.onload")});this._resizeFlow(y);this.loaded=false;this.subscribe("iframe.onload",ES(function(){this.loaded=true;if(!this._isResizeHandled)k.addCss(this.dom,"fb_hide_iframes")},"bind",true,this))},generateWidgetPipeIframeName:function w(){v++;return"fb_iframe_"+v},getFullyQualifiedURL:function w(){__p&&__p();var x=this._getURL();x+="?"+p.encode(this._getQS());if(x.length>2e3){x="about:blank";var y=ES(function(){this._postRequest();this.unsubscribe("iframe.onload",y)},"bind",true,this);this.subscribe("iframe.onload",y)}return x},_getWidgetPipeShell:function w(){return s.resolve("www")+"/common/widget_pipe_shell.php"},_oneTimeSetup:function w(){__p&&__p();this.subscribe("xd.resize",ES(this._handleResizeMsg,"bind",true,this));this.subscribe("xd.resize",ES(this._bubbleResizeEvent,"bind",true,this));this.subscribe("xd.resize.iframe",ES(this._resizeIframe,"bind",true,this));this.subscribe("xd.resize.flow",ES(this._resizeFlow,"bind",true,this));this.subscribe("xd.resize.flow",ES(this._bubbleResizeEvent,"bind",true,this));this.subscribe("xd.refreshLoginStatus",function(){i.getLoginStatus(function(){},true)});this.subscribe("xd.logout",function(){r({method:"auth.logout",display:"hidden"},function(){})});if(this._refreshOnAuthChange)this._setupAuthRefresh();if(this._visibleAfter=="load")this.subscribe("iframe.onload",ES(this._makeVisible,"bind",true,this));this.subscribe("xd.verify",ES(function(x){this.arbiterInform("xd/verify",x.token)},"bind",true,this));this.oneTimeSetup()},_makeVisible:function w(){this._removeLoader();k.removeCss(this.dom,"fb_hide_iframes");this.fire("render")},_setupAuthRefresh:function w(){i.getLoginStatus(ES(function(x){var y=x.status;l.subscribe("auth.statusChange",ES(function(x){if(!this.isValid())return;if(y=="unknown"||x.status=="unknown")this.process(true);y=x.status},"bind",true,this))},"bind",true,this))},_handleResizeMsg:function w(x){__p&&__p();if(!this.isValid())return;this._resizeIframe(x);this._resizeFlow(x);if(!this._borderReset){this.getIframeNode().style.border="none";this._borderReset=true}this._isResizeHandled=true;this._makeVisible()},_bubbleResizeEvent:function w(x){var y={height:x.height,width:x.width,pluginID:this.getAttribute("plugin-id")};l.fire("xfbml.resize",y)},_resizeIframe:function w(x){var y=this.getIframeNode();if(x.reposition==="true")this._repositionIframe(x);x.height&&(y.style.height=x.height+"px");x.width&&(y.style.width=x.width+"px")},_resizeFlow:function w(x){var y=this.dom.getElementsByTagName("span")[0];x.height&&(y.style.height=x.height+"px");x.width&&(y.style.width=x.width+"px")},_repositionIframe:function w(x){__p&&__p();var y=this.getIframeNode(),z=parseInt(k.getStyle(y,"width"),10),A=k.getPosition(y).x,B=k.getViewportInfo().width,C=parseInt(x.width,10);if(A+C>B&&A>C){y.style.left=z-C+"px";this.arbiterInform("xd/reposition",{type:"horizontal"});this._repositioned=true}else if(this._repositioned){y.style.left="0px";this.arbiterInform("xd/reposition",{type:"restore"});this._repositioned=false}},_addLoader:function w(){if(!this._loaderDiv){k.addCss(this.dom,"fb_iframe_widget_loader");this._loaderDiv=document.createElement("div");this._loaderDiv.className="FB_Loader";this.dom.appendChild(this._loaderDiv)}},_removeLoader:function w(){if(this._loaderDiv){k.removeCss(this.dom,"fb_iframe_widget_loader");if(this._loaderDiv.parentNode)this._loaderDiv.parentNode.removeChild(this._loaderDiv);this._loaderDiv=null}},_getQS:function w(){return ES("Object","assign",false,{api_key:q.getClientID(),locale:q.getLocale(),sdk:"joey",kid_directed_site:q.getKidDirectedSite(),ref:this.getAttribute("ref")},this.getUrlBits().params)},_getURL:function w(){var x=this.getDefaultWebDomain(),y="";return x+"/plugins/"+y+this.getUrlBits().name+".php"},_postRequest:function w(){j.submitToTarget({url:this._getURL(),target:this.getIframeNode().name,params:this._getQS()})}}),v=0;f.exports=u}),null);
__d("sdk.XFBML.Comments",["sdk.Event","sdk.XFBML.IframeWidget","QueryString","sdk.Runtime","JSSDKConfig","sdk.UA","UrlMap"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();var o=320,p=i.extend({_visibleAfter:"immediate",_refreshOnAuthChange:true,setupAndValidate:function q(){__p&&__p();var r={channel_url:this.getChannelUrl(),colorscheme:this.getAttribute("colorscheme"),skin:this.getAttribute("skin"),numposts:this.getAttribute("num-posts",10),width:this._getLengthAttribute("width"),href:this.getAttribute("href"),permalink:this.getAttribute("permalink"),publish_feed:this.getAttribute("publish_feed"),order_by:this.getAttribute("order_by"),mobile:this._getBoolAttribute("mobile"),version:this.getAttribute("version")};if(!r.width&&!r.permalink)r.width=550;if(l.initSitevars.enableMobileComments&&m.mobile()&&r.mobile!==false)r.mobile=true;if(!r.skin)r.skin=r.colorscheme;if(!r.href){r.migrated=this.getAttribute("migrated");r.xid=this.getAttribute("xid");r.title=this.getAttribute("title",document.title);r.url=this.getAttribute("url",document.URL);r.quiet=this.getAttribute("quiet");r.reverse=this.getAttribute("reverse");r.simple=this.getAttribute("simple");r.css=this.getAttribute("css");r.notify=this.getAttribute("notify");if(!r.xid){var s=ES(document.URL,"indexOf",true,"#");if(s>0)r.xid=encodeURIComponent(document.URL.substring(0,s));else r.xid=encodeURIComponent(document.URL)}if(r.migrated)r.href=n.resolve("www")+"/plugins/comments_v1.php?app_id="+k.getClientID()+"&xid="+encodeURIComponent(r.xid)+"&url="+encodeURIComponent(r.url)}else{var t=this.getAttribute("fb_comment_id");if(!t){t=j.decode(document.URL.substring(ES(document.URL,"indexOf",true,"?")+1)).fb_comment_id;if(t&&ES(t,"indexOf",true,"#")>0)t=t.substring(0,ES(t,"indexOf",true,"#"))}if(t){r.fb_comment_id=t;this.subscribe("render",ES(function(){if(!window.location.hash)window.location.hash=this.getIframeNode().id},"bind",true,this))}}if(!r.version)r.version=k.getVersion();this._attr=r;return true},oneTimeSetup:function q(){this.subscribe("xd.sdk_event",function(r){h.fire(r.event,ES("JSON","parse",false,r.data))})},getSize:function q(){if(!this._attr.permalink)return{width:this._attr.mobile||this._attr.width==="auto"||this._attr.width==="100%"?"100%":Math.max(this._attr.width,o),height:100}},getUrlBits:function q(){return{name:"comments",params:this._attr}},getDefaultWebDomain:function q(){return n.resolve("www",true)}});f.exports=p}),null);
__d("sdk.XFBML.CommentsCount",["ApiClient","sdk.DOM","sdk.XFBML.Element","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();var l=j.extend({process:function m(){i.addCss(this.dom,"fb_comments_count_zero");var n=this.getAttribute("href",window.location.href);h.scheduleBatchCall("/v2.1/"+encodeURIComponent(n),{fields:"share"},ES(function(o){var p=o.share&&o.share.comment_count||0;i.html(this.dom,k('<span class="fb_comments_count">%s</span>',p));if(p>0)i.removeCss(this.dom,"fb_comments_count_zero");this.fire("render")},"bind",true,this))}});f.exports=l}),null);
__d("sdk.XFBML.CustomerChat",["sdk.Content","sdk.DialogUtils","sdk.DOM","sdk.Event","IframePlugin","QueryString","sdk.XD","sdk.createIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";__p&&__p();var p=l.extend({constructor:function q(r,s,t,u){__p&&__p();j.addCss(r,"fb_invisible_flow");r&&r.parentNode&&r.parentNode.removeChild(r);h.append(r);this.parent(r,s,t,u);k.fire("livechatplugin:loaded");this.subscribe("xd.liveChatPluginGetBubbleIframe",ES(function(v){this._bubbleDialog=this.setupNewIframeDialog(v.fromIframe,ES("JSON","parse",false,v.isHTTPS));h.append(this._bubbleDialog);this.subscribe("xd.liveChatPluginShowBubbleIframe",ES(function(v){j.setStyle(this._bubbleDialog,"display","inline")},"bind",true,this))},"bind",true,this));this.subscribe("xd.liveChatPluginPrepareDesktopAnchorIframe",ES(function(v){if(this._iframe){this._iframe.setAttribute("data-testid","dialog_iframe");ES("Object","assign",false,this._iframe.style,{borderRadius:"9pt",bottom:"72pt",boxShadow:"0 3pt 12pt rgba(0, 0, 0, 0.15)",display:ES("JSON","parse",false,v.dialogHidden)?"none":"inline",padding:"0",position:"fixed",right:"18pt",top:"auto",width:"270pt",zIndex:"2147483647"});if(ES("JSON","parse",false,v.chatStarted))ES("Object","assign",false,this._iframe.style,{height:"360pt"})}},"bind",true,this));this.subscribe("xd.liveChatPluginPrepareMobileAnchorIframe",ES(function(v){if(this._iframe){this._iframe.setAttribute("data-testid","dialog_iframe");ES("Object","assign",false,this._iframe.style,{display:ES("JSON","parse",false,v.dialogHidden)?"none":"inline",padding:"0",position:"fixed",zIndex:"2147483647"});if(ES("JSON","parse",false,v.chatStarted))ES("Object","assign",false,this._iframe.style,{height:"100%",right:"0",top:"0",width:"100%"});else ES("Object","assign",false,this._iframe.style,{borderRadius:"9pt",bottom:"72pt",boxShadow:"0 3pt 12pt rgba(0, 0, 0, 0.15)",right:"12pt",top:"auto",width:"270pt"})}},"bind",true,this));this.subscribe("xd.liveChatPluginResizeAnchorIframe",ES(function(v){this._iframe&&j.setStyle(this._iframe,"height",ES("JSON","parse",false,v.height)+"px")},"bind",true,this));this.subscribe("xd.liveChatPluginExpandDesktopDialogIframe",ES(function(v){this._iframe&&j.setStyle(this._iframe,"height","360pt")},"bind",true,this));this.subscribe("xd.liveChatPluginExpandMobileDialogIframe",ES(function(v){if(this._iframe){j.setStyle(this._iframe,"border-radius","0");j.setStyle(this._iframe,"height","100%");j.setStyle(this._iframe,"right","0");j.setStyle(this._iframe,"top","0");j.setStyle(this._iframe,"width","100%")}this._setParentDocumentPositionFixed()},"bind",true,this));this.subscribe("xd.liveChatPluginShowDialogIframe",ES(function(v){this._iframe&&j.setStyle(this._iframe,"display","inline");if(ES("JSON","parse",false,v.isMobile)&&ES("JSON","parse",false,v.chatStarted))this._setParentDocumentPositionFixed()},"bind",true,this));this.subscribe("xd.liveChatPluginHideDialogIframe",ES(function(v){if(ES("JSON","parse",false,v.isMobile)&&ES("JSON","parse",false,v.chatStarted))this._resetParentDocumentPosition();this._iframe&&j.setStyle(this._iframe,"display","none")},"bind",true,this));k.subscribe("livechatplugin:loaded",ES(function(){r&&r.parentNode&&r.parentNode.removeChild(r);this._bubbleDialog&&this._bubbleDialog.parentNode&&this._bubbleDialog.parentNode.removeChild(this._bubbleDialog)},"bind",true,this))},setupNewIframeDialog:function q(r,s){var t="#"+m.encode({forIframe:r}),u=i.setupNewDialog();o({url:n.getXDArbiterURL(s)+t,name:"blank_"+this._iframeOptions.name,root:u.contentRoot,tabindex:-1,width:60,"data-testid":"bubble_iframe"});ES("Object","assign",false,u.dialogElement.style,{background:"none",borderRadius:"50%",bottom:"18pt",boxShadow:"0 3pt 12pt rgba(0, 0, 0, 0.15)",display:"none",height:"45pt",padding:"0",position:"fixed",right:"18pt",top:"auto",width:"45pt",zIndex:"2147483646"});j.addCss(u.dialogElement,"fb_shrink_active");return u.dialogElement},_setParentDocumentPositionFixed:function q(){this._savedScrollXPosition=window.pageXOffset!==undefined?window.pageXOffset:document.documentElement&&document.documentElement.scrollLeft;this._savedScrollYPosition=window.pageYOffset!==undefined?window.pageYOffset:document.documentElement&&document.documentElement.scrollTop;j.addCss(document.body,"fb_mobile_overlay_active")},_resetParentDocumentPosition:function q(){j.removeCss(document.body,"fb_mobile_overlay_active");window.scrollTo(this._savedScrollXPosition,this._savedScrollYPosition)},getParams:function q(){return{logged_in_greeting:"string",logged_out_greeting:"string",minimized:"bool",page_id:"string",theme_color:"string"}}});f.exports=p}),null);
__d("safeEval",[],(function a(b,c,d,e,f,g){function h(i,j){if(i===null||typeof i==="undefined")return;if(typeof i!=="string")return i;if(/^\w+$/.test(i)&&typeof window[i]==="function")return window[i].apply(null,j||[]);return Function('return eval("'+i.replace(/\"/g,'\\"')+'");').apply(null,j||[])}f.exports=h}),null);
__d("sdk.Helper",["sdk.ErrorHandling","sdk.Event","UrlMap","safeEval","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m={isUser:function n(o){return o<22e8||o>=1e14&&o<=100099999989999||o>=89e12&&o<=89999999999999||o>=6000001e7&&o<=60000019999999},upperCaseFirstChar:function n(o){if(o.length>0)return o.substr(0,1).toUpperCase()+o.substr(1);else return o},getProfileLink:function n(o,p,q){if(!q&&o)q=l("%s/profile.php?id=%s",j.resolve("www"),o.uid||o.id);if(q)p=l('<a class="fb_link" href="%s">%s</a>',q,p);return p},invokeHandler:function n(o,p,q){if(o)if(typeof o==="string")h.unguard(k)(o,q);else if(o.apply)h.unguard(o).apply(p,q||[])},fireEvent:function n(o,p){var q=p._attr.href;p.fire(o,q);i.fire(o,q,p)},executeFunctionByName:function n(o){var p=Array.prototype.slice.call(arguments,1),q=o.split("."),r=q.pop(),s=window;for(var t=0;t<q.length;t++)s=s[q[t]];return s[r].apply(this,p)}};f.exports=m}),null);
__d("sdk.XFBML.LoginButton",["sdk.Helper","IframePlugin","Log","sdk.ui","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m=i.extend({constructor:function n(o,p,q,r){__p&&__p();this.parent(o,p,q,r);var s=i.getVal(r,"on_login"),t=null,u=this._iframeOptions.name;if(s){t=function t(v){if(v.error_code){j.debug("Plugin Return Error (%s): %s",v.error_code,v.error_message||v.error_description);return}h.invokeHandler(s,null,[v])};this.subscribe("login.status",t)}this.subscribe("xd.login_button_dialog_open",function(v){k(ES("JSON","parse",false,v.params),function(w){h.invokeHandler(t,null,[w]);l.sendToFacebook(u,{method:"loginReload",params:ES("JSON","stringify",false,w)})})})},shouldIgnoreWidth:function n(){return false},getParams:function n(){return{scope:"string",perms:"string",size:"string",login_text:"text",show_faces:"bool",max_rows:"string",show_login_face:"bool",registration_url:"url_maybe",auto_logout_link:"bool",one_click:"bool",show_banner:"bool",auth_type:"string",default_audience:"string",use_continue_as:"bool",button_type:"string",width:"px",height:"px"}}});f.exports=m}),null);
__d("escapeHTML",[],(function a(b,c,d,e,f,g){var h=/[&<>\"\'\/]/g,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","/":"&#x2F;"};function j(k){return k.replace(h,function(l){return i[l]})}f.exports=j}),null);
__d("sdk.XFBML.Name",["ApiClient","escapeHTML","sdk.Event","sdk.XFBML.Element","sdk.Helper","Log","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();var o={}.hasOwnProperty,p=k.extend({process:function q(){__p&&__p();ES("Object","assign",false,this,{_uid:this.getAttribute("uid"),_firstnameonly:this._getBoolAttribute("first-name-only"),_lastnameonly:this._getBoolAttribute("last-name-only"),_possessive:this._getBoolAttribute("possessive"),_reflexive:this._getBoolAttribute("reflexive"),_objective:this._getBoolAttribute("objective"),_linked:this._getBoolAttribute("linked",true),_subjectId:this.getAttribute("subject-id")});if(!this._uid){m.error('"uid" is a required attribute for <fb:name>');this.fire("render");return}var r=[];if(this._firstnameonly)r.push("first_name");else if(this._lastnameonly)r.push("last_name");else r.push("name");if(this._subjectId){r.push("gender");if(this._subjectId==n.getUserID())this._reflexive=true}j.monitor("auth.statusChange",ES(function(){__p&&__p();if(!this.isValid()){this.fire("render");return true}if(!this._uid||this._uid=="loggedinuser")this._uid=n.getUserID();if(!this._uid)return;h.scheduleBatchCall("/v1.0/"+this._uid,{fields:r.join(",")},ES(function(s){if(o.call(s,"error")){m.warn("The name is not found for ID: "+this._uid);return}if(this._subjectId==this._uid)this._renderPronoun(s);else this._renderOther(s);this.fire("render")},"bind",true,this))},"bind",true,this))},_renderPronoun:function q(r){__p&&__p();var s="",t=this._objective;if(this._subjectId){t=true;if(this._subjectId===this._uid)this._reflexive=true}if(this._uid==n.getUserID()&&this._getBoolAttribute("use-you",true))if(this._possessive)if(this._reflexive)s="your own";else s="your";else if(this._reflexive)s="yourself";else s="you";else switch(r.gender){case"male":if(this._possessive)s=this._reflexive?"his own":"his";else if(this._reflexive)s="himself";else if(t)s="him";else s="he";break;case"female":if(this._possessive)s=this._reflexive?"her own":"her";else if(this._reflexive)s="herself";else if(t)s="her";else s="she";break;default:if(this._getBoolAttribute("use-they",true))if(this._possessive)if(this._reflexive)s="their own";else s="their";else if(this._reflexive)s="themselves";else if(t)s="them";else s="they";else if(this._possessive)if(this._reflexive)s="his/her own";else s="his/her";else if(this._reflexive)s="himself/herself";else if(t)s="him/her";else s="he/she";break}if(this._getBoolAttribute("capitalize",false))s=l.upperCaseFirstChar(s);this.dom.innerHTML=s},_renderOther:function q(r){__p&&__p();var s="",t="";if(this._uid==n.getUserID()&&this._getBoolAttribute("use-you",true))if(this._reflexive)if(this._possessive)s="your own";else s="yourself";else if(this._possessive)s="your";else s="you";else if(r){if(null===r.first_name)r.first_name="";if(null===r.last_name)r.last_name="";if(this._firstnameonly&&r.first_name!==undefined)s=i(r.first_name);else if(this._lastnameonly&&r.last_name!==undefined)s=i(r.last_name);if(!s)s=i(r.name);if(s!==""&&this._possessive)s+="'s"}if(!s)s=i(this.getAttribute("if-cant-see","Facebook User"));if(s){if(this._getBoolAttribute("capitalize",false))s=l.upperCaseFirstChar(s);if(r&&this._linked)t=l.getProfileLink(r,s,this.getAttribute("href",null));else t=s}this.dom.innerHTML=t}});f.exports=p}),null);
__d("UnicodeUtils",["invariant"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i=55296,j=56319,k=56320,l=57343,m=/[\uD800-\uDFFF]/;function n(w){return i<=w&&w<=l}function o(w,x){0<=x&&x<w.length||h(0);if(x+1===w.length)return false;var y=w.charCodeAt(x),z=w.charCodeAt(x+1);return i<=y&&y<=j&&k<=z&&z<=l}function p(w){return m.test(w)}function q(w,x){return 1+n(w.charCodeAt(x))}function r(w){if(!p(w))return w.length;var x=0;for(var y=0;y<w.length;y+=q(w,y))x++;return x}function s(w,x,y){__p&&__p();x=x||0;y=y===undefined?Infinity:y||0;if(!p(w))return w.substr(x,y);var z=w.length;if(z<=0||x>z||y<=0)return"";var A=0;if(x>0){for(;x>0&&A<z;x--)A+=q(w,A);if(A>=z)return""}else if(x<0){for(A=z;x<0&&0<A;x++)A-=q(w,A-1);if(A<0)A=0}var B=z;if(y<z)for(B=A;y>0&&B<z;y--)B+=q(w,B);return w.substring(A,B)}function t(w,x,y){x=x||0;y=y===undefined?Infinity:y||0;if(x<0)x=0;if(y<0)y=0;var z=Math.abs(y-x);x=x<y?x:y;return s(w,x,z)}function u(w){var x=[];for(var y=0;y<w.length;y+=q(w,y))x.push(w.codePointAt(y));return x}var v={getCodePoints:u,getUTF16Length:q,hasSurrogateUnit:p,isCodeUnitInSurrogateRange:n,isSurrogatePair:o,strlen:r,substring:t,substr:s};f.exports=v}),null);
__d("isNode",[],(function a(b,c,d,e,f,g){function h(i){var j=i?i.ownerDocument||i:document,k=j.defaultView||window;return!!(i&&(typeof k.Node==="function"?i instanceof k.Node:typeof i==="object"&&typeof i.nodeType==="number"&&typeof i.nodeName==="string"))}f.exports=h}),18);
__d("isTextNode",["isNode"],(function a(b,c,d,e,f,g,h){function i(j){return h(j)&&j.nodeType==3}f.exports=i}),18);
__d("containsNode",["isTextNode"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j,k){__p&&__p();if(!j||!k)return false;else if(j===k)return true;else if(h(j))return false;else if(h(k))return i(j,k.parentNode);else if("contains"in j)return ES(j,"contains",true,k);else if(j.compareDocumentPosition)return!!(j.compareDocumentPosition(k)&16);else return false}f.exports=i}),null);
__d("sdk.XFBML.Quote",["sdk.DOM","DOMEventListener","IframePlugin","UnicodeUtils","sdk.UA","sdk.XD","containsNode","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";__p&&__p();var p="fb-quotable",q=155,r=70,s="",t=null,u=[],v=false,w=null,x=l.mobile();function y(D){var E=D.getRangeAt(0),F=E.startContainer;return F.nodeType===3?F.parentNode:F}function z(D){__p&&__p();if(!document.getSelection||x)return;var E=document.getSelection();if(E.rangeCount===0){B();return}var F=u.length;B();if(F){var G=false;for(var H=0;H<F;H++)if(n(u[H],E.focusNode)){G=true;break}if(!G)return}s=E.toString();if(s===""){B();return}s=ES(s.toString().replace(/\s+/g," "),"trim",true);var I=Number(o("sharequotelimit",500));if(k.strlen(s)>I)s=k.substr(s,0,I-3)+"...";else s=k.substr(s,0,I);if(!v&&w){y(E).appendChild(w);var J=A(E);w.style.left=J.x+"px";w.style.top=J.y+"px"}}function A(D){__p&&__p();var E=w&&w.offsetWidth,F=E?w.offsetHeight:r,G=E?w.offsetWidth:q,H=D.getRangeAt(0),I=document.createElement("span"),J=document.createElement("span"),K=document.createRange();K.setStart(H.startContainer,H.startOffset);K.insertNode(I);var L=document.createRange();L.setStart(H.endContainer,H.endOffset);L.insertNode(J);var M=I.offsetTop-F,N=I.offsetLeft+(J.offsetLeft-I.offsetLeft)/2-G/2;I.parentNode.removeChild(I);J.parentNode.removeChild(J);return{x:N,y:M}}function B(){s="";if(!v&&w)w.style.left="-9999px"}var C=j.extend({constructor:function D(E,F,G,H){__p&&__p();if(t)return t;this.parent(E,F,G,H);v=h.getAttr(E,"layout")==="button";w=E;w.style.position="absolute";w.style.display="";i.add(document,"keyup",z);i.add(document,"mouseup",z);this.subscribe("xd.getTextSelection",ES(function(){m.sendToFacebook(this._iframeOptions.name,{method:"setTextSelection",params:ES("JSON","stringify",false,{text:s})});B()},"bind",true,this));u=ES(ES("Array","from",false,document.getElementsByTagName("*")),"filter",true,function(I){return I.nodeName.toLowerCase()==="article"||h.containsCss(I,p)});B();t=this;return t},getParams:function D(){return{href:"url",layout:"string"}}});f.exports=C}),null);
__d("sdk.XFBML.Save",["sdk.Content","sdk.DialogUtils","sdk.DOM","sdk.Event","IframePlugin","QueryString","sdk.UA","sdk.XD","sdk.createIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";__p&&__p();var q=void 0,r=l.extend({constructor:function s(t,u,v,w){__p&&__p();this.parent(t,u,v,w);var x=n.mobile();this.subscribe("xd.savePluginGetBlankIframe",ES(function(y){__p&&__p();var z=void 0,A=void 0,B=void 0,C=function C(H){if(H)j.removeCss(H,"fb_invisible")},D=function D(H){if(H)j.addCss(H,"fb_invisible")};if(x){z=i.setupNewDarkOverlay();D(z);h.append(z);i.addDoubleClickAction(z,function(){return ES(B,"forEach",true,D)},5e3)}A=this.setupNewIframeDialog(ES("JSON","parse",false,y.data),y.fromIframe,ES("JSON","parse",false,y.isHTTPS));D(A);h.append(A);B=[A,z];var E=function E(){ES(B,"forEach",true,D);i.onDialogHideCleanup(x);clearInterval(q)},F=void 0;this.subscribe("xd.savePluginShowIframe",ES(function(){k.fire("savePlugin:hideDialog");ES(B,"forEach",true,C);this.positionOnScreen(A,z);if(!x&&!F)F=i.addIdleDesktopAction(A,E,7e3)},"bind",true,this));this.subscribe("xd.savePluginHideIframe",function(){return E()});k.subscribe("savePlugin:hideDialog",function(){return E()});var G=setInterval(function(){var H=document.getElementsByName(y.fromIframe);if(H.length===0){clearInterval(G);E();ES(B,"forEach",true,function(t){t&&t.parentNode.removeChild(t)})}},500)},"bind",true,this))},positionOnScreen:function s(t,u){__p&&__p();var v,w=n.mobile();if(w)(function(){var x=function x(t,u){if(u!=null)i.setDialogPositionToCenter(u,w);i.setDialogPositionToCenter(t,w)};x(t,u);i.addMobileOrientationChangeAction(function(y){x(t,u)});q=setInterval(function(){return x(t,u)},100)})();else{j.setStyle(t,"position","fixed");j.setStyle(t,"top","20px");j.setStyle(t,"right","20px")}},setupNewIframeDialog:function s(t,u,v){__p&&__p();var w="#"+m.encode({forIframe:u}),x=i.setupNewDialog();p({url:o.getXDArbiterURL(v)+w,name:"blank_"+this._iframeOptions.name,root:x.contentRoot,tabindex:-1});j.addCss(x.contentRoot,"fb_dialog_iframe");ES("Object","assign",false,x.dialogElement.style,t.style||{});j.setStyle(x.dialogElement,"width",t.width+"px");j.setStyle(x.dialogElement,"height",t.height+"px");ES(t.classList,"forEach",true,function(y){return j.addCss(x.dialogElement,y)});j.removeCss(x.dialogElement,"fb_dialog_advanced");return x.dialogElement},getParams:function s(){return{uri:"url",url_category:"string",size:"string"}}});f.exports=r}),null);
__d("sdk.XFBML.ShareButton",["IframePlugin","sdk.UA","sdk.ui"],(function a(b,c,d,e,f,g,h,i,j){"use strict";var k=h.extend({constructor:function l(m,n,o,p){this.parent(m,n,o,p);this.subscribe("xd.shareTriggerMobileIframe",function(q){var r=ES("JSON","parse",false,q.data);j({method:"share",href:r.href,mobile_iframe:i.mobile()})})},getParams:function l(){return{href:"url",layout:"string",mobile_iframe:"bool",type:"string",size:"string"}}});f.exports=k}),null);
__d("sdk.XFBML.Video",["Assert","sdk.Event","IframePlugin","ObservableMixin","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();function m(p){"use strict";this.$VideoCache1=p.isMuted;this.$VideoCache2=p.volume;this.$VideoCache3=p.timePosition;this.$VideoCache4=p.duration}m.prototype.update=function(p){"use strict";if(p.isMuted!==undefined)this.$VideoCache1=p.isMuted;if(p.volume!==undefined)this.$VideoCache2=p.volume;if(p.timePosition!==undefined)this.$VideoCache3=p.timePosition;if(p.duration!==undefined)this.$VideoCache4=p.duration};m.prototype.isMuted=function(){"use strict";return this.$VideoCache1};m.prototype.getVolume=function(){"use strict";return this.$VideoCache1?0:this.$VideoCache2};m.prototype.getCurrentPosition=function(){"use strict";return this.$VideoCache3};m.prototype.getDuration=function(){"use strict";return this.$VideoCache4};function n(p,q,r){"use strict";this.$VideoController1=p;this.$VideoController2=q;this.$VideoController3=r}n.prototype.play=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"play",params:ES("JSON","stringify",false,{})})};n.prototype.pause=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"pause",params:ES("JSON","stringify",false,{})})};n.prototype.seek=function(p){"use strict";h.isNumber(p,"Invalid argument");l.sendToFacebook(this.$VideoController1,{method:"seek",params:ES("JSON","stringify",false,{target:p})})};n.prototype.mute=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"mute",params:ES("JSON","stringify",false,{})})};n.prototype.unmute=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"unmute",params:ES("JSON","stringify",false,{})})};n.prototype.setVolume=function(p){"use strict";h.isNumber(p,"Invalid argument");l.sendToFacebook(this.$VideoController1,{method:"setVolume",params:ES("JSON","stringify",false,{volume:p})})};n.prototype.isMuted=function(){"use strict";return this.$VideoController3.isMuted()};n.prototype.getVolume=function(){"use strict";return this.$VideoController3.getVolume()};n.prototype.getCurrentPosition=function(){"use strict";return this.$VideoController3.getCurrentPosition()};n.prototype.getDuration=function(){"use strict";return this.$VideoController3.getDuration()};n.prototype.subscribe=function(event,p){"use strict";h.isString(event,"Invalid argument");h.isFunction(p,"Invalid argument");this.$VideoController2.subscribe(event,p);return{release:ES(function(){this.$VideoController2.unsubscribe(event,p)},"bind",true,this)}};var o=j.extend({constructor:function p(q,r,s,t){__p&&__p();this.parent(q,r,s,t);this._videoController=null;this._sharedObservable=null;this._sharedVideoCache=null;this.subscribe("xd.onVideoAPIReady",function(u){this._sharedObservable=new k();this._sharedVideoCache=new m(ES("JSON","parse",false,u.data));this._videoController=new n(this._iframeOptions.name,this._sharedObservable,this._sharedVideoCache);i.fire("xfbml.ready",{type:"video",id:t.id,instance:this._videoController})});this.subscribe("xd.stateChange",function(u){this._sharedObservable.inform(u.state)});this.subscribe("xd.cachedStateUpdateRequest",function(u){this._sharedVideoCache.update(ES("JSON","parse",false,u.data))})},getParams:function p(){return{allowfullscreen:"bool",autoplay:"bool",controls:"bool",href:"url",show_captions:"bool",show_text:"bool"}},getConfig:function p(){return{fluid:true,full_width:true}}});f.exports=o}),null);
__d("legacy:fb.xfbml.plugins",["IframePlugin","PluginConfig","PluginTags","XFBML","sdk.feature","sdk.XFBML.CustomerChat","sdk.XFBML.Comments","sdk.XFBML.CommentsCount","sdk.XFBML.LoginButton","sdk.XFBML.Name","sdk.XFBML.Quote","sdk.XFBML.Save","sdk.XFBML.ShareButton","sdk.XFBML.Video"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m={customerchat:c("sdk.XFBML.CustomerChat"),comments:c("sdk.XFBML.Comments"),comments_count:c("sdk.XFBML.CommentsCount"),login_button:c("sdk.XFBML.LoginButton"),name:c("sdk.XFBML.Name"),quote:c("sdk.XFBML.Quote"),save:c("sdk.XFBML.Save"),share_button:c("sdk.XFBML.ShareButton"),video:c("sdk.XFBML.Video")},n=l("plugin_tags_blacklist",[]);ES(ES("Object","keys",false,j),"forEach",true,function(o){if(ES(n,"indexOf",true,o)!==-1)return;k.registerTag({xmlns:"fb",localName:o.replace(/_/g,"-"),ctor:h.withParams(j[o],i[o])})});ES(ES("Object","keys",false,m),"forEach",true,function(o){if(ES(n,"indexOf",true,o)!==-1)return;k.registerTag({xmlns:"fb",localName:o.replace(/_/g,"-"),ctor:m[o]})})}),3);
    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"3597473","namespace":"FB","message":"'+e.message+'"}}');}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util) {
    var pay = {}

    /**
     * 获取商品列表
     * @returns {Array}
     */
    pay.getProducts = function(){
        var params = {
            appId:__webpack_require__(0).context.appId,
            clientId:__webpack_require__(0).context.clientId,
            sdkVer:__webpack_require__(0).context.version,
            sdkType:__webpack_require__(0).context.sdkType,
            os:__webpack_require__(0).context.os,
            runPlatform:__webpack_require__(0).context.runPlatform,
        };

        params.osign = util.sign([params.sdkVer,params.sdkType,params.clientId,params.appId,params.os,params.runPlatform,__webpack_require__(0).context.appKey]);
        var productList =[];
        util.ajax({
            type:"post",
            async:false,
            url: __webpack_require__(0).context.GHW_BKD_API+'v3/pay/products.do',
            data:params,
            success:function(data){
                var result = JSON.parse(data);
                if(result.code == 200){
                    productList = result.productList;
                    var productMap = {};
                    for (var i=0;i<productList.length;i++){
                        util.log(productList[i]);
                        var product = productList[i];
                        var payChannelMap={};
                        for (var j = 0;j<product.payChannel.length;j++){
                            payChannelMap[product.payChannel[j].name] = product.payChannel[j];
                        }
                        product.payChannel = payChannelMap;
                        productMap[product.productId] = product;
                    }
                    __webpack_require__(0).context.productMap = productMap;
                }else {
                    util.log(data)
                }
            }
        })
        return productList;
    }

    /**
     * 支付UI
     * @param payObject
     */
    pay.payUI = function(payObject){
        if(!__webpack_require__(0).context.productMap){
            pay.getProducts();
        }
        if(typeof  payObject === 'object'){
            if(__webpack_require__(0).context.productMap.hasOwnProperty(payObject.productId)){
                var product = __webpack_require__(0).context.productMap[payObject.productId];
                if(payObject.channel && product.payChannel.hasOwnProperty(payObject.channel)){
                    var payChannel = product.payChannel[payObject.channel];
                    if(1 == payChannel.method){
                        inAppPay(payObject);
                    }else if(2 == payChannel.method){
                        webViewPay(payObject);
                    }
                } else {
                    //生成支付方式UI
                    renderUI(product.payChannel);
                    __webpack_require__(0).context.cacheProduct = payObject;
                }
            }else {
                util.log('product not exist')
            }
        }else if(typeof  payObject === 'string'){
            if(__webpack_require__(0).context.cacheProduct){
                __webpack_require__(0).context.cacheProduct.channel = payObject;
                payWay(__webpack_require__(0).context.cacheProduct)
            }else {
                util.log('error for pay')
            }
        }
    }

    //渲染UI
    function renderUI(payChannel){
        //检查用户是否登录
        if(!util.isLogin()){
            console.log('please sign in')
            return;
        }
        //支付根DIV
        var payRootId = 'wing_pay_root';
        if(document.getElementById(payRootId)){
            document.getElementById(payRootId).remove();
        }
        var node = document.createElement('div');
        node.id = payRootId;
        var paramValueJson = "{";
        for(var k in payChannel){
            paramValueJson += '"'+k+'":"'+payChannel[k].logoUrl+'",';
        }
        if(paramValueJson.length>1){
            paramValueJson = paramValueJson.substring(0,paramValueJson.length-1);
        }
        paramValueJson +="}";
        console.log(paramValueJson)
        console.log(window.btoa(encodeURIComponent(paramValueJson)));
        var modalUrl = __webpack_require__(0).context.GHW_BKD_API+"v1/pay/pay_modal.do?mobile="+util.isMobileDevice()+"&pcdate="+window.btoa(encodeURIComponent(paramValueJson));
        var payRootHtml ='<iframe id="wing_pay_modal" style="height: 25rem;position: absolute;top: 0;left: 0;right: 0;bottom: 0; width: 100%; height: 100%;margin: auto;background-color: #ffffff; z-index: 99;overflow: hidden;font-size: 1rem;font-family: "Arial";color: #ffffff;" frameborder="0" scrolling="no" allowtransparency="true" data-processed="false" title="Pay with Wing SDK" name="wing_pay_modal" src="'+modalUrl+'"></iframe>';
        document.body.appendChild(node);
        node.innerHTML = payRootHtml;

        //增加监听
        window.addEventListener('message', function closePayModal (event) {
            // 通过origin属性判断消息来源地址
            //if (event.origin == 'http://127.0.0.1:10847') {
            //console.log(event.data);
            //alert(event.data+'|'+typeof(event.data));    // 弹出从子页面post过来的信息
            //}

            if(event.data){
                var resultData = JSON.parse(event.data);
                if(resultData.hasOwnProperty("pay")){
                    document.getElementById(payRootId).remove();
                    window.removeEventListener("message",closePayModal);
                    if(resultData["pay"]){
                        pay.payUI(resultData["pay"]);
                    }
                }
            }
        }, false);
    }

    /**
     * 支付方式
     * @param payObject
     */
    function payWay(payObject) {
        if(__webpack_require__(0).context.productMap.hasOwnProperty(payObject.productId)){
            var product = __webpack_require__(0).context.productMap[payObject.productId];
            if(payObject.channel && product.payChannel.hasOwnProperty(payObject.channel)){
                var payChannel = product.payChannel[payObject.channel];
                payObject.payChannel = payChannel;
                if(1 == payChannel.method){
                    inAppPay(payObject);
                }else if(2 == payChannel.method){
                    webViewPay(payObject);
                }
                //清除商品缓存
                __webpack_require__(0).context.cacheProduct = null;
            }else {
                util.log('channel not exist')
            }
        }else {
            util.log('product not exist')
        }
    }

    /**
     * 应用内支付
     * @param payObject
     */
    function inAppPay(payObject){
        var params = {
            sdkVer:__webpack_require__(0).context.version,
            sdkType:__webpack_require__(0).context.sdkType,
            os:__webpack_require__(0).context.os,
            runPlatform:__webpack_require__(0).context.runPlatform,
            clientId:__webpack_require__(0).context.clientId,
            appId:__webpack_require__(0).context.appId,
            channel:payObject.channel,
            productId:payObject.productId,
            orderAmountMicros:payObject.orderAmountMicros||'0',
            currencyCode:payObject.currencyCode ||'',
            extInfo:payObject.extInfo ||'',
            collectionInfo:payObject.collectionInfo ||'',
            userId:__webpack_require__(0).context.userId,
            //userId:123,
            serverId:payObject.serverId,
            gameUserId:payObject.gameUserId,
            cpsChannel:payObject.cpsChannel ||'',
            sdkExtInfo:'',
        };
        params.osign = util.sign([params.appId,__webpack_require__(0).context.appKey,params.channel,params.clientId,params.currencyCode,params.extInfo,params.orderAmountMicros,params.productId,
            params.sdkVer,params.sdkType,params.os,params.runPlatform,params.serverId,params.gameUserId,params.userId,params.cpsChannel,params.collectionInfo,params.sdkExtInfo]);
        util.ajax({
            url: __webpack_require__(0).context.GHW_BKD_API+'v5/pay/create_order.do',
            data:params,
            async:false,
            type:'POST',
            success:function(data){
                var result = JSON.parse(data);
                if(result.code == 200){
                    payObject.orderInfo = result;
                    //创建订单后，调用对应支付API
                    switch (payObject.channel){
                        case 'FACEBOOK':
                            if(wing.facebook){
                                wing.facebook.init();
                                wing.facebook.pay(payObject);
                            }
                            break;
                        default:
                            console.log('pay channel error')
                            return;
                    }
                }else {
                    util.log(data)
                }
            }
        })
    }

    /**
     * 网页支付
     * @param payObject
     */
     function webViewPay (payObject){
        var params = {
            sdkVer:__webpack_require__(0).context.version,
            sdkType:__webpack_require__(0).context.sdkType,
            appId:__webpack_require__(0).context.appId,
            channel:payObject.channel,
            productId:payObject.productId,
            userId:__webpack_require__(0).context.userId,
            //userId:123,
            serverId:payObject.serverId,
            gameUserId:payObject.gameUserId,
            os:__webpack_require__(0).context.os,
            runPlatform:__webpack_require__(0).context.runPlatform,
            clientId:__webpack_require__(0).context.clientId,
            productName:payObject.productName,
            orderAmountMicros:payObject.orderAmountMicros ||0,
            currencyCode:payObject.currencyCode ||'',
            extInfo:payObject.extInfo ||'',
            collectionInfo:payObject.collectionInfo ||'',
            cpsChannel:payObject.cpsChannel ||'',
            testMode:__webpack_require__(0).context.debug?1:0,
        };
        params.osign = util.sign([params.appId,__webpack_require__(0).context.appKey,params.channel,params.clientId,params.extInfo,params.productId,params.sdkVer,
            params.sdkType,params.os,params.runPlatform, params.serverId,params.gameUserId,params.userId,params.cpsChannel,params.collectionInfo]);
        var convertData = "?" ;
        for(var k in params){
            convertData += k + "=" + params[k] + "&";
        }
        convertData = convertData.substring(0,convertData.length-1)
        var payUrl = __webpack_require__(0).context.GHW_BKD_API+'v3/pay/do_pay.do'+convertData;
        var openView = window.open(payUrl,'_blank','width=700,height=600,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');
        var loopOpenClose = setInterval(function() {
            if(openView.closed) {
                clearInterval(loopOpenClose);
                if(payObject.success){
                    payObject.success();
                }
            }
        }, 1000);
    }
    util.register("wing.pay",pay);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t,i){"use strict"; true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (i),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=i():t.exports?t.exports=i():t[e]=i()}("Fingerprint2",this,function(){"use strict";var e=function(t){if(!(this instanceof e))return new e(t);var i={swfContainerId:"fingerprintjs2",swfPath:"flash/compiled/FontList.swf",detectScreenOrientation:!0,sortPluginsFor:[/palemoon/i],userDefinedFonts:[]};this.options=this.extend(t,i),this.nativeForEach=Array.prototype.forEach,this.nativeMap=Array.prototype.map};return e.prototype={extend:function(e,t){if(null==e)return t;for(var i in e)null!=e[i]&&t[i]!==e[i]&&(t[i]=e[i]);return t},get:function(e){var t=[];t=this.userAgentKey(t),t=this.languageKey(t),t=this.colorDepthKey(t),t=this.pixelRatioKey(t),t=this.hardwareConcurrencyKey(t),t=this.screenResolutionKey(t),t=this.availableScreenResolutionKey(t),t=this.timezoneOffsetKey(t),t=this.sessionStorageKey(t),t=this.localStorageKey(t),t=this.indexedDbKey(t),t=this.addBehaviorKey(t),t=this.openDatabaseKey(t),t=this.cpuClassKey(t),t=this.platformKey(t),t=this.doNotTrackKey(t),t=this.pluginsKey(t),t=this.canvasKey(t),t=this.webglKey(t),t=this.adBlockKey(t),t=this.hasLiedLanguagesKey(t),t=this.hasLiedResolutionKey(t),t=this.hasLiedOsKey(t),t=this.hasLiedBrowserKey(t),t=this.touchSupportKey(t),t=this.customEntropyFunction(t);var i=this;this.fontsKey(t,function(t){var a=[];i.each(t,function(e){var t=e.value;"undefined"!=typeof e.value.join&&(t=e.value.join(";")),a.push(t)});var r=i.x64hash128(a.join("~~~"),31);return e(r,t)})},customEntropyFunction:function(e){return"function"==typeof this.options.customFunction&&e.push({key:"custom",value:this.options.customFunction()}),e},userAgentKey:function(e){return this.options.excludeUserAgent||e.push({key:"user_agent",value:this.getUserAgent()}),e},getUserAgent:function(){return navigator.userAgent},languageKey:function(e){return this.options.excludeLanguage||e.push({key:"language",value:navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||""}),e},colorDepthKey:function(e){return this.options.excludeColorDepth||e.push({key:"color_depth",value:screen.colorDepth||-1}),e},pixelRatioKey:function(e){return this.options.excludePixelRatio||e.push({key:"pixel_ratio",value:this.getPixelRatio()}),e},getPixelRatio:function(){return window.devicePixelRatio||""},screenResolutionKey:function(e){return this.options.excludeScreenResolution?e:this.getScreenResolution(e)},getScreenResolution:function(e){var t;return t=this.options.detectScreenOrientation&&screen.height>screen.width?[screen.height,screen.width]:[screen.width,screen.height],"undefined"!=typeof t&&e.push({key:"resolution",value:t}),e},availableScreenResolutionKey:function(e){return this.options.excludeAvailableScreenResolution?e:this.getAvailableScreenResolution(e)},getAvailableScreenResolution:function(e){var t;return screen.availWidth&&screen.availHeight&&(t=this.options.detectScreenOrientation?screen.availHeight>screen.availWidth?[screen.availHeight,screen.availWidth]:[screen.availWidth,screen.availHeight]:[screen.availHeight,screen.availWidth]),"undefined"!=typeof t&&e.push({key:"available_resolution",value:t}),e},timezoneOffsetKey:function(e){return this.options.excludeTimezoneOffset||e.push({key:"timezone_offset",value:(new Date).getTimezoneOffset()}),e},sessionStorageKey:function(e){return!this.options.excludeSessionStorage&&this.hasSessionStorage()&&e.push({key:"session_storage",value:1}),e},localStorageKey:function(e){return!this.options.excludeSessionStorage&&this.hasLocalStorage()&&e.push({key:"local_storage",value:1}),e},indexedDbKey:function(e){return!this.options.excludeIndexedDB&&this.hasIndexedDB()&&e.push({key:"indexed_db",value:1}),e},addBehaviorKey:function(e){return document.body&&!this.options.excludeAddBehavior&&document.body.addBehavior&&e.push({key:"add_behavior",value:1}),e},openDatabaseKey:function(e){return!this.options.excludeOpenDatabase&&window.openDatabase&&e.push({key:"open_database",value:1}),e},cpuClassKey:function(e){return this.options.excludeCpuClass||e.push({key:"cpu_class",value:this.getNavigatorCpuClass()}),e},platformKey:function(e){return this.options.excludePlatform||e.push({key:"navigator_platform",value:this.getNavigatorPlatform()}),e},doNotTrackKey:function(e){return this.options.excludeDoNotTrack||e.push({key:"do_not_track",value:this.getDoNotTrack()}),e},canvasKey:function(e){return!this.options.excludeCanvas&&this.isCanvasSupported()&&e.push({key:"canvas",value:this.getCanvasFp()}),e},webglKey:function(e){return this.options.excludeWebGL?e:this.isWebGlSupported()?(e.push({key:"webgl",value:this.getWebglFp()}),e):e},adBlockKey:function(e){return this.options.excludeAdBlock||e.push({key:"adblock",value:this.getAdBlock()}),e},hasLiedLanguagesKey:function(e){return this.options.excludeHasLiedLanguages||e.push({key:"has_lied_languages",value:this.getHasLiedLanguages()}),e},hasLiedResolutionKey:function(e){return this.options.excludeHasLiedResolution||e.push({key:"has_lied_resolution",value:this.getHasLiedResolution()}),e},hasLiedOsKey:function(e){return this.options.excludeHasLiedOs||e.push({key:"has_lied_os",value:this.getHasLiedOs()}),e},hasLiedBrowserKey:function(e){return this.options.excludeHasLiedBrowser||e.push({key:"has_lied_browser",value:this.getHasLiedBrowser()}),e},fontsKey:function(e,t){return this.options.excludeJsFonts?this.flashFontsKey(e,t):this.jsFontsKey(e,t)},flashFontsKey:function(e,t){return this.options.excludeFlashFonts?t(e):this.hasSwfObjectLoaded()&&this.hasMinFlashInstalled()?"undefined"==typeof this.options.swfPath?t(e):void this.loadSwfAndDetectFonts(function(i){e.push({key:"swf_fonts",value:i.join(";")}),t(e)}):t(e)},jsFontsKey:function(e,t){var i=this;return setTimeout(function(){var a=["monospace","sans-serif","serif"],r=["Andale Mono","Arial","Arial Black","Arial Hebrew","Arial MT","Arial Narrow","Arial Rounded MT Bold","Arial Unicode MS","Bitstream Vera Sans Mono","Book Antiqua","Bookman Old Style","Calibri","Cambria","Cambria Math","Century","Century Gothic","Century Schoolbook","Comic Sans","Comic Sans MS","Consolas","Courier","Courier New","Garamond","Geneva","Georgia","Helvetica","Helvetica Neue","Impact","Lucida Bright","Lucida Calligraphy","Lucida Console","Lucida Fax","LUCIDA GRANDE","Lucida Handwriting","Lucida Sans","Lucida Sans Typewriter","Lucida Sans Unicode","Microsoft Sans Serif","Monaco","Monotype Corsiva","MS Gothic","MS Outlook","MS PGothic","MS Reference Sans Serif","MS Sans Serif","MS Serif","MYRIAD","MYRIAD PRO","Palatino","Palatino Linotype","Segoe Print","Segoe Script","Segoe UI","Segoe UI Light","Segoe UI Semibold","Segoe UI Symbol","Tahoma","Times","Times New Roman","Times New Roman PS","Trebuchet MS","Verdana","Wingdings","Wingdings 2","Wingdings 3"],n=["Abadi MT Condensed Light","Academy Engraved LET","ADOBE CASLON PRO","Adobe Garamond","ADOBE GARAMOND PRO","Agency FB","Aharoni","Albertus Extra Bold","Albertus Medium","Algerian","Amazone BT","American Typewriter","American Typewriter Condensed","AmerType Md BT","Andalus","Angsana New","AngsanaUPC","Antique Olive","Aparajita","Apple Chancery","Apple Color Emoji","Apple SD Gothic Neo","Arabic Typesetting","ARCHER","ARNO PRO","Arrus BT","Aurora Cn BT","AvantGarde Bk BT","AvantGarde Md BT","AVENIR","Ayuthaya","Bandy","Bangla Sangam MN","Bank Gothic","BankGothic Md BT","Baskerville","Baskerville Old Face","Batang","BatangChe","Bauer Bodoni","Bauhaus 93","Bazooka","Bell MT","Bembo","Benguiat Bk BT","Berlin Sans FB","Berlin Sans FB Demi","Bernard MT Condensed","BernhardFashion BT","BernhardMod BT","Big Caslon","BinnerD","Blackadder ITC","BlairMdITC TT","Bodoni 72","Bodoni 72 Oldstyle","Bodoni 72 Smallcaps","Bodoni MT","Bodoni MT Black","Bodoni MT Condensed","Bodoni MT Poster Compressed","Bookshelf Symbol 7","Boulder","Bradley Hand","Bradley Hand ITC","Bremen Bd BT","Britannic Bold","Broadway","Browallia New","BrowalliaUPC","Brush Script MT","Californian FB","Calisto MT","Calligrapher","Candara","CaslonOpnface BT","Castellar","Centaur","Cezanne","CG Omega","CG Times","Chalkboard","Chalkboard SE","Chalkduster","Charlesworth","Charter Bd BT","Charter BT","Chaucer","ChelthmITC Bk BT","Chiller","Clarendon","Clarendon Condensed","CloisterBlack BT","Cochin","Colonna MT","Constantia","Cooper Black","Copperplate","Copperplate Gothic","Copperplate Gothic Bold","Copperplate Gothic Light","CopperplGoth Bd BT","Corbel","Cordia New","CordiaUPC","Cornerstone","Coronet","Cuckoo","Curlz MT","DaunPenh","Dauphin","David","DB LCD Temp","DELICIOUS","Denmark","DFKai-SB","Didot","DilleniaUPC","DIN","DokChampa","Dotum","DotumChe","Ebrima","Edwardian Script ITC","Elephant","English 111 Vivace BT","Engravers MT","EngraversGothic BT","Eras Bold ITC","Eras Demi ITC","Eras Light ITC","Eras Medium ITC","EucrosiaUPC","Euphemia","Euphemia UCAS","EUROSTILE","Exotc350 Bd BT","FangSong","Felix Titling","Fixedsys","FONTIN","Footlight MT Light","Forte","FrankRuehl","Fransiscan","Freefrm721 Blk BT","FreesiaUPC","Freestyle Script","French Script MT","FrnkGothITC Bk BT","Fruitger","FRUTIGER","Futura","Futura Bk BT","Futura Lt BT","Futura Md BT","Futura ZBlk BT","FuturaBlack BT","Gabriola","Galliard BT","Gautami","Geeza Pro","Geometr231 BT","Geometr231 Hv BT","Geometr231 Lt BT","GeoSlab 703 Lt BT","GeoSlab 703 XBd BT","Gigi","Gill Sans","Gill Sans MT","Gill Sans MT Condensed","Gill Sans MT Ext Condensed Bold","Gill Sans Ultra Bold","Gill Sans Ultra Bold Condensed","Gisha","Gloucester MT Extra Condensed","GOTHAM","GOTHAM BOLD","Goudy Old Style","Goudy Stout","GoudyHandtooled BT","GoudyOLSt BT","Gujarati Sangam MN","Gulim","GulimChe","Gungsuh","GungsuhChe","Gurmukhi MN","Haettenschweiler","Harlow Solid Italic","Harrington","Heather","Heiti SC","Heiti TC","HELV","Herald","High Tower Text","Hiragino Kaku Gothic ProN","Hiragino Mincho ProN","Hoefler Text","Humanst 521 Cn BT","Humanst521 BT","Humanst521 Lt BT","Imprint MT Shadow","Incised901 Bd BT","Incised901 BT","Incised901 Lt BT","INCONSOLATA","Informal Roman","Informal011 BT","INTERSTATE","IrisUPC","Iskoola Pota","JasmineUPC","Jazz LET","Jenson","Jester","Jokerman","Juice ITC","Kabel Bk BT","Kabel Ult BT","Kailasa","KaiTi","Kalinga","Kannada Sangam MN","Kartika","Kaufmann Bd BT","Kaufmann BT","Khmer UI","KodchiangUPC","Kokila","Korinna BT","Kristen ITC","Krungthep","Kunstler Script","Lao UI","Latha","Leelawadee","Letter Gothic","Levenim MT","LilyUPC","Lithograph","Lithograph Light","Long Island","Lydian BT","Magneto","Maiandra GD","Malayalam Sangam MN","Malgun Gothic","Mangal","Marigold","Marion","Marker Felt","Market","Marlett","Matisse ITC","Matura MT Script Capitals","Meiryo","Meiryo UI","Microsoft Himalaya","Microsoft JhengHei","Microsoft New Tai Lue","Microsoft PhagsPa","Microsoft Tai Le","Microsoft Uighur","Microsoft YaHei","Microsoft Yi Baiti","MingLiU","MingLiU_HKSCS","MingLiU_HKSCS-ExtB","MingLiU-ExtB","Minion","Minion Pro","Miriam","Miriam Fixed","Mistral","Modern","Modern No. 20","Mona Lisa Solid ITC TT","Mongolian Baiti","MONO","MoolBoran","Mrs Eaves","MS LineDraw","MS Mincho","MS PMincho","MS Reference Specialty","MS UI Gothic","MT Extra","MUSEO","MV Boli","Nadeem","Narkisim","NEVIS","News Gothic","News GothicMT","NewsGoth BT","Niagara Engraved","Niagara Solid","Noteworthy","NSimSun","Nyala","OCR A Extended","Old Century","Old English Text MT","Onyx","Onyx BT","OPTIMA","Oriya Sangam MN","OSAKA","OzHandicraft BT","Palace Script MT","Papyrus","Parchment","Party LET","Pegasus","Perpetua","Perpetua Titling MT","PetitaBold","Pickwick","Plantagenet Cherokee","Playbill","PMingLiU","PMingLiU-ExtB","Poor Richard","Poster","PosterBodoni BT","PRINCETOWN LET","Pristina","PTBarnum BT","Pythagoras","Raavi","Rage Italic","Ravie","Ribbon131 Bd BT","Rockwell","Rockwell Condensed","Rockwell Extra Bold","Rod","Roman","Sakkal Majalla","Santa Fe LET","Savoye LET","Sceptre","Script","Script MT Bold","SCRIPTINA","Serifa","Serifa BT","Serifa Th BT","ShelleyVolante BT","Sherwood","Shonar Bangla","Showcard Gothic","Shruti","Signboard","SILKSCREEN","SimHei","Simplified Arabic","Simplified Arabic Fixed","SimSun","SimSun-ExtB","Sinhala Sangam MN","Sketch Rockwell","Skia","Small Fonts","Snap ITC","Snell Roundhand","Socket","Souvenir Lt BT","Staccato222 BT","Steamer","Stencil","Storybook","Styllo","Subway","Swis721 BlkEx BT","Swiss911 XCm BT","Sylfaen","Synchro LET","System","Tamil Sangam MN","Technical","Teletype","Telugu Sangam MN","Tempus Sans ITC","Terminal","Thonburi","Traditional Arabic","Trajan","TRAJAN PRO","Tristan","Tubular","Tunga","Tw Cen MT","Tw Cen MT Condensed","Tw Cen MT Condensed Extra Bold","TypoUpright BT","Unicorn","Univers","Univers CE 55 Medium","Univers Condensed","Utsaah","Vagabond","Vani","Vijaya","Viner Hand ITC","VisualUI","Vivaldi","Vladimir Script","Vrinda","Westminster","WHITNEY","Wide Latin","ZapfEllipt BT","ZapfHumnst BT","ZapfHumnst Dm BT","Zapfino","Zurich BlkEx BT","Zurich Ex BT","ZWAdobeF"];i.options.extendedJsFonts&&(r=r.concat(n)),r=r.concat(i.options.userDefinedFonts);var o="mmmmmmmmmmlli",s="72px",l=document.getElementsByTagName("body")[0],h=document.createElement("div"),u=document.createElement("div"),c={},d={},g=function(){var e=document.createElement("span");return e.style.position="absolute",e.style.left="-9999px",e.style.fontSize=s,e.style.lineHeight="normal",e.innerHTML=o,e},p=function(e,t){var i=g();return i.style.fontFamily="'"+e+"',"+t,i},f=function(){for(var e=[],t=0,i=a.length;t<i;t++){var r=g();r.style.fontFamily=a[t],h.appendChild(r),e.push(r)}return e},m=function(){for(var e={},t=0,i=r.length;t<i;t++){for(var n=[],o=0,s=a.length;o<s;o++){var l=p(r[t],a[o]);u.appendChild(l),n.push(l)}e[r[t]]=n}return e},T=function(e){for(var t=!1,i=0;i<a.length;i++)if(t=e[i].offsetWidth!==c[a[i]]||e[i].offsetHeight!==d[a[i]])return t;return t},S=f();l.appendChild(h);for(var x=0,v=a.length;x<v;x++)c[a[x]]=S[x].offsetWidth,d[a[x]]=S[x].offsetHeight;var E=m();l.appendChild(u);for(var M=[],A=0,y=r.length;A<y;A++)T(E[r[A]])&&M.push(r[A]);l.removeChild(u),l.removeChild(h),e.push({key:"js_fonts",value:M}),t(e)},1)},pluginsKey:function(e){return this.options.excludePlugins||(this.isIE()?this.options.excludeIEPlugins||e.push({key:"ie_plugins",value:this.getIEPlugins()}):e.push({key:"regular_plugins",value:this.getRegularPlugins()})),e},getRegularPlugins:function(){for(var e=[],t=0,i=navigator.plugins.length;t<i;t++)e.push(navigator.plugins[t]);return this.pluginsShouldBeSorted()&&(e=e.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0})),this.map(e,function(e){var t=this.map(e,function(e){return[e.type,e.suffixes].join("~")}).join(",");return[e.name,e.description,t].join("::")},this)},getIEPlugins:function(){var e=[];if(Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(window,"ActiveXObject")||"ActiveXObject"in window){var t=["AcroPDF.PDF","Adodb.Stream","AgControl.AgControl","DevalVRXCtrl.DevalVRXCtrl.1","MacromediaFlashPaper.MacromediaFlashPaper","Msxml2.DOMDocument","Msxml2.XMLHTTP","PDF.PdfCtrl","QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1","RealPlayer","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","Scripting.Dictionary","SWCtl.SWCtl","Shell.UIHelper","ShockwaveFlash.ShockwaveFlash","Skype.Detection","TDCCtl.TDCCtl","WMPlayer.OCX","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1"];e=this.map(t,function(e){try{return new ActiveXObject(e),e}catch(t){return null}})}return navigator.plugins&&(e=e.concat(this.getRegularPlugins())),e},pluginsShouldBeSorted:function(){for(var e=!1,t=0,i=this.options.sortPluginsFor.length;t<i;t++){var a=this.options.sortPluginsFor[t];if(navigator.userAgent.match(a)){e=!0;break}}return e},touchSupportKey:function(e){return this.options.excludeTouchSupport||e.push({key:"touch_support",value:this.getTouchSupport()}),e},hardwareConcurrencyKey:function(e){return this.options.excludeHardwareConcurrency||e.push({key:"hardware_concurrency",value:this.getHardwareConcurrency()}),e},hasSessionStorage:function(){try{return!!window.sessionStorage}catch(e){return!0}},hasLocalStorage:function(){try{return!!window.localStorage}catch(e){return!0}},hasIndexedDB:function(){try{return!!window.indexedDB}catch(e){return!0}},getHardwareConcurrency:function(){return navigator.hardwareConcurrency?navigator.hardwareConcurrency:"unknown"},getNavigatorCpuClass:function(){return navigator.cpuClass?navigator.cpuClass:"unknown"},getNavigatorPlatform:function(){return navigator.platform?navigator.platform:"unknown"},getDoNotTrack:function(){return navigator.doNotTrack?navigator.doNotTrack:navigator.msDoNotTrack?navigator.msDoNotTrack:window.doNotTrack?window.doNotTrack:"unknown"},getTouchSupport:function(){var e=0,t=!1;"undefined"!=typeof navigator.maxTouchPoints?e=navigator.maxTouchPoints:"undefined"!=typeof navigator.msMaxTouchPoints&&(e=navigator.msMaxTouchPoints);try{document.createEvent("TouchEvent"),t=!0}catch(i){}var a="ontouchstart"in window;return[e,t,a]},getCanvasFp:function(){var e=[],t=document.createElement("canvas");t.width=2e3,t.height=200,t.style.display="inline";var i=t.getContext("2d");return i.rect(0,0,10,10),i.rect(2,2,6,6),e.push("canvas winding:"+(i.isPointInPath(5,5,"evenodd")===!1?"yes":"no")),i.textBaseline="alphabetic",i.fillStyle="#f60",i.fillRect(125,1,62,20),i.fillStyle="#069",this.options.dontUseFakeFontInCanvas?i.font="11pt Arial":i.font="11pt no-real-font-123",i.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03",2,15),i.fillStyle="rgba(102, 204, 0, 0.2)",i.font="18pt Arial",i.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03",4,45),i.globalCompositeOperation="multiply",i.fillStyle="rgb(255,0,255)",i.beginPath(),i.arc(50,50,50,0,2*Math.PI,!0),i.closePath(),i.fill(),i.fillStyle="rgb(0,255,255)",i.beginPath(),i.arc(100,50,50,0,2*Math.PI,!0),i.closePath(),i.fill(),i.fillStyle="rgb(255,255,0)",i.beginPath(),i.arc(75,100,50,0,2*Math.PI,!0),i.closePath(),i.fill(),i.fillStyle="rgb(255,0,255)",i.arc(75,75,75,0,2*Math.PI,!0),i.arc(75,75,25,0,2*Math.PI,!0),i.fill("evenodd"),e.push("canvas fp:"+t.toDataURL()),e.join("~")},getWebglFp:function(){var e,t=function(t){return e.clearColor(0,0,0,1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),"["+t[0]+", "+t[1]+"]"},i=function(e){var t,i=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic");return i?(t=e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT),0===t&&(t=2),t):null};if(e=this.getWebglCanvas(),!e)return null;var a=[],r="attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}",n="precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}",o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o);var s=new Float32Array([-.2,-.9,0,.4,-.26,0,0,.732134444,0]);e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),o.itemSize=3,o.numItems=3;var l=e.createProgram(),h=e.createShader(e.VERTEX_SHADER);e.shaderSource(h,r),e.compileShader(h);var u=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(u,n),e.compileShader(u),e.attachShader(l,h),e.attachShader(l,u),e.linkProgram(l),e.useProgram(l),l.vertexPosAttrib=e.getAttribLocation(l,"attrVertex"),l.offsetUniform=e.getUniformLocation(l,"uniformOffset"),e.enableVertexAttribArray(l.vertexPosArray),e.vertexAttribPointer(l.vertexPosAttrib,o.itemSize,e.FLOAT,!1,0,0),e.uniform2f(l.offsetUniform,1,1),e.drawArrays(e.TRIANGLE_STRIP,0,o.numItems),null!=e.canvas&&a.push(e.canvas.toDataURL()),a.push("extensions:"+e.getSupportedExtensions().join(";")),a.push("webgl aliased line width range:"+t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))),a.push("webgl aliased point size range:"+t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))),a.push("webgl alpha bits:"+e.getParameter(e.ALPHA_BITS)),a.push("webgl antialiasing:"+(e.getContextAttributes().antialias?"yes":"no")),a.push("webgl blue bits:"+e.getParameter(e.BLUE_BITS)),a.push("webgl depth bits:"+e.getParameter(e.DEPTH_BITS)),a.push("webgl green bits:"+e.getParameter(e.GREEN_BITS)),a.push("webgl max anisotropy:"+i(e)),a.push("webgl max combined texture image units:"+e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),a.push("webgl max cube map texture size:"+e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)),a.push("webgl max fragment uniform vectors:"+e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)),a.push("webgl max render buffer size:"+e.getParameter(e.MAX_RENDERBUFFER_SIZE)),a.push("webgl max texture image units:"+e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)),a.push("webgl max texture size:"+e.getParameter(e.MAX_TEXTURE_SIZE)),a.push("webgl max varying vectors:"+e.getParameter(e.MAX_VARYING_VECTORS)),a.push("webgl max vertex attribs:"+e.getParameter(e.MAX_VERTEX_ATTRIBS)),a.push("webgl max vertex texture image units:"+e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),a.push("webgl max vertex uniform vectors:"+e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)),a.push("webgl max viewport dims:"+t(e.getParameter(e.MAX_VIEWPORT_DIMS))),a.push("webgl red bits:"+e.getParameter(e.RED_BITS)),a.push("webgl renderer:"+e.getParameter(e.RENDERER)),a.push("webgl shading language version:"+e.getParameter(e.SHADING_LANGUAGE_VERSION)),a.push("webgl stencil bits:"+e.getParameter(e.STENCIL_BITS)),a.push("webgl vendor:"+e.getParameter(e.VENDOR)),a.push("webgl version:"+e.getParameter(e.VERSION));try{var c=e.getExtension("WEBGL_debug_renderer_info");c&&(a.push("webgl unmasked vendor:"+e.getParameter(c.UNMASKED_VENDOR_WEBGL)),a.push("webgl unmasked renderer:"+e.getParameter(c.UNMASKED_RENDERER_WEBGL)))}catch(d){}return e.getShaderPrecisionFormat?(a.push("webgl vertex shader high float precision:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision),a.push("webgl vertex shader high float precision rangeMin:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).rangeMin),a.push("webgl vertex shader high float precision rangeMax:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).rangeMax),a.push("webgl vertex shader medium float precision:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision),a.push("webgl vertex shader medium float precision rangeMin:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).rangeMin),a.push("webgl vertex shader medium float precision rangeMax:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).rangeMax),a.push("webgl vertex shader low float precision:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.LOW_FLOAT).precision),a.push("webgl vertex shader low float precision rangeMin:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.LOW_FLOAT).rangeMin),a.push("webgl vertex shader low float precision rangeMax:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.LOW_FLOAT).rangeMax),a.push("webgl fragment shader high float precision:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision),a.push("webgl fragment shader high float precision rangeMin:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).rangeMin),a.push("webgl fragment shader high float precision rangeMax:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).rangeMax),a.push("webgl fragment shader medium float precision:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision),a.push("webgl fragment shader medium float precision rangeMin:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).rangeMin),a.push("webgl fragment shader medium float precision rangeMax:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).rangeMax),a.push("webgl fragment shader low float precision:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_FLOAT).precision),a.push("webgl fragment shader low float precision rangeMin:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_FLOAT).rangeMin),a.push("webgl fragment shader low float precision rangeMax:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_FLOAT).rangeMax),a.push("webgl vertex shader high int precision:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_INT).precision),a.push("webgl vertex shader high int precision rangeMin:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_INT).rangeMin),a.push("webgl vertex shader high int precision rangeMax:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_INT).rangeMax),a.push("webgl vertex shader medium int precision:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_INT).precision),a.push("webgl vertex shader medium int precision rangeMin:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_INT).rangeMin),a.push("webgl vertex shader medium int precision rangeMax:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_INT).rangeMax),a.push("webgl vertex shader low int precision:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.LOW_INT).precision),a.push("webgl vertex shader low int precision rangeMin:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.LOW_INT).rangeMin),a.push("webgl vertex shader low int precision rangeMax:"+e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.LOW_INT).rangeMax),a.push("webgl fragment shader high int precision:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_INT).precision),a.push("webgl fragment shader high int precision rangeMin:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_INT).rangeMin),a.push("webgl fragment shader high int precision rangeMax:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_INT).rangeMax),a.push("webgl fragment shader medium int precision:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_INT).precision),a.push("webgl fragment shader medium int precision rangeMin:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_INT).rangeMin),a.push("webgl fragment shader medium int precision rangeMax:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_INT).rangeMax),a.push("webgl fragment shader low int precision:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_INT).precision),a.push("webgl fragment shader low int precision rangeMin:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_INT).rangeMin),a.push("webgl fragment shader low int precision rangeMax:"+e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_INT).rangeMax),a.join("~")):a.join("~")},getAdBlock:function(){var e=document.createElement("div");e.innerHTML="&nbsp;",e.className="adsbox";var t=!1;try{document.body.appendChild(e),t=0===document.getElementsByClassName("adsbox")[0].offsetHeight,document.body.removeChild(e)}catch(i){t=!1}return t},getHasLiedLanguages:function(){if("undefined"!=typeof navigator.languages)try{var e=navigator.languages[0].substr(0,2);if(e!==navigator.language.substr(0,2))return!0}catch(t){return!0}return!1},getHasLiedResolution:function(){return screen.width<screen.availWidth||screen.height<screen.availHeight},getHasLiedOs:function(){var e,t=navigator.userAgent.toLowerCase(),i=navigator.oscpu,a=navigator.platform.toLowerCase();e=t.indexOf("windows phone")>=0?"Windows Phone":t.indexOf("win")>=0?"Windows":t.indexOf("android")>=0?"Android":t.indexOf("linux")>=0?"Linux":t.indexOf("iphone")>=0||t.indexOf("ipad")>=0?"iOS":t.indexOf("mac")>=0?"Mac":"Other";var r;if(r="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,r&&"Windows Phone"!==e&&"Android"!==e&&"iOS"!==e&&"Other"!==e)return!0;if("undefined"!=typeof i){if(i=i.toLowerCase(),i.indexOf("win")>=0&&"Windows"!==e&&"Windows Phone"!==e)return!0;if(i.indexOf("linux")>=0&&"Linux"!==e&&"Android"!==e)return!0;if(i.indexOf("mac")>=0&&"Mac"!==e&&"iOS"!==e)return!0;if(0===i.indexOf("win")&&0===i.indexOf("linux")&&i.indexOf("mac")>=0&&"other"!==e)return!0}return a.indexOf("win")>=0&&"Windows"!==e&&"Windows Phone"!==e||((a.indexOf("linux")>=0||a.indexOf("android")>=0||a.indexOf("pike")>=0)&&"Linux"!==e&&"Android"!==e||((a.indexOf("mac")>=0||a.indexOf("ipad")>=0||a.indexOf("ipod")>=0||a.indexOf("iphone")>=0)&&"Mac"!==e&&"iOS"!==e||(0===a.indexOf("win")&&0===a.indexOf("linux")&&a.indexOf("mac")>=0&&"other"!==e||"undefined"==typeof navigator.plugins&&"Windows"!==e&&"Windows Phone"!==e)))},getHasLiedBrowser:function(){var e,t=navigator.userAgent.toLowerCase(),i=navigator.productSub;if(e=t.indexOf("firefox")>=0?"Firefox":t.indexOf("opera")>=0||t.indexOf("opr")>=0?"Opera":t.indexOf("chrome")>=0?"Chrome":t.indexOf("safari")>=0?"Safari":t.indexOf("trident")>=0?"Internet Explorer":"Other",("Chrome"===e||"Safari"===e||"Opera"===e)&&"20030107"!==i)return!0;var a=eval.toString().length;if(37===a&&"Safari"!==e&&"Firefox"!==e&&"Other"!==e)return!0;if(39===a&&"Internet Explorer"!==e&&"Other"!==e)return!0;if(33===a&&"Chrome"!==e&&"Opera"!==e&&"Other"!==e)return!0;var r;try{throw"a"}catch(n){try{n.toSource(),r=!0}catch(o){r=!1}}return!(!r||"Firefox"===e||"Other"===e)},isCanvasSupported:function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},isWebGlSupported:function(){if(!this.isCanvasSupported())return!1;var e,t=document.createElement("canvas");try{e=t.getContext&&(t.getContext("webgl")||t.getContext("experimental-webgl"))}catch(i){e=!1}return!!window.WebGLRenderingContext&&!!e},isIE:function(){return"Microsoft Internet Explorer"===navigator.appName||!("Netscape"!==navigator.appName||!/Trident/.test(navigator.userAgent))},hasSwfObjectLoaded:function(){return"undefined"!=typeof window.swfobject},hasMinFlashInstalled:function(){return swfobject.hasFlashPlayerVersion("9.0.0")},addFlashDivNode:function(){var e=document.createElement("div");e.setAttribute("id",this.options.swfContainerId),document.body.appendChild(e)},loadSwfAndDetectFonts:function(e){var t="___fp_swf_loaded";window[t]=function(t){e(t)};var i=this.options.swfContainerId;this.addFlashDivNode();var a={onReady:t},r={allowScriptAccess:"always",menu:"false"};swfobject.embedSWF(this.options.swfPath,i,"1","1","9.0.0",!1,a,r,{})},getWebglCanvas:function(){var e=document.createElement("canvas"),t=null;try{t=e.getContext("webgl")||e.getContext("experimental-webgl")}catch(i){}return t||(t=null),t},each:function(e,t,i){if(null!==e)if(this.nativeForEach&&e.forEach===this.nativeForEach)e.forEach(t,i);else if(e.length===+e.length){for(var a=0,r=e.length;a<r;a++)if(t.call(i,e[a],a,e)==={})return}else for(var n in e)if(e.hasOwnProperty(n)&&t.call(i,e[n],n,e)==={})return},map:function(e,t,i){var a=[];return null==e?a:this.nativeMap&&e.map===this.nativeMap?e.map(t,i):(this.each(e,function(e,r,n){a[a.length]=t.call(i,e,r,n)}),a)},x64Add:function(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var i=[0,0,0,0];return i[3]+=e[3]+t[3],i[2]+=i[3]>>>16,i[3]&=65535,i[2]+=e[2]+t[2],i[1]+=i[2]>>>16,i[2]&=65535,i[1]+=e[1]+t[1],i[0]+=i[1]>>>16,i[1]&=65535,i[0]+=e[0]+t[0],i[0]&=65535,[i[0]<<16|i[1],i[2]<<16|i[3]]},x64Multiply:function(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var i=[0,0,0,0];return i[3]+=e[3]*t[3],i[2]+=i[3]>>>16,i[3]&=65535,i[2]+=e[2]*t[3],i[1]+=i[2]>>>16,i[2]&=65535,i[2]+=e[3]*t[2],i[1]+=i[2]>>>16,i[2]&=65535,i[1]+=e[1]*t[3],i[0]+=i[1]>>>16,i[1]&=65535,i[1]+=e[2]*t[2],i[0]+=i[1]>>>16,i[1]&=65535,i[1]+=e[3]*t[1],i[0]+=i[1]>>>16,i[1]&=65535,i[0]+=e[0]*t[3]+e[1]*t[2]+e[2]*t[1]+e[3]*t[0],i[0]&=65535,[i[0]<<16|i[1],i[2]<<16|i[3]]},x64Rotl:function(e,t){return t%=64,32===t?[e[1],e[0]]:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t|e[0]>>>32-t]:(t-=32,[e[1]<<t|e[0]>>>32-t,e[0]<<t|e[1]>>>32-t])},x64LeftShift:function(e,t){return t%=64,0===t?e:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t]:[e[1]<<t-32,0]},x64Xor:function(e,t){return[e[0]^t[0],e[1]^t[1]]},x64Fmix:function(e){return e=this.x64Xor(e,[0,e[0]>>>1]),e=this.x64Multiply(e,[4283543511,3981806797]),e=this.x64Xor(e,[0,e[0]>>>1]),e=this.x64Multiply(e,[3301882366,444984403]),e=this.x64Xor(e,[0,e[0]>>>1])},x64hash128:function(e,t){e=e||"",t=t||0;for(var i=e.length%16,a=e.length-i,r=[0,t],n=[0,t],o=[0,0],s=[0,0],l=[2277735313,289559509],h=[1291169091,658871167],u=0;u<a;u+=16)o=[255&e.charCodeAt(u+4)|(255&e.charCodeAt(u+5))<<8|(255&e.charCodeAt(u+6))<<16|(255&e.charCodeAt(u+7))<<24,255&e.charCodeAt(u)|(255&e.charCodeAt(u+1))<<8|(255&e.charCodeAt(u+2))<<16|(255&e.charCodeAt(u+3))<<24],
s=[255&e.charCodeAt(u+12)|(255&e.charCodeAt(u+13))<<8|(255&e.charCodeAt(u+14))<<16|(255&e.charCodeAt(u+15))<<24,255&e.charCodeAt(u+8)|(255&e.charCodeAt(u+9))<<8|(255&e.charCodeAt(u+10))<<16|(255&e.charCodeAt(u+11))<<24],o=this.x64Multiply(o,l),o=this.x64Rotl(o,31),o=this.x64Multiply(o,h),r=this.x64Xor(r,o),r=this.x64Rotl(r,27),r=this.x64Add(r,n),r=this.x64Add(this.x64Multiply(r,[0,5]),[0,1390208809]),s=this.x64Multiply(s,h),s=this.x64Rotl(s,33),s=this.x64Multiply(s,l),n=this.x64Xor(n,s),n=this.x64Rotl(n,31),n=this.x64Add(n,r),n=this.x64Add(this.x64Multiply(n,[0,5]),[0,944331445]);switch(o=[0,0],s=[0,0],i){case 15:s=this.x64Xor(s,this.x64LeftShift([0,e.charCodeAt(u+14)],48));case 14:s=this.x64Xor(s,this.x64LeftShift([0,e.charCodeAt(u+13)],40));case 13:s=this.x64Xor(s,this.x64LeftShift([0,e.charCodeAt(u+12)],32));case 12:s=this.x64Xor(s,this.x64LeftShift([0,e.charCodeAt(u+11)],24));case 11:s=this.x64Xor(s,this.x64LeftShift([0,e.charCodeAt(u+10)],16));case 10:s=this.x64Xor(s,this.x64LeftShift([0,e.charCodeAt(u+9)],8));case 9:s=this.x64Xor(s,[0,e.charCodeAt(u+8)]),s=this.x64Multiply(s,h),s=this.x64Rotl(s,33),s=this.x64Multiply(s,l),n=this.x64Xor(n,s);case 8:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+7)],56));case 7:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+6)],48));case 6:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+5)],40));case 5:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+4)],32));case 4:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+3)],24));case 3:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+2)],16));case 2:o=this.x64Xor(o,this.x64LeftShift([0,e.charCodeAt(u+1)],8));case 1:o=this.x64Xor(o,[0,e.charCodeAt(u)]),o=this.x64Multiply(o,l),o=this.x64Rotl(o,31),o=this.x64Multiply(o,h),r=this.x64Xor(r,o)}return r=this.x64Xor(r,[0,e.length]),n=this.x64Xor(n,[0,e.length]),r=this.x64Add(r,n),n=this.x64Add(n,r),r=this.x64Fmix(r),n=this.x64Fmix(n),r=this.x64Add(r,n),n=this.x64Add(n,r),("00000000"+(r[0]>>>0).toString(16)).slice(-8)+("00000000"+(r[1]>>>0).toString(16)).slice(-8)+("00000000"+(n[0]>>>0).toString(16)).slice(-8)+("00000000"+(n[1]>>>0).toString(16)).slice(-8)}},e.VERSION="1.5.1",e});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * 日志
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util) {
    //是否显示log div
    var showlog_value=false;
    //原始的console对象
    var pre_log=window.console.log;
    //日志类型
    var logType=[];
    //当前显示的日志类型
    var showType;

    var  log = {
        //初始化日志配置 (需要等待wing.js 初始化完成基础属性才能加载)
        init:function (){
            if(__webpack_require__(0).context.debug){
                logType=JSON.parse(window.localStorage.getItem("logType")) || [{name:"日志",value:"info_log"},{name:"事件日志",value:"event_info"}];
                showType=logType[0].value;
                //加载HTML模板
                util.createNode({html:'<script type="text/html" id="logHtml">'+logTemplate+'<\/script>'});
                util.createNode({html:document.getElementById('logHtml').innerHTML});
                //启动log 拖拉
                drag();
                //重写console.log
                window.console.log=new print().log;

                //把日志的工具方法 注册出去 让外部是使用
                util.register("log.addLogType",log.addLogType);
                util.register("log.delLogType",log.delLogType);
                util.register("log.clearLog",log.clearLog);
                //初始化日志类型
                this.initLogType();

            }else{
                //重写console.log （禁止输出）
                window.console.log=function (){};
            }
        },
        //初始化日志类型
        initLogType:function(){
            var  $document=util.$Id("logTypeList");
            if(__webpack_require__(0).context.debug && $document){
                $document.innerHTML="";
                for(var  i=0;i<logType.length;i++){
                    var newNode= util.createNode({parentId:"logTypeList",tagType:"th",html:logType[i].name,title:logType[i].value});
                    newNode.addEventListener("click",function(){
                        if(this.getAttribute("title")!=showType){
                            showType=this.getAttribute("title");
                            util.$Id("logInfo").innerHTML="";
                            //加载缓存日志内容
                            console.log("",showType,true);
                        }
                    },false);
                }

            }
        },
        //添加日志类型
        addLogType:function(name,value){
            logType.push({name:name,value:value});
            window.localStorage.setItem("logType",JSON.stringify(logType));
            log.initLogType();
        },
        //删除日志类型
        delLogType:function(param){
            for(var i=0;i<logType.length;i++){
                if(logType[i].name==param || logType[i].value==param){
                    logType.splice(i,1);
                    window.localStorage.setItem("logType",JSON.stringify(logType));
                    log.initLogType();
                    return;
                }
            }

        },
        //清空日志
        clearLog:function (){
            util.$Id("logInfo").innerHTML="";
            window.localStorage.removeItem(showType);
        }

    }

    //日志 HTML 模板
    var  logTemplate="<style type=\"text/css\">"+
       "#drag {"+
            "position:fixed;"+
            "display:inline-block;"+
            "height:66px;"+
            "width:66px;"+
            "background-color:#fff;"+
            "border:1px solid #000;"+
            "border-radius:50%;      "+
            "-moz-border-radius:50%;     "+
            "-webkit-border-radius:50%;"+
            "text-align:center;"+
            "line-height:66px;"+
            "z-index:100000;"+
            "right: 0px;" +
            "bottom: 0px;"+
            "filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;"+
       "}"+
       "#log{"+
            "position:fixed;"+
            "width:100%;"+
            "top:0px;"+
            "height:100%;"+
            "margin:0;"+
            "padding:0px;"+
            "z-index:999;"+
            "left:0px;"+
            "overflow:auto;"+
            "background-color:black;"+
            "color:green;"+
            "display:none;"+
            "border:5px silver solid;"+
       "}"+
       "#log  *{"+
            "margin:0px;"+
            "padding:0px;"+
       "}"+
       "#log .log_top {"+
            "background-color:skyblue!important;"+
            "width:100%;"+
            "height:40px;"+
            "position:fixed;"+
       "}"+
       "#log   table th{"+
            "line-height:30px;"+
            "text-align:center;"+
            "border:5px silver solid;"+
            "padding:0;"+
            "margin:0px;"+
            "left:0px;"+
            "top:0px;;"+
       " }"+
       " #log   table {"+
            "border-spacing:0px !important;"+
       " }"+
       " #log .info {"+
            "margin-bottom:60px;"+
            "margin-top:40px;"+
            "font-size:18px;"+
       " }"+
        "#log .info  p{" +
        "word-wrap:break-word;"+
        "}"+
       " #log .log_bottom {"+
            "background-color:skyblue!important;"+
            "width:100%;"+
            "height:40px;"+
            "bottom:0px!important;"+
            "position:fixed;"+
       " }"+
       "</style>"+
       " <div id='drag' draggable='true' onclick=\"showlog()\">log</div>"+
       " <div id=\"log\">"+
       "   <div class=\"log_top\">"+
       "    <table width=\"99.7%\"style=\"table-layout:fixed;\" id='logTypeList'></table>"+
       "  </div>"+
       "  <div id=\"logInfo\"class=\"info\"></div>"+
       "  <div class=\"log_bottom\">"+
       "   <table width=\"99.7%\" style=\"table-layout:fixed;\">"+
       "     <th onclick=\"log.clearLog()\">清空日志</th>"+
       "    </table>"+
       "  </div>"+
       " </div>";


    /**
     * 日志记录规则   用此规则覆盖console.log()
     */
    var  logType=[{name:"日志",value:"info_log"},{name:"事件日志",value:"event_info"}]
    function  print () {
        /**
         *
         * @param param  日志内容
         * @param type   日志类型
         * @param isLoad 强制重新加载日志内容
         */

        this.log =function(param,type,isLoad){
            type=type || "info_log";
            var logList=JSON.parse(window.localStorage.getItem(type)) || new  Array();

            var  paramStr=param;
            try{
                switch (typeof param){
                    case "object":paramStr=JSON.stringify(param);break;
                }
            }catch(e){
                pre_log(param);
            }

            if(isLoad!=true){  //强制重新加载 不记录 不输出 日志 （原因是：如果重新写方法加载日志，怕日志丢失或者顺序打乱，所以统一调用同一个方法。）
                logList.push("[<en>"+util.getNowFormatDate()+"</en>]"+paramStr)
                //调用原生console.log
                pre_log(param);
                //保存缓存
                window.localStorage.setItem(type,JSON.stringify(logList));
            }


            //移除超出长度的日志
            var length=logList.length-__webpack_require__(0).context.logSize;
            if(length>0){
                logList.splice(0,length)
            }

            if(!(showType && showType==type)){ //当前显示的日志类型，和需要输出的日志类型不同时   只需要保存，不做日志输出。
                return;
            }

            var logText=util.$Id("logInfo").innerHTML;

            if(logText.length<=0 || isLoad==true){ //日志内容为空时，加载缓存中的日志
                var  logHtml=""
                for(var i =1; i<=__webpack_require__(0).context.logSize;i++){
                    if(logList[logList.length-i]){
                        logHtml+="<p>"+logList[logList.length-i]+"</p>"
                    }else{
                        break;
                    }
                }
                util.$Id("logInfo").innerHTML=logHtml;
            }else{ //追加在日志的最前面
                util.$Id("logInfo").innerHTML="<p>"+logList[logList.length-1]+"</p>"+logText;
            }
        }
    }



    //日志显示和隐藏
    var showlog =  function (){
        showlog_value=!showlog_value;
        if(showlog_value){
            document.getElementById("log").style.display="block";
        }else{
            document.getElementById("log").style.display="none";
        }
    }
    util.register("showlog",showlog);



    //日志div 拖动
    function drag () {
        var flag = false;
        var cur = {
            x:0,
            y:0
        }
        var nx,ny,dx,dy,x,y ;

        function down(){
            flag = true;
            var touch ;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            cur.x = touch.clientX;
            cur.y = touch.clientY;
            dx = div2.offsetLeft;
            dy = div2.offsetTop;
        }

        function move(){
            if(flag){
                var touch ;
                if(event.touches){
                    touch = event.touches[0];
                }else {
                    touch = event;
                }
                nx = touch.clientX - cur.x;
                ny = touch.clientY - cur.y;
                x = dx+nx;
                y = dy+ny;
                div2.style.left = x+"px";
                div2.style.top = y +"px";
                //阻止页面的滑动默认事件
                event.preventDefault();
            }
        }
        //鼠标释放时候的函数
        function end(){
            flag = false;
        }

        //PC  h5拖拉事件
        var div2 = document.getElementById("drag");
        div2.addEventListener("dragstart",function(){
            down();
        },false);
        div2.addEventListener("dragend",function(){
            move();
            end();
        },false);


        //触摸事件 (手机)
        div2.addEventListener("touchstart",function(){
            down();
        },false)

        div2.addEventListener("touchmove",function(){
            move();
        },false)

        div2.addEventListener("touchend",function(){
            end();
        },false);
    }


    //将log事件注册出去
    util.register("log.init", log.init);
    return  log;

}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// require.config({
//     waitSeconds: 0,
//     baseUrl: '/',
//     shim: {
//         'facebook' : {
//             exports: 'FB'
//         }
//     },
//     paths: {
//         util: "util",
//         facebook: '//connect.facebook.net/en_US/sdk'
//     }
// })

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util) {

    //缓存事件最大数量
    var COMMON_EVENT_CACHED_AMOUNT_LIMIT = 20;
    //发送失败重试次数
    var SEND_EVENT_RETRY_AMOUNT_LIMIT = 3;
    //失败重发重试间隔
    var FAIL_RETRY_TIME_INTERVAL = 5 * 60 * 1000;
    //Session事件发送间隔
    var SESSION_EVENT_SEND_TIME_INTERVAL = 5 * 60 * 1000;
    //唯一编号，预防浏览器多开，导致缓存弄混，所有缓存都必须加此前缀
    var UNIQUE_ID = "";

    var DATA_COLLECTION_URL = "http://172.16.100.58/data_collection_qa/data/v3.do";
    var FIRST_LAUNCH_API_URL = "http://172.16.100.53/sdk_bkd_qa/sdkapi/v2/event/install/first_launch.do";
    var QUERY_ORDER_API_URL = "http://172.16.100.53/sdk_bkd_qa/sdkapi/v2/pay/order_list.do";
    var UPDATE_ORDER_API_URL = "http://172.16.100.53/sdk_bkd_qa/sdkapi/v2/pay/clt_status_done.do";

    /**
     * 发往GHW事件缓存事件序号 键值
     * @type {string}
     */
    var CACHE_EVENT_ID_LIST = UNIQUE_ID + "cache_event_id_list";
    /**
     * 缓存事件内容 键值前缀，后接事件序号来保存完整的键值
     *  cache_event_ + jsonObj.eventOrder
     * @type {string}
     */
    var CACHE_EVENT_PREFIX = UNIQUE_ID + "cache_event_";
    /**
     * 事件发送失败尝试次数缓存键值前缀  cache_event_retry_ + jsonObj.eventOrder
     * @type {string}
     */
    var CACHE_EVENT_RETRY_PREFIX = UNIQUE_ID + "cache_event_retry_";
    //单个支付信息的键值为 ghw_payment_info
    var GHW_PAYMENT_INFO_KEY = UNIQUE_ID + "payment_info_";
    //多个支付信息的键值为支付信息的键值为 ghw_payment_order_id_list
    var GHW_PAYMENT_ORDER_ID_LIST = UNIQUE_ID + "payment_order_ids";

    // require('./css/hello.css');
    __webpack_require__(20); //全局引入jsdeferred 其他方式请查看 https://github.com/webpack/webpack.js.org/issues/63

    var data = {};

    /**
     * SDK主动发送事件类型
     */
    data.WA_AUTO_TRACK_EVENT_TYPE = {
        FIRST_LAUNCH: "first_launch",
        GHW_STARTUP : "ghw_startup",
        GHW_LOGIN: "ghw_login",
        GHW_INITIATED_PAYMENT: "ghw_initiated_payment",
        GHW_PAYMENT: "ghw_payment",
        GHW_SESSION: "ghw_session"
    };

    /**
     * 替代setInterval的写法，setInterval某个事件被卡死后会导致用户内存消耗增加的情况
     *
     * @type {Function}
     */
    data.setCorrectingInterval = (function(func, delay) {
        var instance = { };

        function tick(func, delay) {
            if (!instance.started) {
                instance.func = func;
                instance.delay = delay;
                instance.startTime = new Date().valueOf();
                instance.target = delay;
                instance.started = true;

                setTimeout(tick, delay);
            } else {
                var elapsed = new Date().valueOf() - instance.startTime,
                    adjust = instance.target - elapsed;

                instance.func();
                instance.target += instance.delay;

                setTimeout(tick, instance.delay + adjust);
            }
        }

        return tick(func, delay);
    });

    /**
     * 初始化最多尝试次数
     *
     * @type {number}
     */
    var INI_TRY_LIMIT = 30;
    var current_cnt = 0;
    /**
     * 初始化数据收集事件 一般做如下处理：
     * 0. 设置clientId, appId 等初始化信息
     * 1. 检查是否是第一次安装若有发送first_launch 事件及start_up事件
     * 2. 检查事件缓存，若有则发送
     * 3. 发送session事件
     */
    data.init = function() {

        if (current_cnt < INI_TRY_LIMIT) {
            var test = true;
            try {
                // console.log(define.context.clientId)
                if (__webpack_require__(0).context.clientId == null || __webpack_require__(0).context.clientId == ""
                    || __webpack_require__(0).context.appId == null || __webpack_require__(0).context.appId == "") {
                    test = false
                }
            } catch (e) {
                test = false
            }
            console.log("第"+ current_cnt +"次初始化", "event_info");

            if (!test) {
                setTimeout(function () {
                    current_cnt++;
                    data.init()
                }, 3000);
                return false
            }
        } else {
            console.log("数据收集初始化失败", "event_info");
            return false
        }

        //0. 设置初始化信息
        internal.setInitData();
        //1.如果没有缓存，第一次启动立刻发送first_launch事件
        internal.trackFirstLaunchEvent();

        //发送start_up事件, FB无需发送
        var startupEvent = data.WAEvent.builder()
            .setDefaultEventName(data.WA_AUTO_TRACK_EVENT_TYPE.GHW_STARTUP)
            .disableAllChannel();
        data.trackEvent(startupEvent);
        //2.发送缓存事件
        //2.1 发送普通事件
        internal.sendCachedEvent();
        //2.2 发送支付事件（无需发送）

        //3.发送session事件，先立刻触发一次，随后每隔5分钟发送一次
        var sessionEvent = data.WAEvent.builder();
        sessionEvent.setDefaultEventName(data.WA_AUTO_TRACK_EVENT_TYPE.GHW_SESSION);
        internal.sendSessionDataToSdk(JSON.stringify(internal.formatSendToSdkData(sessionEvent, internal.getAndIncreaseSessionEventOrder())));

        data.setCorrectingInterval(function() {
            var sessionEvent = data.WAEvent.builder();
            sessionEvent.setDefaultEventName(data.WA_AUTO_TRACK_EVENT_TYPE.GHW_SESSION);
            internal.sendSessionDataToSdk(JSON.stringify(internal.formatSendToSdkData(sessionEvent, internal.getAndIncreaseSessionEventOrder())))
        }, SESSION_EVENT_SEND_TIME_INTERVAL);

        console.log("数据收集初始化结束", "event_info");
    };

    /**
     * 内部初始化调用
     * 使用方式 data.addThirdPartyTracking(data.WAEvent.TRACKING_CHANNEL.FB)
     *
     * @param channel
     * @returns {data}
     */
    data.addThirdPartyTracking = function(channel) {
        if (internal.DATA_TRACKING_PLATFROM == null) {
            internal.DATA_TRACKING_PLATFROM = []
        }
        internal.DATA_TRACKING_PLATFROM.push(channel);
        return this
    };


    ////////////////////////以下为对CP开放接口//////////////////////////////////////////////////////////////
    /**
     * 发送事件，提供给CP或其他模块调用
     *
     * @param obj -- WA封装事件对象，用于设置context值
     */
    data.trackEvent = function(obj) {
        setTimeout(function () {

            //首先获取需要发送的列表
            var sendThirdPlatformList = internal.getTrackingDataPlatform();

            //获取禁止发送的渠道
            var cpDisablePlatform = obj.getDisableChannels();
            var disableListStr = "";
            if (cpDisablePlatform != null) {
                disableListStr = cpDisablePlatform.join(",")
            }

            if (obj.getDefaultEventName() != data.WA_AUTO_TRACK_EVENT_TYPE.GHW_PAYMENT) {
                var order = internal.getAndIncreaseEventOrder();

                //发送到ghw_sdk后台
                internal.sendDataToSdk(JSON.stringify(internal.formatSendToSdkData(obj, order)));

                //若无需发往第三方平台直接返回
                if (true == obj.getIsDisableAllChannel()) {
                    console.log("该事件不发往第三方平台", "event_info");
                    return true;
                }

                //发送到第三方后台， 如FB \ Appsflyer
                if (null != sendThirdPlatformList) {
                    for (var i in sendThirdPlatformList) {
                        //该事件若是被禁止不发往第三方平台
                        if (disableListStr.indexOf(sendThirdPlatformList[i]) == -1) {
                            internal.sendDataToThirdPlatform(obj, sendThirdPlatformList[i], order)
                        }
                    }
                }
            } else if (obj.getDefaultEventName() == data.WA_AUTO_TRACK_EVENT_TYPE.GHW_PAYMENT) {
                //若无需发往第三方平台直接返回
                if (true == obj.getIsDisableAllChannel()) {
                    console.log("该事件不发往第三方平台", "event_info");
                    return true;
                }
                var orderIds = "";
                var results = [];
                //轮询SDK接口获取未上报事件缓存， 判断是否已登录
                Deferred.next(function() {
                    if (internal.eventInfo.userId != -1 && internal.eventInfo.userId != "") {
                        var queryType = 1;
                        var osign = util.md5(internal.eventInfo.appId + internal.eventInfo.appKey
                            + internal.eventInfo.clientId + internal.eventInfo.sdkVer + queryType + internal.eventInfo.userId);
                        return Deferred.http({
                            url: QUERY_ORDER_API_URL,
                            method: "POST",
                            data:{
                                sdkVer:  internal.eventInfo.sdkVer,
                                clientId : internal.eventInfo.clientId,
                                appId : internal.eventInfo.appId,
                                userId : internal.eventInfo.userId,
                                queryType : queryType,
                                osign :  osign
                            },
                            headers:{"Content-Type":"application/x-www-form-urlencoded"}
                        }).next(function (result) {
                            var retObj = JSON.parse(result.responseText);
                            if (retObj.code * 1 == internal.RESPONSE_STATUS.SUCCESS) {
                                results = retObj.orderIdList;
                                if (results != null && results.length > 0) {
                                    //合并缓存
                                    //单个支付信息的键值为 ghw_payment_info
                                    //多个支付信息的键值为支付信息的键值为 ghw_payment_order_id_list
                                    for (var obj in results) {
                                        var orderId = results[obj].orderId;
                                        orderIds = orderIds + orderId + ",";
                                        internal.writeCache(GHW_PAYMENT_INFO_KEY + orderId, JSON.stringify(results[obj]));
                                        var cached_payment_ids = internal.readCache(GHW_PAYMENT_ORDER_ID_LIST);
                                        if (cached_payment_ids) {
                                            if (cached_payment_ids.indexOf(orderId) >= 0) {
                                                continue;
                                            }
                                        } else {
                                            cached_payment_ids = "";
                                        }
                                        cached_payment_ids = cached_payment_ids + orderId + ",";
                                        internal.writeCache(GHW_PAYMENT_ORDER_ID_LIST, cached_payment_ids);
                                    }
                                }
                            }
                        })
                    } else {
                        return new Deferred();
                    }
                }).next(function() {
                    if (orderIds != "") {
                        //通知SDK后台, 更新状态
                        var osign = util.md5(internal.eventInfo.appId + internal.eventInfo.appKey
                            + internal.eventInfo.clientId + internal.eventInfo.sdkVer + orderIds + internal.eventInfo.userId);
                        Deferred.http.post(UPDATE_ORDER_API_URL, {
                            sdkVer: internal.eventInfo.sdkVer,
                            clientId: internal.eventInfo.clientId,
                            appId: internal.eventInfo.appId,
                            userId: internal.eventInfo.userId,
                            orderIds: orderIds,
                            osign: osign
                        }).next(function (result) {
                            console.log("数据收集更新订单{" + orderIds + "}状态" + result.responseText, "event_info")
                        })
                    }
                    if (null != sendThirdPlatformList) {
                        var cached_payment_ids = internal.readCache(GHW_PAYMENT_ORDER_ID_LIST);

                        if (cached_payment_ids && cached_payment_ids != "") {
                            var payArray = cached_payment_ids.split(",");
                            for (var p in payArray) {
                                if (payArray[p] != null && payArray[p] != "") {
                                    var cached_payment_obj = internal.readCache(GHW_PAYMENT_INFO_KEY + payArray[p]);
                                    if (cached_payment_obj && cached_payment_obj != "") {
                                        var parseData = JSON.parse(cached_payment_obj);

                                        var newObj = data.WAEvent.builder().setDefaultEventName(obj.getDefaultEventName());
                                        newObj.addAllDefaultEventValue(parseData);
                                        newObj.setChannelEventValues(data.WAEvent.TRACKING_CHANNEL.FB, {
                                            defaultAmount: (parseData.defaultAmountMicros / 1000000.0).toFixed(2),
                                            defaultCurrency: parseData.defaultCurrency,
                                            orderId: parseData.orderId
                                        });

                                        //将支付事件发送给所有支持的平台，当前只有FB一个
                                        for (var i in sendThirdPlatformList) {
                                            //某平台被禁止发送支付事件，则不允许发送
                                            if (disableListStr.indexOf(sendThirdPlatformList[i]) == -1) {
                                                internal.sendDataToThirdPlatform(newObj, sendThirdPlatformList[i], payArray[p]);
                                            }
                                        }

                                        //一条一条清除缓存
                                        internal.deleteCache(GHW_PAYMENT_INFO_KEY + payArray[p]);
                                        var remain_cache_payment_ids = internal.readCache(GHW_PAYMENT_ORDER_ID_LIST);
                                        internal.writeCache(GHW_PAYMENT_ORDER_ID_LIST, remain_cache_payment_ids.replace(payArray[p] + ",", ""))
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }, 100);
    };

    /**
     * 设置serverId 由CP调用
     * @param serverId
     */
    data.setServerId = function (serverId) {
        internal.eventInfo.serverId = serverId
    };

    /**
     * 设置GameUserId 由CP调用
     * @param guserId
     */
    data.setGameUserId = function (guserId) {
        internal.eventInfo.gameUserId = guserId
    };

    /**
     * 设置等级由CP调用，CP可能会忘了设置参数
     * @param level
     */
    data.setLevel = function(level) {
        internal.eventInfo.level = level
    };

    /////////////////内部模块调用，设置常用值////////////////////////
    /**
     * 设置userId 登录后调用，不开放
     * @param userId
     */
    data.setUserId = function (userId) {
        internal.eventInfo.userId = userId
    };

    /**
     *
     *   object:
     {
         defaultParams:{defaultEventName:"", defaultValue:数字, defaultEventValues:{}},
         channelParams:{
             channelEventValues: {
                 "facebook": {},
                 "google": {}
             },
             channelEventName: {
                 {
                     "facebook": "",
                     "google": ""
                 }
             },
             channelValue: {
                 "facebook": {
                     "参数名1": {参数值1
                     },
                     "参数名2": {参数值2
                     }
                 },
                 "google": {}
             }
         }
         success:function(succObject),//数据收集成功回调方法，succObject包含成功code与message
         fail:function(failObject) //数据收集失败回调方法, failObject包含失败code与message
         complete:function(compObject)//数据收集完成回调方法，compObject信息待定
     }
     */
    data.WAEvent = {
        WAEvent: function () {
            //默认事件名
            this.defaultEventName = undefined;
            //默认值
            this.defaultValue = undefined;
            //默认事件 名-值的对象
            this.defaultEventValues = {};

            //为渠道-事件名的键值对
            this.channelEventNames = undefined;
            //类似于Map对象，键名为渠道(如FB)，值为事件参数-值的键值对
            this.channelEventValues = undefined;
            //被禁渠道列表
            this.disableChannels = undefined;

            //是否禁止发送所有渠道
            this.isDisabledAllChannel = undefined
        },
        builder: function () {
            return new this.WAEvent()
        },

        /**
         *  CP主动发送事件类型
         */
        WA_EVENT_TYPE : {
            GHW_INITIATED_PURCHASE: "ghw_initiated_purchase",
            GHW_PURCHASE: "ghw_purchase",
            GHW_USER_CREATE: "ghw_user_create",
            GHW_USER_INFO_UPDATE: "ghw_user_info_update",
            GHW_USER_IMPORT: "ghw_user_import",
            GHW_GOLD_UPDATE:  "ghw_gold_update",
            GHW_TASK_UPDATE: "ghw_task_update",
            GHW_LEVEL_ACHIEVED: "ghw_level_achieved",
            GHW_SELF_: "ghw_self_"
        },

        /**
         * 事件参数名称
         */
        WA_EVENT_PARAMETER_NAME : {
            ITEM_NAME: "itemName",
            ITEM_AMOUNT: "itemAmount",
            TASK_ID:  "taskId",
            TASK_NAME: "taskName",
            LEVEL: "level",
            GENDER : "gender",
            NICKNAME : "nickname",
            VIP : "vip",
            STATUS : "status",
            BIND_GAME_GOLD : "bindGameGold",
            GAME_GOLD :"gameGold",
            FIGHTING : "fighting",
            PRICE : "price",
            REGISTER_TIME :"registerTime",
            ROLE_TYPE : "roleType",
            OSIGN: "osign",
            IS_FIRST_ENTER: "isFirstEnter",
            GOLD_TYPE: "goldType",
            APPROACH: "approach",
            AMOUNT: "amount",
            CURRENT_AMOUNT: "currentAmount",
            TASK_TYPE: "taskType",
            TASK_STATUS: " taskStatus",
            SCORE : "score"
        },
        /**
         * 跟踪渠道
         */
        TRACKING_CHANNEL: {
            FB : 'FACEBOOK'
        }
    };

    data.WAEvent.WAEvent.prototype = {
        constructor: data.WAEvent,

        setDefaultEventName: function (val) {
            this.defaultEventName = val;
            return this
        },
        setDefaultValue: function (val) {
            this.defaultValue = val;
            return this
        },
        addDefaultEventValue: function (eventName, val) {
            this.defaultEventValues[eventName] = val;
            return this
        },
        addAllDefaultEventValue: function (obj) {
            if (this.defaultEventValues == null) {
                this.defaultEventValues = {}
            }
            if (obj) {
                for (var i in obj) {
                    this.defaultEventValues[i] = obj[i]
                }
            }
            return this
        },
        setChannelEventName: function (channel, eventName) {
            if (undefined == this.channelEventNames) {
                this.channelEventNames = {}
            }
            this.channelEventNames[channel] = eventName;
            return this
        },
        setChannelEventValues: function (channel, values) {
            if (undefined == this.channelEventValues) {
                this.channelEventValues = {}
            }
            this.channelEventValues[channel] = values;
            return this
        },
        disableChannel : function(channel) {
            if (undefined == this.disableChannels) {
                this.disableChannels = []
            }
            this.disableChannels.push(channel);
            return this
        },
        //禁止所有第三方事件发送
        disableAllChannel : function() {
            this.isDisabledAllChannel = true;
            return this
        },
        getDisableChannels: function () {
            return this.disableChannels
        },
        getDefaultEventName: function () {
            return this.defaultEventName
        },
        getDefaultValue: function () {
            return this.defaultValue
        },
        getDefaultEventValues: function () {
            return this.defaultEventValues
        },
        getChannelEventNames: function () {
            return this.channelEventNames;
        },
        getChannelEventValues: function () {
            return this.channelEventValues;
        },
        getIsDisableAllChannel : function() {
            return this.isDisabledAllChannel
        }
    };

    ///////////////////////////////////////////以下为私有对象不对外开放////////////////////////////////////////////////
    //内部方法对象, 不对外
    var internal = {};

    //数据收集相关属性，发送数据时可从该对象中提取
    internal.eventInfo = {
        startTime: "",
        sdkId: "",
        sdkVer: "",
        sdkType: "",
        os: "",
        osVersion: "",
        runPlatform: "",
        userId: -1,
        gameUserId: "",
        systemVersion: "",
        clientId: "",
        deviceId: "",
        appId: "",
        appVersion: "",
        deviceBrand: "",
        deeplinkType: 0,
        deeplink: "",
        language: "",
        carrier: "",
        wifi: 0,
        deviceName: "",
        deviceType: "",
        model: "",
        processType: "",
        processorFrequency: "",
        processorCount: "",
        graphicsDeviceID: "",
        extInfo: "",
        appKey: "",
        level: "",
        agency: "",
        appSessionId: "",
        sessionId: ""
    };

    /**
     * 接口返回状态
     *
     * @type {{}}
     */
    internal.RESPONSE_STATUS = {
        SUCCESS: 200,
        ERROR: 400
    };

    /**
     * 需要发往第三方数据监控的平台如FB
     * @type {undefined}
     */
    internal.DATA_TRACKING_PLATFROM = null;

    /**
     * 设置初始化信息
     */
    internal.setInitData = function() {
        UNIQUE_ID = "ghw_" + __webpack_require__(0).context.appId + "_";

        CACHE_EVENT_ID_LIST = UNIQUE_ID + "cache_event_id_list";
        CACHE_EVENT_PREFIX = UNIQUE_ID + "cache_event_";
        CACHE_EVENT_RETRY_PREFIX = UNIQUE_ID + "cache_event_retry_";
        GHW_PAYMENT_INFO_KEY = UNIQUE_ID + "payment_info_";
        GHW_PAYMENT_ORDER_ID_LIST = UNIQUE_ID + "payment_order_ids";

        internal.eventInfo.appId = __webpack_require__(0).context.appId;
        internal.eventInfo.appKey = __webpack_require__(0).context.appKey;
        internal.eventInfo.sdkType = __webpack_require__(0).context.sdkType;
        internal.eventInfo.os = __webpack_require__(0).context.os;
        internal.eventInfo.startTime = new Date().getTime();
        internal.eventInfo.clientId = __webpack_require__(0).context.clientId;
        internal.eventInfo.deviceId = __webpack_require__(0).context.clientId;
        internal.eventInfo.sdkVer = "0.0.1" || "";
        internal.eventInfo.language = navigator.systemLanguage?navigator.systemLanguage:navigator.language;
        internal.eventInfo.runPlatform = __webpack_require__(0).context.runPlatform;
        internal.eventInfo.sessionId = util.md5(internal.eventInfo.startTime + internal.eventInfo.appId + internal.eventInfo.deviceId);
        internal.eventInfo.appSessionId = internal.eventInfo.sessionId;

        DATA_COLLECTION_URL = "https://sdk-test1.gamehollywood.com/data_collection_qa/" + "data/v3.do";
        FIRST_LAUNCH_API_URL = "https://sdk-test1.gamehollywood.com/sdk_bkd_qa/sdkapi/" + "v2/event/install/first_launch.do";
        QUERY_ORDER_API_URL = "https://sdk-test1.gamehollywood.com/sdk_bkd_qa/sdkapi/" + "v2/pay/order_list.do";
        UPDATE_ORDER_API_URL = "https://sdk-test1.gamehollywood.com/sdk_bkd_qa/sdkapi/" + "v2/pay/clt_status_done.do";

        var system = util.BroswerUtil.CurrentSystem;
        if (system) {
            for (var a in system) {
                internal.eventInfo.os = (a || internal.eventInfo.os);
                internal.eventInfo.osVersion = system[a]
            }
        }
        internal.eventInfo.deviceType = internal.getPhoneType()
    };

    internal.getOsign = function() {
        return  util.sign(internal.eventInfo.appId + internal.eventInfo.appKey + internal.eventInfo.userId +  internal.eventInfo.serverId +  internal.eventInfo.deviceId)
    };

    /**
     * 读取临时缓存，刷新即消失
     * @param name
     * @returns {*}
     */
    internal.readSessionCache = function(name) {
        var data = util.cookie.read(name);
        if (data) {
            return data
        } else if (window.sessionStorage) {
            return window.sessionStorage.getItem(name)
        }
    };

    /**
     * 写临时缓存
     * @param name
     * @param value
     */
    internal.writeSessionCache = function(name, value) {
        //cookie默认保存 24 * 0.05 = 1.2 小时
        util.cookie.write(name, value, 0.05);
        if (window.sessionStorage) {
            return window.sessionStorage.setItem(name, value)
        }
    };

    /**
     * 删除临时缓存
     * @param name
     */
    internal.deleteSessionCache = function(name) {
        util.cookie.remove(name);
        if (window.sessionStorage) {
            return window.sessionStorage.removeItem(name)
        }
    };

    /**
     * 读取缓存
     * @param name
     */
    internal.readCache = function(name) {
        var data = util.cookie.read(name);
        if (data) {
            return data
        } else if (window.localStorage) {
            return window.localStorage.getItem(name)
        }
    };

    /**
     * 写缓存
     * @param name
     * @param value
     */
    internal.writeCache = function(name, value) {
        util.cookie.write(name, value, 99999);
        if (window.localStorage) {
            return window.localStorage.setItem(name, value)
        }
    };

    /**
     * 删除缓存
     * @param name
     */
    internal.deleteCache = function(name) {
        util.cookie.remove(name);
        if (window.localStorage) {
            return window.localStorage.removeItem(name)
        }
    };

    /**
     * 获取Session事件序号缓存
     */
    internal.getAndIncreaseSessionEventOrder = function() {
        var order = internal.readCache(UNIQUE_ID + "session_event_order");
        if (order == null) {
            order = 0;
        } else {
            order = (order * 1) + 1
        }
        //事件统计次数超过100万次后重新归0
        if (order > 1000000) {
            order = 0
        }
        internal.writeCache(UNIQUE_ID + "session_event_order", order);
        return "h" + order
    };

    /**
     * 获取事件缓存
     */
    internal.getAndIncreaseEventOrder = function() {
        var order = internal.readCache(UNIQUE_ID + "event_order");
        if (order == null) {
            order = 0;
        } else {
            order = (order * 1) + 1
        }
        //事件统计次数超过100万次后重新归0
        if (order > 1000000) {
            order = 0
        }
        internal.writeCache(UNIQUE_ID + "event_order", order);
        return  "n" + order
    };

    /**
     * 发送first_launch事件，发送成功后更新缓存状态
     */
    internal.trackFirstLaunchEvent = function(deleteResendCache) {
        var status_flag = internal.readCache(UNIQUE_ID + "install_flag");
        //若有值说明已发送过first_launch事件，无需再次发送
        if (status_flag) {
            return true
        }

        var FIRST_LAUNCH_FAIL_RETRY_TIME_INTERVAL = 60 * 1000;
        var FIRST_LAUNCH_RESEND_CACHED_KEY = UNIQUE_ID + "first_launch_retry_cnt";
        var FIRST_LAUNCH_OBJ_CACHED_KEY = UNIQUE_ID + "first_launch_obj";
        if (deleteResendCache == undefined) {
            internal.deleteSessionCache(FIRST_LAUNCH_RESEND_CACHED_KEY)
        }

        //读取first_launch缓存, 若有不是第一次发送
        var obj = internal.readCache(FIRST_LAUNCH_OBJ_CACHED_KEY);
        var firstLaunchObj;
        if (obj != null && obj != '') {
            firstLaunchObj = JSON.parse(obj);
        } else {
            firstLaunchObj = {
                sdkId: internal.eventInfo.sdkId,
                sdkVer: internal.eventInfo.sdkVer,
                sdkType: internal.eventInfo.sdkType,
                os: internal.eventInfo.os,
                osVersion: internal.eventInfo.osVersion,
                runPlatform: internal.eventInfo.runPlatform,
                systemVersion : internal.eventInfo.systemVersion,
                clientId: internal.eventInfo.clientId,
                appId: internal.eventInfo.appId,
                appVersion: internal.eventInfo.appVersion,
                deeplinkType: internal.eventInfo.deeplinkType,
                deeplink: internal.eventInfo.deeplink,
                language: internal.eventInfo.language,
                carrier: internal.eventInfo.carrier,
                wifi: internal.eventInfo.wifi,
                deviceName: internal.eventInfo.deviceName,
                deviceType: internal.eventInfo.deviceType,
                model: internal.eventInfo.model,
                extInfo: internal.eventInfo.extInfo,
                channelId: __webpack_require__(0).context.channelId || "",
                campaignId: __webpack_require__(0).context.campaignId || ""
            };
            firstLaunchObj.osign = util.md5(firstLaunchObj.sdkId + firstLaunchObj.sdkVer + firstLaunchObj.sdkType
                + firstLaunchObj.os + firstLaunchObj.osVersion + firstLaunchObj.runPlatform + firstLaunchObj.systemVersion
                + firstLaunchObj.clientId + firstLaunchObj.appId + internal.eventInfo.appKey + firstLaunchObj.appVersion
                + firstLaunchObj.deeplinkType + firstLaunchObj.deeplink + firstLaunchObj.language + firstLaunchObj.carrier
                + firstLaunchObj.wifi + firstLaunchObj.deviceName + firstLaunchObj.deviceType + firstLaunchObj.model
                + firstLaunchObj.channelId + firstLaunchObj.campaignId + firstLaunchObj.extInfo);
        }
        console.log("发送first_launch事件client id: " + firstLaunchObj.clientId, "event_info");

        util.ajax({
            url: FIRST_LAUNCH_API_URL,
            data: firstLaunchObj,
            type: 'POST',
            success: function(response) {
                console.log("事件 [first_launch]返回结果为：" + response, "event_info");
                var needResend = false;
                try {
                    var jsonObj = JSON.parse(response);
                    //发送成功删掉缓存，否则连续尝试三次
                    if (jsonObj.code * 1 == internal.RESPONSE_STATUS.SUCCESS) {
                        internal.deleteSessionCache(FIRST_LAUNCH_RESEND_CACHED_KEY);
                        internal.deleteCache(FIRST_LAUNCH_OBJ_CACHED_KEY);
                        internal.writeCache(UNIQUE_ID + "install_flag", true);
                        //执行成功后立刻返回
                        return true;
                    } else {
                        needResend = true
                    }
                } catch (e) {
                    needResend = true
                }
                var resend_cnt = internal.readSessionCache(FIRST_LAUNCH_RESEND_CACHED_KEY) * 1 || 0;
                if (needResend && (resend_cnt < SEND_EVENT_RETRY_AMOUNT_LIMIT)) {
                    internal.writeSessionCache(FIRST_LAUNCH_RESEND_CACHED_KEY, resend_cnt + 1);
                    setTimeout(function () {
                        internal.trackFirstLaunchEvent(1)
                    }, FIRST_LAUNCH_FAIL_RETRY_TIME_INTERVAL);
                } else {
                    internal.writeCache(FIRST_LAUNCH_OBJ_CACHED_KEY, JSON.stringify(firstLaunchObj));
                }
            },
            error: function(response) {
                console.log("事件 [first_launch]发送失败：" + response, "event_info");
                var resend_cnt = internal.readSessionCache(FIRST_LAUNCH_RESEND_CACHED_KEY) * 1 || 0;
                if (resend_cnt < SEND_EVENT_RETRY_AMOUNT_LIMIT) {
                    internal.writeSessionCache(FIRST_LAUNCH_RESEND_CACHED_KEY, resend_cnt + 1);
                    setTimeout(function () {
                        internal.trackFirstLaunchEvent(1)
                    }, FIRST_LAUNCH_FAIL_RETRY_TIME_INTERVAL);
                } else {
                    internal.writeCache(FIRST_LAUNCH_OBJ_CACHED_KEY, JSON.stringify(firstLaunchObj))
                }
            }
        })
    }

    /**
     * 发送普通事件， 如startUp等事件，事件异步执行，避免阻塞
     */
    internal.sendCachedEvent = function() {
        setTimeout(function() {
            //读取缓存
            console.log("读取未发送事件缓存", "event_info");
            var cache_event_str = internal.readCache(CACHE_EVENT_ID_LIST);
            if (cache_event_str != null && cache_event_str != "") {
                // console.log(cache_event_str)
                var cache_event_array = cache_event_str.split(',');
                for (var i = (cache_event_array.length - 1); i >= 0; i--) {
                    if (cache_event_array[i] != "") {
                        var itemName = CACHE_EVENT_PREFIX + cache_event_array[i];
                        cache_event_str = internal.readCache(itemName);
                        if (cache_event_str) {
                            internal.sendDataToSdk(cache_event_str);
                        } else {
                            //没有对应的可能出问题了
                            //删掉序号列表缓存，需要注意，在“多线程”环境下会导致读取到脏数据的情况
                            var cache_event_str = internal.readCache(CACHE_EVENT_ID_LIST);
                            if (cache_event_str != null) {
                                internal.writeCache(CACHE_EVENT_ID_LIST, cache_event_str.replace("," + cache_event_array[i], ""));
                            }
                        }
                    }
                }
            } else{
                console.log("无事件缓存", "event_info");
            }
        }, 100);
    };

    /**
     * 发送Session事件，遇到失败会重复N次（可配置）间隔N分钟（可配置）
     *
     * @param jsonStrObject
     * @param type
     */
    internal.sendSessionDataToSdk = function(jsonStrObject) {
        var jsonObj = JSON.parse(jsonStrObject);
        console.log("开始发送序号为["+jsonObj.eventOrder+"]的[" + jsonObj.event + "]事件", "event_info");
        console.log("request body: " + jsonStrObject, "event_info");
        Deferred.http({method:"post", url:DATA_COLLECTION_URL, data: jsonStrObject,
            headers:{"Content-Type":"text/plain;charset=UTF-8"}})
            .next(function (result) {
                console.log("事件[" + jsonObj.eventOrder + "] [" +jsonObj.event +"]返回结果为：" + result.responseText, "event_info");

                //删掉重试次数缓存
                var retry_cache_key = CACHE_EVENT_RETRY_PREFIX + jsonObj.eventOrder;
                internal.deleteCache(retry_cache_key)

            }).error(function (e) {
                console.log("事件[" + jsonObj.eventOrder + "] [" +jsonObj.event +"] 发送失败 " + e, "event_info");
                var retry_cache_key = CACHE_EVENT_RETRY_PREFIX + jsonObj.eventOrder;
                var retry_time = internal.readSessionCache(retry_cache_key);
                if (!retry_time || retry_time < SEND_EVENT_RETRY_AMOUNT_LIMIT) {
                    retry_time = (retry_time||0) * 1 + 1;
                    internal.writeSessionCache(retry_cache_key, retry_time);
                    //若尝试次数未到三次，则重试
                    setTimeout(function() {
                        internal.sendSessionDataToSdk(jsonStrObject)
                    }, FAIL_RETRY_TIME_INTERVAL);
                }
            }
        )
    };

    /**
     * 发送事件，遇到失败会重复N次（可配置）间隔N分钟（可配置）
     * 成功删掉所有缓存（若有），否则失败N次若无失败记录，新增发送失败缓存

     * @param jsonStrObject
     */
    internal.sendDataToSdk = function(jsonStrObject) {
        // console.log(jsonStrObject)
        var jsonObj = JSON.parse(jsonStrObject);
        console.log("开始发送序号为["+jsonObj.eventOrder+"]的[" + jsonObj.event + "]事件", "event_info");
        console.log("request body: " + jsonStrObject, "event_info");
        //发送事件缓存对象键值
        var itemName = CACHE_EVENT_PREFIX + jsonObj.eventOrder;

        Deferred.http({method:"post", url:DATA_COLLECTION_URL, data: jsonStrObject,
            headers:{"Content-Type":"text/plain;charset=UTF-8"}})
            .next(function (result) {
                console.log("事件[" + jsonObj.eventOrder + "] [" +jsonObj.event +"]返回结果为：" + result.responseText, "event_info");

                var result = JSON.parse(result.responseText);
                if (result.code * 1 != internal.RESPONSE_STATUS.SUCCESS) {
                    throw Error("INVALIDATE_STATUS", "返回状态不正确")
                }
                //若发送成功，直接删掉缓存
                internal.deleteCache(itemName);

                //删掉序号列表缓存，需要注意，在“多线程”环境下会导致读取到脏数据的情况
                var cache_event_str = internal.readCache(CACHE_EVENT_ID_LIST);
                if (cache_event_str != null) {
                    internal.writeCache(CACHE_EVENT_ID_LIST, cache_event_str.replace("," + jsonObj.eventOrder, ""));
                }

                //删掉重试次数缓存
                var retry_cache_key = CACHE_EVENT_RETRY_PREFIX + jsonObj.eventOrder;
                internal.deleteCache(retry_cache_key);

            }).error(function (e) {
                console.log("事件[" + jsonObj.eventOrder + "] [" +jsonObj.event +"] 发送失败 " + e, "event_info");
                var retry_cache_key = CACHE_EVENT_RETRY_PREFIX + jsonObj.eventOrder;
                var retry_time = internal.readSessionCache(retry_cache_key);
                if (!retry_time || retry_time < SEND_EVENT_RETRY_AMOUNT_LIMIT) {
                    retry_time = (retry_time||0) * 1 + 1;
                    internal.writeSessionCache(retry_cache_key, retry_time);
                    //若尝试次数未到三次，则重试
                    setTimeout(function() {
                        internal.sendDataToSdk(jsonStrObject)
                    }, FAIL_RETRY_TIME_INTERVAL);
                } else {
                    //失败次数超过3次，保存进缓存
                    var cachedObj = internal.readCache(itemName);
                    if (cachedObj) {
                        // 1.有同KEY的缓存（直接结束）
                        return true;
                    } else {
                        // 2.没有同KEY的缓存
                        var cache_event_ids_str = internal.readCache(CACHE_EVENT_ID_LIST) || "";
                        // 2.2缓存数目超过限制
                        if (cache_event_ids_str && cache_event_ids_str.split(",").length >= COMMON_EVENT_CACHED_AMOUNT_LIMIT) {
                            //删掉最老的一堆缓存
                            var array = cache_event_ids_str.split(",");
                            for (var k = 0; k < (array.length - COMMON_EVENT_CACHED_AMOUNT_LIMIT); k++) {
                                console.log("事件缓存过多删掉事件：" + array[k], "event_info");
                                cache_event_ids_str = cache_event_ids_str.replace(array[k] + ",", "");
                                internal.deleteCache(CACHE_EVENT_PREFIX + array[k], jsonStrObject);
                            }
                            internal.writeCache(CACHE_EVENT_ID_LIST, cache_event_ids_str.replace(array[k] + ",", ""));
                        }
                        //写缓存
                        internal.writeCache(CACHE_EVENT_ID_LIST, cache_event_ids_str + jsonObj.eventOrder + "," );
                        internal.writeCache(itemName, jsonStrObject)
                    }
                }
            }
        )
    };

    /**
     * 获取需要发送事件的第三方平台
     */
    internal.getTrackingDataPlatform = function () {
        //当前默认发送FB
        return data.WAEvent.TRACKING_CHANNEL;
    };

    /**
     * 整理上报事件参数
     *
     * @param data
     * @param eventOrder
     * @returns {{}}
     */
    internal.formatSendToSdkData = function (data, eventOrder) {
        var json = {};

        //公共参数
        json.deviceId = internal.eventInfo.deviceId;
        json.event = data.getDefaultEventName();
        json.appId = internal.eventInfo.appId;
        json.value = data.getDefaultValue();
        json.platform = internal.eventInfo.runPlatform;
        json.fingerId = internal.eventInfo.clientId;
        json.userId = internal.eventInfo.userId || -1;
        json.serverId = internal.eventInfo.serverId || "";
        json.gameUserId = internal.eventInfo.gameUserId || "";
        json.deviceId = internal.eventInfo.deviceId;
        json.sdkTime = new Date().getTime();
        json.sdkVersion = internal.eventInfo.sdkVer || "";
        json.sdkType = internal.eventInfo.sdkType;
        json.eventOrder = eventOrder;
        json.sessionId = internal.eventInfo.sessionId;
        json.appSessionId = internal.eventInfo.appSessionId;
        json.siteId = ""

        var context = {};
        try {
            context = internal.event_context_formatter[data.getDefaultEventName()](data)
        } catch (e) {
            console.log("查找不到预定义事件，发送自定义事件：" + data.getDefaultEventName(), "event_info");
            //出错或者是自定义事件
            context = internal.event_context_formatter.ghw_self(data);
        }
        var tzVal = new Date().getTimezoneOffset()/60;
        if (tzVal > 0) {
            context.tz = "+0" + tzVal + "00";
        } else {
            context.tz =  "-0" + Math.abs(tzVal) + "00";
        }

        context.device = internal.eventInfo.device;
        context.deviceType = internal.eventInfo.deviceType;
        context.deviceBrand = internal.eventInfo.deviceBrand;
        context.model = internal.eventInfo.model;
        context.os = internal.eventInfo.os;
        context.osVersion = internal.eventInfo.osVersion;
        context.op = internal.eventInfo.carrier;
        context.resolution = window.screen.height + "*" + window.screen.width;

        json.context = context;

        return json
    };


    /**
     * 各个方法的转换方式
     * @type {{sessionFormat: sessionFormat}}
     */
    internal.event_context_formatter = {
        ghw_startup : function() {
            return {}
        },
        ghw_session : function() {
            var res = {};
            res.startTime = internal.eventInfo.startTime;
            res.nowTime = new Date().getTime();
            res.sessionType = 0;
            return res
        },
        ghw_login: function () {
            return {}
        },
        ghw_initiated_payment: function () {
            return {}
        },
        ghw_initiated_purchase: function () {
            return {}
        },
        ghw_purchase: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_NAME] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_NAME] || "";
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_AMOUNT] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_AMOUNT] || 0;
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.PRICE] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.PRICE] || 0;
            if (internal.eventInfo.level || values[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL] = internal.eventInfo.level || values[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL]
            }
            return res
        },
        ghw_user_create: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME] || "";
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.REGISTER_TIME] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.REGISTER_TIME] || 0;
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.OSIGN] = internal.getOsign();

            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.GENDER]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.GENDER] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.GENDER]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.VIP]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.VIP] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.VIP]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.STATUS]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.STATUS] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.STATUS]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.BIND_GAME_GOLD]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.BIND_GAME_GOLD] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.BIND_GAME_GOLD]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.GAME_GOLD]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.GAME_GOLD] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.GAME_GOLD]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL] || internal.eventInfo.level) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL] || internal.eventInfo.level
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING]
            }
            return res
        },
        ghw_user_info_update: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();

            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.OSIGN] = internal.getOsign();

            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE]
            }
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME]
            }
            return res
        },
        ghw_user_import: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.IS_FIRST_ENTER] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.IS_FIRST_ENTER] || 0;
            return res
        },
        ghw_gold_update: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.GOLD_TYPE] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.GOLD_TYPE];
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.APPROACH] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.APPROACH];
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.AMOUNT] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.AMOUNT]
            if (values[data.WAEvent.WA_EVENT_PARAMETER_NAME.CURRENT_AMOUNT]) {
                res[data.WAEvent.WA_EVENT_PARAMETER_NAME.CURRENT_AMOUNT] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.CURRENT_AMOUNT]
            }
            return res
        },
        ghw_task_update: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_ID] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_ID];
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_NAME] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_NAME];
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_TYPE] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_TYPE];
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_STATUS] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_STATUS];
            return res
        },
        ghw_level_achieved: function (obj) {
            var res = {};
            var values = obj.getDefaultEventValues();
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL]||internal.eventInfo.level;
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.SCORE] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.SCORE];
            res[data.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING] = values[data.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING];
            return res
        },
        ghw_self : function(data) {
            // console.log("发送ghw_self事件", "event_info");
            // console.log(data.getDefaultEventValues(), "event_info");
            var res = {};
            if (data != null) {
                var values = data.getDefaultEventValues();
                if (values != null) {
                    for (var item in values) {
                        res[item] = values[item]
                    }
                }
            }
            return res
        }
    };

    /**
     * 根据渠道发往不同平台
     *
     * @param waEventObj
     * @param platform
     * @param order
     */
    internal.sendDataToThirdPlatform = function (waEventObj, platform, order) {
        switch (platform) {
            case data.WAEvent.TRACKING_CHANNEL.FB: internal.sendDataToFB(waEventObj, order); break;
            default: break;
        }
    };

    /**
     * 发往FB
     *
     * @param waEventObj
     * @param order
     */
    internal.sendDataToFB = function (waEventObj, order) {
        if (wing.fbtrack == null) {
            //没有集成FB数据跟踪模块
            return true
        }

        var fb_event_resend_cached_key = "ghw_fb_send_event_retry_cnt_" + order;

        //判断是否使用CP自定义事件名称
        var eventName = waEventObj.getDefaultEventName();
        var channelEventNameMap = waEventObj.getChannelEventNames();
        if (channelEventNameMap != null) {
            eventName = channelEventNameMap[data.WAEvent.TRACKING_CHANNEL.FB] || waEventObj.getDefaultEventName();
        }
        console.log("发送FACEBOOK ["+eventName+"]事件(对应GHW ["+ waEventObj.getDefaultEventName()+"]事件)", "event_info");
        var sendEventValues = waEventObj.getDefaultEventValues();
        var channelEventValues = waEventObj.getChannelEventValues();
        if (channelEventValues != null) {
            sendEventValues = channelEventValues[data.WAEvent.TRACKING_CHANNEL.FB] || waEventObj.getDefaultEventValues();
        }

        console.log("FB事件发送参数：" + JSON.stringify(sendEventValues), "event_info");

        wing.fbtrack.track(eventName,  waEventObj.getDefaultValue(), sendEventValues,
            function() {
                console.log("FB事件发送完成", "event_info");
                internal.deleteSessionCache(fb_event_resend_cached_key);
                return true;
            },
            function () {
                console.log("FB事件发送失败", "event_info");
                var retryCnt = internal.readSessionCache(fb_event_resend_cached_key) * 1;
                if (retryCnt < SEND_EVENT_RETRY_AMOUNT_LIMIT) {
                    retryCnt = retryCnt + 1;
                    console.log("重发 FB[" + eventName  + "]事件[" + order + "]第" +  retryCnt + "次尝试", "event_info");
                    internal.writeSessionCache(fb_event_resend_cached_key, retryCnt);
                    setTimeout(function () {
                        internal.sendDataToFB(waEventObj, order)
                    }, FAIL_RETRY_TIME_INTERVAL)
                }
                return false
            }
        );
    };

    internal.cloneObj = function(obj){
        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj); //序列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ?
                    internal.cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    };

    internal.getPhoneType = function() {
        //正则,忽略大小写
        var pattern_phone = new RegExp("iphone","i");
        var pattern_android = new RegExp("android","i");
        var userAgent = navigator.userAgent.toLowerCase();
        var isAndroid = pattern_android.test(userAgent);
        var isIphone = pattern_phone.test(userAgent);
        var phoneType="phoneType";
        if(isAndroid){
            var zh_cnIndex = userAgent.indexOf("-");
            var spaceIndex = userAgent.indexOf("build",zh_cnIndex+4);
            var fullResult = userAgent.substring(zh_cnIndex,spaceIndex);
            phoneType=fullResult.split(";")[1];
            if (phoneType) {
                phoneType = phoneType.trim()
            }
        }else if(isIphone){
            phoneType = "iphone";
        }else{
            phoneType = "unknown";
        }
        return phoneType;
    };



    util.register("wing.WAEvent", data.WAEvent);
    util.register("wing.trackEvent", data.trackEvent);
    util.register("wing.setLevel", data.setLevel);
    util.register("wing.setGameUserId", data.setGameUserId);
    util.register("wing.setServerId", data.setServerId);
    //自动初始化
    data.init();
    return data;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(21))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "// JSDeferred 0.4.0 Copyright (c) 2007 cho45 ( www.lowreal.net )\n// See http://github.com/cho45/jsdeferred\nfunction Deferred () { return (this instanceof Deferred) ? this.init() : new Deferred() }\nDeferred.ok = function (x) { return x };\nDeferred.ng = function (x) { throw  x };\nDeferred.prototype = {\n\t\n\t_id : 0xe38286e381ae,\n\n\t\n\tinit : function () {\n\t\tthis._next    = null;\n\t\tthis.callback = {\n\t\t\tok: Deferred.ok,\n\t\t\tng: Deferred.ng\n\t\t};\n\t\treturn this;\n\t},\n\n\t\n\tnext  : function (fun) { return this._post(\"ok\", fun) },\n\n\t\n\terror : function (fun) { return this._post(\"ng\", fun) },\n\n\t\n\tcall  : function (val) { return this._fire(\"ok\", val) },\n\n\t\n\tfail  : function (err) { return this._fire(\"ng\", err) },\n\n\t\n\tcancel : function () {\n\t\t(this.canceller || function () {})();\n\t\treturn this.init();\n\t},\n\n\t_post : function (okng, fun) {\n\t\tthis._next =  new Deferred();\n\t\tthis._next.callback[okng] = fun;\n\t\treturn this._next;\n\t},\n\n\t_fire : function (okng, value) {\n\t\tvar next = \"ok\";\n\t\ttry {\n\t\t\tvalue = this.callback[okng].call(this, value);\n\t\t} catch (e) {\n\t\t\tnext  = \"ng\";\n\t\t\tvalue = e;\n\t\t\tif (Deferred.onerror) Deferred.onerror(e);\n\t\t}\n\t\tif (Deferred.isDeferred(value)) {\n\t\t\tvalue._next = this._next;\n\t\t} else {\n\t\t\tif (this._next) this._next._fire(next, value);\n\t\t}\n\t\treturn this;\n\t}\n};\nDeferred.isDeferred = function (obj) {\n\treturn !!(obj && obj._id === Deferred.prototype._id);\n};\n\nDeferred.next_default = function (fun) {\n\tvar d = new Deferred();\n\tvar id = setTimeout(function () { d.call() }, 0);\n\td.canceller = function () { clearTimeout(id) };\n\tif (fun) d.callback.ok = fun;\n\treturn d;\n};\nDeferred.next_faster_way_readystatechange = ((typeof window === 'object') && (location.protocol == \"http:\") && !window.opera && /\\bMSIE\\b/.test(navigator.userAgent)) && function (fun) {\n\tvar d = new Deferred();\n\tvar t = new Date().getTime();\n\tif (t - arguments.callee._prev_timeout_called < 150) {\n\t\tvar cancel = false;\n\t\tvar script = document.createElement(\"script\");\n\t\tscript.type = \"text/javascript\";\n\t\tscript.src  = \"data:text/javascript,\";\n\t\tscript.onreadystatechange = function () {\n\t\t\tif (!cancel) {\n\t\t\t\td.canceller();\n\t\t\t\td.call();\n\t\t\t}\n\t\t};\n\t\td.canceller = function () {\n\t\t\tif (!cancel) {\n\t\t\t\tcancel = true;\n\t\t\t\tscript.onreadystatechange = null;\n\t\t\t\tdocument.body.removeChild(script);\n\t\t\t}\n\t\t};\n\t\tdocument.body.appendChild(script);\n\t} else {\n\t\targuments.callee._prev_timeout_called = t;\n\t\tvar id = setTimeout(function () { d.call() }, 0);\n\t\td.canceller = function () { clearTimeout(id) };\n\t}\n\tif (fun) d.callback.ok = fun;\n\treturn d;\n};\nDeferred.next_faster_way_Image = ((typeof window === 'object') && (typeof(Image) != \"undefined\") && !window.opera && document.addEventListener) && function (fun) {\n\tvar d = new Deferred();\n\tvar img = new Image();\n\tvar handler = function () {\n\t\td.canceller();\n\t\td.call();\n\t};\n\timg.addEventListener(\"load\", handler, false);\n\timg.addEventListener(\"error\", handler, false);\n\td.canceller = function () {\n\t\timg.removeEventListener(\"load\", handler, false);\n\t\timg.removeEventListener(\"error\", handler, false);\n\t};\n\timg.src = \"data:image/png,\" + Math.random();\n\tif (fun) d.callback.ok = fun;\n\treturn d;\n};\nDeferred.next_tick = (typeof process === 'object' && typeof process.nextTick === 'function') && function (fun) {\n\tvar d = new Deferred();\n\tprocess.nextTick(function() { d.call() });\n\tif (fun) d.callback.ok = fun;\n\treturn d;\n};\nDeferred.next = \n\tDeferred.next_faster_way_readystatechange ||\n\tDeferred.next_faster_way_Image ||\n\tDeferred.next_tick ||\n\tDeferred.next_default;\n\nDeferred.chain = function () {\n\tvar chain = Deferred.next();\n\tfor (var i = 0, len = arguments.length; i < len; i++) (function (obj) {\n\t\tswitch (typeof obj) {\n\t\t\tcase \"function\":\n\t\t\t\tvar name = null;\n\t\t\t\ttry {\n\t\t\t\t\tname = obj.toString().match(/^\\s*function\\s+([^\\s()]+)/)[1];\n\t\t\t\t} catch (e) { }\n\t\t\t\tif (name != \"error\") {\n\t\t\t\t\tchain = chain.next(obj);\n\t\t\t\t} else {\n\t\t\t\t\tchain = chain.error(obj);\n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t\tcase \"object\":\n\t\t\t\tchain = chain.next(function() { return Deferred.parallel(obj) });\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\tthrow \"unknown type in process chains\";\n\t\t}\n\t})(arguments[i]);\n\treturn chain;\n};\n\nDeferred.wait = function (n) {\n\tvar d = new Deferred(), t = new Date();\n\tvar id = setTimeout(function () {\n\t\td.call((new Date()).getTime() - t.getTime());\n\t}, n * 1000);\n\td.canceller = function () { clearTimeout(id) };\n\treturn d;\n};\n\nDeferred.call = function (fun) {\n\tvar args = Array.prototype.slice.call(arguments, 1);\n\treturn Deferred.next(function () {\n\t\treturn fun.apply(this, args);\n\t});\n};\n\nDeferred.parallel = function (dl) {\n\tvar isArray = false;\n\tif (arguments.length > 1) {\n\t\tdl = Array.prototype.slice.call(arguments);\n\t\tisArray = true;\n\t} else if (Array.isArray && Array.isArray(dl) || typeof dl.length == \"number\") {\n\t\tisArray = true;\n\t}\n\tvar ret = new Deferred(), values = {}, num = 0;\n\tfor (var i in dl) if (dl.hasOwnProperty(i)) (function (d, i) {\n\t\tif (typeof d == \"function\") dl[i] = d = Deferred.next(d);\n\t\td.next(function (v) {\n\t\t\tvalues[i] = v;\n\t\t\tif (--num <= 0) {\n\t\t\t\tif (isArray) {\n\t\t\t\t\tvalues.length = dl.length;\n\t\t\t\t\tvalues = Array.prototype.slice.call(values, 0);\n\t\t\t\t}\n\t\t\t\tret.call(values);\n\t\t\t}\n\t\t}).error(function (e) {\n\t\t\tret.fail(e);\n\t\t});\n\t\tnum++;\n\t})(dl[i], i);\n\n\tif (!num) Deferred.next(function () { ret.call() });\n\tret.canceller = function () {\n\t\tfor (var i in dl) if (dl.hasOwnProperty(i)) {\n\t\t\tdl[i].cancel();\n\t\t}\n\t};\n\treturn ret;\n};\n\nDeferred.earlier = function (dl) {\n\tvar isArray = false;\n\tif (arguments.length > 1) {\n\t\tdl = Array.prototype.slice.call(arguments);\n\t\tisArray = true;\n\t} else if (Array.isArray && Array.isArray(dl) || typeof dl.length == \"number\") {\n\t\tisArray = true;\n\t}\n\tvar ret = new Deferred(), values = {}, num = 0;\n\tfor (var i in dl) if (dl.hasOwnProperty(i)) (function (d, i) {\n\t\td.next(function (v) {\n\t\t\tvalues[i] = v;\n\t\t\tif (isArray) {\n\t\t\t\tvalues.length = dl.length;\n\t\t\t\tvalues = Array.prototype.slice.call(values, 0);\n\t\t\t}\n\t\t\tret.call(values);\n\t\t\tret.canceller();\n\t\t}).error(function (e) {\n\t\t\tret.fail(e);\n\t\t});\n\t\tnum++;\n\t})(dl[i], i);\n\n\tif (!num) Deferred.next(function () { ret.call() });\n\tret.canceller = function () {\n\t\tfor (var i in dl) if (dl.hasOwnProperty(i)) {\n\t\t\tdl[i].cancel();\n\t\t}\n\t};\n\treturn ret;\n};\n\n\nDeferred.loop = function (n, fun) {\n\tvar o = {\n\t\tbegin : n.begin || 0,\n\t\tend   : (typeof n.end == \"number\") ? n.end : n - 1,\n\t\tstep  : n.step  || 1,\n\t\tlast  : false,\n\t\tprev  : null\n\t};\n\tvar ret, step = o.step;\n\treturn Deferred.next(function () {\n\t\tfunction _loop (i) {\n\t\t\tif (i <= o.end) {\n\t\t\t\tif ((i + step) > o.end) {\n\t\t\t\t\to.last = true;\n\t\t\t\t\to.step = o.end - i + 1;\n\t\t\t\t}\n\t\t\t\to.prev = ret;\n\t\t\t\tret = fun.call(this, i, o);\n\t\t\t\tif (Deferred.isDeferred(ret)) {\n\t\t\t\t\treturn ret.next(function (r) {\n\t\t\t\t\t\tret = r;\n\t\t\t\t\t\treturn Deferred.call(_loop, i + step);\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\treturn Deferred.call(_loop, i + step);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\treturn ret;\n\t\t\t}\n\t\t}\n\t\treturn (o.begin <= o.end) ? Deferred.call(_loop, o.begin) : null;\n\t});\n};\n\n\nDeferred.repeat = function (n, fun) {\n\tvar i = 0, end = {}, ret = null;\n\treturn Deferred.next(function () {\n\t\tvar t = (new Date()).getTime();\n\t\tdo {\n\t\t\tif (i >= n) return null;\n\t\t\tret = fun(i++);\n\t\t} while ((new Date()).getTime() - t < 20);\n\t\treturn Deferred.call(arguments.callee);\n\t});\n};\n\nDeferred.register = function (name, fun) {\n\tthis.prototype[name] = function () {\n\t\tvar a = arguments;\n\t\treturn this.next(function () {\n\t\t\treturn fun.apply(this, a);\n\t\t});\n\t};\n};\n\nDeferred.register(\"loop\", Deferred.loop);\nDeferred.register(\"wait\", Deferred.wait);\n\nDeferred.connect = function (funo, options) {\n\tvar target, func, obj;\n\tif (typeof arguments[1] == \"string\") {\n\t\ttarget = arguments[0];\n\t\tfunc   = target[arguments[1]];\n\t\tobj    = arguments[2] || {};\n\t} else {\n\t\tfunc   = arguments[0];\n\t\tobj    = arguments[1] || {};\n\t\ttarget = obj.target;\n\t}\n\n\tvar partialArgs       = obj.args ? Array.prototype.slice.call(obj.args, 0) : [];\n\tvar callbackArgIndex  = isFinite(obj.ok) ? obj.ok : obj.args ? obj.args.length : undefined;\n\tvar errorbackArgIndex = obj.ng;\n\n\treturn function () {\n\t\tvar d = new Deferred().next(function (args) {\n\t\t\tvar next = this._next.callback.ok;\n\t\t\tthis._next.callback.ok = function () {\n\t\t\t\treturn next.apply(this, args.args);\n\t\t\t};\n\t\t});\n\n\t\tvar args = partialArgs.concat(Array.prototype.slice.call(arguments, 0));\n\t\tif (!(isFinite(callbackArgIndex) && callbackArgIndex !== null)) {\n\t\t\tcallbackArgIndex = args.length;\n\t\t}\n\t\tvar callback = function () { d.call(new Deferred.Arguments(arguments)) };\n\t\targs.splice(callbackArgIndex, 0, callback);\n\t\tif (isFinite(errorbackArgIndex) && errorbackArgIndex !== null) {\n\t\t\tvar errorback = function () { d.fail(arguments) };\n\t\t\targs.splice(errorbackArgIndex, 0, errorback);\n\t\t}\n\t\tDeferred.next(function () { func.apply(target, args) });\n\t\treturn d;\n\t};\n};\nDeferred.Arguments = function (args) { this.args = Array.prototype.slice.call(args, 0) };\n\nDeferred.retry = function (retryCount, funcDeferred, options) {\n\tif (!options) options = {};\n\n\tvar wait = options.wait || 0;\n\tvar d = new Deferred();\n\tvar retry = function () {\n\t\tvar m = funcDeferred(retryCount);\n\t\tm.\n\t\t\tnext(function (mes) {\n\t\t\t\td.call(mes);\n\t\t\t}).\n\t\t\terror(function (e) {\n\t\t\t\tif (--retryCount <= 0) {\n\t\t\t\t\td.fail(['retry failed', e]);\n\t\t\t\t} else {\n\t\t\t\t\tsetTimeout(retry, wait * 1000);\n\t\t\t\t}\n\t\t\t});\n\t};\n\tsetTimeout(retry, 0);\n\treturn d;\n};\n\nDeferred.methods = [\"parallel\", \"wait\", \"next\", \"call\", \"loop\", \"repeat\", \"chain\"];\nDeferred.define = function (obj, list) {\n\tif (!list) list = Deferred.methods;\n\tif (!obj)  obj  = (function getGlobal () { return this })();\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar n = list[i];\n\t\tobj[n] = Deferred[n];\n\t}\n\treturn Deferred;\n};\n\nthis.Deferred = Deferred;\n\nfunction http (opts) {\n    var d = Deferred();\n\n    var req = null\n    if (window.XMLHttpRequest)  {\n        req =  new XMLHttpRequest();\n    } else if (window.ActiveXObject){\n        req =  new ActiveXObject(\"Microsoft.XMLHTTP\");\n    }\n\n    var convertData = \"\" ;\n    if( typeof opts.data === 'object' ){\n        for(var c in opts.data){\n            convertData += c + \"=\" + opts.data[c] + \"&\";\n        }\n        convertData = convertData.substring(0,convertData.length-1)\n    } else {\n        convertData = opts.data;\n    }\n\n    req.open(opts.method, opts.url, true);\n    if (opts.headers) {\n        for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {\n            req.setRequestHeader(k, opts.headers[k]);\n        }\n    }\n    req.onreadystatechange = function () {\n        if (req.readyState == 4) d.call(req);\n    };\n    req.send(convertData || null);\n    d.xhr = req;\n    return d;\n}\nhttp.get   = function (url)       { return http({method:\"get\",  url:url}) };\nhttp.post  = function (url, data) { return http({method:\"post\", url:url, data:data, headers:{\"Content-Type\":\"application/x-www-form-urlencoded\"}}) };\nhttp.jsonp = function (url, params) {\n    if (!params) params = {};\n\n    var Global = (function () { return this })();\n    var d = Deferred();\n    var cbname = params[\"callback\"];\n    if (!cbname) do {\n        cbname = \"callback\" + String(Math.random()).slice(2);\n    } while (typeof(Global[cbname]) != \"undefined\");\n\n    params[\"callback\"] = cbname;\n\n    url += (url.indexOf(\"?\") == -1) ? \"?\" : \"&\";\n\n    for (var name in params) if (params.hasOwnProperty(name)) {\n        url = url + encodeURIComponent(name) + \"=\" + encodeURIComponent(params[name]) + \"&\";\n    }\n\n    var script = document.createElement('script');\n    script.type    = \"text/javascript\";\n    script.charset = \"utf-8\";\n    script.src     = url;\n    document.body.appendChild(script);\n\n    Global[cbname] = function callback (data) {\n        delete Global[cbname];\n        document.body.removeChild(script);\n        d.call(data);\n    };\n    return d;\n};\n\nfunction xhttp (opts) {\n    var d = Deferred();\n    if (opts.onload)  d = d.next(opts.onload);\n    if (opts.onerror) d = d.error(opts.onerror);\n    opts.onload = function (res) {\n        d.call(res);\n    };\n    opts.onerror = function (res) {\n        d.fail(res);\n    };\n    setTimeout(function () {\n        GM_xmlhttpRequest(opts);\n    }, 0);\n    return d;\n}\nxhttp.get  = function (url)       { return xhttp({method:\"get\",  url:url}) };\nxhttp.post = function (url, data) { return xhttp({method:\"post\", url:url, data:data, headers:{\"Content-Type\":\"application/x-www-form-urlencoded\"}}) };\n\n\n\nDeferred.Deferred = Deferred;\nDeferred.http     = http;\nDeferred.xhttp    = (typeof(GM_xmlhttpRequest) == 'undefined') ? http : xhttp;"

/***/ })
/******/ ]);
});