const Playlist = require('./playlist')
const PlaylistSongs = require('./songs')


PlaylistSongs.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
})


Playlist.hasMany(PlaylistSongs, {
    foreignKey: 'playlist_id'
})


module.exports = { Playlist, PlaylistSongs };