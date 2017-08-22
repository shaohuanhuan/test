var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');


var CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
var ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
var MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
var BUILD_PATH = path.join(ROOT_PATH, './dist'); // 最后输出放置公共资源的目录


var HtmlWebpackPlugin = require('html-webpack-plugin'); //html页面生成插件
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //样式提取插件
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制插件


module.exports = {

    //页面入口文件配置
    entry: {
        app: ['./src/index.js'],
        vendors: ['jquery', 'moment'] //需要打包的第三方插件

    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "http://localhost:8088/dist/",
        filename: "bundle_[name].js"
    },
    //配置本地服务器
    devServer: {
        historyApiFallback: true,
        contentBase: "./", //根目录
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true, //开启实时刷新
        inline: true, //内存刷新
        lazy: false,
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8088', //端口号
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/json.php': {
                target: 'http://localhost:80/json.php',
                secure: false
            }
        }
    },

    module: {
        loaders: [
            // 把之前的style&css&less loader改为
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
                exclude: /node_modules/

            }

            , {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin
                    .extract('style', 'css!autoprefixer?{browsers: ["last 2 version", "IE 8", "Android 4.0", "iOS 6"]}!less?strictMath&noIeCompat!postcss')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                query: {
                    'presets': ['es2015'],
                    'plugins': [
                        'transform-es3-property-literals',
                        'transform-es3-member-expression-literals'
                    ]
                }
            }
        ]
    },
    postcss: function() {
        return [require('postcss-fixes')({ preset: 'recommended' })]
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin()
        //提取公共部分资源,用于提取多个入口文件的公共脚本部分，
        //然后生成一个 common.js 来方便多页面之间进行复用

        new webpack.optimize.CommonsChunkPlugin({
            // 与 entry 中的 vendors 对应
            name: 'vendors',
            // 输出的公共资源名称
            filename: 'common.bundle.js',
            // 对所有entry实行这个规则
            minChunks: Infinity
        }),
        // 把jquery作为全局变量插入到所有的代码中
        // 然后就可以直接在页面中使用jQuery了
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        //生成index.html页面
        new HtmlWebpackPlugin({
            title: '68kejian.com',
            filename: 'index.html',
            template: 'header.html',
            inject: 'body',
            // favicon:'./images/favico.ico',
            minify: false,
            hash: true,
            cache: false,
            showErrors: false

        }),
        // 分离css
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: './src/images', to: 'images' }

        ])

    ],
};