1.分类：
 基本（值）类型
  String  Number boolean undefined null 
 对象（引用）类型
   Array （数组下标，内部数据有序的）
   Object 任意对象
   Function  一种特别的对象（可以执行）
 2.判断
  （1）typeof 返回数据类型的字符串表达式 'undefined'
      可以判断 undefined/数值 / 字符串  布尔  function 
      不可以判断 null 与Object   object与Array 
      
  （2）instanceof  判断对象的具体类型
   （3）=== 可以判断undefined,null
   
   var a = null  console.log(typeof a)   // 'object'
   
   // 2. 对象
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
  
  1. undefined 与null的区别
    undefined 代表 定义了未赋值
    null 代表定义了，值为null
  2. 什么时候给变量赋值为null
    初始化赋值为null,表明将要赋值为对象
    结束前，让指向的对象成为垃圾对象（被垃圾回收器回收）
  3.严格区别变量类型和数据类型？
     数据类型：
         基本类型  
         对象类型
     变量类型：（变量内存值的类型）
        基本类型：保存基本类型的数据
        引用类型： 保存的是地址值
   
   
   
   ## 1.什么是数据？
       * 存储在内存中代表特定的信息，本质上是0101...
   ## 2.什么是内存？
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
       * 2个引用变量指向同一个对象
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
