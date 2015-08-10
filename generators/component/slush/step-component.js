var _ = require('lodash');
var S = require('string');
var sutils = require('slush-util');

var options = {
  compTypes: {
    schema: 'schema',
    model: 'model',
    ui: 'ui'
  }
};

var defaults = {
  compPrefix: 'hence',
  compName: 'demo',
  compType: options.compTypes.ui,
  compDescription: '',
  compVersion: '0.1.0'
};

var step = function (generator) {
  return sutils.step({
    content: {
      header: {
        title: "Component Definition",
        details: "The following questions will help you to identify, define and describe your component. Your component will\n" +
        " be named using the convention " + sutils.chalk.dim("[namespace]-[name]") + "."
      }
    },
    prompts: [
      {
        name: 'compPrefix',
        message: '[namespace] What is your component namespace or project name? ',
        "default": defaults.compPrefix,
        validate: sutils.validation.promptNotBlank
      },
      {
        name: 'compName',
        message: '[name] What do you want to name your new component?',
        "default": defaults.compName,
        validate: sutils.validation.promptNotBlank
      }, {
        type: 'list',
        name: 'compType',
        message: "Select your new component's type from below. " +
        sutils.chalk.reset.dim('\n  See project documentation to for more information on Hence component types.'),
        choices: _.keys(options.compTypes),
        "default": defaults.compType
      }, {
        name: 'compDescription',
        message: 'Describe your new component:',
        "default": defaults.compDescription,
        when: generator.validation.detailedInstallOnly
      }, {
        name: 'compVersion',
        message: 'Starting version of your project?',
        "default": defaults.compVersion,
        when: generator.validation.detailedInstallOnly
      }
    ],
    process: function (answers) {
      _.defaults(answers, defaults);
      var files = answers.files || [];
      var npm = answers.dependencies.npm;
      var bower = answers.dependencies.bower;

      answers.compNameSlug = S(answers.compName).slugify().s;

      answers.compFullname = [answers.compPrefix, answers.compNameSlug].join('-');
      answers.compNameCamel = S(answers.compFullname).camelize().s;
      answers.compNameCamel = answers.compNameCamel[0].toUpperCase() + answers.compNameCamel.slice(1); // Can't use .capitalize() as it will lowercase the camel humps
      answers.compName = answers.compFullname;

      files.push(global.dirs.component.common + '**');
      files.push(global.dirs.component.type + answers.compType + '/**');

      switch (answers.compType) {
        case options.compTypes.schema:
          _.extend(npm.devDependencies, {
            "schemas": "^1.0.0"
          });
          break;
        case options.compTypes.model:
          _.extend(bower.dependencies, {});
          break;
        case options.compTypes.ui:
          _.extend(bower.dependencies, {});
          break;
      }

      answers.files = files;
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
