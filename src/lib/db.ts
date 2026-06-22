import { neon } from "@neondatabase/serverless";

/**
 * Returns a serverless SQL query client using the Neon connection string.
 * Automatically handles cases where the database is not configured.
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }
  try {
    return neon(databaseUrl);
  } catch (err) {
    console.error("Failed to initialize Neon database client:", err);
    return null;
  }
}
