define(function(require, exports, module) {

	function formatEmail(a) {
		a = a.replace(/^\s*(.*?)\s*$/g, "$1");
		var b = {
				regxp: /(^.*)(.{3}$)/g,
				placeholder: "$1...",
				leftLimit: 8,
				rightLimit: 7,
				totalLimit: 16
			},
			c = a.split("@"),
			d = c[0],
			e = c[1];
		return c.length > 1 && a.length > b.totalLimit ?
			(d.length > b.leftLimit && (d = d.slice(0, b.leftLimit).replace(b.regxp, b.placeholder)),
				e.length > b.rightLimit && (e = e.slice(0, b.rightLimit).replace(b.regxp, b.placeholder)), [d, "@", e].join("").toLowerCase()) : a.toLowerCase()
	}

	function hideText(a) {
		return a.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
	}

	function f(a) {
		return a.balance ? '<span class="global-account-balance">' + a.balance + "</span>元" : '<a href="#" class="global-account-showbalance" seed="global-showbalance' + a.clickCount + '" data-role="showbalance">显示余额</a>'
	}

	var j = 0,
		popup = require("arale/popup/1.1.6/popup"),
		templatable = require("arale/templatable/0.9.2/templatable"),
		request = require("rrf/request/1.0.0/request");
	k = popup.extend({
		Implements: templatable,
		events: {
			"click [data-role=showbalance]": "showBalance"
		},

		parseElement: function() {
			this.set("model", {
				showEmail: hideText(formatEmail(this.get("model").email)),
				portraitPath: this.get("model").portraitPath
			}), k.superclass.parseElement.call(this)
		},

		show: function() {
			var a = this.get("model");
			!this.get("visible") && a.isLogin && (a.balance = "", a.clickCount = j, this.set("model", a), this.$("[data-role=balance]").html(f(a))),
			k.superclass.show.call(this)
		},

		showBalance: function(a) {
			a.preventDefault();
			var b = this,
				c = this.get("model"),
				d = c.personalServer + "/user/assets/queryBalance.json?_callback=?";
			j++,
			request.ajax(d, {
				dataType: "jsonp"
			}).success(function(a) {
				"ok" === a.stat && (c.balance = a.availableAmount, b.set(c, c), b.$("[data-role=balance]").html(f(c)))
			}).error(function() {
				c.balance = "1277.00", b.set(c, c), b.$("[data-role=balance]").html(f(c))
			})
		}
	});
	module.exports = k
})