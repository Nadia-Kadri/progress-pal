DROP TABLE IF EXISTS habits_log;

CREATE TABLE habits_log (
  id SERIAL PRIMARY KEY,
  created_at DATE NOT NULL,
  habit_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (habit_id) REFERENCES habits(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO habits_log (created_at, habit_id, user_id)
VALUES 
(
  '2024-07-24',
  1,
  1
),
(
  '2024-07-23',
  1,
  1
),
(
  '2024-07-22',
  1,
  1
),
(
  '2024-07-24',
  2,
  1
),
(
  '2024-07-23',
  2,
  1
),
(
  '2024-07-22',
  2,
  1
);