import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('transitionShtct', t => {
    return run( t,
    	'div { property: all; duration: 1s; timing: ease-in-out; delay: 1s; }',
    	'div { transition: all 1s ease-in-out 1s; }', { });
});
