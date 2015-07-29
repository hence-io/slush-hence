/*
 * slush-slush-gen
 * https://github.com/Sean/slush-slush-gen
 *
 * Copyright (c) 2015, Sean Homer
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

var componentTemplates = __dirname + '/generators/component/template/';

global.dirs = {
  component : {
    common: componentTemplates + 'common/',
    type: componentTemplates + 'type/',
    fonts: componentTemplates + 'fonts/',
    optional: componentTemplates + 'optional/'
  }
};

// Run the component generator by default
gulp.task('default', function (done) {
  require('./generators/component/slush/inquirer')(done);
});

gulp.task('component', function (done) {
  require('./generators/component/slush/inquirer')(done);
});
