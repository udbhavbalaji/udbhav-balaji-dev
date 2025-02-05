import { createClient } from "@libsql/client/web";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

import { env } from "@/env";

console.log(env.TURSO_DATABASE_URL);

const libsql = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const adapter = new PrismaLibSQL(libsql);
