const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require('../config/connections');

class Playlist extends Model { }

Playlist.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    playlist_name: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playlist'
});

module.exports = Playlist;