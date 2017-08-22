
/*websocket--start*/
var webSocket={
    updateUrl:function(urlPath){
    	var url='';
        if (window.location.protocol == 'http:') {  
            url = 'ws://' + window.location.host + urlPath;  
        } else {  
            url = 'wss://' + window.location.host + urlPath;  
        }  
        return url;
    },
    echo:function(){
    	if (ws != null) {  
            ws.send('send');  
        } else {  
            alert(ws+'connection not established, please connect.');  
        }  
    },
    disconnect:function(ws){
    	if (ws != null) {  
            ws.close();  
            ws = null;  
        }  
    }
}
 
function jsonToData(jsond,flag){
	 var d=jsond.data;
	 var ponitMap={},pvalue=new Array();
	 if(!d){
		 return '';
	 }else{
		 for(var i=0;i<d.length;i++){
			 
   		 var arr=[+d[i]._location.split(',')[0],+d[i]._location.split(',')[1]];
   		 ponitMap[d[i]._name]=arr;
   		 
   		 var obj={};
   		 obj.name=d[i]._name;
   		 obj.value='';
   		 pvalue.push(obj);
   	 }
	   	 if(flag){
	   		 return ponitMap; 
	   	 }else{
	   		 return pvalue;
	   	 }
	 }
	 
	 
}
function setWH(classname){
	 var top=window.pageYOffset  //用于FF
           || document.documentElement.scrollTop  
           || document.body.scrollTop  
           || 0;
   !classname?classname='.main':classname;
	 $(classname).css({'height':parseInt(window.screen.height),'width':document.body.clientWidth})
}
/*websocket--end*/

Date.prototype.yyyymmdd = function() {
    var date = this;
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

Date.prototype.ymdhms = function(chinese) {
    var date = this;
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
    var h = date.getHours().toString(), //获取系统时，
        m = date.getMinutes().toString(), //分
        s = date.getSeconds().toString(); //秒
    var arr=[];
    if(chinese){
      arr = ['年','月','日'];
    }else{
      arr = ['-','-',''];
    }
    return yyyy + arr[0] + (mm[1]?mm:"0"+mm[0]) + arr[1] + (dd[1]?dd:"0"+dd[0])+ arr[2] +'  '+(h[1]?h:"0"+h[0])+':'+(m[1]?m:"0"+m[0])+':'+(s[1]?s:"0"+s[0]);
};
//HH:MM:SS-->HH+百分制分
function timetoNum(hms){
  var h = hms.split(':')[0],ms = hms.split(':')[1]/60*100;
      ms = ms < 10?'0'+ ms:ms;
      return h + '' + ms;
}
//yyyy-mm-dd -->数字
function datetoNum(ymd){
      return ymd.split('-').join('');
}
function getToWeekDay(selectTime){
  var d=new Date(Date.parse(selectTime));
  var dayOfWeek = d.getDay();
  d.setDate(d.getDate() + 7-dayOfWeek);
  var month=d.getMonth()+1;
  var toWeekDay = d.getFullYear()+"-"+month+"-"+d.getDate();
  return toWeekDay;
}


function getFromWeekDay(selectTime){
  var d=new Date(Date.parse(selectTime));
  var dayOfWeek = d.getDay();
  d.setDate(d.getDate() - dayOfWeek+1);
  var month=d.getMonth()+1;
  var fromWeekDay = d.getFullYear()+"-"+month+"-"+d.getDate();
  return fromWeekDay;
}
//关闭iframe
function closeIframe(p){
   $(p.body).find('#dlg-box').parents('.panel').hide();
   $(p.body).find('.window-mask').hide();
   $(p.body).find(".window-shadow").remove();
}
//地图自定义图标
function defOverlay(point, type,id){
      this._point = point;
      this._type = type;
      this._id = id;
    }
function overProp(mp){

    defOverlay.prototype = new BMap.Overlay();
    defOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.className = 'warn-img-item';
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);

      if(this._type === 't0'){
        src = ['/view/img/warn-red1.svg','/view/img/warn-red2.svg'];
      }else{
        src = ['/view/img/warn-yell1.svg','/view/img/warn-yell2.svg'];
      }

      var img = this._img = document.createElement("img");
      img.setAttribute('src',src[0]);
      img.className = 'warn-img-big';
      div.appendChild(img);

      var img2 = this._img2 = document.createElement("img");
      img2.setAttribute('src',src[1]);
      div.appendChild(img2);

      mp.getPanes().labelPane.appendChild(div); 

      return div;
    }
    defOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }
    
}
function overProp2(mp){
    defOverlay.prototype = new BMap.Overlay();
    defOverlay.prototype.initialize = function(map){
      this._map = map;

      var src = '';
      var img = this._img = document.createElement("img");
      img.className = 'prov-pic';
      img.style.position = "absolute";
      img.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);

      if(this._type === 't0'){
        src = 'images/bdown.png';
      }else{
        src = 'images/bon.png';
      }
      img.setAttribute('id',this._id);
      img.setAttribute('src',src);

      mp.getPanes().labelPane.appendChild(img); 
      return img;
    }
    defOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._img.style.left = pixel.x + "px";
      this._img.style.top  = pixel.y - 30 + "px";
    }
}
/*杭州用户统计 start-------------------*/
//曲线统计图

var createTime = new Date().yyyymmdd()+" 07:00:00",
    createTime2 = new Date().yyyymmdd()+" 07:00:00",
    today = new Date().yyyymmdd();
//var b = 2;
function lineHZStatics(ec,theme,line){

        var datau = {date:today,createTime:createTime2},
            datap = {date:today,createTime:createTime};
        $.when($.ajax({url:"/os/getavailableproviders",data:datap}),$.ajax({url:"/os/getorderuser",data:datau}))
      　　.done(function(prov,user){ 
              line.arrSeries = [];
              if(prov[0].data != null){
                for(var i = 0;i < prov[0].data.length;i++){
                  var hms = ''+prov[0].data[i].createTime.split(" ")[1];
                  var time = timetoNum(hms);
                  //var time = prov[0].data[i].createTime.split(" ")[1].substring(0,5).split(':').join('');
                  line.pList.push(new Array(+time,prov[0].data[i].ap));
                } 
                createTime = prov[0].data[prov[0].data.length-1].createTime;
              }
              //var arr = [1,0,0.4,0.8,2,0.6,2,0.7,0.5,2];
              if(user[0].data != null){
                for(var i = 0;i < user[0].data.length;i++){
                  var hms = ''+user[0].data[i].createTime.split(" ")[1];
                  var time2 = timetoNum(hms);
                   //b = b + arr[Math.floor(Math.random()*10)];
                  
                  //line.userList.push(new Array(+time2,b));
                  line.userList.push(new Array(+time2,user[0].data[i].amount));
                } 
                createTime2 = user[0].data[user[0].data.length-1].createTime;
              }
              var ntime=user[0].nowtime.split(' ');
              line.arrSeries.push({
                name:line.legend[0],
                type:'line',
                data:line.userList
              },{
                name:line.legend[1],
                type:'line',
                data:line.pList
              }); 
              $('.anchorBL').remove();
              bestAreaChart(ec,theme,'hzUserChart',line);  
            })
      　　.fail(function(){ 

          });
}
//曲线统计图横坐标
function getXlist(interval){
  var list = [];
    for(var i = 700; i<2300;){
      if(i%100 === 60){
        i += 40;
      }
      var stri= (''+ i);
      var x = stri.substring(0,stri.length-2) +':'+ stri.substring(stri.length-2,stri.length);

      list.push(x);
      i += interval;
    }
  return list;
}

function setMap(){
  var map = new BMap.Map("allmap",{minZoom:5,maxZoom:23});  // 创建Map实例
      //map.centerAndZoom(new BMap.Point(119.6005537,30.488403),13);      // 初始化地图,用城市名设置地图中心点
      //map.centerAndZoom("杭州",13); 
      map.centerAndZoom(new BMap.Point(120.005995,30.281189),13);

      // 随机向地图添加25个标注
      var bounds = map.getBounds();
      var sw = bounds.getSouthWest();
      var ne = bounds.getNorthEast();
      var lngSpan = Math.abs(sw.lng - ne.lng);
      var latSpan = Math.abs(ne.lat - sw.lat);
      overProp(map);

      for (var i = 0; i < 15; i ++) {
        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
        var type = i%2 === 0?'t0':'t1';
        var marker = new defOverlay(point,type);
        map.addOverlay(marker);
      }
      darkMap(map);
}
//日总订单量
//var lastAmount = 40;
function getDaySum(){
  var d = $.Deferred(); 
     $.ajax({
         url:"/ms/getlastorderamount",
         method:"get",
         dataType: "json"
      }).done(function(resp) {
         d.resolve(resp);

         //$('#lastorderamount').text(lastAmount++);
         $('#lastorderamount').text(qfw(resp.data.amount));

       });
      return d.promise();
}
//日累计服务时长
function getServduring(){
  var d = $.Deferred(); 
     $.ajax({
         url:"/ms/getlastservduration",
         method:"get",
         dataType: "json"
      }).done(function(resp) {
         d.resolve(resp);
         //$('#lastservduration').text(15);
         $('#lastservduration').text(qfw(resp.data.durAmount/60));

       });
      return d.promise();
}
//月累计服务时长
function getServduringM(){
  var d = $.Deferred(); 
     $.ajax({
         url:"/ms/getservdurationmonth",
         method:"get",
         dataType: "json"
      }).done(function(resp) {
         d.resolve(resp);
         $('#servdurationmonth').text(qfw(resp.data.durAmount/60));

       });
      return d.promise();

}
/*杭州用户统计 end-------------------*/

//地图样式
function darkMap(map){
	var styleJson = [{
              "featureType": "background",
              "elementType": "all",
              "stylers": {
                      "color": "#000000"
              }
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": {
                      "color": "#343434"
              }
            },
            {
              "featureType": "local",//普通道路
              "elementType": "all",
              "stylers": {
                        "color": "#666666"
                      }
            },
            {
                    "featureType": "local",
                    "elementType": "labels.text.fill",
                    "stylers": {
                          "color": "#ffffff"
                    }
            },
            {
                    "featureType": "local",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                          "color": "#8b8787"
                    }
            },
            {
              "featureType": "label",//行政标注
              "elementType": "labels.text.stroke",
              "stylers": {
                        "color": "#000000"
                      }
            },
            {
              "featureType": "label",
              "elementType": "labels.text.fill",
              "stylers": {
                        "color": "#686868"
                      }
            },
            {
              "featureType": "highway",//高速及国道
              "elementType": "geometry",
              "stylers": {
                  "color": "#444444"
              }
            },
            {
              "featureType": "highway",
              "elementType": "labels.text.fill",
              "stylers": {
                        "color": "#686868"
                      }
            },
            {
              "featureType": "highway",
              "elementType": "labels.text.stroke",
              "stylers": {
                        "color": "#333333"
                      }
            },
            {
              "featureType": "subway",//地铁
              "elementType": "geometry",
              "stylers": {
                   "color": "#686868"
                        }
            },
             {
              "featureType": "subway",
              "elementType": "labels.text.fill",
              "stylers": {
                        "color": "#686868"
                        }
            },
            {
              "featureType": "subway",
              "elementType": "labels.text.stroke",
              "stylers": {
                        "color": "#333333"
                 }
            },
            {
              "featureType": "arterial",//城市主道
              "elementType": "labels.text.stroke",
              "stylers": {
                        "color": "#333333"
                 }
            },
            {
              "featureType": "arterial",
              "elementType": "labels.text.fill",
              "stylers": {
                        "color": "#686868"
                      }
            },
            {
              "featureType": "arterial",
              "elementType": "geometry.fill",
              "stylers": {
                   "color": "#000000"
              }
            },
            {
              "featureType": "arterial",
              "elementType": "geometry.stroke",
              "stylers": {
                     "color": "#434343"
              }
            },
            {
              "featureType": "poi",//小地区名
              "elementType": "labels.text.fill",
              "stylers": {
                      "color": "#686868"
                    }
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.stroke",
              "stylers": {
                      "color": "#333333"
                    }
            },
            {
              "featureType": "railway",//铁路
              "elementType": "geometry",
              "stylers": {
                    "color": "#686868"
                  }
            },
            {
              "featureType": "green",//绿地
              "elementType": "geometry",
              "stylers": {
                      "color": "#181818"
                  }
            }];

          map.setMapStyle({styleJson:styleJson});

}
//获取后一天
function getDateStr(AddDayCount,date) {
	var dd = new Date();
	if(date){
		dd=new Date(date);
	}
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    if(m<10){
    	m="0"+m;
    }
    
    var d = dd.getDate();
    if(d<10){
    	d="0"+d;
    }
    
    return y+"-"+m+"-"+d;
}
//元转千分位或者单位带万
function formatRMB(money, format) {
	var RMB = null;
	if (isNaN(money)) {
		RMB = 0;
	} else {
		RMB = (Number(money) / 100).toFixed(2); //分转换成元保留两位小数
		switch (format) {
			case "thousands":
				RMB = (RMB + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				break;
			case "tenthousand":
				RMB = parseInt(RMB) >= 10000 ? (parseInt(RMB) / 10000) + "万" : parseInt(RMB);
				break;
			default:
				RMB = RMB;
		}
	}
	return RMB
}
function qfw(num) {
  var outNum = null;
  if (isNaN(num)) {
    outNum = 0;
  } else {
    outNum = Number(num).toFixed(2); //分转换成元保留两位小数
    outNum = (outNum + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'); 
  }
  return outNum;
}
//获取俩个日期间的数组  yyyy-mm-dd
function betweenDate(fromdate,todate){
	var days=(new Date(todate)-new Date(fromdate))/(24*60*60*1000);
	var date=todate,dayArr=[];
	for(var i=0;i<days;i++){
		date=getDateStr(-1,date);
		dayArr.push(date);
	}
	dayArr.reverse();
	return dayArr;
}
function showWindow(title,width,height,url,handler){
	ymPrompt.win({message:url,
				  width:width||900,
				  height:height||600,
				  title:title,
				  maxBtn:true,
				  minBtn:true,
				  iframe:true,
				  showShadow:false,
				  useSlide:false,//淡入淡出
				  maskAlphaColor:"#FFFFFF",
				  maskAlpha:0.3,
				  handler:handler
			}
	);

}
function nullz(num){
  return num == null ? 0:num;
}
//选择快捷日期
function quickDay(fn){
	//快捷日期hover样式
	/*var v=$('input[name="quickDay"]').val();
	$('.ui-btn-group button').hover(function(){
		$(this).addClass('btn-curr').siblings('button').removeClass('btn-curr');
	},function(){
		if(v){
			var ckd = $('.ui-btn-group button[value='+v+']');
			ckd.length == 0?null:ckd.addClass('btn-curr').siblings('button').removeClass('btn-curr');
		}else{
			$('.btn-curr').removeClass('btn-curr');
		}
		
	});*/
	//快捷日期搜索
	$('.ui-btn-group button').on('click',function(){

    $(this).addClass('btn-curr').siblings('button').removeClass('btn-curr');

		var today = new Date(), 
		    ymd = new Date().yyyymmdd();
		var y = new Date().getFullYear(),
		    m = new Date().getMonth()+1,
		    d = new Date().getDate();
	    var start = '',end = '';
		if($(this).val() == 1){//日1 周2 月3
			start = end = getDateStr(-1);
		}else if($(this).val() == 2){

			end = new Date(today.setDate(d-new Date().getDay())).yyyymmdd();
      start = getDateStr(-6,end);
		}else{
			end = getDateStr(-1);
      start = getDateStr(-30,end);
		}
		$('#startDate').val(start);
		$('#endDate').val(end);
		//$('input[name="quickDay"]').val($(this).val());
    fn();
		//$('#providerData').submit();
	});
	//日历控件选择日期 则去掉快捷日期高亮
	var dateInterval = $('#startDate').val() + $('#endDate').val();
	$('.sort-panel input:lt(2)').each(function(){
		$(this).focus(function(){
			
		},function(){
			if($('#startDate').val()+$('#endDate').val() !== dateInterval){
				$('input[name="quickDay"]').val('');
				$('.btn-curr').removeClass('btn-curr');
			}
		});
	});
	
}


//订单数据统计-新增区域
function addArea(){
	
	if($('.compare-area .comp-item').length>6){
		return;
	}
	$('.compare-area').delegate('.ui-reduce','click',function(){
		$(this).parents('.comp-item').remove();
	});
	$('.comp-add').removeClass('fn-hide');
}
function saveArea(){
	var areaName=$('.area-name').val();
	
    var newline='<li class="comp-item comp-added">'
				+'<label>'+areaName+'</label>'
				+'<a href="javascript:;" class="ui-reduce">-</a></li>';
	
	$('.compare-area').append(newline);
	//$('.comp-added:eq(0)').hasClass('fn-hide')?$('.comp-added:eq(0)').
	//$('.comp-added').removeClass('fn-hide');
	$('.comp-add').addClass('fn-hide');
	$('.area-name').val('');
	
}

//订单数据统计-//tab页切换
function rankData(){
   new Vue({
      el: '#rank-source',
      data: {
          currentView: 'main'
      },
      components: {
          main: {
              template: '#rank-tpl',
              data: function () {
                 var data = { numrank: 
                            [{areaname: "杭州市", total: "141"},  
                              {areaname: "温州市", total: "122"},  
                              {areaname: "绍兴市", total: "122"}  
                            ],moneyrank: [  
                                {areaname: "杭州市", total: "111"},  
                                {areaname: "温州市", total: "322"},  
                                {areaname: "绍兴市", total: "122"}  
                            ]};
                  return {
                      numrank: data.numrank,
                      moneyrank: data.moneyrank
                  }
              },
              methods: {
                  toPay: function(){
                  }
              }
          }
      }
  });
}

function showMore(){
  var source = $("#rank-tpl").html();  
  var template = Handlebars.compile(source);  
      
  $('#rank-dlg .area-info').html(template(data));
  ymPrompt.win({
      message:$('.ui-dlg').html(),
      width:500,
      height:600,
      title:'',
      showShadow:false,
      useSlide:false,//淡入淡出
      maskAlphaColor:"#FFFFFF",
      maskAlpha:0.3,
      handler:function(){}
  });

}
//tab页切换
function areaTab(){
	rankData();
	
	$('.area-tab a').click(function(){
		var v=$(this)[0].dataset.val;
		var p=$(this).parents('li');
		p.addClass('area-curr').siblings().removeClass('area-curr');
		rankData();
		/*var d = $.Deferred();
		 $.ajax({
        	 url:'data.json',
 			 data:{val:v},
 			 method:"post",
             dataType: "json"
         }).done(function(response) {
             var data = response[0].list;
             d.resolve(data);
             
         });
         return d.promise();*/
         
	});
}
//template rander data
function tplData(tplid,data,htmlid){
	var source = $(tplid).html();  
    var template = Handlebars.compile(source);
      $(htmlid).html(template(data));
}
function icheck(){
	$('input[type="checkbox"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
}


