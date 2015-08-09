var _ = require('lodash');
var S = require('string');
var SlushHence = require('../../../common');

var options = {
  compTypes: {
    schema: 'schema',
    model: 'model',
    ui: 'ui'
  }
};

var defaults = {
  compPrefix: 'hence',
  compName: 'sample',
  compType: options.compTypes.ui,
  compDescription: 'An element providing a starting point for your own reusable Polymer elements.',
  compVersion: '0.1.0'
};

var step = function (generator) {
  return SlushHence.step({
    content: {
      header: "COMPONENT DEFINITION: Identify your component"
    },
    prompts: [
      {
        name: 'compPrefix',
        message: 'What would you like to [prefix] the component with?',
        "default": defaults.compPrefix
      },
      {
        name: 'compName',
        message: 'What is the [name] of your new component?',
        "default": defaults.compName
      }, {
        type: 'list',
        name: 'compType',
        message: 'What type of component do you want to create?',
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
      _.defaults(answers,defaults);
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
