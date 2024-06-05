import express from "express";
import favoriteSchema from "../../models/favorite.model.js";

import getAllTracks from "./GetAllTracks/getAllTracks.js";
import getLimitTracks from "./GetLimitTracks/getLimitTracks.js";
import saveTrack from "./SaveTrack/saveTrack.js";
import deleteTrack from "./DeleteTrack/deleteTrack.js";

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

export default router;
