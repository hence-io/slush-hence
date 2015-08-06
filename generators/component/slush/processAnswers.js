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
var options = require('./config').options;
var checkBoolean = require('./config').checkBoolean;

function processAnswers(answers) {
  if (!(checkBoolean(answers.start))) {
    return false;
  }
  answers.compNameSlug = S(answers.compName).slugify().s;

  var npm = {
    devDependencies: {
      "babel": "^5.8.9",
      "babel-core": "^5.8.9",
      "babelify": "6.1.2",
      "browser-sync": "^2.7.13",
      "bs-html-injector": "^2.0.4",
      "browserify": "^10.2.4",
      "del": "^1.2.0",
      "gulp": "^3.9.0",
      "gulp-plumber": "^1.0.1",
      "gulp-if": "^1.2.5",
      "gulp-autoprefixer": "^2.3.1",
      "gulp-babel": "^5.1.0",
      "gulp-cached": "^1.1.0",
      "gulp-concat": "^2.5.2",
      "gulp-insert": "^0.4.0",
      "gulp-imagemin": "^2.2.1",
      "gulp-minify-css": "^1.1.6",
      "gulp-minify-html": "^1.0.3",
      "gulp-rename": "^1.2.2",
      "gulp-replace": "^0.5.3",
      "gulp-sourcemaps": "^1.5.2",
      "gulp-uglify": "^1.2.0",
      "gulp-util": "^3.0.6",
      "imagemin-pngquant": "^4.1.0",
      "require-dir": "^0.3.0",
      "run-sequence": "^1.1.0",
      "vinyl-buffer": "^1.0.0",
      "vinyl-source-stream": "^1.1.0"
    },
    dependencies: {
      "consoler": "git://github.com/blitzcodes/consoler",
      "hence-polycore": "git://github.com/hence-io/hence-polycore",
      "doc-ready": "^1.0.3",
      "lodash": "^3.10.0",
      "moment": "^2.10.3",
      "string": "^3.3.0"
    }
  };

  var bower = {
    dependencies: {
      "polymer": "Polymer/polymer#^1.0.0",
      "font-awesome": "~4.3.0"
    }
  };

  var files = [];

  files.push(global.dirs.component.common + '**');

  answers.compFullname = [answers.compPrefix, answers.compNameSlug].join('-');
  answers.compNameCamel = S(answers.compFullname).camelize().s;
  answers.compNameCamel = answers.compNameCamel[0].toUpperCase() + answers.compNameCamel.slice(1); // Can't use .capitalize() as it will lowercase the camel humps
  answers.compName = answers.compFullname;

  if (!checkBoolean(answers.git)) {
    files.push("!" + global.dirs.component.common + '_git/**/*');
  }

  files.push(global.dirs.component.type + answers.compType + '/**');

  switch (answers.compType) {
    case defaults.compTypes.schema:
      _.extend(npm.devDependencies, {
        "schemas": "^1.0.0",
      });
      break;
    case defaults.compTypes.model:
      _.extend(bower.dependencies, {});
      break;
    case defaults.compTypes.ui:
      _.extend(bower.dependencies, {});
      break;
  }

  //console.log(answers.options);

  switch (answers.cssProcessor) {
    case defaults.cssProcessors.compass:
      _.extend(npm.devDependencies, {
        "gulp-compass": "^2.1.0",
      });
      answers.cssProcessor = 'compass';
      break;
    case defaults.cssProcessors.libSass:
      _.extend(npm.devDependencies, {
        "gulp-sass": "^2.0.1",
      });
      answers.cssProcessor = 'libSass';
      break;
  }

  answers.options.forEach(function (opt) {
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

  answers.npmDevDependencies = JSON.stringify(npm.devDependencies);
  answers.npmDependencies = JSON.stringify(npm.dependencies);
  answers.bowerDependencies = JSON.stringify(bower.dependencies);

  return files;
}

module.exports = processAnswers;
