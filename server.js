// requirements
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express()

// .env file access
require('dotenv').config()

// setting Handlebars as the default template engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// path setting
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// declaring keys
const port = process.env.PORT || 3000;

// ROUTES
// ===========================================================
app.use(require('./routes/html-routes'));
app.use(require('./routes/spotify-routes'));

// SERVER LISTEN
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});