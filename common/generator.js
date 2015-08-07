var _ = require('lodash');
var async = require('async');
var console = require('./console');
var validation = require('./validation');

var generator = function (opts) {
  var self = {
    steps: opts.steps || [],
    answers: _.defaults(opts.answers || {}, {
      aborted: false
    }),
    validation: _.defaults(opts.validation || {}, validation),
    start: function () {
      async.waterfall(_.pluck(self.steps, 'inquire'), function (err, anwsers) {
        _.extend(self.answers, anwsers);
        self.complete();
      });
    },
    complete: function () {
      if (self.answers.aborted) {
        headings.aborted(" We're sorry you decided to stop here, but hope to see you again soon!", true);
      }

      if (_.isFunction(opts.complete)) {
        opts.complete();
      } else {
        headings.done(" Looks like you're all done here!", true);
      }
    }
  };

  return self;
};

module.exports = generator;
