define(function(a, b) {
	var c = a("arale/overlay/1.0.0/overlay"),
		d = a("$"),
		e = {
			delay: 2e3,
			type: "success"
		};
	b.show = function(a, b) {
		var f = {};
		if (d.extend(f, e, b), !a) throw new Error("message required.");
		var g = new c({
			template: '<div class="ui-tiptext-container ui-tiptext-container-' + f.type + '" style="padding:6px 15px;position:fixed">' + '<p class="ui-tiptext" style="padding:0;float:left;">' + a + "</p>" + "</div>",
			align: {
				selfXY: ["50%", 0],
				baseXY: ["50%", 0]
			}
		});
		g.show(), setTimeout(function() {
			g.hide(), g.destroy()
		}, f.delay)
	}
});