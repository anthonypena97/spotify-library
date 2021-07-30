const { all } = require('bluebird');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
const Playlist = require('./playlist');

class PlaylistSongs extends Model {}

PlaylistSongs.init({
    id: {
        type: DataTypes.INTERGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    songs_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playlist_id: {
        type: DataTypes.INTERGER,
        references: {
            model: 'playlist',
            key: 'id'
        },

    }
}, {
    sequelize,
    modelName: 'playlist_songs',
})

module.exports = PlaylistSongs