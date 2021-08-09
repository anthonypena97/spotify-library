const Playlist = require('./Playlist')
const Songs = require('./Songs')
const UserLogin = require('./UserLogin')


Songs.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
})


Playlist.hasMany(Songs, {
    foreignKey: 'playlist_id'
})


module.exports = { Playlist, Songs, UserLogin };