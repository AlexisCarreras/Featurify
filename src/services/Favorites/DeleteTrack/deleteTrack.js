/**
 * @swagger
 * /favorites/deleteTrack/{id}:
 *   delete:
 *     summary: Eliminar un track
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del track a eliminar
 *     responses:
 *       200:
 *         description: Track eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 n:
 *                   type: integer
 *                 ok:
 *                   type: integer
 *                 deletedCount:
 *                   type: integer
 *       500:
 *         description: Error del servidor
 */
export default function deleteTrack(router, favoriteSchema) {
  router.delete("/deleteTrack/:id", (req, res) => {
    const { id } = req.params;
    favoriteSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
}
