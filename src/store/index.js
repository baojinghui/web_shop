import Vue from "vue";
import Vuex from 'vuex';
// 使用vuex插件
Vue.use(Vuex)

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCar from "./shopCar"
import user from "./user";
import trade from "./trade";

const store = new Vuex.Store({//Vuex身上的Store用来管理数据
    modules: {
        home,
        search,
        detail,
        shopCar,
        user,
        trade
    }
})

export default store