const router = require('express').Router();

const mainRoutes = require('./mainRoutes');
const spotifyRoutes = require('./spotifyRoutes');

router.use('/', mainRoutes);
router.use('/', spotifyRoutes);

module.exports = router;