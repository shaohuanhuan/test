define(function(require, exports, module) {

	var $ = require("$"),
		//abtest = require("./widget/abtest"),
		top = require("./component/top");//顶部
	    common = require("./component/common"),//header

	exports.init = function(data) {
		$.extend(data,data),
		//console.log(data)
		top.a(data).appendTo(data.container)
		common.a(data).appendTo(data.container)
		// abtest(a,function(b) {
		// 		top[b](a).appendTo(a.container),//顶部弹出层
		// 		common[b](a).appendTo(a.container)//header初始化
		// })
	}

})