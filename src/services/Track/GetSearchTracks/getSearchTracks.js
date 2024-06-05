/**
 * @swagger
 * /track/searchTracks:
 *   get:
 *     summary: Buscar Tracks por nombre
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la pista a buscar
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda de pistas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                   description: Límite de resultados
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
 *                         description: Tipo de track
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
 *                                   description: URL de la imagen del álbum
 *                                 height:
 *                                   type: integer
 *                                   description: Altura de la imagen
 *                                 width:
 *                                   type: integer
 *                                   description: Ancho de la imagen
 *       500:
 *         description: Error del servidor
 */

function getSearchTracks(app) {
  app.get("/searchTracks", (req, res) => {
    const { q } = req.query;
    req.spotifyApi
      .searchTracks(q, { limit: 5 })
      .then((searchData) => {
        res.send({
          limit: searchData.body.tracks.limit,
          items: searchData.body.tracks.items.map((item) => ({
            idTrack: item.id,
            type: item.type,
            nameTrack: item.name,
            durationMs: item.duration_ms,
            explicit: item.explicit,
            artist: item.artists.map((artist) => ({
              idArtist: artist.id,
              nameArtist: artist.name,
            })),
            album: {
              idAlbum: item.album.id,
              nameAlbum: item.album.name,
              images: item.album.images.map((img) => ({
                url: img.url,
                height: img.height,
                width: img.width,
              })),
            },
          })),
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getSearchTracks;
