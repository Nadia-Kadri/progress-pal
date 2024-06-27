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
('Maserall', 'Marcelin', 'maserallmarcelin@gmail.com', '$2b$10$1grJW3VDw/2FTpXavkmM9O3/l2tPYF/ltLVQRr0MWf8QVTwJh9EPS'),
('Nora', 'Kadri', 'norakadri@gmail.com', '$2b$10$Xd8iGpsyXTVnY4fA7TpkiuNgbl38wzrs9UW8XmYKcv3Mo4iGWYIYW');

-- Nadia: 123456
-- Maserall: 246810
-- Nora: 654321