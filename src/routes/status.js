const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.tags = ["Status"]
    #swagger.path = "/api/status/"
    #swagger.summary = "It is a keep alive endpoint"
    #swagger.description = "It is a keep alive endpoint"

    #swagger.responses[200] = {
        description: "Respond according to the selected format"
    }
  */
  res.json({
    status: "OK",
  });
});

module.exports = router;
