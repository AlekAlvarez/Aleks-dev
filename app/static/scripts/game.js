/*
1. Request Songs
2. Update UI
3. Wait for User to click one
4. Check if User is Right
5. If Right give 2 new choices
6. If wrong End Game
*/
var gameOver = false //Is set to True when the user guesses wrong
let counter = 0

main();

async function main() {
  while (!gameOver) {
    const song1 = await getSong(); //Get song1 object
    let song2 = await getSong();
    while (song2.pop == song1.pop) {
      song2 = await getSong();
    }
    updateScreen(song1, song2);
    console.log(song1.pop, song2.pop);

    const event = await waitForClick();
    const windowWidth = window.innerWidth;
    const clickX = event.clientX;
    let correct;
    if (clickX < windowWidth / 2) {
      console.log("LEFT")
      correct = checkAnswer(song1, song2);
  } else {
    console.log("RIGHT")
      correct = checkAnswer(song2, song1);
  }
    if (correct) {
      console.log("YAY")
      counter = counter + 1
      gameOver = false
    } else {
      gameOver = true
      window.location.href="./static/lose.html";
    }
  }


  

}
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
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }
async function getAPI () {
  const song = await getSong()
}
function updateScreen(song1, song2) {
  const albumCoverLeft = document.getElementById("leftAlbumCover");
  const songTitleLeft = document.getElementById("songNameLeft");
  const songAuthorLeft = document.getElementById("songArtistLeft");

  const albumCoverRight = document.getElementById("rightAlbumCover");
  const songTitleRight = document.getElementById("songNameRight");
  const songAuthorRight = document.getElementById("songArtistRight");
  const currentScore=document.getElementById("current-score");
  // Reset rotation before changing src
  albumCoverLeft.style.transform = 'none';
  albumCoverRight.style.transform = 'none';
  
  songTitleLeft.textContent = song1.name;
  songAuthorLeft.innerHTML = song1.artist;
  albumCoverLeft.setAttribute("src", song1.cover);
  
  songTitleRight.innerHTML = song2.name;
  songAuthorRight.innerHTML = song2.artist;
  albumCoverRight.setAttribute("src", song2.cover);
<<<<<<< HEAD

  // Force a reflow to ensure the rotation starts fresh
  albumCoverLeft.offsetHeight; // Trigger reflow
  albumCoverRight.offsetHeight; // Trigger reflow

=======
  currentScore.innerText=counter;
>>>>>>> 2b3efc4f39a62a6ec8bbb9bfe1218da781ef2978
  setTimeout(() => {
    albumCoverLeft.style.transform = 'rotate(0deg)'; // Example rotation
    albumCoverRight.style.transform = 'rotate(0deg)'; // Example rotation
  }, 50); // Small delay to ensure image has changed
}

function checkAnswer(userGuess, otherOption){
  //If the user is right
  if (userGuess.pop > otherOption.pop) {
    return true
  } else {
    return false
  }
  
}

// Function that returns a Promise, resolving when a click event occurs
function waitForClick() {
  return new Promise((resolve) => {
      document.addEventListener('click', (event) => {
          // Resolve the promise with event information when clicked
          resolve(event);
      }, { once: true }); // once: true ensures the event listener is removed after one click
  });
}