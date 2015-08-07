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
var checkBoolean = require('../../../common/validation').isTruthy;

var prompts = require('./prompts');

var processAnswers = require('./processAnswers');
var generateTemplate = require('./generateTemplate');

var headings = require('../../../common/console');

function startInquirer(done) {
  headings.hence(
    " Welcome to the Hence Scaffolding Tool. Your component generation is about to be being. You have to option to\n" +
    " create a component with a quick install, or dive into a detailed installation shoul you desire.",
    true
  );

  inquirer.prompt(prompts,
    function (answers) {
      var files = processAnswers(answers);

      if (!files) {
        headings.aborted(" We're sorry you decided to stop here, but hope to see you again soon!", true);
        return done();
      }

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
