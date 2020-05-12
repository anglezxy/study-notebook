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















