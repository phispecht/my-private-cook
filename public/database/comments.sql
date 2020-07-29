DROP TABLE IF EXISTS comments CASCADE;
 
CREATE TABLE comments(
      id SERIAL PRIMARY KEY,
      comment TEXT NOT NULL CHECK (comment != ''),
      users_id INT NOT NULL REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );