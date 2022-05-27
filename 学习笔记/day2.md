##
1:编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
--路由跳转有两种方式：声明式导航、编程式导航
--声明式导航没有这类问题的，因为vue-router底层己经处理好了
    1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误那？
        "vue-router":"^3.5.3":最新的vue-router引入promise,
        当$router.push时，传入的第一个参数为路径，第二个，和第三个参数为成功和失败promis的回调
    1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。给失败的回调返回为空
    1.3通过底部的代码，可以实现解决错误：this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.touppercase()}},()=>{}()=>{})：这种写法：治标不治本，将来在别的组件当中push|replace,编程式导航还是有类似错误。
    1.4去router中重写VuePouter身上的push和replace方法

##
3:三级联动组件完成
---由于三级联动，在Home、Search、Detail,把三级联动注册为全局组件。
好处：只需要注册一次，就可以在项目任意地方使用

##
4:完成其余静态组件
    HTML+CSS+图片资源

##
6:axios二次封装
XMLHttpRequest、fetch、JQ、axios
6.1为什么需要进行二次封装axios?
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处
理一些事情

##
6.2在项目当中经常API文件夹【axios】
接口当中：路径都带有/api
baseURL:"/api"

##
7.1跨域问题
什么是跨域：协议、域名、端口号不同请求，称之为跨域
http://localhost:8080/#/home---前端项目本地服务器
http://39.98.123.211
---后台服务器

##
9:vuex状态管理库
9.1vuex是什么？
Vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据。
切记，并不是全部项目都需要Vuex,如果项目很小，完全不需要Vuex,如果项目很大，组件很多、数据很多，数据维护很费劲，VueX
state I
mutations
actions
getters
modules
