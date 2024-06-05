import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
});

const albumSchema = mongoose.Schema({
  idAlbum: {
    type: String,
    required: true,
  },
  nameAlbum: {
    type: String,
    required: true,
  },
  images: [imageSchema],
});

const artistSchema = mongoose.Schema({
  idArtist: {
    type: String,
    required: true,
  },
  nameArtist: {
    type: String,
    required: true,
  },
});

const favoriteSchema = mongoose.Schema({
  album: albumSchema,
  artist: [artistSchema],
  idTrack: {
    type: String,
    required: true,
  },
  nameTrack: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Favorite', favoriteSchema);
