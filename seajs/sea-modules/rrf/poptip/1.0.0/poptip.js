 define("alipay/poptip/1.3.0/poptip", ["./poptip-tpl", "arale/overlay/1.0.0/overlay", "$", "arale/position/1.0.0/position", "arale/iframe-shim/1.0.0/iframe-shim", "arale/widget/1.0.3/widget", "arale/base/1.0.1/base", "arale/class/1.0.0/class", "arale/events/1.0.0/events", "arale/widget/1.0.3/templatable", "gallery/handlebars/1.0.0/handlebars"], function(a, b, c) {
	var d = a("arale/overlay/1.0.0/overlay"),
		e = a("arale/widget/1.0.3/templatable");
	a("alipay/poptip/1.3.0/poptip-icon.css");
	var f = {
			notice: "https://i.alipayobjects.com/e/201207/32UMBEuECH.png",
			trade: "https://i.alipayobjects.com/e/201207/3coEJviyzD.png",
			text: ""
		},
		g = d.extend({
			Implements: e,
			attrs: {
				template: a("./poptip-tpl.js"),
				target: null,
				content: "",
				type: "notice",
				link: null,
				linkText: "现在使用",
				closable: !0,
				arrowPosition: 10,
				offset: null,
				theme: "yellow",
				classPrefix: "ui-poptip"
			},
			events: {
				"click [data-action=close]": "hide"
			},
			parseElement: function() {
				this.model || (this.model = {
					classPrefix: this.get("classPrefix")
				}), g.superclass.parseElement.call(this)
			},
			setup: function() {
				g.superclass.setup.call(this), this.get("link") || this.$("[data-role=link]").remove()
			},
			_onRenderContent: function(a) {
				this.$("[data-role=text]").empty().append(a)
			},
			_onRenderLink: function(a) {
				this.$("[data-role=link] a").attr("href", a)
			},
			_onRenderLinkText: function(a) {
				this.$("[data-role=link] a").html(a)
			},
			_onRenderType: function(a) {
				var b = this.$("[data-role=icon]");
				f[a] ? b.attr("src", f[a]) : (b.remove(), this.$("[data-role=content]").addClass(this.get("classPrefix") + "-box-text"))
			},
			_onRenderClosable: function(a) {
				this.$("[data-role=close]")[a ? "show" : "hide"]()
			},
			_onRenderArrowPosition: function(a, b) {
				var c = this.$("[data-role=arrow]");
				c.removeClass(this.get("classPrefix") + "-arrow-" + b).addClass(this.get("classPrefix") + "-arrow-" + a);
				var d = [0, 0],
					e = [];
				10 === a ? e = ["100%+8", "50%-20"] : 11 === a ? e = ["50%-22", "100%+8"] : 1 === a ? (d = ["100%-22", 0], e = ["50%", "100%+8"]) : 2 === a ? (d = ["100%", 0], e = ["-10", "4"]) : 5 === a ? (d = ["100%-22", "100%+8"], e = ["50%", 0]) : 7 === a && (d = ["26", "100%+8"], e = ["50%", 0]), this.set("align", {
					selfXY: d,
					baseElement: this.get("target"),
					baseXY: e
				})
			},
			_onRenderOffset: function(a) {
				this.set("align", {
					baseElement: this.get("target"),
					baseXY: a
				})
			},
			_onRenderTheme: function(a, b) {
				this.element.removeClass(this.get("classPrefix") + "-" + b), this.element.addClass(this.get("classPrefix") + "-" + a)
			}
		});
	c.exports = g
})