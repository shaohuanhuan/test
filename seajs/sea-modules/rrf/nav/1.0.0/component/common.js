/*
*common
*通用头部渲染
*/
define(function(require, exports, module) {

	var $ = require("$"),
	    cookie = require("arale/cookie/1.0.2/cookie"),
	    component = require("rrf/nav/1.0.0/widget/component");
	
	exports.a = function(a) {
        return new component({
			className: "global-common",
			model: a
		}).render()

	}
	var component = component.extend({
		attrs: {
            //模版
			template: require("rrf/nav/1.0.0/tpl/component-common.tpl#")
		},
		//
		templateHelpers: {
			//判断一级菜单选中
			showCurrent: function(a) {
				return this.menu && this.menu.indexOf(a) > -1 ? "global-nav-item-current" : ""
			},
		    //判断二级菜单选中
			showSubCurrent: function(a) {
				return this.menu && this.menu.indexOf(a) > -1 ? "global-header-subnav-item-current" : ""
			}
		},
		//模版渲染
		render: function() {
			var a = this.get("model");
			//判断是否二级菜单	s0  s1 s2有二级菜单
			a.showSubNav = a.menu && (a.menu.indexOf("s0") > -1 || a.menu.indexOf("s1") > -1 || a.menu.indexOf("s2") > -1 || a.menu.indexOf("s3") > -1|| a.menu.indexOf("s5") > -1|| a.menu.indexOf("s8") > -1) ? !0 : !1;
			//判断a对象中的s0-7,如果有 负责a 对象 menu-n等于true 用户判断已经菜单选择
			for (var b = 0; 9 > b; b++)
				a.menu.indexOf("s" + b) > -1 && (a["menu-" + b] = !0);
		   //复制现有的 A对象的指给MODEL
			return this.set("model", a), component.superclass.render.call(this)
		}

	});
})