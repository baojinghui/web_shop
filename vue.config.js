const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭错误校验
  lintOnSave: false,
  productionsourceMap: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {//请求前缀，如果请求地址前面加上/api前缀就是走代理，不加就是不走代理 23.225.148.163
        target: 'http://gmall-h5-api.atguigu.cn',//http://39.98.123.211
        // pathRewrite: { '^/api': '' },//重写请求url地址中的路径，如果不重写代理服务器会拿着带有前缀/api的url请求
        ws: true,//指用来支持 websocket
        changeOrigin: true//用来伪造端口号，用于控制请求头中的host值
      },
    }
  }
})
