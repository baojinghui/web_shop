import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由插件
Vue.use(VueRouter)

//引入store
import store from '@/store'
//引入路由配置
import routes from './routes'

//因为当使用编程式路由导航多次跳转路由传递同一个参数时，会报错一个promis失败的错误，
//先把VueRouter身上的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写VueRouter原型对象身上的relpace和push方法
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）,第二和第三个参数为promis的回调
VueRouter.prototype.push = function (loction, resolve, reject) {
    if (resolve && reject) originPush.call(this, loction, resolve, reject)//如果promis返回了成功和失败的状态resolve, reject，那么程序就按照原来原型上的push方法执行
    //cal1||apply区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //不痛点：call与apply传递参数：cal1传递参数用逗号隔开，apply方法执行，传递数组
    else originPush.call(this, loction, () => { }, () => { })//如果promis没有返回成功和失败的状态resolve, reject，那么重写程序。不让其报错
}
VueRouter.prototype.replace = function (loction, resolve, reject) {
    if (resolve && reject) originReplace.call(this, loction, resolve, reject)//如果promis返回了成功和失败的状态resolve, reject，那么程序就按照原来原型上的push方法执行
    //cal1||apply区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //不痛点：call与apply传递参数：cal1传递参数用逗号隔开，apply方法执行，传递数组
    else originReplace.call(this, loction, () => { }, () => { })//如果promis没有返回成功和失败的状态resolve, reject，那么重写程序。不让其报错
}

//配置路由
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {  //主要添加这个函数，注意与routs平级
        // return 期望滚动到哪个的位置
        return { y: 0 }//跳转后置顶
    }
})

// 全局守卫：前置守卫，在路由跳转之前被调用  
//to:获取所要跳转的路由信息
//from:获取从哪里来的路由信息
//next：放行函数  next()表示全部放行  next(路径)放行到指定路由  next(false)
router.beforeEach(async (to, from, next) => {
    //用户登录才会有token
    let token = store.state.user.userToken
    //获取用户信息，如果用户信息存在，则不需要派发actions，否则重新派发
    let name = store.state.user.userData.name
    if (token) {
        //如果 【登陆】 后还想跳转到 【登录页面】 则停留在首页
        if (to.path == '/login') {
            next('/home')
        }
        //登陆后要跳转到除了登录以外的其他路由页面
        else {
            //如果name存在则表示当前页面已经派发了action获取了用户数据，直接放行
            if (name) {
                next()
            } else {
                //表示当前用户已经登陆，但是当前路由页面没有派发action获取用户数据，需要重新派发，然后放行
                try {
                    //获取用户信息成功，放行
                    await store.dispatch('getUserData')
                    next()
                } catch (error) {
                    //表示token失效了，需要清除token
                    //清除token，也就是退出登录
                    await store.dispatch('logout')
                    alert('身份验证已过期')
                    next('/login')
                }
            }
        }
    } else {
        //如果没有登录,不能去交易相关页面，支付相关，不能去个人中心
        //未登陆时去以上路由则跳转到登录路由
        //想跳转其他路由则放行
        let toPath = to.path
        if (toPath == '/trade' || toPath == '/pay' || toPath.includes('center'))
            // 把未登录时想去的路由页面，存在路由中存储,登录之后直接跳转    
            next('/login?redirect=' + toPath)
        // 如果去得不是交易相关页面，则放行
        else next()
    }
})

export default router