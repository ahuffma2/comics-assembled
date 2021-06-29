marApiKey = "edf46de39646d3311b0f8ba0c49690ac";
googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo";
var wouldBeSearch = 'shang-chi'
var body = document.querySelector('body')
// cdebe113bbfe36271d37ef729d7ada15fd5cb3f6


// fetch("https://gateway.marvel.com:443/v1/public/characters?apikey="+marApiKey, {
//     method: 'GET',
//     credentials: 'same-origin',
// })
// .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
// https://developer.marvel.com/docs#!/public/getComicIndividual_get_7
    fetch(`https://gateway.marvel.com:443/v1/public/comics?title=${wouldBeSearch}&apikey=${marApiKey}`, {
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
          showResults(data)
      })
      var showResults = function(data){
        for(var i = 0; i < data.data.results.length; i++){
            var listItemCont = document.createElement("div");
            var listItemTitle = document.createElement("h2");
            var listItemImg = document.createElement("img");
            var listItemTxt = document.createElement("p");
            listItemTitle.textContent = data.data.results[i].title;
            listItemImg.setAttribute('src',data.data.results[0].images[0].path+"/portrait_medium."+data.data.results[0].images[0].extension);
            body.appendChild(listItemCont);
            listItemCont.appendChild(listItemTitle);
            listItemCont.appendChild(listItemImg);
            listItemCont.appendChild(listItemTxt);
        }
      }
//   fetch("https://developer.marvel.com/v1/public/getComicsCollection_get_iron_man?apikey=3af84e6f86c225af8f1e1733055b7931", {
//     method: 'GET',
//     credentials: 'same-origin',
// })
// .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
fetch("https://www.googleapis.com/books/v1/volumes?q=iron+inauthor:keyes&key=AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo")
.then(function(response){
    console.log(response)
    return response.json();
}).then(function(data){
    console.log(data);
})