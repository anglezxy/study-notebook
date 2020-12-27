// observer // 实现一个数据观察者

class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        /*
        劫持监听所有属性
        *   person: {
            name: '',
            fav: {
                a: ''
            }
        }
        */
       if (data && typeof data === 'object') {
           Object.keys(data).forEach(key => {
               this.defineReactive(data,key,data[key])
           })
       }
        
    }
    defineReactive(data,key,value) {
        //递归遍历
        this.observer(value)
        const dep = new Dep()
        // 劫持并监听所有的属性
        Object.defineProperty(obj,key,{
            enumerable: true,
            configurable:false,
            get() {
                // 订阅数据变化时，往Dep中添加观察者 （收集依赖）
               Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                this.observe(newVal)
                if(newVal !== value) {
                    value = newVal
                }
                // 告知Dep 通知变化
                dep.notify()
            }

        })
    }
}

// 收集所有的依赖（watcher）
class Dep{
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub(watcher) {
        this.subs.push(watcher);
    }
    // 通知观察者去更新
    notify() {
        this.subs.forEach(w => w.update())
    }
}

class Watcher {
    constructor(vm,expr,cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.oldVal = this.getOldVal()
    }
    update() {
        // 判断新旧值有没有变化，有则回调
       let newVal = compileUtil.getVal(this.expr,this.vm)
       if (newVal != this.oldVal) {
           this.cb(newVal)
       }
    }
    getOldVal() {
        Dep.target = this
        let odlVal = compileUtil.getVal(this.expr,this.vm)
        Dep.target = null; // 删除观察者
       return this.oldVal
    }
}


// 阐述MVVM响应式原理

/**
 * vue是采用数据劫持配合发布者-订阅者模式的方式，通过Object.definerProperty()来戒指各个属性的setter和getter,再数据变动时，发布消息给依赖收集器，去通知观察者，做出对应的回调函数，去更新视图
 * 
 * 
 * MVVM作为绑定的入口，整合Observer,Compile和watcher三者，通过Oberver来监听model数据变化，通过Compiler来解析
 * 编译模板指令，最终利用watcher搭起Observer,Compile之间的通信桥梁，
 * 达到数据变化， =》视图更新；视图交互变化=》数据model变更的双向绑定效果
 */
