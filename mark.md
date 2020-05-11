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

    ## Vue声明周期
