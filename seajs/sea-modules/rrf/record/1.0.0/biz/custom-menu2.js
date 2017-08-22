define(function(a, b, c) {
	function d(a) {
		return a.replace(/(\-[a-z])/g, function(a) {
			return a.toUpperCase().replace("-", "")
		})
	}

	function e(a) {
		var b, c = [],
			e = a[0].options,
			g = e.length;
		for (b = 0; g > b; b++) {
			for (var h = {}, i = f(e[b]), k = 0, l = j.length; l > k; k++) {
				var m = j[k],
					n = i.attr(m);
				void 0 !== n && (h[d(m)] = n)
			}
			h.text = i.text(), h.index = b, h.specialClass = 0 == b ? "first" : b == g - 1 ? "last" : "", c.push(h)
		}
		return c
	}
	var f = a("$"),
		g = a("arale/tip/1.2.2/tip"),
		h = a("arale/popup/1.1.6/popup"),
		i = a("arale/templatable/0.9.2/templatable"),
		j = ["data-tip", "data-link", "data-target", "data-action", "disabled", "class", "seed", "data-fund-change"],
		k = h.extend({
			Implements: [i],
			attrs: {
				select: {
					setter: function(a) {
						return f(a)
					}
				},
				classPrefix: {
					value: "custom-menu",
					setter: function(a) {
						return this.model.classPrefix = a, a
					}
				}
			},
			template: a("consumeprod/record/1.0.7/biz/custom-menu-tpl"),
			initAttrs: function() {
				k.superclass.initAttrs.apply(this, [].slice.call(arguments, 0)), this.model = {
					options: e(this.get("select")),
					classPrefix: this.get("classPrefix")
				}
			},
			setup: function() {
				k.superclass.setup.apply(this, [].slice.call(arguments, 0));
				var a = this,
					b = f("li:first a", this.element).text();
				f("span:first", this.get("trigger")).text(b), "详情" !== b && "退款" !== b && "备注" !== b && this.get("trigger").addClass("operation-menu-trigger-hot");
				var c = function() {
						var a = document.createElement("span");
						a.innerHTML = "字", document.body.appendChild(a);
						var b = a.offsetWidth;
						return document.body.removeChild(a), b
					}(),
					e = f("ul li", this.element),
					h = -1;
				e.each(function(a, b) {
					b = f(b);
					var c = f.trim(b.text()).length;
					c > h && (h = c)
				});
				var i = h * c + 28;
				this.element.width(i), f.each(this.model.options, function(b, c) {
					var e = c[d("data-tip")];
					e && new g({
						trigger: f("li", a.element).get(b),
						content: e,
						arrowPosition: 2,
						theme: "yellow",
						width: 212,
						delay: -1
					})
				})
			},
			events: {
				"mouseenter li": function(a) {
					var b = f(a.target);
					b.is("li") || (b = b.parents("li")), b.addClass("hover")
				},
				"mouseleave li": function(a) {
					var b = f(a.target);
					b.is("li") || (b = b.parents("li")), b.removeClass("hover")
				},
				"click li a[data-action]": function(a) {
					a.preventDefault();
					var b = f(a.target);
					this.trigger("action:" + b.attr("data-action"), b)
				},
				"click li a[disabled]": function(a) {
					a.preventDefault()
				}
			}
		});
	c.exports = k
})