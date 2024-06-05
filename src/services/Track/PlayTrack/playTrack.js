// API para reproducir la pista en la APP.
export default function playTrack(app) {
  app.get("/play", (req, res) => {
    const { uri } = req.query;
    req.spotifyApi
      .play({ uris: [uri] })
      .then(() => {
        res.send("playback started");
      })
      .catch((err) => {
        res.send(`Error playing: ${err}`);
      });
  });
}
