'use strict';

import gulp  from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
// Html
import minifyHtml from 'gulp-minify-html';

let compHtmlFilename = global.comp.name + '.html';

let htmlCompile = function (taskName, dist = false) {
  let dest = dist ? global.paths.dist : global.paths.tmp;

// Build HTML for distribution.
  gulp.task(taskName, ()=> {
    gulp.src(global.paths.src + compHtmlFilename)
      .pipe(replace('</dom-module>', '' +
        '  <link rel="import" type="css" href="css/' + global.comp.name + ".css\">\n" +
        '  <script src="js/' + global.comp.name + ".js\"></script>\n" +
        '</dom-module>'))
      //.pipe(rename({
      //  suffix: '-module'
      //}))
      .pipe(gulpif(dist, replace(global.comp.name + '.js', global.comp.name + '.min.js')))
      .pipe(gulpif(dist, replace(global.comp.name + '.css', global.comp.name + '.min.css')))
      .pipe(gulp.dest(dest));

    gulp.src([global.paths.src + 'index.html'])
      .pipe(gulpif(dist, replace('webcomponents-lite.js', 'webcomponents-lite.min.js')))
      .pipe(gulpif(dist, replace('/bower_components', '../..')))
      .pipe(gulpif(dist, replace(global.comp.name + '.js', global.comp.name + '.min.js')))
      .pipe(gulpif(dist, replace(global.comp.name + '.css', global.comp.name + '.min.css')))
      .pipe(gulpif(dist, minifyHtml()))
      .pipe(gulp.dest(dest));
  });
};

export default htmlCompile;
