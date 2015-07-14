'use strict';

module.exports = function(browserSync) {
  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var concat = require('gulp-concat');<% if(cssProcessor === 'libSass') { %>
  var sass = require('gulp-sass');<% } %><% if(cssProcessor === 'compass') { %>
  var compass = require('gulp-compass');<% } %>
  var sourcemaps = require('gulp-sourcemaps');
  var minifyCss = require('gulp-minify-css');

  /**
   * Sass Tasks
   */
  // Compile SASS with sourcemaps + livereload.
  gulp.task('sass',['lintsass'], function () {
    return gulp.src(global.paths.sass)
      .pipe(sourcemaps.init())<% if(cssProcessor === 'libSass') { %>
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }).on('error', sass.logError))<% } %><% if(cssProcessor === 'compass') { %>
      .pipe(compass({
        //config_file: './config.rb',
        sass: global.paths.src,
        require: ['susy', 'modular-scale']
      }))<% } %>
      .pipe(concat('hence-comp-ui-sample.css'))
      .pipe(autoprefixer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map
      //.pipe(minifyCss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(global.paths.tmp + 'css'))
      .pipe(browserSync.stream());
  });
};