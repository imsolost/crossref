var fs = require("fs");
var fetch = require("node-fetch");

var database = []
var pubDate = '2019-12'

function fetchAll(){
  var fromPubDate =`from-pub-date:${pubDate}`
  var selection = 'DOI,title,author,created,type'
  var cursor = '*'
  database = []

  fetch(`http://api.crossref.org/works?query=animal&filter=${fromPubDate}&select=${selection}&rows=1000&cursor=${cursor}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.message.items.forEach(el => {
      database.push(el)
    });

    console.log(data.message['total-results'])

    if (database.length <  data.message['total-results']) {
        newSearch(data.message['next-cursor'])
    }
  })
}

function newSearch(cursor){
  var fromPubDate =`from-pub-date:${pubDate}`
  var selection = 'DOI,title,author,created,type'

  fetch(`http://api.crossref.org/works?query=animal&filter=${fromPubDate}&select=${selection}&rows=1000&cursor=${cursor}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.message.items.forEach(element => {
      database.push(element)
    })

    if (database.length <  data.message['total-results']) {
      newSearch(data.message['next-cursor'])
    } else {
      writeJson(JSON.stringify(database))
      console.log(database.length, 'database.length');
      
    }
  })
}

function writeJson(string) {
  fs.writeFile('../data/multi.json', string, 'utf8', function(err) {
    if (err) {
       return console.error(err);
    }
    console.log("Data written successfully!");
  });
}

fetchAll()