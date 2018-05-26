/*****************************************track begin*****************************************/
function setVal4Track(){
    $('#data_settings').modal();
}

function track(){
    console.log('---track---');

    //wing begin
    var defalutEventName = $('#wing_default_event_name').text();
    var defaultValue = $('#wing_default_event_value').val();
    if(isNaN(parseFloat(defaultValue))){
        console.warn('---wingplus default event value parse error---', defaultValue);
    }else{
        defaultValue = parseFloat(defaultValue);
    }
    var waEventObj = wingplus.track.WAEvent.builder()
                        .setDefaultEventName(defalutEventName)
                        .setDefaultValue(defaultValue);

    //预定义参数
    var wingParamsList = $("#wing_params tr");
    console.log('wingParamsList:', wingParamsList);
    if(wingParamsList.length > 0){
        var wingParamsValues = {};
        for (var i = wingParamsList.length - 1; i >= 0; i--) {
            waEventObj.addDefaultEventValue($(wingParamsList[i]).find("input[name='eventParamName']").val(),
                $(wingParamsList[i]).find("input[name='eventParamValue']").val())
        }
    }
    //wing end

    //Appsflyer begin
    var afEventName = $('#af_event_name').val();
    if(afEventName){
        waEventObj.setChannelEventName(wingplus.track.WAEvent.TRACKING_CHANNEL.AF, afEventName);
    }

    //渠道统计值
    var afEventValue = $('#af_event_value').val();
    if(isNaN(parseFloat(afEventValue))){
        console.warn('---wingplus default event value parse error---', afEventValue);
    }else{
        afEventValue = parseFloat(afEventValue);
    }
    
    if(afEventValue){
        waEventObj.setChannelValue(wingplus.track.WAEvent.TRACKING_CHANNEL.AF, afEventValue);
    }

    //自定义参数
    var customEventList = $("#af_custom tr");
    console.log('customEventList:', customEventList);
    if(customEventList.length > 0){
        var channelEventValues = {};
        for (var i = customEventList.length - 1; i >= 0; i--) {
            channelEventValues[$(customEventList[i]).find("input[name='eventParamName']").val()] = 
                $(customEventList[i]).find("input[name='eventParamValue']").val();
        }
        waEventObj.setChannelEventValues(wingplus.track.WAEvent.TRACKING_CHANNEL.AF, channelEventValues);
    }
    //Appsflyer end

    //Facebook begin
    var fbEventName = $('#fb_event_name').val();
    if(fbEventName){
        waEventObj.setChannelEventName(wingplus.track.WAEvent.TRACKING_CHANNEL.FB, fbEventName);
    }

    //渠道统计值
    var fbEventValue = $('#fb_event_value').val();
    if(isNaN(parseFloat(fbEventValue))){
        console.warn('---wingplus default event value parse error---', fbEventValue);
    }else{
        fbEventValue = parseFloat(fbEventValue);
    }
    
    if(fbEventValue){
        waEventObj.setChannelValue(wingplus.track.WAEvent.TRACKING_CHANNEL.FB, fbEventValue);
    }

    //自定义参数
    var customEventList = $("#fb_custom tr");
    console.log('customEventList:', customEventList);
    if(customEventList.length > 0){
        var channelEventValues = {};
        for (var i = customEventList.length - 1; i >= 0; i--) {
            channelEventValues[$(customEventList[i]).find("input[name='eventParamName']").val()] = 
                $(customEventList[i]).find("input[name='eventParamValue']").val();
        }
        waEventObj.setChannelEventValues(wingplus.track.WAEvent.TRACKING_CHANNEL.FB, channelEventValues);
    }
    //Facebook end

    console.log("---waEventObj---", JSON.stringify(waEventObj));
    wingplus.track.trackEvent(waEventObj);

    showResult('发送数据', '数据已发送');
}

function showDataSettings4Event(eventName){
    
    ///初始化
    $('#wing_default_event_name').text(eventName);
    $('#wing_default_event_value').val(0);

    // 选取第一个标签页
    $('#myTab a:first').tab('show')
    ///end

    $('#data_settings').modal({backdrop: 'static'}); //backdrop:static时,空白处不关闭.

    //显示模态框之后回调函数
    // $('#data_settings').on('shown.bs.modal', function () {
      console.log('------callback---------');

      switch (eventName){
        case  'ghw_payment': 
            var preParamsJsonObj = {};
            preParamsJsonObj.currencyType = 'USD';
            preParamsJsonObj.virtualCurrency = 'gold';
            preParamsJsonObj.paymentType = 'GOOGLE';
            preParamsJsonObj.IapAmount = 20;
            preParamsJsonObj.iapId = 111111;
            preParamsJsonObj.transaction = 13241893274981237;
            preParamsJsonObj.currencyAmount = 50.234;
            preParamsJsonObj.virtualCoinAmount = 20000;
            preParamsJsonObj.iapName = "item1";
            preParamsJsonObj.level = 120;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_purchase': 
            var preParamsJsonObj = {};
            preParamsJsonObj.itemName = 'item1';
            preParamsJsonObj.price = 50;
            preParamsJsonObj.level = 120;
            preParamsJsonObj.itemAmount = 20;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_level_achieved': 
            var preParamsJsonObj = {};
            preParamsJsonObj.level = 120;
            preParamsJsonObj.score = 234;
            preParamsJsonObj.fighting = 10000;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_user_create': 
            var preParamsJsonObj = {};
            preParamsJsonObj.registerTime = 1525636385971;
            preParamsJsonObj.roleType = 1;
            preParamsJsonObj.status = 1;
            preParamsJsonObj.nickname = 'hero';
            preParamsJsonObj.vip = 8;
            preParamsJsonObj.gameGold = 10000;
            preParamsJsonObj.gender = 0;
            preParamsJsonObj.bindGameGold = 1000000;
            preParamsJsonObj.fighting = 10000;
            preParamsJsonObj.level = 100;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_user_info_update': 
            var preParamsJsonObj = {};
            preParamsJsonObj.nickname = 'hero';
            preParamsJsonObj.vip = 8;
            preParamsJsonObj.roleType = 1;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_task_update': 
            var preParamsJsonObj = {};
            preParamsJsonObj.taskType = '等级任务';
            preParamsJsonObj.taskStatus = 2;
            preParamsJsonObj.taskName = 'Kill bill';
            preParamsJsonObj.taskId = 123;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_gold_update': 
            var preParamsJsonObj = {};
            preParamsJsonObj.approach = '充值';
            preParamsJsonObj.amount = 10000;
            preParamsJsonObj.currencyAmount = 200000;
            preParamsJsonObj.goldType = 1;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        case  'ghw_user_import': 
            var preParamsJsonObj = {};
            preParamsJsonObj.isFirstEnter = 0;
            initPreEventParams("wing_params", preParamsJsonObj);
            break;
        default: 
            break;
      }
    // });

    //清除弹窗原数据, 重置表单数据
    $("#data_settings").on("hidden.bs.modal", function() {
        //wing
        $('#wing_params tbody').html('');

        //appsflyer
        $('#af_custom tbody').html('');
        $('#af_event_name').val('');
        $('#af_event_value').val('');

        //facebook
        $('#fb_custom tbody').html('');
        $('#fb_event_name').val('');
        $('#fb_event_value').val('');
    });

    //显示模态框
    // $('#data_settings').modal('show');
    // $('#data_settings').modal({backdrop: 'static'}); //backdrop:static时,空白处不关闭.
}

//删除一行
function deleteRow(thisObj, tableId){
  var i=thisObj.parentNode.parentNode.rowIndex;
  document.getElementById(tableId).deleteRow(i);

  //如果有id，需要对所有行的id重新赋值，否则可能出现相同的id
}

//初始化事件预定义参数
function initPreEventParams(tableId, paramsJsonObj){
    if(tableId && paramsJsonObj){
        for (var paramName in paramsJsonObj) {
            var predefinedEvent=document.getElementById(tableId).insertRow(0);
            //预定义事件名
            var predefinedEventName=predefinedEvent.insertCell(0);
            var predefinedEventNameObj = document.createElement("a");
            predefinedEventNameObj.setAttribute('name', 'eventParamName');
            predefinedEventNameObj.innerText = paramName;

            var predefinedEventNameObj = document.createElement("input");
            predefinedEventNameObj.setAttribute('class', 'form-control');
            predefinedEventNameObj.setAttribute('name', 'eventParamName');
            predefinedEventNameObj.setAttribute('type', 'text');
            predefinedEventNameObj.setAttribute('disabled', 'disabled');
            predefinedEventNameObj.setAttribute('value', paramName);
            predefinedEventName.appendChild(predefinedEventNameObj);

            //自定义事件值
            var predefinedEventValue=predefinedEvent.insertCell(1);
            var predefinedEventValueObj = document.createElement("input");
            predefinedEventValueObj.setAttribute('class', 'form-control');
            predefinedEventValueObj.setAttribute('name', 'eventParamValue');
            predefinedEventValueObj.setAttribute('type', 'text');
            predefinedEventValueObj.setAttribute('value', paramsJsonObj[paramName]);
            predefinedEventValue.appendChild(predefinedEventValueObj);
        }
    }
}

//动态添加一行
function dynamicAddOneRow(tableId){
    // var rowId = $("#appsflyer_custom >tbody >tr").length;
    // rowId = rowId + 1;

    var customEvent=document.getElementById(tableId).insertRow(0);

    //自定义事件名
    var customEventName=customEvent.insertCell(0);
    var customEventNameObj = document.createElement("input");
    customEventNameObj.setAttribute('class', 'form-control');
    customEventNameObj.setAttribute('name', 'eventParamName');
    //customEventNameObj.setAttribute('id', 'af_custom_event_name'+rowId);
    customEventNameObj.setAttribute('type', 'text');
    customEventNameObj.setAttribute('placeholder', '自定义参数名');
    customEventName.appendChild(customEventNameObj);

    //自定义事件值
    var customEventValue=customEvent.insertCell(1);
    var customEventValueObj = document.createElement("input");
    customEventValueObj.setAttribute('class', 'form-control');
    customEventValueObj.setAttribute('name', 'eventParamValue');
    //customEventValueObj.setAttribute('id', 'af_custom_event_value'+rowId);
    customEventValueObj.setAttribute('type', 'text');
    customEventValueObj.setAttribute('placeholder', '自定义参数值');
    customEventValue.appendChild(customEventValueObj);

    //Delete row
    var del = customEvent.insertCell(2);
    var delObj = document.createElement("button");
    delObj.setAttribute('class', 'btn btn-success');
    delObj.setAttribute('onclick', 'deleteRow(this, "' + tableId + '")');
    delObj.innerHTML = "删除";
    del.appendChild(delObj);
}

/*****************************************track end*****************************************/




