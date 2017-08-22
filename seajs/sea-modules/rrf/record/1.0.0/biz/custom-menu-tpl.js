define(function(a, b, c) {
	var d = a("gallery/handlebars/1.0.0/handlebars");
	! function() {
		var a = d.template;
		d.templates = d.templates || {},
		c.exports = a(function(a, b, c, d, e) {
			console.log(a);
			console.log(b);
			function f(a, b, d) {
				console.info(b);
				var e, f, o, p = "";
				return p += '<li class="' + s((e = b.classPrefix, typeof e === r ? e.apply(a) : e)) + "-item ", 
				(f = c.specialClass) ? f = f.call(a, {
					hash: {},
					data: b
				}) : (f = a.specialClass, f = typeof f === r ? f.apply(a) : f),
				 p += s(f) + " ",
				  (f = c["class"]) ? f = f.call(a, {
					hash: {},
					data: b
				}) : (f = a["class"], f = typeof f === r ? f.apply(a) : f), 
				p += s(f) + " ", 
				o = {
					hash: {},
					inverse: t.noop,
					fn: t.program(2, g, b),
					data: b
				}, 
				(f = c.disabled) ? f = f.call(a, o) : (f = a.disabled, f = typeof f === r ? f.apply(a) : f), c.disabled || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), 
				p += '">\n                <a href="', 

				o = {
					hash: {},
					inverse: t.noop,
					fn: t.programWithDepth(h, b, a),
					data: b
				}, (f = c.dataLink) ? f = f.call(a, o) : (f = a.dataLink, f = typeof f === r ? f.apply(a) : f), c.dataLink || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), 

				o = {
					hash: {},
					inverse: t.program(6, i, b),
					fn: t.noop,
					data: b
				}, (f = c.dataLink) ? f = f.call(a, o) : (f = a.dataLink, f = typeof f === r ? f.apply(a) : f), c.dataLink || (f = u.call(a, f, o)), (f || 0 === f) && (p += f),
				 p += '"\n                    ', o = {
					hash: {},
					inverse: t.noop,
					fn: t.programWithDepth(j, b, a),
					data: b
				}, (f = c.dataTarget) ? f = f.call(a, o) : (f = a.dataTarget, f = typeof f === r ? f.apply(a) : f), c.dataTarget || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), 
				p += "\n                    ", o = {
					hash: {},
					inverse: t.noop,
					fn: t.program(2, g, b),
					data: b
				}, (f = c.disabled) ? f = f.call(a, o) : (f = a.disabled, f = typeof f === r ? f.apply(a) : f), c.disabled || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), 
				p += "\n                    ", o = {
					hash: {},
					inverse: t.noop,
					fn: t.program(10, k, b),
					data: b
				}, (f = c.dataFundChange) ? f = f.call(a, o) : (f = a.dataFundChange, f = typeof f === r ? f.apply(a) : f), c.dataFundChange || (f = u.call(a, f, o)), (f || 0 === f) && (p += f),
				p += "\n                    ", o = {
					hash: {},
					inverse: t.noop,
					fn: t.programWithDepth(l, b, a),
					data: b
				}, (f = c.dataTip) ? f = f.call(a, o) : (f = a.dataTip, f = typeof f === r ? f.apply(a) : f), c.dataTip || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), 
				p += "\n                    ", o = {
					hash: {},
					inverse: t.noop,
					fn: t.programWithDepth(m, b, a),
					data: b
				}, (f = c.seed) ? f = f.call(a, o) : (f = a.seed, f = typeof f === r ? f.apply(a) : f), c.seed || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), 
				p += "\n                    ", o = {
					hash: {},
					inverse: t.noop,
					fn: t.programWithDepth(n, b, a),
					data: b
				}, (f = c.dataAction) ? f = f.call(a, o) : (f = a.dataAction, f = typeof f === r ? f.apply(a) : f), c.dataAction || (f = u.call(a, f, o)), (f || 0 === f) && (p += f), p += ">", (f = c.text) ? f = f.call(a, {
					hash: {},
					data: b
				}) : (f = a.text, f = typeof f === r ? f.apply(a) : f), p += s(f) + "</a>\n            </li>\n        "
			}

			function g() {
				return "disabled"
			}

			function h(a, b, c) {
				var d;
				return s((d = c.dataLink, typeof d === r ? d.apply(a) : d))
			}

			function i() {
				return "#"
			}

			function j(a, b, c) {
				var d, e = "";
				return e += 'target="' + s((d = c.dataTarget, typeof d === r ? d.apply(a) : d)) + '"'
			}

			function k() {
				return 'data-fund-change="true"'
			}

			function l(a, b, c) {
				var d, e = "";
				return e += 'data-tip="' + s((d = c.dataTip, typeof d === r ? d.apply(a) : d)) + '"'
			}

			function m(a, b, c) {
				var d, e = "";
				return e += 'seed="' + s((d = c.seed, typeof d === r ? d.apply(a) : d)) + '"'
			}

			function n(a, b, c) {
				var d, e = "";
				return e += 'data-action="' + s((d = c.dataAction, typeof d === r ? d.apply(a) : d)) + '"'
			}
			  this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ],
			  c = c || a.helpers,
			  console.info(a.helpers);
			  e = e || {};
			var o, p, q = "",
				r = "function",
				s = this.escapeExpression,
				t = this,
				u = a.helpers.blockHelperMissing;
				//console.info(u);
			return q += '<div class="', (o = c.classPrefix) ? o = o.call(b, {
				hash: {},
				data: e
			}) : (o = b.classPrefix, o = typeof o === r ? o.apply(b) : o), 
			q += s(o) + '">\n    <ul>\n        ', 
			p = {
				hash: {},
				inverse: t.noop,
				fn: t.programWithDepth(f, e, b),
				data: e
			}, 
			(o = c.options) ? o = o.call(b, p) : (o = b.options, o = typeof o === r ? o.apply(b) : o), 
			c.options || (o = c.each.call(b, b.options, p)),
			 (o || 0 === o) && (q += o), 
            //q += f(a, b, d);
			q += "\n    </ul>\n</div>\n"
		})
	}()
})