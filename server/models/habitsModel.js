import db from '../config/database.js';

async function getHabitsByUser(id) {
  const result = await db.query('SELECT * FROM habits WHERE user_id = $1;', [id]);
  return result.rows;
}

async function createHabit(input, id) {
  const { name, description, amount, unit, frequency, created_at, expired_at, icon, color } = input;
  const result = await db.query(
    `INSERT INTO habits (name, description, amount, unit, frequency, created_at, expired_at, icon, color, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;`,
    [name, description, amount, unit, frequency, created_at, expired_at, icon, color, id]
  );
  return result.rows[0];
}

async function deleteHabit(id) {
  const result = await db.query('DELETE FROM habits WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
}

async function createHabitLog(habit_id, user_id) {
  const result = await db.query(
    'INSERT INTO habits_log (habit_id, user_id) VALUES ($1, $2) RETURNING *;',
    [habit_id, user_id]
  );
  return result.rows[0];
}

async function deleteHabitLog(id) {
  const result = await db.query('DELETE FROM habits_log WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
}

export { getHabitsByUser, createHabit, deleteHabit, createHabitLog, deleteHabitLog };