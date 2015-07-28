'use strict';

import gulp  from 'gulp';
import util from 'gulp-util';

gulp.task('help', ()=> {
  util.log(util.colors.green('Hench-comp-stack Gulp Commands'));
  util.log(util.colors.green('$ gulp                  -- Will compile assets, serve your web component with live reload, transpile es6, and lint your js/scss all while watching your src files'));
  util.log(util.colors.green('$ gulp build            -- Will compile your component for consumption, exporting it to a /dist folder'));
  util.log(util.colors.green('$ gulp test             -- Will execute the wct test tool to perform selenium tests on your web component'));
  util.log(util.colors.green('$ gulp test:karma       -- Will execute es6 unit testing on your web component\'s script files'));
  util.log(util.colors.green('$ gulp test:karma-watch -- Will execute the karma tests and set a watcher on the component and test script files'));
});
