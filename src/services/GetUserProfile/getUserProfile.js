/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints para obtener los datos de un usuario.
 */

/**
 * @swagger
 * /userProfile/{idUsuario}:
 *   get:
 *     summary: Obtener los datos del usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idUser:
 *                   type: string
 *                   description: ID del usuario
 *                 displayName:
 *                   type: string
 *                   description: Nombre del usuario
 *                 type:
 *                   type: string
 *                   description: Tipo de usuario
 *                 followers:
 *                   type: number
 *                   description: Número de seguidores del usuario
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: URL de la imagen
 *                       height:
 *                         type: number
 *                         description: Altura de la imagen
 *                       width:
 *                         type: number
 *                         description: Ancho de la imagen
 *       500:
 *         description: Error del servidor
 */

function getUserProfile(app, spotifyApi) {
  app.get("/userProfile/:idUsuario", (req, res) => {
    const { idUsuario } = req.params;
    spotifyApi
      .getUser(idUsuario)
      .then((userData) => {
        res.send({
          idUser: userData.body.id,
          displayName: userData.body.display_name,
          type: userData.body.type,
          followers: userData.body.followers.total,
          images: userData.body.images.map((img) => ({
            url: img.url,
            height: img.height,
            width: img.width,
          })),
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getUserProfile;
