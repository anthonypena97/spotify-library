const { spotifyApi, playlistArray } = require('sequelize');





router.put('/songs/title', (req, res) => {
    db.Playlist.update({
        author: req.body.author,
    }, {
        where: {
            author: req.body.author
        }
    }).then(dbPlaylist => {
        res.json(dbPlaylist)
    });
});

router.put('/songs/author', (req, res) => {
    db.Playlist.update({
        songs_title: req.body.songs_title,
    }, {
        where: {
            songs_title: req.body.songs_title
        }
    }).then(dbPlaylist => {
        res.json(dbPlaylist)
    });
});




module.exports = router;