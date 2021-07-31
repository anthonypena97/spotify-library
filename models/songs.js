const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connections');
const Playlist = require('./Playlist');

class PlaylistSongs extends Model {}

PlaylistSongs.init({
    id: {
        type: DataTypes.INTEGER,
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
    album_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    playlist_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'playlist',
            key: 'id'
        },

    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playlist_songs',
})

module.exports = PlaylistSongs