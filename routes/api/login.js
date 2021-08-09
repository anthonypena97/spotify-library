const router = require('express').Router();
const db = require('../../models');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const exphbs = require('express-handlebars');


// declaring keys
const redirectUri = process.env.REDIRECT_URI;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;



// state key generation
// var generateRandomString = function(length) {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// };

// const scopes = ['user-read-private', 'user-read-email']
// var state = generateRandomString(16);


// // instance of spotify web api node - authorization setting
// const spotifyApi = new SpotifyWebApi({
//     redirectUri: redirectUri,
//     clientId: clientId,
//     clientSecret: clientSecret
// });

// // SPOTIFY AUTHENTICATION
// router.get('/spotify-auth', function(req, res) {
//     res.redirect(spotifyApi.createAuthorizeURL(scopes));
//     // need to save it so we can use it in other routes

// });

// // CALLBACK PAGE IDK WHY ITS NOT WORKING MAYBE CAUSE THE TOKENS ARENT SET UP YET
// router.get('api/login/callback', (req, res) => {
//     const error = req.query.error;
//     const code = req.query.code;
//     const state = req.query.state;

//     if (error) {
//         console.error('Callback Error:', error);
//         res.send(`Callback Error: ${error}`);
//         return;
//     }

//     spotifyApi
//         .authorizationCodeGrant(code)
//         .then(data => {
//             const access_token = data.body['access_token'];
//             const refresh_token = data.body['refresh_token'];
//             const expires_in = data.body['expires_in'];

//             spotifyApi.setAccessToken(access_token);
//             spotifyApi.setRefreshToken(refresh_token);

//             console.log('access_token:', access_token);
//             console.log('refresh_token:', refresh_token);

//             console.log(
//                 `Sucessfully retreived access token. Expires in ${expires_in} s.`
//             );
//             // res.send('Success! You can now close the window.');

//             res.redirect('api/spotify/playlist-return-test');

//             setInterval(async() => {
//                 const data = await spotifyApi.refreshAccessToken();
//                 const access_token = data.body['access_token'];

//                 console.log('The access token has been refreshed!');
//                 console.log('access_token:', access_token);
//                 spotifyApi.setAccessToken(access_token);
//             }, expires_in / 2 * 1000);

//         })
//         .catch(error => {
//             console.error('Error getting Tokens:', error);
//             res.send(`Error getting Tokens: ${error}`);
//         });
// });





// CREATE ACCOUNT PAGE THIS CREATES A USER LOGIN IF ITS DONE RIGHT MIGHT HAVE TO RE LOOK AT IT
router.post('/create-account', (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(db.UserLogin, () => {
            req.session.save(() => {
                req.session.username = db.UserLogin.username;
                req.session.password = db.UserLogin.password;
                req.session.loggedIn = true

                req.json(db.UserLogin)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
});



// this gets all users in a list we dont need it idk made it just in case
router.get('/allUsers', async(req, res) => {
    try {
        const allUser = await db.UserLogin.findAll({
            attributes: { exclude: ['password', 'token_for_user'] }
        })
        res.json(allUser)


    } catch (error) {
        res.status(400).json(error)
    }

})









module.exports = router;