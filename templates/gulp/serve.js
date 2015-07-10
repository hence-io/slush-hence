'use strict';

var gulp = require('gulp');
// browserSync
var browserSync = require('browser-sync').create();
var path = require('path');
var util = require('gulp-util');

// sass
require('./sass')(browserSync);

/**
 * browserSync Tasks
 */
gulp.task('serve', ['clean-tmp', 'js', 'sass', 'html'], function () {
  browserSync.init({
    server: {
      baseDir: [global.paths.bower, global.paths.tmp]
    }
  });

  gulp.watch([global.paths.js], ['js-watch']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['sass-watch']).on('change', logChanges);
  gulp.watch([global.paths.html], ['html-watch']).on('change', logChanges);
});

gulp.task('sass-watch', ['lintsass','sass']);
gulp.task('js-watch', ['lintjs','js'], function () { return browserSync.reload(); });
gulp.task('html-watch', ['html'], function () { return browserSync.reload(); });

/**
 * browserSync logging
 * @param event
 */
function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}