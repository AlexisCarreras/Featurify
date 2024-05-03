require("dotenv").config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
const port = 3000;

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

app.get("/search", (req, res) => {
  const { q } = req.query;
  spotifyApi
    .searchTracks(q)
    .then((searchData) => {
      const trackUri = searchData.body.tracks.items[0].uri;
      res.send({ uri: trackUri });
    })
    .catch((err) => {
      res.send(`Error searching: ${err}`);
    });
});

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
