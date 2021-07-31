const router = require('express').Router()
const db = require('../../models');
const SpotifyWebApi = require('spotify-web-api-node');
let bodyArray = [];

// instance of spotify web api node - authorization setting
const spotifyApi = new SpotifyWebApi({

});



// using to test the url code "https://open.spotify.com/playlist/5FOP3Y5BlZvxn06uPL1Heb?si=3ecdae5213074819"



// PLAYLIST DATA TEST PAGE
router.post('/playlist-return-test', function(req, res) {
    console.log(req.body);
    var testPlaylistURL = req.body.url
    var playlistID = testPlaylistURL.slice(34, 56)
        // spotify api get playlist call
    spotifyApi.getPlaylist(playlistID)
        .then(function(data) {

            let infoArray = [];
            let tracksArray = [];
            // let bodyArray = [];
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

        }, function(err) {
            console.log('Something went wrong!', err);
        });
});




module.exports = router;