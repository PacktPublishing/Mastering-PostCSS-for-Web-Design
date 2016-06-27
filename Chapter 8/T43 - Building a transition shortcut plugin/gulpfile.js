var gulp = require('gulp');
var postcss = require('gulp-postcss');
var transition = require('postcss-transition-shortcut');

var processors = [ transition() ];

gulp.task('default', function () {
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'));
});