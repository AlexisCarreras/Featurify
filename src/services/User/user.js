const express = require("express");

const getUserMe = require("./GetUserMe/getUserMe");
const getUserProfile = require("./GetUserProfile/getUserProfile");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para obtener datos de usuario.
 */

getUserMe(router);
getUserProfile(router);

module.exports = router;
