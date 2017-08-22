define(function(require, exports, module) {
	function d(a) {
		return a.replace(/(\-[a-z])/g, function(a) {
			return a.toUpperCase().replace("-", "")
		})
	}

	function e(a) {
		var b, c = [],
			e = a[0].options,
			g = e.length;
		// console.log(g);
		for (b = 0; g > b; b++) {
			for (var h = {}, i = $(e[b]), k = 0, l = j.length; l > k; k++) {
				var m = j[k],
					n = i.attr(m);
				void 0 !== n && (h[d(m)] = n)
			}
			h.text = i.text(), h.index = b, h.specialClass = 0 == b ? "first" : b == g - 1 ? "last" : "", c.push(h)
		}
		//console.log(c);
		return c
	}

	var $ = require("$"),
		h = require("arale/popup/1.1.6/popup"),
		g = require("arale/tip/1.2.2/tip"),
		i = require("arale/templatable/0.9.2/templatable"),
		tpl = require("rrf/record/1.0.0/biz/custom-menu-tpl3"),
		j = ["data-tip", "data-link", "data-target", "data-action", "disabled", "class", "seed", "data-fund-change"],
		k = h.extend({
			Implements: [i],
			attrs: {
				select: {
					setter: function(a) {
						return $(a)
					}
				},
				classPrefix: {
					value: "custom-menu",
					setter: function(a) {
						return this.model.classPrefix = a, a
					}
				},
				template: tpl
				// model: {
    //                  options: {optime:"asdfa"},
				// 	 classPrefix: "classPrefix"

				// }
			},
			initAttrs: function() {
				k.superclass.initAttrs.apply(this, [].slice.call(arguments, 0));
				this.model = {
					options: e(this.get("select")),
					classPrefix: this.get("classPrefix")
				}
				this.set('model',{
                    options: e(this.get("select")),
					classPrefix: this.get("classPrefix")
				})
				//console.log(this.model);
			},
			setup: function() {
				k.superclass.setup.apply(this, [].slice.call(arguments, 0));
				var a = this,
					b = $("li:first a", this.element).text();
				$("span:first", this.get("trigger")).text(b), "详情" !== b && "退款" !== b && "备注" !== b && this.get("trigger").addClass("operation-menu-trigger-hot");
				var c = function() {
						//alert("gsfsdf");
						var a = document.createElement("span");
						a.innerHTML = "字", document.body.appendChild(a);
						var b = a.offsetWidth;
						return document.body.removeChild(a), b
					}(),
					e = $("ul li", this.element),
					h = -1;
				e.each(function(a, b) {
					b = $(b);
					var c = $.trim(b.text()).length;
					c > h && (h = c)
				});
				var i = h * c + 39;
				this.element.width(i), $.each(this.model.options, function(b, c) {
					var e = c[d("data-tip")];
					e && new g({
						trigger: $("li", a.element).get(b),
						content: e,
						arrowPosition: 2,
						theme: "yellow",
						width: 130,
						delay: -1
					})
				});
				//console.log(this.model.classPrefix);
			},
			events: {
				"mouseenter li": function(a) {
					var b = $(a.target);
					b.is("li") || (b = b.parents("li")), b.addClass("hover")
				},
				"mouseleave li": function(a) {
					var b = $(a.target);
					b.is("li") || (b = b.parents("li")), b.removeClass("hover")
				},
				"click li a[data-action]": function(a) {
					a.preventDefault();
					var b = $(a.target);
					this.trigger("action:" + b.attr("data-action"), b)
				},
				"click li a[disabled]": function(a) {
					a.preventDefault()
				}
			}
		});
	module.exports = k
})