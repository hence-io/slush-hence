var SlushHence = require('../../../common');
var generateTemplate = require('./generateTemplate');
var gulp = require('gulp');
var git = require('gulp-git');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!

var step0 = require('./step-install-options');
var step1 = require('./step-component');
var step2 = require('./step-author');
var step3 = require('./step-project');
var step4 = require('./step-complete');

module.exports = function (done) {
  var componentGenerator = SlushHence.generator({
    done: done,
    complete: function () {
      var answers = global.answers;
      var files = answers.files;

      var destDir = './' + answers.compFullname;

      if (answers.folderOption === step3.options.folderOptionList[1]) {
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
        if (!SlushHence.validation.isTruthy(answers.git)) {
          git.init({cwd: destDir}, function (err) {
          });
        }

        done();
      });
    },
    validation: {
      detailedInstallOnly: function () {
        return global.answers.installOption === step0.options.installOptions.detailed;
      }
    }
  });

  componentGenerator.steps.push(step0.step(componentGenerator));
  componentGenerator.steps.push(step1.step(componentGenerator));
  componentGenerator.steps.push(step2.step(componentGenerator));
  componentGenerator.steps.push(step3.step(componentGenerator));
  componentGenerator.steps.push(step4.step(componentGenerator));

  componentGenerator.start();

};
