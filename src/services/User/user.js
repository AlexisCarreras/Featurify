import express from "express";

import getUserMe from "./GetUserMe/getUserMe.js";
import getUserProfile from "./GetUserProfile/getUserProfile.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para obtener datos de usuario.
 */

getUserMe(router);
getUserProfile(router);

export default router;
