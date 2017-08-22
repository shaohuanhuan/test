var curLocale=null; 
var map=null;
var marker=null;
var geolocation = new BMap.Geolocation();
//在baiduMap上添加位置节点
 function addMarkToMap(bmapRef,point,markMsg,isEnfersize) {
        if(isEnfersize!=null&&isEnfersize){
        	var icon=new BMap.Icon('./images/zoomin.png',new BMap.Size(20,32)); 
        	marker = new BMap.Marker(point, { icon: icon });
        }
        else{
        	marker = new BMap.Marker(point);
        }        
        bmapRef.addOverlay(marker);
        bmapRef.panTo(point);
        //创建信息窗口
    	var infoWindow1 = new BMap.InfoWindow(markMsg);
    	marker.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
 }
 
 //新建baidu map
 function drawMap(mapCanvasId){
	 map = new BMap.Map(mapCanvasId);
	 map.centerAndZoom(curLocale,14);
	 return map;
 }
 
 //获取设备地理位置
 function getLocation(){
	 geolocation.getCurrentPosition(function(r){
		 if(this.getStatus() == BMAP_STATUS_SUCCESS){
			 curLocale=r.point;			 
		 }
		 else {
			 curLocale = new BMap.Point(116.331398,39.897445);
		 }        
	 },{enableHighAccuracy: true});
	 return curLocale;
 }
 
 //html5 原生获取位置
 function startgps()
 {
	 var gps = navigator.geolocation;
	 if (gps)
	 {
		 gps.getCurrentPosition(showgps,
				 function(error)
				 {
			 alert("Got an error, code: " + error.code + " message: "+ error.message);
				 },
				 {maximumAge: 10000}); // 这里设置超时为10000毫秒，即10秒
	 }
	 else
	 {
		 showgps();
	 }
 }

 function showgps(position)
 {
	 if (position)
	 {
		 var latitude = position.coords.latitude;
		 var longitude = position.coords.longitude;
		 curLocale = new BMap.Point(latitude,longitude);
	 }
	 return curLocale;
 }
 
