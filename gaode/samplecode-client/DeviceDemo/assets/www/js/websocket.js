var websocket=window.WebSocket || window.MozWebSocket; 
var isConnected = false;
//处理打开webSocket
function doOpen(){
//  showDiagMsg("infoField","已连接", "infoDialog");
     isConnected = true;
    //3:初始化地图并显示默认位置，发送登入消息
 	//4:每50秒定时刷新 	
 	if(deviceType=='B'){
 		mapArea='mapB';
 		doLoginB(mapArea);
 	}
 	else{
 		mapArea='mapA';
 		doLoginA(mapArea);
 	}					
// 	setInterval(doRefresh(mapArea), 50000);	

}

//处理关闭webSocket
function doClose(){
	//连接断开
	showDiagMsg("infoField","已经断开连接", "infoDialog");
	isConnected = false;
}

//处理webSocket Error
function doError() {
	showDiagMsg("infoField","连接异常!", "infoDialog");
	isConnected = false;
	
}

//处理websockett服务端返回(注意后台返回的message为json字符串)
function doMessage(message){
	var event = $.parseJSON(message.data);
	doReciveEvent(event);
}

//处理发送消息(注意message是javascript Obj对象)
function doSend(message) {
	if (websocket != null) {
		websocket.send(JSON.stringify(message));
	} else {
		showDiagMsg("infoField","您已经掉线，无法与服务器通信!", "infoDialog");
	}
}

//初始话WebSocket
function initWebSocket(wcUrl) {
	if (window.WebSocket) {
//		websocket = new WebSocket(encodeURI('ws://localhost:8080/WebSocket/ly'));
		websocket = new WebSocket(encodeURI(wcUrl));
		websocket.onopen = doOpen;
		websocket.onerror = doError;
		websocket.onclose = doClose;
		websocket.onmessage = doMessage;
	}
	else{
		showDiagMsg("infoField","您的设备不支持webSocket!", "infoDialog");
		
	}
};

