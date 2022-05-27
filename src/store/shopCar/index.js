import { fetchShopCar, reqDeleteShopCar, reqChangeChecked } from "@/api";
import { Promise } from "core-js";
const state = {
  ShopCarData: [],
};

const actions = {
  //获取购物车数据
  async getShopCarData({ commit }) {
    const result = await fetchShopCar();
    if (result.code == 200) commit("GETSHOPCARDATA", result.data);
  },
  //获取删除产品后的状态
  async getDeleteShopCar({ commit }, skuId) {
    const result = await reqDeleteShopCar(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("error"));
    }
  },
  //修改商品选择状态
  async getChangeChecked({ commit }, { skuId, isChecked }) {
    const result = await reqChangeChecked(skuId, isChecked);
    if (result.code == 200) return "ok";
    else return Promise.reject(new Error("error111"));
  },
  //删除选中商品请求，没有指定的请求，需要多次转发删除单个商品的请求
  deleteAllChecked({ dispatch, state }) {
    let arr = [];
    //context:小仓库，commit【提交mutations修改state】getters【计算属性】dispatch【派发action】state【当前仓库数据】
    state.ShopCarData[0].cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("getDeleteShopCar", item.skuId) : "";
      arr.push(promise);
    });
    return Promise.all(arr); //如果返回的promise状态全部为成功，则为成功
  },
  //复选框全选按钮
  allChecked({ dispatch, state }, isChecked) {
    let arr = [];
    state.ShopCarData[0].cartInfoList.forEach((item) => {
      let skuId = item.skuId;
      arr.push(dispatch("getChangeChecked", { skuId, isChecked }));
    });
    return Promise.all(arr);
  },
};

const mutations = {
  GETSHOPCARDATA(state, ShopCarDat) {
    state.ShopCarData = ShopCarDat;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
