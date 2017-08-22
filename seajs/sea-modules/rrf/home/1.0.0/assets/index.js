define(function(require, exports, module) {
	var $ = require("$");

	var balanceCont = $("#show-hide-balance"),
		key = $(this).data("behavior-value"),
		SHbtn = balanceCont.find('.i-assets-visible-icon');
   	SHbtn.click(function(event) {
		return $(this).hasClass('main') ? (balanceCont.find(".i-assets-balance-amount").fadeIn(), $(this).removeClass('main'), $(this).attr("data-behavior-value", "1"), key = 1, $(this).attr("title", "点击隐藏金额"),$(".global-account-amount").css({"visibility":"visible",height:"auto"})) : (balanceCont.find(".i-assets-balance-amount").fadeOut(), $(this).addClass('main'), $(this).attr("data-behavior-value", "0"), key = 0, $(this).attr("title", "点击显示金额"),$(".global-account-amount").css({"visibility":"hidden",height:"13px"})),
			$.ajax({
				url: '/amount/toggle',
				type: 'POST',
				dataType: 'json',
				data: {
					flag: key
				}
			})
	});
})