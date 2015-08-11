var _ = require('lodash');
var glush = require('glush-util');

var options = {
  installOptions: {
    quick: 'Quick',
    detailed: 'Detailed'
  }
};

var defaults = {
  installOption: options.installOptions.quick
};

var step = glush.step({
  options: options,
  defaults: defaults,
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
  }
});

module.exports = step;
