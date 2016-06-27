'use strict';
var gulp = require('gulp');
var postcss = require('postcss');
var fs = require('fs')
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
var syntax = require('postcss-scss');


var scss = fs.readFileSync('src/styles.scss', 'utf-8');

gulp.task('default', function () {
	postcss([ autoprefixer, nested() ]).process(scss, { syntax: syntax }).then(function (result) {
	    fs.writeFileSync('dest/styles.css', result.content);
	});
});

