var peliasQuery = require('pelias-query');

/**
  Ngrams view with the additional properties to enable:
  type:phrase -> tokens MUST appear in the same order in BOTH query and index
  operator:and -> ALL tokens are mandatory, missing any single token will cause
  a query failure.
**/

module.exports = function( vs ){

  // validate required params
  if( !vs.isset('phrase:slop') ){
    return null;
  }

  const view = 'ngrams_strict';

  // vs.var('match_phrase:ngrams_strict:input', vs.var('input:name').get());
  // vs.var('match_phrase:ngrams_strict:field', vs.var('ngram:field').get());

  // vs.var('match_phrase:ngrams_strict:analyzer', vs.var('ngram:analyzer').get());
  // vs.var('match_phrase:ngrams_strict:slop', vs.var('phrase:slop').get());
  // vs.var('match_phrase:ngrams_strict:boost', vs.var('ngram:boost').get());

  const fields = [
    'phrase.default^100',
    'phrase.en^200',
    'phrase.hy^200',
    'phrase.ru^200',
  ];

  vs.var(`multi_match:${view}:input`).set(vs.var('input:name').get()); 
  vs.var(`multi_match:${view}:fields`).set(fields);
  vs.var(`multi_match:${view}:type`).set('phrase_prefix');
  vs.var(`multi_match:${view}:analyzer`).set('peliasQuery');
  vs.var(`multi_match:${view}:slop`).set(3);

  return peliasQuery.view.leaf.multi_match(view)(vs);
  // return peliasQuery.view.leaf.match_phrase('ngrams_strict')(vs);
};
