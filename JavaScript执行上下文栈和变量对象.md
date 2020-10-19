## 变量提升

  ```
    foo; // undefined
    var foo = function () { console.log('foo1') }
    foo(); // foo1
    var foo = function() { console.log('foo2') }
    foo(); // foo2
  ```
  
  ## 函数提升 (在同一个作用域下存在多个同名函数声明，后面的会替换前面的函数声明)
  
      ```
      foo(); //  foo2
      function  foo(){ console.log('foo1') }
      foo(); // foo2
      function() foo() { console.log('foo2') }
      foo(); // foo2
    ```
   ## 声明优先级， 函数 > 变量
   
    ```
      foo();// foo2
      var foo = function() { console.log('foo1') }
      foo(); // foo1 , foo被重新赋值
      function foo() { console.log('foo2') }
      foo(); // foo1
     ```
     ## 执行上下文
     
      （1） 全局执行上下文： 只有一个，浏览器中的全局对象就是window,this指向这个全局对象
      
      （2）函数执行上下文： 存在无数个，只有在函数被调用的时候才会被创建，每次调用都会创建一个新的执行上下文
      
      （3） Eval函数指向上下文： 指的是运行在eval函数中的代码，很少用
      
     ## 执行上下文栈
      
      （1）函数上下文
         
     
     
