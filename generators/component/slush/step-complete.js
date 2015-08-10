var _ = require('lodash');
var sutils = require('slush-util');
var dependencies = require('./dependencies.json');

var options = {};

var defaults = {};

var step = function (generator) {
  return sutils.step({
    content: {
      header: {
        title: 'Installation Ready',
        details: sutils.chalk.bold("You've finished providing all of your installation details. ") +
        " We're ready to configure and install your package."
      }
    },
    prompts: [
      {
        type: 'confirm',
        name: 'start',
        message: 'Everything is set, proceed to install your package now?'
      }
    ],
    process: function (answers) {
      _.defaults(answers, defaults);
      var npm = answers.dependencies.npm;
      var bower = answers.dependencies.bower;

      if (!sutils.validation.isTruthy(answers.start)) {
        answers.aborted = true;
      }

      answers.npmDevDependencies = JSON.stringify(npm.devDependencies);
      answers.npmDependencies = JSON.stringify(npm.dependencies);
      answers.bowerDependencies = JSON.stringify(bower.dependencies);
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
