'use strict';

var gulp = require('gulp');
// browserSync
var browserSync = require('browser-sync').create();
var path = require('path');
var util = require('gulp-util');
var htmlInjector = require("bs-html-injector");


// sass
require('./sass')(browserSync);

/**
 * browserSync Tasks
 */
gulp.task('serve', ['clean-tmp', 'js', 'sass', 'html'], function () {
  browserSync.use(htmlInjector, {
    files: global.paths.html
  });
  browserSync.init({
    server: {
      baseDir: ['./']
    },
    startPath: '/.tmp/index.html'
  });

  gulp.watch([global.paths.js], ['js-watch']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['sass-watch']).on('change', logChanges);
  gulp.watch([global.paths.html], ['html-watch']).on('change', logChanges);
});

gulp.task('sass-watch', ['lintsass', 'sass']);
gulp.task('js-watch', ['lintjs', 'js'], function () { return browserSync.reload(); });
gulp.task('html-watch', ['html'], htmlInjector);

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
