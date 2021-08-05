// requirements
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connections')
const session = require('express-session');
// const SequilzeStore = require('connect-session-sequelize')(session.Store);

const app = express()

//cookie session requirements i think NEEDS TO BE FINISHED SESSION IS A BIG THING WE NEED DONE
// const sess = {
//     secret: 'tokens',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequilzeStore({
//         db: sequelize
//     })
// };

app.use(
    session({
        secret: 'This is a major secret!',
        resave: false,
        saveUninitialized: false
    })
);

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

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

// // SERVER LISTEN
// sequelize.sync({ force: false }).then(() => {
//     app.listen(port, () => {
//         console.log(`Example app listening at http://localhost:${port}`)
//     });
// });