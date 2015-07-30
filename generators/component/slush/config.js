var _ = require('lodash');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var git = require('gulp-git');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var S = require('string');
var inquirer = require('inquirer');
var path = require('path');

function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var checkBoolean = function (v) {
  var isTrue = v === true || v === "true" || v === "y" || v === "yes" || v === "Y" || v === "Yes" ? true : false;
  v = isTrue;
  return v;
};

var options = {
  'eslint': 'eslint',
  'esdoc': 'es/js docs',
  'scsslint': 'scsslint',
  'sassdocs': 'sassdocs',
  'kss': 'kss style guide',
  'karma': 'karma unit testing',
  'wct': 'wct component testing',
  'editorconfig': 'include editorconfig'
};

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
    currentDir: workingDirName,
    compPrefix: 'hence-comp',
    compName: 'sample',
    githubUser: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || '',
    compTypes: {schema: 'schema', model: 'model', ui: 'ui', service: 'service'},
    compDescription: 'An element providing a starting point for your own reusable Polymer elements.',
    cssProcessors: {compass: 'Sass (Compass)', libSass: 'Sass (lib-sass)'},
    options: [
      {name: options.eslint, checked: true},
      {name: options.esdoc, checked: true},
      new inquirer.Separator(),
      {name: options.scsslint, checked: true},
      {name: options.sassdocs, checked: true},
      {name: options.kss, checked: true},
      new inquirer.Separator(),
      {name: options.karma, checked: true},
      {name: options.wct, checked: true},
      new inquirer.Separator(),
      {name: options.editorconfig, checked: true}
    ],
    folderOption: ['Make a subfolder "[prefix]-[type]-[name]" for it', 'Create it the current folder']
  };
})();

module.exports = {
  defaults: defaults,
  options:options,
  checkBoolean:checkBoolean
};