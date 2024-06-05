require("dotenv").config();
const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig"); // Ruta de archivo de configuración Swagger

const mongoose = require("mongoose");

const SpotifyWebApi = require("spotify-web-api-node");

const favoritesRoutes = require("./services/Favorites/favorites");
const UserRoutes = require("./services/User/user");
const TrackRoutes = require("./services/Track/track");
const AuthRoutes = require("./services/Auth/auth");

const app = express();
const port = process.env.PORT || 8080;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(error));

// Swagger Connection
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configurar la instancia de SpotifyWebApi
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

// Middleware para adjuntar spotifyApi al objeto req
const attachSpotifyApi = (req, res, next) => {
  req.spotifyApi = spotifyApi;
  next();
};

// Adjuntar spotifyApi antes de las rutas que lo necesiten
app.use(attachSpotifyApi);

// Middleware para respuestas: Favorite
app.use(express.json());

// Rutas
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/track", TrackRoutes);
app.use("/favorites", favoritesRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
