var database = []

function countArticles(){
  var search = document.getElementById('search').value
  var fromPubDate =`from-pub-date:20${search.slice(-2)}-${search.slice(0,2)}`
  var selection = 'DOI,title,author,created,type'
  var offset = 0
  document.getElementById('results').innerHTML =  ""

  $.ajax({
    url: `http://api.crossref.org/works?query=animal&filter=${fromPubDate}&select=${selection}&rows=1&offset=${offset}`,
    type: 'GET',
    dataType: 'json',
    success: handleResponse
  });

  function handleResponse(data) {
    console.log(data, 'data');    
    document.getElementById("results").innerHTML = "number of items " + data.message['total-results'];
  }
}

function createDatabase(){
  var search = document.getElementById('search').value
  var fromPubDate =`from-pub-date:20${search.slice(-2)}-${search.slice(0,2)}`
  var selection = 'DOI,title,author,created,type'
  var cursor = '*'
  document.getElementById('results').innerHTML =  ""

  $.ajax({
    url: `http://api.crossref.org/works?query=animal&filter=${fromPubDate}&select=${selection}&rows=1000&cursor=${cursor}`,
    type: 'GET',
    dataType: 'json',
    success: handleResponse
  });

  function handleResponse(data) {
    console.log(data, 'data');

    data.message.items.forEach(element => {
      database.push(element)
    });

    if (database.length <  data.message['total-results']) {
        newSearch(data.message['next-cursor'])
    }
  }
}

function newSearch(cursor){
  var search = document.getElementById('search').value
  var fromPubDate =`from-pub-date:20${search.slice(-2)}-${search.slice(0,2)}`
  var selection = 'DOI,title,author,created,type'

  $.ajax({
    url: `http://api.crossref.org/works?query=animal&filter=${fromPubDate}&select=${selection}&rows=1000&cursor=${cursor}`,
    type: 'GET',
    dataType: 'json',
    success: handleResponse
  });

  function handleResponse(data) {
    data.message.items.forEach(element => {
      database.push(element)
    })

    if (database.length <  data.message['total-results']) {
      newSearch(data.message['next-cursor'])
    } else {
      var jsonString = JSON.stringify(database)
      console.log(jsonString, 'json');
      
    }
  }
}

document.getElementById('buttonSearch').addEventListener('click', countArticles, false)
document.getElementById('buttonCreateData').addEventListener('click', createDatabase, false)