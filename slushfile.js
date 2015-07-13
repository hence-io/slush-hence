/*
 * slush-slush-gen
 * https://github.com/Sean/slush-slush-gen
 *
 * Copyright (c) 2015, Sean Homer
 * Licensed under the MIT license.
 */

'use strict';

var _        = require('lodash'),
    gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    S        = require('string'),
    inquirer = require('inquirer'),
    path     = require('path');

function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var checkBoolean = function (v) {
  var isTrue = v === true || v === "true" || v === "y" || v === "yes" || v === "Y" || v === "Yes" ? true : false;
  v = isTrue;
};

var options = {
  'eslint': 'eslint',
  'esdoc': 'esdoc',
  'scsslint': 'scsslint',
  'sassdocs': 'sassdocs',
  'kss': 'kss style guide',
  'karma': 'karma unit testing',
  'wct': 'wct component testing',
  'editorconfig': 'include editorconfig'
};

var defaults = (function () {
  var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  }
  else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    currentDir: workingDirName,
    compPrefix: 'hence-comp',
    compName: 'sample',
    githubUser: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || '',
    compTypes: ['schema', 'model', 'ui', 'service'],
    compDescription: 'An element providing a starting point for your own reusable Polymer elements.',
    options: [
      {name: options.eslint, checked: true},
      {name: options.esdoc, checked: true},
      new inquirer.Separator(),
      {name: options.scsslint, checked: true},
      {name: options.sassdocs, checked: true},
      {name: options.kss, checked: true},
      new inquirer.Separator(),
      {name: options.karma, checked: true},
      {name: options.wct, checked: true},
      new inquirer.Separator(),
      {name: options.editorconfig, checked: true}
    ],
    folderOption: ['Make a subfolder "[prefix]-[type]-[name]" for it', 'Create it the current folder']
  };
})();

gulp.task('default', function (done) {
  var prompts = [
    {
      name: 'compPrefix',
      message: '"[prefix]-[type]-[name]" What would you like to prefix the component with?',
      default: defaults.compPrefix
    },
    {
      type: 'list',
      name: 'compType',
      message: '"[prefix]-[type]-[name]" What type of component do you want to create?',
      choices: defaults.compTypes,
      default: "ui"
    },
    {
      name: 'compName',
      message: '"[prefix]-[type]-[name]" What is the name of your new component?',
      default: defaults.compName
    }, {
      name: 'compDescription',
      message: 'Describe your new component:',
      default: defaults.compDescription
    }, {
      name: 'compVersion',
      message: 'Starting version of your project?',
      default: '0.1.0'
    }, {
      name: 'authorName',
      message: 'What is your name?',
      default: defaults.authorName
    }, {
      name: 'authorEmail',
      message: 'What is your email?',
      default: defaults.authorEmail
    }, {
      name: 'githubUser',
      message: 'What is your github username?',
      default: defaults.githubUser
    }, {
      type: 'checkbox',
      name: 'options',
      message: 'Select your development options:',
      choices: defaults.options
    }, {
      type: 'list',
      name: 'folderOption',
      message: 'Where do you want these files generated?',
      choices: defaults.folderOption
    }, {
      type: 'confirm',
      name: 'install',
      message: 'Auto install npm/bower packages?'
    }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    }
  ];
  //Ask
  inquirer.prompt(prompts,
    function (answers) {
      if (!answers.moveon) {
        return done();
      }
      answers.compNameSlug = S(answers.compName).slugify().s;


      //checkBoolean(answers.doCheck);

      var files = [];

      files.push(__dirname + '/templates/component/**');

      answers.compFullname = [answers.compPrefix, answers.compType, answers.compNameSlug].join('-');
      answers.compNameCamel = S(answers.compFullname).camelize().s;
      answers.compName = answers.compFullname;

      var destDir = './' + answers.compFullname;

      if (answers.folderOption === defaults.folderOption[1]) {
        destDir = './';
      }

      //console.log(answers.options);

      answers.npmDevPackages = {
        "babelify": "^6.1.2",
        "browser-sync": "^2.7.13",
        "bs-html-injector": "^2.0.4",
        "browserify": "^10.2.4",
        "del": "^1.2.0",
        "gulp": "^3.9.0",
        "gulp-autoprefixer": "^2.3.1",
        "gulp-babel": "^5.1.0",
        "gulp-cached": "^1.1.0",
        "gulp-concat": "^2.5.2",
        "gulp-imagemin": "^2.2.1",
        "gulp-minify-css": "^1.1.6",
        "gulp-minify-html": "^1.0.3",
        "gulp-rename": "^1.2.2",
        "gulp-replace": "^0.5.3",
        "gulp-sass": "^2.0.1",
        "gulp-sourcemaps": "^1.5.2",
        "gulp-uglify": "^1.2.0",
        "gulp-util": "^3.0.6",
        "imagemin-pngquant": "^4.1.0",
        "require-dir": "^0.3.0",
        "run-sequence": "^1.1.0",
        "vinyl-buffer": "^1.0.0",
        "vinyl-source-stream": "^1.1.0",
      };

      answers.options.forEach(function (opt) {
        switch (opt) {
          case options.eslint:
            files.push(__dirname + '/templates/_eslintrc');
            files.push(__dirname + '/templates/_eslintignore');
            _.extend(answers.npmDevPackages, {
              "babel-eslint": "^3.1.23",
              "eslint": "^0.24.0",
              "gulp-eslint": "^0.13.2",
            });
            break;
          case options.esdoc:
            files.push(__dirname + '/templates/_esdoc.json');
            _.extend(answers.npmDevPackages, {
              "esdoc": "^0.1.2",
            });
            break;
          case options.scsslint:
            files.push(__dirname + '/templates/_scss-lint.yml');
            _.extend(answers.npmDevPackages, {
              "gulp-scss-lint": "^0.2.0",
            });
            break;
          case options.sassdocs:
            files.push(__dirname + '/templates/_sassdocrc');
            _.extend(answers.npmDevPackages, {
              "sassdoc": "^2.1.15"
            });
            break;
          case options.kss:
            files.push(__dirname + '/templates/_sassdocrc');
            _.extend(answers.npmDevPackages, {
              "gulp-kss": "^0.0.2"
            });
            break;
          case options.karma:
            files.push(__dirname + '/templates/karma.conf.js');
            _.extend(answers.npmDevPackages, {
              "chai": "^3.0.0",
              "chai-as-promised": "^5.1.0",
              "karma": "^0.12.36",
              "karma-babel-preprocessor": "^5.2.1",
              "karma-browserify": "^4.2.1",
              "karma-chai": "^0.1.0",
              "karma-chai-as-promised": "^0.1.2",
              "karma-chrome-launcher": "^0.1.12",
              "karma-firefox-launcher": "^0.1.6",
              "karma-mocha": "^0.1.10",
              "karma-mocha-reporter": "^1.0.2",
              "karma-sinon-chai": "^1.0.0",
              "mocha": "^2.2.5",
              "proxyquireify": "^2.1.0",
              "watchify": "^3.2.3"
            });
            break;
          case options.wct:
            files.push(__dirname + '/templates/wct.conf.js');
            _.extend(answers.npmDevPackages, {
              "web-component-tester": "^3.2.0"
            });
            break;
          case options.editorconfig:
            files.push(__dirname + '/templates/_editorconfig');
            break;
        }
      });

      answers.npmDevPackages = JSON.stringify(answers.npmDevPackages);

      var buildPipe = gulp.src(files)
        .pipe(template(answers))
        .pipe(rename(function (file) {
          //console.log('file: '+JSON.stringify(file));
          if(file.dirname[0] === '_') {
            file.dirname = '.' + file.dirname.slice(1);
          }

          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          } else if (file.basename.indexOf('hence-comp-el') !== -1) {
            file.basename = file.basename.replace('hence-comp-el', answers.compFullname);
          }
        }))
        .pipe(conflict(destDir))
        .pipe(gulp.dest(destDir));

      if (answers.install) {
        buildPipe.pipe(install());
      }

      buildPipe.on('end', function () {
        //execSync('npm install', { stdio: 'inherit' });
        done();
      });
    });
});
