define('<div class="global-header-head {{#if otherHead}}global-header-head-other{{/if}}">'+
	'<div class="global-header-head-nav ">'+
		'<div class="global-header-head-nav-container">'+
			'<ul class="global-header-head-nav-left">'+
				'<li class="global-header-head-nav-item">'+
					'<a href="/">全民付首页</a>'+
				'</li>'+
			'</ul>'+
			'<ul class="global-header-head-nav-right">'+
				'{{#if isLogin}}'+
				'<li class="global-header-head-nav-item">您好，</li>'+
				'<li class="global-header-head-nav-item" id="J-user">'+
					'<a href="/accountSet/userInfo/userInfo.html">'+
						'{{{userName}}} <i class="global-header-head-angle"></i>'+
					'</a>'+
				'</li>'+
				'<li class="global-header-head-nav-item global-header-head-nav-item-seperator">|</li>'+
				'<li class="global-header-head-nav-item global-header-head-item-hover" id="J-message">'+
					'<a href="/message/unread">消息中心</a> <i class="global-header-head-angle"></i>'+
				'</li>'+
				'{{else}}'+
				'<li class="global-header-head-nav-item">'+
					'<a href="/login/index">登录</a>'+
				'</li>'+
				'<li class="global-header-head-nav-item global-header-head-nav-item-seperator">|</li>'+
				'<li class="global-header-head-nav-item">'+
					'<a href="/register/index">注册</a>'+
				'</li>'+
				'{{/if}}'+
				'<li class="global-header-head-nav-item global-header-head-nav-item-seperator">|</li>'+
				'<li class="global-header-head-nav-item">'+
					'<a href="/userInfo/toSSInfo">安全设置</a>'+
				'</li>'+
				'<li class="global-header-head-nav-item global-header-head-nav-item-seperator">|</li>'+
				'<li class="global-header-head-nav-item">'+
					'<a href="/help/selfService">帮助中心</a>'+
				'</li>'+
				'<li class="global-header-head-nav-item global-header-head-nav-item-seperator">|</li>'+
				'{{#if isLogin}}'+
				'<li class="global-header-head-nav-item">'+
					'<a href="/login/logout">安全退出</a>'+
				'</li>'+
				'{{/if}}'+
			'</ul>'+
		'</div>'+
	'</div>'+
'</div>')