//引入仓库
import store from "@/store";

//对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css";

const requests = axios.create({
    baseURL: "/api", //基础路径
    // timeout: 5000,//请求超过5秒会失败
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要，headers情求头
    //判断仓库中是否存在uuid_token
    if (store.state.detail.uuid_token) {
        //如果存在uuid，给请求头添加一个字段，是后台规定好的(userTempId)
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //判断是否携带token，有token，携带token发请求
    if (store.state.user.userToken) {
        config.headers.token = store.state.user.userToken
    }
    nprogress.start(); //进度条开始的地方
    return config;
});
//响应拦截器
requests.interceptors.response.use(
    (res) => {
        //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
        // 进度条结束
        nprogress.done();
        return res.data;
    },
    (error) => {
        console.log(error);
    }
);

export default requests;
