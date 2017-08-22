var curLocale; 
var map;
var marker;

//在googleMap上添加位置节点
 function addMarkToMap(gmapRef,latlng,markMsg,isEnfersize) {
        if(isEnfersize!=null&&isEnfersize){
        	markMsg+='<h3>'+markMsg+'</h3>';
        }
        marker = new google.maps.Marker({
            position: latlng,
            map: gmapRef,
            title: markMsg
        });
        return marker;
 }
 
 //新建googleMap
 function drawMap(mapCanvasId){
	 var myOptions = {
	            zoom: 10,
	            center: curLocale,
	            mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	 map = new google.maps.Map(document.getElementById(mapCanvasId), myOptions);
     // Add an overlay to the map of current lat/lng
	 return map;
 }
 
 //获取设备地理位置
 function getLocation(){
		var defaultLatLng = new google.maps.LatLng(116.331398,39.897445);  
	    if ( navigator.geolocation ) {
	        function success(pos) {
	            curLocale = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	        }
	        function fail(error) {
	        	curLocale =  defaultLatLng;  
	        }
	        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
	        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
	        return curLocale;
	    } 
	}
 
