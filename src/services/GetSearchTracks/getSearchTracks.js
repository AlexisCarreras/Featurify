// Search Track: API para obtener la información de una serie de tracks buscado por su nombre, por default selecionamos 5 resultados.
function getSearchTracks(app, spotifyApi) {
  app.get("/searchTracks", (req, res) => {
    const { q } = req.query;
    spotifyApi
      .searchTracks(q, { limit: 5 })
      .then((searchData) => {
        res.send({
          limit: searchData.body.tracks.limit,
          items: searchData.body.tracks.items.map((item) => ({
            idTrack: item.id,
            type: item.type,
            nameTrack: item.name,
            durationMs: item.duration_ms,
            explicit: item.explicit,
            artist: item.artists.map((artist) => ({
              idArtist: artist.id,
              nameArtist: artist.name,
            })),
            album: {
              idAlbum: item.album.id,
              nameAlbum: item.album.name,
              images: item.album.images.map((img) => ({
                url: img.url,
                height: img.height,
                width: img.width,
              })),
            },
          })),
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getSearchTracks;
