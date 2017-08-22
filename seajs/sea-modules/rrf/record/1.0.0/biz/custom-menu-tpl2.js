define(function(require, exports, module) {
	var handlebars = require("gallery/handlebars/1.0.2/handlebars"),
		template = handlebars.template;
	module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
		this.compilerInfo = [3, ">= 1.0.0-rc.4"];
		helpers = helpers || Handlebars.helpers;
		blockHelperMissing=helpers.blockHelperMissing;
		data = data || {};
		var buffer = "",
			stack1, functionType = "function",
			escapeExpression = this.escapeExpression,
			selstack1 = this;
			u = helpers.blockHelperMissing;
	//	console.log(Handlebars);

		function program1(depth0, data, depth1) {
			// console.info("depth0");
			// console.info(depth0);
			// console.info("depth1");
			// console.info(depth1);
			// console.info(helpers.specialClass);
			var buffer = "",
				stack1, stack2;
			buffer += '\n        <li data-role="item" class="' + escapeExpression((stack1 = depth1.classPrefix,
				typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + '-item ';
			if(stack2 = helpers.specialClass){
              stack2=stack2.call(depth0,{
					hash: {},
					data: data
              })
			}else{
				stack2 = depth0["specialClass"], stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
			}
            buffer +=  escapeExpression(stack2)+' ';
			if(stack2 = depth1["class"]){
                stack2 = stack2.call(depth0,{
                     hash: {},
					 data: data
                })

			}else{
                stack2 = depth0["class"], stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2

			}
		    buffer += escapeExpression(stack2) + ' " data-value="';
			if (stack2 = helpers.value) {
				stack2 = stack2.call(depth0, {
					hash: {},
					data: data
				});
			} else {
				stack2 = depth0.value;
				stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
			}
			buffer += escapeExpression(stack2) + '" data-defaultSelected="';
			if (stack2 = helpers.defaultSelected) {
				stack2 = stack2.call(depth0, {
					hash: {},
					data: data
				});
			} else {
				stack2 = depth0.defaultSelected;
				stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
			}
			buffer += escapeExpression(stack2) + '" data-selected="';
			if (stack2 = helpers.selected) {
				stack2 = stack2.call(depth0, {
					hash: {},
					data: data
				});
			} else {
				stack2 = depth0.selected;
				stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
			}
			buffer += escapeExpression(stack2) + '"';

			if(stack2 = helpers.disabled){
                stack2 = stack2.call(depth0, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.program(2, g, data),
                    data: data
                })
            }else{
                stack2 = depth0.disabled;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            depth1.disabled || (stack2= u.call(depth0, stack2, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.program(2, g, data),
                    data: data
            })),(stack2 || 0 === stack2) && (buffer += stack2),
   			// 是否可用
			buffer += escapeExpression(stack2) + '">\n   <a href = "';

			// 连接地址
            if(stack2 = helpers.dataLink){
            	stack2 = stack2.call(depth0, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.programWithDepth(h, data, depth0),
					data: data
            })
            }else{
            	stack2 = depth0.dataLink;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            depth1.dataLink ||  (stack2 = u.call(depth0, stack2, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.programWithDepth(h, data, depth0),
					data: data

            })),(stack2 || 0 === stack2) && (buffer += stack2), 
            buffer += escapeExpression(stack2) + '"\n ';

		    // 打开方式
            if(stack2 = helpers.dataTarget){
            	stack2 = stack2.call(depth0, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.program(2, data, depth0),
					data: data
            })
            }else{
            	stack2 = depth0.dataTarget;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
             buffer += escapeExpression(stack2) + '\n ';

            //是否禁用
            if(stack2 = helpers.disabled){
                stack2 = stack2.call(depth0, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.program(2, g, data),
					data: data
                })
            }else{

                stack2 = depth0.disabled;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
             buffer += escapeExpression(stack2)+"\n ";

            //打开方式
            if(stack2 = helpers.dataFundChange){
                stack2 = stack2.call(depth0, {
                    hash: {},
					inverse: selstack1.noop,
					fn: selstack1.program(10, k, data),
					data: data
                })
            }else{

                stack2 = depth0.dataFundChange;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }


            buffer += escapeExpression(stack2) + '>\n ';
            // 内容
			if (stack2 = helpers.text) {
				stack2 = stack2.call(depth0, {
					hash: {},
					data: data
				});
			} else {
				stack2 = depth0.text;
				stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
			}
			if (stack2 || stack2 === 0) {
				buffer += stack2;
			}
			buffer += "</a></li>\n        ";
			return buffer;
		}

		function g() {
			return "disabled"
		}

		function h(a, b, c) {
			var d;
			return escapeExpression((d = c.dataLink, typeof d === functionType ? d.apply(a) : d))
		}

		function i() {
			return "#"
		}

		function j(a, b, c) {
			var d, e = "";
			return e += 'target="' + escapeExpression((d = c.dataTarget, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		function k() {
			return 'data-fund-change="true"'
		}

		function l(a, b, c) {
			var d, e = "";
			return e += 'data-tip="' + escapeExpression((d = c.dataTip, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		function m(a, b, c) {
			var d, e = "";
			return e += 'seed="' + escapeExpression((d = c.seed, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		function n(a, b, c) {
			var d, e = "";
			return e += 'data-action="' + escapeExpression((d = c.dataAction, typeof d === functionType ? d.apply(a) : d)) + '"'
		}

		buffer += '<div class="';
		if (stack1 = helpers.classPrefix) {
			stack1 = stack1.call(depth0, {
				hash: {},
				data: data
			});
		} else {
			stack1 = depth0.classPrefix;
			stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
		}
		buffer += escapeExpression(stack1) + '">\n    <ul class="';
		if (stack1 = helpers.classPrefix) {
			stack1 = stack1.call(depth0, {
				hash: {},
				data: data
			});
		} else {
			stack1 = depth0.classPrefix;
			stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
		}
		buffer += escapeExpression(stack1) + '-content" data-role="content">\n        ';
		//console.log(helpers);
		stack1 = helpers.each.call(depth0, depth0.options, {
			hash: {},
			inverse: selstack1.noop,
			fn: selstack1.programWithDepth(1, program1, data, depth0),
			data: data
		});
		if (stack1 || stack1 === 0) {
			buffer += stack1;
		}
		buffer += "\n    </ul>\n</div>\n";
		//console.warn(partials);
		return buffer;



	})

})