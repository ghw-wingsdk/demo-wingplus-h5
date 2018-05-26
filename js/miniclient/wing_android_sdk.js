var wingAndroid = {
};

wingAndroid.core = {
    // 设置clientId，一旦设置后，WINGSDK的clientid都拿到这个，除非清除了数据
    // 参数 clientId String
    setClientId: function(clientId) {
        h5_android.setClientId(clientId);
    },

    // 设置调试模式
    // 参数：debugMode boolean
    setDebugMode: function(debugMode) {
        h5_android.setDebugMode(debugMode);
    },

    // 设置游戏玩家id
    // 参数：gameUserId String
    setGameUserId: function(gameUserId) {
        h5_android.setGameUserId(gameUserId);
    },

    // 设置服务器id
    // 参数：serverId String
    setServerId: function(serverId) {
        h5_android.setServerId(serverId);
    },

    // 设置玩家等级
    // 参数：level int
    setLevel: function(level) {
        h5_android.setLevel(level);
    },

    // 设置玩家昵称
    // 参数：nickname String
    setNickname: function(nickname) {
        h5_android.setNickname(nickname);
    }
};

var cachedLoginParams;
wingAndroid.user = {
    login: function(params) {
        cachedLoginParams = params;

        if (params.hasOwnProperty('userFlag')) {
            h5_android.setUserFlag(params.userFlag);
        }

        //通过登录选择层，进行登录
        if(typeof params === 'string'){
            h5_android.login(params);
        } else if(typeof params === 'object' && !params.platform ) { //没有明确登录方式，弹出登录选择层
            h5_android.loginUI(params.enableCache ? params.enableCache : false, params.extra ? params.extra : "");
            return;
        } else if(typeof params === 'object' && params.platform ) { //明确登录方式
            h5_android.login(params.platform, params.extra ? params.extra : "");
        } else {
            if(cachedLoginParams.fail) {
                receipt(cachedLoginParams.fail, new message("500","parameter error"));
            }
            return ;
        };
    },

    clearLoginCache() {
        h5_android.clearLoginCache();
    },

    logout: function() {
        h5_android.logout();
    },

     // 设置登录流程
     // 参数：flowType int
     setLoginFlowType: function(flowType) {
         h5_android.setLoginFlowType(flowType);
     },

     setUserInfo: function(params) {
         h5_android.setUserInfo(JSON.stringify(params));
     },

     // 切换账号
     // 参数：params object {platform: String, success: function, fail: function, cancel: function}
     switchAccount: function(params) {
         cachedLoginParams = params;
         //通过登录选择层，进行登录
         if(typeof params === 'string'){
             h5_android.switchAccount(params);
         } else if(typeof params === 'object' && params.platform ) { //明确登录方式
             h5_android.switchAccount(params.platform);
         } else {
             if(cachedLoginParams.fail) {
                 receipt(cachedLoginParams.fail, new message("500","parameter error"));
             }
             return ;
         };
     },

    receipt: function(functionName, value){
        if(functionName &&  typeof functionName == 'function'){
          functionName(value);
        } else {
          console.log("回调方法无法调用")
        }
    },

    message: function(code, msg){
        this.code = code;
        this.msg = msg;
    }
};

var checkPayServiceCallback;
var queryProductsParamsCache;
var payParamsCache;
wingAndroid.pay = {
    isPayServiceAvailable: function(callback) {
        checkPayServiceCallback = callback;
        h5_android.isPayServiceAvailable();
    },

    queryProducts: function(params) {
        queryProductsParamsCache = params;
        h5_android.queryProducts();
    },

    pay: function(params) {
        payParamsCache = params;
        //通过支付选择层，进行登录
        if(typeof params === 'string'){
            h5_android.pay(params, '');
        } else if(typeof params === 'object' && params.productId) { // 参数为对象，且商品id不为空
            h5_android.pay(params.productId, params.extInfo ? params.extInfo : '');
            return;
        } else {
            if(payParamsCache.fail) {
                payParamsCache.fail(function(code, message) {
                    this.code = code;
                    this.message = message;
                });
            }
            return ;
        };
    }

};

wingAndroid.track = {
    trackEvent: function(trackParams) {
        if(trackParams && typeof trackParams === 'object' && trackParams.defaultEventName) {
            var androidTrackParams = {};
//            androidTrackParams.defaultEventName = trackParams.defaultEventName;
//            androidTrackParams.defaultValue = trackParams.defaultValue;
//            androidTrackParams.defaultEventValues = trackParams.defaultEventValues;
//            androidTrackParams.channelSwitchMap = trackParams.channelSwitchs;
//            androidTrackParams.eventNameMap = trackParams.eventNames;
//            androidTrackParams.valueMap = trackParams.values;
//            androidTrackParams.eventValueMap = trackParams.eventValues;

            var channelSwitcher = "{";
            if(trackParams.disableChannels != null && typeof(trackParams.disableChannels) == '[object Array]') {
                trackParams.disableChannels.forEach(function (element, index, array) {
                    if (index > 0)
                        channelSwitcher += ','
                    channelSwitcher += '"' + element + '":false'
                });
            }
            channelSwitcher += "}";

            androidTrackParams.defaultEventName = trackParams.defaultEventName;
            androidTrackParams.defaultValue = trackParams.defaultValue;
            androidTrackParams.defaultEventValues = trackParams.defaultEventValues;
            androidTrackParams.channelSwitchMap = JSON.parse(channelSwitcher);
            androidTrackParams.eventNameMap = trackParams.channelEventNames;
            androidTrackParams.valueMap = trackParams.channelValues;
            androidTrackParams.eventValueMap = trackParams.channelEventValues;
            h5_android.track(JSON.stringify(androidTrackParams));
        } else {
            console.log("Track params data error!");
        }
    }
};

