describe("API Tests", () => {
  const baseUrl = "http://localhost:8080/favorite"; // Ajusta la URL según tu configuración

  it("Recuperar todos los Tracks Favoritos", () => {
    cy.request(`${baseUrl}/getAllTracks`).its("status").should("equal", 200);
  });

  // it("Recuperar Tracks de Favoritos con un límite", () => {
  //   const limit = 1;
  //   cy.request(`${baseUrl}/getTracks?limit=${limit}`)
  //     .its("status")
  //     .should("equal", 200)
  //     .and("its", "body")
  //     .should("have.length.lte", limit);
  // });
  
  it("Crear nuevo Track en Favoritos", () => {
    const newTrack = {
      album: {
        idAlbum: "123",
        nameAlbum: "Test Album",
        images: [
          {
            url: "http://example.com/image.jpg",
            height: 10,
            width: 10,
          },
        ],
      },
      artist: [
        {
          idArtist: "456",
          nameArtist: "Test Artist",
        },
      ],
      idTrack: "789",
      nameTrack: "Test Track",
    };

    cy.request("POST", `${baseUrl}/saveTrack`, newTrack)
      .its("status")
      .should("equal", 200);
  });

  it("Eliminar un Track de Favoritos", () => {
    const trackId = "ID_DEL_TRACK_A_ELIMINAR"; // Cambia esto al ID del track que deseas eliminar

    cy.request("DELETE", `${baseUrl}/deleteTrack/${trackId}`)
      .its("status")
      .should("equal", 200);
  });
});
