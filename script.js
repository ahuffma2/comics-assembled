marApiKey = "edf46de39646d3311b0f8ba0c49690ac";
googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo";
var wouldBeSearch = 'iron_man'
// cdebe113bbfe36271d37ef729d7ada15fd5cb3f6


fetch("https://gateway.marvel.com:443/v1/public/characters?apikey="+marApiKey, {
    method: 'GET',
    credentials: 'same-origin',
})
.then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
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
fetch("https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo")
.then(function(response){
    console.log(response)
    return response.json();
}).then(function(data){
    console.log(data);
})