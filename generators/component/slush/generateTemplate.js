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

var sutils = require('slush-util');
var isTruthy = sutils.validation.isTruthy;

function generateTemplate(answers, destDir) {
  return gulp.src(answers.files)
    .pipe(template(_.omit(answers, 'files     '), {
      interpolate: /<%=(.+?)%>/g
    }))
    .pipe(rename(function (filepath) {
      if (filepath.dirname[0] === '_') {
        filepath.dirname = '.' + filepath.dirname.slice(1);
      }

      if (filepath.basename[0] === '_') {
        filepath.basename = '.' + filepath.basename.slice(1);
      } else if (filepath.basename.indexOf('hence-el') !== -1) {
        filepath.basename = filepath.basename.replace('hence-el', answers.compFullname);
      }

      //console.log('file: '+JSON.stringify(file));
      //console.log(filepath.dirname + '/' + filepath.basename);
    }))
    .pipe(conflict(destDir))
    .pipe(gulp.dest(destDir))
    .pipe(gulpif(isTruthy(answers.install), install()))
    .on('end', function () {
      if (!isTruthy(answers.git)) {
        git.init({cwd: destDir}, function (err) {
        });
      }

      console.log(sutils.ascii.done(" Thank you for using the Hence.io component scaffolding. Review the possible\n" +
        " gulp commands available to you on the project documentation, or type 'gulp help' at any time for the\n " +
        "list" +
        " of commands."));

    });
}

module.exports = generateTemplate;
