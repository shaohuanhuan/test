webpackJsonp([1],{0:/*!*****************!*\
  !*** multi app ***!
  \*****************/
function(e,n,t){e.exports=t(/*! ./src/index.js */111)},111:/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function(e,n,t){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o=t(/*! ./sub */113),u=n(o);t(/*! moment */1),t(/*! ./login */112);t(/*! ./css/index.css */114),e.ajax({type:"GET",url:"/json.php",data:{},dataType:"json",beforeSend:function(){},success:function(e){console.log(e)},error:function(e){}}),e("#welcome").html((0,u.default)())}).call(n,t(/*! jquery */2))},112:/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
function(e,n,t){"use strict";t(/*! jquery */2),t(/*! ./less/login.less */115);var o="68kejian.com",u=123;e.exports.age=u,e.exports.userName=o,e.exports.sayName=function(){return o}},113:/*!********************!*\
  !*** ./src/sub.js ***!
  \********************/
function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){var e=document.createElement("h2");return e.innerHTML="Hello h2 world hahaha",e}},114:/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
function(e,n){},115:/*!*****************************!*\
  !*** ./src/less/login.less ***!
  \*****************************/
function(e,n){}});
//# sourceMappingURL=bundle_app.js.map