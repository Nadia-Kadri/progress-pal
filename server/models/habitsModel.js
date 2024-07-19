import db from '../config/database.js';

async function getUserHabits(user_id) {
  const result = await db.query(
    `SELECT habits.*,
      COALESCE(
        json_agg(
          json_build_object('log_id', habits_log.id, 'log_created_at', habits_log.created_at)
        ) FILTER (WHERE habits_log.id IS NOT NULL),
        '[]'
      ) AS logs
    FROM habits
    LEFT JOIN habits_log 
    ON habits.id = habits_log.habit_id
    WHERE habits.user_id = $1
    GROUP BY habits.id`,
    [user_id]);
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

async function createHabitLog(habit_id, user_id, created_at) {
  const result = await db.query(
    'INSERT INTO habits_log (habit_id, user_id, created_at) VALUES ($1, $2, $3) RETURNING *;',
    [habit_id, user_id, created_at]
  );
  return result.rows[0];
}

async function deleteHabitLog(id) {
  const result = await db.query('DELETE FROM habits_log WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
}

export { getUserHabits, createHabit, deleteHabit, createHabitLog, deleteHabitLog };