require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const SpotifyWebApi = require("spotify-web-api-node");

const login = require("./services/Login/login");
const getCallBack = require("./services/CallBack/getCallBack");

const favoritesRoutes = require("./services/Favorites/favorites");

const getUserProfile = require("./services/GetUserProfile/getUserProfile");
const getSearchTracks = require("./services/GetSearchTracks/getSearchTracks");
const getTrack = require("./services/GetTrack/getTrack");
const getAudioFeatures = require("./services/GetAudioFeatures/getAudioFeatures");
const getTracksRecomendations = require("./services/GetTracksRecomendations/getTracksRecomendations");
const playTrack = require("./services/PlayTrack/playTrack");

const app = express();
const port = process.env.PORT || 8080;

// // Routes
// const loadRoutes = require("./routes");
// loadRoutes(app);

// // Load swagger support
// const swagger = require("./docs/swagger/autogen");
// swagger();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(error));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

// Middleware Favorite
app.use(express.json());
app.use("/favorite", favoritesRoutes);

login(app, spotifyApi);
getCallBack(app, spotifyApi);

getUserProfile(app, spotifyApi);
getSearchTracks(app, spotifyApi);
getTrack(app, spotifyApi);
getAudioFeatures(app, spotifyApi);
getTracksRecomendations(app, spotifyApi);
playTrack(app, spotifyApi);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
