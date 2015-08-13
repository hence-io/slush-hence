var _ = require('lodash');
var glush = require('glush-util');

var projectConfigOptions = {
  'eslint': 'eslint - Providing ES6 JS linting as part of the dev/build process',
  'esdoc': 'es/js docs -  Allows generating documentation from you JS comments',
  'scsslint': 'scsslint - Providing SCSS linting as part of the dev/build process',
  //'sassdocs': 'sassdocs -  Allows generating documentation from you SCSS comments',
  'kss': 'kss style guide - Allows generating a KSS style guide as part of the build process',
  'karma': 'karma unit testing - Provides access to ES6 JS unit testing',
  'wct': 'wct component testing - Provides access to Web Component Test (WCT) behavioural testing',
  'editorconfig': 'include editorconfig - Standardizes your projects IDE settings'
};

var options = {
  folderOptionList: {
    subFolder: 'Make a subfolder for it',
    newFolder: 'Generate it in the current folder'
  },
  cssProcessors: {
    compass: 'Sass (Compass)',
    libSass: 'Sass (lib-sass)'
  },
  optionList: [
    {name: projectConfigOptions.eslint, checked: true},
    {name: projectConfigOptions.esdoc, checked: true},
    glush.inquirer.separator,
    {name: projectConfigOptions.scsslint, checked: true},
    //{name: projectConfigOptions.sassdocs, checked: true},
    {name: projectConfigOptions.kss, checked: true},
    glush.inquirer.separator,
    {name: projectConfigOptions.karma, checked: true},
    {name: projectConfigOptions.wct, checked: true},
    glush.inquirer.separator,
    {name: projectConfigOptions.editorconfig, checked: true}
  ]
};

var defaults = {
  git: true,
  folderOption: options.folderOptionList.subFolder,
  cssProcessor: options.cssProcessors.compass,
  options: _.values(projectConfigOptions),
  installDependencies: true
};

var step = glush.ScaffoldStep({
  options: options,
  defaults: defaults,
  content: {
    header: {
      title: "Project Details",
      details: "Select the options and configuration you desire to have applied to your new package."
    }
  },
  prompts: [
    {
      type: 'list',
      name: 'folderOption',
      message: 'Where do you want your package generated?',
      choices: _.values(options.folderOptionList),
      when: function () { return step.scaffold.inquirer.detailedInstallOnly(); }
    }, {
      type: 'confirm',
      name: 'git',
      message: 'Initialize an empty git repo with your author details?',
      "default": defaults.git,
      when: function () { return step.scaffold.inquirer.detailedInstallOnly(); }
    }, {
      type: 'list',
      name: 'cssProcessor',
      message: 'Which css preprocessor do you wish to use?',
      choices: _.values(options.cssProcessors),
      when: function () { return step.scaffold.inquirer.detailedInstallOnly(); }
    }, {
      type: 'checkbox',
      name: 'options',
      message: 'Select your development options you wish to enabled',
      choices: options.optionList,
      when: function () { return step.scaffold.inquirer.detailedInstallOnly(); }
    }, {
      type: 'confirm',
      name: 'installDependencies',
      message: 'Auto install npm & bower packages after your package is generated?',
      "default": defaults.installDependencies,
      when: function () { return step.scaffold.inquirer.detailedInstallOnly(); }
    }
  ],
  process: function (answers) {
    // files
    var files = answers.files;
    // dependencies
    var npm = answers.dependencies.npm;
    var bower = answers.dependencies.bower;
    // dirs
    var templateDir = answers.dirs.template;
    var optionalDir = templateDir.optional;

    // Did the user select to use a subfolder? If so, revise the package's dest dir
    if (answers.folderOption === options.folderOptionList.subFolder) {
      answers.dirs.dest = './' + answers.compName + '/';
      //console.log('answers.folderOption',answers.folderOption, answers.destDir);
    }

    // If the user does not want a git repo included, exclude it form the common folder files
    if (!answers.git) {
      files.push("!" + templateDir.common + '_git/**/*');
    }

    // Determine what css processor is being used, and assign it's needed dependencies
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

    // Process each of the project options, and assign their files/dependencies as needed
    answers.options.forEach(function (opt) {
      switch (opt) {
        case projectConfigOptions.eslint:
          files.push(optionalDir + '_eslintrc');
          files.push(optionalDir + '_eslintignore');
          _.extend(npm.devDependencies, {
            "babel-eslint": "^3.1.23",
            "eslint": "^0.24.0",
            "gulp-eslint": "^0.13.2"
          });
          break;
        case projectConfigOptions.esdoc:
          files.push(optionalDir + '_esdoc.json');
          files.push(optionalDir + '_jsdoc.json');
          _.extend(npm.devDependencies, {
            "esdoc": "^0.1.2",
            "jsdoc": "^3.3.2",
            "minami": "^1.1.0"
          });
          break;
        case projectConfigOptions.scsslint:
          files.push(optionalDir + '_scss-lint.yml');
          _.extend(npm.devDependencies, {
            "gulp-scss-lint": "^0.2.0"
          });
          break;
        case projectConfigOptions.sassdocs:
          files.push(optionalDir + '_sassdocrc');
          _.extend(npm.devDependencies, {
            "sassdoc": "^2.1.15"
          });
          break;
        case projectConfigOptions.kss:
          files.push(optionalDir + '_sassdocrc');
          _.extend(npm.devDependencies, {
            //"sc5-styleguide": "git://github.com/hence-io/sc5-styleguide"
            "sc5-styleguide": "^0.3.27"
          });
          break;
        case projectConfigOptions.karma:
          files.push(optionalDir + 'karma.conf.js');
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
          files.push(optionalDir + 'wct.conf.js');
          _.extend(npm.devDependencies, {
            "web-component-tester": "^3.2.0"
          });
          break;
        case projectConfigOptions.editorconfig:
          files.push(optionalDir + '_editorconfig');
          break;
      }
    });
  }
});

module.exports = step;