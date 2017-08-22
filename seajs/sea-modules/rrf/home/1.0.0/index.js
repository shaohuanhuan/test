define(function(require, exports, module) {

	var $ = require("$"),
		tip = require("arale/tip/1.2.2/tip");
		require("./assets/index");
		exports.run = function() {
			$(".j-atip").each(function(index, el) {
				var e, f, g = $(el).data("content"),
					h = $(el).data("content-link"),
					i = $(el).attr("seed"),
					j = $(el).data("arrowposition") || 7,
					k = "undefined" == typeof $(el).data("pointpos") ? "50%" : $(el).data("pointpos"),
					l = $(el).data("width") || "auto";
				h && (e = $(el).data("content-link-text"), f = $(el).data("content-link-online"), g += (f ? "" : "<br/>") + '<a target="_blank" href="' + h + '"' + (i ? 'seed="' + i + "-tip" + '"' : "") + ">" + e + "</a>"),
				new tip({
					trigger: el,
					content: g,
					effect: "fade",
					arrowPosition: j,
					pointPos: k,
					width: l
				})
			});
		}
})