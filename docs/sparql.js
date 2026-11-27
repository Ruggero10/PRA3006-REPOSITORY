"use strict";

const SPARQL_ENDPOINT = "https://wikidata.org";
const T1D_IRI = "http://wikidata.org";

const SPARQL_QUERY = `
SELECT DISTINCT ?gene ?geneLabel ?disease ?diseaseLabel
WHERE
{
  ?gene wdt:P2293 wd:Q124407.
  
  {?disease wdt:P279* wd:Q8084905.}
  UNION
  {?disease wdt:P31/wdt:P279* wd:Q8084905.}
  
  ?gene wdt:P2293 ?disease.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?geneLabel ?diseaseLabel
LIMIT 1000
`;

async function fetchT1DHierarchy() {
  const url = `${SPARQL_ENDPOINT}?format=json&query=${encodeURIComponent(SPARQL_QUERY)}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/sparql-results+json" }
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const json = await response.json();
  return buildHierarchy(json.results.bindings);
}

function buildHierarchy(bindings) {

 const genesMap = new Map();

  bindings.forEach(row => {
    const geneId = row.gene.value;
    const geneLabel = row.geneLabel ? row.geneLabel.value : geneId.split("/").pop();
    const diseaseId = row.disease.value;
    const diseaseLabel = row.diseaseLabel ? row.diseaseLabel.value : diseaseId.split("/").pop();

    if (!genesMap.has(geneId)) {
      genesMap.set(geneId, {
        name: geneLabel,
        type: "gene",
        diseasesSet: new Set(),
        children: []
      });
    }

    if (diseaseId !== T1D_IRI) {
      const geneObj = genesMap.get(geneId);
      if (!geneObj.diseasesSet.has(diseaseId)) {
        geneObj.diseasesSet.add(diseaseId);
        geneObj.children.push({
          name: diseaseLabel,
          type: "disease"
        });
      }
    }
  });

  const geneChildren = Array.from(genesMap.values()).map(g => ({
    name: g.name,
    type: g.children.length > 0 ? "shared-gene" : "exclusive-gene",
    children: g.children
  }));

  return {
    name: "Type 1 Diabetes",
    type: "root",
    children: geneChildren
  };
}