const autogen = require("swagger-autogen")({ openapi: "3.0.0" });
const configFile = require("./base-config.json");
const fs = require("fs");

const load = () => {
  const outputFileName = "../docs/swagger.json";
  const arrEndPointsFiles = ["../src/*.js"];

  autogen(outputFileName, arrEndPointsFiles, configFile).then(() => {
    // JSON to YAML format
    const YAML = require("js-yaml");
    const jsonFile = require("../../../docs/swagger.json");
    const yamlFile = YAML.dump(jsonFile);

    // Save YAML file
    fs.writeFileSync("./docs/swagger.yml", yamlFile, "utf8");
  });
};

module.exports = load;
