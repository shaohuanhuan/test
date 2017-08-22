define( function(require, exports, module) {
	var g = window.location.href;
	    request = require("rrf/request/1.0.0/request"),
	    $ = require("$"),


	module.exports = function(b, c) {
		var d = "_ABTEST_TARGET_=([AB])",
			 h = window.location.search.match(d) || document.cookie.match(d);

		if (h instanceof Array)
			return c("A" === h[1] ? "a" : "b"), void 0;

		if (!b.abtestEnabled || "" === b.userName)
			return c("a"), void 0;

		if (g = (b.pageAbsUrl || g).split("?").shift(), b.abtest && b.abtest.length > 0) {
			var i = "a";
			return $(b.abtest.split(",")).each(function(index, element) {
				return g.indexOf(element) > -1 ? (i = "b", void 0) : void 0
			}), c(i), void 0
		}
		request.ajax({
			url: b.uninavServer + "/nav/getNavData.json",
			dataType: "jsonp",
			jsonp: "_callback",
			timeout: 3e3,
			data: {
				navType: b.abtestType,
				referer: g,
				abtest: !0,
				loadData: !1
			},
			success: function(a) {
				return a.stat && "fail" === a.stat && Tracker && Tracker.click ? (Tracker.click("uninav-abtest-json-fail"), c("a"), void 0) : (c(a.abtestInfo && "B" === a.abtestInfo ? "b" : "a"), void 0)
			},
			error: function(b, d) {
				Tracker && Tracker.click && Tracker.click("uninav-abtest-json-" + d), c(a)
			}
		})
	}
})