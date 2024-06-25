DROP TABLE IF EXISTS habits_log;

CREATE TABLE habits_log (
  id SERIAL PRIMARY KEY,
  created_at DATE NOT NULL,
  habit_id INT,
  user_id INT,
  FOREIGN KEY (habit_id) REFERENCES habits(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO habits_log (created_at, habit_id, user_id)
VALUES 
(
  '2024-06-20',
  1,
  1
),
(
  '2024-06-21',
  1,
  1
),
(
  '2024-06-22',
  1,
  1
),
(
  '2024-06-23',
  1,
  1
),
(
  '2024-06-24',
  1,
  1
),
(
  '2024-06-25',
  1,
  1
),
(
  '2024-06-20',
  2,
  1
),
(
  '2024-06-21',
  2,
  1
),
(
  '2024-06-22',
  2,
  1
),
(
  '2024-06-25',
  2,
  1
);