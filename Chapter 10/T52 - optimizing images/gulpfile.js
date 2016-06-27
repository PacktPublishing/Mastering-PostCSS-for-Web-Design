'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var images = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');

gulp.task('images', function () {
  return gulp.src('src/*')
    .pipe(images({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest("img/"));
});

gulp.task('default', ['images']);

var watcher = gulp.watch('src/*.jpg', ['images']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});