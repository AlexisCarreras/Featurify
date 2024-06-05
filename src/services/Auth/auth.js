import express from "express";
import login from "./Login/login.js";
import getCallBack from "./CallBack/getCallBack.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

login(router);
getCallBack(router);

export default router;
