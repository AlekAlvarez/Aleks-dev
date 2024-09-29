import requests

from flask import Flask

app = Flask(__name__)
app.secret_key = "53d355f8-571a-490-a310-1f9579440851"

CLIENT_ID = 'd8d8018ff79545c3a7871ee450361b97'
CLIENT_SECRET = '07b5045b76084a56ab4a61359c802c27'
REDIRECT_URL = 'http://localhost:5000/callback'

AUTH_URL = 'https://account.spotify.com/authorize'
TOKEN_URL = 'https://account.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1'


@app.route('/')
def index():
    return "Welcome to my Spotify App <a href='login'>Login with Spotify</a>"

@app.route('/login')
def login():
    scope = 'user-read-private user-read-email'

    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URL,
        'show_dialog': True #
    }