const { spotifyApi, playlistArray } = require('sequelize');
const router = require('express').Router();
const db = require('../../models');
const express = require('express');
const exphbs = require('express-handlebars');





router.put('/songs/title', (req, res) => {
    PlaylistSongs.update({
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
    db.PlaylistSongs.update({
        songs_title: req.body.songs_title,
    }, {
        where: {
            songs_title: req.body.songs_title
        }
    }).then(dbPlaylist => {
        res.json(dbPlaylist)
    });
});

router.put('/sons/album', (res, req) => {
    db.PlaylistSongs.update({
        songs_
    })
})




module.exports = router;