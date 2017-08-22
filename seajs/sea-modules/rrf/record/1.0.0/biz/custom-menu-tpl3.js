define(function(require, exports, module) {
	var handlebars = require("gallery/handlebars/1.0.0/handlebars"),
		template = handlebars.template;
	module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
		this.compilerInfo = [3, ">= 1.0.0-rc.4"];
		helpers = helpers || Handlebars.helpers;
		blockHelperMissing = helpers.blockHelperMissing;
		data = data || {};
		var buffer = "",
			stack1, functionType = "function",
			escapeExpression = this.escapeExpression,
			selstack1 = this;
		u = helpers.blockHelperMissing;
		//	console.log(Handlebars);

		function program1(depth0, data, depth1) {
			// console.info("depth0");
			// console.info(depth0);
			// console.info("depth1");
			// console.info(depth1);
			// console.info(helpers.specialClass);
			var buffer = "",
				stack1, stack2;
			//项目CLASS
			buffer += '<li class="' + escapeExpression((stack1 = depth1.classPrefix, typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "-item ",
			//第一个最后一个样式
			(stack2 = helpers.specialClass) ? stack2 = stack2.call(depth0, {
				hash: {},
				data: data
			}) : (stack2 = depth0.specialClass, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2),
			buffer += escapeExpression(stack2) + " ", (stack2 = helpers["class"]) ? stack2 = stack2.call(depth0, {
				hash: {},
				data: data
			}) : (stack2 = helpers["class"], stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2),
			buffer += escapeExpression(stack2) + " ",
			o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.program(2, g, data),
				data: data
			}, (stack2 = helpers.disabled) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.disabled, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.disabled || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += '">\n                <a href ="',
			o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.programWithDepth(h, data, depth0),
				data: data
			}, (stack2 = helpers.dataLink) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.dataLink, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2),

			helpers.dataLink || (stack2 = blockHelperMissing.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),

			o = {
				hash: {},
				inverse: selstack1.program(6, i, data),
				fn: selstack1.noop,
				data: data
			}, (stack2 = helpers.dataLink) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.dataLink, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2),
			helpers.dataLink || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += '"\n                    ', o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.programWithDepth(j, data, depth0),
				data: data
			}, (stack2 = helpers.dataTarget) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.dataTarget, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.dataTarget || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += "\n                    ", o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.program(2, g, data),
				data: data
			}, (stack2 = helpers.disabled) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.disabled, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.disabled || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += "\n                    ", o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.program(10, k, data),
				data: data
			}, (stack2 = helpers.dataFundChange) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.dataFundChange, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.dataFundChange || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += "\n                    ", o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.programWithDepth(l, data, depth0),
				data: data
			}, (stack2 = helpers.dataTip) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.dataTip, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.dataTip || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += "\n                    ", o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.programWithDepth(m, data, depth0),
				data: data
			}, (stack2 = helpers.seed) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.seed, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.seed || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2),
			buffer += "\n                    ", o = {
				hash: {},
				inverse: selstack1.noop,
				fn: selstack1.programWithDepth(n, data, depth0),
				data: data
			}, (stack2 = helpers.dataAction) ? stack2 = stack2.call(depth0, o) : (stack2 = depth0.dataAction, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2), helpers.dataAction || (stack2 = u.call(depth0, stack2, o)), (stack2 || 0 === stack2) && (buffer += stack2), buffer += ">", (stack2 = helpers.text) ? stack2 = stack2.call(depth0, {
				hash: {},
				data: data
			}) : (stack2 = depth0.text, stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2),
			buffer += escapeExpression(stack2) + "</a>\n            </li>\n        "
			return buffer;
		}

		function g() {
			return "disabled"
		}

		function h(a, b, c) {
			var d;
			return escapeExpression((d = c.dataLink, typeof d === functionType ? d.apply(a) : d))
		}

		function i() {
			return "#"
		}

		function j(a, b, c) {
			var d, e = "";
			return e += 'target="' + escapeExpression((d = c.dataTarget, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		function k() {
			return 'data-fund-change="true"'
		}

		function l(a, b, c) {
			var d, e = "";
			return e += 'data-tip="' + escapeExpression((d = c.dataTip, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		function m(a, b, c) {
			var d, e = "";
			return e += 'seed="' + escapeExpression((d = c.seed, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		function n(a, b, c) {
			var d, e = "";
			return e += 'data-action="' + escapeExpression((d = c.dataAction, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		buffer += '<div class="', (o = helpers.classPrefix) ? o = o.call(depth0, {
			hash: {},
			data: data
		}) : (o = depth0.classPrefix, o = typeof o === functionType ? o.apply(depth0) : o), buffer += escapeExpression(o) + '">\n    <ul>\n        ',
		p = {
			hash: {},
			inverse: selstack1.noop,
			fn: selstack1.programWithDepth(program1, data, depth0),
			data: data
		}, (o = helpers.options) ? o = o.call(depth0, p) : (o = depth0.options, o = typeof o === functionType ? o.apply(depth0) : o),
		helpers.options || (o = helpers.blockHelperMissing.call(depth0, o, p)), (o || 0 === o) && (buffer += o),
		buffer += "\n    </ul>\n</div>\n"
		return buffer;
	})
})