## 分类：
 基本（值）类型
  String  Number boolean undefined null 
 对象（引用）类型
   Array （数组下标，内部数据有序的）
   Object 任意对象
   Function  一种特别的对象（可以执行）
## 判断
  （1）typeof 返回数据类型的字符串表达式 'undefined'
      * 可以判断 undefined/数值 / 字符串  布尔  function 
      * 不可以判断 null 与Object   object与Array 
      
  （2）instanceof 
     * 判断对象的具体类型
     
  （3）=== 
      * 可以判断undefined,null
   
   var a = null  console.log(typeof a)   // 'object'
   
   ##  2. 对象
   var  b1 = {
      b2: [1,'abc',console.log],
      b3: function() {
        console.log('b3')
        return function() {
          return 'adadad'
        }
      }
   }
   
   console.log(b1 instanceof Object) // true  A instanceof B   A是否是B的实例
   
   console.log(b1.b2 instanceof Array, b1.b2 instanceof Object) // true   true
   
   console.log(b1.b3 instanceof Function,  b1.b3 instanceof Object) // true   true
   
   console.log(typeof b1.b3 === 'function') // true
   
   console.log(typeof b1.b2[2] === 'function') // true
   
   b1.b2[2](4)  // 类似 console.log(4)
   
  console.log( b1.b3()() ) // 'adadad'
  
  // 实例： 实例对象
  
  // 类型： 类型对象
  
 ##  undefined 与null的区别
    undefined 代表 定义了未赋值
    
    null 代表定义了，值为null
    
 ## 什么时候给变量赋值为null
 
    初始化赋值为null,表明将要赋值为对象
    
    结束前，让指向的对象成为垃圾对象（被垃圾回收器回收）
    
  ## 严格区别变量类型和数据类型？
     数据类型：
     
         基本类型  
         
         对象类型
         
     变量类型：（变量内存值的类型）
     
        基本类型：保存基本类型的数据
        
        引用类型： 保存的是地址值
   
   
   
   ## 1.什么是数据？
     * 存储在内存中代表特定的信息，本质上是0101...
   ## 2.什么是内存
   
      *可存储数据的空间（临时的）
      
      *内存产生和死亡：
   ## 3.什么是变量
        *可变化的量，有变量名和变量值组成
        
        *每一个变量都对应一块小内存，变量名用来查找对象的内存，变量值就是内存中保存的数据
        
   ## 内存，数据 变量三者之间的关系
      * 内存用来存储数据的空间
      
      * 变量是内存的标识
      
      * 数据
  
  ## 赋值和内存问题
   1.var a = xxx a内存中到底保存了什么
   
   * xx 是基本数据，保存的就是这个数值
   * xx是对象，保存的就是对象的地址值
   * xx 是一个变量，保存的是xxx的内容（内容可能是数值，也可能是地址值）
  
   ## 引用变量赋值问题
       * n个引用变量指向同一个对象,通过一个变量修改对象内部数据，另一个变量看到的是修改之后的数据
       
       * 2个引用变量指向同一个对象，让其中一个引用变量指向另一个对象，另一个引用变量依然指向前一个对象
       var  a = {age: 12}
       var b = a
        a = {age: 13, name: 'bob'}  a.age = 13 b.age = 12  b没有name属性
        
        function fn(obj) {
           obj = {age: 15}
        }
        fn(a)
        console.log(a.age)  //  a.age = 13  并不是15   obj 在fn()执行完后 obj = {age: 15} 就被释放了
        
 ## 数据传递问题
  * 在js调用函数时传递变量参数时，是值传递还是引用传递?
  
     (1) 都是值（基本、地址值）传递
     
     （2）可能是值传递，也可能是引用传递（地址值）
     
       ``` var a = 3
        function fn(a) { a = a+ 1}
        fn(a)
        console.log(a)  // 3
        
        function fn2(obj) { console.log(obj.name)}
        var obj = { name: 'tom'}
        fn2(obj) // 
        ```
 ## js 引擎如何管理内存
 1 内存生命周期
   * 分配小内存空间，得到它的使用权
   * 存储数据，可以反复进行操作
   *  释放小内存空间
 2 释放内存
   * 局部变量： 函数执行完自动释放
   * 对象： 成为垃圾对象 ==》 垃圾回收器回收
 ```
  var a = 3
  var obj = {} 
   全局变量不能释放
   
   function fn() {
    var b  = 4
   }
   fn() // b 在fn函数执行完 b 自动释放，b所指向的对象是在后面某个是个由垃圾回收器回收
  ```
   ## 什么是对象？
     * 多个数据的封装体
     * 用来保存多个数据的容器
     * 一个对象代表实现中的一个事物
     
     ``` 
       var obj = {
         name:　＂＂，
         age：　＇＇，
         setAge: function(age) {
           this.age = age
         }
       }
     ```
   ## 为什么要用对象
    * 统一管理多个数据
   ## 对象的组成
      * 属性 属性名（字符串）和属性值（任意）组成
      * 方法  一种特别的属性（属性值是函数）
   ## 如何访问对象内部数据？
      * 点属性名  有时不能用
      * ['属性名'] 能通用
      
   ## 什么时候必须使用  ['属性名'] 的方式？
    *1. 属性名包含特殊字符： -  空格
      var P = {}
      p['content-type'] = 'text/json'
    *2. 变量名不确定
      var propName = 'myAge'
      var value = 18
      // p.propName = value 不能使用
      p[propName] = value
   # 函数   
   ## 什么是函数？
    * 实现特定功能的n条语句的封装体
    * 只有函数时可以执行的，其他类型的数据不能执行
   ## 为什么要用函数？
     * 提高代码复用
     * 方便阅读交流
   ## 如何定义函数？
     * 函数声明  function fn() {}
     * 表达式  var fn2 = function () {}
      
   ## 如何调用执行函数？
    * test() 直接调用
    * obj.test() 通过对象调用
    * new test()  new 调用
    * test.call/ apply (obj) : 相当于obj.test() 临时让test成为obj的方法进行调用
    var obj = {}
    function test2() {
      this.xxx = 'aaa'
    }
    // obj.test2() // 不能直接这样调用
    test2.call(obj) // => obj.test2() 可以让一个函数成为指定任意对象的方法进行调用
    console.log(obj.xxx) // aaa
    
   ## 回调函数
   ## 什么函数才是回调函数
     * 你定义的
     * 你没有调
     * 但最终他执行了
   ## 常见的回调函数
      *dom事件回调函数
      *定时器 回调函数
      *ajax 请求回调函数
      *生命周期回调函数
   ```
     document.getElementById('btn').onclick = function() { // dom事件回调函数
       alert(this.innerHTML)
     }
     // 定时器  
     // 超时定时器
     setTimeout(function() {},2000)  // 定时器回调函数
     // 循环定时器
   ```
  # IIFE (立即执行函数表达式)
    1 理解
    2 作用
      * 隐藏实现
      * 不会污染外部（全局）命名空间
  （ function () {
      // 匿名函数自调用
      var a = 3
      console.log(a +3)
      //  a 局部变量
   }）（）
   
   （function() {
   
    var a = 1
    function test() { console.log(++ a) }
    window.$ = function () { // 向外暴露一个全局函数
      return {
        test: test
      }
    }
   }）()
   
   $().test() // 2   
   
   
   # this 问题
    * this是什么？
       （1）任何函数本质上都是通过某个对象来调用的,如果没有指定就是window
       （2）所有函数内部都有一个变量this ,它的值是调用函数的当前对象
    * 如何确定 this的值？
      （1）test() : window
      （2）p.test() ; p
      （3）new test(): 创建的对象
      （4）p.call(obj)  obj
    
    function Person(color) {
      console.log(this，‘1’)
      this.color = color
      this.getColor = function() {
        console.log(this，‘2’)
        return this.color
      };
      this.setColor = function (color) {
        console.log(this，‘3’)
        this.color = color 
      }
    }
    
    Person('red')  // this 是谁  window  1
    var p = new Person('yello') // this 是谁 p 
    p.getColor(); // this 是谁 p
    var obj = {} 
    p.setColor.call(obj, 'black') // this是谁  obj
    
    var test = p.setColor
    test(); // this是谁 window
    
   function fun1() {
      function fun2() {
      
       console.log(this)
      }
      fun2(); // this 是window
   }
   fun1();
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
