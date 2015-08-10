var _ = require('lodash');
var sutils = require('slush-util');
var dependencies = require('./dependencies.json');

var options = {
  installOptions: {
    quick: 'Quick',
    detailed: 'Detailed'
  }
};

var defaults = {
  dependencies: dependencies,
  installOption: options.installOptions.quick
};

var step = function (generator) {
  return sutils.step({
    content: {
      header: sutils.ascii.hence(
        sutils.chalk.bold(" Welcome to the Hence Scaffolding Tool. ") + "Your component generation is about to be being. You have to option to\n" +
        " create a component with a quick install, or dive into a detailed installation shoul you desire."
      )
    },
    prompts: [
      {
        type: 'list',
        name: 'installOption',
        message: 'Preform a quick set up, or detailed?',
        choices: _.values(options.installOptions),
        "default": defaults.installOptions
      }
    ],
    process: function (answers) {
      _.defaults(answers, defaults);
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
