var mapA;
var mapB;
var markArray = new Array();

//清除叠加层
function clearGMapOverlays(mapObj){
	if(mapObj!=null&&mapObj!=undefined){
		mapObj.clearOverlays();
	}	
}

//删除Markers
function clearMarkers() {
    if (markArray) { 
      for (i in markArray) { 
    	  markArray[i].setMap(null);
       }
      markArray.length = 0;
     }
}

//显示提示信息
function showDiagMsg(MsgFieldId,MsgText, diagPageId) {
  $("#"+MsgFieldId).html(MsgText);
  $.mobile.changePage("#"+diagPageId);
}

function doRest(){
	$('#deviceNm').val('');
	$('#devicePin').val('');
}




//定时刷新位置（bmap页面默认开启）
function doRefresh(mapArea){
	if(deviceType=='A'){
		//3.初始化地图并显示A自己所在位置
		mapA=drawMap(mapArea);
		addMarkToMap(mapA,curLocale,deviceNm);
	}
	else if(deviceType=='B'){
		//3.初始化地图并显示B所在位置，等待后端返回组设备位置及目标位置信息
		mapB=drawMap(mapArea);
		var newMarker = addMarkToMap(mapB,curLocale,deviceNm);
		markArray.push(newMarker);
		//2:发送计算组设备位置事件
		var event2 = {
				eventType:3,
				eventObjs:[{
					type:'B',
					deviceGroup:deviceGroup,
					deviceNm:deviceNm,
					id:deviceId
				}]
		};
		doSend(event2);
			
	}

}

//验证成功后，建立http长连接
function initCon(){
	initWebSocket("ws://192.168.0.100:8080/webfin/websocket/ly?id="+deviceId);
}

//接收服务端消息处理
function doReciveEvent(event){
	//设备不存在，客户端断开连接
	if(event.eventType==101){
		showDiagMsg("infoField","设备不存在或设备号密码错!", "infoDialog");
		websocket.close();
	}
	//返回组设备及计算目标位置信息，更新地图
	else if(event.eventType==104||event.eventType==103){
		clearGMapOverlays(mapB); 
		 $.each(event.eventObjs,function(idx,item){
			 var deviceNm = item.deviceNm;
			 //google api
//			 var deviceLocale = new google.maps.LatLng(item.lag,item.lat);
			//baidu api
			 var deviceLocale = new BMap.Point(item.lng,item.lat);
			 var newMarker;
			 if(item.status=='target'){
				 newMarker = addMarkToMap(mapB,deviceLocale,deviceNm,true);
			 }
			 else{
				 newMarker = addMarkToMap(mapB,deviceLocale,deviceNm);
			 }		 
			 markArray.push(newMarker);
		   });
		 alert("有新报修设备或设备离线,地图已更新！");
	}
	
}

//设备登录验证操作
function doLoginVerify(){
	$.ajax({
		type:"post",//请求方式
		async: false,
		url:"http://192.168.0.100:8080/webfin/websocket.action?method=doLoginVerify",//发送请求地址
		data:{//发送给数据库的数据
			deviceNm:$('#deviceNm').val(),
			devicePin:$('#devicePin').val()
		},
		dataType: "json",
		success:function(data){
			//验证不通过
			if(data.status=='notExsit'){
				showDiagMsg("infoField","设备不存在或者帐号密码错误", "infoDialog");			
			}
			//1:验证通过，保存设备信息，			
			else{
				deviceNm=data.deviceNm;
				deviceId=data.id;
				deviceType=data.type;
				deviceGroup=data.deviceGroup;
				//2:初始化websocket连接,
				initCon();
					
			}
			
		},
		error: function (msg) {
			showDiagMsg("infoField","ly.js doLogin Error!"+JSON.stringify(msg), "infoDialog");	
		}		
	});


}

//关闭窗口
function doClose(){
	if(deviceType=='A'){
		doLogOutA();
	}
	if(deviceType=='B'){
		doLogOutB();
	}
}

//B设备下线
function doLogOutB(){
	//1:发送B设备loginout事件
	var event = {
			eventType:7,
			eventObjs:[{
				type:'B',
				deviceNm:deviceNm,
				id:deviceId					
			}]
	};
	doSend(event);
	websocket.close();
	//2.跳回登录页面
	$.mobile.changePage("#login");
}



//B设备登入
function doLoginB(mapArea){
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			curLocale=r.point;	
			//4:跳转到B设备页面
			$.mobile.changePage("#mapPage");
			//刷新地图
//			doRefresh('mapB');
			//1:发送B设备登录及计算组设备位置事件
			var event1 = {
					eventType:2,
					eventObjs:[{
						type:'B',
						deviceNm:deviceNm,
						id:deviceId,
						//google api
//						lng:curLocale.lng(),
//						lat:curLocale.lat(),
						//baidu api
						lng:curLocale.lng+Math.random()*1,
						lat:curLocale.lat+Math.random()*1						
					}]
			};
			//2:发送计算组设备位置事件
			doSend(event1);
			var event2 = {
					eventType:3,
					eventObjs:[{
						type:'B',
						deviceGroup:deviceGroup,
						deviceNm:deviceNm,
						id:deviceId
					}]
			};
			doSend(event2);
			
		}
		else {
			curLocale = new BMap.Point(116.331398,39.897445);
		}        
	},{enableHighAccuracy: true});
	
}
	

//A设备登入
function doLoginA(mapArea){
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			curLocale=r.point;
			//4:跳转到A设备页面
			$.mobile.changePage("#repairPage");
			//刷新地图
			//doRefresh(mapArea);			
			//1:发送A设备登入事件
			var event = {
					eventType:1,
					eventObjs:[{
						type:'A',
						deviceNm:deviceNm,
						id:deviceId,
//						//google api
//						lng:curLocale.lng(),
//						lat:curLocale.lat(),
//						//baidu api
						lng:curLocale.lng+Math.random()*1,
						lat:curLocale.lat+Math.random()*1
					}]
			};
			doSend(event);
			
			
		}
		else {
			curLocale = new BMap.Point(116.331398,39.897445);
		}        
	},{enableHighAccuracy: true});
	

}

//A设备保修
function doRepair(){
	//1：获取当前位置
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			curLocale=r.point;	
			//2:发送A设备update事件
			var event = {
					eventType:8,
					eventObjs:[{
						type:'A',
						deviceNm:deviceNm,
						id:deviceId,
						deviceGroup:deviceGroup,
						//google api
//						lng:curLocale.lng(),
//						lat:curLocale.lat(),
						//baidu api
						lng:curLocale.lng+Math.random()*1,
						lat:curLocale.lat+Math.random()*1,
						status:'repair'					
					}]
			};
			doSend(event);
			//3.显示diag提示
			showDiagMsg("infoField","已报修成功！!", "infoDialog");
		}
		else {
			curLocale = new BMap.Point(116.331398,39.897445);
		}        
	},{enableHighAccuracy: true});

}

//A设备下线
function doLogOutA(){
	//1:发送A设备loginout事件
	var event = {
			eventType:6,
			eventObjs:[{
				type:'A',
				deviceNm:deviceNm,
				id:deviceId,
				status:'offline'
			}]
	};
	doSend(event);
	//3.跳回登录页面
	$.mobile.changePage("#login");
	websocket.close();
}