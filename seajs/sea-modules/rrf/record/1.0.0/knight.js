define(function(require, exports, module) {
	module.exports = {
		$: require("$"),
		gallery: {
			moment: require("gallery/moment/2.0.0/moment")
		},
		arale: {
			Calendar: require("arale/calendar/1.0.0/calendar"),
			CalendarCss: require("arale/calendar/1.0.0/calendar.css#"),
			Validator: require("arale/validator/0.9.7/validator"),
			ValidatorCore: require("arale/validator/0.9.7/core"),
			IframeShim: require("arale/iframe-shim/1.0.2/iframe-shim"),
			Overlay: require("arale/overlay/1.1.4/overlay"),
			cookie: require("arale/cookie/1.0.2/cookie"),
			Tip: require("arale/tip/1.2.2/tip"),
			ConfirmBox: require("arale/dialog/1.0.0/confirmbox"),
			placeholder: require("arale/placeholder/1.0.1/placeholder")
		},
	   rrf: {
		// 	DateSlider: a("alipay/date-slider/1.0.2/date-slider"),
		 	Xbox: require("rrf/xbox/1.0.0/xbox"),
		 	BackTop: require("rrf/backtop/1.0.0/backtop"),
		// 	apww: a("alipay/apww/1.2.0/apww"),
		 	request: require("rrf/request/1.0.0/request")
		 },
		biz: {
			CustomMenu: require("./biz/custom-menu"),
			TopTip: require("./biz/top-tip"),
			zeroclipboard: require("gallery/zeroclipboard/1.3.5/zeroclipboard")
		}
	}
})