module.exports = {
    //publicPath:'./',
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: false, //是否自动弹出浏览器页面
        //前端服务器ip及端口
        //host: "localhost",
        //port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.245.195:8080/', //后端API服务器的地址
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
};

