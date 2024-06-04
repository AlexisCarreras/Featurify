// API donde se redigirá una vez que se se loguee, obteniendo tokens.
function getCallBack(app, spotifyApi) {
  app.get("/callback", (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
      console.error(`Error: ${error}`);
      res.send(`Error: ${error}`);
      return;
    }

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const access_token = data.body["access_token"];
        const refresh_token = data.body["refresh_token"];
        const expires_in = data.body["expires_in"];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log(`The access token expires in ${expires_in} seconds`);
        console.log(`The access token is ${access_token}`);
        console.log(`The refresh token is ${refresh_token}`);
        res.send("Success!");

        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token_refreshed = data.body["access_token"];
          spotifyApi.setAccessToken(access_token_refreshed);
        }, (expires_in / 2) * 1000);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
        res.send(`Error getting token`);
      });
  });
}

module.exports = getCallBack;
