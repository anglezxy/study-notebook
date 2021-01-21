## javascript typeof null 和undefined

```
typeof "John"                // 返回 string
typeof 3.14                  // 返回 number
typeof false                 // 返回 boolean
typeof [1,2,3,4]             // 返回 object
typeof {name:'John', age:34} // 返回 object
```



	 在JavaScript中，数组是一种特殊的对象类型。 因此 typeof [1,2,3,4] 返回 object。 

```
`typeof undefined             // undefined`
`typeof null                  // object`
`null === undefined           // false`
`null == undefined            // true`
```

- ## JavaScript this 关键字

- 但在 JavaScript 中 this 不是固定不变的，它会随着执行环境的改变而改变。

- 在方法中，this 表示该方法所属的对象。

- 如果单独使用，this 表示全局对象。

- 在函数中，this 表示全局对象。

- 在函数中，在严格模式下，this 是未定义的(undefined)。

- 在事件中，this 表示接收事件的元素。

- ==类似 call() 和 apply() 方法可以将 this 引用到任何对象。==

**apply call  改变this指向**

```
var person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
var person2 = {
  firstName:"John",
  lastName: "Doe",
}
person1.fullName.call(person2);  // 返回 "John Doe"
```

## let const （变量提升 先使用后声明，let const均不允许，var可以）

***const定义常量与使用let 定义的变量相似：***

二者都是块级作用域
		都不能和它所在作用域内的其他变量或函数拥有相同的名称
两者还有以下==两点区别==：

const声明的常量必须初始化，而let声明的变量不用
       const 定义常量的值不能通过再赋值修改，也不能再次声明。而 let 定义的变量值可以修改。

## _.throttle(func, [wait=0],[options = {}])

- 在wait秒内最多执行func一次
*** 参数 ***
- func (Function): 要节流的函数。
- [wait=0] (number): 需要节流的毫秒。
- [options={}] (Object): 选项对象。
- [options.leading=true] (boolean): 指定调用在节流开始前。
- [options.trailing=true] (boolean): 指定调用在节流结束后。
*** 返回节流的函数 ***
```
      // 避免在滚动时过分的更新定位
    jQuery(window).on('scroll', _.throttle(updatePosition, 100));
    
    // 点击后就调用 `renewToken`，但5分钟内超过1次。
    var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
    jQuery(element).on('click', throttled);
    
    // 取消一个 trailing 的节流调用。
    jQuery(window).on('popstate', throttled.cancel);
```

## _.debounce(func,[wait=0],[options = {}])

- 该函数会从上一次被调用后.延迟wait毫秒后调用func方法
*** 参数 ***
- func (Function): 要防抖动的函数。
- [wait=0] (number): 需要延迟的毫秒数。
- [options={}] (Object): 选项对象。
- [options.leading=false] (boolean): 指定在延迟开始前调用。
- [options.maxWait] (number): 设置 func 允许被延迟的最大值。
- [options.trailing=true] (boolean): 指定在延迟结束后调用。
*** 返回debounced（防抖动）函数。**
```
  // 避免窗口在变动时出现昂贵的计算开销。
  jQuery(window).on('resize', _.debounce(calculateLayout, 150));
  
  // 当点击时 `sendMail` 随后就被调用。
  jQuery(element).on('click', _.debounce(sendMail, 300, {
    'leading': true,
    'trailing': false
  }));
  
  // 确保 `batchLog` 调用1次之后，1秒内会被触发。
  var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
  var source = new EventSource('/stream');
  jQuery(source).on('message', debounced);
  
  // 取消一个 trailing 的防抖动调用
  jQuery(window).on('popstate', debounced.cancel);
```

## instanceof 的高级用法
- 所有对象和函数 instanceof  Object // **true** ==(因为js万物皆对象，函数也是对象)==
- 所有函数 instanceof Function // **true**  ==(普通函数和构造函数)==
- 除Object 和Function 之外的构造函数 instanceof 自身 //  **false** ==(构造函数的原型链上只有Function.prototype和Object.prototype而没有他们自身的prototype)==

``` 
    console.log(Object instanceof Object);//true 
    console.log(Function instanceof Function);//true 
    console.log(Number instanceof Number);//false 
    console.log(String instanceof String);//false 
    console.log(Function instanceof Object);//true 
    console.log(Foo instanceof Function);//true 
    console.log(Foo instanceof Foo);//false
```
## echarts 图表刷新问题
 ```
     resizeEcharts() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
   this.$echarts.init(document.getElementById('regionalDistributionData')).resize();
        },500)
      },
   在mounted() { 
      window.addEventListener('resize', this.resizeEcharts);
   }  
 ```

- 如果有==多个图表tab切换展示==，那么需要手动调用 
      this.$echarts.init(document.getElementById('regionalDistributionData')).resize();

  
  ## 判断this
  1. 函数是否在new中调用，如果是的话this绑定的是新创建的对象
   var bar = new foo()
  2. 函数是否通过call apply 或者应绑定调用，如果是，this绑定的是指定的对象
   var bar = foo.call(obj2)
  3.函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象。
      var bar = obj1.foo();

    function foo(a,b) {
      console.log(a,b)
    }
    foo.apply(null,[2,3]) // a:2,b:3
    // 使用bind() 进行科里划
    var bar = foo.bind(null,2)
    bar(3) // a: 2,b:3

    ## Vue生命周期

```
 var vm = new Vue({
    el: '#app',
    data: {
      message: 'Vue的生命周期'
    },
    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
      console.log("%c%s", "color:red","message: " + this.message) //undefined 
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);   
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el); 
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);  
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message)
    }
  })
</script>
```

==beforeCreate==  el，data 实例还没有创建,created el未创建 data初始化完成

==beforeMounted== 和mounted el 初始化完成

==beforeUpdate== 检测到数据变化，并未更新视图

==updated== 视图重新渲染完成

==activated== 被 keep-alive 缓存的组件激活时调用。

==deactivated== 被 keep-alive 缓存的组件停用时调用。

==beforeDestroy== 实例销毁之前调用。在这一步，实例仍然完全可用。

==destroyed==  实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

## Vue指令

v-text  v-html v-show v-if v-for v-model v-slot v-bind v-on v-pre v-else v-cloak v-once

==v-cloak== 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

==key==的特殊属性主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes.如果不适用key,Vue会使用一种最大限度减少动态原色并尽可能的尝试的修改、复用相同类型元素的算法。使用key，他会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。

## 数据双向绑定原理

![image-20200512110244446](C:\Users\simmed\AppData\Roaming\Typora\typora-user-images\image-20200512110244446.png)

## 事件修饰符

.stop  .prevent .capture .self .once .passive

## 自定义指令

## 钩子函数

## 导航钩子

## Vuex

## vue几种方式传值

1、路由传参 2、prop  3、emit事件传参  3、Vuex

## Vue项目有哪些优化

1、路由懒加载 2、图片懒加载 、3 webpack 热更新 4、合理使用v-if v-show 5、图片进行压缩

## echarts 渲染为啥在mounted里做

## 一个点击事件可以绑定多个方法吗？（可以的）

## 数据和页面不一起出来怎么解决？

## Vue 中key作用

## bind call apply区别

> 参数、绑定规则（显示绑定和强绑定），运行效率（最终都会转换成一个一个的参数去运行）、运行情况（`call`，`apply` 立即执行，`bind` 是`return` 出一个 `this` “固定”的函数，这也是为什么 `bind` 是强绑定的一个原因）

> 注：“固定”这个词的含义，它指的固定是指只要传进去了 `context`，则 `bind` 中 `return` 出来的函数 `this` 便一直指向 `context`，除非 `context` 是个变量

## 解释一下防抖和节流

## ios中button 点击响应慢怎么办？（使用better-click）

## flex属性和用途

- flex-direction 排列方向
- flex-wrap  换行
- flex-flow
- justify-content 对齐方式
- align-items  属性定义项目在交叉轴上如何对齐
- align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## 如何使用css3写出fontSize: 10px的字体

项目中遇到哪些问题

ios系统中微信自带浏览器对div写的按钮识别不是很灵敏  必须button标签写按钮

vue项目中用v-for 循环本地图片， 图片不显示，解决办法：使用require动态引入图片，或将图片放static文件夹里面

经常遇到的问题就是Cannot read property ‘prototype’ of undefined
解决办法通过浏览器报错提示代码定位问题，解决问题

Vue项目中遇到视图不更新，方法不执行
查看代码运行到那个阶段未之行结束

前端性能优化：

1、减少请求资源大小和请求次数：

	合并压缩css和js文件
	尽量使用字体图标和svg图标来代替png图片
	采用图片懒加载
	使用雪碧图，将所有相对较小的图片合在一张大图上
2、代码层面上：
	减少dom操作
	减少闭包的使用（闭包所在的上下文会被释放）

原型：
	构造函数是一种特殊的方法，主要用来在创建对象时初始化对象。每个构造函数都有prototype(原型)属性
	这个prototype(原型)属性是一个指针，指向一个对象，这个对象的用途是包含特定类型的所有实例共享的
	属性和方法，即这个原型对象是用来给实例对象共享属性和方法的。每个实例对象的__proto__都指向这个
	构造函数/类的prototype属性。

面向对象的三大特性：继承/多态/封装

原型链：

每个对象都可以有一个原型_proto_，这个原型还可以有它自己的原型，当我们查找特定属性的时候，我们先去这个对象里去找，如果没有的话就去它的原型对象里面去。。。层层往上寻找就形成了原型链

闭包：

函数和函数内部能访问到的局部变量的组合叫闭包
函数嵌套函数就是因为需要一个局部变量
需要return出来这个函数是因为方便访问到这个函数
闭包是一个可以访问外部作用域的内部函数，即使这个外部作用域已经执行结束。

sass和less的区别

定义变量的符号不同，less是用@，sass使用$
变量的作用域不同，less在全局定义，就作用在全局，在代码块中定义，就作用于整哥代码块。而sass只作用域全局。
编译环境不同，less在开发者环境编译，sass在服务器环境下编译。

前端工程化和模块化

工程化：将前端项目当成一个工程化系统去分析、组织和构建从而达到项目结构清晰、分工明确，团队配合默契、提高开发效率的目的
模块化：一个模块就是实现一个功能的文件，有了模块我们就更容易的使用别人的代码，需要什么功能就加载什么模块
js模块化有AMD（RequireJS异步）、commonJS（同步）、ES6Module,css模块化有less、sass
模块化优点：避免变量污染、命名冲突；提高代码复用率；提高维护性


箭头函数和普通函数this指向不同

	箭头函数：this代表的是继承上层对象，如果没有上层对象，则代表的是widow
	普通函数：this代表的是当前对象

严格模式和非严格模式（use strict）

	1、所有变量必须要声明
	2、delete后跟着非法标识符会报错
	3、禁止使用with语句
	4、函数中声明同参数名会报错
	5、对象中声明同属性名会报错
	6、eval和arguments当作关键字，并且不允许修改

跨域问题解决方案

同源策略原因，域名不同、端口不同、协议不同
	1、jsonp：动态创建script标签，将要请求数据的域写在src中，后面参数附带回调方法
	服务器端货获取到回调函数的参数，返回数据
	2、CORS：服务器端设置响应头来指定哪些域可以访问本域下的数据

ES6
let、const、var有什么区别
let和var用法上相同、
let定义的变量只在本作用域下有用功
let定义的变量不存在变量提升即必须在let定义的变量之后使用
const声明的是只读变量，一旦声明就不可更改

常用的es6语法
1）let声明变量和const声明常量，两个都有块级作用域
　　ES5中是没有块级作用域的，并且var有变量提升，在let中，使用的变量一定要进行声明
2）箭头函数
　　ES6中的函数定义不再使用关键字function()，而是利用了()=>来进行定义
3）解构赋值
　　ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值
4）import、export导入导出
　　ES6标准中，Js原生支持模块(module)。将JS代码分割成不同功能的小块进行模块化，将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用
5）set数据结构
　　Set数据结构，类似数组。所有的数据都是唯一的，没有重复的值。它本身是一个构造函数
6）… 展开运算符
　　可以将数组或对象里面的值展开；还可以将多个值收集为一个变量

promise
解决异步处理的方法
两个特点：
1、Promise对象的状态不受外界影响
	pending 初始状态、fulfilled 成功状态、rejected 失败状态
	Promise 有以上三种状态，只有异步操作的结果可以决定当前是哪一种状态，其他任何操作都无法改变这个状态
2、Promise的状态一旦改变，就不会再变，任何时候都可以得到这个结果，状态不可以逆
	只能由 pending变成fulfilled或者由pending变成rejected
	const promise = new Promise(function(resolve, reject) {
	      if (/* 异步操作成功 */){
		resolve(value);
	      } else {
		reject(error);
	      }
	  });
	  
http缓存机制
浏览器会查看是否已有缓存数据，如果没有缓存数据，向服务器发起请求，服务器返回数据给浏览器，浏览器存储缓存数据
缓存类型分为强缓存和协商缓存
1.	强缓存：所请求的数据在缓存中尚未过期时，不与服务器进行交互，直接使用缓存数据库的数据
2.	协商缓存：从缓存数据中取出缓存标识，然后向服务器发送验证请求验证数据是否更新，
如果已经更新，则返回新的数据，若未更新，则使用缓存数据的缓存数据

选择器有哪些
全局选择器、标签选择器、类选择器、id选择器、子选择器（用>表示）、包含选择器、
兄弟选择器（用～表示）、相邻选择器（用+表示）伪类选择器

数组去重
1、ES6中的set方法
2、for…for..双层循环，再判断是否相等，再用split去重
3、利用indexOf去重（前提判断是不是数组）

盒模型
基本组成：content、padding、border、margin
分两种：标准模型、IE模型
标准模型宽高是指content的宽高
IE模型宽高指content + padding + border的总宽高
css3设置： 
标准模型：box-sizing:content-box;
IE模型：box-sizing:border-box;

BFC解决边距重叠的问题
float属性不为none（脱离文档流）
position为absolute或fixed
display为inline-block,table-cell,table-caption,flex,inine-flex
overflow不为visible
根元素
应用场景
自适应两栏布局
清除内部浮动 
防止垂直margin重叠

webpack
webpack是一个预编译模块方案，它会分析你的项目结构将其打包成适合浏览器加载的模块。
打包原理：把所有依赖打包成一个bundle.js文件，通过代码分割成单元片段并按需加载。
1. entry:{} 入口，支持多入口
2. output 出口
3. resolve 处理依赖模块路径的解析
4. module 处理多种文件格式的loader
5. plugins 除了文件格式转化由loader来处理，其他大多数由plugin来处理
6. devServer 配置 webpack-dev-server
7. 搭配package.json配置环境变量，以及脚本配置。
"scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development"
}

"scripts": {
    "build_": "NODE_ENV=production webpack",
    "start_": "NODE_ENV=development webpack-dev-server"
}

loader:

	file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
	url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
	source-map-loader：加载额外的 Source Map 文件，以方便断点调试
	image-loader：加载并且压缩图片文件
	babel-loader：把 ES6 转换成 ES5
	css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
	style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
	eslint-loader：通过 ESLint 检查 JavaScript 代码


forEach()和map()的区别
想创建一个新的数组时使用map，如果只是想对数据做一些事情时，使用forEach
forEach没有返回值
map有返回值 可以return出来

网页从输入网址到渲染完成经历了哪些过程？
输入网址；

	发送到DNS服务器，并获取域名对应的web服务器对应的ip地址；
	与web服务器建立TCP连接；
	浏览器向web服务器发送http请求；
	web服务器响应请求，并返回指定url的数据（或错误信息，或重定向的新的url地址）；
	浏览器下载web服务器返回的数据及解析html源文件；
	生成DOM树，解析css和js，渲染页面，直至显示完成；
	建立TCP连接->发送请求行->发送请求头->（到达服务器）发送状态行->发送响应头->发送响应数据->断TCP连接

http请求方法

	GET： 用于请求访问已经被URI（统一资源标识符）识别的资源，可以通过URL传参给服务器
	POST：用于传输信息给服务器，主要功能与GET方法类似，但一般推荐使用POST方式。
	PUT： 传输文件，报文主体中包含文件内容，保存到对应URI位置。
	HEAD： 获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效。
	DELETE：删除文件，与PUT方法相反，删除对应URI位置的文件。
	OPTIONS：查询相应URI支持的HTTP方法。

get和post的区别：

	1、get是从服务器上获取数据  post是向服务器传送数据
	2、get传送的数据量小（不能超过2kb）post传送数据量大，一般不受限制
	3、get因为传送数据在URL上，所以安全性低  post安全性高
	4、get所传送的中文字符会乱码  post支持中文字符

http和https区别：

	1、https有ca证书，http一般没有
	2、http是超文本传输协议，信息是明文传输。https则是具有安全性的ssl加密传输协议
	3、http默认80端口，https默认443端口。

http常见状态码

	200：成功
	302：重定向
	404：请求失败，请求希望得到的资源违背在服务器发现。（只要不是新手写的demo，一般404都是你路径写错了，或者未区分大小写啥的）
	502：无效的响应（基本上就是Tomcat没启好）
	400：请求没有进入到后台服务里（一般都是前端的锅）

css3动画：
@keyframes 定义动画
animation：将定义的动画绑定到属性上去

flex

	display:flex
	flex-direction: row | row-reverse | column | column-reverse;(主轴的方向)
	flex-wrap:nowrap | wrap | wrap-reverse(如果一条轴线排不下，如何换行)
	flex-flow: flex-direction属性和flex-wrap属性的简写形式
	justify-content:flex-start | flex-end | center | space-between | space-around(主轴上的对齐方式)
	align-items: flex-start | flex-end | center | baseline | stretch(交叉轴上如何对齐)
	align-content:flex-start | flex-end | center | space-between | space-around | stretch(多根轴线的对齐方式)


React
react和vue的共同点和不同点：
共同点：
1.都支持服务器端渲染
2.都有Virtual DOM,组件化开发,通过props参数进行父子组件数据的传递
3.都有管理状态，React有redux,Vue有自己的Vuex
不同点：
1、react严格模式说是MVC的view层，vue是MVVM模式
2、virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.而对于React      
   而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需shouldComponentUpdate 
   这个生命周期函数方法来进行控制
3、数据绑定: vue实现了数据的双向绑定,react数据流动是单向的

react的优点：
它提高了应用的性能
可以方便地在客户端和服务器端使用
由于 JSX，代码的可读性很好
React 很容易与 Meteor，Angular 等其他框架集成
使用React，编写UI测试用例变得非常容易

Redux
用户页面行为触发一个Action，
然后Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action
Reducer 会返回新的 State 。
每当state更新之后，view会根据state触发重新渲染

react生命周期
getDefaultProps:获取实例的默认属性
getInitialState:获取每个实例的初始化状态
componentWillMount：组件即将被装载、渲染到页面上
render:组件在这里生成虚拟的 DOM 节点
componentDidMount:组件真正在被装载之后
componentWillReceiveProps:组件将要接收到属性的时候调用
shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
componentWillUpdate:组件即将更新不能修改属性和状态
render:组件重新描绘
componentDidUpdate:组件已经更新

新的生命周期（react16新增，17将要删除）
constructor 加载时调用一次，可以初始化state
static getDerivedStateFromProps(props, state)
componentDidMount 组件渲染之后调用  只调用一次
shouldComponentUpdate(nextProps, nextState)
getSnapshotBeforeUpdate(prevProps, prevState)
componentDidCatch  对错误的处理

reac性能优化在哪个周期
shouldComponentUpdate,这个方法用来判断是否需要调用 render 方法重新渲染 dom, 如果返回false，接收到数据后将不会更新

什么是虚拟Dom
当数据发生变化时，将在虚拟DOM中重新渲染，
然后通过diff算法计算出新老之间的差异，
将修改的部分更新到真实的dom树上

为什么虚拟Dom会提高性能？
虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。

react diff的原理
把树形结构按照层级分解，只比较同级元素。

state和props有何不同
state是一种数据结构，用于组件挂载时所需要的默认值，可能随着时间推移而发生改变
props是组件的配置，由父组件传递给子组件，组件是不可以改变自身的props

在react的何时发起ajax请求
应该在componentDidMount生命周期发起请求，这个方法会在第一次挂载完之后执行，而且仅会执行一次

构造函数中调用super(props)的目的是什么
在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。
传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props

react中keys的作用
是为了区分在同级元素中唯一性的标识，Diff算法也会借助key值来判断是新近创建的元素还是被移动而来的元素，从而避免不必要的渲染
此外，react还需要借助key值来判断元素与本地状态的关联关系

refs的作用是什么
Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。
我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回
通俗理解：可以在dom元素上绑定ref属性，这个属性声明的回调函数会返回对应的dom元素，我们可以将其绑定在this指针上，方便使用
如果绑定在组件上可以返回该组件实例（只能绑定在类组件上，因为函数式组件没有实例；但是可以绑定在函数式组件内部）

react中组件传值
父传子（组件嵌套浅）：父组件定义一个属性，子组件通过this.props接收。
子传父：父组件定义一个属性，并将一个回调函数赋值给定义的属性，然后子组件进行调用传过来的函数，并将参数传进去，在父组件的回调函数中即可获得子组件传过来的值。

react中的hooks
在无状态组件中使用
hook—useState 声明状态变量
hook—useEffect 类似于componentDidMount生命周期钩子的功能
hook —useContext 提供上下午的功能
hook必须写在函数的最外层  不能写在if…else等条件语句中 为了确保执行顺序一致


什么是高阶组件（HOC）？
高阶组件是重用组件逻辑的高级方法，是一种组件模式。HOC是自定义组件，在它内部包含另一个组件。
它们可以接受子组件提供的任何动态，但不会修改其输入组件中的任何行为，可以认为它是一个纯组件
另一种解释：一个函数接收一个组件作为参数，经过一系列加过返回一个新的组件

高阶组件作用
更改props、抽象state、将组件与其他DOM包装到一起

展示组件和容器组件
展示组件关心组件看起来是什么，展示专门通过props接受数据和回调，几乎不会拥有自身的状态
但当展示组件拥有自身的状态时，也只会关心UI状态而不是数据状态
容器组件则关心组件是如何运作的，容器组件会为展示组件提供数据和行为，会调用flux actions，将其作为回调提供给展示组件，
展示组件时有状态的，因为他们时数据源

函数式组件和类组件
表现为一个只带一个render方法的组件类通过函数形式或者es6中的arrow function的形式创建
函数式组件区分于类组件的是它无状态无生命周期
但可以借助react提供的hooks在函数式组件中做状态和方法
只负责根据传入的props来展示，不涉及到state状态操作

特点：
组件不会被实例化，整体渲染性能得到提升
组件不能访问this对象
组件无访问生命周期的方法

受控组件和非受控组件
受控组件：组件的状态受react控制，并且只能用setState()方法进行更新
非受控组件：组件的状态不受react控制，比如 <input> , <textarea> , 和 <select> 这类表单元素会维持自身状态，并根据用户输入进行更新

JSX
jsx即javaScript XML，一种在React组件内部构建标签的类XML语法，是react.js开发的语法糖
优点：
1.允许使用熟悉的语法来定义 HTML 元素树；
2.提供更加语义化且移动的标签；
3.程序结构更容易被直观化；
4.抽象了 React Element 的创建过程；
5.可以随时掌控 HTML 标签以及生成这些标签的代码；
6.是原生的 JavaScript。


组件创建的方法
函数式定义的无状态组件
react.createClass定义的组件
extends react.component定义的组件

Mobx
先使用@observble创建一个被观察的值
再使用@observer将组件变为观察者，当状态变化时，组件也会相应的更新
action是用来存放修改被观测变量的行为
computed 装饰器用来获取由基础state衍生出来值，如果基础值没变，获取衍生值时就会走缓存，这样就不会引起虚拟DOM重新渲染


Vue
微任务和宏任务：
语言标准提供的是微任务 比如es6提供的promise
宿主环境提供的是宏任务 (浏览器 node)
微任务总是会比宏任务先执行

vue中的template不会被渲染，所以在循环时我们会加上template来包裹加上循环

讲一下MVVM和MVC的区别
MVVM指的是model-view-viewModel,即模型-视图-视图模型，
模型是后端返回的数据，视图指所看到的页面，视图模型是MVVM核心，它是连接View和Model的桥梁
实现view变化自动更新到viewModel中，viewModel中的变化也会自动更新在view上，是数据驱动视图的模型
MVC指的是model-view-controller,即模型-视图-控制器，目的是为了将视图和模型分离
属于单向通信，必须通过controller来连接，即必须由控制器来获取数据，将结果返回前端，页面重新渲染
MVC中的controller演变成MVVM中的viewModel
MVVM是通过数据显示视图，并不是操作节点
MVVM解决了MVC的中大量的dom操作，使页面渲染性能降低，加载速度慢，影响客户体验的问题

Vue如何实现对象和数组的监听？

	由于object.defineProperty()只能对属性进行数据劫持，而不能对整个对象（数组）进行数据劫持，
	因此Vue框架通过遍历数组和对象，对每一个属性进行劫持，从而达到利用Object.defineProperty()也能对对象和数组（部分方法的操作）进行监听

vue双向绑定原理

	就是利用object.defineProperty()这个方法重新定义对象获取属性值(get)和设置属性值(set)的操作实现的

vue的优点

	低耦合：视图可以独立于model变化和修改，view变化model可以不变  model变化view也可以不变


虚拟Dom的优缺点

	优点：无需手动操作dom，框架根据虚拟dom和数据双向绑定，帮我们更新视图，提高开发效率
	缺点：无法进行极致优化性能，因为它的dom操作需要普遍适用

为什么v-if和v-for不建议一起使用
v-for的优先级要高于v-if,会把v-if给每一个元素添加上，重复运行于每一个v-for循环中，会造成性能浪费

生命周期
beforeCreate:在实例初始化以后调用
created:实例化已经创建完成之后调用，在这个周期可以进行数据请求
beforeMount:在挂载之前被调用
mounted:挂载实例之后调用，可以进行dom操作
beforeUpdate:数据更新之前调用，可以进一步更改状态
updated：数据更新之后调用
beforeDestroy:实例销毁之前调用
destroyed:实例销毁之后调用，可以进行优化操作，清空定时器，清除缓存，解除事件绑定

v-model如何实现双向绑定
就相当于在组件上添加一个v-bind和v-on

vue组件之间传值
父传子：在子组件中定义一个props来接收父组件传的值
子传父：利用vue中的$emit将想要传递的值通过函数形式传出，在父组件接收
—————————————
子组件：<button @click=‘toParent’/>
toParent(){
this.$emit(‘方法名’，要传递的值)
}

父组件：<child @子组件传递的方法名=‘getMsg’ />
getMsg(传递过来的值) {
this.Msg = 传递过来的值
}
——————————————————

子传子：方法一：要传递组件使用this.bus.$emit()传递  要接收组件使用this.bus.$on()接收
<要传递的子组件 @click=‘toBrother’ />
methods: {
    toBrother() {
      this.bus.$emit(传递的方法名, 传递的值);
    }
  }
要接收的子组件 
 beforeCreate() {
    this.bus.$on(传递的方法名, 传递的值 => {
      this.get = 传递的值;
    });
  }
方法二：子传父，父再传另一个子
方法三：vuex数据状态管理来进行组件之间的数据传递

为什么vue的data要用函数
因为js只有函数可以构成作用域（只有函数的{}构成作用域,对象的{}以及 if(){}都不构成作用域）
data是一个函数时，每个组件都有自己的作用域，每个实例相互独立,不会相互影响
所以vue中data必须是函数，是js本身的特性带来的，跟vue无关

keep-alive的作用
包裹组件，切换时会保存其组件的状态，使其不会销毁，防止多次渲染
一般结合路由和动态组件使用，用于缓存组件
activated|deactivated   切换时缓存到内存中并执行deactivated，切换回时会获取内存，渲染完时会执行activated
include和exclude属性  include表示只有名称匹配的组件才会被缓存  exclude表示任何名称匹配的组件都不会被缓存
exclude优先级高于include

route和router的区别
route是路由的信息对象  有path query name fullpath等参数
router是路由的实例化对象包含路由的跳转方法和钩子

vue-router有几种钩子函数？具体是什么及其参数
1、全局路由。（全局导航钩子主要有两种钩子：前置守卫、后置钩子。）
beforeEach（to, from, next）、afterEach
2、路由独享的钩子
单个路由独享的导航钩子，它是在路由配置上直接进行定义的
3、组件内的导航钩子
beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave


vuex:数据状态管理
state （this.$store.state.count）
getters  (this.$store.getters.方法名)
mutations (this.$store.commit(‘方法名’))
actions (this.$store.dispatch(‘方法名’))

Vue项目性能优化  （https://juejin.im/post/6857856269488193549）
一 代码层面优化 二项目打包的优化  三项目部署优化

一代码层面优化：
1.利用v-if减少初始化渲染的性能开销，利用v-show减少切换渲染的性能开销
原理：
v-if绑定的如果是false，初始化渲染时，不会渲染其条件块；v-show不管绑定的是true还是false，初始化渲染，总是会渲染其条件块
v-if绑定值在true或false切换时会销毁和重新渲染其条件块；v-show绑定值在true和false切换时，不会销毁和重新渲染其条件块，只是通过dispaly:none对其隐藏和显示

2.提前处理好数据解决v-if和v-for同级的问题
因为在vue处理指令中，v-for比v-if的优先级高，意味着v-if将重复运行于每个v-for循环中
可以在computed中提前把要v-for的数据中v-if的数据项给过滤处理了

3.给v-for循环项加上key提高diff计算速度

4.利用v-once处理只会渲染一次的元素或组件

$attrs和$listeners（https://blog.csdn.net/songxiugongwang/article/details/84001967）
