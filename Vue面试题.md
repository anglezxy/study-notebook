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
 
 ## 前端优化？
    1.资源压缩合并，减少http请求
          合并图片 css和js合并、css和js文件压缩
          图片较多的页面可以使用lazyLoad 
    2.非核心代码异步加载
        动态脚本加载
        defer(异步方式加载)
            在HTML解析完之后才会执行。如果是多个，则按照加载的顺序依次执行。
        async(html5新特性 异步加载)
            在加载完之后立即执行。如果是多个，执行顺序和加载顺序无关。
    3.利用浏览器缓存
        资源文件（比如图片）在本地存有副本，浏览器下次请求的时候，可能直接从本地磁盘里读取，而不会重新请求图片的url。
        1.强缓存
            不用请求服务器，直接使用本地缓存。它是利用http响应头中的Expire或Cache-Control实现的。
        2.协商缓存
    4.使用CDN
    5.DNS预解析
## vue页面优化？
Vue-router优化：

    1.路由懒加载
    2.http链接优化
    3.减少HTTP请求
        合并css js图片。将css js 图片合并，可以减少http请求数
        合理规划api,可以合并的接口请求合并
    4.合理使用缓存
    5.使用字体图标
    6.图片懒加载
    5.组件优化
 代码优化：
 
    1.去除不必要的引入、按需加载插件包
    2.v-if v-show合理使用
    3.style中尽量使用scoped
    4.style尽量抽象，提高复用率，减小css文件
    5.提取公共方法，放在util里
 打包优化：
    打包时不打包vue vuex vue-router axios等，换成直接引入(再webpack中配置不需要打包的库)  
    
        webpack打包优化：
        1.压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css
        2.利用CDN加速。在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径
        3.删除死代码（Tree Shaking）。将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现
        4.提取公共代码。
    webpack构建速度：
        1.多入口情况下，使用CommonsChunkPlugin来提取公共代码
        2.通过externals配置来提取常用库
        3.利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
        4.使用Happypack 实现多线程加速编译
        5.使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度
        6.使用Tree-shaking和Scope Hoisting来剔除多余代码
                  

## 前端常见兼容性问题？
    1.不同浏览器margin和padding不同
        css * {margin:0;padding: 0}
    2.图片默认有间距
        使用float为img布局      
   
## cookie和localStorage sessionStorage区别？
    1.都存再客户端
    2.cookie
        由服务器生成，保存再客户端，由前后交互，安全性差，且浪费带宽
        存储大小有限（4kb）
        只接收string类型
        存储位置：
            1.未设置过期时间：保存再内存中，浏览器关闭后销毁
            2.设置过期时间：保存再系统硬盘，到过期时间结束才消失
    3.sessionStorage
        再客户端保存  5MB
        浏览器窗口关闭后数据被销毁
    4.localStorage
        存储再客户端 5MB
        持久化的本地存储，关闭重新打开数据依然存在
        长期登录    

    5.session:
        保存再服务端 无大小限制 支持任何类型的存储内容 访问多次会影响服务器性能   
 ## 回流和重绘？
    1.回流重绘：
        当render树中的一部分或者全部因为大小边距等问题发生改变而需要重建的过程叫做回流

        回流是计算节点的位置和几何信息，页面布局和几何信息发生变化就需要回流。
        1.添加或删除可见的DOM元素
        2.元素的位置发生变化
        3.元素的尺寸发生变化(外边距、内边距、边框大小、高度和宽度等)
        4.内容发生变化
        5.页面初次渲染时候
        6.浏览器窗口尺寸变化
        回流一定会发生重绘，而重绘不一定会回流  
    2.重绘：
        当元素的一部分属性发生变化，如外观背景色不会引起布局变化而需要重新渲染的过程叫做重绘
        
## 浏览器渲染过程？
    1.解析HTML,生成DOM树，解析CSS,生成CSSOM树
    2.将DOM树和CSSOM树结合，生成渲染树(Render Tree)
    3.Layout(回流)：根据生成的渲染树，进行回流，得到节点的集合信息（位置，大小）
    4.Painting(重绘):根据渲染树以及回流得到几何信息，得到节点的绝对像素
    5.Display:将像素发送GPU,展示再页面上。
## 防抖和节流
    1.防抖：
        搜索框搜索
        触发高频事件后n秒内函数只会执行一次，如果n秒内高频时间再次被触发，则重新计算时间
    2.节流：
        不断点击购买
        高频事件触发，但再N秒内只会执行一次，节流会稀释函数的执行频率

    3.区别：
        防抖动是将多次执行变为最后一次执行
        节流是将多次执行变成每隔一段时间执行     
    
