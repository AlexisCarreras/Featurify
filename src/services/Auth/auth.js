const express = require("express");

const login = require("./Login/login");
const getCallBack = require("./CallBack/getCallBack");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

login(router);
getCallBack(router);

module.exports = router;
