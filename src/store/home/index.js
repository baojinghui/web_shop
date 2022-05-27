//search模块的仓库

import { reqCategoryList, reqGetBannerList, reqFloor } from '@/api'

// state:仓库 存放数据的地方
const state = {
    categoryList: [],
    bannerList: [],
    floor: []
};
//actions:处理action(行为)，可以书写自己的业务逻辑
const actions = {
    //获取三级联动列表所展示的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //调用定义好的api发送请求
    async getFloor({ commit }) {
        let result = await reqFloor()
        if (result.code == 200) {
            commit('GETFLOOR', result.data)
        }
    },
}
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryListData) {
        state.categoryList = categoryListData
    },
    GETBANNERLIST(state, getBannerListData) {
        state.bannerList = getBannerListData
    },
    GETFLOOR(state, getFloorData) {
        state.floor = getFloorData
    }
}
//getters：理解为计算属性 用于简化仓库数据，让组件获取数据更加方便
const getters = {}

export default {
    // namespaced: true,
    state,
    actions,
    mutations,
    getters
}