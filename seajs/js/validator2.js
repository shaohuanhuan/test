define(function(require,exports,module){
    var $=require("$"),
        Validator=require("arale/validator/0.9.7/validator");

    // 表单的信息提示样式
    var NewValidator = Validator.extend({
        attrs: {
            autoFocus : false,
            showMessage: function (message, element) {
                message = '<i class="ui-tiptext-icon iconfont"></i>\
                           <span class="ui-form-explain-text">' + message + '</span>';
                this.getExplain(element)
                    .removeClass("ui-tiptext-success")
                    .addClass('ui-tiptext ui-tiptext-error')
                    .html(message);
                this.getItem(element).addClass(this.get('itemErrorClass'));
            },
            hideMessage: function (message, element,event) {
            	if(event){
                var html="<i class='ui-tiptext-icon iconfont'></i>";
                this.getExplain(element).html(html).removeClass("ui-tiptext-error").addClass('ui-tiptext-success');
                this.getItem(element).removeClass(this.get('itemErrorClass'));
            	}
            }
        }
    });

    var Validform=function(o,settings){
        var settings=$.extend({},Validform.defaults,settings);
        settings.dataType && $.extend(Validform.util.dataType,settings.dataType);

        var validator = new NewValidator({
            element: o,
            failSilently: true,
            onFormValidated:function(error,results,element){
            	if(!error){
            		if(settings.callback&&settings.callback.length>0){
        				return settings.callback(element);
            		}else{
            			return true;
            		}
            	}
            }
        });

        $(o).find("[datatype]").each(function(){
            var obj=this;
            var datatype=obj.getAttribute("datatype"),
                errorMsg=obj.getAttribute("errormsg");
            Validform.util.fnAddRule(datatype);//添加规则
            errorMsg=errorMsg?errorMsg:"";
            var errorReq="不能为空";//这句是为空的提示信息 到时候要删掉
            var req=obj.getAttribute("required")?true:false;
            validator.addItem({
                element: obj,
                rule: datatype,
                required: req,
                //errormessageRequired: errorReq,//这句是为空的提示信息 到时候要删掉
                errormessage:errorMsg
            });
        });
    }


    Validform.util={
        dataType:{
            "*":/[\w\W]+/,//字符
            "n":/^\d+$/,//数字
            "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,//非特殊字符 /[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]/g
            "p":/^[0-9]{6}$/  //邮政编码
        },
        fnAddRule:function(datatype){
            if(/\,/.test(datatype)){
                var arr=datatype.split(",");
                for(var i=0;i<arr.length;i++){
                    Validform.util.fnAddRule2(arr[i]);
                }
            }else{
                Validform.util.fnAddRule2(datatype);
            }
        },
        fnAddRule2:function(obj){
            var types=Validform.util.dataType,rule;
            if(Validform.util.toString.call(types[obj])=="[object Object]"){//对象,含错误信息
                rule=types[obj].rule;
                msg=types[obj].message;
                Validator.addRule(obj, rule,msg);
            }else{//仅是函数或正则
                rule=types[obj];
                Validator.addRule(obj, rule);
            }
        },
        toString:Object.prototype.toString
    }

    module.exports={
        Validator:NewValidator,
        validFun:function(settings){
            return new Validform(this,settings);
        }
    }
})