// USING THE SPOTIFY WEB API NODE PACKAGE FOR COMPILED METHODS
// 
// 
const SpotifyWebApi = require('spotify-web-api-node');

// requirements
const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const exphbs = require('express-handlebars');

// hardcoded url for testing
var testPlaylistURL = "https://open.spotify.com/playlist/5FOP3Y5BlZvxn06uPL1Heb?si=3ecdae5213074819"
var playlistID = testPlaylistURL.slice(34, 56)

const app = express()

// .env file access
require('dotenv').config()

// setting Handlebars as the default template engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// path setting
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

// instance of spotify web api node - authorization setting
const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

// HOMEPAGE
app.get('/', (req, res) => {
    res.render('landing');
})

// SPOTIFY AUTHENTICATION
app.get('/spotify-auth', function (req, res) {
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
            // res.send('Success! You can now close the window.');

            res.redirect('/playlist-return-test');

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

// PLAYLIST DATA TEST PAGE
app.get('/playlist-return-test', function (req, res) {

    // spotify api get playlist call
    spotifyApi.getPlaylist(playlistID)
        .then(function (data) {

            let infoArray = [];
            let tracksArray = [];
            let bodyArray = [];
            let playlistTrackAmount = data.body.tracks.items;
            let playlistName = data.body.name;
            let playlistArtworkURL = data.body.images[0].url;


            let body = {
                body: bodyArray
            };

            let playlistObj = {
                info: infoArray,
                tracks: tracksArray
            };

            let infoObj = {
                name: playlistName,
                artwork: playlistArtworkURL
            };

            for (var i = 0; i < playlistTrackAmount.length; i++) {

                let track = {
                    id: i,
                    author: 'author',
                    title: 'title',
                }

                track.author = data.body.tracks.items[i].track.name;

                track.title = data.body.tracks.items[i].track.album.artists[0].name;

                playlistObj.tracks.push(track);
            };

            playlistObj.info.push(infoObj);

            bodyArray.push(playlistObj);

            res.send(body);

        }, function (err) {
            console.log('Something went wrong!', err);
        });
});

// CREATE ACCOUNT PAGE
app.get('/create-account', function (req, res) {

});

// PLAYLIST LIBRARY PAGE
app.get('/playlist-library', function (req, res) {

});

// PLAYLIST DISPLAY PAGE
app.get('/playlist-display', function (req, res) {

});

// SERVER LISTEN
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});