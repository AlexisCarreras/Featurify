/**
 * @swagger
 * /user/userMe:
 *   get:
 *     summary: Obtener información del usuario logueado
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 countryUser:
 *                   type: string
 *                   description: País del usuario
 *                 idUser:
 *                   type: string
 *                   description: ID del usuario
 *                 displayName:
 *                   type: string
 *                   description: Nombre de usuario mostrado
 *                 emailUser:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 type:
 *                   type: string
 *                   description: Tipo de cuenta del usuario
 *                 productUser:
 *                   type: string
 *                   description: Tipo de suscripción del usuario
 *                 followers:
 *                   type: integer
 *                   description: Cantidad de seguidores del usuario
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: URL de la imagen del usuario
 *                       height:
 *                         type: integer
 *                         description: Altura de la imagen del usuario
 *                       width:
 *                         type: integer
 *                         description: Ancho de la imagen del usuario
 *       500:
 *         description: Error obteniendo la información del usuario
 */

function getUserMe(router) {
  router.get("/userMe", (req, res) => {
    req.spotifyApi
      .getMe()
      .then((UserMeData) => {
        res.send({
          countryUser: UserMeData.body.country,
          idUser: UserMeData.body.id,
          displayName: UserMeData.body.display_name,
          emailUser: UserMeData.body.email,
          type: UserMeData.body.type,
          productUser: UserMeData.body.product,
          followers: UserMeData.body.followers.total,
          images: UserMeData.body.images.map((img) => ({
            url: img.url,
            height: img.height,
            width: img.width,
          })),
        });
      })
      .catch((err) => {
        res
          .status(500)
          .send(`Error obteniendo el perfil del usuario: ${err.message}`);
      });
  });
}

module.exports = getUserMe;
