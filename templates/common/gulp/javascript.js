'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

gulp.task('js',['lintjs'], function () {
  return browserify(global.paths.mainjs, {debug: true})
    .transform(babelify)
    .bundle().on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(global.comp.name+'.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    //.pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(global.paths.tmp + 'js'));
});
