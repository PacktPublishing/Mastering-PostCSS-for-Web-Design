'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
//var sass = require('gulp-sass');
var nested = require('postcss-nested');
var csstyle = require('cssstyle');

gulp.task('style', function () {
  gulp.src('src/*.css')
    .pipe(postcss([nested, csstyle]))
    .pipe(gulp.dest('dest/'));
});
 
gulp.task('default', ['style']);

var watcher = gulp.watch('src/*.css', ['style']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});