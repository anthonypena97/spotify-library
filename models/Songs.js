const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connections');
const Playlist = require('./Playlist');

class Songs extends Model { }

Songs.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    song_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playlist_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'playlist',
            key: 'id'
        }
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'songs',
    })

module.exports = Songs