// Plugins
var _ = require('lodash');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');

var install = function (answers, finished) {
  var files = answers.files;
  var destDir = answers.dirs.dest;

  console.log('>> Installing: ', files, '\n>> To: ', destDir);

  // Start building the pipe for installing the package
  var stream = gulp.src(files)
    .pipe(conflict(destDir, {defaultChoice: 'n'}))
    .pipe(gulp.dest(destDir));

  return finished(null, stream);
};

module.exports = install;
