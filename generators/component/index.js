// Plugins
var _ = require('lodash');

// glush-utils
var glush = require('glush-util');
var hence = require('hence-util');

var scaffold = require('./scaffold');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!
var steps = [
  require('./scaffold/step-install-options'),
  require('./scaffold/step-component'),
  require('./scaffold/step-author'),
  require('./scaffold/step-project'),
  require('./scaffold/step-complete')
];

var defaults = {
  installDependencies: !glush.env['ignore-deps'],
  gitInit: !!glush.env.git,
  compPrefix: glush.env.pre || 'hence'
};

// Because glush leverages gulp-util, the .env for cli args is available
// We must always drop the first non-flagged arg, as it's always your generator's name
var cliArgs = _.drop(glush.env._);

module.exports = function (done) {
  // The first _ arg is always the generator name, so only run the multi-install on 2 args passed or more
  // This don't count actual flags set '--falg', just normal args on the cli
  if (cliArgs.length) {
    var installOptions = _.map(cliArgs, function (arg) {
      var splitName = arg.split(':');

      return {
        content: {
          intro: glush.ascii.heading('Component Installation') +
          glush.colors.bold(' Name: ') + defaults.compPrefix + '-' + splitName[0] +
          glush.colors.bold('\n Type: ') + splitName[1],
          done: glush.ascii.spacer()
        },
        defaults: _.extend({
          compName: splitName[0],
          compType: splitName[1]
        }, defaults)
      };
    });

    //console.log('installers', installOptions, glush.env);
    //scaffold._debug = true;
    scaffold.startMultiInstall(steps, installOptions, done);
  }
  else {
    return scaffold.start(steps, {
      defaults: _.extend({}, defaults)
    }, done);
  }
};
