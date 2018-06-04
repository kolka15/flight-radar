const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require ('webpack');

module.exports = {
    devtool: 'source-map',
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, ''),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }

            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        })
    ]
};