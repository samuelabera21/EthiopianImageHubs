"use strict";
// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import routes from "./routes";
// import { notFoundMiddleware } from "./middlewares/notFound.middleware.ts";
// import { errorMiddleware } from "./middlewares/error.middleware";
// const app = express();
// // Security
// app.use(helmet());
// // CORS
// app.use(cors());
// // Logger
// app.use(morgan("dev"));
// // Body Parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Cookies
// app.use(cookieParser());
// // Routes
// app.use("/api/v1", routes);
// // 404
// app.use(notFoundMiddleware);
// // Global Error Handler
// app.use(errorMiddleware);
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./config/swagger");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Security
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
// CORS
app.use((0, cors_1.default)());
// Logger
app.use((0, morgan_1.default)("dev"));
// Body Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Cookies
app.use((0, cookie_parser_1.default)());
/**
 * Static uploads
 */
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
/**
 * Swagger UI
 */
app.use("/api/docs", ...swagger_1.swaggerMiddleware);
/**
 * API Routes
 */
app.use("/api/v1", routes_1.default);
// 404
app.use(notFound_middleware_1.notFoundMiddleware);
// Error Handler
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
