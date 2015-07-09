/*
 * slush-slush-gen
 * https://github.com/Sean/slush-slush-gen
 *
 * Copyright (c) 2015, Sean Homer
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    S        = require('string'),
    inquirer = require('inquirer'),
    path     = require('path');

function format (string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var checkBoolean = function (v) {
  var isTrue = v === true || v === "true" || v === "y" || v === "yes" || v === "Y" || v === "Yes" ? true : false;
  v = isTrue;
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
    compName: 'new-el',
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || '',
    compTypes: ['schema', 'model', 'ui', 'service'],
    compDescription: 'An element providing a starting point for your own reusable Polymer elements.'
  };
})();

gulp.task('default', function (done) {
  var prompts = [
    {
      name: 'compPrefix',
      message: 'What would you like to prefix the component with?',
      default: defaults.compPrefix
    },
    {
      type: 'list',
      name: 'compType',
      message: 'What type of component do you want to create?',
      choices: defaults.compTypes
    },
    {
      name: 'compName',
      message: 'What is the name of your new component? The final name will be generated as "[prefix]-[type]-[name]"',
      default: defaults.compName
    }, {
      name: 'compDescription',
      message: 'What is the description?',
      default: defaults.compDescription
    }, {
      name: 'compVersion',
      message: 'What is the version of your project?',
      default: '0.1.0'
    }, {
      name: 'authorName',
      message: 'What is the author name?',
      default: defaults.authorName
    }, {
      name: 'authorEmail',
      message: 'What is the author email?',
      default: defaults.authorEmail
    }, {
      name: 'userName',
      message: 'What is the github username?',
      default: defaults.userName
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

      files.push(__dirname + '/templates/**');

      answers.compFullname = [answers.compPrefix, answers.compType,answers.compNameSlug].join('-');
      answers.compNameCamel = S(answers.compFullname).camelize().s;
      answers.compName = answers.compFullname;
      var destDir = './' + answers.compFullname;
      gulp.src(files)
        .pipe(template(answers))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          } else if (file.basename.indexOf('hence-comp-el') !== -1) {
            file.basename = file.basename.replace('hence-comp-el', answers.compFullname);
          }
        }))
        .pipe(conflict(destDir))
        .pipe(gulp.dest(destDir))
        .pipe(install())
        .on('end', function () {
          done();
        });
    });
});
