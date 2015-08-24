// Plugins
var _ = require('lodash');
var async = require('async');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var git = require('gulp-git');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var path = require('path');
var execSync = require('child_process').execSync;

// glush-utils
var glush = require('glush-util');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var step0 = require('./steps/step-install-options');
var step1 = require('./steps/step-component');
var step2 = require('./steps/step-author');
var step3 = require('./steps/step-project');
var step4 = require('./steps/step-complete');

// Capture the initial folder this is ran in
var cwd = process.cwd();

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
  install: function (answers, finished) {
    var destDir = answers.dirs.dest;

    if (this._debug) {
      console.log('>> Attempting install with:', _.omit(answers, 'dependencies', 'files', 'npmDevDependencies', 'npmDependencies', 'bowerDependencies'));
    }

    // Due to the nature of font files, or any other future files that must not be parsed by the template
    // controls, they have to handled separately
    var fontDir = destDir + 'fonts';
    gulp.src(answers.dirs.fonts + '**')
      .pipe(conflict(fontDir))
      .pipe(gulp.dest(fontDir));

    // Ensure we're initializing the git folder if requested, so the templated config can override it afterwards
    if (answers.gitInit) {
      console.log('>> Attempting git init on:', answers.dirs.dest);
      git.init({cwd: destDir}, function (err) {
        if (err) {
          return finished(['error', 'install', 'git init failure', err]);
        }
      });
    }

    // Start building the pipe for installing the package
    var stream = gulp.src(answers.files)
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

    return finished(null, stream);
  },
  postInstall: function (answers, finalize) {
    if (answers.installDependencies) {
      try {
        console.log('>> Attempting install-deps on:', answers.dirs.dest);
        execSync('npm run install-deps', {cwd: answers.dirs.dest, stdio: 'inherit'});
      } catch (err) {
        return finalize(['error', 'postInstall', 'installDependencies failure', err]);
      }
    } else {
      scaffold.content.done += "\n\n " + glush.colors.bold('Note:') + " You chose " + glush.colors.bold('not') +
        " to install this packages  dependencies at this time. Please ensure to do this before attempting\n to" +
        " utilize it by running '" + glush.colors.bold('npm run install-deps') + "'."
    }

    return finalize();
  }
});

module.exports = function (done) {
  var steps = [step0, step1, step2, step3, step4];

  if (glush.env._.length > 1) {
    var installOptions = [];
    var installs = _.chain(glush.env._)
      .filter(function (arg) {
        return arg !== 'hence';
      })
      .map(function (arg) {
        var splitName = arg.split(':');
        var prefix = glush.env.pre || 'hence';
        var compOpts = {
          content: {
            intro: 'Starting component installation on: ' + prefix + '-' + splitName[1]+ ', type:' + splitName[1]
          },
          defaults: {
            installDependencies: !!glush.env.deps,
            gitInit: !!glush.env.gitinit,
            compName: splitName[0],
            compType: splitName[1],
            compPrefix: prefix
          }
        };

        installOptions.push(compOpts);
      })
      .value();

    //console.log('installers', installs, installOptions, glush.env);
    //return done();

    //scaffold._debug = true;
    scaffold.startMultiInstall(steps, installOptions, done);
  }
  else {
    return scaffold.start(steps, done);
  }
};
