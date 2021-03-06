var gulp = require('gulp'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('gulp-rimraf'),
    less = require('gulp-less'),
    coffee = require('gulp-coffee'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    minifycss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),

    //加控制台文字描述用的
    notify = require('gulp-notify'),
    usemin = require('gulp-usemin');

//编译less文件
gulp.task('less', function(){
    return gulp.src('src/css/app.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

//编译coffee文件
//gulp.task('coffee', function(){
//    return gulp.src('src/js/*.coffee')
//        .pipe(coffee())
//        .pipe(gulp.dest('src/js'));
//});

//删除dist目录
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
    gulp.watch('src/css/*.less', ['less']);
    //监控所有.coffee
    //gulp.watch('src/js/coffee/*.coffee', ['coffee']);
});