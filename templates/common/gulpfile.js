var gulp = require('gulp');
var requireDir = require('require-dir');

var srcDir = './src/';
var tmpDir = './.tmp/';

global.comp = {
  name: '<%= compName %>'
};
global.compassOptions = {
  //config_file: './config.rb',
  sass: srcDir,
  css: tmpDir + 'css',
  require: ['susy', 'modular-scale', 'breakpoint','font-awesome-sass']
};
// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': srcDir + '**/*.html',
  // Bower
  'bower': './bower_components/',
  // Main JS file
  'mainjs': srcDir + 'index.js',
  // JS sources.
  'js': srcDir + '**/*.js',
  // SASS sources.
  'sass': srcDir + '**/*.scss',
  // Fonts
  'fonts': './fonts/**',
  // Image sources.
  'img': srcDir + 'img/*',
  // Sources folder.
  'src': srcDir,
  // Compiled CSS folder.
  'css': srcDir + 'css',
  // Distribution folder.
  'dist': './dist/',
  // Temp folder.
  'tmp': tmpDir,
  // WCT Test folder
  'testBehaviour': './test/behaviour/**'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', {recurse: false});

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
