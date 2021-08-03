const SpotifyWebApi = require('spotify-web-api-node');
const router = require('express').Router();

// .env file access
require('dotenv').config()

// declaring keys
const redirectUri = process.env.REDIRECT_URI;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const scopes = ['user-read-private', 'user-read-email']

// instance of spotify web api node - authorization setting
const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

// Routes
// =============================================================

// SPOTIFY AUTHENTICATION
router.get('/spotify-auth', function (req, res) {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));

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

            // CHANGE TO RETURN PAGE //
            res.redirect('/search');

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

// SPOTIFY PLAYLIST CALL - PASSING IN ID FROM QUERY IN SEARCH.HANDLEBARS
router.get('/spotify-playlist/:id', function (req, res) {

    const playlistIdReq = req.params.id;

    // spotify api get playlist call
    spotifyApi.getPlaylist(playlistIdReq)
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

module.exports = router;