var _ = require('lodash');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var git = require('gulp-git');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var S = require('string');
var inquirer = require('inquirer');
var path = require('path');

var defaults = require('./config').defaults;
var promptOptions = require('./config').promptOptions;
var options = require('./config').options;
var isTruthy = require('./config').isTruthy;

function processAnswers(results) {
  if (!isTruthy(results.start)) {
    return false;
  }

  _.defaults(results, defaults);

  var files = [];

  if (!isTruthy(results.git)) {
    files.push("!" + global.dirs.component.common + '_git/**/*');
  }

  switch (results.cssProcessor) {
    case promptOptions.cssProcessors.compass:
      _.extend(npm.devDependencies, {
        "gulp-compass": "^2.1.0",
      });
      results.cssProcessor = 'compass';
      break;
    case promptOptions.cssProcessors.libSass:
      _.extend(npm.devDependencies, {
        "gulp-sass": "^2.0.1",
      });
      results.cssProcessor = 'libSass';
      break;
  }

  results.options.forEach(function (opt) {
    switch (opt) {
      case options.eslint:
        files.push(global.dirs.component.optional + '_eslintrc');
        files.push(global.dirs.component.optional + '_eslintignore');
        _.extend(npm.devDependencies, {
          "babel-eslint": "^3.1.23",
          "eslint": "^0.24.0",
          "gulp-eslint": "^0.13.2",
        });
        break;
      case options.esdoc:
        files.push(global.dirs.component.optional + '_esdoc.json');
        files.push(global.dirs.component.optional + '_jsdoc.json');
        _.extend(npm.devDependencies, {
          "esdoc": "^0.1.2",
          "jsdoc": "^3.3.2",
          "minami": "^1.1.0",
        });
        break;
      case options.scsslint:
        files.push(global.dirs.component.optional + '_scss-lint.yml');
        _.extend(npm.devDependencies, {
          "gulp-scss-lint": "^0.2.0",
        });
        break;
      case options.sassdocs:
        files.push(global.dirs.component.optional + '_sassdocrc');
        _.extend(npm.devDependencies, {
          "sassdoc": "^2.1.15"
        });
        break;
      case options.kss:
        files.push(global.dirs.component.optional + '_sassdocrc');
        _.extend(npm.devDependencies, {
          "sc5-styleguide": "git://github.com/hence-io/sc5-styleguide",
          //"sc5-styleguide": "^0.3.27",
        });
        break;
      case options.karma:
        files.push(global.dirs.component.optional + 'karma.conf.js');
        _.extend(npm.devDependencies, {
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
        files.push(global.dirs.component.optional + 'wct.conf.js');
        _.extend(npm.devDependencies, {
          "web-component-tester": "^3.2.0"
        });
        break;
      case options.editorconfig:
        files.push(global.dirs.component.optional + '_editorconfig');
        break;
    }
  });

  results.npmDevDependencies = JSON.stringify(npm.devDependencies);
  results.npmDependencies = JSON.stringify(npm.dependencies);
  results.bowerDependencies = JSON.stringify(bower.dependencies);

  return files;
}

module.exports = processAnswers;
