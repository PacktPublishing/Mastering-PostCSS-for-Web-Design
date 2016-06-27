var postcss = require('postcss');
 
module.exports = postcss.plugin('backgroundblend', function backgroundblend(options) {
 
    return function (css) {
 
        options = options || {};
         
        // Processing code will be added here
        css.eachDecl('background-blend', function (decl) {
      	if (decl.prop.indexOf('background-blend') !== -1) {
        	decl.prop  = 'background-blend-mode';
      	}     	
    });
  };
});