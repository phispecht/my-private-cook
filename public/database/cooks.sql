DROP TABLE IF EXISTS cooks CASCADE;
 
CREATE TABLE cooks(
      id SERIAL PRIMARY KEY,
      national_cuisine VARCHAR(255) NOT NULL CHECK (national_cuisine != ''),
      specialties VARCHAR(255) NOT NULL CHECK (specialties != ''),
      experiences VARCHAR(255),
      cook_on_site VARCHAR(255),
      shopping_food VARCHAR(255),
      delivery VARCHAR(255),
      hourly_wage VARCHAR(255) NOT NULL CHECK (hourly_wage != ''),
      rating VARCHAR(255),
      cooks_id INT NOT NULL REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );