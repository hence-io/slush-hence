/*
 * slush-slush-gen
 * https://github.com/Sean/slush-slush-gen
 *
 * Copyright (c) 2015, Sean Homer
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

var componentScaffold = function (done) {
  require('./generators/component')(done);
};

// Run the component generator by default
gulp.task('default', componentScaffold);
gulp.task('component', componentScaffold);
