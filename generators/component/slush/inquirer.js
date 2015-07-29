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
var checkBoolean = require('./config').checkBoolean;

var prompts = require('./prompts');

var processAnswers = require('./processAnswers');
var generateTemplate = require('./generateTemplate');

function startInquirer(done) {
  inquirer.prompt(prompts,
    function (answers) {
      var files = processAnswers(answers);

      var destDir = './' + answers.compFullname;

      if (answers.folderOption === defaults.folderOption[1]) {
        destDir = './';
      }

      console.log('generateTemplate in', destDir, files);
      var pipe = generateTemplate(files, answers, destDir);

      var fontDir = destDir + '/fonts';
      gulp.src(global.dirs.component.fonts + '**')
        //.pipe(conflict(fontDir))
        .pipe(gulp.dest(fontDir))
        .on('end', function () {
        });

      // Due to the nature of file files, or any other future files that must not be parsed by the template
      // controls, they have to be included after the fact.
      pipe.on('end', function () {
        if (!checkBoolean(answers.git)) {
          git.init({cwd: destDir}, function (err) {
          });
        }
      });
    });
}

module.exports = startInquirer;
