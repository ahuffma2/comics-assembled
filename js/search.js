marApiKey = "edf46de39646d3311b0f8ba0c49690ac";
googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo";
// from search
var wouldBeSearch = 'black widow';
var searchCont = document.querySelector('.search-cont');
var searchBar = document.querySelector('#searchBar');
var searchBtn = document.querySelector('.searchBtn');
var searchResults = document.querySelector('.results');
var resultImg = document.querySelector('#expandImg');
var resultTitle = document.querySelector('.title');
var resultCreators = document.querySelector('.creators');
var isAvailable = document.querySelector('.isAvailable');
var price = document.querySelector('.price');
var buy = document.querySelector('.buyLink');
var savedSearchBar = document.querySelector('.form-control');
var savedSearchBtn = document.querySelector('.btn');
var savedBtn = document.querySelector('.saveBtn');
var cardMain = document.querySelectorAll('.card');
var cardTitle = document.querySelectorAll('.card-title');
var cardTxt = document.querySelectorAll('.card-text');
var cardLink = document.querySelectorAll('.google-link');
var cardImg = document.querySelectorAll('.img-fluid');
// from saved-pages

                                                               
if(document.location.pathname == "/saved-pages.html"){
    var savedTitles = JSON.parse(localStorage.getItem('savedArryTitles'))         ///  <========== NEED  ; ON LINE ENDINGS.   
    var savedIndex = JSON.parse(localStorage.getItem('savedArryIndex')) ///  <========== NEED  ; ON LINE ENDINGS.   
        console.log(savedTitles);
        console.log(savedIndex)
        for(var o = 0; o < savedTitles.length; o++){
           var marData = JSON.parse(localStorage.getItem(`${savedTitles[o]}mar`));
           var googData = JSON.parse(localStorage.getItem(savedTitles[o]));
           console.log(marData);
           console.log(googData);
           cardTitle[o].textContent = marData.data.results[savedIndex[o]].title  ///  <========== NEED  ; ON LINE ENDINGS.       
        //    cardImg.getAttribute('src')
        // cardImg.setAttribute('src', `${marData.data.results[savedIndex[o]].images[0].path}/portrait_medium.${marData.data.results[savedIndex[o]].images[0].extension}`)
        }
        console.log(savedTitles)
// var savedSearchBar = document.querySelector('.form-control')
// var savedSearchBtn = document.querySelector('.btn')

// cdebe113bbfe36271d37ef729d7ada15fd5cb3f6
// saved-pages search bar listener
savedSearchBtn.addEventListener('click',function(event){
    event.preventDefault();
    localStorage.setItem('saved-value',JSON.stringify(savedSearchBar.value));
    console.log('working')  ///  <========== NEED  ; ON LINE ENDINGS.   
    document.location.replace('/search.html');
})
}
// getting value of search from saved page and putting it in search bar
if(document.location.pathname == "/search.html" ){
    var savedValue = JSON.parse(localStorage.getItem('saved-value'));
    console.log(savedValue);
    if(savedValue){
        searchBar.value = savedValue
    }
    // event listener for search button
searchBtn.addEventListener('click',function(){
    // removing old search results
    if(document.querySelector('.searchDiv')){
        var listItemCont = document.querySelectorAll('.searchDiv')
        for(var l = 0; l < listItemCont.length; l++){
            listItemCont[l].remove();
        }
    }
    console.log(searchBar.value)
    // calling api with text from search bar
fetch(`https://gateway.marvel.com:443/v1/public/comics?limit=10&title=${searchBar.value}&apikey=${marApiKey}`, {
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
    // appending search results
var showResults = function (data) {
        localStorage.setItem('data',JSON.stringify(data))
    for (var i = 0; i < data.data.results.length; i++) {
        var listItemCont = document.createElement("div");
        var listItemTitle = document.createElement("h2");
        var listItemImg = document.createElement("img");
        listItemCont.setAttribute('class', 'searchDiv');
        listItemCont.style.display = 'flex';
        listItemTitle.textContent = data.data.results[i].title;
        listItemImg.setAttribute('src', data.data.results[i].images[0].path + "/portrait_medium." + data.data.results[i].images[0].extension);
        listItemImg.setAttribute('class', 'search-img');
        listItemImg.setAttribute('id',i);
        listItemTitle.setAttribute('class', 'search-title');
        listItemTitle.setAttribute('id',i);
        searchResults.appendChild(listItemCont);
        listItemCont.appendChild(listItemImg);
        listItemCont.appendChild(listItemTitle);
    }
}
})
// listener for expanding search results
i = searchResults.addEventListener('click', function(event){
    savedBtn.style.display = 'block';
    var amount = 0
    amount++
    if(document.querySelectorAll('#oldLi')){
        oldLi = document.querySelectorAll('#oldLi');
        console.log(oldLi);
        for(var k = 0; k < oldLi.length; k++){
            oldLi[k].remove();
        }
    }
    console.log(event.target)
    console.log(event.target.id)
    var i = event.target.id
     window.i = i
    var data = JSON.parse(localStorage.getItem('data'));
        resultImg.setAttribute('src', data.data.results[i].images[0].path + "/portrait_xlarge." + data.data.results[i].images[0].extension);
        resultTitle.textContent = data.data.results[i].title;
        localStorage.setItem(`${resultTitle.textContent}mar`, JSON.stringify(data))
        for(var j = 0; j < data.data.results[i].creators.items.length; j++){
            var newLi = document.createElement('li')
            newLi.setAttribute('id','oldLi')
             newLi.textContent = `${data.data.results[i].creators.items[j].role}: ${data.data.results[i].creators.items[j].name}`;
             resultCreators.appendChild(newLi);
        }
fetch("https://www.googleapis.com/books/v1/volumes?q="+resultTitle.textContent+"&key=AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo")
.then(function(response){
    console.log(response);
    return response.json();
}).then(function(data){
    console.log(data);
    localStorage.setItem(resultTitle.textContent, JSON.stringify(data))
    if(data.items[0].saleInfo.saleability == "NOT_FOR_SALE"){
        isAvailable.textContent = "Available: No"
    }else{
        isAvailable.textContent = "Available: Yes";
        price.textContent = `price: $${data.items[0].saleInfo.retailPrice.amount}`;
        buy.textContent = `Buy Here: ${data.items[0].saleInfo.buyLink}`;
        // savedBtn.style.display = 'block';
        console.log(i)
    }
     
})
})

console.log(JSON.parse(localStorage.getItem('savedArryTitles')))
// listener for save button
savedBtn.addEventListener('click', function(){
    console.log(i);
    var arryOfIndex = [];
    var arryOfTitles = [];
        var savedArryTitles = JSON.parse(localStorage.getItem('savedArryTitles'))
        var savedArryIndex = JSON.parse(localStorage.getItem('savedArryIndex'))
         if(savedArryTitles != null){
            for(var m = 0; m < savedArryTitles.length; m++){
                arryOfTitles.push(savedArryTitles[m]);
                arryOfIndex.push(savedArryIndex[m])
            }
        }
            arryOfIndex.push(i);
            arryOfTitles.push(resultTitle.textContent);
            localStorage.setItem('savedArryTitles', JSON.stringify(arryOfTitles));
            localStorage.setItem('savedArryIndex', JSON.stringify(arryOfIndex));
            console.log(JSON.parse(localStorage.getItem('savedArryTitles')));
            console.log(JSON.parse(localStorage.getItem('savedArryIndex')));
    document.location.replace('/saved-pages.html');
})
}

//THIS FUNCTION SHOULD BE USED TO CALL ANY CODE THAT NEEDS TO BE CALLED WHEN PAGE IS LOADED
//LOADED SEARCH IS A STRING THAT IS PASSED FROM HOME HTML. USE THIS STRING TO LOAD 
function init(){
var loadedSearch = JSON.parse(localStorage.getItem('home-search'));
console.log(loadedSearch);
}
 init();

