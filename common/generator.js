var _ = require('lodash');
var async = require('async');
var ascii = require('./ascii');
var validation = require('./validation');

var generator = function (opts) {
  var self = {
    steps: opts.steps || [],
    answers: _.defaults(opts.answers || {}, {
      aborted: false
    }),
    validation: _.defaults(opts.validation || {}, validation),
    start: function () {
      // pull the inquire functions together from the various steps, and remove any undefines
      var questions = _.chain(self.steps)
        .map('inquire')
        .compact()
        .value();

      async.waterfall(questions, function (err, answers) {
        _.extend(self.answers, answers);
        //console.log('final answers', answers);
        self.complete();
      });
    },
    complete: function () {
      if (self.answers.aborted) {
        ascii.aborted(" We're sorry you decided to stop here, but hope to see you again soon!", true);
        opts.done();
      } else if (_.isFunction(opts.complete)) {
        opts.complete();
      } else {
        ascii.done(" Looks like you're all done here!", true);
        opts.done();
      }
    }
  };

  return self;
};

module.exports = generator;
