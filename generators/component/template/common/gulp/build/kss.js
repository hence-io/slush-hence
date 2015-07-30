'use strict';

import gulp from 'gulp';
import styleguide from 'sc5-styleguide';
import compass from 'gulp-compass';

let styleguideDir = global.paths.dist + 'styleguide/';
let compSass = global.comp.name + '.scss';
let compCss = global.comp.name + '.css';

import {compassOptions} from './../sass';

import browserSyncConstructor from 'browser-sync';
let browserSync = browserSyncConstructor.create();

/**
 * Sass Tasks
 */
gulp.task('kss', ['lintsass','kss:generate', 'kss:apply']);

gulp.task('kss:serve', ['kss'], function () {
  browserSync.init({
    server: {
      baseDir: ['./dist/styleguide'],
      routes: {
        "/bower_components": "./bower_components"
      }
    }
  });

  gulp.watch([global.paths.sass], ['kss']).on('change', function () { return browserSync.reload(); });
});

gulp.task('kss:generate', function () {
  return gulp.src(global.paths.sass)
    .pipe(styleguide.generate({
      title: 'Component Styleguide',
      server: false,
      css: 'scss',
      rootPath: styleguideDir,
      overviewPath: 'README.md',
      disableEncapsulation: true,
      extraHead: [
        `
        <script src=../../../webcomponentsjs/webcomponents-lite.min.js></script>
        <link rel=import href=../hence-comp-ui-card.html>
        `
      ]
    }))
    .pipe(gulp.dest(styleguideDir));
});

gulp.task('kss:apply', function () {
  return gulp.src(global.paths.sass)
    .pipe(compass(compassOptions))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideDir));
});
