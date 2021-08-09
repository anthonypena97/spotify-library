populatePlaylist = () => {
    $.get('/api/songs/playlist/' + playlistId, function (tracksData) {

        console.log(tracksData)

        let playlistSongContainer = document.querySelector("#playlist-page-songs");

        // ITERATE THROUGH ALL SONGS FROM FETCHED PLAYLIST FOR DISPLAYING ON PAGE
        for (var i = 0; i < tracksData.length; i++) {
            let title = tracksData[i].song_title;
            let artist = tracksData[i].artist;
            let track = title + " - " + artist;
            let songElement = document.createElement("p");
            songElement.innerHTML = track;
            playlistSongContainer.appendChild(songElement);
        }
    });
}

// DELETE PLAYLIST BUTTON GOES BACK TO LIBRARY AND REMOVES THE QUERY
$("#deletePlaylist-playlistPage").on("click", function () {

    fetch('/api/songs/playlist/' + playlistId, {
        method: 'DELETE',
    })
        .then(res =>
            fetch('/api/playlist/' + playlistId, {
                method: 'DELETE',
            }))

    alert("succesfully deleted this playlist!")
    window.location.href = "/library";

});