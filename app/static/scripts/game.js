/*
1. Request Songs
2. Update UI
3. Wait for User to click one
4. Check if User is Right
5. If Right give 2 new choices
6. If wrong End Game
*/
var gameOver = false //Is set to True when the user guesses wrong

//while (!gameOver) {
main()
async function main() {
  const song1 = await getSong(); //Get song1 object
  const song2 = await getSong();
  updateScreen(song1, song2);
}
//let song1 = getSong(); //Get song1 object
//let song2 = getSong(); //Get song2 object
//console.log(song1);
//Make sure that song1 and song2 don't have the same popularity score
//while (song2.pop == song1.pop){
//  song2 = getSong()
//}
//Displays the two songs
//updateScreen(song1, song2);
//break;
//}
  //Await for User to click one
  //On Click check if they chose right
  //If they did, increase the counter and display correct score
  //Do fancy animation?
  //Continue into next loop
  //If they did not then do something??



//Returns an object with the keys name, cover, artist, pop, songclip
async function getSong() {
    const url = "http://localhost:5000/playlists";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('This is json');
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }
async function getAPI () {
  const song = await getSong()
}
function updateScreen(song1, song2) {
  console.log(song1);
  const albumCoverLeft = document.getElementById("leftAlbumCover");
  const songTitleLeft = document.getElementById("songNameLeft");
  const songAuthorLeft = document.getElementById("songArtistLeft");

  const albumCoverRight = document.getElementById("leftAlbumCover");
  const songTitleRight = document.getElementById("songNameRight");
  const songAuthorRight = document.getElementById("songArtistRight");
  
  songTitleLeft.textContent = song1.name;
  songAuthorLeft.innerHTML = song1.artist;
  albumCoverLeft.src = song1.cover;
  
  songTitleRight.innerHTML = song2.name;
  songAuthorRight.innerHTML = song2.artist;
  albumCoverRight.src = song2.cover;
}

function checkAnswer(userGuess, otherOption){
  //If the user is right
  if (userGuess.pop > otherOption.pop) {

  } else {
    gameOver = True
  }
  
}
leftChoice=false;
rightChoice=false;
left=document.getElementById("leftHover")
right=document.getElementById("rightHover")
left.addEventListener("click",()=>{
    leftChoice=true;
});
right.addEventListener("click",()=>{
    rightChoice=true;
});