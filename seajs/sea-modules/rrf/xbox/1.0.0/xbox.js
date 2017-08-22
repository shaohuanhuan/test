define("rrf/xbox/1.0.0/xbox", ["$", "arale/dialog/1.0.0/dialog", "arale/overlay/1.0.0/overlay", "arale/position/1.0.0/position", "arale/iframe-shim/1.0.0/iframe-shim", "arale/widget/1.0.3/widget", "arale/base/1.0.1/base", "arale/class/1.0.0/class", "arale/events/1.0.0/events", "arale/overlay/1.0.0/mask", "arale/widget/1.0.3/templatable", "gallery/handlebars/1.0.0/handlebars", "rrf/object-shim/1.0.0/object-shim"], function(a, b, c) {
	function i(a) {
		var b = a.match(/([^?#]*)(\?[^#]*)?(#.*)?/);
		return b.shift(), b[1] = (b[1] && "?" !== b[1] ? b[1] + "&" : "?") + "_xbox=true", b.join("")
	}

	function j(a, b) {
		var c = b > a ? .35 * (b - a) : 30;
		return Math.max(c, 30)
	}

	function k() {
		for (var b, a = "AP.widget.xBox".split("."), c = window; b = a.shift();) b && (c[b] || (c[b] = {}), c = c[b]);
		return c
	}
	var g, d = a("$"),
		e = a("arale/dialog/1.0.0/dialog"),
		f = a("rrf/object-shim/1.0.0/object-shim");
	a("rrf/xbox/1.0.0/xbox.css");
	var h = e.extend({
		attrs: {
			classPrefix: "ui-xbox",
			top: "",
			isOld: !1,
			align: {
				getter: function(a) {
					var b = this._syncTop();
					return a.selfXY = b.selfXY, a.baseXY = b.baseXY, a
				}
			}
		},
		setup: function() {
			h.superclass.setup.call(this), f(this), this._setupOld(), this._setupTop(), this._setupLoading()
		},
		_setupTop: function() {
			this.on("complete:show", function() {
				var a = this;
				setTimeout(function() {
					a.element && a._setPosition()
				}, 500)
			}), this.after("_syncHeight", function() {
				var a = this.element.css("height");
				this._tmpHeight !== a && (this._setPosition(), this._tmpHeight = a)
			})
		},
		_setupOld: function() {
			this.get("isOld") && this.set("closeTpl", ""), this.before("show", function() {
				var a = this;
				if (this.get("isOld") && "iframe" === this._type) {
					var b = k();
					b.hide && (g = b.hide), b.hide = function() {
						a.hide()
					}
				}
			}), this.before("hide", function() {
				if (this.get("isOld")) {
					var a = k();
					a.hide && (g ? (a.hide = g, g = null) : delete a.hide)
				}
			})
		},
		_setupLoading: function() {
			var c, e, a = '<div class="' + this.get("classPrefix") + '-loading"></div>',
				b = d(a).hide().insertBefore(this.$("[data-role=content]"));
			this.after("show", function() {
				"iframe" === this._type && (b.css("width", 0).show(), e = 0, c = setInterval(function() {
					e++, 80 >= e ? b.css("width", e + "%") : (clearInterval(c), setInterval(function() {
						e++, 100 >= e && b.css("width", e + "%")
					}, 1e3))
				}, 200))
			}), this.on("complete:show", function() {
				clearInterval(c), c = setInterval(function() {
					if (e++, 100 >= e) b.css("width", e + "%");
					else {
						clearInterval(c);
						var a = setTimeout(function() {
							clearTimeout(a), b.fadeOut(400)
						}, 400)
					}
				}, 1)
			})
		},
		_onRenderTop: function() {
			this.element && this._setPosition()
		},
		_syncTop: function() {
			var a = this.get("top");
			if (a) return {
				selfXY: ["50%", 0],
				baseXY: ["50%", a]
			};
			var b = parseInt(this.element.innerHeight(), 10),
				c = d(window).height();
			return a = j(b, c), {
				selfXY: ["50%", 0],
				baseXY: ["50%", a]
			}
		},
		_fixUrl: function() {
			var a = h.superclass._fixUrl.call(this);
			return i(a)
		},
		_setupFocus: function() {}
	});
	c.exports = h, c.exports._niceTop = j
}), define("rrf/xbox/1.0.0/xbox.css", [], function() {
	function a(a) {
		var b = document.createElement("style");
		document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a))
	}
	a(".ui-xbox{background-color:rgba(0,0,0,.5);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px;-webkit-transition:height .3s ease-in-out .3s;-moz-transition:height .3s ease-in-out .3s;-o-transition:height .3s ease-in-out .3s;-ms-transition:height .3s ease-in-out .3s;transition:height .3s ease-in-out}:root .ui-xbox{FILTER:none9}.ui-xbox-content{background:#fff;height:100%;*zoom:1}.ui-xbox-close{color:#999;cursor:pointer;display:block;font-family:tahoma;font-size:24px;font-weight:700;height:18px;line-height:14px;overflow:hidden;position:absolute;right:16px;text-decoration:none;top:16px;width:18px;z-index:10}.ui-xbox-close:hover{color:#666;text-shadow:0 0 2px #aaa}.ui-xbox-loading{position:absolute;top:0;left:0;background:#fff;height:4px;_overflow:hidden}")
});