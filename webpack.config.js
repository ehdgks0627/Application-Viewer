var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssExtractPlugin = new ExtractTextPlugin({
    filename: __dirname + '/public/assets/bundle.css'
});

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/assets',
        filename: 'bundle.js',
    },

    // ES6 문법과 JSX 문법을 사용한다
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(css|scss)$/,
                loader: cssExtractPlugin.extract({
                    use: ['css-loader']
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                loader: 'url-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        cssExtractPlugin
    ]
};
