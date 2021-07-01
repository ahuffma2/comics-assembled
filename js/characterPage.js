
/*====================================================================
Program Description: 
  Displays further information about the hero that user selected from 
  home page. The data is retrieved from local storage 

List of TODOs
    1. Have the home button link to the home page: index.html 
        (DONE, completed in character.html through a href)
    2. load character information from local storage
    display the character's name, description, list of comics, image
        (DONE)
    3. Have the other header links connect to their associated pages
    4. Make it look awesome :)
=====================================================================*/ 

// Retrieve data from local storage 
var heroData = JSON.parse(localStorage.getItem('store-character')) || [];
var heroThumnail = document.getElementById('character_img'); 
var heroTitle = document.getElementById('character_name'); 
var heroDescription = document.getElementById('character_info'); 
var heroComicList = document.getElementById('character_comics'); 
// set currentHeroIndex to be the last index from local storage
var currentHeroIndex = heroData.length - 1; 
// Note: we call the last item stored and display its contents 
// assign the character's information to its associated elmeent 
    // img 
    heroThumnail.setAttribute('src', heroData[currentHeroIndex].heroImg);
    // name 
    heroTitle.textContent = heroData[currentHeroIndex].heroName; 
    // description 
    heroDescription.textContent = heroData[currentHeroIndex].heroInfo;
    // get values from comic list by parsing through the string and returning 
    // an array of strings 
    var comicList = JSON.parse(heroData[currentHeroIndex].heroComics);
    // loop through the array and assign the comics to their designated spot on 
    // under noteworthy comics section from HTML 
    for(var i = 0; i < comicList.length; i++)
    {
        var comic_elem = i + "_comics"; 
        var hold_elem = document.getElementById(comic_elem); 
        hold_elem.textContent = comicList[i]; 
    }






