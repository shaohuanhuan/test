define(function(require,exports,module){
	var $=require("$"),
		form=require("./validator2");
	var Validator=form.Validator;
	$.fn.validformFun=form.validFun;
	//------这里定义公用规则
	//已有规则---普通："*"; 验证账户名：邮箱或手机号码  "em"; 邮政编码："p"; 数字:"n";
	//已有正则---身份证
	var regx={
		notEmpty:/[^\s]/i,//不为空
		trim:/(^\s+)|(\s+$)|(\s+)/,//空格
		IDCard:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}X)$/,//身份证
		least:/[a-zA-Z]+|\d+|[^\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+/i,//含字母数字特殊字符
		allSame:/^\d+$|^[a-zA-Z]+$|^[^\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,//全是字母数字特殊字符
		chinese:/[\u4e00-\u9fa5]/,
		email:/^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,//邮箱
		mobile:/^1\d{10}$/, //手机
		digit:/^[0-9]*$/, //数字
		bankCard:/^[0-9]{15,19}$/,
		len:/^[\w\W]{6,16}$/,  // 登录密码长度6-16位
		security:/^[\u4e00-\u9fa5a-zA-Z0-9]*$/, // 汉字字母数字
		notDigitpatrn: /^([1-9][\d]{0,}|0)(\.[\d]{1,})?$/ //金额	
	};
	

  //组合校验手机或者邮箱
	var val_email = Validator.getRule('email');//email
  var emailOrMobile = val_email.or('mobile');

    // ===================   表单验证  =================
    //注册\找回密码
    $("#specFormValid").length>0&&$("#specFormValid").validformFun({
    	dataType:{
    		e:{
					rule:regx.email,
					required:true,
					message:'2222'
    		},
    		em:{
					rule:emailOrMobile,
					message:'333333333333333'
    		}
    	}
    })
	
	

});
