/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Redirigir al usuario para iniciar sesión en Spotify
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirección a la página de autenticación de Spotify. (No disponible cuando se prueba desde Swagger)
 */

function login(app, spotifyApi) {
  app.get("/login", (req, res) => {
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-read-playback-state",
      "user-modify-playback-state",
    ];
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });
}

module.exports = login;
