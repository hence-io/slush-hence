/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
'use strict';

var gulp = require('gulp');

var componentScaffold = require('./generators/component');

// Run the component generator by default
gulp.task('default', componentScaffold);
gulp.task('component', componentScaffold);
