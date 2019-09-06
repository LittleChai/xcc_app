module.exports = {
    runtimeCompiler: true,
    publicPath: './', // 设置打包文件相对路径
    productionSourceMap: false,
    devServer: {
        // open: process.platform === 'darwin',
        host: 'localhost',
        // port: 8080,
        // open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                //对应自己的接口
                // target: 'http://192.168.1.118:3000',
                target: 'http://localhost:6666',
                // target: 'http://apps.wuyayu.com:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}        