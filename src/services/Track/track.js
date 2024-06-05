import express from "express";

import getSearchTracks from "./GetSearchTracks/getSearchTracks.js";
import getTrack from "./GetTrack/getTrack.js";
import getAudioFeatures from "./GetAudioFeatures/getAudioFeatures.js";
import getTracksRecomendations from "./GetTracksRecomendations/getTracksRecomendations.js";
import playTrack from "./PlayTrack/playTrack.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tracks
 *   description: Endpoints relacionados con los Tracks.
 */

getSearchTracks(router);
getTrack(router);
getAudioFeatures(router);
getTracksRecomendations(router);
playTrack(router);

export default router;
