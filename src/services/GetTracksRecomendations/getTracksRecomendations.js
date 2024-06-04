// Get Recommendations: API para obtener X cantidad de resultados relacionados al track buscado, en principio obtenemos solo 6 para una vista previa, luego le podemos enviar 10 o 20 tracks relacionados.
function getTracksRecomendations(app, spotifyApi) {
  app.get("/tracksRecomendations", (req, res) => {
    const { limit, seed_tracks, seed_artists } = req.query;
    spotifyApi
      .getRecommendations({
        limit: limit,
        seed_tracks: seed_tracks,
        seed_artists: seed_artists,
      })
      .then((trackRecomendationData) => {
        res.send({
          tracks: trackRecomendationData.body.tracks.map((track) => ({
            album: {
              idAlbum: track.album.id,
              nameAlbum: track.album.name,
              images: track.album.images.map((img) => ({
                url: img.url,
                height: img.height,
                width: img.width,
              })),
            },
            artists: track.artists.map((artist) => ({
              idArtist: artist.id,
              nameArtist: artist.name,
            })),
            idTrack: track.id,
            nameTrack: track.name,
            duration_ms: track.duration_ms,
            explicit: track.explicit,
            type: track.type,
          })),
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getTracksRecomendations;
