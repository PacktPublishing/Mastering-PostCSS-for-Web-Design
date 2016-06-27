var postcss = require('postcss');
var _ = require('underscore');

// Font stacks from http://www.cssfontstack.com/
var fontstack_config = {
	'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
	'Times New Roman': 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'
}

module.exports = postcss.plugin('customfonts', function (options) {
  return function (css) {

    options = options || {};
    fontstack_config = _.extend(fontstack_config, options.fontstacks);

    css.walkRules(function (rule) {
      rule.walkDecls(function (decl, i) {
        var value = decl.value;
        if (value.indexOf( 'fontstack(' ) !== -1) {
          var fontstack_requested = value.match(/\(([^)]+)\)/)[1].replace(/["']/g, "");
          var fontstack = fontstack_config[fontstack_requested];
          var first_font = value.substr(0, value.indexOf('fontstack('));
          decl.value = first_font + fontstack;
        }
      });
    });

    css.walkAtRules('font-face', function(rule) {
      rule.walkDecls('font-path', function(decl) {
        var fontPath = decl.value.replace(/'/g, ''),
        src = '',
        declaration = '',
        formats = [
          { type: 'woff', ext: '.woff' },
          { type: 'truetype', ext: '.ttf' },
          { type: 'svg', ext: '.svg' }
        ];

        formats.forEach(function(format, index, array) {
          declaration = 'url("' + fontPath + format.ext + '") format(\'' + format.type + '\')';

          if (index === array.length - 1){
            src += declaration;
          } else {
            src += declaration + ',\n       ';
          }
        });

        decl.cloneBefore({ prop: 'src', value: src });
        decl.remove();
      });
    });
  }
});