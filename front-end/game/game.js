/*
1. Request Songs
2. Update UI
3. Wait for User to click one
4. Check if User is Right
5. If Right give 2 new choices
6. If wrong End Game
*/






function playGame () {
    //Startup Processes
    /*
    1. Get 2 songs (must have different popularity scores)
    2. Update 
    */
   let gameOver = false
   
   let song1 = getSong(); //Get song 2
   let song2 = getSong(); //Get song 2

   while(gameOver == false) {
    
   }
}

function getSong () {

}

function updateSong (song) {
    const albumCover = document.getElementById("leftAlbumCover");
    const songTitle = '';
    const songAuthor = '';

    albumCover.setAttribute("src",song.cover);
    
}

function updateImage2 () {
    
}