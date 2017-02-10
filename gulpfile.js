var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    uglify = require("gulp-uglify"),//js压缩
    rename = require('gulp-rename'),
    concat  = require('gulp-concat'); //合并文件

var targetLess = 'src/public/less/*.less'; //要压缩的less文件
var outputCss = 'src/public/css/';  //压缩出输出的css位置

var targetJs = 'src/js/**/*.js'; //要压缩的js文件
var ouputJs = 'src/dist/';  //压缩出输出的js文件位置
var outputJsName = 'main.min.js'; //压缩后输出的css位置

gulp.task("clean", function(){
    gulp.src(ouputJs)
        .pipe(clean());
});

gulp.task('css', function () {
    gulp.src(targetLess)
        .pipe(less(targetLess))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputCss));
});

gulp.task('minifyJs', ['clean'],function() {
    gulp.src(targetJs)
        .pipe(concat(outputJsName))    //合并所有js到main.min.js
        .pipe(uglify())    //压缩
        .pipe(gulp.dest(ouputJs));    //输出main.js到文件夹
});

gulp.task('watchData', function () {
    // gulp.watch(targetJs, ['minifyJs']);
    gulp.watch(targetLess, ['minifyCss']);
});

