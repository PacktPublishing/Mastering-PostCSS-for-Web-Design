'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
//var nested = require('postcss-nested');
//var csstyle = require('cssstyle');

gulp.task('sass', function () {
  gulp.src('src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dest/'));
});
 
gulp.task('default', ['sass']);

var watcher = gulp.watch('src/*.scss', ['sass']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});