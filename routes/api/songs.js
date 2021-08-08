const { spotifyApi, playlistArray } = require('sequelize');
const router = require('express').Router();
const db = require('../../models');
const express = require('express');
const exphbs = require('express-handlebars');

router.get('/song-title/:songs_title', async(req, res) => {
    try {
        const findOneSongs = await db.PlaylistSongs.findOne({
            where: {
                songs_title: req.params.songs_title
            },
        })
        res.json(findOneSongs)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/song-author/:author', async(req, res) => {
    try {
        const songAuthor = await db.PlaylistSongs.findOne({
            where: {
                author: req.params.author
            }
        })
        res.json(songAuthor)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;