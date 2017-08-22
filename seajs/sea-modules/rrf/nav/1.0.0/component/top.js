define(function(require, exports, module) {
	var popup = require("arale/popup/1.1.6/popup"),
		component = require("rrf/nav/1.0.0/widget/component"),
		account = require("rrf/nav/1.0.0/widget/account"),
		message = require("rrf/nav/1.0.0/widget/message"),
		componenttop = require("rrf/nav/1.0.0/tpl/component-top.tpl#"),
		widgetaccount = require("rrf/nav/1.0.0/tpl/widget-account.tpl#"),
	    widgetmessage = require("rrf/nav/1.0.0/tpl/widget-message.tpl#");

	exports.a = function(a) {
		return new k({
			className: "global-top",
			model: a
		}).after("appendTo", function() {
			this.initAccount();
			this.initMessage();
		}).render()
	};

	var k = component.extend({
		attrs: {
			template: componenttop
		},

		render: function() {
			var a = this.get("model");
			return this.set("model", a), k.superclass.render.call(this)
		},
		initAccount: function() {
			new account({
				trigger: this.find("#J-user"),
				parentNode: this.element,
				width: "240px",
				effect: "fade",
				duration: 150,
				zIndex: 100,
				beforeShow: function() {
					this.get("trigger").addClass("global-header-head-item-hover")
				},
				afterHide: function() {
					this.get("trigger").removeClass("global-header-head-item-hover")
				},
				template: widgetaccount,
				model: this.get("model"),
				align: {
					baseXY: ["100%", "100%"],
					selfXY: ["100%", 0]
				}
			})
		},
		initMessage: function() {
			new message({
				trigger: this.find("#J-message"),
				parentNode: this.element,
				width: "354px",
				effect: "fade",
				duration: 150,
				zIndex: 100,
				beforeShow: function() {
					this.get("trigger").addClass("global-header-head-item-hover")
				},
				afterHide: function() {
					this.get("trigger").removeClass("global-header-head-item-hover")
				},
				template: widgetmessage,
				model: this.get("model"),
				align: {
					baseXY: ["100%", "100%"],
					selfXY: ["100%", 0],
					baseElement: '#J-message'
				}
			}).show();
		}
	})
})