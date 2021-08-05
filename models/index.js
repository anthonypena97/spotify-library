const Playlist = require('./Playlist')
const PlaylistSongs = require('./Songs')
const UserLogin = require('./UserLogin')


PlaylistSongs.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
})


Playlist.hasMany(PlaylistSongs, {
    foreignKey: 'playlist_id'
})


module.exports = { Playlist, PlaylistSongs, UserLogin };