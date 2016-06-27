var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');

gulp.task('styles', ['lint-styles'], function() {
    return gulp.src('src/*.css')
		.pipe(postcss([ autoprefixer ]))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('dest/'));
});

gulp.task('rename', ['styles'], function () {
	return gulp.src('dest/example.css')
		.pipe(postcss([ cssnano ]))
		.pipe(rename('example.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest("dest/"));
});


gulp.task("lint-styles", function() {
    return gulp.src("src/*.css")
    .pipe(postcss([ stylelint({ 
        "rules": {
          "color-no-invalid-hex": true,
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

gulp.task('default', ['lint-styles', 'styles', 'rename']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
