'use strict';
var gulp = require('gulp');
var postcss = require('postcss');
var safe = require('postcss-safe-parser');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

var badCss = 'a {';

gulp.task('default', function () {
  return postcss([autoprefixer]).process(badCss, { parser: safe }).then(function (result) {
    console.log(result.css); //= 'a {}'
    fs.writeFileSync('output.css', result.css);
  });
});


