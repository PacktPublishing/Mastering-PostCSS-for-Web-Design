'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
//var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var rucksack = require('rucksack-css');


gulp.task('styles', function () {
  return gulp.src('src/*.css')
    .pipe(postcss([ rucksack({ fallbacks: true, autoprefixer: true }) ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task("lint-styles", ['styles'], function() {
    return gulp.src("dest/*.css")
    .pipe(postcss([ stylelint({ 
        "rules": {
          "color-no-invalid-hex": 2,
          "declaration-colon-space-before": [2, "never"],
          "indentation": [2, 2],
          "number-leading-zero": [2, "always"]
        }
      }),
      reporter({
        clearMessages: true,
      })
    ]))
});

gulp.task('rename', ['lint-styles'], function () {
  return gulp.src('dest/*.css')
    .pipe(postcss([ cssnano() ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', ['rename'], function () {
  return gulp.src('dest/*.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest("dest/"));
});

gulp.task('default', ['styles', 'lint-styles', 'rename', 'sourcemap']);

var watcher = gulp.watch('src/*.scss', ['styles', 'lint-styles', 'rename', 'sourcemap']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});