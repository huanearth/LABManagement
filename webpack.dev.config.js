var path = require('path');
var webpack = require('webpack');
var babelpolyfill = require("babel-polyfill");
module.exports = {
    entry: path.resolve(__dirname, './static/script/ssp/index.js'),
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'bundle.js',
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|esri-loader/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-3'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'jsx-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }

        ]
    },
    mode: 'development',
    devServer: {
        hot: true,
        inline: true,
        contentBase: path.resolve(__dirname, 'build'),//开发服务运行时的文件根目录
        host: '0.0.0.0',//主机地址
        port: 9999,//端口号
        proxy: {
            '/labmanage/api/lab538/sm/*': {
                target: 'http://172.27.50.5:8555',
                changeOrigin: true,
                secure: false,
            },
            '/labmanage/api/lab538/fm/*': {
                target: 'http://172.27.50.5:8556',
                changeOrigin: true,
                secure: false,
            },
            '/labmanage/api/lab538/am/*': {
                target: 'http://172.27.50.5:8557',
                changeOrigin: true,
                secure: false,
            },
            '/labmanage/api/lab538/bm/*': {
                target: 'http://172.27.50.5:8999',
                changeOrigin: true,
                secure: false,
            },
            '/labmanage/api/lab538/wpm/*': {
                target: 'http://172.27.50.5:8955',
                changeOrigin: true,
                secure: false,
            },
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
;
