import { createClient } from "@libsql/client/web";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

import { env } from "@/env";

const libsql = createClient({
  // optionally, can use local sqlite dump
  // url: "file:./dev.db",

  // using turso for both development and production
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const adapter = new PrismaLibSQL(libsql);
