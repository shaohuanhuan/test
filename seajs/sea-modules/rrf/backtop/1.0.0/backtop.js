define(function(require, exports, module) {
	var $ = require("$");
	$(function() {
		var html='<a href="javascript:void(0)" class="ui-back-top" style="display:none" id="back-to-top"></a>';
        $("body").append(html);
		$(window).scroll(function() {
			if ($(window).scrollTop() > 100) {
				$("#back-to-top").fadeIn(500);
			} else {
				$("#back-to-top").fadeOut(500);
			}
		});
		//当点击跳转链接后，回到页面顶部位置
		$("body").delegate('#back-to-top', 'click', function(event) {
			$('body,html').animate({
				scrollTop: 0
			}, 200);
			return false;
		});
	});
});