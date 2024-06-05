/**
 * @swagger
 * /favorites/getLimitTracks:
 *   get:
 *     summary: Obtener tracks con límite
 *     tags: [Favorites]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de tracks a devolver
 *     responses:
 *       200:
 *         description: Lista de tracks favoritos con el límite especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       500:
 *         description: Error del servidor
 */
export default function getLimitTracks(router, favoriteSchema) {
  router.get("/getLimitTracks", (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Por defecto, trae 10 si no se especifica un límite
    favoriteSchema
      .find()
      .limit(limit)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
}
