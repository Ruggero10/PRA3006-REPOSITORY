"use strict";

const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

const SPARQL_QUERY = `
SELECT DISTINCT ?gene ?geneLabel ?disease ?diseaseLabel
WHERE
{
  ?gene wdt:P2293 wd:Q124407.
  
  {?disease wdt:P279* wd:Q8084905.}
  UNION
  {?disease wdt:P31/wdt:P279* wd:Q8084905.}
  
  ?gene wdt:P2293 ?disease.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,it". }
}
ORDER BY ?geneLabel ?diseaseLabel
LIMIT 1000
`;
