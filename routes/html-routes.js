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
router.get('/login', function (req, res) {
    res.render('login');
});

// PLAYLIST LIBRARY PAGE
router.get('/library', function (req, res) {
    res.render('library');
});

// PLAYLIST DISPLAY PAGE
router.get('/playlist', function (req, res) {
    res.render('playlist');
});

module.exports = router;