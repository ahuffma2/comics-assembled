marApiKey = "edf46de39646d3311b0f8ba0c49690ac";
googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo";
// from index1
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
// from saved-pages
if(document.location.pathname == "/saved-pages.html"){
    var savedTitles = JSON.parse(localStorage.getItem('savedArryTitles'))
        console.log(savedTitles);
        for(var o = 0; o < savedTitles.length; o++){
           var marData = JSON.parse(localStorage.getItem(`${savedTitles[o]}mar`));
           var googData = JSON.parse(localStorage.getItem(savedTitles[o]));
           console.log(marData);
           console.log(googData);
           cardTitle[o].textContent = marData.data.results[o].title
            
        }
// var savedSearchBar = document.querySelector('.form-control')
// var savedSearchBtn = document.querySelector('.btn')

// cdebe113bbfe36271d37ef729d7ada15fd5cb3f6
// saved-pages search bar listener
savedSearchBtn.addEventListener('click',function(event){
    event.preventDefault();
    localStorage.setItem('saved-value',JSON.stringify(savedSearchBar.value));
    console.log('working')
    document.location.replace('/index1.html');
})
}
if(document.location.pathname == "/index1.html" ){
    var savedValue = JSON.parse(localStorage.getItem('saved-value'))
    console.log(savedValue);
    if(savedValue){
        searchBar.value = savedValue
    }
searchBtn.addEventListener('click',function(){
    if(document.querySelector('.searchDiv')){
        var listItemCont = document.querySelectorAll('.searchDiv')
        for(var l = 0; l < listItemCont.length; l++){
            listItemCont[l].remove();
        }
    }
    console.log(searchBar.value)
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

searchResults.addEventListener('click', function(event){
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
    var data = JSON.parse(localStorage.getItem('data'));
        resultImg.setAttribute('src', data.data.results[i].images[0].path + "/portrait_xlarge." + data.data.results[i].images[0].extension);
        resultTitle.textContent = data.data.results[i].title;
        localStorage.setItem(`${resultTitle.textContent}mar`, JSON.stringify(data))
        // var arryOfTitles = []
        // var savedArryTitles = JSON.parse(localStorage.getItem('savedArryTitles'));
        // if(savedArryTitles){
        //     for(var m = 0; m > savedArryTitles.length; m++){
        //         arryOfTitles.push(savedArryTitles[m]);
        //     }
        //     arryOfTitles.push(resultTitle.textContent);
        //     localStorage.setItem('savedArryTitles', JSON.stringify(arryOfTitles));
        // }else if(!savedArryTitles){
        //     arryOfTitles.push(resultTitle.textContent)
        //     localStorage.setItem('savedArryTitles', JSON.stringify(arryOfTitles));
        // }
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
    }
})
})
savedBtn.addEventListener('click', function(){
    var arryOfTitles = []
        var savedArryTitles = JSON.parse(localStorage.getItem('savedArryTitles'));
        if(savedArryTitles){
            for(var m = 0; m > savedArryTitles.length; m++){
                arryOfTitles.push(savedArryTitles[m]);
            }
            arryOfTitles.push(resultTitle.textContent);
            localStorage.setItem('savedArryTitles', JSON.stringify(arryOfTitles));
        }else if(!savedArryTitles){
            arryOfTitles.push(resultTitle.textContent)
            localStorage.setItem('savedArryTitles', JSON.stringify(arryOfTitles));
        }
    document.location.replace('/saved-pages.html');
    if (document.location.pathname = '/saved-pages.html'){
        var savedArryTitles = JSON.parse(localStorage.getItem('savedArryTitles'))
        console.log(savedArryTitles);
        
    }
})
}