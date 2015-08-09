var _ = require('lodash');
var SlushHence = require('../../../common');
var dependencies = require('./dependencies.json');

var options = {
};

var defaults = {
};

var step = function (generator) {
  return SlushHence.step({
    content: {
      header: "READY TO INSTALL"
    },
    prompts: [
      {
        type: 'confirm',
        name: 'start',
        message: 'Complete: Everything is set, generate this component now?'
      }
    ],
    process: function (answers) {
      _.defaults(answers,defaults);
      var npm = answers.dependencies.npm;
      var bower = answers.dependencies.bower;

      if (!SlushHence.validation.isTruthy(answers.start)) {
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
