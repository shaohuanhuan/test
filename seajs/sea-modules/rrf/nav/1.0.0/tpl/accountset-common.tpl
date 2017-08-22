define('{{#if account}}'+
    '<li class="third-nav-item  {{showLeftCurrent "userInfo"}} "> <em class="icon-nav icon-nav1"></em>'+
		'<a href="/userInfo/toUserInfo" class="third-nav-link">基本信息</a> <i class="icon-arr" title="单箭头右">></i>'+
	'</li>'+
	'<li class="third-nav-item {{showLeftCurrent "securitySet"}} "> <em class="icon-nav icon-nav2"></em>'+
		'<a href="/userInfo/toSSInfo" class="third-nav-link">安全设置</a> <i class="icon-arr " title="单箭头右">></i>'+
	'</li>'+
        '{{#if userM}}'+
	'<li class="third-nav-item {{showLeftCurrent "phoneSet"}} ">'+
		'<em class="icon-nav icon-nav3"></em>'+
		'<a href="/mobileAuth/toAuthInfo" class="third-nav-link">手机设置</a>'+
		'<i class="icon-arr " title="单箭头右">></i>'+
	'</li>'+
        '{{/if}}'+
	'<li class="third-nav-item {{showLeftCurrent "eMailSet"}} ">'+
		'<em class="icon-nav icon-nav4"></em>'+
		'<a href="/mailAuth/toAuthInfo" class="third-nav-link">邮箱设置</a>'+
		'<i class="icon-arr " title="单箭头右">></i>'+
	'</li>'+
	'<li class="third-nav-item {{showLeftCurrent "limitSet"}} ">'+
		'<em class="icon-nav icon-nav5"></em>'+
		'<a href="/limit/toLimit" class="third-nav-link">限额设置</a>'+
		'<i class="icon-arr " title="单箭头右">></i>'+
	'</li>'+
	'<li class="third-nav-item {{showLeftCurrent "friendSet"}} ">'+
		'<em class="icon-nav icon-nav6"></em>'+
		'<a href="/friend/toList" class="third-nav-link">联系人管理</a>'+
		'<i class="icon-arr " title="单箭头右">></i>'+
	'</li>'+
	'<li class="third-nav-item {{showLeftCurrent "cardSet"}} ">'+
		'<em class="icon-nav icon-nav7"></em>'+
		'<a href="/institution/toList" class="third-nav-link">银行卡管理</a>'+
		'<i class="icon-arr " title="单箭头右">></i>'+
	'</li>'+
	'{{/if}}'+
	'{{#if merchant}}'+
	 '<li class="third-nav-item {{showLeftCurrent "dlStatement"}}">'+
		'<div>'+
			'<em class="icon-nav icon-nav-reg"></em>'+
			'<a href="/seller/settleDownload" class="third-nav-link">下载对账单</a>'+
			'<i class="icon-arr" title="单箭头右">></i>'+
		'</div>'+
	'</li>'+
	'<li class="third-nav-item {{showLeftCurrent "settleDetail"}}">'+
		'<div>'+
			'<em class="icon-nav icon-nav-act"></em>'+
			'<a href="/seller/settleQuery" class="third-nav-link">结算明细查询</a>'+
			'<i class="icon-arr " title="单箭头右">></i>'+
		'</div>'+
	'</li>'+
	'<li class="third-nav-item {{showLeftCurrent "settleStaticis"}}">'+
		'<div>'+
			'<em class="icon-nav icon-nav-trade"></em>'+
			'<a href="/seller/settleStat" class="third-nav-link">结算数据统计</a>'+
			'<i class="icon-arr " title="单箭头右">></i>'+
		'</div>'+
	'</li>'+
	'{{/if}}'+
	'{{#if problem}}'+
	
	'{{/if}}')