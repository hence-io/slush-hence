'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import gulpkss from 'gulp-kss';
import gulpif from 'gulp-if';
import insert from 'gulp-insert';

let compassOptions = {
  //config_file: './config.rb',
  sass: global.paths.src,
  css: global.paths.tmp + 'css',
  require: ['susy', 'modular-scale', 'breakpoint', 'font-awesome-sass']
};
let compSassFilename = global.comp.name + '.css';
/**
 * Sass Tasks
 */
gulp.task('kss', function () {
  gulp.src(global.paths.sass)
    .pipe(insert.wrap(global.comp.name + '{','}'))
    .pipe(gulpkss({
      overview: global.paths.dist + 'css/styleguide.md'
    }))
    .pipe(gulp.dest(global.paths.dist + 'css/styleguide'));
});
