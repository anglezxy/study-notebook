
const compileUtil = {
    getVal(expr,vm) {
        return expr.split('.').reduce((data,currentVal) => {
            return data[currentVal]
        },vm.$data)
    },
    setVal(expr,vm,inputVal) {
        return expr.split('.').reduce((data,currentVal) => {
             data[currentVal] = inputVal
        },vm.$data)
    },
    text(node,expr,vm) {
        // const value = this.getVal(expr,vm)
        let value;
        if (expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args) => {
                return this.getVal(args[1],vm)
            })
        } else {
             value = this.getVal(expr,vm)
        }
        this.updater.textUpdater(node,value)
    },
    html(node ,expr,vm) {
       
        let value = this.getVal(expr,vm)
        // 绑定观察者，将来数据发生变化，触发这里的回调进行更新
       new Watcher(vm,expr,(newVal) => {
            this.updater.htmlUpdater(node,value)
       })
        // this.updater.htmlUpdater(node,value)
    },
    model(node,expr,vm) {
        const value = this.getVal(expr,vm)
        new Watcher(vm,expr,(newVal) => {
            this.updater.modelUpdater(node,value)
       })
       // 视图 = 数据= 视图
       node.addEventListener('input',(e) => {
           this.setVal(expr,vm,e.target.value)
       })
        this.updater.modelUpdater(node,value)
    },
    on(node,expr,vm,eventName) {

    },
    updater:{
        modelUpdater(node,value) {
            node.value = value
        },
        htmlUpdater(node,value) {
            node.innerHTML = value
        },
        textUpdater(node,value) {
            node.textContent = value
        }
    }
}

class Compile {
    constructor(el,vm) {
        this.el = this.isElementNode(el) ? el: document.querySelector(el)
        this.vm = vm;
        // 1.获取文档碎片对象，放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el)
        // 2.编译模板
        this.compile(fragment)
        //3. 追加子元素到根元素
        this.el.appendChild(fragment);

    }
  
    compile(fragment) {
        // 获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(element => {
            if (this.isElementNode(element)) {
                // 元素节点
                this.compileElement(element)
            } else {
                // (文本节点)
                this.compileText(element)
            }
            if (element.childNodes && element.childNodes.length) {
                this.compile(element)
            }
        });
    }
    compileElement(node) {
        const attributes = node.attributes;
        [...attributes].forEach(arr => {
            const { name ,value } = arr;
            if (this.isDirective(name)) {
                // 是一个指令 v-text v-html v-model on:click
                const [,directive] = name.split('-')
                const [dirName,eventName] = directive.split(":") // text html on
                // 更新数据   数据驱动视图
                compileUtil[dirName](node,value,this.vm,eventName) 

                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + directive)

            }
        })
        
    }
    compileText(node) {
        // {{}}  v-text
        const content = node.textContent;
        if (/\{\{(.+?)\}\}/)
    }
    node2Fragment(el) {
        // 创建文档碎片
        const f = document.createDocumentFragment()
        let firstChild;
        while(firstChild = el.firstChild ) {
            f.appendChild(firstChild)
        }
        return f
    }
    isElementNode(node) {
        return node.nodeType === 1
    }
}




class MVue{
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) {
            // 实现一个数据观察者
            new Observer(this.$data)
            // 实现一个指令解析器
            new Compile(this.$el,this)

            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        // 把$data  改成 data
        for (const key in data) {
            Object.defineProperty(this,key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}
