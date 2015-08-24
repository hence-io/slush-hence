// Plugins
var _ = require('lodash');
var async = require('async');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');

// glush-utils
var glush = require('glush-util');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var step0 = require('./steps/step-install-options');
var step1 = require('./steps/step-complete');

var scaffold = glush.Scaffold({
  defaults: {
    dirs: {
      template: {
        root: __dirname + '/template/'
        // add additional template folders as needed to optional control what files are used in the build
      },
      dest: './'
    }
  },
  content: {
    intro: '',
    done: ''
  },
  install: function (answers, finished) {
    // Start building the pipe for installing the package
    var stream = gulp.src(answers.files)
      .pipe(template(_.omit(answers, 'files'), {
        interpolate: /<%=(.+?)%>/g
      }))
      .pipe(gulp.dest(destDir));

    return finished(null, stream);
  }
});

module.exports = function (done) {
  var steps = [step0, step1];

  var cliArgs = {
    //
  };

  return scaffold.start(steps, {
    defaults: cliArgs
  }, done);
};
