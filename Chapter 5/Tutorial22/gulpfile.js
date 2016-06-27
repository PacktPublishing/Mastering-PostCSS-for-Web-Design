var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var evilIcons = require("gulp-evil-icons");
var postcssSVG = require('postcss-svg');

gulp.task('icons', function () {
  return gulp.src('src/index.html')
    .pipe(evilIcons())
    .pipe(gulp.dest('dest/'));
});

gulp.task('changecolor', ['icons'], function() {
  gulp.src('src/*.css')
    .pipe(postcss([ postcssSVG() ]))
    .pipe(gulp.dest('dest/css/'));
});

gulp.task("lint-styles", ['changecolor'], function() {
    return gulp.src("dest/css/*.css")
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
	return gulp.src('dest/css/*.css')
	.pipe(postcss([ cssnano() ]))
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest("dest/css"));
});

gulp.task('sourcemap', ['rename'], function () {
	return gulp.src('dest/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('maps/'))
	.pipe(gulp.dest("dest/css"));
});

gulp.task('default', ['icons', 'changecolor', 'lint-styles' , 'rename', 'sourcemap' ]);

var watcher = gulp.watch('src/*.*', ['default', 'icons', 'changecolor', 'lint-styles', 'rename', 'sourcemap']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
