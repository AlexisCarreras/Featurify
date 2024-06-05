/**
 * @swagger
 * /track/audioFeature:
 *   get:
 *     summary: Obtener análisis de audio de un Track
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del track 
 *     responses:
 *       200:
 *         description: Características de audio del track
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idTrack:
 *                   type: string
 *                   description: ID del track
 *                 danceability:
 *                   type: number
 *                   description: Capacidad de baile del track
 *                 energy:
 *                   type: number
 *                   description: Energía del track
 *                 key:
 *                   type: integer
 *                   description: Clave musical del track
 *                 loudness:
 *                   type: number
 *                   description: Volumen del track
 *                 mode:
 *                   type: integer
 *                   description: Modo del track
 *                 speechiness:
 *                   type: number
 *                   description: Cantidad de palabras habladas en el track
 *                 acousticness:
 *                   type: number
 *                   description: Acústica del track
 *                 instrumentalness:
 *                   type: number
 *                   description: Instrumentalidad del track
 *                 liveness:
 *                   type: number
 *                   description: Vivacidad del track
 *                 valence:
 *                   type: number
 *                   description: Positividad del track
 *                 tempo:
 *                   type: number
 *                   description: Tempo del track
 *                 durationMs:
 *                   type: integer
 *                   description: Duración del track en milisegundos
 *       500:
 *         description: Error del servidor
 */

function getAudioFeatures(app) {
  app.get("/audioFeature", (req, res) => {
    const { q } = req.query;
    req.spotifyApi
      .getAudioFeaturesForTrack(q)
      .then((audioFeaturesData) => {
        res.send({
          idTrack: audioFeaturesData.body.id,
          danceability: audioFeaturesData.body.danceability,
          energy: audioFeaturesData.body.energy,
          key: audioFeaturesData.body.key,
          loudness: audioFeaturesData.body.loudness,
          mode: audioFeaturesData.body.mode,
          speechiness: audioFeaturesData.body.speechiness,
          acousticness: audioFeaturesData.body.acousticness,
          instrumentalness: audioFeaturesData.body.instrumentalness,
          liveness: audioFeaturesData.body.liveness,
          valence: audioFeaturesData.body.valence,
          tempo: audioFeaturesData.body.tempo,
          durationMs: audioFeaturesData.body.duration_ms,
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getAudioFeatures;
