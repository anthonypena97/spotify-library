const router = require('express').Router();

// HOMEPAGE
router.get('/', (req, res) => {
    res.render('landing');
})

// SEARCH
router.get('/search', (req, res) => {
    res.render('search');
})

// CREATE ACCOUNT PAGE
router.get('/create-account', function (req, res) {

});

// PLAYLIST LIBRARY PAGE
router.get('/playlist-library', function (req, res) {
    res.render('playlist');
});

// PLAYLIST DISPLAY PAGE
router.get('/playlist-display', function (req, res) {

});

module.exports = router;