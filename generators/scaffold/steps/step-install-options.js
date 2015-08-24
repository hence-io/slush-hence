var _ = require('lodash');
var glush = require('glush-util');
var path = require('path');

var options = {
};

var defaults = {
  scaffoldName: ''
};

var step = glush.ScaffoldStep({
  options: options,
  defaults: defaults,
  prompts: [
    {
      name: 'scaffoldName',
      message: 'What is the name of your new scaffolding installer?',
      validate: glush.inquirer.validatePrompt('isNull', 'You must enter a value.', true)
    }
  ],
  process: function(answers,next){
    answers.files.push(answers.dirs.template.root + '*');
    answers.dirs.dest = path.join(answers.dirs.dest, answers.scaffoldName);

    next();
  }
});

module.exports = step;
