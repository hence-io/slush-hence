'use strict';

import gulp  from 'gulp';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';

gulp.task('js',['lintjs'], ()=> {
  return browserify(global.paths.devjs, {debug: true})
    .transform(babelify)
    .bundle().on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source(global.comp.name+'.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    //.pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(global.paths.tmp + 'js'));
});
