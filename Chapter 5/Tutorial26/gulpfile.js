var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var functions = require('postcss-functions');
var color = require('css-color-converter');

function darkenColor (value, frac) {
  var darken = 1 - parseFloat(frac);
  var rgba = color(value).toRgbaArray();
  var r = rgba[0] * darken;
  var g = rgba[1] * darken;
  var b = rgba[2] * darken;
  return color([r,g,b]).toHexString();
}

function colorize (value, frac) {
  var level = 1 - parseFloat(frac);
  var rgba = color(value).toRgbaArray();
  var r = -(rgba[0] - rgba[0]) * (level / 100)
  var g = -(rgba[1] - rgba[1]) * (level / 100)
  var b = -(rgba[2] - rgba[2]) * (level / 100)
  return color([r,g,b]).toHexString();  
}

function tintColor (value, frac) {
  var tintFactor = 1 - parseFloat(frac);
  var rgba = color(value).toRgbaArray();
  var r = rgba[0] + (255 - rgba[0]) * tintFactor;
  var g = rgba[1] + (255 - rgba[1]) * tintFactor;
  var b = rgba[2] + (255 - rgba[2]) * tintFactor;
  return color([r,g,b]).toHexString();  
}

function sepiaColor (value, frac) {
  var frac = 1 - parseFloat(frac);
  var rgba = color(value).toRgbaArray();
  r = Math.min(255, (rgba[0] * (1 - (0.607 * frac))) + (rgba[1] * (0.769 * frac)) + (rgba[2] * (0.189 * frac)));
  g = Math.min(255, (rgba[0] * (0.349 * frac)) + (rgba[1]  * (1 - (0.314 * frac))) + (rgba[2]  * (0.168 * frac)));
  b = Math.min(255, (rgba[0] * (0.272 * frac)) + (rgba[1]  * (0.534 * frac)) + (rgba[2] * (1- (0.869 * frac))));
  return color([r,g,b]).toHexString();  
}

gulp.task('autoprefixer', function() {
  return gulp.src('src/*.css')
    .pipe(postcss([  autoprefixer, functions({
      functions: { 
        tint: tintColor,
        darken: darkenColor,
        sepia: sepiaColor
      }
    }) 
    ]))
  .pipe(gulp.dest('dest/'));
});

gulp.task("lint-styles", ['autoprefixer'], function() {
    return gulp.src("dest/*.css")
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
  return gulp.src('dest/*.css')
    .pipe(postcss([ cssnano() ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', ['rename'], function () {
  return gulp.src('dest/*.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest("dest/"));
});

gulp.task('default', ['lint-styles', 'autoprefixer', 'rename', 'sourcemap']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
