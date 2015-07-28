'use strict';

import gulp from 'gulp';
import {execSync} from 'child_process';
import {test as webComponentTester} from 'web-component-tester';
import util from 'gulp-util';

/***********************************************************************************************************************
 * Karma Unit Testing
 **********************************************************************************************************************/
gulp.task('test:karma', function () {
  execSync('npm run test', {stdio: 'inherit'});
});

gulp.task('test:karma-watch', function () {
  execSync('npm run test:watch', {stdio: 'inherit'});
});

/***********************************************************************************************************************
 * Web Component Testing
 **********************************************************************************************************************/
  // Re-purposed tasks from the web-component-test library; required to build the component in it's final form for wct testing
gulp.task('test', ['wct:local'],function(done){
  gulp.watch([global.paths.js,global.paths.sass,global.paths.html,global.paths.testBehaviour], ['wct:local']);
});

gulp.task('wct:local', ['build'], function (done) {
  webComponentTester({plugins: {local: {}, sauce: false}}, cleanDone(done));
});

gulp.task('wct:sauce', ['build'], function (done) {
  webComponentTester({plugins: {local: false, sauce: {}}}, cleanDone(done));
});

// Slightly modified from wct's usage, using gulp-utils vs chalk, and reducing the error to the final count vs garble.
function cleanDone(done) {
  return function (error) {
    if (error) {
      // Pretty error for gulp.
      var result = JSON.stringify(error || '') || error;
      error = new Error(util.colors.red('Error:' + result.slice(result.lastIndexOf(',') + 1)));
      error.showStack = false;
    }
    done(error);
  };
}
