var gulp = require('gulp');
var git = require('gulp-git');

// Run git init
// src is the root folder for git to initialize
gulp.task('git-init', function(done){
  git.init({cwd: './', args: ''},function (err) {
    if (err) throw err;
    done();
  });
});

// Run git add
// src is the file(s) to add (or ./*)
gulp.task('git-add', function(){
  return gulp.src('./*')
    .pipe(git.add({args: ''}));
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('git-commit', function(){
  return gulp.src('./*')
    .pipe(git.commit('- version bump', {args:''}));
});

// Run git push
// remote is the remote repo
// branch is the remote branch to push to
gulp.task('git-push', function(){
  git.push('origin', 'master', {args: ''}, function (err) {
    if (err) throw err;
  });
});
gulp.task('git-push-tags', function(){
  git.push('origin', 'master', {args: '--tags'}, function (err) {
    if (err) throw err;
  });
});
