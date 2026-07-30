"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeBigInt = serializeBigInt;
function serializeBigInt(data) {
    return JSON.parse(JSON.stringify(data, (_, value) => typeof value === "bigint"
        ? Number(value)
        : value));
}
