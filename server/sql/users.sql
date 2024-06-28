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
('Nadia', 'Marcelin', 'nadiamarcelin@gmail.com', '$2b$10$e6vqbJmVsRo.gcK7yF9CxuzOyxmlXonUuSHZRqVWkyfn9fNYtbmrK'),
('Maserall', 'Marcelin', 'maserallmarcelin@gmail.com', '$2b$10$e6vqbJmVsRo.gcK7yF9CxuzOyxmlXonUuSHZRqVWkyfn9fNYtbmrK'),
('Nora', 'Kadri', 'norakadri@gmail.com', '$2b$10$e6vqbJmVsRo.gcK7yF9CxuzOyxmlXonUuSHZRqVWkyfn9fNYtbmrK');

-- Nadia: 123456
-- Maserall: 123456
-- Nora: 123456