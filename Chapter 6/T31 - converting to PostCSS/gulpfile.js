'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var neat = require('postcss-neat');


gulp.task('neat', function () {
  var processors = [
    require('autoprefixer-core')({ browsers: ['last 1 version'] }),
    require('postcss-neat')(/* { options } */)
  ];
  return gulp.src('src/*.css')
    .pipe(require('gulp-postcss')(processors))
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', ['neat']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});