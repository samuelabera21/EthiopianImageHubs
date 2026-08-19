require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    const res = await pool.query(`
      UPDATE "users"
      SET "roleId" = (SELECT id FROM "roles" WHERE name = 'MODERATOR')
      WHERE email = 'samuelabera.dev@gmail.com'
    `);
    console.log("Updated rows:", res.rowCount);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

main();
