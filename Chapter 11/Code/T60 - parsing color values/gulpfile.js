'use strict';
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var valueParser = require('postcss-value-parser');
var util = require('util');

gulp.task('default', function () {
	var cssBackgroundValue = 'rgba(233, 45, 66, .5)';
	var parsedValue = valueParser(cssBackgroundValue);
	console.log(util.inspect(parsedValue, false, null));
});