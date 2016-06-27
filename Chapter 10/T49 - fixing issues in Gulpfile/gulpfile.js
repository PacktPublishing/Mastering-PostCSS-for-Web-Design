'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var rucksack = require('rucksack-css');

var stylerules = {
  "color-no-invalid-hex": 2,
  "declaration-colon-space-before": [2, "never"],
  "indentation": [2, 2],
  "number-leading-zero": [2, "always"]
};

var renameFunction = function (path) {
  path.extname = ".min.css";
  return path;
};

var sourceMapLocation = ['dest/*.css', '!dest/*.min.css'];

gulp.task('styles', function () {
  return gulp.src('src/*.css')
    .pipe(postcss([ rucksack(), autoprefixer() ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('lint', ['styles'], function() {
  return gulp.src("dest/*.css")
    .pipe(postcss([ stylelint({ "rules": stylerules }), 
    reporter({ clearMessages: true })
  ]))
});

gulp.task('rename', ['lint'], function () {
  return gulp.src('dest/*.css')
    .pipe(rename(renameFunction))
    .pipe(gulp.dest("dest/"));
});


gulp.task('minifyCSS', ['sourcemap'], function () {
  return gulp.src('dest/*.min.css')
    .pipe(cssnano({ autoprefixer: false }))
    .pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', ['rename'], function () {
  return gulp.src(sourceMapLocation)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest("dest/"));
});

gulp.task('default', ['styles', 'lint' , 'rename' , 'minifyCSS', 'sourcemap']);

var watcher = gulp.watch('src/*.css', ['styles', 'lint', 'rename' , 'minifyCSS', 'sourcemap']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});