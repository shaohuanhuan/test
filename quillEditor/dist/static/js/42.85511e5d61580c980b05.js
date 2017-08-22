webpackJsonp([42],{334:function(t,n,e){e(896);var a=e(89)(e(555),e(809),"data-v-52a3b221",null);a.options.__file="/Users/JU53/Documents/website/b2b4.0/b2b-seller4.0/src/views/order/orderDetail.vue",a.esModule&&Object.keys(a.esModule).some(function(t){return"default"!==t&&"__esModule"!==t}),a.options.functional,t.exports=a.exports},555:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(95),i=e.n(a),o=e(103),s=e(0),l=e(96);n.default={name:"orderDetail",props:{},data:function(){return{formcomp:"",formlogistNum:"",formcompname:"",formnum:0,modLogis:!1,logistother:0,closedReason:"",priceOPay:"",priceSpan:"",priceFeight:"",priceLastPay:"",restTime:"",priceModel:!1,deliverModel:!1,fundModel:!1,closeModel:!1,logistmodelname:"商品发货",logistmodeltype:0,pageIndex:1,pageSize:10,total:0,status:["待付款","待发货","已发货","交易成功","交易关闭","待评价"],backstatus:["","部分退款","全部退款"],selectarr:[],refundfm:{refundAmount:"",returnInvTag:0,returnFreightTag:0,refundReason:"",amountUnit:""},info:{orderCode:""}}},components:{},mounted:function(){this.$store.dispatch("setNavIndex",5)},methods:{closeOk:function(){var t=this;if(!this.closedReason)return void t.$message.error("请选择一个取消订单的理由");var n={closedReason:this.closedReason,orderCode:this.info.orderCode};o.a.closeOrder(n).then(function(n){t.doResult(n,"关闭订单成功")})},modPrice:function(){this.priceModel=!0},modLogic:function(){var t=this.info.logistCompany;this.logistother=this.info.waybill?this.info.waybill.isOtherLogist:0,this.logistother?(this.formcomp="其他",this.formcompname=t):this.formcomp=t,this.formlogistNum=this.info.logistNum,this.deliverModel=!0,this.logistmodelname="修改物流",this.logistmodeltype=1},refund:function(){},explain:function(t,n){},modpriceOk:function(){var t=this,n=[];this.info.itemList.forEach(function(t){n.push({itemId:t.itemId,price:t.pricespan})});var e={orderCode:this.info.orderCode};n.forEach(function(t,n){e["priceChangeList["+n+"].itemId"]=t.itemId,e["priceChangeList["+n+"].price"]=t.price}),e.freight=this.priceFeight,o.a.doModPrice(e).then(function(n){t.doResult(n,"修改价格成功")})},deliverOk:function(){var t=this;if(!t.selectarr.length)return void t.$message({type:"info",message:"请选择商品"});var n={orderCode:t.info.orderCode,logistNum:t.formlogistNum,logistCompany:t.logistother?t.formcompname:t.formcomp};t.logistmodeltype?(n.isOtherLogist=t.logistother,o.a.doModLogist(n).then(function(n){t.doResult(n,"修改物流成功")})):o.a.doDeliver(n).then(function(n){t.doResult(n,"发货成功")})},selectProduct:function(t){this.selectarr=t},selectAll:function(t){this.selectarr=t},selectComp:function(){var t=this;"其他"===t.formcomp?t.logistother=1:t.logistother=0},addNum:function(t,n){var e=this.info.itemList[t];n>e.formnum&&e.formnum++,s.default.set(this.info.itemList,t,i()(e,{formnum:e.formnum}));var a=0;this.info.itemList.forEach(function(t){a+=t.price*t.formnum}),this.refundfm.refundAmountCal=a},reduceNum:function(t){var n=this.info.itemList[t];n.formnum>0&&n.formnum--,s.default.set(this.info.itemList,t,i()(n,{formnum:n.formnum}));var e=0;this.info.itemList.forEach(function(t){e+=t.price*t.formnum}),this.refundfm.refundAmountCal=e},caluActPay:function(t){var n=0,e=0,a=Number(this.priceFeight);this.info.itemList.forEach(function(t){var a=t.changePrice?t.changePrice:t.price;Number(t.pricespan)+a<0&&(t.pricespan="+0"),n+=Number(a*t.quantity);var i=t.pricespan.split("+");i.length&&(isNaN(i[1])||(e+=+t.pricespan));var o=t.pricespan.split("-");o.length&&(isNaN(o[1])||(e-=Number(o[1])))}),this.priceLastPay=(n+a+e).toFixed(2),this.priceSpan=e<0?" - "+Math.abs(e):" + "+Math.abs(e),this.priceOPay=n},doResult:function(t,n){t.data.code?this.$message.error(t.data.message):(this.$message({type:"success",message:n}),setTimeout(function(){location.reload()},1e3))},timeCount:function(){function t(t,e,a){var i=new Date,o=new Date(t,e-1,a),s=o.getTime()-i.getTime(),l=parseInt(s/1e3),r=Math.floor(l/86400),d=Math.floor((l-24*r*60*60)/3600),c=Math.floor((l-24*r*60*60-3600*d)/60),p=Math.floor(l-24*r*60*60-3600*d-60*c);n.restTime=r+"天"+d+"小时"+c+"分"+p+"秒"}var n=this;if(!this.info.createTime)return void(n.restTime=0);var e=n.changeTime(this.info.createTime+6048e5);if(e)var a=setInterval(function(){0===e[0]&&0===e[1]&&0===e[2]&&clearInterval(a),t(e[0],+e[1],+e[2])},1e3)},changeTime:function(t){var n=new Date(t);return[n.getFullYear(),(n.getMonth()<9?"0":"")+(n.getMonth()+1),(n.getDate()<10?"0":"")+n.getDate()]},zlip:function(){document.getElementById("copyinput").select(),document.execCommand("copy"),this.$message.success("复制成功")},backToList:function(){this.$router.push({path:"/order"})}},watch:{info:function(){this.timeCount()}},computed:e.i(l.b)({comps:"comps",logisList:"logisList"}),created:function(){var t=this;o.a.getInfo({orderCode:t.$route.params.orderid}).then(function(n){for(var e=n.data.data,a=e.itemList,i=0,o=a.length;i<o;i++)e.itemList[i].formnum=0,e.itemList[i].pricespan="+0";t.priceFeight=e.totalCost,t.info=e,e.logistNum&&t.$store.dispatch("getLogistList",e.logistNum),t.info.address1=t.info.address.name+"("+t.info.address.telephone+")",t.info.address2=t.info.address.provinceName+t.info.address.city+t.info.address.detailAddress+t.info.address.postcode;var s=setInterval(function(){document.getElementById("copyinput")&&(document.getElementById("copyinput").innerHTML=t.info.address1+"\n"+t.info.address2,clearInterval(s))},320)}),this.$store.dispatch("getComp")}}},619:function(t,n,e){n=t.exports=e(49)(),n.push([t.i,"\n.double-tab[data-v-52a3b221] {\n  position: relative;\n}\n.double-tab li[data-v-52a3b221] {\n  width: 100%;\n  height: auto;\n  border-bottom: 1px solid #dfe3eb;\n}\n.double-tab .double-td .btn-blue.el-button[data-v-52a3b221],\n.double-tab .double-td .btn-trans.el-button[data-v-52a3b221] {\n  margin: 0 auto;\n  display: block;\n}\n.double-tab .double-td .el-button[data-v-52a3b221]:nth-child(1) {\n  margin-bottom: 8px;\n}\n.double-column[data-v-52a3b221] {\n  height: auto;\n}\n.double-th[data-v-52a3b221] {\n  margin-top: 16px;\n  height: 36px;\n  line-height: 36px;\n  padding-left: 40px;\n  border-top: 1px solid #e3e6ed;\n  background-color: #F5F8FA;\n}\n.double-td[data-v-52a3b221] {\n  width: 10%;\n  float: left;\n  padding-top: 16px;\n  font-size: 13px;\n  border-right: 1px solid #dfe3eb;\n  background-color: #fff;\n  text-align: center;\n  box-sizing: border-box;\n}\n.double-td p[data-v-52a3b221] {\n  line-height: 22px;\n}\n.double-td .tit[data-v-52a3b221] {\n  display: inline-block;\n  margin-right: 2%;\n  padding-right: 5px;\n  width: 78%;\n  line-height: 18px;\n  vertical-align: top;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.double-span-item[data-v-52a3b221] {\n  position: relative;\n  width: 50%;\n  border-left: 1px solid #dfe3eb;\n  text-align: left;\n}\n.double-span-item img[data-v-52a3b221] {\n  position: absolute;\n  left: 20px;\n}\n.double-span-item .double-item[data-v-52a3b221] {\n  padding: 0 0 2px 99px;\n  height: 78px;\n  box-sizing: border-box;\n}\n.double-span-item .bortop[data-v-52a3b221] {\n  padding-top: 16px;\n  height: 96px;\n  border-top: 1px solid #dfe3eb;\n}\n.status-td p[data-v-52a3b221] {\n  line-height: 16px;\n}\n.double-one[data-v-52a3b221] {\n  margin-bottom: 16px;\n  white-space: normal;\n}\n.double-two[data-v-52a3b221] {\n  font-size: 12px;\n  color: #7C98B6;\n}\n.sub-tip[data-v-52a3b221] {\n  color: #7C98B6;\n}\n.double-header[data-v-52a3b221] {\n  border-top: 1px solid #dfe3eb;\n}\n.double-header .double-td[data-v-52a3b221] {\n  height: 44px;\n  line-height: 44px;\n  padding-top: 0;\n  border-right: 0;\n  background-color: #F5F8FA;\n  font-weight: bold;\n}\n.double-header .double-span-item[data-v-52a3b221] {\n  padding-left: 50px;\n}\n.input-sel-search[data-v-52a3b221] {\n  width: 310px;\n}\n.input-sel-search *[data-v-52a3b221] {\n  border-color: #CBD6E3;\n}\n.input-sel-search .el-select[data-v-52a3b221] {\n  width: 100px;\n}\n.input-sel-search .el-select .el-input__inner[data-v-52a3b221] {\n  width: 100px;\n}\n.input-sel-search .el-input-group__prepend[data-v-52a3b221] {\n  background-color: transparent;\n  border-right: 0;\n}\n.input-sel-search .el-input__inner[data-v-52a3b221] {\n  width: 162px;\n  border-left: 0;\n}\n.input-sel-search .el-input[data-v-52a3b221] {\n  color: #333;\n}\n.input-sel-search .input-split[data-v-52a3b221] {\n  position: absolute;\n  left: 100px;\n  top: 0;\n}\n.input-split[data-v-52a3b221] {\n  display: inline-block;\n  width: 0;\n  height: 17px;\n  border: 0;\n  border-left: 1px solid #cbd6e3;\n}\n.time-sel[data-v-52a3b221] {\n  display: inline-block;\n  position: relative;\n  width: 321px;\n  border: 1px solid #cbd6e3;\n  border-radius: 4px;\n  vertical-align: middle;\n}\n.time-sel .select-keyword[data-v-52a3b221] {\n  position: absolute;\n  left: 0;\n  width: 100px;\n  border: 0;\n}\n.time-sel .select-keyword .el-input__inner[data-v-52a3b221] {\n  height: 31px;\n  border: 0;\n}\n.time-sel .select-keyword .el-input__inner[data-v-52a3b221]:hover,\n.time-sel .select-keyword .el-input__inner[data-v-52a3b221]:focus {\n  border: 0;\n  box-shadow: none;\n}\n.time-sel .select-time[data-v-52a3b221] {\n  padding-left: 105px;\n  height: 34px;\n  line-height: 34px;\n}\n.time-sel .select-time .el-date-editor--daterange.el-input[data-v-52a3b221] {\n  margin-top: -20px;\n  width: 210px;\n  vertical-align: middle;\n}\n.time-sel .select-time .el-date-editor .el-picker-panel[data-v-52a3b221] {\n  width: 500px!important;\n}\n.time-sel .select-time .el-input__inner[data-v-52a3b221] {\n  height: 31px;\n  border: 0;\n  border-radius: 0;\n}\n.time-sel .select-time .el-input__inner[data-v-52a3b221]:hover,\n.time-sel .select-time .el-input__inner[data-v-52a3b221]:focus {\n  border: 0;\n  box-shadow: none;\n}\n.search-box[data-v-52a3b221] {\n  position: relative;\n  margin-bottom: 5px;\n  padding: 10px;\n  border-bottom: 2px solid #eaf0f6;\n}\n.search-box *[data-v-52a3b221] {\n  font-size: 13px;\n}\n.search-box .right-module[data-v-52a3b221] {\n  position: absolute;\n  right: 0;\n  top: 10px;\n  margin: 0;\n  width: 540px;\n}\n@-moz-document url-prefix() {\n.search-box * {\n    vertical-align: middle;\n}\n.search-box .time-sel .select-time .el-input__inner {\n    margin-bottom: -15px;\n}\n}\n.select-keyword[data-v-52a3b221] {\n  height: 35px;\n  line-height: 35px;\n  padding-left: 5px;\n  color: #33475B;\n  border: 1px solid #cbd6e3;\n  outline: none;\n}\n.el-tabs__nav-prev[data-v-52a3b221] {\n  display: none;\n}\n.modprice-info[data-v-52a3b221] {\n  margin-top: 10px;\n  padding-left: 20px;\n}\n.modprice-info p[data-v-52a3b221] {\n  line-height: 48px;\n  color: #33475B;\n  font-size: 13px;\n}\n.modprice-info .tips76[data-v-52a3b221] {\n  margin-top: -28px;\n  color: #7D98B6;\n  font-size: 12px;\n}\n.modprice-info .ui-logist[data-v-52a3b221] {\n  width: 22%;\n}\n.modprice-info .el-select[data-v-52a3b221] {\n  width: 20%;\n}\n.el-select + label[data-v-52a3b221],\n.el-input + label[data-v-52a3b221] {\n  margin-left: 15px;\n}\n.el-popover[data-v-52a3b221] {\n  text-align: center;\n}\n.el-popover .icon-smile[data-v-52a3b221] {\n  display: block;\n  margin: 15px auto;\n  width: 30px;\n  color: #B0C1D3;\n  font-size: 32px;\n}\n.el-popover .no-logist[data-v-52a3b221] {\n  margin: 21px 0;\n  color: #33475B;\n  font-size: 13px;\n}\n.logist-item[data-v-52a3b221] {\n  position: relative;\n  padding-left: 200px;\n  height: 50px;\n  color: #33475B;\n  text-align: left;\n}\n.logist-item .date[data-v-52a3b221] {\n  position: absolute;\n  left: 50px;\n  top: 2px;\n  width: 150px;\n}\n.logist-item i[data-v-52a3b221] {\n  margin-left: 10px;\n  display: inline-block;\n  color: #90a7c1;\n}\n.logist-item span[data-v-52a3b221] {\n  line-height: 16px;\n}\n.logist-list[data-v-52a3b221] {\n  margin: 20px;\n}\n.fly-line[data-v-52a3b221] {\n  position: absolute;\n  left: 30px;\n  top: 33px;\n  height: 88%;\n  width: 20px;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABtBAMAAABaYfxNAAAAGFBMVEX///+wwdPV3ui4yNjE0d7g5+60xNb4+fsuyMmZAAAAWElEQVQoz2OgHmAyVoAwFAWFIAxDQWEEAyGFUIwJRt0z6p5B4h7yAKtbSgCIZncUFBQpADJYBIHAAcgIBDFEgQygDFAOyEgEMcTgDLgUXDFcO9xAuBX4AABtahIz7uvqhAAAAABJRU5ErkJggg==) center 10px repeat-y;\n}\n.fly-line i[data-v-52a3b221] {\n  display: inline-block;\n  padding-bottom: 13px;\n  font-size: 20px;\n  color: #5488f9;\n  background-color: #fff;\n}\n.calu-box[data-v-52a3b221] {\n  position: relative;\n}\n.calu-box a[data-v-52a3b221] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 18px;\n  width: 30px;\n  line-height: 18px;\n  color: #33475B;\n  font-size: 14px;\n  border-left: 1px solid #bfc4d9;\n  text-align: center;\n}\n.calu-box .icon-arrdown[data-v-52a3b221] {\n  top: 18px;\n  border-top: 1px solid #bfc4d9;\n}\n.ui-spec[data-v-52a3b221] {\n  margin-top: 10px;\n  color: #7D98B6;\n  font-size: 13px;\n}\n.totalcost-box[data-v-52a3b221] {\n  margin: 20px 0 10px 0;\n  min-height: 114px;\n  color: #32475A;\n  background-color: #EBF0F6;\n}\n.totalcost-right[data-v-52a3b221] {\n  position: relative;\n  float: right;\n  margin-top: 10px;\n  padding-left: 30px;\n  width: 150px;\n}\n.totalcost-right label[data-v-52a3b221] {\n  color: #32475a;\n  font-weight: bold;\n}\n.totalcost-right p[data-v-52a3b221] {\n  line-height: 22px;\n}\n.totalcost-right .el-checkbox[data-v-52a3b221] {\n  position: absolute;\n  left: 0;\n}\n.calu-cost[data-v-52a3b221] {\n  margin: 12px 0;\n}\n.calu-cost .red-tip[data-v-52a3b221] {\n  font-size: 18px;\n  font-weight: bold;\n}\n.refund-form .ui-lbl[data-v-52a3b221],\n.refund-form .el-form-item__label[data-v-52a3b221] {\n  color: #33475B;\n  font-size: 14px;\n  font-weight: bold;\n}\n.refund-form .el-form-item__content[data-v-52a3b221] {\n  position: relative;\n}\n.refund-form .el-input__inner[data-v-52a3b221] {\n  height: 40px;\n  border-radius: 0;\n}\n.unit-input[data-v-52a3b221] {\n  position: absolute;\n  right: 10px;\n  bottom: 0;\n  color: #33475B;\n}\n.unit-input i[data-v-52a3b221] {\n  color: #DFE3EB;\n  margin-right: 5px;\n}\n.refund-tab .double-header[data-v-52a3b221],\n.price-tab .double-header[data-v-52a3b221] {\n  border-bottom: 1px solid #dfe3eb;\n}\n.refund-tab .double-td[data-v-52a3b221],\n.price-tab .double-td[data-v-52a3b221] {\n  padding-top: 30px;\n  width: 20%;\n  border: 0;\n}\n.refund-tab .double-span-item[data-v-52a3b221],\n.price-tab .double-span-item[data-v-52a3b221] {\n  padding-left: 20px;\n  width: 40%;\n}\n.refund-tab .double-column[data-v-52a3b221],\n.price-tab .double-column[data-v-52a3b221] {\n  border-bottom: 1px solid #dfe3eb;\n}\n.refund-tab .calu-box[data-v-52a3b221],\n.price-tab .calu-box[data-v-52a3b221] {\n  margin-top: -10px;\n}\n.one-sel[data-v-52a3b221] {\n  margin: 10px 0 20px 0;\n}\n.confirm-btn[data-v-52a3b221] {\n  margin: 10px 0 0 20px;\n}\n.price-tab .double-header .double-td[data-v-52a3b221] {\n  padding-top: 0;\n}\n.price-tab .double-td[data-v-52a3b221] {\n  width: 12%;\n}\n.price-tab .double-span-item[data-v-52a3b221] {\n  width: 40%;\n}\n.price-tab .el-input[data-v-52a3b221] {\n  margin-top: -10px;\n  width: 60%;\n}\n.router-view[data-v-52a3b221] {\n  margin: 62px auto 0 auto;\n  width: 1200px;\n}\n.inner-top[data-v-52a3b221] {\n  position: absolute;\n  margin-top: -35px;\n  margin-bottom: 20px;\n}\n.inner-top a[data-v-52a3b221] {\n  color: #7C98B6;\n}\n.inner-top i[data-v-52a3b221] {\n  color: #7C98B6;\n  font-weight: bold;\n  font-size: 18px;\n  margin-right: 10px;\n}\n.topMenu[data-v-52a3b221] {\n  display: none;\n}\n.order-box[data-v-52a3b221] {\n  display: box;\n  display: -webkit-box;\n}\n.order-info[data-v-52a3b221] {\n  width: 26%;\n  box-flex: 1;\n  -webkit-box-flex: 1;\n  border-right: 1px solid #dfe3eb;\n}\n.order-info h1[data-v-52a3b221] {\n  padding: 14px 20px;\n  font-size: 16px;\n  background-color: #F5F8FA;\n  color: #33475B;\n  box-sizing: border-box;\n}\n.order-state[data-v-52a3b221] {\n  width: 74%;\n  box-flex: 1;\n  -webkit-box-flex: 4;\n}\n.info-list[data-v-52a3b221] {\n  padding: 22px;\n  color: #4F6D95;\n  font-size: 13px;\n}\n.info-list li[data-v-52a3b221] {\n  min-height: 24px;\n  line-height: 24px;\n}\n.info-list li p[data-v-52a3b221] {\n  line-height: 26px;\n}\n.info-list li label[data-v-52a3b221] {\n  display: inline-block;\n  width: 68px;\n}\n.info-list .tit[data-v-52a3b221] {\n  margin-top: 20px;\n  font-weight: bold;\n}\n.info-list span[data-v-52a3b221] {\n  text-align: left;\n}\n.info-list .ui-buyer[data-v-52a3b221] {\n  margin: 20px 0;\n}\n.info-list .ui-buyer label[data-v-52a3b221] {\n  word-spacing: 21px;\n}\n.warm-tip[data-v-52a3b221] {\n  padding: 20px 15px;\n  font-size: 13px;\n  color: #4F6D95;\n  border-top: 1px solid #dfe3eb;\n}\n.warm-tip label[data-v-52a3b221] {\n  font-weight: bold;\n}\n.state-box[data-v-52a3b221] {\n  position: relative;\n  margin: 50px;\n  padding-left: 40px;\n  min-height: 288px;\n}\n.state-box p[data-v-52a3b221] {\n  margin: 20px 0 30px 0;\n  color: #4F6D95;\n}\n.state-box .pos[data-v-52a3b221] {\n  margin-top: 30px;\n}\n.state-box .desc[data-v-52a3b221] {\n  line-height: 20px;\n}\n.state-box .el-button + .el-button[data-v-52a3b221] {\n  margin-left: -4px;\n}\n.state-tit[data-v-52a3b221] {\n  font-size: 16px;\n}\n.state-tit [class^=\"icon\"][data-v-52a3b221] {\n  position: absolute;\n  left: 0;\n  top: -6px;\n  font-size: 30px;\n  font-weight: normal;\n}\n.state-tit .icon-fail[data-v-52a3b221] {\n  color: #FF3B6E;\n}\n.state-tit .icon-ok[data-v-52a3b221] {\n  color: #97D94E;\n}\n.state-tit .icon-warn[data-v-52a3b221] {\n  color: #5488F9;\n}\n.btn-blue[data-v-52a3b221] {\n  margin-right: 10px;\n}\n.pay-fact[data-v-52a3b221] {\n  /*padding: 20px 30px 30px 0;*/\n  padding: 14px 30px 14px 0;\n  text-align: right;\n  font-size: 14px;\n  /*color: #f86563;*/\n}\n.pay-fact label[data-v-52a3b221] {\n  color: #4F6D95;\n  font-size: 14px;\n  font-weight: bold;\n}\n.pay-fact p[data-v-52a3b221] {\n  color: #33475B;\n  line-height: 28px;\n}\n.pay-fact i[data-v-52a3b221] {\n  font-size: 16px;\n}\n.order-list[data-v-52a3b221] {\n  /*.colspan{\n    border-bottom: 1px solid @border;  \n  }*/\n}\n.order-list li[data-v-52a3b221] {\n  border-bottom: 0;\n}\n.order-list .double-tab[data-v-52a3b221] {\n  position: relative;\n}\n.order-list .double-td[data-v-52a3b221] {\n  width: 11%;\n  min-height: 95px;\n  border-right: 1px solid transparent;\n  border-bottom: 1px solid #dfe3eb;\n}\n.order-list .double-one[data-v-52a3b221] {\n  margin-bottom: 12px;\n}\n.order-list .double-span-item[data-v-52a3b221] {\n  width: 56%;\n  padding: 20px 0 10px 99px;\n}\n.order-list .double-column[data-v-52a3b221] {\n  min-height: 95px;\n}\n.order-list .double-column .double-td[data-v-52a3b221] {\n  padding-top: 16px;\n}\n.order-list .double-header .double-span-item[data-v-52a3b221] {\n  padding: 0 0 0 50px;\n}\n.order-list .double-header .double-td[data-v-52a3b221] {\n  min-height: 0;\n  border-bottom: 0;\n}\n.order-list .all-feight[data-v-52a3b221] {\n  /*position: relative;*/\n  border-left: 1px solid #dfe3eb;\n  border-bottom: 0;\n}\n.order-list .all-feight span[data-v-52a3b221] {\n  position: absolute;\n  top: 50%;\n  right: 50px;\n  margin-top: 15px;\n}\n.order-list .last-feight[data-v-52a3b221] {\n  border-bottom: 1px solid #dfe3eb;\n}\n.order-list li.logistics-column[data-v-52a3b221] {\n  padding-left: 20px;\n  width: 87.4%;\n  height: 35px;\n  line-height: 35px;\n  border-right: 1px solid #dfe3eb;\n  border-bottom: 1px solid #dfe3eb;\n}\n.order-list li.logistics-column p[data-v-52a3b221] {\n  font-size: 13px;\n}\n.order-list li.logistics-column span[data-v-52a3b221],\n.order-list li.logistics-column b[data-v-52a3b221],\n.order-list li.logistics-column i[data-v-52a3b221] {\n  margin-right: 10px;\n}\n.order-list li.logistics-column .el-button--text i[data-v-52a3b221] {\n  margin-left: 10px;\n}\n.tit .el-button--text[data-v-52a3b221] {\n  float: right;\n}\n.blue-link[data-v-52a3b221] {\n  color: #5a8cf9;\n}\n.copy-txt[data-v-52a3b221] {\n  margin: -10px 0;\n  min-height: 40px;\n  line-height: 24px;\n  width: 100%;\n  border: 0;\n  text-align: left;\n  overflow: hidden;\n  font-family: 'Microsoft Yahei';\n  color: #4F6D95;\n  outline: none;\n}\n.deliver-name[data-v-52a3b221] {\n  display: inline-block;\n  width: 98%;\n  /*.text-ellipsis()*/\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n",""])},809:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"router-view"},[e("div",{staticClass:"inner-top"},[e("a",{attrs:{href:"javascript:;"},on:{click:t.backToList}},[e("i",{staticClass:"icon-font icon-left"}),t._v("\n    返回订单物流")])]),t._v(" "),e("div",{staticClass:"logistic-container"},[e("div",{staticClass:"order-box"},[e("div",{staticClass:"order-info"},[e("h1",[t._v("订单信息")]),t._v(" "),e("ul",{staticClass:"info-list"},[e("li",[e("label",[t._v("订单编号：")]),t._v(" "),e("span",[t._v(t._s(t.info.orderCode))])]),t._v(" "),e("li",{staticClass:"ui-buyer"},[e("label",[t._v("买 家：")]),t._v(" "),e("span",[t._v(t._s(t.info.buyer?t.info.buyer.nickname:"-"))])]),t._v(" "),e("li",[e("label",[t._v("创建时间：")]),t._v(" "),t.info.createTime?e("span",[t._v(t._s(t._f("time-formater-has-hour")(t.info.createTime)))]):e("span",[t._v("-")])]),t._v(" "),e("li",[e("label",[t._v("付款时间：")]),t._v(" "),t.info.payTime?e("span",[t._v(t._s(t._f("time-formater-has-hour")(t.info.payTime)))]):e("span",[t._v("-")])]),t._v(" "),e("li",[e("label",[t._v("发货时间：")]),t._v(" "),t.info.deliverTime?e("span",[t._v(t._s(t._f("time-formater-has-hour")(t.info.deliverTime)))]):e("span",[t._v("-")])]),t._v(" "),e("li",[e("label",[t._v("成交时间：")]),t._v(" "),t.info.finishTime?e("span",[t._v(t._s(t._f("time-formater-has-hour")(t.info.finishTime)))]):e("span",[t._v("-")])]),t._v(" "),e("li",{staticClass:"tit"},[e("label",[t._v("收货信息：")]),t._v(" "),e("span",[e("el-button",{attrs:{type:"text",id:"copy"},on:{click:t.zlip}},[t._v("复制")])],1)]),t._v(" "),t.info.address?e("li",{staticClass:"ui-address"},[e("textarea",{staticClass:"copy-txt",attrs:{type:"text",id:"copyinput",readOnly:""}})]):t._e(),t._v(" "),e("li",{staticClass:"tit"},[e("label",[t._v("买家留言：")]),t._v(" "),e("span",[t._v(t._s(t.info.message?t.info.message:"-"))])])])]),t._v(" "),0==t.info.status?e("div",{staticClass:"order-state"},[e("div",{staticClass:"state-box"},[t._m(0),t._v(" "),e("p",[t._v("如买家未在"),e("i",{staticClass:"red-tip"},[t._v(t._s(t.restTime))]),t._v("内付款，订单将超时自动关闭")]),t._v(" "),e("el-button",{staticClass:"btn-blue",attrs:{type:"primary"},on:{click:function(n){t.modPrice()}}},[t._v("修改价格")]),t._v(" "),e("el-button",{staticClass:"btn-trans",on:{click:function(n){t.closeModel=!0}}},[t._v("关闭订单")])],1),t._v(" "),t._m(1)]):t._e(),t._v(" "),1==t.info.status?e("div",{staticClass:"order-state"},[e("div",{staticClass:"state-box"},[t._m(2),t._v(" "),e("p",[t._v("买家已付款，请尽快发货")]),t._v(" "),e("el-button",{staticClass:"btn-blue",attrs:{type:"primary"},on:{click:function(n){t.deliverModel=!0}}},[t._v("发货")]),t._v(" "),0!=t.info.refundTag?e("el-button",{staticClass:"btn-trans",on:{click:function(n){t.fundModel=!0}}},[t._v("退款")]):e("el-button",{staticClass:"btn-trans",on:{click:function(n){t.closeModel=!0}}},[t._v("关闭订单")]),t._v(" "),0!=t.info.refundTag?e("p",{staticClass:"desc"},[t._v("您已对商品\n            "),e("a",{staticClass:"blue-link",attrs:{href:"#"}},[t._v("“"+t._s(t.info.name)+"”")]),t._v("\n            进行了退款，退款金额："),e("i",{staticClass:"red-tip"},[t._v(t._s(t.info.amountUnit)+" "+t._s(t.refund.refundAmount))])]):t._e()],1),t._v(" "),t._m(3)]):t._e(),t._v(" "),2==t.info.status?e("div",{staticClass:"order-state"},[e("div",{staticClass:"state-box"},[t._m(4),t._v(" "),t._m(5),t._v(" "),e("el-button",{staticClass:"btn-blue",attrs:{type:"primary"},on:{click:t.modLogic}},[t._v("修改物流")])],1),t._v(" "),t._m(6)]):t._e(),t._v(" "),3==t.info.status?e("div",{staticClass:"order-state"},[t._m(7),t._v(" "),t._m(8)]):t._e(),t._v(" "),4==t.info.status?e("div",{staticClass:"order-state"},[e("div",{staticClass:"state-box"},[t._m(9),t._v(" "),t.info.refundTag?e("p",[t._v("退款金额："),e("i",{staticClass:"red-tip"},[t._v(t._s(t.info.amountUnit)+" "+t._s(t.refund.refundAmount))])]):t._e()])]):t._e()]),t._v(" "),e("div",{staticClass:"order-list"},[e("ul",{staticClass:"double-tab"},[t._m(10),t._v(" "),t.info.waybill?e("li",{staticClass:"logistics-column clearfix"},[e("p",[e("b",[t._v("包裹")]),t._v(" "),e("span",[t._v(t._s(t.info.waybill.companyName))]),t._v(" "),e("label",[t._v("运单号：")]),t._v(" "),e("span",[t._v(t._s(t.info.waybill.waybillNumber))]),t._v(" "),e("i",{staticClass:"red-tip"},[t._v(t._s(t.info.waybill.posttime)+" "+t._s(t.info.waybill.content))]),t._v(" "),t.info.waybill&&t.info.waybill.waybillId?e("el-popover",{ref:"popovers",attrs:{placement:"top-start",title:"",width:"620",trigger:"click"}},[e("div",{staticClass:"fly-line"},[e("i",{staticClass:"icon-fly"})]),t._v(" "),e("ul",{staticClass:"logist-list"},t._l(t.logisList,function(n){return e("li",{staticClass:"logist-item"},[e("div",{staticClass:"date"},[e("label",[t._v(t._s(t._f("time-formater-no-hour")(n.date)))]),t._v(" "),e("i",[t._v(t._s(t._f("time-formater-only-hour")(n.date)))])]),t._v(" "),e("span",[t._v(t._s(n.content))])])}))]):e("el-popover",{ref:"popovers",attrs:{placement:"top-start",title:"",width:"342",trigger:"click"}},[e("i",{staticClass:"icon-smile"}),t._v(" "),e("p",{staticClass:"no-logist"},[t._v("无法检测物流状态，请到相应物流查询网站查询物流！")])]),t._v(" "),e("el-button",{directives:[{name:"popover",rawName:"v-popover:popovers",arg:"popovers"}],attrs:{type:"text"}},[t._v("更多"),e("i",{staticClass:"icon-arrdown"})])],1)]):t._e(),t._v(" "),t._l(t.info.itemList,function(n,a){return e("li",{staticClass:"clearfix"},[e("div",{staticClass:"double-column"},[e("div",{staticClass:"double-span-item double-td"},[e("img",{attrs:{src:n.img+"?x-oss-process=image/resize,h_64,w_64",alt:""}}),t._v(" "),e("div",{staticClass:"double-one"},[e("span",{staticClass:"tit"},[t._v(t._s(n.name))])]),t._v(" "),e("div",{staticClass:"double-two"},[e("span",{staticClass:"tit"},[t._v(t._s(n.specKey))])])]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(t.info.amountUnit)+" "+t._s(n.changePrice?n.changePrice:n.price))]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(n.quantity))]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("\n              "+t._s(t.info.status?t.status[t.info.status]:t.status[0])+"\n            ")]),t._v(" "),e("div",{staticClass:"double-td all-feight",class:{"last-feight":a==t.info.itemList.length-1}},[0==a?e("span",[t._v(t._s(t.info.amountUnit)+" "+t._s(t.info.totalCost))]):t._e()])])])})],2),t._v(" "),1==t.info.status&&1==t.info.refundTag?e("div",{staticClass:"pay-fact"},[e("p",[t._v("应收金额："),e("label",[t._v(t._s(t.info.amountUnit)+" "+t._s(t.info.amount))])]),t._v(" "),e("p",[t._v("退款："),e("label",[t._v(t._s(t.info.amountUnit)+" "+t._s(t.info.amount))])]),t._v(" "),e("p",[e("label",[t._v("实际总计：")]),e("i",{staticClass:"red-tip"},[t._v(t._s(t.info.amountUnit)+" 94")])])]):e("div",{staticClass:"pay-fact"},[e("label",[t._v("应收金额：")]),t._v(" "),e("i",{staticClass:"red-tip"},[t._v(t._s(t.info.amountUnit)+" "+t._s(t.info.amount))])])]),t._v(" "),e("el-dialog",{attrs:{title:"修改价格"},model:{value:t.priceModel,callback:function(n){t.priceModel=n},expression:"priceModel"}},[e("ul",{staticClass:"double-tab price-tab"},[e("li",{staticClass:"double-header clearfix"},[e("div",{staticClass:"double-span-item double-td"},[t._v("商品名称")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("单价(美元)")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("数量")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("小计(美元)")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("涨价或降价")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("运费(美元)")])]),t._v(" "),t._l(t.info.itemList,function(n,a){return e("li",{staticClass:"double-column clearfix"},[e("div",{staticClass:"double-span-item double-td"},[e("div",{staticClass:"double-one"},[e("span",{staticClass:"tit"},[t._v(t._s(n.name))])])]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(n.changePrice?n.changePrice:n.price))]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(n.quantity))]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(n.quantity*n.price))]),t._v(" "),e("div",{staticClass:"double-td"},[e("el-input",{attrs:{value:"+0"},on:{blur:function(n){t.caluActPay(a)}},model:{value:t.info.itemList[a].pricespan,callback:function(n){t.info.itemList[a].pricespan=n},expression:"info.itemList[index].pricespan"}})],1),t._v(" "),e("div",{staticClass:"double-td"},[0==a?e("el-input",{on:{blur:function(n){t.caluActPay(a)}},model:{value:t.priceFeight,callback:function(n){t.priceFeight=n},expression:"priceFeight"}}):t._e()],1)])})],2),t._v(" "),e("div",{staticClass:"modprice-info"},[e("p",[e("label",[t._v("收货信息：")]),t._v(" "),t.info.address?e("span",[t._v("\n            "+t._s(t.info.address1)+"\n            "+t._s(t.info.address2)+"\n              ")]):t._e()]),t._v(" "),e("p",[e("label",[t._v("买家实付：")]),t._v(" "),t.priceOPay?e("span",[t._v(t._s(t.priceOPay)+" + "+t._s(t.priceFeight)),e("i",{staticClass:"red-tip"},[t._v(t._s(t.priceSpan))]),t._v(" = "+t._s(t.priceLastPay))]):t._e()]),t._v(" "),e("p",{staticClass:"tips76"},[t._v("(买家实付=原价+运费+涨价或减价)")])]),t._v(" "),e("div",{staticClass:"confirm-btn"},[e("el-button",{staticClass:"confirm",attrs:{type:"primary"},on:{click:t.modpriceOk}},[t._v("确定")]),t._v(" "),e("el-button",{staticClass:"close",on:{click:function(n){t.priceModel=!1}}},[t._v("取消")])],1)]),t._v(" "),e("el-dialog",{attrs:{title:t.logistmodelname},model:{value:t.deliverModel,callback:function(n){t.deliverModel=n},expression:"deliverModel"}},[e("el-table",{attrs:{data:t.info.itemList},on:{select:t.selectProduct,"select-all":t.selectAll}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),e("el-table-column",{attrs:{property:"name",label:"商品",width:"270"},scopedSlots:t._u([["default",function(n){return[e("el-popover",{attrs:{trigger:"hover",placement:"right","popper-class":"cate-pop"}},[e("p",[t._v(t._s(n.row.name))]),t._v(" "),e("span",{staticClass:"deliver-name",slot:"reference"},[t._v("\n                "+t._s(n.row.name)+"\n              ")])])]}]])}),t._v(" "),e("el-table-column",{attrs:{property:"quantity",label:"数量"},scopedSlots:t._u([["default",function(n){return[t._v("\n            x "+t._s(n.row.quantity)+"\n          ")]}]])}),t._v(" "),e("el-table-column",{attrs:{property:"",label:"物流公司"},scopedSlots:t._u([["default",function(n){return[t._v("\n            "+t._s(t.logistother?t.formcompname:t.formcomp)+"\n          ")]}]])}),t._v(" "),e("el-table-column",{attrs:{property:"orderCode",label:"单号"},scopedSlots:t._u([["default",function(n){return[t._v("\n            "+t._s(t.formlogistNum)+"\n          ")]}]])})],1),t._v(" "),e("div",{staticClass:"modprice-info"},[e("p",[e("label",[t._v("收货信息：")]),t._v(" "),t.info.address?e("span",[t._v("\n            "+t._s(t.info.address1)+"\n            "+t._s(t.info.address2)+"\n           ")]):t._e()]),t._v(" "),e("p",[e("label",[t._v("物流公司：")]),t._v(" "),e("el-select",{attrs:{placeholder:"请选择"},on:{change:t.selectComp},model:{value:t.formcomp,callback:function(n){t.formcomp=n},expression:"formcomp"}},t._l(t.comps,function(t){return e("el-option",{key:t.id,attrs:{label:t.dictdataName,value:t.dictdataName}})})),t._v(" "),e("label",[t._v("快递单号：")]),t._v(" "),e("el-input",{staticClass:"ui-logist",model:{value:t.formlogistNum,callback:function(n){t.formlogistNum=n},expression:"formlogistNum"}}),t._v(" "),t.logistother?e("label",[t._v("其他物流：")]):t._e(),t._v(" "),t.logistother?e("el-input",{staticClass:"ui-logist",attrs:{placeholder:"请输入物流公司名称"},model:{value:t.formcompname,callback:function(n){t.formcompname=n},expression:"formcompname"}}):t._e()],1)]),t._v(" "),e("div",{staticClass:"confirm-btn"},[e("el-button",{staticClass:"confirm",attrs:{type:"primary"},on:{click:t.deliverOk}},[t._v("确定")]),t._v(" "),e("el-button",{staticClass:"close",on:{click:function(n){t.deliverModel=!1}}},[t._v("取消")])],1)],1),t._v(" "),e("el-dialog",{attrs:{title:"退款"},model:{value:t.fundModel,callback:function(n){t.fundModel=n},expression:"fundModel"}},[e("ul",{staticClass:"double-tab refund-tab"},[e("li",{staticClass:"double-header clearfix"},[e("div",{staticClass:"double-span-item double-td"},[t._v("商品名称")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("价格(美元)")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("数量")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("单价(美元)")])]),t._v(" "),t._l(t.info.itemList,function(n,a){return e("li",{staticClass:"double-column clearfix"},[e("div",{staticClass:"double-span-item double-td"},[e("div",{staticClass:"double-one"},[e("span",{staticClass:"tit"},[t._v(t._s(n.name))])]),t._v(" "),e("div",{staticClass:"double-two"},[e("span",{staticClass:"tit"},[t._v(t._s(n.specKey))])])]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(n.quantity*n.price))]),t._v(" "),e("div",{staticClass:"double-td"},[e("div",{staticClass:"calu-box"},[e("el-input",{model:{value:t.info.itemList[a].formnum,callback:function(n){t.info.itemList[a].formnum=n},expression:"info.itemList[index].formnum"}}),t._v(" "),e("a",{staticClass:"icon-arrup",attrs:{href:"javascript:;"},on:{click:function(e){t.addNum(a,n.quantity)}}}),t._v(" "),e("a",{staticClass:"icon-arrdown",attrs:{href:"javascript:;"},on:{click:function(n){t.reduceNum(a)}}})],1)]),t._v(" "),e("div",{staticClass:"double-td"},[t._v(t._s(n.price))])])})],2),t._v(" "),e("div",{staticClass:"totalcost-box clearfix"},[e("div",{staticClass:"totalcost-right"},[e("p",{staticClass:"calu-cost"},[t._v("小计：\n            "),e("label",[e("i",{staticClass:"red-tip"},[t._v(t._s(t.info.amountUnit)+" "+t._s(t.refundfm.refundAmountCal))])])]),t._v(" "),e("p",[t._v("可退金额：\n            "),e("label",[t._v("- "+t._s(t.info.amountUnit)+" "+t._s(t.info.amount))])]),t._v(" "),e("p",[e("el-checkbox"),t._v("退还运费：\n            "),e("label",[t._v(t._s(t.info.amountUnit)+" "+t._s(t.info.totalCost))])],1)])]),t._v(" "),e("el-form",{staticClass:"refund-form"},[e("el-form-item",{attrs:{label:""}},[e("label",{staticClass:"ui-lbl"},[t._v("手动修改库存金额")]),t._v(" "),e("el-checkbox",{model:{value:t.refundfm.returnInvTag,callback:function(n){t.refundfm.returnInvTag=n},expression:"refundfm.returnInvTag"}},[t._v("库存返还")]),t._v(" "),e("el-input",{attrs:{placeholder:""},model:{value:t.refundfm.refundAmount,callback:function(n){t.refundfm.refundAmount=n},expression:"refundfm.refundAmount"}}),t._v(" "),e("i",{staticClass:"unit-input"},[e("i",[t._v("|")]),t._v(" 美元")])],1),t._v(" "),e("el-form-item",{attrs:{label:"退款理由"}},[e("el-input",{attrs:{placeholder:"请输入退款理由"},model:{value:t.refundfm.refundReason,callback:function(n){t.refundfm.refundReason=n},expression:"refundfm.refundReason"}})],1)],1),t._v(" "),e("div",{staticClass:"confirm-btn"},[e("el-button",{staticClass:"confirm",attrs:{type:"primary"},on:{click:t.deliverOk}},[t._v("确定")]),t._v(" "),e("el-button",{staticClass:"close",on:{click:function(n){t.fundModel=!1}}},[t._v("取消")])],1)],1),t._v(" "),e("el-dialog",{attrs:{title:"关闭订单",size:"tiny"},model:{value:t.closeModel,callback:function(n){t.closeModel=n},expression:"closeModel"}},[e("el-select",{staticClass:"one-sel",attrs:{placeholder:"请选择一个取消订单的理由"},model:{value:t.closedReason,callback:function(n){t.closedReason=n},expression:"closedReason"}},[e("el-option",{attrs:{value:"close_reason_1",label:"无法联系上买家"}}),t._v(" "),e("el-option",{attrs:{value:"close_reason_2",label:"买家误拍或者重拍了"}}),t._v(" "),e("el-option",{attrs:{value:"close_reason_3",label:"买家无诚意完成交易"}}),t._v(" "),e("el-option",{attrs:{value:"close_reason_4",label:"已经缺货无法交易"}}),t._v(" "),e("el-option",{attrs:{value:"close_reason_5",label:"其他"}})],1),t._v(" "),e("div",{staticClass:"confirm-btn"},[e("el-button",{staticClass:"confirm",attrs:{type:"primary"},on:{click:t.closeOk}},[t._v("确定")]),t._v(" "),e("el-button",{staticClass:"close",on:{click:function(n){t.closeModel=!1}}},[t._v("取消")])],1)],1)],1)])},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("h2",{staticClass:"state-tit"},[e("i",{staticClass:"icon-warn"}),t._v("订单状态：商品已拍下，等待买家付款")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"warm-tip"},[e("label",[t._v("温馨提醒：")]),t._v("请务必等待订单状态变更为“买家已付款，等待卖家发货” 后再进行发货。\n        ")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("h2",{staticClass:"state-tit"},[e("i",{staticClass:"icon-warn"}),t._v("订单状态：买家已付款，等待商家发货")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"warm-tip"},[e("label",[t._v("温馨提醒：")]),t._v("如果无法发货，请尽快与买家联系，并说明情况后进行退款。\n        ")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("h2",{staticClass:"state-tit"},[e("i",{staticClass:"icon-warn"}),t._v("订单状态：商家已发货，等待买家收货")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("p",[t._v("买家如在"),e("i",{staticClass:"red-tip"},[t._v("30天")]),t._v("内确认收货，交易将自动完成")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"warm-tip"},[e("label",[t._v("温馨提醒：")]),t._v("请及时关注您的包裹物流状态，确保能配送至买家手中。如买家表示未收到货或者货物有问题，请及时联系买家积极处理，友好协商。\n        ")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"state-box"},[e("h2",{staticClass:"state-tit"},[e("i",{staticClass:"icon-ok"}),t._v("订单状态：交易成功")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"warm-tip"},[e("label",[t._v("温馨提醒：")]),t._v("如果无法发货，请尽快与买家联系，并说明情况后进行退款。\n        ")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("h2",{staticClass:"state-tit"},[e("i",{staticClass:"icon-fail"}),t._v("订单状态：订单关闭")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("li",{staticClass:"double-header clearfix"},[e("div",{staticClass:"double-span-item double-td"},[t._v("商品信息")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("单价(美元)")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("数量")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("状态")]),t._v(" "),e("div",{staticClass:"double-td"},[t._v("运费(美元)")])])}]},t.exports.render._withStripped=!0},896:function(t,n,e){var a=e(619);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(88)("b5af3a6c",a,!1)}});
//# sourceMappingURL=42.85511e5d61580c980b05.js.map