var gulp = require('gulp');
var postcss = require('gulp-postcss');
var magic = require('postcss-magic-animation');

var processors = [ magic() ];

gulp.task('default', function () {
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'));
});