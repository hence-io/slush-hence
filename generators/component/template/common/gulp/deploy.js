import _ from 'lodash';
import gulp from 'gulp';
import fs from 'fs';
import util from 'gulp-util';
import {execSync} from 'child_process';

let oldVersion = '';
let version = util.env.version;

let updateConfig = (file, done)=> {
  let data = fs.readFileSync(`./${file}.json`, 'utf8');

  var config = JSON.parse(data);
  oldVersion = config.version;
  config.version = version;
  var string = JSON.stringify(config, null, '\t');

  fs.writeFileSync(`./${file}.json`, string, 'utf8');

  console.log(`updated ${file} to ${version}`);
};

gulp.task('version-bump', function (done) {
  updateConfig('bower');
  updateConfig('package');
  done();
});

gulp.task('deploy', ['build'], function (done) {
  updateConfig('bower');
  updateConfig('package');

  setTimeout(()=> {
    console.log(`version updated to ${version}. Committing and tagging now...`);
    execSync(`git status && git add --all && git status`, {stdio: 'inherit'});
    execSync(`git commit -m "v${oldVersion}->v${version}"`, {stdio: 'inherit'});
    execSync(`git tag v${version} && git push && git push --tags`, {stdio: 'inherit'});

    done();
  }, 1000);
});
