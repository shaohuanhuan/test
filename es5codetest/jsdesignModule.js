/**
 * javascript设计模式
 */

// 创建一个自包含的模块来实现Module模块
var testModule = (function () {
    var counter = 0
    return {
      incrementCounter: function () {
        return ++counter
      },
      resetCounter: function () {
        console.log("counter value prior to reset:" + counter)
        counter = 0
      }
    }
})()
// 增加计数器
testModule.incrementCounter() // 1
// 检查计数器值并重置
testModule.resetCounter() // counter value prior to reset:1
// console.log(counter) // Uncaught ReferenceError: counter is not defined

// 一个包含命名空间,公有和私有变量的Module模式
var myNamespace = (function () {
  // 私有计数器变量
  var myPrivateVar = 0
  // 记录所有参数的私有函数
  var myPrivateMethod = function (foo) {
    console.log('foo', foo)
  }
  return {
    // 公有变量
    myPublicVar: 'foo',
    // 调用私有变量和方法的公有函数
    myPublicFunction: function (bar) {
      myPrivateVar++
      console.log(111, myPrivateVar)
      myPrivateMethod(bar)
    }
  }
})()
myNamespace.myPublicFunction('bar') // 111, 1 // foo bar
myNamespace.myPublicFunction('bar2')
console.log(myNamespace.myPublicVar) // foo

// 购物车
var basketModule = (function () {
  // 私有
  var basket = []
  function doSthPrivate () {
    console.log('dosth', basket[0].item)
  }
  function doSthElsePrivate () {}
  // 返回一个暴露出的公有对象
  return {
    addItem: (values) => {
      basket.push(values)
    },
    getItemCount: () => {
      return basket.length
    },
    // 私有函数的公有形式别名
    doSth: doSthPrivate,
    getTotal: () => {
      var itemCount = this.getItemCount(),
          total = 0
      while (itemCount--) {
        total += basket[itemCount].price
      }
      return total
    }
  }
})()
// 在该模块中，可能已经注意到返回了一个object,它会被自动赋值给backetModule，以便我们可以与他交互
basketModule.addItem({
  item: 'bread',
  price: 0.5
})
console.log(basketModule.getItemCount())
basketModule.doSth()

console.log(basketModule.basket) // 输出undefined,因为basket自身没有暴露在公有API里
// console.log(basket) // 不能正常工作，因为basket只存在于basketModule闭包的作用域里，而不是存在于返回的公有对象里

// 引入
var myModule = (function () {
  // 模块对象
  var module  = {}, privateVar = 'hello World';
   function privateMethod () {}
   module.publicProperty = 'foobar'
   module.publicMethod = function () {
     console.log(privateVar)
   }
   return module
})()
myModule.publicMethod() // hello World 这就是访问人家函数里的局部变量吗 这就是会导致内存泄露的闭包吗


var myRevealingModule = function () {
  var privateVar = "Ben Cherry",
    publicVar = "Hey there";
  function privateFunction () {
    console.log("name:" + privateVar)
  }
  function publicSetName(strName) {
    privateName = strName
  }
  function publicGetName () {
    privateFunction()
  }
  // 将暴露的公有指针指向到私有函数和属性上
  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
}();
myRevealingModule.setName("shaohuanhuan")
console.log(myRevealingModule)
