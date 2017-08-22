jQuery(function($){
    'use strict';
    var timeMap = {'09:00': 6, '09:30': 7, '10:00': 8, '10:30': 9, '11:00': 10, '11:30': 11, '12:00': 12, '12:30': 13, '13:00': 14, '13:30': 15, '14:00': 16, '14:30': 17, '15:00': 18, '15:30': 19, '16:00': 20, '16:30': 21, '17:00': 22, '17:30': 23, '18:00': 24, '18:30': 25, '19:00': 26, '19:30': 27, '20:00': 28, '20:30': 29, '21:00': 30, '21:30': 31, '22:00': 32, '22:30': 33};
    var m = {
        cpage : 1,
        copage : 1,
        items : {},
        oitems : [],
        isOver: false,
        prdtime: {},
        myScroll: null,
        nodataIndex : 0,
        init: function(){
            m.areatpl = '<li><a href="javascript:;"  data-type="{0}" data-code="{1}">{2}</a></li>';
            m.prdtpl = '<button class="btn-prd {0}" data-id="{1}"><span>{2}</span><a href="javascript:;" class="fa fa-angle-down"></a></button>';
            m.availprdtpl = '<button class="btn-prd" data-id="{0}">{1}</button>';
            m.orgprdtpl = '<label class="btn-prd btn-prd-selectd" data-id="{0}">{1}</label>';
            m.timetpl = '<li class="{0}">{1}</li>';

            m.initList();
            m.myScroll = base.loaded(m.pullUpFunc);
            
            m.bindEvent();
            
        },
        //下拉加载更多
        pullUpFunc: function() {
            var that = this,
                data = {};
            if(!m.isOver){
               m.cpage ++;
               data = {currentPage:m.cpage};
            }else{
               m.copage ++;
               data = {currentPage:m.copage,status:'closed'};
            }
            if (m.isC) {
                m.isC = false;
                $.ajax({
                    url: jyk.BASEURL + '/offlineactivity/list',
                    dataType: "json",
                    method: "POST",
                    data: data,
                }).done(function(resp) {
                    if (resp.data.list.length > 0) {
                      if(!m.isOver){
                        m.dealData(resp,m.items);
                      }else{
                        m.dealData(resp,m.oitems);
                      }

                      that.refresh();
                      m.isC = true;
                    } else {
                      if(!m.isOver){
                        m.nodataIndex = 1;
                      }else{
                        m.nodataIndex = 2;
                      }
                      that.noIscroll();
                    }
                });
            } else {
              that.refresh();
            }
            
        },
        /*
        *初始化列表
        */
        initList:function(){

          m.isC = false;
          
          m.items = {};
          $.ajax({
              url: jyk.BASEURL + '/offlineactivity/list',
              dataType: "json",
              method: "POST",
              data: {currentPage:1},
          }).done(function(resp) {
             if(!resp.result) jyk.handleError(resp.errCode);

              m.dealData(resp,m.items);

              m.myScroll.refresh();
              m.isC = true;
          });
        },
        initListOver:function(){

          m.isC = false;

          m.oitems = {};
          $.ajax({
              url: jyk.BASEURL + '/offlineactivity/list',
              dataType: "json",
              method: "POST",
              data: {currentPage:1,status:'closed'}
          }).done(function(resp) {
             if(!resp.result) jyk.handleError(resp.errCode);

              m.dealData(resp,m.oitems);

              m.myScroll.refresh();
              m.isC = true;
          });
        },
        //resp：请求返回的数据，items：需要加入的原数组
        dealData:function(resp,items){
           var list = resp.data.list,
                len = resp.data.list.length;

            for(var i = 0; i < len ; i ++){
              var mlist = list[i].providerNames;
              if(mlist){
                  var mlen = list[i].providerNames.length,
                      names = '';
                  for(var j = 0; j < mlen ; j ++){
                    names += mlist[j].providerName +',';
                  }
                  list[i].names = names;
                  list[i].mlen = mlen;
              }
                list[i].edit = false;
                if(new Date() < new Date(list[i].endTime)){
                  list[i].edit = true;
                }
                if(!m.isOver){
                  list[i].ing = true;
                }else{
                  list[i].ing = false;
                }
                
                list[i].duration = (new Date(list[i].endTime) - new Date(list[i].startTime)) / 60000;
                items[list[i].activityId] = list[i];
            }

           var source   = $("#list-tpl").html();
           var template = Handlebars.compile(source);
           $('#list-source').html(template({list:items}));
        },
        getProvider: function(actid,isAll){

          var startCode = '', date = '', serviceId = '', duration = '',itm = {};
            if(m.isOver){
              itm = m.oitems[actid];
            }else{
              itm = m.items[actid];
            }
            m.areaCode = itm.streetCode;
            startCode = timeMap[itm.startTimeH];
            date = itm.startDate;
            serviceId = itm.serviceId;
            duration = itm.duration;

            var prdurl = '',prddata = {};
            var timeList = m.calIntervalList(startCode);
            $('input[name="actid"]').val(actid);
            $('input[name="duration"]').val(duration);
            
            if(isAll){
              prdurl = jyk.BASEURL + '/provider/activityProviders';
              prddata = {date:date,areaCode: m.areaCode, serviceId:serviceId }
            }else{
              prdurl = jyk.BASEURL + '/provider/availableProviders';
              prddata = {date:date,areaCode: m.areaCode, serviceId: serviceId, startTimeCode: startCode, duration: duration}
            }

            $.ajax({
                url: prdurl,
                type: 'POST',
                data: prddata
            }).done(function(d){
                //d = dat;
                if(d.result) {
                    var html = '',head = '',timefdList = [],
                        prdlist = '',timehtml = '';;
                    if(d.data.length === 0){
                      if(isAll){//如果查询的是可用理疗师
                            /*bootbox.confirm("无理疗师可用，是否获取全部理疗师?", function(result) {
                                if(!result) return;
                                m.getProvider(true);
                            });*/
                            //m.getProvider(true);
                          jyk.alert('无理疗师，请重新选择条件', 'danger');
                          $('#off-prd-list').html('');  
                      }else{
                          $('#off-avail-list').html('');
                      }
                        //jyk.alert('该条件内无可用理疗师，请重新选择条件', 'danger');
                    }
                    else{

                      $('#mob-provders').show();
                      
                      if(isAll){//获取全部
                        for(var key in timeMap){
                          for(var i = 0;i < timeList.length;i ++){
                              if(timeMap[key] === timeList[i]){
                                  timefdList.push(key);
                              }
                          }
                        }
                        for (var j = 0; j < d.data.length; j++) { //人数

                          prdlist += m.prdtpl.format('',d.data[j].id,d.data[j].name);
                          
                          for(var i = 0;i < timeList.length;i ++){ //时间区间
                            var aglist = d.data[j].AgendaList || [];
                            var obj = {};
                            obj[timeList[i]] = "green-li";

                            for(var x = 0;x < aglist.length;x ++){ //事件数
                                if( aglist[x].startTimeCode <= timeList[i] && timeList[i] <= aglist[x].endTimeCode){ //时间区间值在事件区间内
                                   obj[timeList[i]] = "diasble-li";
                                }
                            }
                            if(timefdList[i]){
                                timehtml += m.timetpl.format(obj[timeList[i]],timefdList[i]);
                            }
                          }
                          m.prdtime[d.data[j].id] = timehtml;
                        }
                          $('#off-time-list').html('');
                          $('#off-prd-list').html(prdlist);
                          m.addOnRoad();
                      }
                      else{//获取可用
                        var prdavaillist = '';
                        for (var j = 0; j < d.data.length; j++) { //人数
                          prdavaillist += m.availprdtpl.format(d.data[j].id,d.data[j].name);
                        }
                        $('#off-avail-list').html(prdavaillist);

                      }
                      
                    }
                }
                else{
                    jyk.alert(d.error, 'danger');
                }
            });
        },
        addOnRoad:function(){
          var onTheRoadCls = 'bg-road';

            $('#off-time-list').find('.diasble-li').each(function(){
              var prev1 = $(this).prev('.green-li');
              var next1 = $(this).next('.green-li');
              
             if(prev1.length != 0){
               prev1.addClass(onTheRoadCls);
               var prev2 = prev1.prev('.green-li');
               prev2.length != 0 ? prev2.addClass(onTheRoadCls) : null;
             }

             if(next1.length != 0){
               next1.addClass(onTheRoadCls);
               var next2 = next1.next('.green-li');
               next2.length != 0 ? next2.addClass(onTheRoadCls) : null;
             }

           });
           
        },
        //前2后7
        calIntervalList:function(startCode){
            var len = 12,
                arr = [],
                start = parseInt(startCode),
                end = parseInt(startCode);
            var minlen = start- 8,maxlen = 0;
            minlen < 0? minlen = start - 6: minlen = 2;
            maxlen = len - minlen;
            if(minlen != 0){
                for(var i = 0;i< minlen;i++){
                    start-=1;
                    arr.push(start);
                }
            }
            arr.reverse();
            for(var j = 0;j< maxlen;j++){
                arr.push(end);
                end += 1;
            }
            return arr;
        },
        bindEvent: function(){
          //进行中/已结束 活动切换
              $('#acti-menu-box .acti-menu').on('click',function(){
                var p =$(this);
                var index = p.prev('.acti-curr').length;
                p.addClass('acti-curr').siblings('.acti-menu').removeClass('acti-curr');
                //$('.mob-acti').eq(index).show().siblings('.mob-acti').hide();
                if(index == 0){
                  m.isOver = false;
                  m.initList();
                  if(m.nodataIndex == 2){
                    m.myScroll.reBind();
                  }
                }else{
                  m.isOver = true;
                  m.initListOver();
                  if(m.nodataIndex == 1){
                    m.myScroll.reBind();
                  }
                }
                $('#fresh-wrap-up .ui-fresh-text').html('<i class="fa  fa-arrow-up"></i>上拉加载更多...');
                
              });

          //列表箭头-更多
          $('#list-source').on('click','.mob-acti-link>.fa',function(e){
            e.preventDefault();

            $(this).toggleClass('fa-angle-right').toggleClass('fa-angle-down');
            $(this).parents('.mob-acti-link').next('ul').find('li.fn-hide').toggle();

          });
          //分享
          /* setTimeout(function(){
                $('.off-share').each(function(){
                  var clip = new ZeroClipboard($(this)[0], {
                    moviePath: "ZeroClipboard.swf"
                  });
                  clip.on("aftercopy",function(){
                    alert('复制成功，请前往微信复制给好友');
                  });

                  
                });
                   
              },1000);
            */
          //结束
          $('body').on('click','.off-over',function(){
            var actid = $(this).parents('.btn-three')[0].dataset.actid;

            bootbox.confirm("确认结束?", function(result) {
              if(!result) return;
              $.ajax({
                  url: jyk.BASEURL + '/offlineActivity/close',
                  type: 'POST',
                  data: {activityId: actid}
              }).done(function(d){
                  if(d.result){
                      jyk.alert('操作成功');
                      if(m.isOver){
                        m.initListOver();
                      }else{
                        m.initList();
                      }
                      
                  }
                  else{
                      jyk.alert(d.error, 'danger');
                  }
              });
            });

          });
          //编辑
          $('body').on('click','.off-edit',function(e){
            e.stopPropagation();

              var actid = $(this).parents('.btn-three')[0].dataset.actid;
              var p = $(this).parents('.mob-acti-item');
              var itm = '',html = '',prdIds = '';
              if(m.isOver){
                itm = m.oitems[actid];
              }else{
                itm = m.items[actid];
              }

              if(itm.providerNames){
                  var arr = itm.providerNames;
                  for(var i = 0; i < arr.length;i ++){
                    //html += arr[i].name +',';
                    html += m.orgprdtpl.format(arr[i].providerId,arr[i].providerName);
                    prdIds += arr[i].providerId +',';
                  }
              }
              $('#off-org-prd').html(html);
              $('input[name=providerIds]').val(prdIds);
             
              //获取理疗师
              m.getProvider(actid,false);
              m.getProvider(actid,true);
              
          });
          //保存编辑
          $('#btn-prd-save').on('click',function(){
            var providers = $('input[name=providerIds]').val(),
                actid = $('input[name="actid"]').val(),
                duration = $('input[name="duration"]').val();
            if(!providers){
                jyk.alert('请重新选择理疗师', 'danger');
                return;
            }
            providers = providers.substring(0,providers.length - 1);
            $.ajax({
                url: jyk.BASEURL + '/offlineActivity/alter',
                type: 'POST',
                data: {providerIds: providers, activityId: actid, duration: duration}
            }).done(function(d){
                if(d.result){
                    jyk.alert('保存成功！', 'success');
                    $('#mob-provders').hide();
                    if(m.isOver){
                      m.initListOver();
                    }else{
                      m.initList();
                    }
                }
                else{
                    jyk.alert(d.error, 'danger');
                }
            });
          });
          
          //参与人 查看时间
          $('#off-prd-list').on('click','.fa',function(e){
            e.stopPropagation();
            $(this).parents('.btn-prd').toggleClass('btn-prd-selectd');
            $(this).parents('.btn-prd').siblings('.btn-prd').removeClass('btn-prd-selectd');
            var key = $(this).parents('.btn-prd')[0].dataset.id;
            $('#off-time-list').html(m.prdtime[key]);
            m.addOnRoad();
          });
          //参与人 添加
          $('#off-prd-list').on('click','.btn-prd',function(e){
            var id = $(this)[0].dataset.id,
              text = $(this).find('span').text();
            var prd = $('input[name=providerIds]'),
                prdshow = $('#off-org-prd'),
                html = '';
            
            if(prd.val() == ''){
              //prdshow.text(text);
              prdshow.append(m.orgprdtpl.format(id,text));
              prd.val(id);
              
              if($(this).hasClass('btn-prd-selectd')){
                $('#off-time-list').html('');
              }
              $(this).remove();
            }else{
              var isRepeat = (prd.val().split(',')).indexOf(id)
              if(isRepeat == -1){
                prdshow.append(m.orgprdtpl.format(id,text));
                prd.val(prd.val() + ',' + id );

                if($(this).hasClass('btn-prd-selectd')){
                  $('#off-time-list').html('');
                }
                $(this).remove();
              }
              
            }
            m.addOnRoad();
          });

          $('.close').on('click',function(){
            if($(this).parents('.modal').length == 0){
              $(this).parents('.bott-modal').hide();
            }
          });
          $('#mob-back').on('click',function(){
              window.history.back();
            });
                 
        }
      
    };

    m.init();
    
});


var base = {
  /**
  * 上下拉刷新插件
  * @type {Object}
  */
  loaded: function(pullUpFunc) {
    var pullUpEl = $("#fresh-wrap-up");
    var pullUpFlag = pullUpEl[0].dataset.flag;
    var myScroll = new IScroll('#wrapper', {
          topOffset: '0.5rem',
          scrollbars: true,
          click:true
      /*,
      onBeforeScrollStart: function (e) {
                var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase():(e.target ? e.target.nodeName.toLowerCase():'');

                if(nodeType !='select' && nodeType !='option' && nodeType !='input' && nodeType!='textarea' && !showkey) {
                     e.preventDefault();    //prevents showing keyboard - scrolling
                }//otherwise, show keyboard, do default
                if(!showkey) showkey = true;
            }*/
    });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', function () { setTimeout(iScrollLoad, 200); }, false);

    function moveUp() {
      $("#wrapper").trigger('scroll');
      if (this.y < (this.maxScrollY - 5) && !pullUpFlag.match("flip")) {
        pullUpFlag = "flip";
        pullUpEl.html('<i class=""></i><p class="ui-fresh-text">该放手啦,我要加载啦...</p>');
        this.maxScrollY = this.maxScrollY;
      } else if (this.y > (this.maxScrollY + 5) && pullUpFlag.match("flip")) {
        pullUpFlag = "";
        pullUpEl.html('<span class="ui-fresh-text"><i class="fa  fa-arrow-up"></i>上拉加载更多...</span>');
        this.maxScrollY = pullUpEl.height();
      }
    }

    function moveEnd() {//手上滑
      if (pullUpFlag.match("flip")) {
        pullUpFlag = "loading";
        pullUpEl.html('<span class="ui-fresh-text"><i class="fa fa-spinner"></i>加载中...</span>');
        setTimeout(function() {
          pullUpFunc.call(myScroll);
        }, 1000);
      }
    }

    function refresh() {
      if (pullUpFlag.match("loading")) {
        pullUpFlag = "";
        pullUpEl.html('<span class="ui-fresh-text"><i class="fa  fa-arrow-up"></i>上拉加载更多...</span>');
      }
    }
   
    myScroll.on("scrollMove", moveUp);
    myScroll.on("scrollEnd", moveEnd);
    myScroll.on("refresh", refresh);

    myScroll.noIscroll = function() {
      myScroll.refresh();
      myScroll.off("scrollMove", moveUp);
      myScroll.off("scrollEnd", moveEnd);
      myScroll.off("refresh", refresh);
      pullUpEl.html('<span class="ui-fresh-text">没有数据了</span>');
    }
    myScroll.reBind = function() {
      myScroll.on("scrollMove", moveUp);
      myScroll.on("scrollEnd", moveEnd);
      myScroll.on("refresh", refresh);
    }

    return myScroll;
  }
  
 }


              
             /*new Vue({
                el: '#list-source',
                data: {
                    currentView: 'main'
                },
                components: {
                    main: {
                        template: '#list-tpl',
                        data: function () {
                          var list = resp.data.list,
                              len = resp.data.list.length;
                          for(var i = 0; i < len ; i ++){
                            var mlist = list[i].providerNames;
                            if(mlist){
                                var mlen = list[i].providerNames.length,
                                    names = '';
                                for(var j = 0; j < mlen ; j ++){
                                  names += mlist[j].providerName +'、';
                                }
                                list[i].names = names;
                                list[i].mlen = mlen;
                            }
                            m.items.push(list[i]);
                          }
                          m.cpage ++;
                          return {list:m.items};
                        },
                        methods: {
                            toPay: function(){
                            }
                        }
                    }
                }
             });*/