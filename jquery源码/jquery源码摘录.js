//ID元匹配器工厂
Expr.filter["ID"] =  function( id ) {
  var attrId = id.replace( runescape, funescape );
  //生成一个匹配器，
  return function( elem ) {
    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
    //去除节点的id，判断跟目标是否一致
    return node && node.value === attrId;
  };
};
//属性元匹配器工厂
//name ：属性名
//operator ：操作符
//check ： 要检查的值
//例如选择器 [type="checkbox"]中，name="type" operator="=" check="checkbox"
"ATTR": function(name, operator, check) {
    //返回一个元匹配器
    return function(elem) {
        //先取出节点对应的属性值
        var result = Sizzle.attr(elem, name);

         //看看属性值有木有！
        if (result == null) {
            //如果操作符是不等号，返回真，因为当前属性为空 是不等于任何值的
            return operator === "!=";
        }
        //如果没有操作符，那就直接通过规则了
        if (!operator) {
            return true;
        }

        result += "";

        //如果是等号，判断目标值跟当前属性值相等是否为真
        return operator === "=" ? result === check :
           //如果是不等号，判断目标值跟当前属性值不相等是否为真
            operator === "!=" ? result !== check :
            //如果是起始相等，判断目标值是否在当前属性值的头部
            operator === "^=" ? check && result.indexOf(check) === 0 :
            //这样解释： lang*=en 匹配这样 <html lang="xxxxenxxx">的节点
            operator === "*=" ? check && result.indexOf(check) > -1 :
            //如果是末尾相等，判断目标值是否在当前属性值的末尾
            operator === "$=" ? check && result.slice(-check.length) === check :
            //这样解释： lang~=en 匹配这样 <html lang="zh_CN en">的节点
            operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
            //这样解释： lang=|en 匹配这样 <html lang="en-US">的节点
            operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
            //其他情况的操作符号表示不匹配
            false;
    };
},
