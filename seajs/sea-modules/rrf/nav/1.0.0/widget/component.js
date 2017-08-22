/*component 继承BASE，加入templatable，模版渲染*/
define(function(require, exports, module) {
	var $ = require("$"),
		base = require("arale/base/1.1.1/base"),
		templatable = require("arale/templatable/0.9.2/templatable"),
		component = base.extend({
			Implements: templatable,
			attrs: {
				data: {}
			},
			//渲染模版
			render: function() {
				var a = this.compile();
				return this.element = $("<div> " + a + "</div>").addClass(this.get("className")), this
			},
			//模版内容插入到容器中
			appendTo: function(a) {
				return this.element.appendTo(a), this
			},
			//内容查找元素
			find: function(a) {
				return this.element.find(a)
			}
		});
	module.exports = component
})