// Get Track's Audio Features: API para obtener el análisis de un track a través de su ID.
function getAudioFeatures(app, spotifyApi) {
  app.get("/audioFeature", (req, res) => {
    const { q } = req.query;
    spotifyApi
      .getAudioFeaturesForTrack(q)
      .then((audioFeatureData) => {
        res.send({
          acousticness: audioFeatureData.body.acousticness,
          danceability: audioFeatureData.body.danceability,
          duration_ms: audioFeatureData.body.duration_ms,
          energy: audioFeatureData.body.energy,
          id: audioFeatureData.body.id,
          instrumentalness: audioFeatureData.body.instrumentalness,
          key: audioFeatureData.body.key,
          liveness: audioFeatureData.body.liveness,
          loudness: audioFeatureData.body.loudness,
          mode: audioFeatureData.body.mode,
          speechiness: audioFeatureData.body.speechiness,
          tempo: audioFeatureData.body.tempo,
          time_signature: audioFeatureData.body.time_signature,
          type: audioFeatureData.body.type,
          valence: audioFeatureData.body.valence,
        });
      })
      .catch((err) => {
        res.send(`Error searching: ${err}`);
      });
  });
}

module.exports = getAudioFeatures;
