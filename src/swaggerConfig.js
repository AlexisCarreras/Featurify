import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'FEATURIFY',
      version: '1.0.0',
      description: 'Documentación de las APIs',
    },
    basePath: '/',
    components: {
      schemas: {
        Favorite: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID del track favorito',
            },
            trackName: {
              type: 'string',
              description: 'Nombre del track',
            },
            artist: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  idArtist: {
                    type: 'string',
                    description: 'ID del artista',
                  },
                  nameArtist: {
                    type: 'string',
                    description: 'Nombre del artista',
                  },
                },
              },
              description: 'Artista(s) del track',
            },
            album: {
              type: 'object',
              properties: {
                idAlbum: {
                  type: 'string',
                  description: 'ID del álbum',
                },
                nameAlbum: {
                  type: 'string',
                  description: 'Nombre del álbum',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      url: {
                        type: 'string',
                        description: 'URL de la imagen',
                      },
                      height: {
                        type: 'number',
                        description: 'Altura de la imagen',
                      },
                      width: {
                        type: 'number',
                        description: 'Ancho de la imagen',
                      },
                    },
                  },
                  description: 'Imágenes del álbum',
                },
              },
              description: 'Álbum del track',
            },
            idTrack: {
              type: 'string',
              description: 'ID del track',
            },
            nameTrack: {
              type: 'string',
              description: 'Nombre del track',
            },
          },
          required: ['trackName', 'artist', 'album', 'idTrack', 'nameTrack'],
        },
      },
    },
  },
  apis: ['./src/services/**/*.js'],
};

const exampleValue = [
  {
    _id: "6093f3d4b76f979a9c8a5b4f",
    trackName: "Example Track 1",
    artist: [
      {
        idArtist: "example_artist_id_1",
        nameArtist: "Example Artist 1",
      }
    ],
    album: {
      idAlbum: "example_album_id_1",
      nameAlbum: "Example Album 1",
      images: [
        {
          url: "https://example.com/image1.jpg",
          height: 800,
          width: 600,
        },
        {
          url: "https://example.com/image2.jpg",
          height: 600,
          width: 400,
        }
      ],
    },
    idTrack: "example_track_id_1",
    nameTrack: "Example Track 1",
  },
  {
    _id: "6093f3d4b76f979a9c8a5b50",
    trackName: "Example Track 2",
    artist: [
      {
        idArtist: "example_artist_id_2",
        nameArtist: "Example Artist 2",
      }
    ],
    album: {
      idAlbum: "example_album_id_2",
      nameAlbum: "Example Album 2",
      images: [
        {
          url: "https://example.com/image3.jpg",
          height: 800,
          width: 600,
        },
        {
          url: "https://example.com/image4.jpg",
          height: 600,
          width: 400,
        }
      ],
    },
    idTrack: "example_track_id_2",
    nameTrack: "Example Track 2",
  }
];

options.apis.forEach(path => {
  if (path.includes('favorites.js')) {
    if (path.includes('getAllTracks')) {
      options.swaggerDefinition.paths['/api/favorites/getAllTracks'].get.responses['200'].content['application/json'].example = exampleValue;
    } else if (path.includes('getTracks')) {
      options.swaggerDefinition.paths['/api/favorites/getTracks'].get.responses['200'].content['application/json'].example = exampleValue;
    }
  }
});

export const swaggerSpec = swaggerJsdoc(options);