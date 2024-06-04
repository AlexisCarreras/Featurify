// Get Track: API para obtener todos los detalles de un track, una vez que usamos la api de search, obtenemos el ID del Track solicitado, debemos guardarlo y pasárselo a este servicio a través del Front.
function getTrack(app, spotifyApi) {
  app.get("/getTrack", (req, res) => {
    const { q } = req.query;
    spotifyApi
      .getTrack(q)
      .then((trackData) => {
        res.send({
          idTrack: trackData.body.id,
          type: trackData.body.type,
          nameTrack: trackData.body.name,
          previewTrackUrl: trackData.body.preview_url,
          durationMs: trackData.body.duration_ms,
          trackNumber: trackData.body.track_number,
          explicit: trackData.body.explicit,
          artists: trackData.body.artists.map((artist) => ({
            idArtist: artist.id,
            nameArtist: artist.name,
            type: artist.type,
          })),
          album: {
            idAlbum: trackData.body.album.id,
            type: trackData.body.album.type,
            typeAlbum: trackData.body.album.album_type,
            nameAlbum: trackData.body.album.name,
            totalTracks: trackData.body.album.total_tracks,
            releaseDate: trackData.body.album.release_date,
            images: trackData.body.album.images.map((img) => ({
              url: img.url,
              height: img.height,
              width: img.width,
            })),
          },
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getTrack;
