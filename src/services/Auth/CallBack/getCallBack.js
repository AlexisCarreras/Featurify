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
 *       200:
 *         description: Autenticación exitosa, se han obtenido los tokens
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */
export default function getCallBack(app) {
  app.get("/callback", (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
      console.error(`Error: ${error}`);
      res.send(`Error: ${error}`);
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
        res.send("Success!");

        setInterval(async () => {
          const data = await req.spotifyApi.refreshAccessToken();
          const access_token_refreshed = data.body["access_token"];
          req.spotifyApi.setAccessToken(access_token_refreshed);
        }, (expires_in / 2) * 1000);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
        res.send(`Error getting token`);
      });
  });
}
