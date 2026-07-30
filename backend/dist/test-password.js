"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("./utils/password");
async function main() {
    const hash = await (0, password_1.hashPassword)("Samuel1997");
    console.log(hash);
    const ok = await (0, password_1.comparePassword)("Samuel1997", hash);
    console.log(ok);
}
main();
