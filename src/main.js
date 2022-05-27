import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//引入模拟数据
import '@/mock/mockServer'
//把三级联动组件注册为全局组件//第一个参数：全局组件的名字,第二个参数：哪一个组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav);
//把分页器注册为全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//关闭Vue生产提示
Vue.config.productionTip = false
//统一接受api文件夹中的全部请求函数
import * as API from '@/api'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//vue.use,相当于插件对象的install方法
import lazy from '@/assets/images/icons.png'
Vue.use(VueLazyload, {
  loading: lazy
})

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins)

//引入表单验证插件
import '@/plugins/validate'
new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //组件实例身上多一个$router和$route属性
  router,
  //组件实例身上多一个$router属性
  store,
})