'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');

// HTML livereload.
gulp.task('html', function() {
  return gulp.src(global.paths.html)
    .pipe(replace('../bower_components/', ''))
    .pipe(gulp.dest(global.paths.tmp));
});
