// Get User Profile: API para obtener los datos del usuario con la sesión actual.
function getUserProfile(app, spotifyApi) {
  app.get("/userProfile", (req, res) => {
    const { q } = req.query;
    spotifyApi
      .getUser(q)
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
