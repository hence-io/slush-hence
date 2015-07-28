'use strict';

import gulp  from 'gulp';
import replace from 'gulp-replace';

// HTML livereload.
gulp.task('html', ()=> {
  return gulp.src(global.paths.html)
    .pipe(replace('../../', '/bower_components'))
    .pipe(gulp.dest(global.paths.tmp));
});
