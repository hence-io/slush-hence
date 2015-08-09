var _ = require('lodash');
var path = require('path');
var SlushHence = require('../../../common');

var options = {};

var defaults = (function () {
  var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  }
  else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    githubUser: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || ''
  };
})();

var step = function (generator) {
  return SlushHence.step({
    content: {
      header: "PROJECT AUTHOR"
    },
    prompts: [
      {
        name: 'authorName',
        message: 'Details: What is your name?',
        "default": defaults.authorName,
        when: generator.validation.detailedInstallOnly
      }, {
        name: 'authorEmail',
        message: 'Details: What is your email?',
        "default": defaults.authorEmail,
        when: generator.validation.detailedInstallOnly
      }, {
        name: 'githubUser',
        message: 'Git: What is your github username?',
        "default": defaults.githubUser,
        when: generator.validation.detailedInstallOnly
      }
    ],
    process: function (answers) {
      _.defaults(answers,defaults);
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
