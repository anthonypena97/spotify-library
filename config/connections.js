const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = process.env.JAWSDB_URL ?
    new Sequelize(process.env.JAWSDB_URL) :
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
        },
    });

module.exports = sequelize;