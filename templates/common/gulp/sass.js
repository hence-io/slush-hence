'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import compass from 'gulp-compass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-minify-css';
import gulpkss from 'gulp-kss';
import gulpif from 'gulp-if';

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
let sassCompilation = function (taskName, browserSync, dist = false) {
  let dest = dist ? global.paths.dist : global.paths.tmp;

  // Compile SASS with sourcemaps + livereload.
  gulp.task(taskName, ['lintsass'], function () {
    gulp.src(global.paths.fonts)
      .pipe(gulp.dest(dest + 'fonts'));

    gulp.src(global.paths.sass)
      .pipe(compass(compassOptions))
      .pipe(concat(compSassFilename))
      .pipe(autoprefixer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map
      .pipe(gulpif(dist, minifyCss()))
      .pipe(gulpif(dist, rename({suffix: '.min'})))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest + 'css'))
      .pipe(browserSync.stream());

    if (dist) {
      gulp.src(global.paths.sass)
        .pipe(gulpkss({
          overview: global.paths.dist + 'css/styleguide.md'
        }))
        .pipe(gulp.dest(global.paths.dist + 'css/styleguide'));
    }
  });
};

export default sassCompilation;
