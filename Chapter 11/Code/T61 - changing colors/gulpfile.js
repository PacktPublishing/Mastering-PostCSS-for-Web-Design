
'use strict';
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var valueParser = require('postcss-value-parser');
var util = require('util');
var convert = require('color-convert');
var fs = require('fs');
var path = require('path');


var file = 'src/styles.css';
var hexcolor, sourceFile = fs.readFileSync(file, 'utf-8');

gulp.task('default', function () {
	var parsedValue = valueParser(sourceFile);

	// walk() will visit all the of the nodes in the tree, 
	// invoking the callback for each. 
	parsedValue.walk(function (node) {
	 
	  // Since we only want to transform rgba() values, 
	  // we can ignore anything else. 
	  if (node.type !== 'function' || node.value !== 'rgba') return;
	 
	  // We can make an array of the rgba() arguments to feed to a 
	  // convert() function 
	  hexcolor = node.nodes.filter(function (node) {
	    return node.type === 'word';
	  }).map(function (node) {
	    return Number(node.value);
	  });
	 
	  // Now we will transform the existing rgba() function node 
	  // into a word node with the hex value 
	  node.type = 'word';
	  node.value = '#' + convert.rgb.hex(hexcolor);
	})

	var parsedcontent = parsedValue.toString();
	var outputFile = path.basename(file);
	fs.writeFileSync('dest/' + outputFile, parsedcontent);
});