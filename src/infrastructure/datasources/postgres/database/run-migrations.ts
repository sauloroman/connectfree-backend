import fs from 'fs'
import path from 'path'
import { postgresPool } from './postgres.pool'

const migrationsPath = path.join(__dirname, 'migrations')

async function run() {
  const files = fs.readdirSync(migrationsPath).sort()

  for (const file of files) {
    const sql = fs.readFileSync(
      path.join(migrationsPath, file),
      'utf8'
    )
    console.log(`Running ${file}`)
    await postgresPool.query(sql)
  }

  process.exit(0)
}

run()
