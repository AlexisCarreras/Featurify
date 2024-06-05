const express = require("express");

const getSearchTracks = require("./GetSearchTracks/getSearchTracks");
const getTrack = require("./GetTrack/getTrack");
const getAudioFeatures = require("./GetAudioFeatures/getAudioFeatures");
const getTracksRecomendations = require("./GetTracksRecomendations/getTracksRecomendations");
const playTrack = require("./PlayTrack/playTrack");

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

module.exports = router;
