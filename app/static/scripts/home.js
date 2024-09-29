// //import { getToken, getAuthHeader, searchForRandomSong } from "../../Spotify-API/api";
//import React from 'react';
var login=false;
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton"); // Use your button's ID
    startButton.addEventListener("click", function() {
        if(!login){
        login=true;
        window.location.href="/login"
        }
        else{
            window.location.href="../../templates/game.html"
        }
    });
});