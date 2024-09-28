#Must run command prompts to download dotenv and requests
#dotenv - python3 -m pip install python-dotenv
#requests - python3 -m pip install requests

from dotenv import load_dotenv
import os
import base64
from requests import post, get
import json
from random import randint, choice

#Loads the .env file with the client ID and Client Secret
load_dotenv()
#Gets Client ID & secret from .env file
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

#Gets Authorization token to use spotify API
# ! The authorization token is only valid for a limited time so we may have to set up a program that renews the authorization code before it expires
def get_token():
    auth_string = client_id + ':' + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes).decode("utf-8"))

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def search_for_random_song(token):
    #Searches a random letter
    search_term = choice('abcdefghijklmnopqrstuvwxyz')
    #This randomizes which search result we get
    offset = randint(0, 100)
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={search_term}&type=track&limit=1&offset={offset}"


    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)
    #Song info is a dictionary with the keys [album, artists, disc_number, duration_ms, explicit, external_ids, external_urls, href, id, is_local, name, popularity, preview_url, track_number, type, uri]
    song_info = json_result["tracks"]["items"][0]
    print(song_info["name"], song_info['popularity'])

token = get_token()
search_for_random_song(token)