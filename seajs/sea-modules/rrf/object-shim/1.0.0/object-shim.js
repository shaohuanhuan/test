define("rrf/object-shim/1.0.0/object-shim", ["$"], function(a, b, c) {
	function f(a, b) {
		if (this.target = d(a.element || a).eq(0), this.className = b || "alieditContainer", g(a)) {
			var c = this;
			this._callbacks = {
				show: function() {
					c.hide()
				},
				hide: function() {
					c.show()
				}
			}, this._overlay = a, a.after("show", this._callbacks.show), a.after("hide", this._callbacks.hide)
		}
	}

	function g(a) {
		return !(!a._setupShim || !a._setPosition)
	}
	var d = a("$"),
		e = "object-shim-class";
	seajs.importStyle("body .object-shim-class{display:inline-block;*display:inline;*zoom:1;height:22px;width:198px;border:1px solid #999}body .object-shim-class object,body .object-shim-class embed{display:none}", "rrf/object-shim/1.0.0/object-shim.css"), f.prototype.sync = function() {
		var a = this.target;
		return a.length ? (a.outerHeight() && a.outerWidth() && !a.is(":hidden") ? this.hide() : this.show(), this) : this
	}, f.prototype.show = function() {
		return d("." + this.className).removeClass(e), this
	}, f.prototype.hide = function() {
		return d("." + this.className).addClass(e), this
	}, f.prototype.destroy = function() {
		this._callbacks && (this._overlay.off("after:show", this._callbacks.show), this._overlay.off("after:hide", this._callbacks.hide)), this.show()
	}, c.exports = function(a, b) {
		return new f(a, b)
	}
});