const statusRoutes = require("./status");
const docsRoutes = require("./docs");
const prefix = `/api`;

const loadRoutes = (app) => {
  //API Routes
  app.use(`${prefix}/status`, statusRoutes);

  // Docs Routes
  app.use(`/docs`, docsRoutes);
};

module.exports = loadRoutes;
