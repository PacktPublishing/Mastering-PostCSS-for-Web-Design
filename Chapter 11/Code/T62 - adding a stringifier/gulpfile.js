'use strict';
var gulp = require('gulp');
var postcss = require('postcss');
var util = require('util');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

var newValue = 'white', result, selectors = [], root, decl;

gulp.task('default', function () {
  root = postcss.parse('a { color: black }');
  decl = root.first.first;

  // get a selector count
  selectors = [];
  root.walkRules(function (rule) {
    selectors.push(rule.selector);
  });

  console.log("\nThe declaration type is: " + decl.type);     
  console.log("The value of this declaration is: " + decl.toString());
  console.log("Number of nodes in this CSS: " + root.nodes.length);
  console.log("Selectors used in this CSS: " + selectors.toString());

  // Replace color black with white
  root.walkDecls(function (decl) {
    if ( decl.value.match(/^black/) ) {
        decl.value = 'white';
    }
  });

  // display content on screen and save to file
  result = root.toResult({ to: 'all.css', map: { inline: false } });
  console.log("Updated color value: " + decl.value.toString() + "\n");
  fs.writeFileSync('dest/styles.css', result.css);
  fs.writeFileSync('dest/styles.css.map', result.map);
});
