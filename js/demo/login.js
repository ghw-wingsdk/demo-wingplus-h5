function apiLogin(){
    var loginPlatform = $('#login_platform option:selected').val();//选中的值
    console.log("---loginPlatform:---"+loginPlatform);
    if(loginPlatform){
        wingplus.user.login({
            platform: loginPlatform,
            success: function(result){
                showResult('登录成功', '操作结果数据：'+JSON.stringify(result));
            },
            fail: function(result){
                showResult('登录失败', '操作结果数据：'+JSON.stringify(result));
            },
            cancel: function(result){
                showResult('登录取消', '操作结果数据：'+JSON.stringify(result));
            },
        });
    }
}
