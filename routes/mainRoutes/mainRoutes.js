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
router.get('/playlist/:id', function (req, res) {

    console.log(req.params.id);

    // res.render('playlist')

    // let playlistId = req.params.id;

    // console.log(playlistId)

    Playlist.findAll({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'playlist_name',
            'playlist_artwork'
        ]
    })
        .then(dbLibraryData => {
            playlist = dbLibraryData.map(playlist => playlist.get({ plain: true }));
            console.log(playlist);
            res.render('playlist', { playlist });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

// .then(playlistInfo => {
        //     // data.push(playlistInfo);
        // })

        // Songs.findAll({
        //     where: {
        //         playlist_id: playlistId
        //     },
        //     attribute: [
        //         'id',
        //         'song_title',
        //         'artist',
        //         'playlist_id'
        //     ]
        // })