var gulp = require('gulp'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('gulp-rimraf'),
    less = require('gulp-less'),
    coffee = require('gulp-coffee'),
    imagemin = require('gulp-imagemin'),
    //minifyhtml = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),//加控制台文字描述用的
    usemin = require('gulp-usemin');

//拷贝相关文件
gulp.task('bulid', function () {
    return gulp.src(['bower_components/bootstrap/fonts/*'])
        // .pipe(rename({dirname: ''}))//如遇到不同目录的内容合并到一个目录里，需要用的rename
        .pipe(gulp.dest('src/fonts'));
});

//编译less文件
gulp.task('less', function(){
    return gulp.src('src/css/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

//编译coffee文件
//gulp.task('coffee', function(){
//    return gulp.src('src/js/*.coffee')
//        .pipe(coffee())
//        .pipe(gulp.dest('src/js'));
//});

//删除dist目录,发现clean没有del好用
gulp.task('del', function() {
    return gulp.src(['dist'], {read: false})
        .pipe(del());
});

//拷贝相关文件
gulp.task('fonts', function () {
    return gulp.src(['bower_components/bootstrap/fonts/*'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist/fonts'));
});

//图片压缩
gulp.task('minifyimages', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'));
});

//HTML资源路径调整
gulp.task('usemin', function() {
    return gulp.src('src/*.html')
        .pipe(usemin({
            css: [ minifycss ],
            js: [ uglify ],
            cssrev: [ minifycss ,rev ],
            jsrev: [ uglify , rev ],
            inlinejs: [ uglify ]
        }))
        .pipe(gulp.dest('dist/'));
});

//打包到dist目录
gulp.task('dist', ['usemin', 'fonts', 'minifyimages' ]);
gulp.task('build', ['del'], function () {
  gulp.start('dist');
});

//监控
gulp.task('watch', function() {
    //监控所有.less
    gulp.watch('src/css/less/*.less', ['less']);
    //监控所有.coffee
    //gulp.watch('src/js/coffee/*.coffee', ['coffee']);
});