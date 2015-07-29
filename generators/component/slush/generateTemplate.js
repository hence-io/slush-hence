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

var checkBoolean = require('./config').checkBoolean;

function generateTemplate(files, answers, destDir) {
  _.templateSettings = {
    interpolate: /<%=(.+?)%>/g
  };

  return gulp.src(files)
    .pipe(template(answers, _.templateSettings))
    .pipe(rename(function (filepath) {
      if (filepath.dirname[0] === '_') {
        filepath.dirname = '.' + filepath.dirname.slice(1);
      }

      if (filepath.basename[0] === '_') {
        filepath.basename = '.' + filepath.basename.slice(1);
      } else if (filepath.basename.indexOf('hence-comp-el') !== -1) {
        filepath.basename = filepath.basename.replace('hence-comp-el', answers.compFullname);
      }

      //console.log('file: '+JSON.stringify(file));
      //console.log(filepath.dirname + '/' + filepath.basename);
    }))
    .pipe(conflict(destDir))
    .pipe(gulp.dest(destDir))
    .pipe(gulpif(checkBoolean(answers.install), install()));
}

module.exports = generateTemplate;
