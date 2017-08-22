define("alipay/poptip/1.3.0/poptip-tpl", ["gallery/handlebars/1.0.0/handlebars"], function(a, b, c) {
	var d = a("gallery/handlebars/1.0.0/handlebars");
	(function() {
		var a = d.template;
		d.templates = d.templates || {}, c.exports = a(function(a, b, c, d, e) {
			this.compilerInfo = [2, ">= 1.0.0-rc.3"], c = c || a.helpers, e = e || {};
			var g, f = "",
				h = "function",
				i = this.escapeExpression;
			return f += '<div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '">\n    <div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-shadow">\n    <div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-container">\n        <div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-arrow" data-role="arrow">\n            <em>◆</em>\n            <span>◆</span>\n        </div>\n        <a class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-close" href="javascript:;" data-action="close" data-role="close">×</a>\n        <img class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-icon" data-role="icon" alt="poptip-icon" />\n        <div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-box" data-role="content">\n            <div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-text" data-role="text"></div>\n            <div class="', (g = c.classPrefix) ? g = g.call(b, {
				hash: {},
				data: e
			}) : (g = b.classPrefix, g = typeof g === h ? g.apply(b) : g), f += i(g) + '-link" data-role="link">\n                <a target="_blank" href="javascript:;" data-action="close"></a>\n            </div>\n        </div>\n    </div>\n    </div>\n</div>\n'
		})
	})()