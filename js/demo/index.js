/*****************************************common begin*****************************************/
$(function(){
    wingplus.init({
        appId: 'f7f9a9d18da611e5a0be000d3a906774', //测试环境
        appKey: 'CFHF7nQCCaojCX6Sm4eT1GEIWRprimgX', //测试环境
        // appId: '0befcc31aab711e5a22602c85f0429f5', //生产环境
        // appKey: 'GlKO1XOwNYhi8Kc3L2Kd1rOzhITc6VDX', //生产环境
        sdkType: 'html5',
        platform: 'html5',
        debug: true,
        logSize: 10
    });

    $("#bind").click(function (){
        $("#bindModel").show(500);
    });
})
/*****************************************common end*****************************************/

/*****************************************login begin*****************************************/
function login(){
    wingplus.user.login({
        success: function(){
            console.log("登录成功");
            showResult('登录', '登录成功');
        },
        fail: function(){
            console.log("登录失败");
            showResult('登录', '登录失败');
        },
        cancel: function(){
            console.log("登录取消");
            showResult('登录', '登录取消');
        }
    });
}
/*****************************************login end*****************************************/

/*****************************************binds begin*****************************************/
function binds(){
    wingplus.bind.binds({
        success: function(){
            console.log("绑定成功");
            showResult('绑定', '成功');
        },
        fail: function(){
            console.log("失败");
            //showResult('绑定', '绑定失败');
        },
        complete: function(){
            console.log("绑定");
            //showResult('绑定', '绑定');
        }
    });
}
/*****************************************binds end*****************************************/

/*****************************************bind begin*****************************************/
function bind(){
    wingplus.bind.bindModal({
        success: function(){
            console.log("绑定成功");
            showResult('绑定', '绑定成功');
        },
        fail: function(){
            console.log("绑定失败");
            //showResult('绑定', '绑定失败');
        },
        complete: function(){
            console.log("绑定");
            //showResult('绑定', '绑定');
        }
    });
}
/*****************************************bind end*****************************************/


/*****************************************unbind begin*****************************************/
function unbind(){
    wingplus.bind.unbindModal({
        success: function(){
            console.log("解绑成功");
            showResult('解绑', '解绑成功');
        },
        fail: function(){
            console.log("解绑失败");
            //showResult('解绑', '解绑失败');
        },
        complete: function(){
            console.log("解绑");
            //showResult('解绑', '解绑');
        }
    });
}
/*****************************************unbind end*****************************************/

/*****************************************switchAccount begin*****************************************/
function switchAccount(){
    wingplus.bind.switchModal({
        success: function(){
            console.log("切换成功");
            showResult('切换', '切换成功');
        },
        fail: function(){
            console.log("切换失败");
            //showResult('切换', '切换失败');
        },
        complete: function(){
            console.log("切换");
            //showResult('切换', '切换');
        }
    });
}
/*****************************************switchAccount end*****************************************/

/*****************************************selectAccount begin*****************************************/
function selectAccount(){
    wingplus.bind.selectAccountModal({
        success: function(da){
            console.log(da);
            console.log("切换成功11");
            showResult('切换', '切换成功');
        },
        fail: function(){
            console.log("切换失败");
            //showResult('切换', '切换失败');
        },
        complete: function(){
            console.log("切换");
            //showResult('切换', '切换');
        }
    });
}
/*****************************************selectAccount end*****************************************/

/*****************************************pay begin*****************************************/

//获取商品成功回调
function successCB(productsResult){
    console.log("获取商品成功");
    showResult('获取商品', '获取商品成功');
    if(productsResult && productsResult.code == 200 && productsResult.productList.length > 0){

        var productList = productsResult.productList;
        var  html2="";
        for (var i = 0; i<productsResult.productList.length;i++) {
            var  template=document.getElementById("productsTemplate").innerHTML;
            for(x in productList[i]){
                template=template.replace(eval("/("+x+")/gi"), productList[i][x]);
            }
            html2+=template;
        }
        document.getElementById("productsHtml").innerHTML=html2;

    }
}

var productList = [];
//获取商品
function getProducts() {
    $("#goodsModel").removeClass("hide");
    $("#goodsModel").show(500);

    wingplus.pay.isPayServiceAvailable(function(result){
        console.log("---isPayServiceAvailable:---", result);
    })

    wingplus.pay.getProducts({
        success: successCB,
        fail: function(){
            console.log("获取商品失败");
            showResult('获取商品', '获取商品失败');
        },
        cancel: function(){
            console.log("获取商品取消");
            showResult('获取商品', '获取商品取消');
        }
    });
}

//支付
function doPay(productId, productName, channel) {
    wingplus.pay.pay({
        channel: channel,
        productId: productId,
        serverId: '3231',
        gameUserId: '32',
        productName: productName,
        success: function (a) {
            $("#payModel").hide(500);
        }
    });
}
/*****************************************pay end*****************************************/

/*****************************************track begin*****************************************/
$(function(){
    $("#wingplus_track").load('./html/track.html');
})
/*****************************************track end*****************************************/

/*****************************************common begin*****************************************/
$(function(){
    $("#wingplus_common").load('./html/common.html');
})
/*****************************************common end*****************************************/

/*****************************************接口登录 begin*****************************************/
$(function(){
    $("#wingplus_login").load('./html/login.html');
})
/*****************************************接口登录 end*****************************************/

/*****************************************device begin*****************************************/
$(function(){
    $("#wingplus_device").load('./html/device.html');
})
/*****************************************device end*****************************************/
