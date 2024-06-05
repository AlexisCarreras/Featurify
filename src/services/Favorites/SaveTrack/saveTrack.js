/**
 * @swagger
 * /favorites/saveTrack:
 *   post:
 *     summary: Guardar un track favorito
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               album:
 *                 type: object
 *                 properties:
 *                   idAlbum:
 *                     type: string
 *                   nameAlbum:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                         height:
 *                           type: number
 *                         width:
 *                           type: number
 *               artist:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idArtist:
 *                       type: string
 *                     nameArtist:
 *                       type: string
 *               idTrack:
 *                 type: string
 *               nameTrack:
 *                 type: string
 *     responses:
 *       200:
 *         description: Track guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del track favorito guardado
 *                 album:
 *                   type: object
 *                   description: Álbum del track favorito
 *                   properties:
 *                     idAlbum:
 *                       type: string
 *                     nameAlbum:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                           height:
 *                             type: number
 *                           width:
 *                             type: number
 *                 artist:
 *                   type: array
 *                   description: Artista(s) del track favorito
 *                   items:
 *                     type: object
 *                     properties:
 *                       idArtist:
 *                         type: string
 *                       nameArtist:
 *                         type: string
 *                 idTrack:
 *                   type: string
 *                   description: ID del track
 *                 nameTrack:
 *                   type: string
 *                   description: Nombre del track
 *       500:
 *         description: Error del servidor
 */
export default function saveTrack(router, favoriteSchema) {
  router.post("/saveTrack", (req, res) => {
    const trackFavorite = favoriteSchema(req.body);
    trackFavorite
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
}
