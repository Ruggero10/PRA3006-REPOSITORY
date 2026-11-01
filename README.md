# PRA3006-REPOSITORY

My "Programming in the life sciences" repository on GitHub

Possible research questions:

1) What are the genes involved in the pathogenesis of diabetes type 1 that are targets of autoimmune attacks? 
(and possible molecular structures that would be able to bind the targets' bonding sites from the major histocompatibility complex proteins?)

2) What are the genes that are shared in the pathogenesis of diabetes type 1 and celiac disease?

By searching "celiac disease" on Wikidata and then going down to the "genetic association" section you can find all the genes involved in the celiac disease.

By searching "type-1 diabetes" on Wikidata and then going down to the "genetic association" section you can find all the genes involved in type-1 diabetes mellitus.

I tried to write a more specific query on the Wikidata Query Service in order to find not only the genes involved in type-1 diabetes mellitus, but also only the genes that encode for proteins that are autoantigens in order to find the targets of the autoimmune attacks. However, I could not get any result with this query:

SELECT ?gene ?geneLabel ?protein ?proteinLabel
WHERE
{
  ?gene wdt:P2293 wd:Q124407;
        wdt:P688 ?protein.
  ?protein wdt:P31 wd:Q4072475.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en". }
}

At this point, I tried to write a less specific query, without the autoantigens detail.



