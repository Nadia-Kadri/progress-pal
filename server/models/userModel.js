import db from '../config/database.js';

async function findUserByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function createUser(first_name, last_name, email, hash) {
  const result = await db.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, hash]
  );
  return result.rows[0];
}

export { findUserByEmail, createUser };