var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var path = require('path');
var util = require('gulp-util');

// Static server
gulp.task('serve', ['js', 'sass', 'clean-tmp'], function () {
  browserSync.init({
    server: {
      baseDir: [global.paths.bower, global.paths.src, global.paths.tmp]
    }
  });

  gulp.watch([global.paths.js], ['js-watch']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['sass-watch']).on('change', logChanges);
  gulp.watch([global.paths.html], ['html-watch']).on('change', logChanges);

  function logChanges(event) {
    util.log(
      util.colors.green('File ' + event.type + ': ') +
      util.colors.magenta(path.basename(event.path))
    );
  }
});

gulp.task('sass-watch', ['lintsass','sass'], function () {
  return browserSync.reload();
});
gulp.task('js-watch', ['lintjs','js'], function () {
  return browserSync.reload();
});
gulp.task('html-watch', ['html'], function () {
  return browserSync.reload();
});
