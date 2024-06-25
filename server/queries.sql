DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
	email VARCHAR(254) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (first_name, last_name, email, password)
VALUES 
('Nadia', 'Marcelin', 'nadiamarcelin@gmail.com', '123456'),
('Maserall', 'Marcelin', 'maserallmarcelin@gmail.com', '246810'),
('Nora', 'Kadri', 'norakadri@gmail.com', '654321');

DROP TABLE IF EXISTS habits;
CREATE TABLE habits (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	description VARCHAR(120),
  amount INT NOT NULL,
	unit VARCHAR(20) NOT NULL,
  frequency VARCHAR(20) NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE,
  expired_at DATE DEFAULT '9999-12-31',
  icon TEXT,
  color VARCHAR(7) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO habits (name, description, amount, unit, frequency, created_at, icon, color, user_id)
VALUES 
(
  'Walk',
  null,
  30,
  'minutes',
  'daily',
  '2024-06-20',
  '🚶‍♀️‍➡️',
  '#FF7373',
  1
),
(
  'Drink water',
  null,
  80,
  'ounces',
  'daily',
  '2024-06-20',
  '💧',
  '#33CCFF',
  1
);

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