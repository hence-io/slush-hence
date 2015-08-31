// Plugins
var _ = require('lodash');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var git = require('gulp-git');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var execSync = require('child_process').execSync;

// glush-utils
var glush = require('glush-util');
var hence = require('hence-util');

var installOptions = require('./step-install-options').options.installOptions;

var tplDir = __dirname + '/../template/';

var scaffold = glush.Scaffold({
  // The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
  // steps, you're aok!
  steps: [
    require('./scaffold/step-install-options'),
    require('./scaffold/step-component'),
    require('./scaffold/step-author'),
    require('./scaffold/step-project'),
    require('./scaffold/step-complete')
  ],
  defaults: {
    dependencies: require('./dependencies.json'),
    dirs: {
      template: {
        common: tplDir + 'common/',
        type: tplDir + 'type/',
        fonts: tplDir + 'fonts/',
        optional: tplDir + 'optional/'
      },
      dest: './'
    },
    installDependencies: !glush.env['ignore-deps'],
    gitInit: !!glush.env.git,
    compPrefix: glush.env.pre || 'hence'
  },
  content: {
    intro: hence.ascii.hence(
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
      return scaffold.answers.installOption === installOptions.detailed;
    }
  },
  cliArg: function (arg) {
    var splitName = arg.split(':');

    return {
      content: {
        intro: glush.ascii.heading('Component Installation') +
        glush.colors.bold(' Name: ') + this.defaults.compPrefix + '-' + splitName[0] +
        glush.colors.bold('\n Type: ') + splitName[1],
        done: glush.ascii.spacer()
      },
      defaults: _.extend({
        compName: splitName[0],
        compType: splitName[1]
      }, defaults)
    };
  },
  install: function (answers, finished) {
    var destDir = answers.dirs.dest;

    if (scaffold._debug) {
      console.log('>> Attempting install with:', _.omit(answers, 'dependencies', 'files', 'npmDevDependencies', 'npmDependencies', 'bowerDependencies'));
    }

    // Due to the nature of font files, or any other future files that must not be parsed by the template
    // controls, they have to handled separately
    var fontDir = destDir + 'fonts';
    gulp.src(answers.dirs.fonts + '**')
      .pipe(conflict(fontDir))
      .pipe(gulp.dest(fontDir));

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
      .pipe(conflict(destDir, {defaultChoice: 'n'}))
      .pipe(gulp.dest(destDir));

    return finished(null, stream);
  },
  postInstall: function (answers, finalize) {
    var destDir = answers.dirs.dest;

    if (answers.gitInit) {
      console.log('>> Initializing Git Repository:', destDir);
      git.init({cwd: destDir}, function (err) {
        if (err) {
          return finalize(['error', 'postInstall', 'git init failure', err]);
        }
      });
    }

    if (answers.installDependencies) {
      try {
        console.log(glush.ascii.heading('Installing Dependencies') + ' On:', answers.dirs.dest);
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

module.exports = scaffold;
