```
// base.js
var count = 0;
setTimeout(() => {
    console.log("base.count", ++count); 
}, 500)

module.exports.count = count;

// commonjs.js
const { count } = require('./base');
setTimeout(() => {
     console.log("count is" + count + 'in commonjs'); // 0
}, 1000)


// base1.js
var count = 0;
setTimeout(() => {
    console.log("base1.count", ++count); // 1
}, 500)
exports var count = count;

// es6.js
import { count } from './base1';
setTimeout(() => {
     console.log("count is" + count + 'in es6'); // 1
}, 1000)

 答案： base.count: 1
        count is 0 in commonjs
        base1.count: 1
        count is 1 in es6
```

## CommonJS
### CommonJS模块的加载原理
    commonjs规范规定，每个模块内部，module变量代表当前模块。这个变量时一个对象，它的exports属性（即module.exports）是对外的接口，加载某个模块，其实是加载该模块的module.exports属性
    var x = 5
    var add = function(value) {
        return value + x
    }
    module.exports.x = x    // 通过module.exports输出变量x和函数add
    module.exports.add = add

require方法用于加载模块

    var example = require('./example.js')
    console.log(example.x) // 5
    console.log(example.add(1)) // 6

CommonJS 模块的特点：

（1）所有代码运行在模块作用域，不会污染全局作用

（2）模块可以多次加载，但是只会在第一次加载时运行一次，然后进行运行结果就被缓存了，以后再加载，就直接读取缓存结果。想让模块再次运行，必须清除缓存

（3）模块加载的顺序，按照其代码中出现的顺序

module对象：

    
## ES6模块
## ES6模块和CommonJs模块两大区别
