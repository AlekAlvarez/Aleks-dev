import { getToken, getAuthHeader, searchForRandomSong } from "../../Spotify-API/api";

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton"); // Use your button's ID
    startButton.addEventListener("click", function() {
        window.location.href = "../game/game.html"; // Navigate to the game page
        startGame();
    });




});