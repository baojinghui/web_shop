//引入接口
import { reqCode, reqRegister, reqLogin, reqUserData, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token'
//登录与注册模块
const state = {
    code: "",
    userToken: getToken(),
    userData: {},
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        const result = await reqCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("error"));
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        const result = await reqRegister(user);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise(new Error("用户注册的dispatch出错了"));
        }
    },
    //用户登录业务
    async userLogin({ commit, dispatch }, user) {
        const result = await reqLogin(user);
        // 服务器下发token, 用户唯一标识符(uuid)
        // 将来经常通过带tokn找服务器要用户信息进行展示
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            //利用本地存储持久化储存token
            // localStorage.setItem('Token', result.data.token)
            setToken(result.data.token)
        } else {
            return Promise.reject(new Error("密码错误"));
        }
    },
    //在登陆后的的主页中，通过token验证登录，获取用户信息
    getUserData({ commit }) {
        reqUserData().then(
            (resolve) => {
                if (resolve.code == 200) commit("GETUSERDATA", resolve.data);
            },
            (reject) => {
                alert(reject);
            }
        );
    },
    //退出登录 ,后台会清除掉用户的token
    async logout({ commit }) {
        const result = await reqLogout()
        console.log(result)
        //如果成功清除用户信息
        if (result.code == 200) {
            commit('CLEAR')
        } else {
            return Promise.reject(new Error('falid'))
        }
    }
};
const mutations = {
    //推入验证码
    GETCODE(state, codeData) {
        state.code = codeData;
    },
    //推入用户登陆后返回的token，用于获取用户信息验证
    USERLOGIN(state, userToken) {
        state.userToken = userToken;
    },
    //推入用户登陆后的信息
    GETUSERDATA(state, UserData) {
        state.userData = UserData
    },
    //清除用户信息
    CLEAR(state) {
        state.userToken = ''
        state.userData = {}
        removeToken()
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters,
};
