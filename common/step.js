var _ = require('lodash');
var inquirer = require('inquirer');

var step = function (opts) {
  var self = {
    content: _.defaults(opts.content, {
      header: '',
      footer: ''
    }),
    prompts: opts.prompts || [],
    inquire: function (answers, callback) {
      if (arguments.length === 1) { // first run the callback is the only parameter
        callback = arguments[0];
        answers = {}; // make sure we initialize the answer object
      }

      if (self.content.header) {
        console.log(self.content.header);
      }

      inquirer.prompt(self.prompts,
        function (results) {
          _.extend(answers, results);
          self.process(answers);

          if (self.content.footer) {
            console.log(self.content.footer);
          }

          //console.log('answers currently ',answers);

          global.answers = answers;

          callback(null, answers);
        }
      );
    },
    process: opts.process || function (results) {
      return results;
    }
  };

  return self;
};

module.exports = step;
