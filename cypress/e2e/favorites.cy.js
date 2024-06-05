describe("API Tests", () => {
  const baseUrl = "http://localhost:8080/favorites";

  it("Recuperar todos los Tracks Favoritos", () => {
    cy.request(`${baseUrl}/getAllTracks`).its("status").should("equal", 200);
  });

  it("Recuperar Tracks de Favoritos con un límite", () => {
    const limit = 1;
    cy.request(`${baseUrl}/getLimitTracks?limit=${limit}`).should(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.lte(limit);
      }
    );
  });

  it("Crear nuevo Track en Favoritos", () => {
    const newTrack = {
      album: {
        idAlbum: "2yuTRGIackbcReLUXOYBqU",
        nameAlbum: "Jazz (2011 Remaster)",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b2737c39dd133836c2c1c87e34d6",
            height: 640,
            width: 640,
          },
        ],
      },
      artist: [
        {
          idArtist: "1dfeR4HaWDbWqFHLkxsg1d",
          nameArtist: "Queen",
        },
      ],
      idTrack: "5CTAcf8aS0a0sIsDwQRF9C",
      nameTrack: "Bicycle Race - Remastered 2011",
    };

    cy.request("POST", `${baseUrl}/saveTrack`, newTrack)
      .its("status")
      .should("equal", 200);
  });

  it("Eliminar un Track de Favoritos", () => {
    const trackId = "ID";

    cy.request("DELETE", `${baseUrl}/deleteTrack/${trackId}`)
      .its("status")
      .should("equal", 200);
  });
});
