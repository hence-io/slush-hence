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

var defaults = require('./config').defaults;
var installOption = require('./config').installOption;

function validatePrompt(input) {

  // Declare function as asynchronous, and save the done callback
  var done = this.async();

  // Do async stuff
  setTimeout(function () {
    if (!input.length) {
      // Pass the return value in the done callback
      done("You need to provide name");
      return;
    }
    // Pass the return value in the done callback
    done(true);
  }, 100);
}

function detailedInstallOnly(answer) {
  return answer.installOption === installOption.detailed;
}

var prompts = [
  {
    type: 'list',
    name: 'compType',
    message: 'Quick set up or detailed?',
    choices: _.values(installOption),
    "default": installOption.quick
  }, {
    name: 'compPrefix',
    message: 'Name: "[prefix]-[name]" What would you like to prefix the component with?',
    "default": defaults.compPrefix
  },
  {
    name: 'compName',
    message: 'Name: "[prefix]-[name]" What is the name of your new component?',
    "default": defaults.compName
  }, {
    type: 'list',
    name: 'compType',
    message: 'Details: What type of component do you want to create?',
    choices: _.keys(defaults.compTypes),
    "default": "ui"
  }, {
    name: 'compDescription',
    message: 'Details: Describe your new component:',
    "default": defaults.compDescription,
    when: detailedInstallOnly
  }, {
    name: 'compVersion',
    message: 'Details: Starting version of your project?',
    "default": '0.1.0',
    when: detailedInstallOnly
  }, {
    name: 'authorName',
    message: 'Details: What is your name?',
    "default": defaults.authorName,
    when: detailedInstallOnly
  }, {
    name: 'authorEmail',
    message: 'Details: What is your email?',
    "default": defaults.authorEmail,
    when: detailedInstallOnly
  }, {
    name: 'githubUser',
    message: 'Git: What is your github username?',
    "default": defaults.githubUser,
    when: detailedInstallOnly
  }, {
    type: 'confirm',
    name: 'git',
    message: 'Git: Initialize an empty git repo with your details?',
    when: detailedInstallOnly
  }, {
    type: 'list',
    name: 'cssProcessor',
    message: 'Configuration: Which css preprocessor do you wish to use?',
    choices: _.values(defaults.cssProcessors),
    when: detailedInstallOnly
  }, {
    type: 'checkbox',
    name: 'options',
    message: 'Configuration: Select your development options you wish to enabled',
    choices: defaults.options,
    when: detailedInstallOnly
  }, {
    type: 'list',
    name: 'folderOption',
    message: 'Configuration: Where do you want these files generated?',
    choices: defaults.folderOption,
    when: detailedInstallOnly
  }, {
    type: 'confirm',
    name: 'install',
    message: 'Configuration: Auto install npm/bower packages?',
    when: detailedInstallOnly
  }, {
    type: 'confirm',
    name: 'start',
    message: 'Complete: Everything is set, generate this component now?'
  }
];

module.exports = prompts;
