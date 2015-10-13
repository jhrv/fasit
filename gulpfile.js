var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gulp = require('gulp')
var gutil = require('gulp-util')
var browserify = require('browserify')
var reactify = require('reactify')
var size = require('gulp-size')
var watchify = require('watchify')
var notify = require("gulp-notify")
var gulpif = require('gulp-if')
var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var env = process.env.NODE_ENV || 'development'

var paths = {
    entryPoint: './frontend/src/js/components/app.jsx',
    js: ['./frontend/src/js/**/*.jsx', './app.jsx'],
    jsLibs: './frontend/src/lib/**/*.js',
    fonts: ['./frontend/src/fonts/**/*', './node_modules/font-awesome/fonts/**/*'],
    css: './frontend/src/css/**/*.css',
    extCss: './frontend/src/ext/css/**/*.css',
    buildDir: './frontend/build',
    jsBuild: './frontend/build/js',
    cssBuild: './frontend/build/css',
    fontsBuild: './frontend/build/fonts',
    distDir: './dist',
    indexHtml: './frontend/src/index.html',
    favicon: './frontend/src/favicon.png'
}

var buildScript = function (file, watch) {
    var props = watchify.args
    props.entries = [file]
    props.debug = true
    
    var bundler = watch ? watchify(browserify(props)) : browserify(props)
    bundler.transform(reactify)

    var rebundle = function () {
        var errorHandler = notify.onError({
            title: "Compile Error",
            message: "<%= error.message %>"
        })
        var stream = bundler.bundle()
        return stream.on('error', errorHandler)
           .pipe(source('app.js'))
           .pipe(buffer())
           .pipe(gulpif(env === 'production', uglify()))
           .pipe(size())
           .pipe(gulp.dest(paths.buildDir + '/'))
    }

    bundler.on('update', function() {
        gutil.log('rebundling...')
        rebundle()
    })

    return rebundle()
}

gulp.task('bundle-css', function () {
    return gulp.src(['./node_modules/font-awesome/css/font-awesome.css', paths.extCss, paths.css])
        .pipe(concat('bundle.css'))
//      .pipe(minifyCSS())
        .pipe(size())
        .pipe(gulp.dest(paths.cssBuild));
});

gulp.task('build', function() {
    return buildScript(paths.entryPoint, false)
})

gulp.task('copy-indexhtml', function () {
    return gulp.src(paths.indexHtml)
        .pipe(gulp.dest(paths.buildDir));
});

gulp.task('copy-fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.fontsBuild));
});

gulp.task('default', ['build', 'copy-fonts', 'bundle-css', 'copy-indexhtml'], function() {
    return buildScript(paths.entryPoint, true)
})

