dojo.require("dijit.layout.ContentPane");
dojo.require("esri.map");
dojo.require("esri.dijit.PopupMobile");
dojo.require("esri.graphic");


	var map;

      function init() {
      	//alert("dojo init");
        var initExtent = new esri.geometry.Extent({"xmin":73.70,"ymin":3.90,"xmax":135.2,"ymax":53.50,"spatialReference":{"wkid":4326}});
       var popupSym = {
        	markerSymbol: new esri.symbol.SimpleMarkerSymbol("circle", 12, null, new dojo.Color([255, 255, 255, 0.25]))
    	};
        popup = new esri.dijit.PopupMobile(popupSym, dojo.create("div"));
        //$(popup).css("z-index",2000);
        // MAP
        //resize the map content section
        $('#mapcontent').height($(window).height()-92);
        
    	map = new esri.Map("map", {
        slider: false,
		infoWindow: popup,
        extent: esri.geometry.geographicToWebMercator(initExtent)
    });
        //Add the topographic layer to the map. View the ArcGIS Online site for services http://arcgisonline/home/search.html?t=content&f=typekeywords:service    
        var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer");
        map.addLayer(basemap);

        dojo.connect(map, 'onLoad', function(theMap) {
          //resize the map when the browser resizes
          dojo.connect(dijit.byId('map'), 'resize', map,map.resize);
          dojo.connect(map.graphics,"onClick",function(evt){
        	  var graphic = evt.graphic;
//	        	if (map.infoWindow.isShowing) {
//		            map.infoWindow.hide();
//		        }
        	 // $("#myheader").attr("data-position","inline");
	        	map.infoWindow.clearFeatures();
				map.infoWindow.setFeatures([graphic]);
				map.infoWindow.show(evt.mapPoint);
          });
          
          /*dojo.connect(map.infoWindow,"onHide",function(evt){
        	  $("#myheader").attr("data-position","fixed");
          });*/
          showMapNote();
         // $.mobile.hidePageLoadingMsg();
        });
        
       /* dojo.connect(map,"onClick",function(evt){
        	alert("mapclick");
        });*/
        
        
    /*    dojo.connect(map.graphics,"onClick",function(evt){
        	var graphic = evt.graphic;
//        	if (map.infoWindow.isShowing) {
//	            map.infoWindow.hide();
//	        }
        	alert("graphic click");
        	map.infoWindow.clearFeatures();
			map.infoWindow.setFeatures([graphic]);
			map.infoWindow.show(evt.mapPoint);
			
        });*/
        
        
      }

      function getGraphics(result){
      	var i,len=result.rows.length,row;
		
			if(len>0){
				if(map&&map.graphics)
					map.graphics.clear();
				
				for(i=0;i<len;i++){
					row=result.rows.item(i);
					
					var entered=convertToMDY(row.entered),updated=row.updated;
					var title=row.title,content=row.details,
					photo=row.photourl;
					if(row.latitude){
						var pt=esri.geometry.geographicToWebMercator(new esri.geometry.Point([row.longitude,row.latitude],new esri.SpatialReference({ wkid:4326 })));
						var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
          				new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          					new dojo.Color([210, 105, 30, 0.5]), 8),
          					new dojo.Color([210, 105, 30, 0.9]));
        
						var attr={"title":title,"content":content,"entered":entered,"updated":updated};

        				/*var infoTemplate = new esri.InfoTemplate("Attributes", "<b>NOTE Name: </b><b>title </b><br/>content<br><img></img><br>entered");*/
						var infoTemplate = new esri.InfoTemplate("日记信息", "<b>标题: </b><b>${title} </b><br/><b>内容: </b>${content}<br><img style='height:200px;width:200px;' src="+photo+"></img><br><b>时间: </b>${entered}");
        				var g=new esri.Graphic(pt,symbol,attr,infoTemplate);
        				
        				dojo.connect(g,"onClick",function(evt){
        					alert("graphic click");	
        					var graphic = evt.graphic;
//        			        	if (map.infoWindow.isShowing) {
//        				            map.infoWindow.hide();
//        				        }
        			        	
        			        	map.infoWindow.clearFeatures();
        						map.infoWindow.setFeatures([graphic]);
        						map.infoWindow.show(evt.mapPoint);
        						
        			        });
        				
        				map.graphics.add(g);
					}
				}
			}
      }
	  
	  
function doMapZoom(value){
    var level = map.getLevel() + value;
    map.setLevel(level);
}

function orientationChanged() {
    if(map){
      resizeMap();
    }
  }
  function resizeMap(){
	  if(map){        
	    $('#map').css("height",screen.height);
	    $('#map').css("width","auto");
	
	    map.reposition();
	    map.resize();
	  }
 }
dojo.addOnLoad(init);
