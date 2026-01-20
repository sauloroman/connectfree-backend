import { Pool } from 'pg'
import { EnvAdapter } from './config/plugin'

export const postgresPool = new Pool(
  EnvAdapter.DATABASE_URL
    ? {
        connectionString: EnvAdapter.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: EnvAdapter.POSTGRESDB_HOST!,
        port: EnvAdapter.POSTGRESDB_PORT!,
        user: EnvAdapter.POSTGRESDB_USER!,
        password: EnvAdapter.POSTGRESDB_PASSWORD!,
        database: EnvAdapter.POSTGRESDB_NAME!
      }
);

(async() => {
    const result = await postgresPool.query('SELECT NOW()')
    console.log(result.rows) 
})()