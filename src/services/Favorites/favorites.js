const express = require("express");
const favoriteSchema = require("../../models/favorite.model");

const getAllTracks = require("./GetAllTracks/getAllTracks");
const getLimitTracks = require("./GetLimitTracks/getLimitTracks");
const saveTrack = require("./SaveTrack/saveTrack");
const deleteTrack = require("./DeleteTrack/deleteTrack");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Endpoints para manejar tracks guardados como favoritos.
 */

getAllTracks(router, favoriteSchema);
getLimitTracks(router, favoriteSchema);
saveTrack(router, favoriteSchema);
deleteTrack(router, favoriteSchema);

module.exports = router;
