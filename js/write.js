const { Parser } = require('json2csv');
const multiData = require('../data/multi.json')
 
const fields = ['DOI', 'title[0]', 'author[0].family', 'created.timestamp', 'type'];
const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(multiData);

var fs = require("fs");

fs.writeFile('../data/multi.csv', csv, 'utf8', function(err) {
  if (err) {
     return console.error(err);
  }
  console.log("Data written successfully!");
});