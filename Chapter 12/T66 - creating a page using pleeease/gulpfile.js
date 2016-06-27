'use strict';
var gulp     = require('gulp');
var rename = require('gulp-rename');
var pleeease = require('gulp-pleeease');
var sourcemaps = require('gulp-sourcemaps');


var pleeeaseOptions = {
  optimizers: { minifier: true }
};

var renameFunction = function (path) {
  path.extname = ".min.css";
  return path;
};

var sourceMapLocation = ['dest/*.css', '!dest/*.min.css'];

gulp.task('styles', function () {
  return gulp.src('src/*.css')
    .pipe(pleeease(pleeeaseOptions))
    .pipe(gulp.dest('dest/'));
});

gulp.task('rename', ['styles'], function () {
  return gulp.src('dest/*.css')
    .pipe(rename(renameFunction))
    .pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', ['rename'], function () {
  return gulp.src(sourceMapLocation)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/', {
      sourceMappingURLPrefix: 'https://www.mydomain.com/'
    }))
    .pipe(gulp.dest("dest/"));
});

gulp.task('default', ['styles', 'rename', 'sourcemap']);

var watcher = gulp.watch('src/*.css', ['styles', 'rename', 'sourcemap']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});