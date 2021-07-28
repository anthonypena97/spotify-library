// requirements
const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const exphbs = require('express-handlebars');

var testPlaylistURL = "https://open.spotify.com/playlist/5FOP3Y5BlZvxn06uPL1Heb?si=3ecdae5213074819"
var playlistID = testPlaylistURL.slice(34, 56)

const app = express()

// .env file access
require('dotenv').config()

// Setting Handlebars as the default template engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

// declaring keys
const redirectUri = process.env.REDIRECT_URI;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const port = process.env.PORT;

// state key generation
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const scopes = ['user-read-private', 'user-read-email']
var state = generateRandomString(16);

const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

// HOMEPAGE
app.get('/', (req, res) => {
    res.render('landing');
})

// LOGIN PAGE
app.get('/login', function (req, res) {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// CALLBACK PAGE
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.send('Success! You can now close the window.');

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});

// ELVIS DATA TEST
app.get('/elvis-albums', function (req, res) {
    // Get Elvis' albums

    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 1 }).then(
        function (data) {
            console.log('Artist albums', data.body);
            console.log('Album', data.body.items);
            res.send(data.body.items[0].name);
        },
        function (err) {
            console.error(err);
        }
    );
});

// SERVER LISTEN
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})