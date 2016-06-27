var gulp = require('gulp');
var postcss = require('gulp-postcss');
var webp = require('gulp-webp');
var webpcss = require('webpcss');

gulp.task('webp', function() {
  return gulp.src('src/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('img/'));
});

gulp.task('css', function () {
    var processors = [ webpcss.default({webpClass: '.js.webp'}) ];
    return gulp.src('src/*.css')
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dest/') );
});
gulp.task('default',['webp', 'css']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
