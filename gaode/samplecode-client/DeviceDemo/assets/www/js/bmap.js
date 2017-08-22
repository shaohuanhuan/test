var curLocale=null; 
var map=null;
var marker=null;
var geolocation = new BMap.Geolocation();
//��baiduMap�����λ�ýڵ�
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
        //������Ϣ����
    	var infoWindow1 = new BMap.InfoWindow(markMsg);
    	marker.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
 }
 
 //�½�baidu map
 function drawMap(mapCanvasId){
	 map = new BMap.Map(mapCanvasId);
	 map.centerAndZoom(curLocale,14);
	 return map;
 }
 
 //��ȡ�豸����λ��
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
 
 //html5 ԭ����ȡλ��
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
				 {maximumAge: 10000}); // �������ó�ʱΪ10000���룬��10��
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
 
