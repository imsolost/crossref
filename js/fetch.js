var fs = require("fs");
var fetch = require("node-fetch");

function fetchSome(){
  var fromPubDate =`from-pub-date:2019-01`
  var selection = 'DOI,title,author,created,type'
  var offset = 0

  fetch(`http://api.crossref.org/works?query=animal&filter=${fromPubDate}&select=${selection}&rows=10&offset=${offset}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fs.writeFile('../data/data.json', JSON.stringify(data.message.items), 'utf8', function(err) {
        if (err) {
           return console.error(err);
        }
        console.log(JSON.stringify(data.message.items));
        console.log("Data written successfully!");
      });
    })
}

fetchSome()