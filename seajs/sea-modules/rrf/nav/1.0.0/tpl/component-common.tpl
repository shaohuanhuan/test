define('<div class="global-header-body {{# if otherHead}}global-header-body-other{{/if}}">'+
	'<div class="global-header-body-content">'+
		'<div class="global-logo">'+
			'<a href="/" title="全民付"></a>'+
		'</div>'+
		'{{#if otherLOGO }}'+
		'<div class="logo-title">{{otherLOGO}}</div>'+
		'{{else}}'+
		'<div class="global-logo-neighbor">'+
			'<img class="sublogo" src="/images/sublogo.gif" alt="安心理财，轻松支付" >'+
		'</div>'+
		'{{/if}}'+
		'{{#if showNav}}'+
		'<ul class="global-nav">'+
			'<li class="global-nav-item {{#if menu-1}}global-nav-item-current{{/if}}">'+
				'<a href="/">我的全民付</a>'+
				'<span class="global-nav-item-arrow">◆</span>'+
			'</li>'+
			'<li class="global-nav-item {{#if menu-2}}global-nav-item-current{{/if}}">'+
				'<a href="/record/tradeRecord">交易记录</a>'+
				'<span class="global-nav-item-arrow">◆</span>'+
			'</li>'+
			'{{#if showMerchant}}'+
			'<li class="global-nav-item {{#if menu-3}}global-nav-item-current{{/if}}">'+
				'<a href="/webapp/index.html" >商户管理</a>'+
				'<span class="global-nav-item-arrow">◆</span>'+
			'</li>'+
			'{{/if}}'+
			'<li class="global-nav-item {{#if menu-4}}global-nav-item-current{{/if}}">'+
				'<a href="/webapp/index.html" >应用中心</a>'+
				'<span class="global-nav-item-arrow">◆</span>'+
			'</li>'+
		'</ul>'+
		'{{/if}}'+
		'{{#if showRegisterNav}}'+
			'<ul class="global-nav">'+
					'<li class="global-nav-item {{#if menu-6}}global-nav-item-current{{/if}}">'+
						'<a href="/register/index">个人账户</a>'+
						'<span class="global-nav-item-arrow">◆</span>'+
					'</li>'+
					'<li class="global-nav-item {{#if menu-7}}global-nav-item-current{{/if}}">'+
						'<a href="/register/index?regFlag=1">企业账户</a>'+
						'<span class="global-nav-item-arrow">◆</span>'+
					'</li>'+
				'</ul> '+
		'{{/if}}'+ 
	'</div>'+
'</div>'+
'{{#if showSubNav}}'+
'<div class="global-header-subnav index-header-subnav">'+
	'<ul class="global-header-subnav-content">'+
		'{{#if menu-1}}'+
		'<li class="global-header-subnav-item {{showSubCurrent "s1_index"}} ">'+
			'<a href="/">首页</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s1_traderecord"}}">'+
			'<a href="/userInfo/toUserInfo">账户设置</a>'+
		'</li>'+
		'{{/if}}'+
		'{{#if menu-2}}'+
		'<li class="global-header-subnav-item {{showSubCurrent "s2_record"}}">'+
			'<a href="/record/tradeRecord">交易记录</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s2_payments"}} ">'+
			'<a href="/record/paymentsRecord">收支明细</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s2_recharge"}}">'+
			'<a href="/record/recordRecharge">充值记录</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s2_withdraw"}}">'+
			'<a href="/record/recordWithdraw">提现记录</a>'+
		'</li>'+
		'{{/if}}'+
		'{{#if menu-3}}'+
		'<li class="global-header-subnav-item {{showSubCurrent "s3_merchant"}}">'+
			'<a href="/seller/index">商户首页</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s3_settle"}} ">'+
			'<a href="/seller/settleDownload">结算数据</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s3_cash"}}">'+
			'<a href="/seller/cashInOutQuery">现金收支明细</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s3_bank"}}">'+
			'<a href="/seller/bankPayAnother">银行代付明细</a>'+
		'</li>'+
		'{{/if}}'+
		'{{#if menu-5}}'+
		'<li class="global-header-subnav-item {{showSubCurrent "s5_helpself"}}">'+
			'<a href="/help/selfService">自助服务</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s5_normalqs"}} ">'+
			'<a href="/help/problem">常见问题</a>'+
		'</li>'+
		'{{/if}}'+
		'{{#if menu-8}}'+
		'<li class="global-header-subnav-item {{showSubCurrent "s8_allm"}}">'+
			'<a href="/message/index">所有消息</a>'+
		'</li>'+
		'<li class="global-header-subnav-item {{showSubCurrent "s8_unreadm"}} ">'+
			'<a href="/message/unread">未读消息</a>'+
		'</li>'+
		'{{/if}}'+
	'</ul>'+
'</div>'+
'{{/if}}')