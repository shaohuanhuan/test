/*
 *leftmenu
 *通用头部渲染
 */
define(function(require, exports, module) {

	var $ = require("$"),
		leftmenu = require("rrf/nav/1.0.0/widget/leftmenu");
	exports.a = function(a) {
		return new leftmenu({
			className: "third-nav",
			model: a
		}).render()
	}
	var leftmenu = leftmenu.extend({
		attrs: {
			//模版
			template: require("rrf/nav/1.0.0/tpl/accountset-common.tpl#")
		},
		//
		templateHelpers: {
			showLeftCurrent: function(a) {
				return this.menu && this.menu.indexOf(a) > -1 ? "third-nav-item-curr" : ""
			}
		},
		//模版渲染
		render: function() {
			var a = this.get("model");
			// //判断是否二级菜单	s0  s1 s2有二级菜单
			// a.showSubNav = a.menu && (a.menu.indexOf("s0") > -1 || a.menu.indexOf("s1") > -1 || a.menu.indexOf("s2") > -1) ? !0 : !1;
			// //判断a对象中的s0-7,如果有 负责a 对象 menu-n等于true 用户判断已经菜单选择
			// for (var b = 0; 8 > b; b++)
			// 	a.menu.indexOf("s" + b) > -1 && (a["menu-" + b] = !0);
			//复制现有的 A对象的指给MODEL
			//console.log(a.menuId);
            if(a.userType==1){
            	a.userM=false;
            }else{
            	a.userM=true;
            }
			switch (a.menuId) {
				case "account":
					a.account=true
					break;
				case "merchant":
					a.merchant=true
					break;
				case "problem":
					a.problem=true
					break;
				default:
				    a.other=true
			}
			return this.set("model", a), leftmenu.superclass.render.call(this)
		}

	});
})