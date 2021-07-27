const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express()
const port = 8889

// // credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '47002157dbc149a2a3ea1ccacd978bd3',
    clientSecret: '818e5aba42ee47b69482fd4acd4c73cb',
    redirectUri: 'http://localhost:8888/callback/'
});

var accessToken = 'BQDxNjVAp7N63IfBHZDHtsGaHkrU8aRgnAegEYuHjOGxv0GB-ayNSR01mlb5-e1OrjvJ7Vg-16RSzY3Y_0PPZe7D8DrS_enGmjtGP_3ExtR_rkCC4Ot7t_ncLP9qgAgbfX70uaYF4lazAXcHmfkH8Wz0nBQEzhyREHCZaa5vAA'

spotifyApi.setAccessToken(accessToken);

// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 50 }).then(
    function (data) {
        console.log('Artist albums', data.body);
    },
    function (err) {
        console.error(err);
    }
);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})