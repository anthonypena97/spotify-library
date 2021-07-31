const { spotifyApi, playlistArray } = require('sequelize');
const router = require('express').Router();
const db = require('../../models');
const express = require('express');
const exphbs = require('express-handlebars');

router.get('/title', async(req, res) => {
    try {
        const updateSongTitle = await db.PlaylistSongs.findOne(req.body, { where: { songs_title: req.body.songs_title } })
        res.json(updateSongTitle)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get('/author', async(req, res) => {
    try {
        const updateSongAuthor = await db.PlaylistSongs.findAll(req.body, { where: { author: req.params.author } })
        res.json(updateSongAuthor)
    } catch (error) {
        res.status(400).json(error)
    }
});



router.post('/songTitle', async(req, res) => {
    try {
        const newTitle = await db.PlaylistSongs.create(req.body)
        res.json(newTitle)
    } catch (error) {
        res.status(400).json(error)
    }
})



module.exports = router;