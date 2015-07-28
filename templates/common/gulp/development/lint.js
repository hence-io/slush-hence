'use strict';

import gulp from 'gulp';
import cache from 'gulp-cached';
import eslint from 'gulp-eslint';
import scsslint from 'gulp-scss-lint';

// Lint JS.
gulp.task('lintjs', ()=> {
  return gulp.src(global.paths.js)
    .pipe(cache('lintjs'))
    .pipe(eslint())
    .pipe(eslint.format());
});

// Lint SASS.
gulp.task('lintsass', ()=> {
  return gulp.src(global.paths.sass)
    .pipe(cache('lintsass'))
    .pipe(scsslint());
});

// Lint all the things!
gulp.task('lint', ['lintjs', 'lintsass']);
