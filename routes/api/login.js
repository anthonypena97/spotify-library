const router = require('express').Router();
const db = require('../../models');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const exphbs = require('express-handlebars');


// declaring keys
const redirectUri = process.env.REDIRECT_URI;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const port = process.env.PORT;



// state key generation
var generateRandomString = function(length) {
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

// SPOTIFY AUTHENTICATION
router.get('/spotify-auth', function(req, res) {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
    // need to save it so we can use it in other routes

});

// CALLBACK PAGE
router.get('/callback', (req, res) => {
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

            setInterval(async() => {
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





// CREATE ACCOUNT PAGE
router.get('/create-account', function(req, res) {

});



module.exports = router, spotifyApi;