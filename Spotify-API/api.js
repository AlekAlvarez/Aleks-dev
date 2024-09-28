// Must run command prompts to download dotenv and axios
// dotenv - npm install dotenv
// axios - npm install axios

require('dotenv').config();
const axios = require('axios');

// Gets Client ID & secret from .env file
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// Gets Authorization token to use Spotify API
// ! The authorization token is only valid for a limited time so we may have to set up a program that renews the authorization code before it expires
async function getToken() {
    const authString = `${client_id}:${client_secret}`;
    const authBase64 = Buffer.from(authString).toString('base64');

    const url = "https://accounts.spotify.com/api/token";
    const headers = {
        "Authorization": `Basic ${authBase64}`,
        "Content-Type": "application/x-www-form-urlencoded"
    };
    const data = new URLSearchParams({ "grant_type": "client_credentials" });

    const result = await axios.post(url, data, { headers });
    const token = result.data.access_token;
    return token;
}

function getAuthHeader(token) {
    return { "Authorization": `Bearer ${token}` };
}

async function searchForRandomSong(token) {
    // Searches a random letter
    const searchTerm = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random letter a-z
    // This randomizes which search result we get
    const offset = Math.floor(Math.random() * 101);
    const url = "https://api.spotify.com/v1/search";
    const headers = getAuthHeader(token);
    const query = `?q=${searchTerm}&type=track&limit=1&offset=${offset}`;

    const queryUrl = url + query;
    const result = await axios.get(queryUrl, { headers });
    const songInfo = result.data.tracks.items[0];
    console.log(songInfo.album.images[0].url);
    return songInfo;
}

(async () => {
    const token = await getToken();
    await searchForRandomSong(token);
})();
