/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Redirigir al usuario para iniciar sesión en Spotify
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirección a la página de autenticación de Spotify. (No disponible cuando se prueba desde Swagger)
 */
export default function login(app) {
  app.get("/login", (req, res) => {
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-read-playback-state",
      "user-modify-playback-state",
    ];
    res.redirect(req.spotifyApi.createAuthorizeURL(scopes));
  });
}
