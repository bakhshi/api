const peliasQuery = require('pelias-query');

module.exports = function(vs) {
  const view = 'phrase_first_tokens_only_multi_match';

  // get a copy of the *complete* tokens produced from the input:name
  const tokens = vs.var('input:name:tokens_complete').get();

  // no valid tokens to use, fail now, don't render this view.
  if( !tokens || tokens.length < 1 ) {
    return null;
  }


  const fields = [
      'phrase.default^1',
      'phrase.en^2',
      'phrase.hy^2',
      'phrase.ru^2',
  ];

  vs.var(`multi_match:${view}:input`).set(tokens.join(' ')); 
  vs.var(`multi_match:${view}:fields`).set(fields); 
  vs.var(`multi_match:${view}:type`).set('phrase_prefix');
  vs.var(`multi_match:${view}:analyzer`).set('peliasQuery'); 

  return peliasQuery.view.leaf.multi_match(view)(vs);
};