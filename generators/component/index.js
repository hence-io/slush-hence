// Plugins
var _ = require('lodash');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var git = require('gulp-git');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var path = require('path');

// glush-utils
var glush = require('glush-util');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var step0 = require('./steps/step-install-options');
var step1 = require('./steps/step-component');
var step2 = require('./steps/step-author');
var step3 = require('./steps/step-project');
var step4 = require('./steps/step-complete');

var scaffold = glush.Scaffold({
  defaults: {
    dependencies: require('./dependencies.json'),
    dirs: {
      template: {
        common: __dirname + '/template/common/',
        type: __dirname + '/template/type/',
        fonts: __dirname + '/template/fonts/',
        optional: __dirname + '/template/optional/'
      },
      dest: './'
    }
  },
  content: {
    intro: glush.ascii.hence(
      glush.colors.bold(" Welcome to the Hence.io Scaffolding Tool. ") + "Your component generation is about to be" +
      " being. You have to option to\n create a component with a quick install, or dive into a detailed installation" +
      " should you desire."
    ),
    done: glush.colors.bold(" Thank you for using the Hence.io Scaffolding Tool!\n") +
    " Review the possible gulp commands available to you on the project documentation, or type '" +
    glush.colors.bold('gulp help') + "' at any time."
  },
  inquirer: {
    detailedInstallOnly: function () {
      return scaffold.answers.installOption === step0.options.installOptions.detailed;
    }
  },
  install: function (answers) {
    var destDir = answers.dirs.dest;

    // Due to the nature of font files, or any other future files that must not be parsed by the template
    // controls, they have to handled separately
    var fontDir = destDir + 'fonts';
    gulp.src(answers.dirs.fonts + '**')
      .pipe(conflict(fontDir))
      .pipe(gulp.dest(fontDir));

    // Ensure we're initializing the git folder if requested, so the templated config can override it afterwards
    if (answers.git) {
      git.init({cwd: destDir}, function (err) {
      });
    }

    // Start building the pipe for installing the package
    var pipe = gulp.src(answers.files)
      .pipe(template(_.omit(answers, 'files'), {
        interpolate: /<%=(.+?)%>/g
      }))
      .pipe(rename(function (filepath) {
        var dirname = filepath.dirname;
        var basename = filepath.basename;

        if (dirname[0] === '_') {
          filepath.dirname = '.' + dirname.slice(1);
        }

        if (basename[0] === '_') {
          filepath.basename = '.' + basename.slice(1);
        } else if (basename.indexOf('hence-el') !== -1) {
          filepath.basename = basename.replace('hence-el', answers.compName);
        }
      }))
      .pipe(conflict(destDir))
      .pipe(gulp.dest(destDir));

    // Unable to perform this in a gulpif, or else the .on('end'... will not fire afterwards.
    if (answers.installDependencies) {
      pipe.pipe(install());
    }

    return pipe;
  }
});

module.exports = function (done) {
  scaffold.start([step0, step1, step2, step3, step4], done);

  return scaffold;
};
