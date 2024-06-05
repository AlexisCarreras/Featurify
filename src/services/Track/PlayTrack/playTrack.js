/**
 * @swagger
 * /track/playTrack:
 *   get:
 *     summary: Reproducir track en la App de Spotify.
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: uri
 *         schema:
 *           type: string
 *         required: true
 *         description: URI de la pista a reproducir
 *     responses:
 *       200:
 *         description: Reproducción iniciada correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "playback started"
 *       500:
 *         description: Error al iniciar la reproducción
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error playing: error_message"
 */

export default function playTrack(app) {
  app.get("/playTrack", (req, res) => {
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
