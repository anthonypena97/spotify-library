// ARRAY TO STORE RETURNED DATA FROM SPOTIFY PLAYLIST SEARCH
let playlistArr = []

// USER TYPES SPOTIFY PLAYLIST URL INTO INPUT FIELD AND PRESSES SUBMIT TO RETURN DATA FOR CONFIRMATION
$("#btn").on("click", function () {
    playlistURL = $("#playlistUrlSearch").val();
    var playlistID = playlistURL.slice(34, 56)

    // SPOTIFY API USER PLAYLIST CALL
    $.get("/spotify-playlist/" + playlistID, function (data) {
        // PUSH RETURNED DATA INO PLAYLIST ARRAY
        playlistArr.push(data);
        console.log(data);

        // DISPLAY RETURNED DATA ONTO PAGE FOR CONFIRMATION
        let artworkContainer = document.querySelector("#playlist-artwork");
        let playlistNameContainer = document.querySelector("#playlist-name");
        let songContainer = document.querySelector("#songs");

        let artwork = data.body[0].info[0].artwork;
        let playlistName = data.body[0].info[0].name;

        artworkContainer.setAttribute("style", "width: 300px;height: 300px;object-fit:cover; display:block;");
        artworkContainer.setAttribute("src", artwork);
        playlistNameContainer.innerHTML = playlistName;

        // ITERATE THROUGH ALL SONGS WITHIN PLAYLIST AND THEN DISPLAYED ON PAGE
        for (var i = 0; i < data.body[0].tracks.length; i++) {
            title = data.body[0].tracks[i].title;
            author = data.body[0].tracks[i].author;
            let track = title + " - " + author;
            let songElement = document.createElement("p");
            songElement.innerHTML = track;
            songContainer.appendChild(songElement);
            newSong = {

                "songs_title": title,
                "author": author,

            }
        }
    });

    // CLEARS OUT INPUT FIELD USED FOR PLAYLIST URL
    document.getElementById('playlistUrlSearch').value = '';

});

// USER DECIDES TO ADD RETURNED PLAYLIST TO THEIR PERSONAL LIBRARY
$("#save-btn").on("click", function () {
    var newPlaylit = {
        "playlist_name": playlistName,
        "songs": newArr
    }
    $.post("/save", newPlaylit)
    console.log(newPlaylit);
})