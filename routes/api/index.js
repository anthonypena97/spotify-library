const router = require('express').Router();
const playlist = require('./playlist');
const songs = require('./songs');
const login = require('./login')

router.use('/playlist', playlist);
router.use('/songs', songs);
router.use('/login', login)

module.exports = router;