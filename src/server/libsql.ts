import { createClient } from "@libsql/client/web";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

import { env } from "@/env";

const libsql = createClient({
  // For development only, using local sqlite file
  url: env.DEV_DATABASE_URL,

  // For production, using remote database (turso)
  // url: env.TURSO_DATABASE_URL,
  // authToken: env.TURSO_AUTH_TOKEN,
});

export const adapter = new PrismaLibSQL(libsql);
