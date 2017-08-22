//1------------------
// a = 10;
// (function a(){
//   console.log(2,a)
//   a = 1;
//   console.log(a);// function a(){...}？？？？？？？？？
// })();


// a2 = 10;
// //上面的(function a(){})()等于
// var a2 = function(){
//   a2 = 1;
//   console.log(a2);// 1
// };
// a2(); 
//上面a1 a2的结果居然不一样？？？

//变量提升--------------------2
// var a5 =1;
// function test(){
//     console.log(a5); //undefined
//     a5 = 4
//     console.log(a5); //a为4,没悬念了吧？ 这里的a还是局部变量哦！
//     var a5; //局部变量a在这行声明
//     console.log(a5); //a还是为4,这是因为之前已把4赋给a了
// }
// test();
// console.log(a5); //a为1，这里并不在function scope内，a的值为全局变量的值

// var a = 1;
// function b() {
// console.log(a);//function a(){}
// a = 10;
// function a() {}
// }
// b();// 


//函数提升------------------------3
// function t1(age) {
//     console.log(age);//function age(){}
//     var age = 27;
//     console.log(age);//27
//     function age() {}
//     console.log(age);//27
// }
// t1(3); 

// //上面相当于这个
// function t2(age2) {
//   var age2 = function () {}
//   console.log(age2);
//   var age2 = 27;
//   console.log(age2);

//   console.log(age2);
// }
// t2(3);

//变量声明提升，函数表达式。变量作用域问题，一this指向问题，js的运算符优先级
// function Foo() {
//     getName = function () {  console.log(1); };
//     return this;
// }
// Foo.getName = function () { console.log(2);};
// Foo.prototype.getName = function () { console.log(3);};
// var getName = function () { console.log(4);};
// function getName() { console.log(5);}
 
// //请写出以下输出结果：
// Foo.getName();//2
// console.log('mm1')
// getName();//4
// console.log('mm2')
// Foo().getName();//1
// console.log('mm3')
// getName();//1
// console.log('mm4')
// new Foo.getName();//2
// console.log('mm5')
// new Foo().getName();//3
// console.log('mm6')
// new new Foo().getName();//3
// console.log('mm7')

// var a = 1; 
// function b() { 
//   alert(a); //function a(){}
//   a = 10; 
// function a() {} 
// } 
// b();

// var a6 =1;
// function b6(){ 
//   var a6;
//   a6 = function(){
//   }
//   alert(a6);//function(){}
//   a6 = 10;
// }
// b6();

// function a(i) {
// alert(i);// 10
// var i = 1;
// alert(i);// 1
// };
// a(10); 

//变量属性-----------------4
//当一个变量被声明后，扩充其属性并不会改变原数据类型。
// var a = [];
// a[0] = 1;
// a['foobar'] = 2;
// console.log(a)//0:1,foobar:2
// console.log(a.length);//1 是数组的长度，跟属性无关
// console.log(a.foobar)//2

//----简单回调代码
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    fn();
}
function doFoo2(o){
    o.foo();
}
var obj = {
    a: 2,
    foo: foo
};
var a = "I'm an a";
doFoo(obj.foo);//I'm an a
doFoo2(obj);//2