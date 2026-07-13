import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.load(
  path.join(
    process.cwd(),
    "..",
    "openapi",
    "sprint1OpenAPI.yaml",
  ),
);

export const swaggerMiddleware = [
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
];