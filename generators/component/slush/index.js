// Plugins
var sutils = require('slush-util');
var generateTemplate = require('./generateTemplate');
var gulp = require('gulp');
var conflict = require('gulp-conflict');

// Define the common directories for this generator
var componentTemplates = __dirname + '/../template/';

global.dirs = {
  component: {
    common: componentTemplates + 'common/',
    type: componentTemplates + 'type/',
    fonts: componentTemplates + 'fonts/',
    optional: componentTemplates + 'optional/'
  }
};

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var step0 = require('./step-install-options');
var step1 = require('./step-component');
var step2 = require('./step-author');
var step3 = require('./step-project');
var step4 = require('./step-complete');


module.exports = function (done) {
  var componentGenerator = sutils.generator({
    done: done,
    complete: function () {
      var answers = global.answers;
      var destDir = answers.folderOption === step3.options.folderOptionList[1] ? './' : './' + answers.compFullname + '/';

      //console.log('Installing package with: ', answers.files);
      //console.log('Installing package to: ', destDir);

      // Due to the nature of font files, or any other future files that must not be parsed by the template
      // controls, they have to handled separately
      var fontDir = destDir + 'fonts';
      gulp.src(global.dirs.component.fonts + '**')
        .pipe(conflict(fontDir))
        .pipe(gulp.dest(fontDir));

      generateTemplate(answers, destDir);
    },
    validation: {
      detailedInstallOnly: function () {
        return global.answers.installOption === step0.options.installOptions.detailed;
      }
    }
  });

  componentGenerator.addStep(step0.step);
  componentGenerator.addStep(step1.step);
  componentGenerator.addStep(step2.step);
  componentGenerator.addStep(step3.step);
  componentGenerator.addStep(step4.step);

  componentGenerator.start();

};
