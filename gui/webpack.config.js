const path = require('path');
const webpack = require('webpack');

module.exports = {
    //do webpack stuff here
    entry: path.join(__dirname, 'report', 'react', 'index.js'),
    output: {
        path: path.resolve('report/public'), //determines where the file is going (?)
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    //can put plug in here if we want
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }
}