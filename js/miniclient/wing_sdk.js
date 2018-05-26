var WING_OS_ANDROID = "Android";
var WING_OS_IOS = "IOS";
var WING_OS_OTHER = "Other";

var wingOS;
if(/android/i.test(navigator.userAgent)) {
    wingOS = WING_OS_ANDROID;
} else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    wingOS = WING_OS_IOS;
} else {
    wingOS = WING_OS_OTHER;
}

if (wingOS.match(WING_OS_ANDROID)) {
    document.write("<script language=javascript src='wing_android_sdk.js'></script>");
} else if (wingOS.match(WING_OS_IOS)) {
    document.write("<script language=javascript src='wing_ios_sdk.js'></script>");
} else {
    //document.write("<script language=javascript src='pc.js'></script>");
}

var wing = {};

// Core
wing.core = {
    setDebugMode: function(isDebugMode) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.core.setDebugMode(isDebugMode);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.core.setDebugMode(isDebugMode);
        }
    },
    
    setServerId: function(serverId) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.core.setServerId(serverId);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.core.setServerId(serverId);
        }
    },
    
    setLevel: function(level) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.core.setLevel(level);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.core.setLevel(level);
        }
    },
    
    setGameUserId: function(gameUserId) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.core.setGameUserId(gameUserId);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.core.setGameUserId(gameUserId);
        }
    },
    
    setNickname: function(nickname) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.core.setNickname(nickname);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.core.setNickname(nickname);
        }
    },
    
    getOS: function() {
        return wingOS;
    }
};

// User
wing.user = {
    setLoginFlowType: function(loginFlowType) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.user.setLoginFlowType(loginFlowType);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.user.setLoginFlowType(loginFlowType);
        }
    },
    
    login: function(params) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.user.login(params);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.user.login(params);
        }
    },
    
    logout: function() {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.user.logout();
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.user.logout();
        }
    },
    
    setUserInfo: function(params) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.user.setUserInfo(params);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.user.setUserInfo(params);
        }
    },
    
    switchAccount: function(params) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.user.switchAccount(params);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.user.switchAccount(params);
        }
    },
    
    clearLoginCache: function() {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.user.clearLoginCache();
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.user.clearLoginCache();
        }
    }
};

// Pay
wing.pay = {
    isPayServiceAvailable: function(callBack) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.pay.isPayServiceAvailable(callBack);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.pay.isPayServiceAvailable(callBack);
        }
    },
    
    queryProducts: function(callBack) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.pay.queryProducts(callBack);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.pay.queryProducts(callBack);
        }
    },
    
    pay: function(params) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.pay.pay(params);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.pay.pay(params);
        }
    }
};

// Track
wing.track = {
    trackEvent: function(trackObject) {
        if (wingOS.match(WING_OS_ANDROID)) {
            wingAndroid.track.trackEvent(trackObject);
        } else if (wingOS.match(WING_OS_IOS)) {
            wingIOS.track.trackEvent(trackObject);
        }
    }
};
