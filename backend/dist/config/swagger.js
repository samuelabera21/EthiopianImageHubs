"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerMiddleware = void 0;
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = yamljs_1.default.load(path_1.default.join(process.cwd(), "..", "openapi", "sprint1OpenAPI.yaml"));
exports.swaggerMiddleware = [
    swagger_ui_express_1.default.serve,
    swagger_ui_express_1.default.setup(swaggerDocument),
];
