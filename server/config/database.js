import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const ssl = {
  rejectUnauthorized: false
}

const connectionString = process.env.DATABASE_URL ||
  (process.env.PGHOST?.startsWith('postgres://') || process.env.PGHOST?.startsWith('postgresql://')
    ? process.env.PGHOST
    : null)

const config = connectionString
  ? {
      connectionString,
      ssl
    }
  : {
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      ssl
    }

export const pool = new pg.Pool(config)
