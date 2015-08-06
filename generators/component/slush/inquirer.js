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
  console.log(">\n" +
    ">  _   _ _____ _   _  ____ _____   _\n" +
    "> | | | | ____| \\ | |/ ___| ____| (_) ___\n" +
    "> | |_| |  _| |  \\| | |   |  _|   | |/ _ \\\n" +
    "> |  _  | |___| |\\  | |___| |___ _| | (_) |\n" +
    "> |_| |_|_____|_| \\_|\\____|_____(_)_|\\___/\n" +
    "> \n" +
    "> Welcome to the Hence Scaffolding Tool. Your component generation is about to be being. You have to option to\n" +
    "> create a component with a quick install, or dive into a detailed installation shoul you desire.\n" +
    ">"
  );

  inquirer.prompt(prompts,
    function (answers) {
      var files = processAnswers(answers);

      if (!files) {
        console.log(">\n" +
          ">    _   ____  _____ _____ _____ _____ ____ \n" +
          ">   / \\ |  _ \\|  _  |  _  |_   _| ____|  _ \\ \n" +
          ">  / _ \\| |_| | | | | |_| / | | |  _| | | | |  \n" +
          "> | |_| | |_| | |_| |  _ \\  | | | |___| |_| |    \n" +
          "> |_| |_|____/|_____|_| \\_\\ |_| |_____|____/      \n" +
          "> \n" +
          ">                ¯\\_(ツ)_/¯¯\n" +
          "> \n" +
          "> We're sorry you decided to stop here, but hope to see you again soon!\n" +
          ">");
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
