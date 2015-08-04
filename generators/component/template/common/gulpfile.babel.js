
import gulp from 'gulp';
import requireDir from 'require-dir';

var srcDir = './src/';
var tmpDir = './.tmp/';
var buildSrcDir = './gulp/src/';


global.comp = {
  name: '<%= compName %>',
  camel: '<%= compNameCamel %>'
};

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': srcDir + '**/*.html',
  // Bower
  'bower': './bower_components/',
  // Build Src Dir
  buildSrcDir: buildSrcDir,
  // Dist JS file
  'distjs': buildSrcDir + 'dist.js',
  // Dev JS file
  'devjs': srcDir + 'index.js',
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
  // Output css filepath
  tmpCssOutput : `${tmpDir}css/`,
  tmpCssOutputFile : `${tmpDir}css/${global.comp.name}.css`,
  // WCT Test folder
  'testBehaviour': './test/behaviour/**'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', {recurse: false});
requireDir('./gulp/build', {recurse: false});
requireDir('./gulp/development', {recurse: false});

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
