// //import { getToken, getAuthHeader, searchForRandomSong } from "../../Spotify-API/api";
//import React from 'react';
var login=false;
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton"); // Use your button's ID
    startButton.addEventListener("click", async function() {
        //login =await fetch('/loggedin');
      //  console.log(login)
        if(!login){
        //login=true;
        window.location.href="/login"
        }
    });
});