//引入路由组件
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from "@/pages/Detail"
import Home from '@/pages/Home'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCar from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import TuanGou from '@/pages/Center/TuanGou'

export default
    [
        {//路由重定向，在项目跑起来的时候，访问/，立马让项目定位到首页
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta: { showFooter: true },
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: { showFooter: false },
        },
        {
            path: '/search/:keyWord?',//使用占位符接收params参数,?表示这个params可传可不传
            component: Search,
            name: 'search',
            meta: { showFooter: true },
        },
        {
            path: '/register',
            component: Register,
            meta: { showFooter: false },
        },
        {
            path: '/detail/:skuId',
            component: Detail,
            name: 'detail',
            meta: { showFooter: true },
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            name: 'addCart',
            meta: { showFooter: true },
        },
        {
            path: '/shopcar',
            component: ShopCar,
            name: 'shopCar',
            meta: { showFooter: true },
        },
        {
            path: '/trade',
            component: Trade,
            name: "trade",
            meta: { showFooter: true },
            //独享路由守卫
            beforeEnter: (to, from, next) => {
                //是从/shopcar路径来的放行
                if (from.path == '/shopcar') next()
                //不是的话停留原来的路由界面，就是从哪里来到哪里去
                else next(false)
            }
        },
        {
            path: '/pay',
            component: Pay,
            name: "/pay",
            meta: { showFooter: true },
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            name: 'paysuccess',
            meta: { showFooter: true },
        },
        {
            path: '/center',
            component: Center,
            name: 'center',
            meta: { showFooter: true },
            children: [
                //二级路由
                {//二级路由重定向，一访问center就定向到/center/myorder
                    path: '/center',
                    redirect: '/center/myorder'
                },
                {
                    path: 'myorder',
                    name: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'tuangou',
                    name: 'tuangou',
                    component: TuanGou
                }
            ]
        }
    ]
