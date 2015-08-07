var _ = require('lodash');
var SlushHence = require('../../../common');

var options = {
  installOptions: {
    quick: 'Quick',
    detailed: 'Detailed'
  }
};

var defaults = {
  installOption: options.installOptions.quick
};

var step = function (generator) {
  SlushHence.step({
    content: {
      header: SlushHence.console.hence(
        " Welcome to the Hence Scaffolding Tool. Your component generation is about to be being. You have to option to\n" +
        " create a component with a quick install, or dive into a detailed installation shoul you desire."
      )
    },
    prompts: [
      {
        type: 'list',
        name: 'installOption',
        message: 'Quick set up or detailed?',
        choices: _.values(options.installOptions),
        "default": defaults.installOptions
      }
    ],
    process: function (results) {
      return results;
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
