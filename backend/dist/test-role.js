"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
async function main() {
    const role = await database_1.prisma.role.findUnique({
        where: {
            name: "USER",
        },
    });
    console.log(role);
}
main();
