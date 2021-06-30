var marApiKey = "4e4e41b9d8095b837f4a41e002121e88"
var googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo"

let popularHeros  = ["Spider-Man", "Hulk","Iron Man", "Wolverine", "Captain America", "Guardians of The Galaxy", "Deadpool"];

//PULL FROM THIS ARRAY TO ASSIGN HEROS TO RANDOM CARDS. CURRENTLY THIS ARRAY WILL ONLY HAVE 3 ELEMENTS PICKED FROM THE NAMES ABOVE
//EX. $('.randomCard1').children('.name').text(randHeroArray[0].Name); where .name is a class with the name associated with it. 
let randHeroArray = [];

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

    let heroObject = {
        Name: "",
        Description: "", 
        Comics: "",
        Thumbnail: ""
    }
    
    console.log(hero);
    heroObject.Name = hero.name;
    heroObject.Description = hero.description;
    heroObject.Thumbnail = hero.thumbnail.path;  
    //NEEDS TO BE COMPLETED  
    //heroObject.Comics = hero.comics (Fetch list of comics here)
  });
}

//Adds it to a hero array to send to random cards on HTML
function getRandomCharacter(sName){
    fetch("https://gateway.marvel.com:443/v1/public/characters?name=" + sName + "&apikey=" + marApiKey, {
        method: 'GET',
        credentials: 'same-origin',
    })
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        //Made this Local because it overrides itself if global
        let heroObject = {
            Name: "",
            Description: "", 
            Comics: "",
            Thumbnail: ""
        }
      var hero = data.data.results[0];  
        //Defines heroObject with attributes from API
        console.log("The Data is Reading: " + hero);
        heroObject.Name = hero.name;
        heroObject.Description = hero.description;
        heroObject.Thumbnail = hero.thumbnail.path; 

        //ADDs to heroArray
        console.log("The heroObject is currently: " + heroObject.Name);
        randHeroArray.push(heroObject); 
        console.log(randHeroArray);
        //NEEDS TO BE COMPLETED  
        //heroObject.Comics = hero.comics (Fetch list of comics here)
      })
      .then 
    }
    
//Every Time this is called it picks a hero and removes it from the pool to ensure that you can't get the same hero twice. Call this every time you want a random hero from the popular hero pool
function randomPool(){
        let randomHero = Math.floor(Math.random()*popularHeros.length);
        return popularHeros.splice(randomHero,1)[0];  
}

getRandomCharacter(randomPool());
getRandomCharacter(randomPool());
getRandomCharacter(randomPool());

