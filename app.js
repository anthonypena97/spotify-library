// USING THE SPOTIFY WEB API NODE PACKAGE FOR COMPILED METHODS
// 
// 
// requirements
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connections')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
    // .env file access
require('dotenv').config()
    // setting Handlebars as the default template engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// path setting
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
const port = process.env.PORT;

// routes
app.use(require('./routes'))

// SERVER LISTEN
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
});