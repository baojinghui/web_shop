import { gteUuid } from '@/utils/uuid_token'

//引入封装好的axios请求
import { reqDetail, reqAddShopCar } from '@/api/index'
const state = {
    detail: {},
    //游客临时身份
    uuid_token: gteUuid()
}

const actions = {
    //获取详情信息的数据
    async fetchDetail({ commit }, skuId) {
        const result = await reqDetail(skuId)
        if (result.code == 200) {
            commit('FETCHDETAIL', result.data)
        }
    },
    //将产品添加到购物车中||修改某个数据
    async fetchAddShopCar({ commit }, { skuId, skuNum }) {
        //通知服务器储存数据
        const result = await reqAddShopCar(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.resject(new Error('falid'))
        }
    }
}

const mutations = {
    FETCHDETAIL(state, detailData) {
        state.detail = detailData
    },
}

const getters = {
    //路径导航简化的数据  
    categoryView(state) {
        //让返回值至少是一个对象，这样页面未得到数据时先展示undefined，数据回来展示数据
        return state.detail.categoryView || {}
    },
    //简化产品信息数据
    skuInfo(state) {
        return state.detail.skuInfo || {}
    },
    //产品售卖属性数据的简化
    spuSaleAttrList() {
        return state.detail.spuSaleAttrList || []
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}