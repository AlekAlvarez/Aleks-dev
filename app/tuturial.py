import requests
import urllib.parse

from datetime import datetime, timedelta
from flask import Flask, redirect, request, jsonify, session, render_template
from random import randint, choice
high_score=0

app = Flask(__name__,template_folder="./templates")
app.secret_key = "53d355f8-571a-490-a310-1f9579440851"

CLIENT_ID = 'd8d8018ff79545c3a7871ee450361b97'
CLIENT_SECRET = '07b5045b76084a56ab4a61359c802c27'
REDIRECT_URL = 'http://localhost:5000/callback'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1'

@app.route('/')
def index():
    #Flask load example
    return render_template('./home.html')

@app.route('/login')
def login():
    scope = 'user-read-private user-read-email'

    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URL,
        'show_dialog': True #Delete after you know its working
    }
    loggedIn=True
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"

    return redirect(auth_url)
    @app.route("/loggedin")
    def loggedIn():
        return loggedIn

@app.route('/callback')
def callback():
    if 'error' in request.args:
        return jsonify({"error": request.args['error']})
    
    if 'code' in request.args:
        req_body = {
            'code': request.args['code'],
            'grant_type': "authorization_code",
            'redirect_uri': REDIRECT_URL,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

        response = requests.post(TOKEN_URL, data=req_body)
        token_info = response.json()
        
        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']
        return render_template("./game.html")
    
@app.route('/playlists')
def get_playlists():
    if 'access_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        return redirect('./refresh_token')
    
    headers = {
        'Authorization': f"Bearer {session['access_token']}",
        "grant_type": 'client_credentials'
    }

    #Searches a random letter
    search_term = choice('abcdefghijklmnopqrstuvwxyz')
    #This randomizes which search result we get
    offset = randint(0, 50)
    url = "https://api.spotify.com/v1/search"
    query = f"?q={search_term}&type=track&limit=1&offset={offset}"

    query_url = url + query
    result = requests.get(query_url, headers=headers)
    print("HERE", result)
    json_result = result.json()
    #Song info is a dictionary with the keys [album, artists, disc_number, duration_ms, explicit, external_ids, external_urls, href, id, is_local, name, popularity, preview_url, track_number, type, uri]
    song_info = json_result["tracks"]["items"][0]
    song = {
        'name': song_info['name'],
        'cover': song_info["album"]['images'][0]['url'],
        'artist': song_info['artists'][0]['name'],
        'pop': song_info['popularity'],
        'songClip': song_info['preview_url'],
    }
    print(song)

    return jsonify(song)

@app.route('/refresh-token')
def refresh_token():
    if 'refresh_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        req_body = {
            'grant_type': 'authorization_code',
            'refresh_token': session['refresh_token'],
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

        response = requests.post(TOKEN_URL, data=req_body)
     
        new_token_info = response.json()

        session['access_token'] = new_token_info['access_token']
        session['expires_at'] = datetime.now().timestamp() + new_token_info['expires_in']

        return redirect('/playlists')

@app.route('/loser')
def loser():
    return render_template('lose.html')

@app.route('/play-again')
def play_again ():
    return render_template('game.html')

@app.route("/college-songs")
def college_songs():
    if 'access_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        return redirect('./refresh_token')
    
    headers = {
        'Authorization': f"Bearer {session['access_token']}"
    }
    url = "https://api.spotify.com/v1/albums/0lI2kTmpOQzgIJzFu5MGel?si=Nm52RWuyQyCSsGfuI0Os8A/tracks"
    result = requests.get(url, headers=headers)
    json_result = result.json()
    tracks=json_result["total"]
    song=randint(tracks)
    songs=json_result["items"][song]
    s = {
        'name': songs['name'],
        'cover': songs["album"]['images'][0]['url'],
        'artist': songs['artists'][0]['name'],
        'pop': songs['popularity'],
        'songClip': songs['preview_url']
    }
    print(s)
    return jsonify(s)
@app.route("/high_score",methods=['POST'])
def high_score():
    high_score=requests.data
@app.route("/high_score",methods=["GET"])
def get_high():
    return high_score
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)