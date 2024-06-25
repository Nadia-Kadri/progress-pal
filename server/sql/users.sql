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