var _ = require('lodash');
var inquirer = require('inquirer');
var sutils = require('slush-util');

var projectConfigOptions = {
  'eslint': 'eslint',
  'esdoc': 'es/js docs',
  'scsslint': 'scsslint',
  'sassdocs': 'sassdocs',
  'kss': 'kss style guide',
  'karma': 'karma unit testing',
  'wct': 'wct component testing',
  'editorconfig': 'include editorconfig'
};

var options = {
  cssProcessors: {compass: 'Sass (Compass)', libSass: 'Sass (lib-sass)'},
  optionList: [
    {name: projectConfigOptions.eslint, checked: true},
    {name: projectConfigOptions.esdoc, checked: true},
    new inquirer.Separator(),
    {name: projectConfigOptions.scsslint, checked: true},
    {name: projectConfigOptions.sassdocs, checked: true},
    {name: projectConfigOptions.kss, checked: true},
    new inquirer.Separator(),
    {name: projectConfigOptions.karma, checked: true},
    {name: projectConfigOptions.wct, checked: true},
    new inquirer.Separator(),
    {name: projectConfigOptions.editorconfig, checked: true}
  ],
  folderOptionList: ['Make a subfolder for it', 'Generate it in the current folder']
};

var defaults = {
  cssProcessor: options.cssProcessors.compass,
  options: _.values(projectConfigOptions),
  folderOption: options.folderOptionList[0]
};

var step = function (generator) {
  return sutils.step({
    content: {
      header: {
        title: "Project Details",
        details: "Select the options and configuration you desire to have applied to your new package."
      }
    },
    prompts: [
      {
        type: 'confirm',
        name: 'git',
        message: 'Initialize an empty git repo with your details?',
        when: generator.validation.detailedInstallOnly
      }, {
        type: 'list',
        name: 'cssProcessor',
        message: ' Which css preprocessor do you wish to use?',
        choices: _.values(options.cssProcessors),
        when: generator.validation.detailedInstallOnly
      }, {
        type: 'checkbox',
        name: 'options',
        message: 'Select your development options you wish to enabled',
        choices: options.optionList,
        when: generator.validation.detailedInstallOnly
      }, {
        type: 'list',
        name: 'folderOption',
        message: ' Where do you want these files generated?',
        choices: options.folderOptionList,
        when: generator.validation.detailedInstallOnly
      }, {
        type: 'confirm',
        name: 'install',
        message: ' Auto install npm/bower packages?',
        when: generator.validation.detailedInstallOnly
      }
    ],
    process: function (answers) {
      _.defaults(answers, defaults);
      var files = answers.files || [];
      var npm = answers.dependencies.npm;
      var bower = answers.dependencies.bower;

      if (!sutils.validation.isTruthy(answers.git)) {
        files.push("!" + global.dirs.component.common + '_git/**/*');
      }

      switch (answers.cssProcessor) {
        case options.cssProcessors.compass:
          _.extend(npm.devDependencies, {
            "gulp-compass": "^2.1.0"
          });
          answers.cssProcessor = 'compass';
          break;
        case options.cssProcessors.libSass:
          _.extend(npm.devDependencies, {
            "gulp-sass": "^2.0.1"
          });
          answers.cssProcessor = 'libSass';
          break;
      }

      (answers.options || []).forEach(function (opt) {
        switch (opt) {
          case projectConfigOptions.eslint:
            files.push(global.dirs.component.optional + '_eslintrc');
            files.push(global.dirs.component.optional + '_eslintignore');
            _.extend(npm.devDependencies, {
              "babel-eslint": "^3.1.23",
              "eslint": "^0.24.0",
              "gulp-eslint": "^0.13.2"
            });
            break;
          case projectConfigOptions.esdoc:
            files.push(global.dirs.component.optional + '_esdoc.json');
            files.push(global.dirs.component.optional + '_jsdoc.json');
            _.extend(npm.devDependencies, {
              "esdoc": "^0.1.2",
              "jsdoc": "^3.3.2",
              "minami": "^1.1.0"
            });
            break;
          case projectConfigOptions.scsslint:
            files.push(global.dirs.component.optional + '_scss-lint.yml');
            _.extend(npm.devDependencies, {
              "gulp-scss-lint": "^0.2.0"
            });
            break;
          case projectConfigOptions.sassdocs:
            files.push(global.dirs.component.optional + '_sassdocrc');
            _.extend(npm.devDependencies, {
              "sassdoc": "^2.1.15"
            });
            break;
          case projectConfigOptions.kss:
            files.push(global.dirs.component.optional + '_sassdocrc');
            _.extend(npm.devDependencies, {
              "sc5-styleguide": "git://github.com/hence-io/sc5-styleguide"
              //"sc5-styleguide": "^0.3.27"
            });
            break;
          case projectConfigOptions.karma:
            files.push(global.dirs.component.optional + 'karma.conf.js');
            _.extend(npm.devDependencies, {
              "chai": "^3.0.0",
              "chai-as-promised": "^5.1.0",
              "karma": "^0.12.36",
              "karma-babel-preprocessor": "^5.2.1",
              "karma-browserify": "^4.2.1",
              "karma-chai": "^0.1.0",
              "karma-chai-as-promised": "^0.1.2",
              "karma-chrome-launcher": "^0.1.12",
              "karma-firefox-launcher": "^0.1.6",
              "karma-mocha": "^0.1.10",
              "karma-mocha-reporter": "^1.0.2",
              "karma-sinon-chai": "^1.0.0",
              "mocha": "^2.2.5",
              "proxyquireify": "^2.1.0",
              "watchify": "^3.2.3"
            });
            break;
          case projectConfigOptions.wct:
            files.push(global.dirs.component.optional + 'wct.conf.js');
            _.extend(npm.devDependencies, {
              "web-component-tester": "^3.2.0"
            });
            break;
          case projectConfigOptions.editorconfig:
            files.push(global.dirs.component.optional + '_editorconfig');
            break;
        }
      });
    }
  });
};

module.exports = {
  options: options,
  defaults: defaults,
  step: step
};
