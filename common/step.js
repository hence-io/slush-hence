var _ = require('lodash');

var step = function (opts) {
  var self = {
    content: _.defaults(opts.content, {
      header: '',
      footer: ''
    }),
    prompts: opts.prompts || [],
    inquire: function (anwsers, callback) {
      if (!callback) {
        callback = anwsers;
        anwsers = {};
      }

      if (self.content.header) {
        console.log(self.content.header);
      }

      inquirer.prompt(self.prompts,
        function (results) {
          _.extend(anwsers, self.process(results));

          if (self.content.footer) {
            console.log(self.content.footer);
          }

          callback(anwsers);
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
