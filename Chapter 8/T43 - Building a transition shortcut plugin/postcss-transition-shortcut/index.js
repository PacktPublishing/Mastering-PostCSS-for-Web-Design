var postcss = require('postcss');

module.exports = postcss.plugin('postcss-transition-shortcut', function (opts) {
    opts = opts || {};

    return function (css) {

        css.walkRules(function (rule) {
            var transitionRule;
            var transitionValues = [];
            var index = -1, node;
            var attributes = /^(property|duration|timing|delay)$/;

            while (node = rule.nodes[++index]) {
                if (attributes.test(node.prop)) {
                    transitionRule = transitionRule ||
                        node.cloneBefore({ prop: 'transition' });

                    var transValues = postcss.list.space(node.value);
                    transitionValues.push(transValues.join(','));
                    node.remove();
                    --index;
                }
            }
            transitionRule.value = transitionValues.join(' ');
        });
    };
});
