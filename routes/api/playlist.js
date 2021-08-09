const router = require('express').Router()
const { Playlist } = require('../../models');

// GET ALL PLAYLISTS
router.get('/', function (req, res) {
    Playlist.findAll({
        attributes: [
            'id',
            'playlist_name',
            'playlist_artwork'
        ],
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET SPECIFIC PLAYLIST
router.get('/:id', (req, res) => {
    Playlist.findOne({
        where: {
            id: req.params.id
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

// STORES PLAYLIST NAME AND ARTWORK INFO
router.post('/', (req, res) => {
    Playlist.create({
        playlist_name: req.body.playlist_name,
        playlist_artwork: req.body.playlist_artwork
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// UPDATE A PLAYLIST
router.put('/:id', (req, res) => {
    // if req.body has exact key/value pairs to match the model, you can use `req.body` instead
    Playlist.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
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

// DELETE A PLAYLIST
router.delete('/:id', (req, res) => {
    Playlist.destroy({
        where: {
            id: req.params.id
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