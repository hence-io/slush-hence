// Plugins
var _ = require('lodash');
var glush = require('glush-util');

// scaffold
var scaffold = require('./scaffold');

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

    scaffold.startMultiInstall(installOptions, done);
  }
  else {
    scaffold.start(_.defaultsDeep({
      //
    }, defaults), done);
  }
};
