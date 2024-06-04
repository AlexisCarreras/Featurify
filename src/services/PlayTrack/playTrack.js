// API para reproducir la pista en la APP.
function playTrack(app, spotifyApi) {
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
}

module.exports = playTrack;
