# crossref
use crossref to find scientific articles

A simple app for gathering crossref data.

## Crossref in the browser

You can run a search on all articles in the browser by opening index.html.
You can enter in the date (MMYY format), and pull up the total number of articles published since that date.
Alternately, you can create a JSON file of all articles published since that date. (TODO: downloadable CSV on click).

## Crossref in Node

You can run fetch.js in node to grab the first 10 articles from the specified publication date.
Alternately, you can run fetchAll.js to pull in all articles published since the specified date (12-01-19 set as default).
Fetched data is automatically stored as a stringified JSON object.
You can run write.js to convert your JSON data to CSV for analysis.
