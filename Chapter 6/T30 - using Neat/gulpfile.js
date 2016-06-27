'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;

var paths = {
  scss: 'src/*.scss'
};

gulp.task('styles', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }))
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', ['styles']);

var watcher = gulp.watch('src/*.scss', ['styles']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});