// const webpack = require('webpack');
const path = require('path');


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, ''),
        // publicPath: '',
        watchContentBase: true,
        hot: false,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};