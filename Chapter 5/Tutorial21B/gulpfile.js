var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sprites = require('postcss-sprites');

var opts = {
    stylesheetPath: 'dest/',
    spritePath    : 'img/sprite.png',
    path          : 'src/img/'
};


gulp.task('sprites', function() {
  return gulp.src('src/*.css')
    .pipe(postcss([ sprites(opts) ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', ['sprites']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
