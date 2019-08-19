var wingIOS = {};

// Core
var contextCallBack;
wingIOS.core = {
    setDebugMode: function(isDebugMode) {
        var param = {
            method: "setDebugMode",
            parameter: {isDebugMode:isDebugMode},
            callBack: ""
        };
        window.webkit.messageHandlers.WACoreProxy.postMessage(JSON.stringify(param));
    },
    
    setServerId: function(serverId) {
        var param = {
            method: "setServerId",
            parameter: {serverId:serverId},
            callBack: ""
        };
        window.webkit.messageHandlers.WACoreProxy.postMessage(JSON.stringify(param));
    },
    
    setLevel: function(level) {
        var param = {
            method: "setLevel",
            parameter: {level:level},
            callBack: ""
        };
        window.webkit.messageHandlers.WACoreProxy.postMessage(JSON.stringify(param));
    },
    
    setGameUserId: function(gameUserId) {
        var param = {
            method: "setGameUserId",
            parameter: {gameUserId:gameUserId},
            callBack: ""
        };
        window.webkit.messageHandlers.WACoreProxy.postMessage(JSON.stringify(param));
    },
    
    setNickname: function(nickName) {
        var param = {
            method: "setNickName",
            parameter: {nickName:nickName},
            callBack: ""
        };
        window.webkit.messageHandlers.WACoreProxy.postMessage(JSON.stringify(param));
    },
    
    getContext: function(callBack) {
        contextCallBack = callBack;
        
        var param = {
        method: "getContext",
        parameter: {},
        callBack: "contextCallBack"
        };
        window.webkit.messageHandlers.WAPayProxy.postMessage(JSON.stringify(param));
    }
};

// User
var loginObj;
wingIOS.user = {
    setLoginFlowType: function(loginFlowType) {
        param = {
            method: "setLoginFlowType",
            parameter: {loginFlowType:loginFlowType},
            callBack: ""
        };
        window.webkit.messageHandlers.WAUserProxy.postMessage(JSON.stringify(param));
    },
    
    login: function(loginObject) {
        loginObj = loginObject;
        var platform = loginObject.platform;
        var userFlag = loginObject.userFlag;
        
        var param;
        if (platform == null || platform == '' || typeof(platform) == "undefined") {
            var enableCache = loginObject.enableCache;
            
            param = {
                method:"loginUI",
                parameter:{enableCache:enableCache ? enableCache : false,userFlag:userFlag},
                callBack:"loginObj"
            };
        } else {
            var extra = loginObject.extra;
            
            param = {
                method: "login",
                parameter: {platform:platform,extra:extra,userFlag:userFlag},
                callBack: "loginObj"
            };
        }
        window.webkit.messageHandlers.WAUserProxy.postMessage(JSON.stringify(param));
    },
    
    logout: function() {
        var param = {
            method: "logout",
            parameter: {},
            callBack: ""
        };
        window.webkit.messageHandlers.WAUserProxy.postMessage(JSON.stringify(param));
    },
    
    setUserInfo: function(userObject) {
        var param = {
            method: "setUserInfo",
            parameter: userObject,
        };
        window.webkit.messageHandlers.WAUserProxy.postMessage(JSON.stringify(param));
    },
    
    switchAccount: function(loginObject) {
        loginObj = loginObject;
        var platform = loginObject.platform;
        
        var param = {
            method: "switchAccount",
            parameter: {platform:platform},
            callBack: "loginObj"
        };
        window.webkit.messageHandlers.WAUserProxy.postMessage(JSON.stringify(param));
    },
    
    clearLoginCache: function() {
        var param = {
            method: "clearLoginCache",
            parameter: {},
            callBack: ""
        };
        window.webkit.messageHandlers.WAUserProxy.postMessage(JSON.stringify(param));
    }
};

// Pay
var isPayServiceAvailableCallBack;
var queryProductsCallBack;
var payObj;
wingIOS.pay = {
    isPayServiceAvailable: function(callBack) {
        isPayServiceAvailableCallBack = callBack;
        
        var param = {
            method: "isPayServiceAvailable",
            parameter: {},
            callBack: "isPayServiceAvailableCallBack"
        };
        window.webkit.messageHandlers.WAPayProxy.postMessage(JSON.stringify(param));
    },
    
    queryProducts: function(callBack) {
        queryProductsCallBack = callBack;
        
        var param = {
            method: "queryProducts",
            parameter: {},
            callBack: "queryProductsCallBack"
        };
        window.webkit.messageHandlers.WAPayProxy.postMessage(JSON.stringify(param));
    },
    
    pay: function(payObject) {
        payObj = payObject;
        
        var productId = payObject.productId;
        
        var param = {
            method: "pay",
            parameter: {productId:productId},
            callBack: "payObj"
        };
        window.webkit.messageHandlers.WAPayProxy.postMessage(JSON.stringify(param));
    }
};

// Track
wingIOS.track = {
    trackEvent: function(trackObject) {
        var eventName = trackObject.defaultEventName;
        var valueToSum = trackObject.defaultValue;
        var defaultParamValues = trackObject.defaultEventValues;
        var eventNameDict = trackObject.channelEventNames;
        var valueDict = trackObject.channelValues;
        var paramValuesDict = trackObject.channelEventValues;
        var disableChannels = trackObject.disableChannels;
        
        var channelSwitcher = "{";
        if(disableChannels != null && typeof(disableChannels) == '[object Array]') {
            disableChannels.forEach(function (element, index, array) {
                if (index > 0)
                    channelSwitcher += ','
                channelSwitcher += '"' + element + '":false'
            });
        }
        channelSwitcher += "}";
        
        var param = {
            method: "trackEvent",
            parameter: {
                eventName: eventName,
                valueToSum: valueToSum,
                defaultParamValues: defaultParamValues,
                eventNameDict: eventNameDict,
                valueDict: valueDict,
                paramValuesDict: paramValuesDict,
                channelSwitcherDict: JSON.parse(channelSwitcher)
            },
            callBack: ""
        };
        
        window.webkit.messageHandlers.WATrackProxy.postMessage(JSON.stringify(param));
    }
}
