//设置token
export const setToken = (token) => {
    localStorage.setItem('Token', token)
}

//获取token
export const getToken = () => {
    return localStorage.getItem('Token')
}

//清除token
export const removeToken = () => {
    localStorage.removeItem('Token')
}