/**
 * @swagger
 * /track/tracksRecomendations:
 *   get:
 *     summary: Obtener recomendaciones de Tracks, a través de un Track y un Artista
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: Número de pistas devolver
 *       - in: query
 *         name: seed_tracks
 *         schema:
 *           type: string
 *         description: ID del track para generar recomendaciones
 *       - in: query
 *         name: seed_artists
 *         schema:
 *           type: string
 *         description: ID del artista para generar recomendaciones
 *     responses:
 *       200:
 *         description: Lista de pistas recomendadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tracks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       album:
 *                         type: object
 *                         properties:
 *                           idAlbum:
 *                             type: string
 *                             description: ID del álbum
 *                           nameAlbum:
 *                             type: string
 *                             description: Nombre del álbum
 *                           images:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 url:
 *                                   type: string
 *                                   description: URL de la imagen
 *                                 height:
 *                                   type: integer
 *                                   description: Altura de la imagen
 *                                 width:
 *                                   type: integer
 *                                   description: Ancho de la imagen
 *                       artists:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             idArtist:
 *                               type: string
 *                               description: ID del artista
 *                             nameArtist:
 *                               type: string
 *                               description: Nombre del artista
 *                       idTrack:
 *                         type: string
 *                         description: ID del track
 *                       nameTrack:
 *                         type: string
 *                         description: Nombre del track
 *                       duration_ms:
 *                         type: integer
 *                         description: Duración del track en milisegundos
 *                       explicit:
 *                         type: boolean
 *                         description: Si el track es explícito
 *                       type:
 *                         type: string
 *                         description: Tipo del track
 *       500:
 *         description: Error del servidor
 */
export default function getTracksRecomendations(app) {
  app.get("/tracksRecomendations", (req, res) => {
    const { limit, seed_tracks, seed_artists } = req.query;

    if (!limit || !seed_tracks || !seed_artists) {
      res
        .status(400)
        .send(
          "Missing required query parameters: limit, seed_tracks, seed_artists"
        );
      return;
    }

    req.spotifyApi
      .getRecommendations({
        limit: parseInt(limit, 10), // Ensure limit is an integer
        seed_tracks: seed_tracks,
        seed_artists: seed_artists,
      })
      .then((trackRecomendationData) => {
        res.send({
          tracks: trackRecomendationData.body.tracks.map((track) => ({
            album: {
              idAlbum: track.album.id,
              nameAlbum: track.album.name,
              images: track.album.images.map((img) => ({
                url: img.url,
                height: img.height,
                width: img.width,
              })),
            },
            artists: track.artists.map((artist) => ({
              idArtist: artist.id,
              nameArtist: artist.name,
            })),
            idTrack: track.id,
            nameTrack: track.name,
            duration_ms: track.duration_ms,
            explicit: track.explicit,
            type: track.type,
          })),
        });
      })
      .catch((err) => {
        console.error("Error fetching recommendations from Spotify API:", err);
        if (err.statusCode === 429) {
          res.status(429).send({
            message:
              "Hubo más solicitudes que las permitidas por Spotify. Por favor, intentelo más tarde",
            retryAfter: err.headers["retry-after"],
          });
        } else {
          res
            .status(500)
            .send(`Error fetching recommendations: ${JSON.stringify(err)}`);
        }
      });
  });
}
