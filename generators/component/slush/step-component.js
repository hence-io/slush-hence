var _ = require('lodash');
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
  SlushHence.step({
    content: {
      header: SlushHence.console.hence(
        " Welcome to the Hence Scaffolding Tool. Your component generation is about to be being. You have to option to\n" +
        " create a component with a quick install, or dive into a detailed installation shoul you desire."
      )
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
    process: function (results) {
      _.defaults(results, defaults);
      var files = results.files || [];
      var npm = results.dependencies.npm;
      var bower = results.dependencies.bower;

      results.compNameSlug = S(results.compName).slugify().s;

      results.compFullname = [results.compPrefix, results.compNameSlug].join('-');
      results.compNameCamel = S(results.compFullname).camelize().s;
      results.compNameCamel = results.compNameCamel[0].toUpperCase() + results.compNameCamel.slice(1); // Can't use .capitalize() as it will lowercase the camel humps
      results.compName = results.compFullname;

      files.push(global.dirs.component.common + '**');
      files.push(global.dirs.component.type + results.compType + '/**');

      switch (results.compType) {
        case options.compTypes.schema:
          _.extend(npm.devDependencies, {
            "schemas": "^1.0.0",
          });
          break;
        case options.compTypes.model:
          _.extend(bower.dependencies, {});
          break;
        case options.compTypes.ui:
          _.extend(bower.dependencies, {});
          break;
      }

      results.files = files;

      return results;
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
