const router = require('express').Router()
const db = require('../../models');




// PLAYLIST LIBRARY PAGE TAKES US TO THE LIBARY PAGE NEEDS TO UPDATE THE RENDER
router.get('/', function(req, res) {
    res.render('/landingpage')
});
// PLAYLIST DISPLAY PAGE DISPLAYS OUR HANDLEBARS NEED TO UPDATE RENDER WHEN WE GET THERE
router.get('/playlist-display', function(req, res) {
    res.render('/playlistdisplay')
});


// this is how the data needs to be structured 
// db.Playlist.create({

//     "playlist_name": ,
//     "songs": [{
//             "songs_title": ,
//             "author": ,
//             "album_name": "coding"
//         },
//         {
//             "songs_title": "done",
//             "author": "luke",
//             "album_name": "pc"
//         }
//     ]

// })


// STORES SONGS INTO OUR DATA BASE THIS IS THE OBJECT WE NEED ON THE FRONT END
router.post('/save', async(req, res) => {

    try {
        var source = document.querySelector("#save-Playlist").innerHTML; 
        var template = Handlebars.compile(source); 
        document.body.innerHTML = template();
        var saveButton = document.querySelector('#savePlaylist');
        saveButton.addEventListener('click', function (e) {
            const playlist = await db.Playlist.create({ playlist_name: req.body.playlist_name })
            console.log(playlist.dataValues)
            const songsArr = req.body.songs.map(song => ({
                songs_title: song.songs_title,
                author: song.author,
                album_name: song.album_name,
                playlist_id: playlist.dataValues.id,
            }))
            const song = await db.PlaylistSongs.bulkCreate(songsArr, { returning: true })
            res.json(song);                                                                                        
}, false);
        
try {
    var source = document.querySelector("#delete-Playlist").innerHTML; 
    var template = Handlebars.compile(source); 
    document.body.innerHTML = template();
    var deleteButton = document.querySelector('#deletePlaylist');
    deleteButton.addEventListener('click', function (e) {
        const playlist = await db.Playlist.create({ playlist_name: req.body.playlist_name })
        console.log(playlist.dataValues)
        const songsArr = req.body.songs.map(song => ({
            songs_title: song.songs_title,
            author: song.author,
            album_name: song.album_name,
            playlist_id: playlist.dataValues.id,
        }))
        const song = await db.PlaylistSongs.bulkCreate(songsArr, { returning: true })
        res.json(song);                                                                                        
}, false);
    } catch (error) {
        console.log(error)
    }

});










// FINDS ALL PLAYLIST
router.get('/:id', async(req, res) => {
    try {
        const allPlaylist = await db.Playlist.findAll({
            include: [db.PlaylistSongs]
        })
        res.json(allPlaylist)
    } catch (error) {
        res.status(400).json(error)
    }
});
// FINDS ONE PLAYLIST
router.get('/:playlist_name', async(req, res) => {
    try {
        const onePlaylist = await db.Playlist.findOne({
            where: {
                playlist_name: req.params.playlist_name
            },
            include: [db.PlaylistSongs]
        })
        res.json(onePlaylist)
    } catch (error) {
        res.status(400).json(error)
    }
})





router.put('/update/:id', async(req, res) => {
    try {
        const updatePlaylistName = await db.Playlist.update({
            where: {
                playlist_name: req.params.playlist_name
            }
        })
        res.json(updatePlaylistName)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/:playlist_name', async(req, res) => {
    try {
        const deletedPlaylist = await db.Playlist.destroy({
            where: {
                playlist_name: req.params.playlist_name
            },
            include: [db.PlaylistSongs]
        })
        res.json(deletedPlaylist)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;