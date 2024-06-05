/**
 * @swagger
 * /favorites/getAllTracks:
 *   get:
 *     summary: Obtener todos los tracks
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Lista de todos los tracks favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       500:
 *         description: Error del servidor
 */
function getAllTracks(router, favoriteSchema) {
  router.get("/getAllTracks", (req, res) => {
    favoriteSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
}

module.exports = getAllTracks;
