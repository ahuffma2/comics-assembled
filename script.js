


//========================================================================================================// 
// TODO: 
// store 5 comics in hero object (DONE)
// Upload a picture that has a dropdown feature 
// display the character information  
// Upload a picture that has a dropdown feature 
// display the comic information on dropdown 

// var marApiKey = "4e4e41b9d8095b837f4a41e002121e88"
var marApiKey = "def8c77a7048a4bc502e4987b404b09f"; 
var googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo"; 

let popularHeros  = ["Spider-Man", "Hulk","Iron Man", "Wolverine", "Captain America", "Guardians of The Galaxy", "Deadpool"];

let heroComicList = [];  

//PULL FROM THIS ARRAY TO ASSIGN HEROS TO RANDOM CARDS. CURRENTLY THIS ARRAY WILL ONLY HAVE 3 ELEMENTS PICKED FROM THE NAMES ABOVE
//EX. $('.randomCard1').children('.name').text(randHeroArray[0].Name); where .name is a class with the name associated with it. 
let randHeroArray = [];

let searchName = "spider-man";


//Adds it to a hero array to send to random cards on HTML
function getRandomCharacter(sName){
    fetch("https://gateway.marvel.com:443/v1/public/characters?name=" + sName + "&apikey=" + marApiKey, {
        method: 'GET',
        credentials: 'same-origin',
        // ts: ts,
        // hash: hash
    })
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        //Made this Local because it overrides itself if global
        let heroObject = {
            Name: "",
            Description: "", 
            Comics: [],
            Thumbnail: "", 
            CharacterId: ""
        }
      var hero = data.data.results[0];  
        //Defines heroObject with attributes from API
        console.log("The Data is Reading: " + hero);
        heroObject.Name = hero.name;
        heroObject.Description = hero.description;
        // ADD jpg to ensure that thumbnail link works 
        heroObject.Thumbnail = hero.thumbnail.path + ".jpg"; 
        // UPDATES CharacterId 
        console.log("HERO ID:", hero.id); 
        heroObject.CharacterId = hero.id; 
        //ADDs to heroArray
        console.log("The heroObject is currently: " + heroObject.Name);
        randHeroArray.push(heroObject); 
        console.log(randHeroArray);
        // get the comic titles for each character 
        // getComicInfo(heroObject.CharacterId); 
        // // PUSH 5 comics associated with each character 
        // for(var i = 0; i < heroComicList.length; i++)
        // {
        //   heroObject.Comics.push(heroComicList[i]); 
        //   // Diag to see if it pushes to comic-book array 
        //   console.log("LIST OF 5 COMICS: ", heroObject.Comics); 
        // }
        // // clear array before next call 
        //  heroComicList = []; 
         //=================================================
         console.log("GOT DATA"); 
         getComicList(heroObject.CharacterId).then(response => console.log(response));
         console.log("PUSHING DATA"); 
         getComicList(heroObject.CharacterId).then(response => heroObject.Comics.push(response)); 
      })
      .then
    }
    
// Every Time this is called it picks a hero and removes it from the pool to ensure that you can't get the same hero twice. Call this every time you want a random hero from the popular hero pool
function randomPool(){
        let randomHero = Math.floor(Math.random()*popularHeros.length);
        return popularHeros.splice(randomHero,1)[0];  
}

getRandomCharacter(randomPool());
getRandomCharacter(randomPool());
getRandomCharacter(randomPool());

// // Attempt 1 
// function getComicInfo(characterId)
// {
//   var comicTitle = ""; 
//   var comicUrl = "https://gateway.marvel.com:443/v1/public/characters/" + characterId + "/comics?apikey=" + marApiKey; 
//     fetch(comicUrl, {
//       method: 'GET',
//       credentials: 'same-origin',
//   })
//   .then(function (response) {
//       console.log("COMIC INFO RESPONSE"); 
//       return response.json();
//     })
//     .then(function (data) {
//       // TODO: ACCESS the following: results[0], results[1], results[2], results[3], results[4]
//       var comic = data.data.results[0];  
//       console.log("COMIC TITLE:", comic.title); 
//       comicTitle = comic.title; 
//       console.log("RETURN COMIC TITLE: ", comicTitle);
//       return comicTitle;  
//     })
//     .then(function(comicList) 
//     {
//       // TODO: LOOP THROUGH ARRAY AND POPULATE WITH 5 COMICS 
//        heroComicList.push(comicList); 
//        for (var i = 0; i < heroComicList.length; i++)
//        {
//          console.log('heroComicList[' + i + ']' + ' = ' + heroComicList[i]); 
//        }
//        return heroComicList; 
//     })
    
  

// }


// Attempt2

function getComicList(characterId){
  var comicUrl = "https://gateway.marvel.com:443/v1/public/characters/" + characterId + "/comics?apikey=" + marApiKey; 
  return fetch(comicUrl,
  {
    method: "GET",
    credentials: 'same-origin',
  })
  .then((response) => response.json())
  .then((data) => {
    var comic = data.data.results[0];  
      console.log("COMIC TITLE:", comic.title); 
      comicTitle = comic.title; 
      console.log("RETURN COMIC TITLE: ", comicTitle);
      return comicTitle;  
  })
  .catch(error => console.warn(error));
}










