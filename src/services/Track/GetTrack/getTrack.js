/**
 * @swagger
 * /track/getTrack:
 *   get:
 *     summary: Obtener detalle de un Track a través de su ID
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Track
 *     responses:
 *       200:
 *         description: Lista de pistas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                   description: Número de resultados devueltos
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idTrack:
 *                         type: string
 *                         description: ID del track
 *                       type:
 *                         type: string
 *                         description: Tipo del track
 *                       nameTrack:
 *                         type: string
 *                         description: Nombre del track
 *                       durationMs:
 *                         type: integer
 *                         description: Duración del track en milisegundos
 *                       explicit:
 *                         type: boolean
 *                         description: Si el track es explícito
 *                       artist:
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
 *       500:
 *         description: Error del servidor
 */

function getTrack(app) {
  app.get("/getTrack", (req, res) => {
    const { q } = req.query;
    req.spotifyApi
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
          artists: trackData.body.artists.map((artist) => ({
            idArtist: artist.id,
            nameArtist: artist.name,
            type: artist.type,
          })),
          album: {
            idAlbum: trackData.body.album.id,
            type: trackData.body.album.type,
            typeAlbum: trackData.body.album.album_type,
            nameAlbum: trackData.body.album.name,
            totalTracks: trackData.body.album.total_tracks,
            releaseDate: trackData.body.album.release_date,
            images: trackData.body.album.images.map((img) => ({
              url: img.url,
              height: img.height,
              width: img.width,
            })),
          },
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getTrack;