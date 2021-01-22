## 1.v-if和v-for谁的优先级高？该如何正确使用避免问题？
 1.v-for优先级高于v-if解析

 2.如果同时出现，每次渲染都会先在hi下循环在判断条件，无论如何循环都不可避免，浪费了性能

 3.要避免出现这种情况，则在外层嵌套template，在这一层进行v-if判断，然后内部进行v-for循环

 ## 2.Vue组件data为什么必须是个函数，而Vue根实例则没有此限制？
    因为组件可能被用来创建多个实例，如果data时一个对象，则所有实例将共享引用同一个数据对象。通过提供data函数，每次创建一个新实例后，我们调用data函数，从而返回初始数据的一个全新副本数据对象。
 ## 3.Vue中key的作用和工作原理吗？说一说对他的理解
        
 ## 4.怎么理解Vue中的diff算法？
    1.diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM作对比（即diff），将变化的地方更新在真实DOM上；另外，也需要diff高效的执行对比过程，从而降低时间复杂度o(n)
    2.vue2.0中为了降低watcher粒度，每个组件只有一个watcher与之对应，只有引入diff才能精确找到发生变化的地方。
    3.vue中diff执行的时刻是组件实例执行其更新函数时，它会对比上一次渲染结果oldVnode和新的渲染结果newVnode,此过程称为patch
    4.diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4此对比尝试，如果没找到相同节点才按照通用方式遍历查找，查找结束再按照情况处理剩下的节点，借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

## 5.谈一谈对vue组件化的理解？
## 6.谈一谈对vue设计原则的理解？
    1.渐进式javascript框架
    2.易用性  
    3.灵活性
    4.高效性
 ## 7.vue为什么要求组件模板只能由一个根元素
 ## 8.谈一谈你对MVC MVP 和MVVM的理解？
     MVC:
        view层传送指令给controller层，controller层完成业务操作，把结果给到modal层，modal层
    MVVM:
       view
       modal
       viewModal:作为桥梁负责View和modal
       在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
       ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理
       
 ## 9.vue中组件通信方式？
    1.父子组件
    2.兄弟组件
    3.跨组件
 ## 10.vue优化方法？
    1.路由懒加载
    2.keep-alive缓存页面
    3.使用v-show复用DOM
    4.v-for遍历避免同时使用v-if
    5.长列表性能优化
    6.事件销毁（定时器）
    7.图片懒加载
    8.第三方插件按需引入
    9.SSR后端渲染
 ## 11.你对Vue3.0新特性了解？
    1.更快
        虚拟DOM重写
        优化slots的生成
        静态树提升
        静态属性提升
        基于Proxy的响应系统
    2.更小：通过树摇优化核心库体积
    3.更容易维护： Typescript+模块化
    4.更加友好
        跨平台：编译器核心和运行时核心与平台无关，使得Vue更容易与任何平台一起使用
    5.更容易使用  
        改进的TypeScript支持，编辑器能提供强有力的类型检查和错误及警告
        更好的调试支持
        独立的响应化模块 
        Composition API
 ## 12.Vuex理解？
 ## 13.Vue生命周期？     
 ## 14.nextTick的原理：
    1.
## 15.vue双向数据绑定的原理？
     采用数据劫持结合发布者和订阅者方式，通过object.defineProperty()来劫持各个属性的setter/getter,在数据变动的时候发布消息给订阅者，触发相应的监听回调，
     1.实现一个数据监听器Observer,能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
     2.实现一个指令解析器compiler,对每一个元素节点的指令进行扫描和鸡西，根据指令模板替换数据，以及绑定响应的更新行数
     3.实现一个watcher,作为连接Observer和compiler的桥梁，能够订阅并收集到每个属性变动的通知，执行指令绑定相应回调函数，从而更新视图
## 16.Vue中vue-router中的导航钩子有哪些？
    1.全局导航钩子
        beforeEach(to,from,next)
        afterEach(to,from)
    2.路由配置中导航钩子
        beforeEnter(to,from,next)
    3.组件内部导航钩子
        beforeRouteEnter(to,from,next)
        beforeRouteUpdate(to,from,next)
        beforeRouteLeave(to,from,next)

## 17.路由检测变化
        watche: {
            '$route' (to,from) {

            }
        }
## vue-router路由传参几种形式？
    1.params
        只能使用name,参数不会显示在路径上
        浏览器强制刷新参数会被清空
        this.$router.push({
            name: home,
            params: {
                index: 1
            }
        })
        接收参数：this.$route.params
    2.query 
        参数会显示在路径上，刷新不会被清空
        name可以使用path
        this.$router.push({
            name: home,
            query: {
                index: 1
            }
        })
        接收参数：this.$route.query
    3.hash
    4.history
        pushState()和replaceState()方法，需要后台配置支持，如果刷新时，服务器没响应就会输出404
## vue-router实现路由懒加载方式？
    1. component: () => import('')   
    2. const Foo = () =>Promise.resolve()
    按组件按组分块：
        const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
        const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
        const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
## vue-router路由配置？  
    mode: 'history' / hash
    base: '/',
    routes: []
    scrollBehavior(to,from,savedPosition) {}
    router.beforeEach()
## 路由元信息
    meta字段     
## vue响应式原理？
    1.vue响应式概念？
    2.vue当中怎么去实现的
    3.怎么去做依赖收集/数据更新
    4.object/array

    object.defineProperty 
    在 new Vue() 后， Vue 会调用_init 函数进行初始化，也就是init 过程，在 这个过程Data通过Observer转换成了getter/setter的形式，来对数据追踪变化，当被设置的对象被读取的时候会执行getter 函    数，而在当被赋值的时候会执行 setter函数。
    当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。
    在修改对象的值的时候，会触发对应的setter， setter通知之前依赖收集得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher就会开始调用 update 来更新视图。
    
    
