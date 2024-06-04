const express = require("express");
const favoriteSchema = require("../../models/favorite.model");

const router = express.Router();

// Obtener todos los Tracks
router.get("/getAllTracks", (req, res) => {
  favoriteSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener Tracks con límite
router.get("/getTracks", (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Por defecto, trae 10 si no se especifica un límite
  favoriteSchema
    .find()
    .limit(limit)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Guardar Track
router.post("/saveTrack", (req, res) => {
  const trackFavorite = favoriteSchema(req.body);
  trackFavorite
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar Track
router.delete("/deleteTrack/:id", (req, res) => {
  const { id } = req.params;
  favoriteSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
