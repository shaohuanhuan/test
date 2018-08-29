
//1----------------1
var s = new Set();

[2,3,5,4,5,2,2].map(x => s.add(x))

for (i of s) {console.log(i)}//2,3,5,4

//2-----------2
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
//a[6]//function(){console.log(i)}
a[6](); // 10

var a2 = [];
for (let i = 0; i < 10; i++) {
  a2[i] = function () {
    console.log(i);
  };
}
// console.log(a2[6]);
a2[6](); // 6
// 上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，
// 所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，
// 从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，
// 就在上一轮循环的基础上进行计算。
// 另外，for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。

// for (let i = 0; i < 3; i++) {
//   let i = 'abc';
//   console.log(i);
// }
// abc
// abc
// abc
// 上面代码输出了3次abc，这表明函数内部的变量i和外部的变量i是分离的。

//3--------------3
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError
// let bar = 2;
// let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

// if(true){
// 	var ok = '局部变量你能拿到？'
// }
// console.log(ok)//能

 // var a = 1;
 // function test1() {
 //     console.log(1,a);
 //     var a = 2;
 //     console.log(2,a);
 // }
 // test1();
 // console.log(3,a);//1,undefined  2,2  3,1

//4--------------------4
//  var a =1;
// function test(){
//     console.log(a);
// a为undefined! 这个a并不是全局变量，这是因为在function scope里已经声明了（函数体倒数第4行）一个重名的局部变量,
// 所以全局变量a被覆盖了，这说明了Javascript在执行前会对整个脚本文件的定义部分做完整分析,所以在函数test()执行前,
// 函数体中的变量a就被指向内部的局部变量.而不是指向外部的全局变量. 但这时a只有声明，还没赋值，所以输出undefined。
// 这=   var a; console.log(a)
//     a=4
//     console.log(a);  //a为4,没悬念了吧？ 这里的a还是局部变量哦！
//     var a;     //局部变量a在这行声明
//     console.log(a);  //a还是为4,这是因为之前已把4赋给a了
// }
// test();
// console.log(a); //a为1，这里并不在function scope内，a的值为全局变量的值


//es6 不存在变量提升
// let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。


//5 暂时性死区-----------5
// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

// var tmp = 123;
// if (true) {
//   tmp = 'abc'; // ReferenceError
//   let tmp;
// }
// 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。
// ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
// 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

var tmp = 123;
if (true) {
  tmp = 'abc'; // abc
  console.log(tmp)
  var tmp;
}

// if (true) {
//   // TDZ开始
//   tmp = 'abc'; // ReferenceError
//   console.log(tmp); // ReferenceError

//   let tmp; // TDZ结束
//   console.log(tmp); // undefined

//   tmp = 123;
//   console.log(tmp); // 123
// }
// 上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。

//6----------------------------6
//“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

// typeof x; // ReferenceError
// let x;
// 上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。
// 作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。
typeof undeclared_variable // "undefined"

//7---------------------------7
//有些“死区”比较隐蔽，不太容易发现。

// function bar(x = y, y = 2) {
//   return [x, y];
// }
// console.log(bar()); // 报错
//上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。如果y的默认值是x，就不会报错，因为此时x已经声明了。

function bar2(x = 2, y = x) {
  return [x, y];
}
console.log(bar2()); // [2, 2]

//8-----------------------8
// 不报错
var x = x;

// 报错
// let x = x;
// ReferenceError: x is not defined

// 上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。
// 上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
// ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，
// 从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。
// 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，
// 只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
//9---------------------
// 不允许重复声明
// let不允许在相同作用域内，重复声明同一个变量。

// 报错
// function () {
//   let a = 10;
//   var a = 1;
// }

// // 报错
// function () {
//   let a = 10;
//   let a = 1;
// }
//10-----------------------块级作用域

// 为什么需要块级作用域？
// ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

// 第一种场景，内层变量可能会覆盖外层变量。
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
// 上面代码中，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

// 第二种场景，用来计数的循环变量泄露为全局变量。
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
// 上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量

//11--------------------ES6的块级作用域
// let实际上为JavaScript新增了块级作用域。

function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
f1()
// 上面的函数有两个代码块，都声明了变量n，运行后输出5。
// 这表示外层代码块不受内层代码块的影响。如果使用var定义变量n，最后输出的值就是10。

//12-----------------------------12
// ES6允许块级作用域的任意嵌套。
{{{{{let insane = 'Hello World'}}}}};

// 内层作用域可以定义外层作用域的同名变量。
{{{{
  let insane = 'Hello World1';
  {let insane = 'Hello World2'
  console.log(insane) // Hello World2
  }
  console.log('insane', insane) // Hello World1
}}}};

//13------------------------------13
//块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
// IIFE 写法
(function () {
  var tmp = 111;
 console.log(tmp)
}());
// (function () {
//   var tmp = 111;
//  console.log(tmp)
// })(); 上面执行结果跟这个相同
// 块级作用域写法
{
  let tmp = 222;
 console.log(tmp)
}

//14-------------------------------14
// 函数能不能在块级作用域之中声明，是一个相当令人混淆的问题。
// ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
}
// 上面代码的两种函数声明，根据ES5的规定都是非法的。
// 但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，
// 因此上面两种情况实际都能运行，不会报错。不过，“严格模式”下还是会报错。

// ES5严格模式
// "use strict";
// if (true) {
//   function f() {}
// }
// 报错

// ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
// ES6严格模式
// "use strict";
// if (true) {
//   function f() {}
// }
// 不报错

//15--------------------------------------15
// ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
// function f() { console.log('I am outside!'); }
// (function () {
//   // BBB
//   if (false) {
//     // 重复声明一次函数f AAA
//     function f() { console.log('I am inside!'); }
//   }

//   f();// chrome -f is not a function
// }());
// es5里 AAA会变量提升到BBB的位置，所以会输出"I am inside"
// ES6中，理论上会得到 "I am outside",因为块级作用域内声明的函数类似于let,对作用域之外没有影响，但是，实际情况下是报错的。
// 因为 改变了块级作用域内的函数的处理规则，会对旧代码产生很大影响，为此，ES6附录B中规定，浏览器的实现可以不遵守上面的规定，而有自己的行为方式

// 上面代码在 ES5 中运行，会得到因为在if内声明的函数f会被提升到函数头部，
// 实际运行的代码如下。
// ES5版本
function f2() { console.log('I am outside!'); }
(function () {
  function f2() { console.log('I am inside!'); }
  if (false) {
  }
  f2();//“I am inside!”，
}());

// 因为块级作用域内声明的函数类似于let，对作用域之外没有影响，实际运行的代码如下。
// ES6版本
function f3() { console.log('I am outside!'); }
(function () {
  f3();//“I am outside!”。
}());
// 很显然，这种行为差异会对老代码产生很大影响。为了减轻因此产生的不兼容问题，

// ES6在附录B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
// -允许在块级作用域内声明函数。
// -函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
// -同时，函数声明还会提升到所在的块级作用域的头部。
// 注意，上面三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，
//还是将块级作用域的函数声明当作let处理。

//16-------------------16
// 另外，还有一个需要注意的地方。ES6的块级作用域允许声明函数的规则，
// 只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

// 不报错
// 'use strict';
// if (true) {
//   function f() {}
// }

// 报错
// 'use strict';
// if (true)  function f() {}


//17---------------------do 表达式
// 本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。

{
  let t = f();
  console.log(t,f)
  t = t * t + 1;
}
// 上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到t的值，
// 因为块级作用域不返回值，除非t是全局变量。

// 现在有一个提案，使得块级作用域可以变为表达式，也就是说可以返回值，
// 办法就是在块级作用域之前加上do，使它变为do表达式。

// let x = do {
//   let t = f();
//   t * t + 1;
// };
// 上面代码中，变量x会得到整个块级作用域的返回值。