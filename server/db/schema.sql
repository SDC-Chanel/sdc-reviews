-- CREATE DATABASE
DROP DATABASE IF EXISTS ratings;

CREATE DATABASE ratings;

USE ratings;

-- CREATE reviews csv
-- id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id SERIAL,
  rating INT,
  date BIGINT,
  summary VARCHAR(500),
  body VARCHAR(500),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(200),
  response VARCHAR(500),
  helpfulness INT,
);

-- reviews_photos csv
-- id,review_id,url
CREATE TABLE reviews_photos (
  photo_id SERIAL PRIMARY KEY,
  review_id SERIAL,
  url TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

-- characteristics csv
-- id,product_id,name
CREATE TABLE characteristics (
  characteristic_id SERIAL PRIMARY KEY,
  product_id SERIAL,
  name TEXT,
);

-- characteristic_reviews csv
-- id,characteristic_id,review_id,value
CREATE TABLE characteristic_reviews (
  characteristic_id SERIAL PRIMARY KEY,
  review_id SERIAL,
  value INT,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);