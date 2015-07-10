'use strict';

var gulp = require('gulp');
var execSync = require('child_process').execSync;
require('web-component-tester').gulp.init(gulp);

// Install dependencies.
gulp.task('test:karma', function (done) {
  execSync('karma start', { stdio: 'inherit' });
});
