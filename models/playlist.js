const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections');

class Playlist extends Model {}

Playlist.int({
    id: {
        type: DataTypes.INTERGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    playlist_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'playlist'
});

module.exports = Playlist;