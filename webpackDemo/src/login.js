
require('jquery');
require('./less/login.less');
var userName = "68kejian.com";
var age=123;

var fav="ddd";

//把属性和方法公开，public
module.exports.age=age;
module.exports.userName = userName;
module.exports.sayName = function() {
    return userName;
};