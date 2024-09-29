// //import { getToken, getAuthHeader, searchForRandomSong } from "../../Spotify-API/api";
//import React from 'react';
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton"); // Use your button's ID
    startButton.addEventListener("click", function() {
        alert("1")
        window.location.href=fetch('login')
        alert(window.location.href)
    });
});