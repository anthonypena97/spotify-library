const router = require('express').Router()
const db = require('../../models');
const express = require('express');
const exphbs = require('express-handlebars');
// HOMEPAGE
router.get('/', (req, res) => {
    res.render('landing');
})


module.exports = router;