

//========================================================================================================// 
/*
  Program Description: 
     Displays 3 random popular heros for each card. 
     The card includes a 3-D flip feature along with character information. 
     A hero name, description, and image is displayed on each card. 
     When the user hovers over the card, a description and button is shown. 
     If the user clicks the button, the hero's information is stored to 
     local storage and a character page is shown. 
     For effeciency, local storage is cleared upon reload of the home page 
     and is populated with the updated random cards. 
*/ 
//=========================================================================================================// 

//===Austin's API key=====// 
  // var marApiKey = "4e4e41b9d8095b837f4a41e002121e88"
      //apiKey2 = 3bcba8bc6d2f52a4b58f5f734276cccc

//===Clarisse (my) API key====// 
// var marApiKey = "def8c77a7048a4bc502e4987b404b09f"; 
var marApiKey = 'def8c77a7048a4bc502e4987b404b09f';
var googApiKey = "AIzaSyByKID-Pms4SKTlX4WF_XJG566FbLtAYfo"; 

let popularHeros  = ["Spider-Man", "Hulk","Iron Man", "Wolverine", "Captain America", "Guardians of The Galaxy"];

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

      //=====Retrieving list of comics============================================
        // Diag
        console.log("GOT DATA"); 
        getComicList(heroObject.CharacterId).then(response => console.log(response));
        console.log("PUSHING DATA"); 
        getComicList(heroObject.CharacterId).then(response => heroObject.Comics.push(response)); 
      //====DISPLAY ON CARD======================================================
      console.log('HERO OBJECT: ', heroObject);
      console.log('HERO OBJECT NAME: ', heroObject.Name); 
      populateCard(heroObject.Name, heroObject.Thumbnail, heroObject.Description); 
      //===Clear out array========================================================
        console.log("CLEARING OUT ARRAY"); 
        heroComicList = []; 
      //===Store character info===================================================
      document.getElementById('btn-1').onclick = function()
      {
        storeHero(heroObject.Name,heroObject.Description, heroObject.Thumbnail,heroObject.Comics, heroObject.CharacterId); 
        window.location = "character.html"; 
      }; 

    });
  }

// TODO: uncomment when you need to test a particular character 
//getCharacter('Hulk'); 


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

          populateRandomCards(heroObject, cardNum, heroObject.Name, heroObject.Thumbnail, heroObject.Description); 

      //=====clear out array=========== 
        console.log("CLEARING OUT ARRAY"); 
        heroComicList = [];   

      //===========Store Character Info==
      console.log('CARD NUM: '+ cardNum); 
        document.getElementById('btn-'+cardNum).onclick = function()
        {
          storeHero(heroObject.Name,heroObject.Description, heroObject.Thumbnail, heroObject.Comics, heroObject.CharacterId); 
          window.location = "character.html"; 
        };  
      //======cardNum increment==========
        cardNum++;  

      })
    }
    
//Every Time this is called it picks a hero and removes it from the pool to ensure that you can't get the same hero twice. Call this every time you want a random hero from the popular hero pool
function randomPool(){
        let randomHero = Math.floor(Math.random()*popularHeros.length);
        return popularHeros.splice(randomHero,1)[0];  
}


 // remove the card data from the local storage when a new batch of cards are generated 
 console.log('REMOVING DATA FOR CHARACTERS FROM LOCAL STORAGE ')
 // TODO: diag 
 //localStorage.removeItem('store-character');
//TODO: comment when not testing random card 
//  getRandomCharacter(randomPool());
//  getRandomCharacter(randomPool());
//  getRandomCharacter(randomPool());


/*
   getComicList:: 
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
   populateCard:: 
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
  // cardHeight();
}

/*
    populateRandomCards:: 
      description: populates the card with the character's information such as, 
      name, description, comics, and an image of the random character 
      parameters: heroObject, assignToCardNum
      heroObject: holds the object and properties of the current hero 
      assignToCardNum: keeps track of the the random character generated out of the 5 
      by doing so, the character can me assigned to a the correct card# 
*/ 
function populateRandomCards(heroObject, cardNum, name, imgLink, description)
{
    // console.log("POPULATE RANDOM CARDS "); 
    // console.log("NAME: ", heroObject.name); 
    // console.log("CARD NUM: ", cardNum); 
    
      var heroName = name; 
      var heroImg = imgLink; 
      var card_title = document.getElementById('title'+cardNum+'_Front'); 
      var card_img = document.getElementById('card'+ cardNum +'_ImgFront');
      var card_description = document.getElementById('description'+cardNum); 
      var cardBack_title = document.getElementById('title'+cardNum+'_Back'); 
      // front of card: name, img
      card_title.textContent = heroName; 
       // back
      cardBack_title.textContent = heroName; 
      console.log('NAME: ',heroName ); 
      card_img.setAttribute('src', imgLink);
      // back of card: name, description
      card_description.textContent = description; 
      // cardHeight();
}


/*
   storeHero::
      description: stores the information about the hero selected to local storage 
      parameters: name, description, imgLink, comics, characterId
*/ 
function storeHero(name, description, imgLink, comics, characterId){
  // check if item is in local storage, otherwise create an empty array 
  var store_character = JSON.parse(localStorage.getItem('store-character')) || [];
  // stringify array of comics 
  comics = JSON.stringify(comics); 
  store_character.push({
     heroName: name, 
     heroInfo: description, 
     heroImg: imgLink, 
     heroComics: comics, 
     heroId: characterId
  });
  console.log("Stored Character Info: ", store_character);
  localStorage.setItem('store-character', JSON.stringify(store_character));
}


//THIS FUNCTION GOES TO THE SEARCH PAGE AND SENDS WHATEVER SEARCH RESULT ALONG WITH IT
let searchBtn = $('.my-sm-0');
let searchReq = '';

searchBtn.click(function (){
  searchReq = $('.mr-sm-2').val();
  localStorage.setItem('home-search',JSON.stringify(searchReq));
  console.log('I STORED SOMETHING TO LOCAL STORAGE');
  $(location).attr('href','search.html');
});

