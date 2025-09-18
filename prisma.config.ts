import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
    schema: path.join("prisma", "schema.prisma"),
    migrations: {
        seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
    },
    views: {
        path: path.join("prisma", "views"),
    },
    typedSql: {
        path: path.join("prisma", "queries"),
    }
} satisfies PrismaConfig;
