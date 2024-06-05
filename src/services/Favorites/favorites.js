const express = require("express");
const favoriteSchema = require("../../models/favorite.model");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Endpoints para manejar tracks guardados como favoritos.
 */

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
router.get("/getAllTracks", (req, res) => {
  favoriteSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /favorites/getTracks:
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
router.get("/getTracks", (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Por defecto, trae 10 si no se especifica un límite
  favoriteSchema
    .find()
    .limit(limit)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

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
router.post("/saveTrack", (req, res) => {
  const trackFavorite = favoriteSchema(req.body);
  trackFavorite
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

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
router.delete("/deleteTrack/:id", (req, res) => {
  const { id } = req.params;
  favoriteSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
