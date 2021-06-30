


//========================================================================================================// 
// TODO: 
  // store 5 comics in hero object (DONE)
  // Display 3-4 random heros on cards 
    // For each card, include a 3-Dflip feature 
    // display on each card an title,image, and a link on the front page 
    // displat on each card an title, description, and link on the back page 
  // Include a function that does that for individual heros (DONE)
//=========================================================================================================// 

//===Austin's API key=====// 
  // var marApiKey = "4e4e41b9d8095b837f4a41e002121e88"

//===Clarisse (my) API key====// 
// var marApiKey = "def8c77a7048a4bc502e4987b404b09f"; 
var marApiKey = '4e4e41b9d8095b837f4a41e002121e88';
var googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo"; 

let popularHeros  = ["Spider-Man", "Hulk","Iron Man", "Wolverine", "Captain America", "Guardians of The Galaxy", "Deadpool"];

let heroComicList = [];  

//PULL FROM THIS ARRAY TO ASSIGN HEROS TO RANDOM CARDS. CURRENTLY THIS ARRAY WILL ONLY HAVE 3 ELEMENTS PICKED FROM THE NAMES ABOVE
//EX. $('.randomCard1').children('.name').text(randHeroArray[0].Name); where .name is a class with the name associated with it. 
let randHeroArray = [];

let searchName = "spider-man";

// holds the number of cards randomly generated 
var cardNum = 1; 

/* getCharacter::  
     description : stores each character as an object with the following properties: 
                  name: stores the character name 
                  description: stores the character description 
                  comics: stores all the comcis 
                  thumbnail: store the link to the character's thumbnail
     parameters  : sName
                  sName: type string that holds the character name
*/ 
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
          Comics: [],
          Thumbnail: "", 
          CharacterId: "", 
      }
      
      console.log(hero);
      heroObject.Name = hero.name;
      heroObject.Description = hero.description;
      heroObject.Thumbnail = hero.thumbnail.path + '.jpg'; 
      heroObject.CharacterId = hero.id;  

      //=====retrieving list of comics============================================
        // Diag
        console.log("GOT DATA"); 
        getComicList(heroObject.CharacterId).then(response => console.log(response));
        console.log("PUSHING DATA"); 
        getComicList(heroObject.CharacterId).then(response => heroObject.Comics.push(response)); 
      //====DISPLAY ON CARD======================================================
      // TEMP
      console.log('HERO OBJECT: ', heroObject);
      console.log('HERO OBJECT NAME: ', heroObject.Name); 
      populateCard(heroObject.Name, heroObject.Thumbnail, heroObject.Description); 
      //===clear out array========================================================
        console.log("CLEARING OUT ARRAY"); 
        heroComicList = []; 
    });
  }

/* getRandom Character:: 
     sName: type string that holds the character name 
     purpose: calls the randomPool() that generates a popular random character from the array, popularHeros 
              stores each character as an object with the following properties: 
              name: stores the character name 
              description: stores the character description 
              comics: stores all the comcis 
              thumbnail: store the link to the character's thumbnail
*/ 
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
         
      //=====retrieving list of comics============================================
        // Diag
        console.log("GOT DATA"); 
        getComicList(heroObject.CharacterId).then(response => console.log(response));
        console.log("PUSHING DATA"); 
        getComicList(heroObject.CharacterId).then(response => heroObject.Comics = response); 
        console.log("UPDATED HERO OBJECT"); 
        console.log(heroObject.Comics); 
      //====DISPLAY ON CARD======================================================
        // TODO: call populate 
          populateRandomCards(heroObject, cardNum, heroObject.Name, heroObject.Thumbnail, heroObject.Description); 

      //=====clear out array=========== 
        console.log("CLEARING OUT ARRAY"); 
        heroComicList = []; 
      //======cardNum increment========
        cardNum++; 
      })
      .then
    }
    
//Every Time this is called it picks a hero and removes it from the pool to ensure that you can't get the same hero twice. Call this every time you want a random hero from the popular hero pool
function randomPool(){
        let randomHero = Math.floor(Math.random()*popularHeros.length);
        return popularHeros.splice(randomHero,1)[0];  
}

//TEMP: testing card rn
// getRandomCharacter(randomPool());
// getRandomCharacter(randomPool());
// getRandomCharacter(randomPool());


/*
   getComicList():: 
        description: stores 5 comics associated with each character into a global array and returns it 
                     allows one to access data from a fetch by using return fetch
        parameters: characterId 
*/ 
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
      heroComicList = []; 
      // store at least 5 comics for each character to the global array, heroComicsList 
      for(var i = 0; i < 5; i++)
      {
        heroComicList[i] = data.data.results[i].title;  
      }
      return heroComicList;  
  })
  .catch(error => console.warn(error));
}

/*
   populateCard():: 
         description: populates the card with the character's information such as, 
         name, description, comics, and an image of the character 
         parameters: name, imgLink, description 
*/ 
function populateCard(name, imgLink, description)
{
  var heroName = name; 
  var heroImg = imgLink; 
  var card_title = document.getElementById('title1_Front'); 
  var card_img = document.getElementById('card1_ImgFront');
  var card_description = document.getElementById('description1'); 
  // front of card: name, img
  card_title.textContent = heroName; 
  console.log('NAME: ',heroName ); 
  card_img.setAttribute('src', imgLink);
  // back of card: name, description
  card_description.textContent = description; 
}



/*
   populateRandomCard():: 
         description: populates the card with the character's information such as, 
         name, description, comics, and an image of the random character 
         parameters: heroObject, assignToCardNum
              heroObject: holds the object and properties of the current hero 
              assignToCardNum: keeps track of the the random character generated out of the 5 
                               by doing so, the character can me assigned to a the correct card# 
*/ 
function populateRandomCards(heroObject, assignToCardNum, name, imgLink, description)
{
    console.log("POPULATE RANDOM CARDS "); 
    console.log("NAME: ", heroObject.name); 
    console.log("CARD NUM: ", assignToCardNum); 
    
    if(assignToCardNum == 1)
    {
      var heroName = name; 
      var heroImg = imgLink; 
      var card_title = document.getElementById('title1_Front'); 
      var card_img = document.getElementById('card1_ImgFront');
      var card_description = document.getElementById('description1'); 
      var cardBack_title = document.getElementById('title1_Back'); 
      // front of card: name, img
      card_title.textContent = heroName; 
       // back
       cardBack_title.textContent = heroName; 
      console.log('NAME: ',heroName ); 
      card_img.setAttribute('src', imgLink);
      // back of card: name, description
      card_description.textContent = description; 
    }

     else if(assignToCardNum == 2)
     {
      var heroName = name; 
      var heroImg = imgLink; 
      var card_title = document.getElementById('title2_Front'); 
      var card_img = document.getElementById('card2_ImgFront');
      var card_description = document.getElementById('description2'); 
      var cardBack_title = document.getElementById('title2_Back'); 
      // front of card: name, img
      card_title.textContent = heroName; 
      // back
      cardBack_title.textContent = heroName; 
      console.log('NAME: ',heroName ); 
      card_img.setAttribute('src', heroImg);
      // back of card: name, description
      card_description.textContent = description; 
     }
     else if(assignToCardNum == 3)
     {
        var heroName = name; 
        var heroImg = imgLink; 
        var card_title = document.getElementById('title3_Front'); 
        var card_img = document.getElementById('card3_ImgFront');
        var card_description = document.getElementById('description3'); 
        var cardBack_title = document.getElementById('title3_Back'); 
        // front of card: name, img
        card_title.textContent = heroName;
        // back
        cardBack_title.textContent = heroName; 
        console.log('NAME: ',heroName ); 
        card_img.setAttribute('src', heroImg);
        // back of card: name, description
        card_description.textContent = description; 
     }

}




