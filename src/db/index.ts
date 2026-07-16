import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: databaseUrl,
    });
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

let _pool: Pool | undefined;
let _db: ReturnType<typeof drizzle> | undefined;

function getDb() {
  if (!_pool) {
    _pool = createPool();
    _db = drizzle(_pool);
  }
  return _db!;
}

export const pool = new Proxy({} as Pool, {
  get(_, prop) {
    if (!_pool) _pool = createPool();
    return Reflect.get(_pool, prop);
  },
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return Reflect.get(getDb(), prop);
  },
});
