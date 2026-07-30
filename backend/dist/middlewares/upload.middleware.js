"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = void 0;
const multer_config_1 = require("../config/multer.config");
exports.uploadSingleImage = multer_config_1.upload.single("image");
