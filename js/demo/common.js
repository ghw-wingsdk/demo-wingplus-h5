/*****************************************common begin*****************************************/
function setServerId(){
    var serverId = $('#server_id').val();

    if(serverId){
        wingplus.core.setServerId(serverId);
        showResult('操作结果', 'Server Id已设置');
    }else{
        showResult('温馨提示', 'Server Id不能为空');
        return;
    }
}

function setGameUserId(){
    var gameUserId = $('#game_user_id').val();
    if(gameUserId){
        wingplus.core.setGameUserId(gameUserId);
        showResult('操作结果', 'Game User Id已设置');
    }else{
        showResult('温馨提示', 'Game User Id不能为空');
        return;
    }
}

function setLevel(){
    var level = $('#level').val();
    if(level){
        wingplus.core.setLevel(level);
        showResult('操作结果', 'Level已设置');
    }else{
        showResult('温馨提示', 'Level不能为空');
        return;
    }
}

function setNickname(){
    var nickname = $('#nickname').val();
    if(nickname){
        wingplus.core.setNickname(nickname);
        showResult('操作结果', 'Nickname已设置');
    }else{
        showResult('温馨提示', 'Nickname不能为空');
        return;
    }
}

function setLoginFlowType(){
    var loginFlowType = $('#lgoin_flow_type').is(':checked');
    if(loginFlowType){
        wingplus.user.setLoginFlowType(1);
        showResult('操作结果', 'Login Flow Type已设置为1');
    }else{
        wingplus.user.setLoginFlowType(2);
        showResult('操作结果', 'Login Flow Type已设置为2');
    }
}

function setDebugMode(){
    var debugMode = $('#debug_mode').is(':checked');
    wingplus.core.setDebugMode(debugMode);

    showResult('操作结果', 'DebugMode已设置为'+debugMode);
}
/*****************************************common end*****************************************/




