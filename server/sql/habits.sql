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