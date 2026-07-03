import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.ts";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/v1", routes);

// 404
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorMiddleware);

export default app;