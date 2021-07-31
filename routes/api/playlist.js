const router = require('express').Router()
const bodyArray = require('./spotify');
const db = require('../../models');
const express = require('express');
const exphbs = require('express-handlebars');



// PLAYLIST LIBRARY PAGE
router.get('/playlist-library', function(req, res) {
    res.render('/landingpage')
});
// PLAYLIST DISPLAY PAGE
router.get('/playlist-display', function(req, res) {
    res.render('/playlistdisplay')
});
// FINDS ALL PLAYLIST
router.get('/:id', async(req, res) => {
    try {
        const allPlaylist = await db.Playlist.findAll({
            include: [db.PlaylistSongs]
        })
        res.json(allPlaylist)
    } catch (error) {
        res.status(400).json(error)
    }
});
// FINDS ONE PLAYLIST
router.get('/:playlist_name', async(req, res) => {
    try {
        const onePlaylist = await db.Playlist.findOne({
            where: {
                playlist_name: req.params.playlist_name
            },
            include: [db.PlaylistSongs]
        })
        res.json(onePlaylist)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/:playlist_name', async(req, res) => {
    try {
        const deletedPlaylist = await db.Playlist.destroy({
            where: {
                playlist_name: req.params.playlist_name
            },
            include: [db.PlaylistSongs]
        })
        res.json(deletedPlaylist)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;