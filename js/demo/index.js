/*****************************************common begin*****************************************/
$(function(){
    $('.selectpicker').selectpicker({});

    wingplus.init({
        // appId: 'testLogin', //测试环境
        // appKey: 'abc', //测试环境
        // appId: 'f7f9a9d18da611e5a0be000d3a906774', //测试环境
        // appKey: 'CFHF7nQCCaojCX6Sm4eT1GEIWRprimgX', //测试环境
        appId: wingAppId, //测试环境
        appKey: wingAppKey, //测试环境
        // appId: '0befcc31aab711e5a22602c85f0429f5', //生产环境
        // appKey: 'GlKO1XOwNYhi8Kc3L2Kd1rOzhITc6VDX', //生产环境
        sdkType: 'html5',
        // platform: 'html5',
        debug: true,
        logSize: 10
    });

 
    $("#bind").click(function (){
        $("#bindModel").show(500);
    });

    if(checkCG()){
        //CG平台不应该显示接口登录
        $("#api_login").hide();
        //直接登录
        login();
    }else if(checkFBCanvas()){
        //Facebook canvas平台不显示登录选项
        $("#login_ui").hide();
        $("#api_login").hide();
        //直接登录
        login();
    }else if(checkArmorgames()){
        //Armorgames平台不显示登录选项
        $("#login_ui").hide();
        $("#api_login").hide();
        //直接登录
        login();
    }else if(checkKongregate()){
        $("#login_ui").hide();
        $("#api_login").hide();
        //直接登录
        login();
    }else if(checkY8()){
        $("#login_ui").hide();
        $("#api_login").hide();
        //直接登录
        login();
    }else if(checkMiracleGames()){
        $("#login_ui").hide();
        $("#api_login").hide();
        //直接登录
        login();
    }else if(checkR2Games()){
        
        $("#login_ui").hide();
        $("#api_login").hide();
        //直接登录
        login();
    }

    // setTimeout(() => {
    //     login();
    // }, 5000);
    

})
/*****************************************common end*****************************************/

/*****************************************login begin*****************************************/
function login(){
    wingplus.user.login({
        // platform: 'FACEBOOK',
        // FB:true,
        success: function(result){
            console.log("登录成功",result);
            showResult('登录', '登录成功');
        },
        fail: function(result){
            console.log("登录失败",result);
            showResult('登录', '登录失败');
        },
        cancel: function(result){
            console.log("登录取消",result);
            showResult('登录', '登录取消');
        }
    });
}
/*****************************************login end*****************************************/

/*****************************************pay begin*****************************************/
$(function(){
    $("#wingplus_pay").load('./html/pay.html');
})
/*****************************************pay end*****************************************/

/*****************************************bind begin*****************************************/
$(function(){
    $("#wingplus_bind").load('./html/bind.html');
})
/*****************************************bind end*****************************************/


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

/*****************************************logout begin*****************************************/
function logout(){
    wingplus.user.logout();
    console.log("登出成功");
    showResult('登出', '登出成功');
}
/*****************************************logout end*****************************************/