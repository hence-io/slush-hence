// Plugins
var _ = require('lodash');
var async = require('async');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');

// glush-utils
var glush = require('glush-util');
var hence = require('hence-util');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var step0 = require('./steps/step-install-options');

var scaffold = glush.Scaffold({
  defaults: {
    dirs: {
      template: {
        root: __dirname + '/template/'
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

module.exports = function (done) {
  var steps = [step0];

  var scaffoldName = glush.env._[1] || glush.env.name || '';
  var cliArgs = {
    scaffoldName: scaffoldName,
    skipToInstall: !!scaffoldName
  };

  return scaffold.start(steps, {
    _debug: !!glush.env.debug,
    defaults: cliArgs
  }, done);
};
