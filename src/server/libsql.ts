// import { createClient } from "@libsql/client";
import { createClient } from "@libsql/client/web";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

import { env } from "@/env";

const libsql = createClient({
  // url: "file:./dev.db",
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const adapter = new PrismaLibSQL(libsql);
