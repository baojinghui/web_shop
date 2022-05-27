//search模块的仓库
import { reqSearchList } from "@/api";
// state:仓库 存放数据的地方
const state = {
    searchList:{}
};
//actions:处理action(行为)，可以书写自己的业务逻辑
const actions = {
    //获取search模块数据
   async getSearchList({commit},params={}){
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象,这个参数叫做荷载
    //当前这个reqSearchList是一个post请求，在调用服务器数据时，至少传递一个参数（空对象）
         const result =await reqSearchList(params);
         if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,SearchListData){
        state.searchList=SearchListData
    }
}
//getters：理解为计算属性 用于简化仓库数据，让组件获取数据更加方便
const getters = {
    //getters中函数的参数是当前仓库中的state
    attrsList(state){
        //因为state中的数据原来是个空对象，如果为空对象undefined则会报错，要加上 ||[]
        return state.searchList.attrsList || []
    },
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    // namespaced: true,
    state,
    actions,
    mutations,
    getters
}