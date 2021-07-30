const router = require("express").Router();
const { Playlist, PlaylistSongs } = require('../../models')

let playlistArray = []


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
app.get('/login', function(req, res) {
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



// PLAYLIST DATA TEST
app.get('/playlist', function(req, res) {
    // Get a User ' albums

    spotifyApi.getPlaylist(playlistID)
        .then(function(data) {

            // let playlistArray = []

            let playlistTrackAmount = data.body.tracks.items;
            // console.log(playlistTrackAmount.length);

            for (var i = 0; i < playlistTrackAmount.length; i++) {

                let playlistTracksTitle = data.body.tracks.items[i].track.name;

                let playlistTracksArtist = data.body.tracks.items[i].track.album.artists[0].name;

                let playlistData = playlistTracksTitle + " - " + playlistTracksArtist;

                playlistArray.push(playlistData)
            }

            res.send(playlistArray);

        }, function(err) {
            console.log('Something went wrong!', err);
        });

});



router.put('/playlist/name', (req, res) => {
    db.Playlist.update({
        playlist_name: playlistArray[0].playlist_name,
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbPlaylist => {
        res.json(dbPlaylist)
    });
});

module.exports(spotifyApi, playlistArray, router);