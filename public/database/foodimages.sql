DROP TABLE IF EXISTS images CASCADE;
 
CREATE TABLE images(
      id SERIAL PRIMARY KEY,
      image1 VARCHAR(255),
      image2 VARCHAR(255),
      image3 VARCHAR(255),
      image4 VARCHAR(255),
      image5 VARCHAR(255),
      users_id INT NOT NULL UNIQUE REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );