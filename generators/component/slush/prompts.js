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

var prompts = [
  {
    name: 'compPrefix',
    message: 'Name: "[prefix]-[name]" What would you like to prefix the component with?',
    "default": defaults.compPrefix
  },
  {
    name: 'compName',
    message: 'Name: "[prefix]-[name]" What is the name of your new component?',
    "default": defaults.compName
  }, {
    name: 'compDescription',
    message: 'Details: Describe your new component:',
    "default": defaults.compDescription
  }, {
    name: 'compVersion',
    message: 'Details: Starting version of your project?',
    "default": '0.1.0'
  }, {
    name: 'authorName',
    message: 'Details: What is your name?',
    "default": defaults.authorName
  }, {
    name: 'authorEmail',
    message: 'Details: What is your email?',
    "default": defaults.authorEmail
  }, {
    name: 'githubUser',
    message: 'Git: What is your github username?',
    "default": defaults.githubUser
  }, {
    type: 'confirm',
    name: 'git',
    message: 'Git: Initialize an empty git repo with your details?'
  }, {
    type: 'list',
    name: 'compType',
    message: 'Configuration: "[prefix]-[name]" What type of component do you want to create?',
    choices: _.keys(defaults.compTypes),
    "default": "ui"
  }, {
    type: 'list',
    name: 'cssProcessor',
    message: 'Configuration: Which css preprocessor do you wish to use?',
    choices: _.values(defaults.cssProcessors)
  }, {
    type: 'checkbox',
    name: 'options',
    message: 'Configuration: Select your development options you wish to enabled',
    choices: defaults.options
  }, {
    type: 'list',
    name: 'folderOption',
    message: 'Configuration: Where do you want these files generated?',
    choices: defaults.folderOption
  }, {
    type: 'confirm',
    name: 'install',
    message: 'Configuration: Auto install npm/bower packages?'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Complete: Everything is set, generate this component now?'
  }
];

module.exports = prompts;
