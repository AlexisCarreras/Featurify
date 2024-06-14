/**
 * @swagger
 * /auth/callback:
 *   get:
 *     summary: Redirigir al usuario a esta URL después de la autenticación de Spotify
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de autorización proporcionado por Spotify
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: Estado proporcionado por la solicitud inicial
 *       - in: query
 *         name: error
 *         schema:
 *           type: string
 *         required: false
 *         description: Error proporcionado por Spotify
 *     responses:
 *       302:
 *         description: Redirección al frontend con los tokens en la URL
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */
import dotenv from "dotenv";
dotenv.config();

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PRODUCTION
    : process.env.FRONTEND_URL_LOCAL;

export default function getCallBack(app) {
  app.get("/callback", (req, res) => {
    const { error, code, state } = req.query;

    if (error) {
      console.error(`Error: ${error}`);
      res.status(400).send(`Error: ${error}`);
      return;
    }

    req.spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const access_token = data.body["access_token"];
        const refresh_token = data.body["refresh_token"];
        const expires_in = data.body["expires_in"];

        req.spotifyApi.setAccessToken(access_token);
        req.spotifyApi.setRefreshToken(refresh_token);

        console.log(`The access token expires in ${expires_in} seconds`);
        console.log(`The access token is ${access_token}`);
        console.log(`The refresh token is ${refresh_token}`);

        // Redirigir al frontend con los tokens en la URL
        res.redirect(
          `${FRONTEND_URL}/search?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
        );

        // Configurar la renovación del token de acceso
        setInterval(async () => {
          try {
            const data = await req.spotifyApi.refreshAccessToken();
            const access_token_refreshed = data.body["access_token"];
            req.spotifyApi.setAccessToken(access_token_refreshed);
            console.log("Access token refreshed:", access_token_refreshed);
          } catch (err) {
            console.error("Error refreshing access token:", err);
          }
        }, (expires_in / 2) * 1000);
      })
      .catch((err) => {
        console.error(`Error getting token: ${err}`);
        res.status(500).send("Error getting token");
      });
  });
}
