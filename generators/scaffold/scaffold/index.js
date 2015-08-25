// Plugins
var _ = require('lodash');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');

// glush-utils
var glush = require('glush-util');
var hence = require('hence-util');

var tplDir = __dirname + '/../';

var scaffold = glush.Scaffold({
  defaults: {
    dirs: {
      template: {
        root: tplDir
      },
      dest: './generators'
    }
  },
  content: {
    intro: hence.ascii.hence(
      glush.colors.bold(" Welcome to the Hence.io Scaffolding Sub-enerator. ") + "This installer is designed to" +
      " generate a skeleton scaffold installer for you to build sub-generators from."
    ),
    done: glush.colors.bold(" Thank you for using the Hence.io Scaffolding Tool!\n") +
    " Review the possible gulp commands available to you on the project documentation, or type '" +
    glush.colors.bold('gulp help') + "' at any time."
  },
  install: function (answers, finished) {
    var files = answers.files;
    var destDir = answers.dirs.dest;

    console.log('>> Installing: ', files, '\n>> To: ', destDir);

    // Start building the pipe for installing the package
    var stream = gulp.src(files)
      .pipe(conflict(destDir, {defaultChoice: 'n'}))
      .pipe(gulp.dest(destDir));

    return finished(null, stream);
  }
});

module.exports = scaffold;
