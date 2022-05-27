//当前模块：API进行统一管理,调用当前模块的函数就可以发送请求
import request from './request'
import mockRequest from './mockAjax'

//三级联动接口
/// api/product/getBaseCategoryList get 无参数
// 发请求:axios发请求返回的式promis对象
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })

//从mock模拟数据中获取banner首页轮播图数据的接口
export const reqGetBannerList = () => mockRequest.get('/banner')

// 从mock模拟数据中得到floor数据
export const reqFloor = () => mockRequest.get('/floor')

//获取搜索数据接口  /api/list  post
export const reqSearchList = (params) => request({
    url: '/list',
    method: 'post',
    data: params,//注意参数写在data中
})

//获取详情数据接口 /api/item/{ skuId }
export const reqDetail = (skuId) =>
    request({
        url: `/item/ ${skuId} `,//注意这里参数是直接拼接到url上的，没有data
        method: 'get',
    })

//将产品添加到购物车或者更新购物车数据时,/api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddShopCar = (skuId, skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

//获取购物车数据接口 /api/cart/cartList get
export const fetchShopCar = () => request({
    url: '/cart/cartList',
    method: 'get'
})

//删除产品id的请求 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteShopCar = (skuId) => request({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
})

//修改商品状态的接口  /api/cart/checkCart/{skuID}/{isChecked}  get
export const reqChangeChecked = (skuId, isChecked) => request({
    methods: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`
})

//获取验证码接口  /api/user/passport/sendCode/{phone}  get
export const reqCode = (phone) => request({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`,
})

//用户注册接口  /api/user/passport/register post   参数：phone password code
export const reqRegister = (data) => request({
    method: "post",
    url: '/user/passport/register',
    data,//data参数是给后台传的，params参数
})

//用户登录接口  /api/user/passport/login   post  参数  phone password
export const reqLogin = (data) => request({
    url: '/user/passport/login',
    data,
    method: 'post'
})

//通过请求头，携带token向服务器获取用户信息  api/user/passport/auth/getUserInfo  get
export const reqUserData = () => request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

//退出登录 /api/user/passport/logout get
export const reqLogout = () => request({
    method: 'get',
    url: '/user/passport/logout'
})

//获取用户地址接口 /api/user/userAddress/auth/findUserAddressList get
export const reqAdress = () => request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

//获取用户订单交易信息   /api/order/auth/trade get
export const reqTrade = () => request({
    url: '/order/auth/trade',
    method: 'get'
})

//提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, data) => request({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
})

//获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get
export const reqPayMessage = (orderId) => request({
    method: 'get',
    url: `/payment/weixin/createNative/${orderId}`
})

//查询交易是否成功 接口 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayResult = (orderId) => request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    methods: 'get'
})

//获取我的订单列表  /api/order/auth/{page}/{limit}  get
export const reqOrderList = (page, limit) => request({
    method: 'get',
    url: `/order/auth/${page}/${limit}`
})