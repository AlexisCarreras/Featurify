import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerConfig.js"; // Ruta de archivo de configuración Swagger

import mongoose from "mongoose";

import SpotifyWebApi from "spotify-web-api-node";

import FavoritesRoutes from "./services/Favorites/favorites.js";
import UserRoutes from "./services/User/user.js";
import TrackRoutes from "./services/Track/track.js";
import AuthRoutes from "./services/Auth/auth.js";

dotenv.config();
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

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

// Adjuntar spotifyApi antes de las rutas que lo necesiten
app.use(attachSpotifyApi);

// Middleware para respuestas: Favorite
app.use(express.json());

// Rutas
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/track", TrackRoutes);
app.use("/favorites", FavoritesRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
