$("#btn").on("click", function() {
    playlistURL = $("#playlistUrlSearch").val();
    var playlistID = playlistURL.slice(34, 56)

    var newArr = []
    var newPost
    var title
    var author
    var playlistName
    $.get("/spotify-playlist/" + playlistID, function(data) {
        console.log(data)
        let artworkContainer = document.querySelector("#playlist-artwork");
        let playlistNameContainer = document.querySelector("#playlist-name");
        let songContainer = document.querySelector("#songs");

        let artwork = data.body[0].info[0].artwork;
        playlistName = data.body[0].info[0].name;

        artworkContainer.setAttribute("style", "width: 300px;height: 300px;object-fit:cover; display:block;");
        artworkContainer.setAttribute("src", artwork);
        playlistNameContainer.innerHTML = playlistName;




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
            console.log(newSong)
            newArr.push(newSong)
        }

    });
    $("#save-btn").on("click", function() {
        var newPlaylit = {
            "playlist_name": playlistName,
            "songs": newArr
        }
        $.post("/save", newPlaylit)
        console.log(newPlaylit);
    })
});