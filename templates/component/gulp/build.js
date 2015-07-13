'use strict';

// Common
var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('child_process').execSync;
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSeq = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

// Html
var minifyHtml = require('gulp-minify-html');

// Images
var pngquant = require('imagemin-pngquant');
var imagemin = require('gulp-imagemin');

// Sass
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

// JS
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');

// Serve
var browserSync = require('browser-sync').create();

// One build task to rule them all.
gulp.task('build', function (done) {
  runSeq('clean', ['buildsass', 'buildimg', 'buildjs'], 'buildhtml', done);
});

gulp.task('build:serve', function (done) {
  runSeq('clean', ['buildsass', 'buildimg', 'buildjs'], 'buildhtml', function () {
    browserSync.init({
      server: {
        baseDir: ['./']
      },
      startPath: '/dist/index.html'
    });
  });
});

// Build SASS for distribution.
gulp.task('buildsass', function () {
  gulp.src(global.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(global.comp.name+'.css'))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist + 'css'));
});

// Build JS for distribution.
gulp.task('buildjs', function () {
  return browserify(global.paths.mainjs, {debug: true})
    .transform(babelify)
    .bundle().on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(global.comp.name+'.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist + 'js'));
});

// Build HTML for distribution.
gulp.task('buildhtml', function () {
  gulp.src(global.paths.html)
    .pipe(replace(global.comp.name+'.css', global.comp.name+'.min.css'))
    .pipe(replace(global.comp.name+'.js', global.comp.name+'.min.js'))
    //.pipe(replace('<script src="config.js"></script>', ''))
    //.pipe(replace("<script>System.import('./js/app')</script>", ''))
    //.pipe(minifyHtml())
    .pipe(gulp.dest(global.paths.dist));
});

// Build images for distribution.
gulp.task('buildimg', function () {
  gulp.src(global.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.dist + 'img'));
});
