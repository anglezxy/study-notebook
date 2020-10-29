## 基本概念
 1.Generator函数是Es6提供的一种异步变成解决方法。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
 
```
    function* helloWorldGenerator() {
       yield 'hello'
       yield 'world'
       return 'ending' 
    }
    var hw = helloWorldGenerator()
    hw.next() // { value: 'hello', done: false }

    hw.next() // { value: 'world', done: false }

    hw.next() // { value: 'ending', done: true }

    hw.next() // { value: undefined, done: true }
```
### yield表达式
 （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象 value属性值
 
 （2）下一次调用next方法时，再继续向下执行，遇到下一个yield表达式

 （3）如果没有遇到新yield表达式，就一直运行到函数结束，知道return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值

 （4）如果该函数没有return语句，则返回的对象的value属性值为undefined

 ```
    function* f() {
        console.log('执行了')
    }
    var generator = f()
    setTimeout(function() {
        gengenerator.next()
    },500)
    
    f如果是一个普通函数，在为generator赋值时就会执行。但是f是一个Generator函数，只能调用next方法时，f才会执行
 ```

```
      var arr = [1, [[2, 3], 4], [5, 6]];
            var newArr = []
            var flat = function* (a) {
                var length = a.length
                for(var i =0;i<length;i++) {
                    var item = a[i]
                    if (typeof item !=="number") {
                        yield* flat(item)
                    }else {
                        yield item
                    }
                }
            }
            // console.log(flat(arr),'flat')
            for (var f of flat(arr)) {
                newArr.push(f)
            }
            console.log(newArr) // [1,2,3,4,5,6]
```
### next方法的参数
yield表达式本身没有返回值(undefined)，next方法可以带一个参数，该参数会被当做上一个yield表达式的返回值
```
    function* f(x) {
        var y = 2 * (yield (x+ 1))
        var z = yield (y / 3);
        return (x + y + z);
    }
    var a = foo(5);
    a.next() // Object{value:6, done:false}  5+1 = 6
    a.next() // Object{value:NaN, done:false} (2* undefined)/ 3 NaN
    a.next() // Object{value:NaN, done:true}  5 + NaN + undefined  NaN

    var b = foo(5);
    b.next() // { value:6, done:false }  5+ 1 = 6
    b.next(12) // { value:8, done:false } (2* 12) /3 = 8
    b.next(13) // { value:42, done:true } 5+ 24 + 13 = 42  
    // 第二次调用next，将上一次表达值设置为12 则（yield(x+ 1)） = 12  y = 2 * 12 = 24  yield(y/3) = 8
    // 第三次调用next ,将上一次表达式的值设为13 则 z = yield(y+ 3) = 13
    // return (5(x)+ 24(y) + 13(z)) = 42

```
### for ... of 循环
1.for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
```
 function* foo() {
     yield 1;
     yield 2;
     yield 3;
     yield 4;
     yield 5;
     return 6
 }
 for (let v of foo()) {
     console.log(v)
 }
 // 1 2 3 4 5
 for...of 循环，一旦next方法的返回对象done属性为true，就会终止，且不包含该返回对象。
```

```
    function* numbers() {
        yield 1
        yield 2
        return 3
        yield 4
    }
    // 扩展运算符
    [...numbers()] // [1,2]

    // Array.from方法
    Array.from(numbers()) // [1,2]

    // 解构赋值
    let [X,Y] = numbers()
    X: 1
    Y:2

    // for .. of循环
    for(let n of numbers()) {
        console.log(n)
    }
    // 1 2
```
### Generator.prototype.throw()
```
    var g = function* () {
        try{
            yield
        }catch(e) {
            console.log('内部捕获',e)
        }
    }
    var i = g()
    i.next()
    try{
        i.throw('a')
        i.throw('b')
    }catch(e) {
        console.log('外部捕获',e)
    }

    // 内部捕获 a
    // 外部捕获 b
```
```
var g = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};

var i = g();
i.next();

try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 [Error: a]
解释：之所以只捕获了a,是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。

如果Generator函数内部没有部署try...catch，那么throw方法抛出的错误，将被外部try ...catch捕获



var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};
// 无try...catch

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
```
### Generator.prototype.return()
Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数

```
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen()
g.next() //  { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next() // // { value: undefined, done: true }

如果g.return()  // { value: undefined, done: true }


如果Generator函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。

function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }

```



