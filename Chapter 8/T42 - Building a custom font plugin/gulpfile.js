var gulp = require('gulp');
var postcss = require('gulp-postcss');
var customfonts = require('postcss-custom-fonts');

var processors = [
	customfonts({
		fontstacks: {
		  'Extra Stack': '"Extra Stack", "Moar Fonts", Extra, serif',
		  'Arial': 'Arial, "Comic Sans"'
		}
	})
];

gulp.task('default', function () {
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'));
});