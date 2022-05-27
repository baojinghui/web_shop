import { reqAdress, reqTrade } from '@/api'
const state = {
    adressData: [],
    tradeData: {}
}
const actions = {
    //获取用户地址信息
    async getAdress({ commit }) {
        const result = await reqAdress()
        if (result.code == 200) {
            commit('GETADRESS', result.data)
        }
    },
    //获取用户订单交易页信息
    async getTrade({ commit }) {
        const result = await reqTrade()
        if (result.code == 200) {
            commit('GETTRADE', result.data)
        }
    }
}
const mutations = {
    GETADRESS(state, adressData) {
        state.adressData = adressData
    },
    GETTRADE(state, tradeData) {
        state.tradeData = tradeData
    }
}
const getters = {
    // 计算购物车中的数据
    detailArrayList(state) {
        return state.tradeData.detailArrayList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}