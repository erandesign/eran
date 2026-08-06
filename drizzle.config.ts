import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite', // "mysql" | "sqlite" | "postgresql"
  schema: './src/DB/schema.ts',
  out: '.drizzle',
  dbCredentials: {
    url: '.data/db.sqlite3',
  },
})
