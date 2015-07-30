'use strict';

import _ from 'lodash';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import concat from 'gulp-concat';<% if(cssProcessor === 'libSass') { %>
import sass from 'gulp-sass';<% } %><% if(cssProcessor === 'compass') { %>
import compass from 'gulp-compass';<% } %>
import sourcemaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-minify-css';
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
let sassCompilation = function (opts) {
  let requiredTasks = [];
  opts.dest = opts.dest ? opts.dest : (opts.dist ? global.paths.dist + 'css' : global.paths.tmp + 'css');

  if (opts.dist) {
    requiredTasks.push('lintsass');
  }

  // defaults so gulpif knows what is what
  _.defaults(opts, {
    dist: false,
    replace: false,
    concat: false,
    bypassSourcemap: false,
    styleguide: false
  });

  // Compile SASS with sourcemaps + livereload.
  gulp.task(opts.taskName, requiredTasks, function () {
    //gulp.src(global.paths.fonts)
    //  .pipe(gulp.dest(dest + 'fonts'));

    //console.log('Running ',opts);

    let data = gulp.src(global.paths.sass)<% if(cssProcessor === 'libSass') { %>
      .pipe(sass({
          errLogToConsole: true,
          outputStyle: 'expanded'
        }).on('error', sass.logError))<% } %><% if(cssProcessor === 'compass') { %>
      .pipe(compass(compassOptions))<% } %>
      .pipe(gulpif(opts.replace, replace(opts.replace.this, opts.replace.with)))
      .pipe(concat(opts.concat ? opts.concat : compSassFilename))
      .pipe(autoprefixer());

    if (opts.styleguide) {
      data.pipe(opts.styleguide.applyStyles());
    }

    data.pipe(gulpif(!opts.bypassSourcemap, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(opts.dist, minifyCss()))
      .pipe(gulpif(opts.dist, rename({suffix: '.min'})))
      .pipe(gulpif(!opts.bypassSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(opts.dest));

    // Doesn't work in a gulpif
    if (opts.browserSync) {
      data.pipe(opts.browserSync.stream());
    }

    return data;
  });
};

export {compassOptions};
export default sassCompilation;
