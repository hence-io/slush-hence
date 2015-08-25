// Plugins
var _ = require('lodash');
var glush = require('glush-util');

// scaffold
var scaffold = require('./scaffold');

// steps
// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var steps = [
  require('./scaffold/step-install-options')
];

var defaults = {
  debug: !!glush.env.debug
};

// Because glush leverages gulp-util, the .env for cli args is available
// We must always drop the first non-flagged arg, as it's always your generator's name
// This doesn't count actual flags set '--flag', just normal args on the cli
var cliArgs = _.drop(glush.env._);

module.exports = function (done) {
  if (cliArgs.length) {
    var installOptions = _.map(cliArgs, function (arg) {
      return _.defaultsDeep({
        content: {
          intro: glush.ascii.heading('Scaffold Installation') +
          glush.colors.bold(' Name: ') + arg,
          done: glush.ascii.spacer()
        },
        defaults: {
          scaffoldName: arg
        }
      }, defaults);
    });

    scaffold.startMultiInstall(steps, installOptions, done);
  }
  else {
    scaffold.start(steps, _.defaultsDeep({
      //
    }, defaults), done);
  }
};
