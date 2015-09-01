var _ = require('lodash');
var inquisitor = require('hence-inquisitor');
var path = require('path');
var S = require('string');

var options = {
};

var defaults = {
  scaffoldName: ''
};

var step = inquisitor.ScaffoldStep({
  options: options,
  defaults: defaults,
  prompts: [
    {
      name: 'scaffoldName',
      message: 'What is the name of your new scaffolding installer?',
      validate: inquisitor.inquirer.validatePrompt('isNull', 'You must enter a value.', true)
    }
  ],
  process: function(answers,next){
    answers.files.push(answers.dirs.template.root + '**');
    answers.dirs.dest = path.join(answers.dirs.dest, S(answers.scaffoldName).slugify().s);

    next();
  }
});

module.exports = step;
