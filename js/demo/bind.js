var bind = {

    /*****************************************binds begin*****************************************/
    binds: function(){
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
    },
    /*****************************************binds end*****************************************/

    /*****************************************bind begin*****************************************/
    bind: function(){
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
    },
    /*****************************************bind end*****************************************/


    /*****************************************unbind begin*****************************************/
    unbind: function(){
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
    },
    /*****************************************unbind end*****************************************/

    /*****************************************switchAccount begin*****************************************/
    switchAccount: function(){
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
    },
    /*****************************************switchAccount end*****************************************/

    /*****************************************selectAccount begin*****************************************/
    selectAccount: function(){
        wingplus.bind.selectAccountModal({
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
    /*****************************************selectAccount end*****************************************/


}