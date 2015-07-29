'use strict';

// Common
import gulp from 'gulp';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import runSeq from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import util from 'gulp-util';

// Html
import minifyHtml from 'gulp-minify-html';

// Images
import pngquant from 'imagemin-pngquant';
import imagemin from 'gulp-imagemin';

// Sass
import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import gulpkss from 'gulp-kss';

// JS
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';

// Serve
import browserSyncConstructor from 'browser-sync';
let browserSync = browserSyncConstructor.create();

import sassCompilation from './../sass';
sassCompilation('buildsass', browserSync, true);

import htmlCompilation from './../html';
htmlCompilation('buildhtml', true);

// One build task to rule them all.
gulp.task('build', (done)=> {
  runSeq('clean', ['buildsass', 'buildimg', 'buildjs'], 'buildhtml', done);
});

gulp.task('build:serve', (done)=> {
  runSeq('clean', ['buildsass', 'buildimg', 'buildjs'], 'buildhtml', function () {
    browserSync.init({
      server: {
        baseDir: ['./']
      },
      startPath: '/dist/index.html'
    });
  });
});

// Build JS for distribution.
gulp.task('buildjs', ()=> {
  browserify(global.paths.distjs, {debug: false})
    //.add(require.resolve('babelify/polyfill'))
    .transform(babelify)
    .bundle().on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source(global.comp.name + '.js'))
    .pipe(buffer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(global.paths.dist + 'js'));
});

// Build images for distribution.
gulp.task('buildimg', ()=> {
  gulp.src(global.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.dist + 'img'));
});
