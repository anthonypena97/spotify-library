const router = require('express').Router();
const { Playlist, Songs } = require('../../models');

// GET ALL SONGS
router.get('/', function (req, res) {
    Songs.findAll({
        attributes: [
            'id',
            'song_title',
            'artist',
            'playlist_id'
        ],
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST NEW SONGS
router.post('/', function (req, res) {
    Songs.create({
        song_title: req.body.song_title,
        artist: req.body.artist,
        playlist_id: req.body.playlist_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET SONG WHITH SAME PLALIST ID

router.get('/playlist/:id', function (req, res) {
    Songs.findAll({
        where: {
            playlist_id: req.params.id
        },
        attributes: [
            'id',
            'song_title',
            'artist',
            'playlist_id'
        ],
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE SONGS WITHIN THE SAME PLAYLIST_ID
router.delete('/playlist/:id', (req, res) => {
    Songs.destroy({
        where: {
            playlist_id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;