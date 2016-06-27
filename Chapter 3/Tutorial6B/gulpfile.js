var gulp = require('gulp');
var less = require('gulp-less');
var util = require('gulp-util');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var cssnano = require('cssnano');


gulp.task('less', function () {
  return gulp.src('./src/*.less')
    .pipe(less().on('error', util.log))
    .pipe(gulp.dest('src/'));
});

gulp.task('autoprefixer', ['lint-styles'], function() {
    return gulp.src('src/*.css')
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('rename', ['autoprefixer'], function () {
  return gulp.src('dest/*.css')
    .pipe(postcss([ cssnano() ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest("dest/"));
});

gulp.task("lint-styles", ['less'], function() {
    return gulp.src("src/*.css")
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

gulp.task('default', ['less', 'lint-styles', 'autoprefixer', 'rename']);

var watcher = gulp.watch('src/*.less', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
