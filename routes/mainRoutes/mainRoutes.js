const router = require('express').Router();
const { Playlist, Songs } = require('../../models');
const { post } = require('../api');

// HOMEPAGE
router.get('/', (req, res) => {
    res.render('landing');
})

// SEARCH
router.get('/search', (req, res) => {
    res.render('search');
})

// CREATE ACCOUNT PAGE
router.get('/login', function (req, res) {
    res.render('login');
});

// CREATE CONFIRMATION
router.get('/confirmation', function (req, res) {
    res.render('confirmation');
});

// PLAYLIST LIBRARY PAGE
router.get('/library', function (req, res) {
    Playlist.findAll({
        attributes: [
            'id',
            'playlist_name',
            'playlist_artwork'
        ]
    })
        .then(dbLibraryData => {
            playlist = dbLibraryData.map(playlist => playlist.get({ plain: true }));
            console.log(playlist);
            res.render('library', { playlist });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PLAYLIST DISPLAY PAGE
router.get('/playlist', function (req, res) {
    res.render('playlist');
});

module.exports = router;