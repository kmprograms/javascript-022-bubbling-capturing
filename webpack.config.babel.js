import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const files = [ 'index' ];

module.exports = {
    entry: Object.fromEntries(files.map(file => [file, `./src/js/${file}.js`])),

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].bundle.js'
    },
    plugins: [
        ...files.map(file => new HtmlWebpackPlugin({
            filename: `${file}.html`,
            title: `${file.toUpperCase()}`,
            template: path.resolve(__dirname, `./src/${file}.html`),
            chunks: [`${file}`]
        })),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        })
    ],
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000,
        open: true
    }
};
