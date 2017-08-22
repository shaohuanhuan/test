define(function(require, exports, module) {
	var overlaya = require("arale/overlay/1.1.4/overlay"),
		templatable = require("arale/templatable/0.9.2/templatable"),
	    $ = require("$"),
		request = require("rrf/request/1.0.0/request");
	k = overlaya.extend({
		Implements: templatable,
		events: {
			"click #message-close": "close"
		},
		align: {
			baseXY: ["100%", "100%"],
			selfXY: ["100%", 0],
			baseElement: '#J-message'
		},
		close: function(a) {
			a.preventDefault();
			$("#J-message").removeClass('global-header-head-item-hover');
			$("#J-message").find("i").remove();
			$("<span class='sn-count'><i class='sn-radio'></i></span>").appendTo('#J-message');
			this.element.remove();
		}
	});
	module.exports = k
})