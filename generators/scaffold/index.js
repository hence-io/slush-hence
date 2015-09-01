// Libraries
var _ = require('lodash');
var path = require('path');

// Utils
var inquisitor = require('glush-util');
var hence = require('hence-util');

// Paths
var cwd = process.cwd();
var tplDir = __dirname + '/template/';


var scaffold = inquisitor.Scaffold({
  steps: [
    require('./scaffold/step-install-options')
  ],
  defaults: {
    dirs: {
      template: {
        root: tplDir,
        common: path.join(tplDir, 'common'),
        optional: path.join(tplDir, 'optional')
      },
      dest: path.join(cwd, 'generators')
    }
  },
  content: {
    intro: hence.ascii.hence(
      inquisitor.colors.bold(" Welcome to the Hence.io Scaffolding Sub-generator. ") + "This installer is designed to" +
      " generate a skeleton scaffold installer for you to build sub-generators from."
    ),
    done: inquisitor.colors.bold(" Thank you for using the Hence.io Scaffolding Tool!\n") +
    " Review the possible gulp commands available to you on the project documentation, or type '" +
    inquisitor.colors.bold('gulp help') + "' at any time."
  },
  cliArg: function (arg) {
    return {
      content: {
        intro: inquisitor.ascii.heading('Scaffold Installation') +
        inquisitor.colors.bold(' Name: ') + arg,
        done: inquisitor.ascii.spacer()
      },
      defaults: {
        scaffoldName: arg
      }
    };
  },
  install: require('./scaffold/install')
});

module.exports = scaffold;
