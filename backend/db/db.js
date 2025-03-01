import { createClient } from "@libsql/client";
import "dotenv/config"

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default db


