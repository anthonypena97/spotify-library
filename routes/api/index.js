const router = require('express').Router();
const playlist = require('./playlist');
const songs = require('./songs');
const login = require('./login')
const homepage = require('./homepage')

router.use('/libary', playlist);
router.use('/songs', songs);
router.use('/login', login)
router.use('/homepage', homepage)

module.exports = router;