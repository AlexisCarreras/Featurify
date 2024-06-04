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
