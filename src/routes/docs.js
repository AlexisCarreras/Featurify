const path = require("path");
const ui = require("swagger-ui-express");
const jsonFile = require("../../docs/swagger.json");

const { Router } = require("express");
const router = Router();

router.use("/swagger", ui.serve);
router.get(
  "/swagger",
  (req, res, next) => {
    /*
            #swagger.tags = ["Documentation"]
            #swagger.path = "/docs/swagger/"
            #swagger.summary = "View documentation on HTML (ui), json or yaml/yml"
            #swagger.description = "View documentation on HTML (ui), json or yaml/yml"
            #swagger.parameters["format"] = {
                in: "query",
                description: "It is a swagger doc (default option is ui)",
                type: "string",
                schema: {
                    $ref: "#/components/schemas/Format"
                }
            }

            #swagger.responses[200] = {
                description: "Respond according to the selected format"
            }
        */

    const format = req.query.format || "ui";

    switch (format) {
      case "json":
        // JSON Format
        res.json(jsonFile);
        break;

      case "yml":
      case "yaml":
        // YAML/YML Format
        res.set("Content-Type", "text/plain");
        res.sendFile(path.join(__dirname, "../../docs/swagger.yml"));
        break;
      default:
        next();
        break;
    }
  },
  ui.setup(jsonFile)
);

module.exports = router;
