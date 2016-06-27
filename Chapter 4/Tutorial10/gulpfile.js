var gulp = require('gulp');
var postcss = require('gulp-postcss');
var customMedia = require('postcss-custom-media');

gulp.task('default', function() {
    return gulp.src('src/*.css')
		.pipe(postcss([ autoprefixer ]))
		.pipe(gulp.dest('dest/'));
});

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
