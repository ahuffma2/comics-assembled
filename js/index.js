var marApiKey = "4e4e41b9d8095b837f4a41e002121e88"
var googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo"

let popularHeros  = ["Spider-Man", "Hulk","Iron Man", "Avengers", "Wolverine", "Captain America", "Guardians of The Galaxy", "Deadpool"];

let heroObject = {
    Name: "",
    Description: "", 
    Comics: "",
    Thumbnail: ""
}

let searchName = "spider-man";

function getCharacter(sName){
fetch("https://gateway.marvel.com:443/v1/public/characters?name=" + sName + "&apikey=" + marApiKey, {
    method: 'GET',
    credentials: 'same-origin',
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var hero = data.data.results[0];

      console.log(data);
    console.log(hero);
    
    heroObject.Name = hero.name;
    heroObject.Description = hero.description;
    heroObject.Thumbnail = hero.thumbnail.path;
    //NEEDS TO BE COMPLETED  
    //heroObject.Comics = hero.comics (Fetch list of comics here)
  })
  .then 

}
  console.log(heroObject);
