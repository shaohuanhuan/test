/**
 * @author monkeywang
 * Date: 17/3/27
 */
var webpackConfig = require('./webpack.config.js');
var gulp = require('gulp');
var webpack = require("webpack");
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');

// Load plugins
var $ = require('gulp-load-plugins')();

/* es6 */
gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
    	 // output options
    }));
    callback();
  });
});

gulp.task('build.css', function () {
  gulp.src('./webApp/style/**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./static/style'));
});

gulp.task('watch.css', function () {
  gulp.watch('./webApp/style/**/*.styl', ['build.css']);
});
//监听文件修改
gulp.task('watch.js', function () {
  gulp.watch(['./webApp/js/**/*.js'], ['webpack']);
});

// 拷贝jade
gulp.task('copy',function(){
  gulp.src('./webApp/views/**/*.jade')
    .pipe(gulp.dest('./static/views'));
});

gulp.task('dev', ['build.css', 'webpack']);
gulp.task('build', ['build.css', 'webpack', 'copy']);
gulp.task('watch', ['watch.css', 'watch.js']);