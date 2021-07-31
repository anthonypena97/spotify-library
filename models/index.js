const Playlist = require('./Playlist')
const PlaylistSongs = require('./Songs')


PlaylistSongs.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
})


Playlist.hasMany(PlaylistSongs, {
    foreignKey: 'playlist_id'
})


module.exports = { Playlist, PlaylistSongs };