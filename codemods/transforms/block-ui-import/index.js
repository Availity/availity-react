/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-array-callback-reference */
const { getParser } = require('codemod-cli').jscodeshift;

const imports = new Set(['react-block-ui', 'react-block-ui/styles.css']);

module.exports = function transformer(file, api) {
  const j = getParser(api);

  return j(file.source)
    .find(j.ImportDeclaration)
    .filter((p) => imports.has(p.value.source.value))
    .forEach((path) => {
      if (path.value.source.value === 'react-block-ui') {
        j(path).replaceWith(
          // Build a new import declaration node based on the existing one
          j.importDeclaration(
            path.node.specifiers, // copy over the existing import specificers
            j.stringLiteral('@availity/block-ui') // Replace the source with our new source
          )
        );
      } else {
        j(path).remove();
      }
    })
    .toSource({ quote: 'single' });
};

module.exports.type = 'js';
