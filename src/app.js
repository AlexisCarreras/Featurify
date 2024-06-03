require("dotenv").config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
const port = 8080;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

app.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error(`Error: ${error}`);
    res.send(`Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log(`The access token expires in ${expires_in} seconds`);
      console.log(`The access token is ${access_token}`);
      console.log(`The refresh token is ${refresh_token}`);
      res.send("Success!");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token_refreshed = data.body["access_token"];
        spotifyApi.setAccessToken(access_token_refreshed);
      }, (expires_in / 2) * 1000);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res.send(`Error getting token`);
    });
});

// => Search Track: API para obtener la información de una serie de tracks buscado por su nombre, por default selecionamos 10 resultados y que se busquen solo tracks.
app.get("/search", (req, res) => {
  const { q } = req.query;
  spotifyApi
    .searchTracks(q, { limit: 5 })
    .then((searchData) => {
      res.send({
        limit: searchData.body.tracks.limit,
        items: [
          {
            idTrack: searchData.body.tracks.items[0].id,
            type: searchData.body.tracks.items[0].type,
            nameTrack: searchData.body.tracks.items[0].name,
            durationMs: searchData.body.tracks.items[0].duration_ms,
            explicit: searchData.body.tracks.items[0].explicit,
            artists: [
              {
                idArtist: searchData.body.tracks.items[0].artists[0].id,
                nameArtist: searchData.body.tracks.items[0].artists[0].name,
              },
            ],
            album: {
              idAlbum: searchData.body.tracks.items[0].album.id,
              nameAlbum: searchData.body.tracks.items[0].album.name,
              imageUrl: searchData.body.tracks.items[0].album.images[0].url
            },
          },
          {
            idTrack: searchData.body.tracks.items[1].id,
            type: searchData.body.tracks.items[1].type,
            nameTrack: searchData.body.tracks.items[1].name,
            durationMs: searchData.body.tracks.items[1].duration_ms,
            explicit: searchData.body.tracks.items[1].explicit,
            artists: [
              {
                idArtist: searchData.body.tracks.items[1].artists[0].id,
                nameArtist: searchData.body.tracks.items[1].artists[0].name,
              },
            ],
            album: {
              idAlbum: searchData.body.tracks.items[1].album.id,
              nameAlbum: searchData.body.tracks.items[1].album.name,
              imageUrl: searchData.body.tracks.items[1].album.images[0].url
            },
          },
          {
            idTrack: searchData.body.tracks.items[2].id,
            type: searchData.body.tracks.items[2].type,
            nameTrack: searchData.body.tracks.items[2].name,
            durationMs: searchData.body.tracks.items[2].duration_ms,
            explicit: searchData.body.tracks.items[2].explicit,
            artists: [
              {
                idArtist: searchData.body.tracks.items[2].artists[0].id,
                nameArtist: searchData.body.tracks.items[2].artists[0].name,
              },
            ],
            album: {
              idAlbum: searchData.body.tracks.items[2].album.id,
              nameAlbum: searchData.body.tracks.items[2].album.name,
              imageUrl: searchData.body.tracks.items[2].album.images[0].url
            },
          },
          {
            idTrack: searchData.body.tracks.items[3].id,
            type: searchData.body.tracks.items[3].type,
            nameTrack: searchData.body.tracks.items[3].name,
            durationMs: searchData.body.tracks.items[3].duration_ms,
            explicit: searchData.body.tracks.items[3].explicit,
            artists: [
              {
                idArtist: searchData.body.tracks.items[3].artists[0].id,
                nameArtist: searchData.body.tracks.items[3].artists[0].name,
              },
            ],
            album: {
              idAlbum: searchData.body.tracks.items[3].album.id,
              nameAlbum: searchData.body.tracks.items[3].album.name,
              imageUrl: searchData.body.tracks.items[3].album.images[0].url
            },
          },
          {
            idTrack: searchData.body.tracks.items[4].id,
            type: searchData.body.tracks.items[4].type,
            nameTrack: searchData.body.tracks.items[4].name,
            durationMs: searchData.body.tracks.items[4].duration_ms,
            explicit: searchData.body.tracks.items[4].explicit,
            artists: [
              {
                idArtist: searchData.body.tracks.items[4].artists[0].id,
                nameArtist: searchData.body.tracks.items[4].artists[0].name,
              },
            ],
            album: {
              idAlbum: searchData.body.tracks.items[4].album.id,
              nameAlbum: searchData.body.tracks.items[4].album.name,
              imageUrl: searchData.body.tracks.items[4].album.images[0].url
            },
          },
        ],
      });
    })
    .catch((err) => {
      res.send(`Error searching: ${err}`);
    });
});

//   => Get Track: API para obtener todos los detalles del track buscado, una vez que usamos la api de search, obtenemos el ID del Track solicitado, debemos guardarlo y pasárselo a este servicio a través del Front.
app.get("/track", (req, res) => {
  const { q } = req.query;
  spotifyApi
    .getTrack(q)
    .then((trackData) => {
      res.send({
        idTrack: trackData.body.id,
        type: trackData.body.type,
        nameTrack: trackData.body.name,
        previewTrackUrl: trackData.body.preview_url,
        durationMs: trackData.body.duration_ms,
        trackNumber: trackData.body.track_number,
        explicit: trackData.body.explicit,
        artists: [
          {
            idArtist: trackData.body.artists[0].id,
            nameArtist: trackData.body.artists[0].name,
            type: trackData.body.artists[0].type,
          },
        ],
        album: {
          idAlbum: trackData.body.album.id,
          type: trackData.body.album.type,
          typeAlbum: trackData.body.album.album_type,
          nameAlbum: trackData.body.album.name,
          totalTracks: trackData.body.album.total_tracks,
          releaseDate: trackData.body.album.release_date,
          imageUrl: trackData.body.album.images[0].url
        },
      });
    })
    .catch((err) => {
      res.send(`Error searching: ${err}`);
    });
});

// PRUEBA, únicamente para reproducir la pista en la APP
app.get("/play", (req, res) => {
  const { uri } = req.query;
  spotifyApi
    .play({ uris: [uri] })
    .then(() => {
      res.send("playback started");
    })
    .catch((err) => {
      res.send(`Error playing: ${err}`);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
