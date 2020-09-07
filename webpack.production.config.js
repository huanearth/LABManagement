/**
 * Created by lenovo on 2017/5/14.y
 */
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: path.resolve(__dirname, './static/script/ssp/index.js'),
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'bundle.js',
        publicPath: "./build/"
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:/node_modules|esri-loader/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-3'
            },
            {test:/\.jsx$/,
            exclude: /node_modules/,
            loader:'jsx-loader'
            },
            {test: /\.(png|jpg)$/,
            loader:'url-loader?limit=8192'
            },
            {test:/\.css$/,
                //loader: ExtractTextPlugin.extract("style-loader","css-loader")
                loader:'style-loader!css-loader'
            },
            {test: /\.less$/,
                //loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
             loader: 'style-loader!css-loader!less-loader'
            }

        ]
    },
    devServer:{
        hot:true,
        inline:true
    },
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
    ]
};
