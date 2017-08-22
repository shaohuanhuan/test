var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');//引入代理中间件
global.version = '1.0.0'; //版本号
//开发环境配置

var options = process.env.NODE_ENV === 'production' ? {
  viewsPath: '../static/views',
  publicPath: '../static'
} : {viewsPath: '../webApp/views', publicPath: '../static'};

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, options.viewsPath));
app.set('view engine', 'jade');
app.set('view cache', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, options.publicPath),{maxAge:1000*60*60}));
/**
 * proxy middleware options
 * 代理跨域配置
 * @type {{target: string, changeOrigin: boolean, pathRewrite: {^/api: string}}}
 */
var options = {
  target: 'http://api.douban.com/v2', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  pathRewrite: {
    '^/api': ''
  }
};

var exampleProxy = proxy(options);
app.use('/api', exampleProxy);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
