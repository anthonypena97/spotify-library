// VARIABLES FOR STORING FETCHED PLAYLIST DATA - FOR REFERENCE IN SCRIPT
let playlistData = ''
let playlistObject = {};


// USER TYPES SPOTIFY PLAYLIST URL INTO INPUT FIELD AND PRESSES SUBMIT TO RETURN DATA FOR CONFIRMATION
$("#playlist-search-btn").on("click", function () {
    playlistURL = $("#playlistUrlSearch").val();
    var playlistID = playlistURL.slice(34, 56)

    // SPOTIFY API USER PLAYLIST CALL
    $.get("/spotify-playlist/" + playlistID, function (data) {

        playlistData = data;
        // console.log(playlistData);

        // DISPLAY RETURNED DATA ONTO PAGE FOR CONFIRMATION
        let artworkContainer = document.querySelector("#playlist-artwork");
        let playlistNameContainer = document.querySelector("#playlist-name");
        let songContainer = document.querySelector("#songs");

        let playlistName = data.body[0].info[0].name;
        let artwork = data.body[0].info[0].artwork;

        // DECLARE PLAYLIST OBJECT WITH RETURNED DATA
        playlistObject = {
            "playlist_name": playlistName,
            "playlist_artwork": artwork
        };

        // console.log('playlistObject', playlistObject);

        artworkContainer.setAttribute("style", "width: 300px; height: 300px; object-fit:cover;");
        artworkContainer.setAttribute("src", artwork);
        playlistNameContainer.innerHTML = playlistName;

        // ITERATE THROUGH ALL SONGS FROM FETCHED PLAYLIST FOR DISPLAYING ON PAGE
        for (var i = 0; i < data.body[0].tracks.length; i++) {
            title = data.body[0].tracks[i].title;
            artist = data.body[0].tracks[i].author;
            let track = title + " - " + artist;
            let songElement = document.createElement("p");
            songElement.innerHTML = track;
            songContainer.appendChild(songElement);
        }

    });

    // HIDES URL AFTER SEARCH QUERY IS FETCHED
    document.querySelector('#searchBar').setAttribute("style", "display: none;");

    // DISPLAYS CONFIRMATION BOX FOR USER TO REVIEW PLAYLIST RETURN
    document.querySelector('#confirmation').setAttribute("style", "display: block;");

});

// FUNCTION FOR PACKAING playlistTracksArray WITH PLAYLIST ID - FOR POST
const packageTracks = (savedPlaylistId) => {

    // ITERATE THROUGH ALL SONGS WITHIN PLAYLIST FOR PUSHING THEM WITH POST ROUTES
    for (var i = 0; i < playlistData.body[0].tracks.length; i++) {
        title = playlistData.body[0].tracks[i].title;
        artist = playlistData.body[0].tracks[i].author;

        newSong = {

            "song_title": title,
            "artist": artist,
            "playlist_id": savedPlaylistId

        }

        // // POST PACKED PLAYLIST TRACKS WITH PLAYLIST ID
        $.post("/api/songs", newSong, function (data) {

        });
    }

};

// USER DECIDES TO ADD RETURNED PLAYLIST TO THEIR PERSONAL LIBRARY
$("#savePlaylist").on("click", function () {

    // POST NEW PLAYLIST ENTRY
    $.post("/api/playlist", playlistObject, function (data) {
        // DECLARE PLAYLIST ID FROM RESPONSE - TO BE USED FOR SONGS POST
        let savedPlaylistId = data.id;

        packageTracks(savedPlaylistId);

        alert("All Done! Playlist saved!")

        window.location.href = "/library";

    })

});

// DELETE PLAYLIST BUTTON GOES BACK TO LIBRARY AND REMOVES THE QUERY
$("#deletePlaylist").on("click", function () {

    window.location.href = "/library";

});