marApiKey = "edf46de39646d3311b0f8ba0c49690ac";
googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo";
var wouldBeSearch = 'black widow';
var searchCont = document.querySelector('.search-cont');
var searchBar = document.querySelector('#searchBar');
var searchBtn = document.querySelector('.searchBtn');
var searchResults = document.querySelector('.results');
// cdebe113bbfe36271d37ef729d7ada15fd5cb3f6

searchBtn.addEventListener('click',function(){
    console.log(searchBar.value)
fetch(`https://gateway.marvel.com:443/v1/public/comics?title=${searchBar.value}&apikey=${marApiKey}`, {
    method: 'GET',
    credentials: 'same-origin',
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var hero = data.data.results[0];

        console.log(data);
        console.log(`${data.data.results[0].images[0].path}/portrait_medium.${data.data.results[0].images[0].extension}`)
        if (data) {
            showResults(data);
        }
    })
var showResults = function (data) {
    for (var i = 0; i < data.data.results.length; i++) {
        var listItemCont = document.createElement("div");
        var listItemTitle = document.createElement("h2");
        var listItemImg = document.createElement("img");
        listItemCont.setAttribute('class', 'searchDiv')
        listItemTitle.textContent = data.data.results[i].title;
        listItemImg.setAttribute('src', data.data.results[i].images[0].path + "/portrait_medium." + data.data.results[i].images[0].extension);
        listItemImg.setAttribute('class', 'search-img')
        listItemTitle.setAttribute('class', 'search-title')
        searchResults.appendChild(listItemCont);
        listItemCont.appendChild(listItemImg);
        listItemCont.appendChild(listItemTitle);
    }
}
})

searchResults.addEventListener('click', function(event){
    console.log(event.target)
fetch("https://www.googleapis.com/books/v1/volumes?q="+wouldBeSearch+"&key=AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo")
.then(function(response){
    console.log(response)
    return response.json();
}).then(function(data){
    console.log(data);
    if(data){
    for(var i = 0; i = data.items.length; i++){
        var googResultCont = document.createElement('div');
        var googResultsImg = document.createElement('img');
        var googResultAvail = document.createElement('div');
        var googQuote = document.createElement('p');
        var googBuy = document.querySelector('a');
        googResultsImg.setAttribute('src',data.items[0].volumeInfo.imageLinks.thumbnail)
        // event.target.appendChild(googResultCont);
        googResultCont.appendChild(googResultsImg);
    }
    }
})
})