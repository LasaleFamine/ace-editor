const path = require('path');

const
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');

const toWatch = ['ace-editor.es6.js', 'ace-editor.html'];
const component = 'ace-editor.es6.js';


/**
* Watch changes in .es6.js and .html file, runs 'babel' task and reload
*/
gulp.task('watch-reload', function() {
  gulp.watch(toWatch, ['babel', 'reload']);
});

gulp.task('reload', function () {
  gulp.src(toWatch)
    .pipe(connect.reload());
});
gulp.task('connect', function() {
  connect.server({
    root: './../',
    livereload: true
  });
});

gulp.task('babel', () => {
    return gulp.src(component)
      .pipe(plumber())
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(rename((path) => {
        path.basename = path.basename.replace(/.es6$/, '')
      }))
      .pipe(gulp.dest(''));
});

gulp.task('default', ['babel'])
gulp.task('watch', ['connect', 'watch-reload']);
